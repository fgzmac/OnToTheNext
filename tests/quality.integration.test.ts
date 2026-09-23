import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getPrismaClient } from "@/src/lib/prisma";
import { createTrip } from "@/src/modules/trips/service";
import { CATALOG, catalogPlace } from "@/src/modules/discover/catalog";
import { getRecommendationBatch, requestAnotherRecommendationBatch, decideRecommendation, updateTripDiscoverInterests } from "@/src/modules/discover/service";
import { addRecommendationToDay, getItineraryBuilder, scheduleAcceptedRecommendation } from "@/src/modules/itinerary/service";
import { previewMoveItineraryItem } from "@/src/modules/itinerary/builder-service";
import { createActivityReservation } from "@/src/modules/reservations/service";
const suite = process.env.TEST_DATABASE_URL ? describe : describe.skip;
const db = process.env.TEST_DATABASE_URL ? getPrismaClient() : null;
const original = structuredClone(CATALOG);
function ok<T>(r: {ok:true;data:T}|{ok:false;error:unknown}): T { if (!r.ok) throw Error(JSON.stringify(r.error)); return r.data; }
async function trip(startDate="2032-04-01",endDate="2032-04-03") {
  const r = await createTrip({destinationLabel:"Tokyo",destinationScope:"CITY_BASE",startDate,endDate,travelerCount:1});
  if (!r.ok || !r.data) throw Error(JSON.stringify(r)); return r.data;
}
async function eventSetup() {
  const t=await trip("2026-10-30","2026-11-02"); await getRecommendationBatch(t.trip.id,t.segments[0].id);
  const r=await db!.recommendation.findFirstOrThrow({where:{tripId:t.trip.id,placeId:"curated-tea-ceremony-2026"}});
  return {t,r,input:{tripId:t.trip.id,tripSegmentId:t.segments[0].id,recommendationId:r.id,dayId:t.days[1].id!}};
}
suite("quality pilot persistence",()=>{
  beforeEach(async()=>{
    vi.useFakeTimers({toFake:["Date"]}); vi.setSystemTime(new Date("2026-09-23T12:00:00Z"));
    await db!.trip.deleteMany(); await db!.prototypeUser.deleteMany(); await db!.evidenceRecord.deleteMany(); await db!.source.deleteMany(); await db!.place.deleteMany();
  });
  afterEach(()=>{vi.useRealTimers();CATALOG.splice(0,CATALOG.length,...structuredClone(original));});
  afterAll(async()=>{await db?.$disconnect();});
  it("respects existing interests in the first batch and supplies real-photo metadata",async()=>{
    const t=await trip();ok(await updateTripDiscoverInterests(t.trip.id,["ENTERTAINMENT"]));const b=ok(await getRecommendationBatch(t.trip.id,t.segments[0].id));
    expect(b.cards.every(c=>catalogPlace(c.place.id)!.interests.includes("ENTERTAINMENT"))).toBe(true);
    expect(b.cards.every(c=>c.photo?.asset)).toBe(true);expect(b.cards.some(c=>c.place.id==="curated-teamlab-planets")).toBe(true);
  });
  it("adds new candidates without rewriting historical batches, decisions or scheduled snapshots",async()=>{
    const additions=CATALOG.filter(p=>p.city==="Tokyo").slice(8).map(p=>p.id);
    CATALOG.splice(0,CATALOG.length,...CATALOG.filter(p=>!additions.includes(p.id)));
    const t=await trip(),tripId=t.trip.id,tripSegmentId=t.segments[0].id;const b=ok(await getRecommendationBatch(tripId,tripSegmentId));
    ok(await addRecommendationToDay({tripId,tripSegmentId,recommendationId:b.cards[0].id,dayId:t.days[0].id!}));
    ok(await decideRecommendation({tripId,tripSegmentId,recommendationId:b.cards[1].id,outcome:"DENIED"}));
    const records=await db!.recommendation.findMany({where:{tripId},orderBy:{id:"asc"}}),decisions=await db!.recommendationDecision.findMany(),items=await db!.itineraryItem.findMany();
    CATALOG.splice(0,CATALOG.length,...structuredClone(original));const refreshed=ok(await getRecommendationBatch(tripId,tripSegmentId));
    expect(refreshed.cards.map(c=>c.id)).toEqual(b.cards.map(c=>c.id));expect(refreshed.total).toBe(24);
    expect(await db!.recommendation.findMany({where:{id:{in:records.map(r=>r.id)}},orderBy:{id:"asc"}})).toEqual(records);
    expect(await db!.recommendationDecision.findMany()).toEqual(decisions);expect(await db!.itineraryItem.findMany()).toEqual(items);
    let page=0;const reached=new Set<string>();for(let i=0;i<8;i++){
      page=ok(await requestAnotherRecommendationBatch({tripId,tripSegmentId,fromBatch:page})).page;
      const next=ok(await getRecommendationBatch(tripId,tripSegmentId,String(page)));next.cards.forEach(c=>reached.add(c.place.id));if(!next.unassigned)break;
    }
    expect(reached.has("curated-pokemon-shibuya")).toBe(true);expect(reached.has("curated-teamlab-planets")).toBe(true);expect(reached.has(b.cards[1].place.id)).toBe(false);
  });
  it("appends evidence versions without changing recommendation snapshots",async()=>{
    const t=await trip();const b=ok(await getRecommendationBatch(t.trip.id,t.segments[0].id));const r=await db!.recommendation.findUniqueOrThrow({where:{id:b.cards[0].id}});
    const before=await db!.evidenceRecord.findMany({where:{placeId:r.placeId}});catalogPlace(r.placeId)!.summary+=" Version-test context.";
    await getRecommendationBatch(t.trip.id,t.segments[0].id);expect(await db!.recommendation.findUnique({where:{id:r.id}})).toEqual(r);
    expect(await db!.evidenceRecord.count({where:{placeId:r.placeId}})).toBe(before.length+1);for(const row of before)expect(await db!.evidenceRecord.findUnique({where:{id:row.id}})).toEqual(row);
  });
  it("filters event candidates by selected Day and rejects foreign Day context",async()=>{
    const s=await eventSetup();const outside=ok(await getRecommendationBatch(s.input.tripId,s.input.tripSegmentId,undefined,s.t.days[0].id!));
    expect(outside.eventCount).toBe(0);expect(outside.cards.some(c=>c.event)).toBe(false);
    expect(ok(await getRecommendationBatch(s.input.tripId,s.input.tripSegmentId,undefined,s.input.dayId)).eventCount).toBe(2);
    const other=await trip();expect((await getRecommendationBatch(s.input.tripId,s.input.tripSegmentId,undefined,other.days[0].id!)).ok).toBe(false);
    let page=0;for(let i=0;i<8;i++){
      page=ok(await requestAnotherRecommendationBatch({...s.input,fromBatch:page,dayId:s.t.days[0].id!})).page;
      const next=ok(await getRecommendationBatch(s.input.tripId,s.input.tripSegmentId,String(page),s.t.days[0].id!));expect(next.cards.some(c=>c.event)).toBe(false);if(!next.unassigned)break;
    }
    page=ok(await requestAnotherRecommendationBatch({...s.input,fromBatch:page})).page;
    expect(ok(await getRecommendationBatch(s.input.tripId,s.input.tripSegmentId,String(page),s.input.dayId)).cards.some(c=>c.event)).toBe(true);
  });
  it("invalid event Add preserves a prior denial and writes no item",async()=>{
    const s=await eventSetup();ok(await decideRecommendation({...s.input,outcome:"DENIED"}));const before=await db!.recommendationDecision.findUnique({where:{recommendationId:s.r.id}});
    expect((await addRecommendationToDay({...s.input,dayId:s.t.days[0].id!})).ok).toBe(false);
    expect(await db!.itineraryItem.count()).toBe(0);expect(await db!.recommendationDecision.findUnique({where:{recommendationId:s.r.id}})).toEqual(before);
  });
  it("standalone Accept stays unscheduled and event guards cover scheduling and moves",async()=>{
    const s=await eventSetup();ok(await decideRecommendation({...s.input,outcome:"ACCEPTED"}));expect(await db!.itineraryItem.count()).toBe(0);
    expect((await scheduleAcceptedRecommendation({...s.input,dayId:s.t.days[0].id!})).ok).toBe(false);
    const added=ok(await addRecommendationToDay(s.input));expect((await previewMoveItineraryItem({tripId:s.input.tripId,itemId:added.id,targetDayId:s.t.days[0].id!})).ok).toBe(false);
  });
  it.each(["CANCELLED","UNKNOWN"] as const)("rejects %s without acceptance",async status=>{
    const s=await eventSetup();catalogPlace(s.r.placeId)!.event!.status=status;
    expect((await addRecommendationToDay(s.input)).ok).toBe(false);expect(await db!.recommendationDecision.count()).toBe(0);expect(await db!.itineraryItem.count()).toBe(0);
  });
  it("keeps event snapshots and reservations after cancellation and warns for review",async()=>{
    const s=await eventSetup();const added=ok(await addRecommendationToDay(s.input));ok(await createActivityReservation({tripId:s.input.tripId,itineraryItemId:added.id,state:"OPTIONAL"}));
    const item=await db!.itineraryItem.findUniqueOrThrow({where:{id:added.id}}),reservations=await db!.reservation.findMany();catalogPlace(s.r.placeId)!.event!.status="CANCELLED";
    const builder=ok(await getItineraryBuilder(s.input.tripId));expect(builder.days.flatMap(d=>d.items).find(i=>i.id===added.id)!.eventWarning).toContain("have not been changed");
    expect(await db!.itineraryItem.findUnique({where:{id:added.id}})).toEqual(item);expect(await db!.reservation.findMany()).toEqual(reservations);expect(ok(await addRecommendationToDay(s.input)).alreadyScheduled).toBe(true);
  });
  it("blocks stale and expired occurrences while retaining records",async()=>{
    const s=await eventSetup();vi.setSystemTime(new Date("2026-10-07T15:00:00Z"));
    expect((await addRecommendationToDay(s.input)).ok).toBe(false);expect(ok(await getRecommendationBatch(s.input.tripId,s.input.tripSegmentId)).eventCount).toBe(0);expect(await db!.recommendation.findUnique({where:{id:s.r.id}})).not.toBeNull();
    vi.setSystemTime(new Date("2026-11-01T15:00:00Z"));expect((await addRecommendationToDay(s.input)).ok).toBe(false);
  });
});
