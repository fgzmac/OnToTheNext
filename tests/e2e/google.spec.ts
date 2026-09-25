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
});
