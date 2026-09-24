import { seedDemoTrip } from "../prisma/seed-data";
import { seedDiscoverFixtures } from "../prisma/discover-seed";
import { startDestinationResearch } from "@/src/modules/research/service";
import { syntheticConfig as researchConfig } from "./fixtures/research";
import {beforeEach,afterAll,describe,it,expect,vi} from "vitest";
import {randomUUID} from "node:crypto";
import {getPrismaClient} from "@/src/lib/prisma";
import {createTrip} from "@/src/modules/trips/service";
import {getRecommendationBatch} from "@/src/modules/discover/service";
import {addRecommendationToDay,getItineraryBuilder} from "@/src/modules/itinerary/service";
import {GoogleClient} from "@/src/modules/google-places/client";
import {enrichGoogle} from "@/src/modules/google-places/service";
import {reserveGoogle,ACCOUNT} from "@/src/modules/google-places/budget";
import {googleTestConfig as config,googleHttp,syntheticPhoto} from "./fixtures/google";
import type {GoogleInput} from "@/src/modules/google-places/types";
const suite=process.env.TEST_DATABASE_URL?describe:describe.skip;
const db=process.env.TEST_DATABASE_URL?getPrismaClient():null;
async function clear(){await db!.googleOperation.deleteMany();await db!.googlePlaceReference.deleteMany();await db!.providerPilotBudget.deleteMany();await db!.researchBudget.deleteMany();}
async function setup(city="Tokyo"){
 const r=await createTrip({destinationLabel:city,destinationScope:"CITY_BASE",startDate:"2032-04-01",endDate:"2032-04-03",travelerCount:1});if(!r.ok||!r.data)throw Error("fixture");
 const t=r.data;const b=await getRecommendationBatch(t.trip.id,t.segments[0].id);if(!b.ok)throw Error("batch");
 return {t,card:b.data.cards[0],input:{tripId:t.trip.id,recommendationId:b.data.cards[0].id,requestId:randomUUID(),purpose:"identity" as const}};
}
suite("Google enrichment durable safety",()=>{
 beforeEach(async()=>{await clear();await db!.trip.deleteMany();await db!.researchPlace.deleteMany();});
 afterAll(async()=>{await clear();await db?.$disconnect();});
 for(const city of ["Tokyo","Kyoto","Osaka"])it(city+" match/context/reviews/photo stay transient through Add and saved reopening",async()=>{
  const s=await setup(city),calls=vi.fn(),http=googleHttp(calls),client=new GoogleClient("fake",http,async()=>({type:"image/png",bytes:syntheticPhoto}));
  const deps={configuration:()=>config,client:()=>client};
  const r=await enrichGoogle(s.input,deps);expect(r.candidates?.filter(c=>c.eligible)).toHaveLength(1);expect(await db!.googlePlaceReference.count()).toBe(0);
  await enrichGoogle({...s.input,requestId:randomUUID(),purpose:"confirm",token:r.candidates![0].token},deps);
  for(const purpose of ["context","reviews","photo"] as const){const result=await enrichGoogle({...s.input,requestId:randomUUID(),purpose},deps);expect(result.matched).toBe(true);expect(JSON.stringify(result)).not.toContain("/photos/synthetic");}
  const count=calls.mock.calls.length,add={tripId:s.t.trip.id,tripSegmentId:s.t.segments[0].id,recommendationId:s.card.id,dayId:s.t.days[0].id!};
  const first=await addRecommendationToDay(add),second=await addRecommendationToDay(add);expect(first.ok && second.ok && first.data.id === second.data.id).toBe(true);expect(first.ok && first.data.alreadyScheduled).toBe(false);expect(second.ok && second.data.alreadyScheduled).toBe(true);expect(calls).toHaveBeenCalledTimes(count);
  const plan=await getItineraryBuilder(s.t.trip.id);expect(plan.ok).toBe(true);expect(await db!.reservation.count({where:{tripId:s.t.trip.id}})).toBe(0);
  const rows=await db!.itineraryItem.findMany({where:{tripId:s.t.trip.id}});expect(rows).toHaveLength(1);expect(rows[0].title).toBe(s.card.place.name);
  for(const data of [rows,await db!.googlePlaceReference.findMany(),await db!.googleOperation.findMany()]){const text=JSON.stringify(data);for(const prohibited of ["Synthetic translated","userRatingCount","photoUri","weekdayDescriptions","/photos/","formattedAddress"])expect(text).not.toContain(prohibited);}
  const before=JSON.stringify(rows);await enrichGoogle({...s.input,requestId:randomUUID(),purpose:"context"},deps);expect(JSON.stringify(await db!.itineraryItem.findMany({where:{tripId:s.t.trip.id}}))).toBe(before);
 });
 it("disabled requires no provider calls or accounting writes",async()=>{const c=vi.fn();expect((await enrichGoogle({tripId:"missing",recommendationId:"missing",requestId:randomUUID(),purpose:"identity"},{configuration:()=>null,client:c})).message).toContain("disabled");expect(c).not.toHaveBeenCalled();expect(await db!.googleOperation.count()).toBe(0);});
 it("rejects wrong ownership before accounting or transport",async()=>{const s=await setup(),client=vi.fn();await expect(enrichGoogle({...s.input,tripId:"unowned"},{configuration:()=>config,client})).rejects.toThrow();expect(client).not.toHaveBeenCalled();});
 it("concurrent reservations, replay, restart, approval labels and Trip deletion cannot refund budget",async()=>{
  const s=await setup(),small={...config,ceilingMicros:70_000,googleMicros:70_000};
  const ids=Array.from({length:8},()=>randomUUID());const results=await Promise.allSettled(ids.map(id=>reserveGoogle(id,"hash","identity",small)));expect(results.filter(r=>r.status==="fulfilled")).toHaveLength(2);
  const receipt=await db!.googleOperation.findFirstOrThrow();await expect(reserveGoogle(receipt.id,"changed","identity",small)).rejects.toThrow("DUPLICATE");
  await db!.trip.delete({where:{id:s.t.trip.id}});await expect(reserveGoogle(randomUUID(),"new","identity",{...config,approval:"new-label"})).rejects.toThrow("BUDGET");
  expect((await db!.providerPilotBudget.findUniqueOrThrow({where:{id:ACCOUNT}})).googleReservedMicros).toBe(70_000);
 });
 it("existing Brave/AI reservations count against the aggregate ceiling",async()=>{await db!.researchBudget.create({data:{approval:"old-label",reservedUsd:9.99}});await expect(reserveGoogle(randomUUID(),"h","identity",config)).rejects.toThrow("BUDGET");expect(await db!.googleOperation.count()).toBe(0);});
 it("no match and ambiguous responses never auto-persist a reference; corrected match is explicit",async()=>{
  const s=await setup(),normal=new GoogleClient("fake",googleHttp());
  const p=(await normal.search(s.card.place.name+", Japan"))[0];
  for(const places of [[],[p,{...p,id:"corrected_identity"}]]){const c=new GoogleClient("fake",async()=>({status:200,headers:{},body:JSON.stringify({places})}));const r=await enrichGoogle({...s.input,requestId:randomUUID()},{configuration:()=>config,client:()=>c});expect(await db!.googlePlaceReference.count()).toBe(0);if(places.length){expect(r.message).toContain("Ambiguous");await enrichGoogle({...s.input,requestId:randomUUID(),purpose:"confirm",token:r.candidates![1].token},{configuration:()=>config});expect((await db!.googlePlaceReference.findFirstOrThrow()).googlePlaceId).toBe("corrected_identity");}}
 });
 it("missing/expired photo and changed identity leave Add usable and charge conservative",async()=>{
  const s=await setup(),normal=new GoogleClient("fake",googleHttp()),deps={configuration:()=>config,client:()=>normal};
  const r=await enrichGoogle(s.input,deps);await enrichGoogle({...s.input,requestId:randomUUID(),purpose:"confirm",token:r.candidates![0].token},deps);
  const broken=new GoogleClient("fake",googleHttp(),async()=>{throw Error("Expired reference");});
  expect((await enrichGoogle({...s.input,requestId:randomUUID(),purpose:"photo"},{...deps,client:()=>broken})).message).toContain("unavailable");
  expect(await db!.googleOperation.count({where:{state:"UNCERTAIN"}})).toBe(1);
  expect((await addRecommendationToDay({tripId:s.t.trip.id,tripSegmentId:s.t.segments[0].id,recommendationId:s.card.id,dayId:s.t.days[0].id!})).ok).toBe(true);
 });
 it("repeat seeds preserve provider references and non-refundable accounting",async()=>{
  const s=await setup(),deps={configuration:()=>config,client:()=>new GoogleClient("fake",googleHttp())};
  const r=await enrichGoogle(s.input,deps);await enrichGoogle({...s.input,purpose:"confirm",token:r.candidates![0].token},deps);
  const snapshot=async()=>({references:await db!.googlePlaceReference.findMany(),account:await db!.providerPilotBudget.findMany(),operations:await db!.googleOperation.findMany()});
  const before=await snapshot();for(let i=0;i<2;i++){await seedDemoTrip(db!,{preserveExisting:true});await seedDiscoverFixtures(db!);}expect(await snapshot()).toEqual(before);
 });
 it("Google reservation also blocks a later Brave/AI job at the shared ceiling",async()=>{
  const s=await setup();await reserveGoogle(randomUUID(),"h","identity",{...config,ceilingMicros:70_000,googleMicros:70_000});
  const r=await startDestinationResearch({tripId:s.t.trip.id,segmentId:s.t.segments[0].id,country:"Japan",language:"en"},{...researchConfig,approval:"another-label"});expect(r.ok).toBe(false);expect(await db!.researchJob.count({where:{tripId:s.t.trip.id}})).toBe(0);
 });
 it("old confirmation cannot overwrite a newly corrected reference",async()=>{
  const s=await setup(),deps={configuration:()=>config,client:()=>new GoogleClient("fake",googleHttp())};
  const a=await enrichGoogle(s.input,deps),b=await enrichGoogle({...s.input,requestId:randomUUID()},deps);
  await enrichGoogle({...s.input,purpose:"confirm",token:b.candidates![0].token},deps);
  await expect(enrichGoogle({...s.input,purpose:"confirm",token:a.candidates![0].token},deps)).rejects.toThrow("MATCH_CHANGED");
 });
 it("details revalidation rejects moved or closed venues; missing photos do not trigger media",async()=>{
  const s=await setup(),transport=googleHttp(),normal=new GoogleClient("fake",transport),deps={configuration:()=>config,client:()=>normal};
  const r=await enrichGoogle(s.input,deps);await enrichGoogle({...s.input,purpose:"confirm",token:r.candidates![0].token},deps);
  for(const patch of [{movedPlaceId:"relocated"},{businessStatus:"CLOSED_TEMPORARILY"},{id:"wrong_id"}]){
   const client=new GoogleClient("fake",async i=>{const r=await transport(i);return {...r,body:JSON.stringify({...JSON.parse(r.body),...patch})};});
   expect((await enrichGoogle({...s.input,requestId:randomUUID(),purpose:"context"},{...deps,client:()=>client})).message).toContain("unavailable");
  }
  const binary=vi.fn();const noPhoto=new GoogleClient("fake",async i=>{const r=await transport(i);const p=JSON.parse(r.body);delete p.photos;return {...r,body:JSON.stringify(p)};},binary);
  expect((await enrichGoogle({...s.input,requestId:randomUUID(),purpose:"photo"},{...deps,client:()=>noPhoto})).message).toContain("No Google photo");expect(binary).not.toHaveBeenCalled();
 });
 it("confirmation rejects tampering and expiry without persisting content",async()=>{
  const s=await setup(),deps={configuration:()=>config,client:()=>new GoogleClient("fake",googleHttp()),now:()=>new Date("2032-04-01")};
  const r=await enrichGoogle(s.input,deps),i:GoogleInput={...s.input,requestId:randomUUID(),purpose:"confirm",token:r.candidates![0].token};
  await expect(enrichGoogle({...i,token:i.token+"bad"},deps)).rejects.toThrow();await expect(enrichGoogle(i,{...deps,now:()=>new Date("2032-04-02")})).rejects.toThrow();expect(await db!.googlePlaceReference.count()).toBe(0);
 });
});
