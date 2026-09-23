import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { getTodayView } from "@/src/modules/today/service";
import * as reservationReads from "@/src/modules/reservations/read-service";
import { markItineraryItemCompleted, previewSkipItineraryItem, restoreItineraryItemToPending, skipItineraryItem, type ProgressResult } from "@/src/modules/itinerary/progress-service";
import { createPlanningBlock, previewMoveItineraryItem, confirmMoveItineraryItem, reorderItineraryItem } from "@/src/modules/itinerary/builder-service";
import { getItineraryBuilder, removeItineraryItem, scheduleAcceptedRecommendation } from "@/src/modules/itinerary/service";
import { createActivityReservation, markReservationBooked, setReservationWorkflowState } from "@/src/modules/reservations/service";
import { previewReservationCancellation, recordReservationCancellation, recordReleaseEvidence } from "@/src/modules/reservations/followup-service";
import { decideRecommendation } from "@/src/modules/discover/service";
import { createTrip, removeSegment, updateTrip } from "@/src/modules/trips/service";
import { seedDemoTrip, DEMO_TRIP_ID } from "../prisma/seed-data";
import { seedDiscoverFixtures } from "../prisma/discover-seed";
const enabled = Boolean(process.env.DATABASE_URL), integration = enabled ? describe : describe.skip;
const db = enabled ? getPrismaClient() : null, tripId = DEMO_TRIP_ID, now = new Date("2030-04-01T20:00Z");
function ok<T>(r: ProgressResult<T>): T { if (!r.ok) throw Error(r.error.message);return r.data; }
async function day(index = 0) { return (await db!.day.findMany({ where: { tripId }, orderBy: { position: "asc" } }))[index]; }
async function view(index = 0, clock = now) {return ok(await getTodayView(tripId, (await day(index)).id, clock));}
async function block(type = "FREE_TIME", extra = {}) { const r = ok(await createPlanningBlock({ tripId, dayId: (await day()).id, type, durationMinutes: 45, ...extra })); return db!.itineraryItem.findUniqueOrThrow({ where: { id: r.id } });}
async function activity() {
  const rec = await db!.recommendation.findFirstOrThrow({ where: { tripId }, orderBy: { displayRank: "asc" } });
  expect((await decideRecommendation({ tripId, tripSegmentId: rec.tripSegmentId, recommendationId: rec.id, outcome: "ACCEPTED" })).ok).toBe(true);
  const item = ok(await scheduleAcceptedRecommendation({ tripId, recommendationId: rec.id, dayId: (await day()).id, flexibility: "FIXED", startMinute: 570 }));
  return db!.itineraryItem.findUniqueOrThrow({ where: { id: item.id } });
}
async function input(itemId: string) { const v = await view(); const item = [v.plan.next, ...v.plan.remaining, ...v.plan.processed].find(i => i?.id === itemId)!;return { tripId, itemId, token: item.token }; }
async function booked(itemId: string) { const r = ok(await createActivityReservation({ tripId, itineraryItemId: itemId, state: "CHECK_BACK" }));expect((await markReservationBooked({ tripId, reservationId: r.id, confirmedDate: "2030-04-01", confirmedStartMinute: 630, confirmationReference: "SYNTHETIC-TODAY" })).ok).toBe(true);return r.id; }
async function snapshot() { return { items: await db!.itineraryItem.findMany({orderBy:{id:"asc"}}), reservations: await db!.reservation.findMany({orderBy:{id:"asc"}}), decisions: await db!.recommendationDecision.findMany({orderBy:{id:"asc"}}), evidence: await db!.evidenceRecord.findMany({orderBy:{id:"asc"}}), release:await db!.releaseObservation.findMany(), links:await db!.reservationEvidence.findMany() }; }
integration("Today composes canonical day/progress/reservation data", () => {
  beforeEach(async () => {await db!.trip.deleteMany();await db!.prototypeUser.deleteMany();await db!.evidenceRecord.deleteMany();await db!.place.deleteMany();await db!.source.deleteMany();await seedDemoTrip(db!);await seedDiscoverFixtures(db!);});
  afterEach(() => vi.restoreAllMocks());
  afterAll(async () => {await db?.$disconnect();});
  it("requires an explicit Day and rejects invalid, deleted and cross-Trip IDs without leaking them", async () => {
    expect(ok(await getTodayView(tripId, undefined, now))).toMatchObject({selected:null,invalidDay:false});
    const other = await createTrip({destinationLabel:"Private other",destinationScope:"CITY_BASE",startDate:"2031-01-01",endDate:"2031-01-02",travelerCount:1});
    const otherDay=await db!.day.findFirstOrThrow({where:{tripId:other.data!.trip.id}});
    for(const id of ["missing",otherDay.id]){const v=ok(await getTodayView(tripId,id,now));expect(v.selected).toBeNull();expect(v.invalidDay).toBe(true);expect(JSON.stringify(v)).not.toContain("Private other");}
    await db!.day.delete({where:{id:otherDay.id}});expect(ok(await getTodayView(tripId,otherDay.id,now)).invalidDay).toBe(true);
  });
  it("distinguishes repeated-city Segment identities/date ranges and preserves Unassigned days", async () => {
    const a=await view(),b=await view(13);expect(a.selected!.context).toContain("Tokyo");expect(b.selected!.context).toContain("Tokyo");expect(a.selected!.segmentId).not.toBe(b.selected!.segmentId);expect(a.selected!.context).not.toBe(b.selected!.context);
    await removeSegment(tripId,(await day()).primarySegmentId!);expect((await view()).selected).toMatchObject({date:"2030-04-01",context:"Unassigned",segmentId:null});
  });
  it("chooses position, retains untimed Free Time, and never completes from a passed clock", async () => {
    const free=await block(),transport=await block("TRANSPORTATION",{startMinute:100}),rest=await block("HOTEL_REST",{startMinute:60});
    const before=await snapshot();const v=await view(0,new Date("2099-12-31T23:59Z"));expect(v.plan.next).toMatchObject({id:free.id,startMinute:null,progress:"PENDING"});expect(v.plan.remaining.map(i=>i.id)).toEqual([transport.id,rest.id]);expect(await snapshot()).toEqual(before);
  });
  it("distinguishes an empty day from one containing only completed/skipped items", async () => {
    expect((await view()).plan.empty).toBe(true);const a=await block(),b=await block("HOTEL_REST");
    ok(await markItineraryItemCompleted(await input(a.id),now));const i=await input(b.id),p=ok(await previewSkipItineraryItem(i,now));ok(await skipItineraryItem({...i,token:p.token},now));
    expect((await view()).plan).toMatchObject({empty:false,next:null,remaining:[]});expect((await view()).plan.processed.map(i=>i.progress)).toEqual(["COMPLETED","SKIPPED"]);
  });
  it("complete persists through a fresh client and changes only canonical progress metadata", async () => {
    const item=await activity(),r=await booked(item.id),before=await snapshot();expect((await view()).plan.next!.progress).toBe("PENDING");
    ok(await markItineraryItemCompleted(await input(item.id),now));const fresh=new PrismaClient({adapter:new PrismaPg({connectionString:process.env.TEST_DATABASE_URL!})});
    try {const saved=await fresh.itineraryItem.findUniqueOrThrow({where:{id:item.id}});expect(saved).toEqual({...item,progress:"COMPLETED",progressChangedAt:now,progressActionKey:expect.any(String),revision:item.revision+1,updatedAt:expect.any(Date)});}finally{await fresh.$disconnect();}
    const after=await snapshot();expect(after.reservations).toEqual(before.reservations);expect(after.decisions).toEqual(before.decisions);expect(after.evidence).toEqual(before.evidence);expect(after.reservations[0].id).toBe(r);expect(ok(await getItineraryBuilder(tripId)).days[0].items[0].progress).toBe("COMPLETED");
  });
  it("same complete retry and concurrent identical complete preserve one timestamp/revision", async () => {
    const a=await block(),i=await input(a.id);const results=await Promise.all([markItineraryItemCompleted(i,now),markItineraryItemCompleted(i,new Date(now.getTime()+1))]);expect(results.every(r=>r.ok)).toBe(true);
    const before=await snapshot();ok(await markItineraryItemCompleted(i,new Date(now.getTime()+1000)));expect(await snapshot()).toEqual(before);expect(before.items[0].revision).toBe(1);
  });
  it("skip preview/cancel is read-only and identifies Fixed and Booked with required acknowledgement", async () => {
    const a=await activity();await booked(a.id);const i=await input(a.id),before=await snapshot(),p=ok(await previewSkipItineraryItem(i,now));expect(p).toMatchObject({title:a.title,fixed:true,booked:true});expect(await snapshot()).toEqual(before);
    expect((await skipItineraryItem({...i,token:p.token},now)).ok).toBe(false);expect(await snapshot()).toEqual(before);
    ok(await skipItineraryItem({...i,token:p.token,bookingAcknowledged:true},now));const after=await snapshot();expect(after.items[0].progress).toBe("SKIPPED");expect(after.reservations).toEqual(before.reservations);expect(after.decisions).toEqual(before.decisions);
  });
  it("skip duplicates do not rewrite metadata; restore returns to original position and has exact retry semantics", async () => {
    const a=await block(),b=await block("HOTEL_REST"),i=await input(a.id),p=ok(await previewSkipItineraryItem(i,now));
    const request={...i,token:p.token};expect((await Promise.all([skipItineraryItem(request,now),skipItineraryItem(request,now)])).every(r=>r.ok)).toBe(true);
    const skipped=await snapshot();ok(await skipItineraryItem(request,new Date(now.getTime()+1000)));expect(await snapshot()).toEqual(skipped);expect((await view()).plan.next!.id).toBe(b.id);
    const restore=await input(a.id);ok(await restoreItineraryItemToPending(restore,now));const restored=await snapshot();ok(await restoreItineraryItemToPending(restore,new Date(now.getTime()+1000)));expect(await snapshot()).toEqual(restored);expect((await view()).plan.next!.id).toBe(a.id);expect(restored.items.find(i=>i.id===a.id)?.position).toBe(0);
  });
  it("conflicting complete/skip actions serialize and only one succeeds", async () => {
    const a=await block(),i=await input(a.id),p=ok(await previewSkipItineraryItem(i,now));const results=await Promise.all([markItineraryItemCompleted(i,now),skipItineraryItem({...i,token:p.token},now)]);expect(results.filter(r=>r.ok)).toHaveLength(1);expect(["COMPLETED","SKIPPED"]).toContain((await snapshot()).items[0].progress);
  });
  it("stale complete cannot overwrite a restored/newer decision even with matching resulting state", async () => {
    const a=await block(),old=await input(a.id);ok(await markItineraryItemCompleted(old,now));ok(await restoreItineraryItemToPending(await input(a.id),now));expect((await markItineraryItemCompleted(old,now)).ok).toBe(false);
    const latest=await input(a.id);ok(await markItineraryItemCompleted(latest,now));expect((await markItineraryItemCompleted(old,now)).ok).toBe(false);
  });
  it("booking creation invalidates a prior skip preview", async () => {
    const a=await activity(),i=await input(a.id),p=ok(await previewSkipItineraryItem(i,now));await booked(a.id);expect((await skipItineraryItem({...i,token:p.token,bookingAcknowledged:true},now)).ok).toBe(false);expect((await view()).plan.next!.progress).toBe("PENDING");
  });
  it("booking changes invalidate skip confirmation and completion context", async () => {
    const a=await activity(),r=ok(await createActivityReservation({tripId,itineraryItemId:a.id,state:"CHECK_BACK"})),i=await input(a.id),p=ok(await previewSkipItineraryItem(i,now));
    ok(await setReservationWorkflowState({tripId,reservationId:r.id,state:"OPENS_LATER"}));expect((await skipItineraryItem({...i,token:p.token},now)).ok).toBe(false);expect((await markItineraryItemCompleted(i,now)).ok).toBe(false);
  });
  it("reordering invalidates old requests; moving preserves progress and invalidates retry context", async () => {
    const a=await block(),b=await block("HOTEL_REST"),old=await input(a.id);ok(await reorderItineraryItem({tripId,itemId:a.id,direction:"LATER"}));expect((await markItineraryItemCompleted(old,now)).ok).toBe(false);
    const i=await input(b.id);ok(await markItineraryItemCompleted(i,now));const p=ok(await previewMoveItineraryItem({tripId,itemId:b.id,targetDayId:(await day(1)).id}));ok(await confirmMoveItineraryItem(tripId,p.token));
    expect((await view(1)).plan.processed[0].progress).toBe("COMPLETED");expect((await markItineraryItemCompleted(i,now)).ok).toBe(false);
  });
  it.each(["COMPLETED","SKIPPED"] as const)("%s items still block occupied-Day shrink", async progress => {
    const a=await block(),i=await input(a.id);if(progress==="COMPLETED")ok(await markItineraryItemCompleted(i,now));else{const p=ok(await previewSkipItineraryItem(i,now));ok(await skipItineraryItem({...i,token:p.token},now));}
    const before=await snapshot();const r=await updateTrip({tripId,startDate:"2030-04-02",endDate:"2030-04-15",travelerCount:2});expect(r.ok).toBe(false);expect(r.errors[0].code).toBe("ITINERARY_CONTENT_WOULD_BE_REMOVED");expect(await snapshot()).toEqual(before);
  });
  it("Segment/source deletion preserves progress, scheduled snapshot and retained reservation history", async () => {
    const a=await activity(),r=await booked(a.id);ok(await markItineraryItemCompleted(await input(a.id),now));const before=await snapshot();await removeSegment(tripId,(await day()).primarySegmentId!);
    const saved=await db!.itineraryItem.findUniqueOrThrow({where:{id:a.id}});expect(saved.progress).toBe("COMPLETED");expect(saved.sourceRecommendationId).toBeNull();expect(saved.title).toBe(a.title);expect((await view()).selected!.context).toBe("Unassigned");
    await removeItineraryItem(tripId,a.id);expect(await db!.reservation.findUniqueOrThrow({where:{id:r}})).toEqual({...before.reservations[0],itineraryItemId:null});
    await block();expect((await view()).plan.next!.reservation).toBeNull();
  });
  it("repeat seed and repeated reads preserve progress, decisions, booking and evidence", async () => {
    const a=await activity(),r=await booked(a.id);ok(await recordReleaseEvidence({tripId,reservationId:r,sourceName:"Synthetic Today evidence",factualText:"Not live",precision:"UNKNOWN",attribution:"DEVELOPMENT_FIXTURE",observedAt:"2020-01-01T00:00Z"},now));ok(await markItineraryItemCompleted(await input(a.id),now));
    const skipped=await block(),request=await input(skipped.id),preview=ok(await previewSkipItineraryItem(request,now));ok(await skipItineraryItem({...request,token:preview.token},now));
    const before=await snapshot();await seedDemoTrip(db!,{preserveExisting:true});await seedDiscoverFixtures(db!);await seedDiscoverFixtures(db!);await view();await view(1);await view(13);expect(await snapshot()).toEqual(before);
  });
  it("shows planned/confirmed mismatch and keeps cancelled reservations on pending items", async () => {
    const a=await activity(),r=await booked(a.id),v=await view();expect(v.plan.next).toMatchObject({startMinute:570,progress:"PENDING",reservation:{state:"BOOKED",confirmedStartMinute:630,confirmationReference:"SYNTHETIC-TODAY"}});expect(v.plan.next!.reservation!.attention.join(" ")).toContain("Confirmed time differs");
    const p=ok(await previewReservationCancellation({tripId,reservationId:r},now));ok(await recordReservationCancellation({tripId,reservationId:r,token:p.token,externalCancellationConfirmed:true},now));expect((await view()).plan.next).toMatchObject({id:a.id,progress:"PENDING",reservation:{state:"CANCELLED"}});
  });
  it("represents failed reservation reads as unavailable, never as confirmed absence", async () => {
    await activity();vi.spyOn(reservationReads,"getTripReservations").mockResolvedValue({ok:false,error:{code:"PERSISTENCE_FAILURE",message:"Synthetic unavailable"}});
    const v=await view();expect(v.reservationUnavailable).toBe(true);expect(v.plan.next).not.toBeNull();
  });
  it("validates ownership and correct item/Trip for every capability", async () => {
    const a=await block(),i=await input(a.id),p=ok(await previewSkipItineraryItem(i,now));const before=await snapshot();
    for(const override of [{tripId:"other"},{itemId:"other"}]){expect((await markItineraryItemCompleted({...i,...override},now)).ok).toBe(false);expect((await restoreItineraryItemToPending({...i,...override},now)).ok).toBe(false);expect((await previewSkipItineraryItem({...i,...override},now)).ok).toBe(false);expect((await skipItineraryItem({...i,token:p.token,...override},now)).ok).toBe(false);}
    expect(await snapshot()).toEqual(before);const owner=await db!.prototypeUser.create({data:{displayName:"Other owner"}});await db!.trip.update({where:{id:tripId},data:{ownerId:owner.id}});
    expect((await getTodayView(tripId,a.dayId,now)).ok).toBe(false);expect((await markItineraryItemCompleted(i,now)).ok).toBe(false);expect((await previewSkipItineraryItem(i,now)).ok).toBe(false);expect((await skipItineraryItem({...i,token:p.token},now)).ok).toBe(false);expect((await restoreItineraryItemToPending(i,now)).ok).toBe(false);
  });
  it("rejects invalid transitions, tampered/expired tokens and deleted items", async () => {
    const a=await block(),i=await input(a.id);expect((await restoreItineraryItemToPending(i,now)).ok).toBe(false);expect((await skipItineraryItem(i,now)).ok).toBe(false);
    expect((await markItineraryItemCompleted({...i,token:i.token+"bad"},now)).ok).toBe(false);expect((await markItineraryItemCompleted(i,new Date(now.getTime()+31*60000))).ok).toBe(false);
    ok(await markItineraryItemCompleted(i,now));expect((await previewSkipItineraryItem(await input(a.id),now)).ok).toBe(false);expect((await markItineraryItemCompleted(await input(a.id),now)).ok).toBe(false);
    await removeItineraryItem(tripId,a.id);expect((await markItineraryItemCompleted(i,now)).ok).toBe(false);
  });
});
