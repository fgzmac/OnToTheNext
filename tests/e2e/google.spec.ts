import {syntheticPhoto} from "../fixtures/google";
import {test,expect} from "@playwright/test";
import {createTrip} from "@/src/modules/trips/service";
import {getPrismaClient} from "@/src/lib/prisma";
import {openItem,closeDetails} from "./composer-helpers";
const db=getPrismaClient();let tripId:string|undefined;
async function clear(){await db.googleOperation.deleteMany();await db.googlePlaceReference.deleteMany();await db.providerPilotBudget.deleteMany();await db.researchBudget.deleteMany();}
test.beforeEach(clear);
test.afterEach(async()=>{if(tripId)await db.trip.deleteMany({where:{id:tripId}});tripId=undefined;await clear();});
test.afterAll(async()=>{await db.$disconnect();});
for(const [device,width,height] of [["desktop",1280,900],["phone",390,844]] as const) {
 test(device+" explicit synthetic Google enrichment and saved context preserve Add",async({page},info)=>{
  test.setTimeout(120_000);await page.setViewportSize({width,height});
  const outside:string[]=[];await page.route("**/*",route=>{const u=new URL(route.request().url());if(!["localhost","127.0.0.1"].includes(u.hostname)){outside.push(u.hostname);return route.abort();}return route.continue();});
  await page.route("https://lh3.googleusercontent.com/synthetic-avatar",route=>route.fulfill({contentType:"image/png",body:syntheticPhoto}));
  const created=await createTrip({destinationLabel:device==="desktop"?"Kyoto":"Osaka",destinationScope:"CITY_BASE",startDate:"2032-04-01",endDate:"2032-04-03",travelerCount:1});if(!created.ok||!created.data)throw Error("fixture");tripId=created.data.trip.id;
  await page.goto("/trips/"+tripId+"/itinerary");const card=page.locator(".idea-card").first(),name=await card.locator("h3").innerText();
  expect(await db.googleOperation.count()).toBe(0);
  await card.getByRole("button",{name:"View details",exact:true}).click();const panel=page.getByRole("dialog"),google=panel.locator(".google-context");
  await expect(google.getByRole("button",{name:"Use this location",exact:true})).toBeVisible();
  expect(await db.googlePlaceReference.count()).toBe(0);expect(await db.googleOperation.count()).toBe(1);
  await google.getByRole("button",{name:"Use this location",exact:true}).click();
  await expect(google).toContainText("4.3 / 5");await expect(google).toContainText("Hours are not confirmed");
  await expect(google.getByText("Loading photo…",{exact:true})).toHaveCount(0);
  const image=google.getByRole("img",{name:"Google contributor photo of the linked place; current conditions unverified",exact:true});
  // The existing synthetic transport deliberately fails alternate photo downloads.
  if(!await image.count()){await google.getByRole("button",{name:"Refresh details",exact:true}).click();await expect(image).toBeVisible();}
  await expect(image).toBeVisible();await expect.poll(()=>image.evaluate((img:HTMLImageElement)=>img.naturalWidth)).toBe(1);await expect(google).toContainText("Synthetic photo author");
  await expect(panel.locator("dialog")).toHaveCount(0);await expect(google).not.toContainText("owner activation");
  await panel.evaluate(node=>{const label=document.createElement("p");label.textContent="SYNTHETIC UI CHECK — ratings, reviews and transport graphic are not live Google evidence";node.prepend(label);});
  await panel.screenshot({path:info.outputPath(device+"-google-context.png")});
  await google.getByRole("tab",{name:"Reviews",exact:true}).click();await expect(google).toContainText("Synthetic translated review");await expect(google.getByRole("link",{name:"Synthetic author",exact:true})).toBeVisible();await expect(google.getByRole("img",{name:"Author avatar: Synthetic author",exact:true})).toBeVisible();await expect(google).toContainText("Provider relevance order");await expect(google).toContainText("Translated display");
  await expect(image).toBeVisible();await expect(google).toContainText("4.3 / 5");
  const tabCalls=await db.googleOperation.count();await google.getByRole("tab",{name:"Overview",exact:true}).click();await google.getByRole("tab",{name:"Reviews",exact:true}).click();expect(await db.googleOperation.count()).toBe(tabCalls);
  await panel.screenshot({path:info.outputPath(device+"-google-reviews.png")});await google.screenshot({path:info.outputPath(device+"-google-photo.png")});
  await google.getByRole("button",{name:"Refresh details",exact:true}).click();await expect(google.getByText("Photo unavailable.",{exact:true})).toBeVisible();await expect(google).toContainText("4.3 / 5");await expect(panel.getByRole("button",{name:"Add to Day 1",exact:true})).toBeEnabled();
  const calls=await db.googleOperation.count();await panel.getByRole("button",{name:"Add to Day 1",exact:true}).click();await expect(page.locator(".timeline-item")).toHaveCount(1);expect(await db.googleOperation.count()).toBe(calls);
  const savedPanel=await openItem(page,name),saved=savedPanel.locator(".google-context");await expect(saved).toContainText("4.3 / 5");await expect(saved.getByText("Loading photo…",{exact:true})).toHaveCount(0);
  await expect(saved.getByRole("button",{name:"Use this location",exact:true})).toHaveCount(0);await expect(savedPanel.getByRole("button",{name:/Add to Day/})).toHaveCount(0);
  await savedPanel.screenshot({path:info.outputPath(device+"-google-saved.png")});await closeDetails(page);await page.reload();expect(await db.googleOperation.count()).toBe(calls+2);
  expect(await db.itineraryItem.count({where:{tripId}})).toBe(1);expect(await db.reservation.count({where:{tripId}})).toBe(0);expect(outside).toEqual([]);
  const data=JSON.stringify(await db.itineraryItem.findMany({where:{tripId}}));expect(data).not.toContain("Synthetic translated");expect(data).not.toContain("googleMapsUri");
 });
}
test("overview survives interrupted Reviews; close and keyboard reopen never auto-confirm",async({page})=>{
 test.setTimeout(90_000);
 await page.route("https://lh3.googleusercontent.com/**",r=>r.fulfill({contentType:"image/png",body:syntheticPhoto}));
 const created=await createTrip({destinationLabel:"Tokyo",destinationScope:"CITY_BASE",startDate:"2032-04-01",endDate:"2032-04-03",travelerCount:1});if(!created.ok||!created.data)throw Error("fixture");tripId=created.data.trip.id;
 await page.goto("/trips/"+tripId+"/itinerary");
 const card=page.locator(".idea-card").filter({has:page.getByRole("heading",{name:"Pokémon Center SHIBUYA",exact:true})});
 const trigger=card.getByRole("button",{name:"View details",exact:true});await trigger.focus();await page.keyboard.press("Enter");
 const panel=page.getByRole("dialog"),google=panel.locator(".google-context");
 await google.getByRole("button",{name:"Use this location",exact:true}).click();await expect(google).toContainText("4.3 / 5");await expect(google.getByText("Loading photo…",{exact:true})).toHaveCount(0);
 let fail=true;await page.route("**/trips/**/itinerary",route=>{if(fail&&route.request().method()==="POST"){fail=false;return route.abort("failed");}return route.fallback();});
 const before=await db.googleOperation.count();await google.getByRole("tab",{name:"Reviews",exact:true}).click();await expect(google).toContainText("Reviews aren’t available right now.");await expect(google).toContainText("4.3 / 5");expect(await db.googleOperation.count()).toBe(before);
 await page.keyboard.press("Escape");await expect(page.getByRole("dialog")).toHaveCount(0);await expect(trigger).toBeFocused();await page.keyboard.press("Enter");await expect(google).toContainText("4.3 / 5");await expect(google.getByRole("button",{name:"Use this location",exact:true})).toHaveCount(0);await expect(google.getByText("Loading photo…",{exact:true})).toHaveCount(0);await closeDetails(page);
 expect(await db.googleOperation.count()).toBe(before+2);
 await card.getByRole("button",{name:"Add to Day 1",exact:true}).click();await expect(page.locator(".timeline-item")).toHaveCount(1);
 const other=page.locator(".idea-card:not(.idea-scheduled)").first(),otherName=await other.locator("h3").innerText();
 await other.getByRole("button",{name:"Add to Day 1",exact:true}).click();await expect(page.locator(".timeline-item")).toHaveCount(2);
 await openItem(page,"Pokémon Center SHIBUYA");await expect(google).toContainText("4.3 / 5");await expect(google.getByText("Loading photo…",{exact:true})).toHaveCount(0);
 const currentCalls=await db.googleOperation.count(),otherItem=await db.itineraryItem.findFirstOrThrow({where:{tripId,title:otherName}});
 await page.evaluate(id=>{window.location.hash="item-"+id;},otherItem.id);
 await expect(page.getByRole("dialog",{name:otherName,exact:true})).toBeVisible();
 await expect(panel.locator(".google-provider-content")).toHaveCount(0);await expect(panel.getByRole("button",{name:"View place details",exact:true})).toBeVisible();
 expect(await db.googleOperation.count()).toBe(currentCalls);await closeDetails(page);
});

for (const [label,width,height,textScale] of [["wide",1440,900,1],["narrow enlarged text",320,844,1.25]] as const) {
 test(label+" dusk Logistics, expiry and direct Add preserve request intent",async({page},info)=>{
  test.setTimeout(120_000);await page.setViewportSize({width,height});
  await page.route("**/*",route=>{const u=new URL(route.request().url());return ["localhost","127.0.0.1"].includes(u.hostname)?route.continue():route.abort();});
  await page.clock.install();
  const created=await createTrip({destinationLabel:"Tokyo",destinationScope:"CITY_BASE",startDate:"2032-04-01",endDate:"2032-04-03",travelerCount:1});if(!created.ok||!created.data)throw Error("fixture");tripId=created.data.trip.id;
  await page.goto("/trips/"+tripId+"/itinerary");await page.addStyleTag({content:"html{font-size:"+16*textScale+"px}"});
  const card=page.locator(".idea-card:not(.idea-scheduled)").first(),title=await card.locator("h3").innerText();
  await card.getByRole("button",{name:"Add to Day 1",exact:true}).click();await expect(page.locator(".timeline-item")).toHaveCount(1);await expect(page.getByRole("dialog")).toHaveCount(0);expect(await db.googleOperation.count()).toBe(0);
  const trigger=page.getByRole("button",{name:"Open "+title,exact:true});await trigger.click();const panel=page.getByRole("dialog"),google=panel.locator(".google-context");
  await expect(google.getByRole("button",{name:"Use this location",exact:true})).toBeVisible();await google.getByRole("button",{name:"Use this location",exact:true}).click();await expect(google).toContainText("4.3 / 5");await expect(google.getByText("Loading photo…",{exact:true})).toHaveCount(0);
  const calls=await db.googleOperation.count();await google.getByRole("tab",{name:"Logistics",exact:true}).click();await expect(google.getByRole("tabpanel",{name:"Logistics",exact:true})).toContainText("Location");expect(await db.googleOperation.count()).toBe(calls);
  await page.keyboard.press("ArrowLeft");await expect(google.getByRole("tab",{name:"Overview",exact:true})).toBeFocused();
  await page.keyboard.press("ArrowRight");await expect(google.getByRole("tab",{name:"Logistics",exact:true})).toBeFocused();expect(await db.googleOperation.count()).toBe(calls);
  await expect(panel.getByRole("button",{name:/Add to Day/})).toHaveCount(0);await expect(panel.locator(".scheduled-status")).toContainText("On Day 1");
  await page.clock.fastForward(300_001);await expect(google.getByRole("status")).toContainText("Place details need refreshing");await expect(google).not.toContainText("4.3 / 5");await expect(panel.locator(".activity-summary")).not.toBeEmpty();await expect(google.getByRole("button",{name:"Refresh details",exact:true})).toBeEnabled();expect(await db.googleOperation.count()).toBe(calls);
  await panel.getByText("Sources",{exact:true}).click();await expect(panel.getByRole("button",{name:"Close details",exact:true})).toBeInViewport();
  expect(await panel.evaluate(n=>n.scrollWidth>n.clientWidth)).toBe(false);expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
  await panel.evaluate(n=>{const label=document.createElement("p");label.textContent="SYNTHETIC UI CHECK — no live provider quality evidence";n.prepend(label);});
  await page.screenshot({path:info.outputPath(label+"-dusk-expired-saved.png")});
  await page.keyboard.press("Escape");await expect(page.getByRole("dialog")).toHaveCount(0);await expect(trigger).toBeFocused();
  expect(await db.itineraryItem.count({where:{tripId}})).toBe(1);expect(await db.reservation.count({where:{tripId}})).toBe(0);
 });
}
