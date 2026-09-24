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
  test.setTimeout(90_000);await page.setViewportSize({width,height});
  const outside:string[]=[];await page.route("**/*",route=>{const u=new URL(route.request().url());if(!["localhost","127.0.0.1"].includes(u.hostname)){outside.push(u.hostname);return route.abort();}return route.continue();});
  await page.route("https://lh3.googleusercontent.com/synthetic-avatar",route=>route.fulfill({contentType:"image/png",body:syntheticPhoto}));
  const created=await createTrip({destinationLabel:device==="desktop"?"Kyoto":"Osaka",destinationScope:"CITY_BASE",startDate:"2032-04-01",endDate:"2032-04-03",travelerCount:1});if(!created.ok||!created.data)throw Error("fixture");tripId=created.data.trip.id;
  await page.goto("/trips/"+tripId+"/itinerary");const card=page.locator(".idea-card").first(),name=await card.locator("h3").innerText();
  expect(await db.googleOperation.count()).toBe(0);
  await card.getByText("Sources and photo details",{exact:true}).click();const google=card.locator(".google-context");await google.getByRole("button",{name:"Optional Google place context",exact:true}).click();
  await google.getByRole("button",{name:"Find / correct Google match",exact:true}).click();await expect(google.getByRole("button",{name:"Link this reviewed place",exact:true})).toBeVisible();
  await google.getByRole("button",{name:"Link this reviewed place",exact:true}).click();await expect(google.getByRole("status")).toContainText("Place ID linked");
  await google.getByRole("button",{name:"Request current context",exact:true}).click();await expect(google).toContainText("Google rating: 4.3 / 5");await expect(google).toContainText("Hours are not confirmed");
  await google.screenshot({path:info.outputPath(device+"-google-context.png")});
  await google.getByRole("button",{name:"Request reviews",exact:true}).click();await expect(google).toContainText("Synthetic translated review");await expect(google.getByRole("link",{name:"Synthetic author",exact:true})).toBeVisible();await expect(google.getByRole("img",{name:"Author avatar: Synthetic author",exact:true})).toBeVisible();await expect(google).toContainText("Provider relevance order");await expect(google).toContainText("Translated display");
  await google.screenshot({path:info.outputPath(device+"-google-reviews.png")});
  await google.getByRole("button",{name:"Request one photo",exact:true}).click();const image=google.getByRole("img",{name:"Google contributor photo of the linked place; current conditions unverified",exact:true});await expect(image).toBeVisible();await expect.poll(()=>image.evaluate((img:HTMLImageElement)=>img.naturalWidth)).toBe(1);await expect(google).toContainText("Synthetic photo author");
  await google.screenshot({path:info.outputPath(device+"-google-photo.png")});
  await google.getByRole("button",{name:"Request one photo",exact:true}).click();await expect(google.getByRole("status")).toContainText("unavailable");await expect(card.getByRole("button",{name:"Add to Day 1",exact:true})).toBeEnabled();
  const calls=await db.googleOperation.count();await card.getByRole("button",{name:"Add to Day 1",exact:true}).click();await expect(page.locator(".timeline-item")).toHaveCount(1);expect(await db.googleOperation.count()).toBe(calls);
  const panel=await openItem(page,name),saved=panel.locator(".google-context");await saved.getByRole("button",{name:"Optional Google place context",exact:true}).click();await saved.getByRole("button",{name:"Request current context",exact:true}).click();await expect(saved).toContainText("Google rating: 4.3 / 5");
  await panel.screenshot({path:info.outputPath(device+"-google-saved.png")});await closeDetails(page);await page.reload();expect(await db.googleOperation.count()).toBe(calls+1);
  expect(await db.itineraryItem.count({where:{tripId}})).toBe(1);expect(await db.reservation.count({where:{tripId}})).toBe(0);expect(outside).toEqual([]);
  const data=JSON.stringify(await db.itineraryItem.findMany({where:{tripId}}));expect(data).not.toContain("Synthetic translated");expect(data).not.toContain("googleMapsUri");
 });
}
