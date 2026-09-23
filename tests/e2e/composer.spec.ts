import { expect, test } from "@playwright/test";
import { getPrismaClient } from "@/src/lib/prisma";
import { openItem, closeDetails, chooseDay } from "./composer-helpers";
const db=getPrismaClient(); let tripId:string|null=null;
test.afterEach(async()=>{if(tripId)await db.trip.deleteMany({where:{id:tripId}});tripId=null;});
test.afterAll(async()=>{await db.$disconnect();});
for(const [device,width,height] of [["desktop",1280,900],["phone",390,844]] as const) {
 test(device+" fresh supported-city composer adds three ideas with one click each and no activity typing",async({page},info)=>{
  test.setTimeout(120_000);await page.setViewportSize({width,height});
  const screenshot=async(name:string)=>{expect(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)).toBe(false);if(device==="phone" && name==="populated") await page.evaluate(()=>document.getElementById("selected-plan")?.scrollIntoView({block:"start"})); else if(name==="setup") await page.locator(".trip-setup").scrollIntoViewIfNeeded(); else await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:info.outputPath(device+"-"+name+".png"),fullPage:false});};
  let switches=0;page.on("framenavigated",frame=>{if(frame===page.mainFrame()&&frame.url().includes("/discover"))switches++;});
  await page.goto("/");await expect(page.locator(".trip-setup [required]")).toHaveCount(3);await screenshot("setup");
  await page.getByLabel("Destination",{exact:true}).selectOption("Tokyo");await page.getByLabel("Start date").fill("2033-05-01");await page.getByLabel("End date").fill("2033-05-03");
  await page.getByRole("button",{name:"Start planning",exact:true}).click();await expect(page).toHaveURL(/\/trips\/[^/?]+\/itinerary$/);
  tripId=new URL(page.url()).pathname.split("/")[2];
  expect(await db.recommendation.count({where:{tripId}})).toBe(8);
  await expect(page.locator(".idea-card")).toHaveCount(4);await expect(page.locator(".idea-card").first()).toContainText("Senso-ji");
  await expect(page.getByText(/Synthetic test idea|Development fixtures/)).toHaveCount(0);await screenshot("empty");
  if(device==="desktop") {
    const interests=page.locator(".trip-interests");
    await interests.locator("summary").click();
    const chip=interests.getByRole("checkbox").first();
    const preferencesBefore=await db.tripPreferenceProfile.findUnique({where:{tripId:tripId!}});
    await page.route("**/itinerary", async route=>{if(route.request().method()==="POST")await route.abort("failed");else await route.continue();});
    await chip.click();
    await expect(interests.getByRole("alert")).toContainText("last saved selection is unchanged");
    await expect(chip).not.toBeChecked();
    expect(await db.tripPreferenceProfile.findUnique({where:{tripId:tripId!}})).toEqual(preferencesBefore);
    await page.unroute("**/itinerary");
    await chip.click();await expect(chip).toBeChecked();
    await expect(interests.getByRole("status")).toContainText("Interests saved");
    await interests.getByRole("button",{name:"Clear interests",exact:true}).click();await expect(chip).not.toBeChecked();
    await interests.locator("summary").click();
  }
  const names=await page.locator(".idea-card h3").allTextContents();
  for(let i=0;i<3;i++){
    const card=page.locator(".idea-card").filter({has:page.getByRole("heading",{name:names[i],exact:true})});
    await card.getByRole("button",{name:"Add to Day 1",exact:true}).click();
    await expect(page.locator(".timeline-item")).toHaveCount(i+1);
    await expect.poll(()=>db.itineraryItem.count({where:{tripId:tripId!}})).toBe(i+1);
  }
  expect(switches).toBe(0);
  expect(await db.reservation.count({where:{tripId}})).toBe(0);
  for(const item of await db.itineraryItem.findMany({where:{tripId}}))expect(item).toMatchObject({startMinute:null,flexibility:"FLEXIBLE"});
  await screenshot("populated");
  await chooseDay(page,2);
  await page.locator(".idea-card").filter({has:page.getByRole("heading",{name:names[3],exact:true})}).getByRole("button",{name:"Add to Day 2",exact:true}).click();
  await expect(page.locator(".timeline-item")).toHaveCount(1);
  await page.getByRole("button",{name:"More ideas",exact:true}).click();await expect(page.locator(".idea-card h3").first()).not.toHaveText(names[0]);
  const deniedName=await page.locator(".idea-card h3").first().textContent();
  await page.locator(".idea-card").first().getByRole("button",{name:"Not interested",exact:true}).click();
  await expect(page.locator(".idea-card h3").filter({hasText:deniedName!})).toHaveCount(0);
  expect(await db.recommendationDecision.count({where:{outcome:"DENIED",recommendation:{tripId}}})).toBe(1);
  await page.getByRole("button",{name:"Previous ideas",exact:true}).click();await expect(page.locator(".idea-card h3").first()).toHaveText(names[0]);
  const panel=await openItem(page,names[3]);await panel.getByRole("button",{name:"Edit "+names[3],exact:true}).click();await screenshot("detail");
  const form=panel.getByRole("form",{name:"Edit "+names[3],exact:true});
  await form.getByLabel("Reference URL — optional",{exact:true}).fill("javascript:alert(1)");await form.getByRole("button",{name:"Save changes",exact:true}).click();
  await expect(form.getByRole("alert")).toContainText("HTTP or HTTPS");await expect(form.getByRole("alert")).toBeFocused();await screenshot("error");
  await form.getByLabel("Reference URL — optional",{exact:true}).fill("https://www.meijijingu.or.jp/en/about/");
  await form.getByLabel("Item notes — optional",{exact:true}).fill("Meet at the entrance");await form.getByRole("button",{name:"Save changes",exact:true}).click();
  await expect(panel.getByRole("status")).toContainText("Item details saved");
  await page.keyboard.press("Escape");await expect(panel).toHaveCount(0);await expect(page.getByRole("button",{name:"Open "+names[3],exact:true})).toBeFocused();
  await page.reload();await expect(page.getByLabel("Selected day").locator("option:checked")).toContainText("Day 2");
  await expect(page.locator(".timeline-item h3")).toHaveText([names[3]]);
  const day2Item=await db.itineraryItem.findFirstOrThrow({where:{tripId,title:names[3]}});
  expect(day2Item.notes).toBe("Meet at the entrance");
  // A deep link overrides a different selected-Day query and reveals exactly its item.
  const firstDay=await db.day.findFirstOrThrow({where:{tripId},orderBy:{position:"asc"}});
  await page.goto("/trips/"+tripId+"/itinerary?planDay="+firstDay.id+"&homeView=day&homeDay="+firstDay.id+"#item-"+day2Item.id);
  await expect(page.getByRole("dialog")).toHaveAttribute("aria-label",names[3]);
  await expect(page.getByLabel("Selected day").locator("option:checked")).toContainText("Day 2");await closeDetails(page);
  await page.getByRole("navigation",{name:"Trip navigation"}).getByRole("link",{name:"Home",exact:true}).click();
  await expect(page.getByLabel("Trip day",{exact:true})).toHaveValue(firstDay.id);
 });
}
