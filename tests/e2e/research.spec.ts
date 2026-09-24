import {test,expect} from "@playwright/test";
import {createTrip} from "@/src/modules/trips/service";
import {Prisma} from "@/src/generated/prisma/client";
import {getPrismaClient} from "@/src/lib/prisma";
import {startDestinationResearch} from "@/src/modules/research/service";
import {runResearchJob} from "@/src/modules/research/worker";
import {syntheticConfig as config,syntheticHttp} from "../fixtures/research";
const db=getPrismaClient();let tripId:string|undefined;
test.afterEach(async()=>{if(tripId)await db.trip.deleteMany({where:{id:tripId}});tripId=undefined;});
test.afterAll(async()=>{await db.$disconnect();});
for(const [device,width,height] of [["desktop",1280,900],["phone",390,844]] as const){
 test(device+" synthetic application research renders existing card and one-action Add",async({page},info)=>{
  // Own synthetic fixture only: remove its evidence before the Place (SetNull relation),
  // including orphaned evidence from a prior fixture run. Publication remains unchanged.
  await db.evidenceRecord.deleteMany({where:{source:{name:"https://www.wikidata.org/wiki/Q3000",kind:"RUNTIME_STRUCTURED_REFERENCE"}}});
  await db.place.deleteMany({where:{name:"Synthetic River Gallery",research:{identity:"wikidata:Q3000:VENUE::"}}});
  await page.setViewportSize({width,height});
  const unexpectedExternal:string[]=[];
  await page.route("**/*",route=>{const u=new URL(route.request().url());if(u.hostname!=="127.0.0.1"&&u.hostname!=="localhost"){unexpectedExternal.push(u.hostname);return route.abort();}return route.continue();});
  const created=await createTrip({destinationLabel:"Lisbon",destinationScope:"CITY_BASE",startDate:"2032-04-01",endDate:"2032-04-03",travelerCount:1});
  if(!created.ok||!created.data)throw Error("Synthetic trip setup failed");const t=created.data;tripId=t.trip.id;
  await page.goto("/trips/"+tripId+"/itinerary");
  await expect(page.getByText("Research is not connected.",{exact:false})).toBeVisible();
  expect(await db.researchJob.count({where:{tripId}})).toBe(0);
  const queued=await startDestinationResearch({tripId,segmentId:t.segments[0].id,country:"Portugal",language:"en"},config);if(!queued.ok)throw Error(queued.error);
  let syntheticCalls=0;
  await runResearchJob(queued.id,{config,transport:syntheticHttp({onRequest:()=>{syntheticCalls++;}}),delay:async()=>{}});
  const researchBefore=await db.researchJob.findUniqueOrThrow({where:{id:queued.id}}), callsBefore=syntheticCalls;
  const runtime=await db.researchPlace.findFirstOrThrow({where:{place:{name:"Synthetic River Gallery"}}});
  await db.researchPlace.update({where:{placeId:runtime.placeId},data:{media:Prisma.DbNull}});
  await page.reload();
  const card=page.locator(".idea-card").filter({has:page.getByRole("heading",{name:"Synthetic River Gallery",exact:true})});
  await expect(card).toBeVisible();await expect(card.getByRole("img",{name:"Photo unavailable for Synthetic River Gallery"})).toBeVisible();
  await expect(card.getByText("Researched · structured reference · access unverified")).toBeVisible();
  await card.locator("summary").click();await expect(card.getByText("Runtime research; not live availability",{exact:false}).first()).toBeVisible();
  await card.screenshot({path:info.outputPath(device+"-research.png")});
  // Test-only media metadata and intercepted HTTP; this graphic is not an attraction photograph.
  const asset="https://upload.wikimedia.org/wikipedia/commons/synthetic-contract-only.svg";
  await page.route(asset,route=>route.fulfill({contentType:"image/svg+xml",body:'<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320"><rect width="480" height="320" fill="#dfe8df"/><text x="30" y="150" font-size="24">SYNTHETIC HTTP IMAGE TEST</text></svg>'}));
  await db.researchPlace.update({where:{placeId:runtime.placeId},data:{media:{subjectId:"Q3000",subjectMatch:"REVIEWED",asset,
   sourcePage:"https://commons.wikimedia.org/wiki/File:Synthetic-contract-only.svg",title:"Synthetic HTTP image test — not a place photograph",creator:"Synthetic test fixture",
   license:"CC0",licenseUrl:"https://creativecommons.org/publicdomain/zero/1.0/",capturedAt:"Not applicable: synthetic graphic",retrievedAt:new Date().toISOString(),
   rightsBasis:"Original test graphic; synthetic subject-review metadata only",exterior:false}}});
  await page.reload();
  const photo=card.getByRole("img",{name:"Synthetic HTTP image test — not a place photograph",exact:true});
  await expect(photo).toBeVisible();await expect.poll(()=>photo.evaluate((image:HTMLImageElement)=>image.naturalWidth)).toBe(480);
  await expect(card.getByRole("link",{name:"Photo: Synthetic test fixture"})).toBeVisible();
  await card.screenshot({path:info.outputPath(device+"-mock-media.png")});
  await page.unroute(asset);await page.route(asset,route=>route.abort());await page.reload();
  await expect(card.getByRole("img",{name:"Photo unavailable for Synthetic River Gallery"})).toBeVisible();
  await expect(card.getByText("Photo could not load",{exact:true})).toBeVisible();
  await card.screenshot({path:info.outputPath(device+"-failed-media.png")});
  await card.getByRole("button",{name:"Add to Day 1",exact:true}).click();
  await expect(page.locator(".timeline-item")).toHaveCount(1);await page.reload();await expect(page.locator(".timeline-item")).toHaveCount(1);
  expect(await db.recommendationDecision.count({where:{recommendation:{tripId}}})).toBe(1);
  expect(await db.reservation.count({where:{tripId}})).toBe(0);
  expect(await db.researchJob.count({where:{tripId}})).toBe(1);
  expect(await db.researchJob.findUniqueOrThrow({where:{id:queued.id}})).toEqual(researchBefore);
  expect(syntheticCalls).toBe(callsBefore);expect(unexpectedExternal).toEqual([]);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth)).toBe(false);
  await page.screenshot({path:info.outputPath(device+"-plan.png")});
 });
}
