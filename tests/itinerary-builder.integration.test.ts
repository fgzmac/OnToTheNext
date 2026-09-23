import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { createPlanningBlock, previewMoveItineraryItem, confirmMoveItineraryItem, reorderItineraryItem } from "@/src/modules/itinerary/builder-service";
import { getItineraryBuilder, removeItineraryItem, scheduleAcceptedRecommendation } from "@/src/modules/itinerary/service";
import { decideRecommendation } from "@/src/modules/discover/service";
import { createTrip, removeSegment, updateTrip } from "@/src/modules/trips/service";
import { movementAction } from "@/src/modules/itinerary/builder-actions";
import { toUtcDate } from "@/src/modules/trips/date-only";
import { seedDemoTrip, DEMO_TRIP_ID } from "../prisma/seed-data";
import { seedDiscoverFixtures } from "../prisma/discover-seed";
import type { ItineraryResult } from "@/src/modules/itinerary/types";
const enabled = Boolean(process.env.DATABASE_URL);
const integration = enabled ? describe : describe.skip;
const db = enabled ? getPrismaClient() : null;
function success<T>(result: ItineraryResult<T>): T { if (!result.ok) throw new Error(result.error.code + ": " + result.error.message); return result.data; }
async function day(date = "2030-04-01", tripId = DEMO_TRIP_ID) { return db!.day.findUniqueOrThrow({ where: { tripId_date: { tripId, date: toUtcDate(date) } } }); }
async function block(type = "FREE_TIME", fields: Partial<Parameters<typeof createPlanningBlock>[0]> = {}) {
  const result = await createPlanningBlock({ tripId: DEMO_TRIP_ID, dayId: (await day()).id, type, durationMinutes: 60, ...fields });
  return db!.itineraryItem.findUniqueOrThrow({ where: { id: success(result).id } });
}
async function rows() { return db!.itineraryItem.findMany({ orderBy: [{ dayId: "asc" }, { position: "asc" }] }); }
async function preview(itemId: string, date = "2030-04-02") { return success(await previewMoveItineraryItem({ tripId: DEMO_TRIP_ID, itemId, targetDayId: (await day(date)).id })); }
async function activity() {
  const rec = await db!.recommendation.findFirstOrThrow({ where: { tripId: DEMO_TRIP_ID }, orderBy: { displayRank: "asc" } });
  success(await decideRecommendation({ tripId: DEMO_TRIP_ID, tripSegmentId: rec.tripSegmentId, recommendationId: rec.id, outcome: "ACCEPTED" }).then(result => result.ok ? { ok: true as const, data: result.data } : { ok: false as const, error: { code: "NOT_FOUND" as const, message: result.error } }));
  const result = success(await scheduleAcceptedRecommendation({ tripId: DEMO_TRIP_ID, recommendationId: rec.id, dayId: (await day()).id }));
  return db!.itineraryItem.findUniqueOrThrow({ where: { id: result.id } });
}
async function assertPositions() {
  const all = await rows();
  for (const id of new Set(all.map(item => item.dayId))) expect(all.filter(item => item.dayId === id).map(item => item.position)).toEqual(all.filter(item => item.dayId === id).map((_, index) => index));
  return all;
}
async function plan() { return success(await getItineraryBuilder(DEMO_TRIP_ID)); }

integration("Itinerary Builder movement and planning blocks", () => {
  beforeEach(async () => {
    await db!.trip.deleteMany(); await db!.prototypeUser.deleteMany();
    await db!.evidenceRecord.deleteMany(); await db!.place.deleteMany(); await db!.source.deleteMany();
    await seedDemoTrip(db!); await seedDiscoverFixtures(db!);
  });
  afterAll(async () => { await db?.$disconnect(); });

  it.each(["FREE_TIME", "HOTEL_REST", "TRANSPORTATION"])("creates and rereads an intentional %s snapshot", async type => {
    const item = await block(type, { startMinute: 570, flexibility: "FIXED", notes: "Synthetic planning note" });
    expect(item).toMatchObject({ type, startMinute: 570, durationMinutes: 60, flexibility: "FIXED", notes: "Synthetic planning note", sourceRecommendationId: null, position: 0 });
    const fresh = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.TEST_DATABASE_URL! }) });
    try { expect(await fresh.itineraryItem.findUniqueOrThrow({ where: { id: item.id } })).toEqual(item); } finally { await fresh.$disconnect(); }
  });
  it("requires Free Time duration while allowing untimed/unknown-duration rest and transport", async () => {
    const dayId = (await day()).id;
    for (const durationMinutes of [null, 0, -1, 1.5]) expect((await createPlanningBlock({ tripId: DEMO_TRIP_ID, dayId, type: "FREE_TIME", durationMinutes })).ok).toBe(false);
    expect(await block("HOTEL_REST", { durationMinutes: null })).toMatchObject({ title: "Hotel / Rest", startMinute: null, durationMinutes: null, flexibility: "FLEXIBLE" });
    expect(await block("TRANSPORTATION", { durationMinutes: null })).toMatchObject({ transportationMode: "OTHER", originSegmentId: null, destinationSegmentId: null });
  });
  it("rejects unsupported types, modes, bad planning fields and misplaced transport fields atomically", async () => {
    for (const fields of [{ type: "MEAL" }, { type: "SHOPPING" }, { type: "CUSTOM" }, { type: "ACTIVITY" }, { type: "TRANSPORTATION", transportationMode: "ROCKET" }, { startMinute: 1440 }, { flexibility: "BOOKED" }, { notes: "x".repeat(2001) }, { transportationMode: "TRAIN" }]) {
      const result = await createPlanningBlock({ tripId: DEMO_TRIP_ID, dayId: (await day()).id, type: "FREE_TIME", durationMinutes: 60, ...fields }); expect(result.ok).toBe(false);
    }
    expect(await rows()).toEqual([]);
  });
  it("validates transport references, repeated-city identity and transfer-Day ownership", async () => {
    const segments = await db!.tripSegment.findMany({ where: { tripId: DEMO_TRIP_ID }, orderBy: { position: "asc" } });
    const item = await block("TRANSPORTATION", { dayId: (await day("2030-04-05")).id, transportationMode: "TRAIN", originSegmentId: segments[0].id, destinationSegmentId: segments[1].id });
    expect(item.title).toBe("Train · Tokyo → Kyoto");
    for (const fields of [{ originSegmentId: segments[3].id, destinationSegmentId: segments[0].id }, { originSegmentId: segments[0].id, destinationSegmentId: segments[0].id }, { originSegmentId: "missing" }, { destinationSegmentId: "missing" }]) {
      expect((await createPlanningBlock({ tripId: DEMO_TRIP_ID, dayId: (await day()).id, type: "TRANSPORTATION", ...fields })).ok).toBe(false);
    }
    expect(await rows()).toEqual([item]);
  });
  it("rejects foreign Trip days and Segment references", async () => {
    const other = await createTrip({ destinationLabel: "Elsewhere", destinationScope: "CITY_BASE", startDate: "2031-01-01", endDate: "2031-01-02", travelerCount: 1 });
    const otherId = other.data!.trip.id;
    const segment = await db!.tripSegment.findFirstOrThrow({ where: { tripId: otherId } });
    expect((await createPlanningBlock({ tripId: DEMO_TRIP_ID, dayId: (await day("2031-01-01", otherId)).id, type: "HOTEL_REST" })).ok).toBe(false);
    expect((await createPlanningBlock({ tripId: DEMO_TRIP_ID, dayId: (await day()).id, type: "TRANSPORTATION", originSegmentId: segment.id })).ok).toBe(false);
    expect((await createPlanningBlock({ tripId: DEMO_TRIP_ID, dayId: (await day()).id, type: "TRANSPORTATION", destinationSegmentId: segment.id })).ok).toBe(false);
  });
  it("detaches both transport references on Segment deletion and keeps the title/timing snapshot", async () => {
    const segments = await db!.tripSegment.findMany({ where: { tripId: DEMO_TRIP_ID }, orderBy: { position: "asc" } });
    const item = await block("TRANSPORTATION", { originSegmentId: segments[0].id, destinationSegmentId: segments[1].id, transportationMode: "TRAIN", startMinute: 600, flexibility: "FIXED" });
    expect((await removeSegment(DEMO_TRIP_ID, segments[0].id)).ok).toBe(true);
    expect((await removeSegment(DEMO_TRIP_ID, segments[1].id)).ok).toBe(true);
    expect(await db!.itineraryItem.findUniqueOrThrow({ where: { id: item.id } })).toEqual({ ...item, originSegmentId: null, destinationSegmentId: null });
    expect((await day()).id).toBe(item.dayId);
    expect((await preview(item.id, "2030-04-13")).targetDay).toContain("2030-04-13");
  });
  it("swaps adjacent positions in both directions without changing planning data", async () => {
    const a = await block(), b = await block("HOTEL_REST", { startMinute: 500, notes: "Rest" }), c = await block("TRANSPORTATION");
    expect(success(await reorderItineraryItem({ tripId: DEMO_TRIP_ID, itemId: b.id, direction: "LATER" })).preview).toBeNull();
    expect((await rows()).map(item => item.id)).toEqual([a.id, c.id, b.id]);
    success(await reorderItineraryItem({ tripId: DEMO_TRIP_ID, itemId: b.id, direction: "EARLIER" }));
    expect((await rows()).map(item => item.id)).toEqual([a.id, b.id, c.id]);
    const after = await db!.itineraryItem.findUniqueOrThrow({ where: { id: b.id } });
    expect(after).toMatchObject({ dayId: b.dayId, title: b.title, startMinute: b.startMinute, durationMinutes: b.durationMinutes, flexibility: b.flexibility, notes: b.notes, type: b.type });
    await assertPositions();
  });
  it("rejects boundary reorders without changing rows", async () => {
    const item = await block();
    for (const direction of ["EARLIER", "LATER"] as const) expect((await reorderItineraryItem({ tripId: DEMO_TRIP_ID, itemId: item.id, direction })).ok).toBe(false);
    expect(await rows()).toEqual([item]);
  });
  it("requires explicit confirmation for a Fixed item and for a Flexible swap with a Fixed neighbor", async () => {
    const a = await block("FREE_TIME", { flexibility: "FIXED" }); const b = await block("HOTEL_REST");
    const before = await rows();
    const fixed = success(await reorderItineraryItem({ tripId: DEMO_TRIP_ID, itemId: a.id, direction: "LATER" })).preview!;
    expect(fixed.fixedWarning).toBe("This item is marked Fixed.");
    expect(await rows()).toEqual(before);
    const neighbor = success(await reorderItineraryItem({ tripId: DEMO_TRIP_ID, itemId: b.id, direction: "EARLIER" })).preview!;
    expect(neighbor.fixedWarning).toContain("marked Fixed");
    expect(await rows()).toEqual(before);
    success(await confirmMoveItineraryItem(DEMO_TRIP_ID, neighbor.token));
    expect((await rows()).map(item => item.id)).toEqual([b.id, a.id]);
    expect((await confirmMoveItineraryItem(DEMO_TRIP_ID, fixed.token)).ok).toBe(false);
  });
  it("previews and cancels without mutation; confirms an append and normalizes the source", async () => {
    const first = await block(), moving = await block("HOTEL_REST", { flexibility: "FIXED", startMinute: 600, notes: "Keep" }), last = await block("TRANSPORTATION");
    const target = await block("FREE_TIME", { dayId: (await day("2030-04-02")).id });
    const before = await rows(); const p = await preview(moving.id);
    expect(p).toMatchObject({ title: moving.title, flexibility: "FIXED", position: "End of day", fixedWarning: "This item is marked Fixed.", issues: [] });
    expect(p.sourceDay).toContain("2030-04-01"); expect(p.targetDay).toContain("2030-04-02"); expect(await rows()).toEqual(before);
    const cancel = new FormData(); cancel.set("intent", "CANCEL");
    expect((await movementAction({ error: null, message: null, preview: p }, cancel)).preview).toBeNull();
    expect(await rows()).toEqual(before);
    success(await confirmMoveItineraryItem(DEMO_TRIP_ID, (await preview(moving.id)).token));
    const updated = await db!.itineraryItem.findUniqueOrThrow({ where: { id: moving.id } });
    expect(updated).toMatchObject({ dayId: target.dayId, position: 1, title: moving.title, notes: moving.notes, startMinute: moving.startMinute, durationMinutes: moving.durationMinutes, flexibility: moving.flexibility });
    expect((await assertPositions()).filter(item => item.dayId === first.dayId).map(item => item.id)).toEqual([first.id, last.id]);
  });
  it("rejects cross-Trip targets and wrong-Segment Activity moves", async () => {
    const item = await activity();
    expect((await previewMoveItineraryItem({ tripId: DEMO_TRIP_ID, itemId: item.id, targetDayId: (await day("2030-04-06")).id })).ok).toBe(false);
    expect((await previewMoveItineraryItem({ tripId: DEMO_TRIP_ID, itemId: item.id, targetDayId: (await day("2030-04-13")).id })).ok).toBe(false);
    const other = await createTrip({ destinationLabel: "Other", destinationScope: "COUNTRY_REGION", startDate: "2031-01-01", endDate: "2031-01-02", travelerCount: 1 });
    expect((await previewMoveItineraryItem({ tripId: DEMO_TRIP_ID, itemId: item.id, targetDayId: (await day("2031-01-01", other.data!.trip.id)).id })).ok).toBe(false);
    const p = await preview(item.id, "2030-04-05"); success(await confirmMoveItineraryItem(DEMO_TRIP_ID, p.token));
    expect((await db!.recommendationDecision.findUniqueOrThrow({ where: { recommendationId: item.sourceRecommendationId! } })).outcome).toBe("ACCEPTED");
  });
  it("lets a detached Activity move independently", async () => {
    const item = await activity(); await db!.recommendation.delete({ where: { id: item.sourceRecommendationId! } });
    success(await confirmMoveItineraryItem(DEMO_TRIP_ID, (await preview(item.id, "2030-04-13")).token));
    expect((await rows())[0].dayId).toBe((await day("2030-04-13")).id);
  });
  it("restricts Transportation moves to origin Days, or any Day when origin is absent", async () => {
    const origin = (await day()).primarySegmentId!;
    const item = await block("TRANSPORTATION", { originSegmentId: origin });
    expect((await previewMoveItineraryItem({ tripId: DEMO_TRIP_ID, itemId: item.id, targetDayId: (await day("2030-04-06")).id })).ok).toBe(false);
    success(await confirmMoveItineraryItem(DEMO_TRIP_ID, (await preview(item.id, "2030-04-05")).token));
    const local = await block("TRANSPORTATION"); success(await confirmMoveItineraryItem(DEMO_TRIP_ID, (await preview(local.id, "2030-04-13")).token));
  });
  it("rejects stale previews after item edits or new target conflicts, with no partial move", async () => {
    const item = await block(); const p = await preview(item.id);
    await db!.itineraryItem.update({ where: { id: item.id }, data: { notes: "Changed after preview" } });
    const before = await rows(); const stale = await confirmMoveItineraryItem(DEMO_TRIP_ID, p.token);
    expect(!stale.ok && stale.error.code).toBe("MOVE_PREVIEW_STALE"); expect(await rows()).toEqual(before);
    const another = await preview(item.id); await block("HOTEL_REST", { dayId: (await day("2030-04-02")).id });
    const beforeTarget = await rows(); expect((await confirmMoveItineraryItem(DEMO_TRIP_ID, another.token)).ok).toBe(false); expect(await rows()).toEqual(beforeTarget);
  });
  it("rejects stale structural context, deleted source items and tampered tokens", async () => {
    const item = await block(); const p = await preview(item.id);
    expect((await updateTrip({ tripId: DEMO_TRIP_ID, startDate: "2030-04-01", endDate: "2030-04-16", travelerCount: 2 })).ok).toBe(true);
    expect((await confirmMoveItineraryItem(DEMO_TRIP_ID, p.token)).ok).toBe(false);
    const fresh = await preview(item.id); success(await removeItineraryItem(DEMO_TRIP_ID, item.id));
    expect((await confirmMoveItineraryItem(DEMO_TRIP_ID, fresh.token)).ok).toBe(false);
    expect((await confirmMoveItineraryItem(DEMO_TRIP_ID, fresh.token + "x")).ok).toBe(false);
  });
  it("handles duplicate confirmation safely", async () => {
    const item = await block(); const p = await preview(item.id);
    success(await confirmMoveItineraryItem(DEMO_TRIP_ID, p.token)); const before = await rows();
    const again = await confirmMoveItineraryItem(DEMO_TRIP_ID, p.token);
    expect(!again.ok && again.error.code).toBe("MOVE_PREVIEW_STALE"); expect(await rows()).toEqual(before);
  });
  it("derives factual conflicts and permits a confirmed overlapping move without retiming", async () => {
    const item = await block("FREE_TIME", { startMinute: 570 });
    await block("HOTEL_REST", { dayId: (await day("2030-04-02")).id, startMinute: 600 });
    const before = await rows(); const p = await preview(item.id);
    expect(p.issues[0].code).toBe("TIME_OVERLAP"); expect(p.issues[0].message).toContain("09:30–10:30"); expect(await rows()).toEqual(before);
    success(await confirmMoveItineraryItem(DEMO_TRIP_ID, p.token));
    expect((await plan()).days[1].issues[0].code).toBe("TIME_OVERLAP");
    const after = await rows(); await plan(); await plan(); expect(await rows()).toEqual(after);
    expect(after.find(row => row.id === item.id)?.startMinute).toBe(570);
  });
  it("does not conflict back-to-back or untimed items and reports past-midnight without extra rows", async () => {
    await block("FREE_TIME", { startMinute: 540 }); await block("HOTEL_REST", { startMinute: 600 }); await block("TRANSPORTATION");
    expect((await plan()).days[0].issues).toEqual([]);
    await block("HOTEL_REST", { startMinute: 1430, durationMinutes: 30 });
    expect((await plan()).days[0].issues.map(issue => issue.code)).toEqual(["PAST_MIDNIGHT"]);
    expect(await db!.itineraryItem.count()).toBe(4);
  });
  it.each(["FREE_TIME", "HOTEL_REST", "TRANSPORTATION"])("blocks occupied-Day shrink for %s and rolls back all fields", async type => {
    await block(type, { dayId: (await day("2030-04-15")).id });
    const before = await rows(); const trip = await db!.trip.findUniqueOrThrow({ where: { id: DEMO_TRIP_ID } });
    const result = await updateTrip({ tripId: DEMO_TRIP_ID, name: "Must roll back", startDate: "2030-04-01", endDate: "2030-04-14", travelerCount: 99 });
    expect(result.errors[0].code).toBe("ITINERARY_CONTENT_WOULD_BE_REMOVED"); expect(await rows()).toEqual(before); expect(await db!.trip.findUniqueOrThrow({ where: { id: DEMO_TRIP_ID } })).toEqual(trip);
  });
  it("serializes two manual appends", async () => {
    const dayId = (await day()).id;
    const results = await Promise.all(["FREE_TIME", "HOTEL_REST"].map(type => createPlanningBlock({ tripId: DEMO_TRIP_ID, dayId, type, durationMinutes: 60 })));
    expect(results.every(result => result.ok)).toBe(true); expect(await assertPositions()).toHaveLength(2);
  });
  it("serializes reorder versus removal", async () => {
    const a = await block(), b = await block("HOTEL_REST"), c = await block("TRANSPORTATION");
    const results = await Promise.all([reorderItineraryItem({ tripId: DEMO_TRIP_ID, itemId: b.id, direction: "LATER" }), removeItineraryItem(DEMO_TRIP_ID, a.id)]);
    expect(results.every(result => result.ok)).toBe(true); expect((await assertPositions()).map(item => item.id)).toEqual([c.id, b.id]);
  });
  it("serializes two confirmations for the same item without losing either Day's ordering", async () => {
    const item = await block(); const p = await preview(item.id); const q = await preview(item.id, "2030-04-03");
    const results = await Promise.all([confirmMoveItineraryItem(DEMO_TRIP_ID, p.token), confirmMoveItineraryItem(DEMO_TRIP_ID, q.token)]);
    expect(results.filter(result => result.ok)).toHaveLength(1); expect(results.filter(result => !result.ok && result.error.code === "MOVE_PREVIEW_STALE")).toHaveLength(1); expect(await assertPositions()).toHaveLength(1);
  });
  it("serializes a move versus Trip structural edit without content loss", async () => {
    const item = await block(); const p = await preview(item.id);
    const [move, edit] = await Promise.all([confirmMoveItineraryItem(DEMO_TRIP_ID, p.token), updateTrip({ tripId: DEMO_TRIP_ID, startDate: "2030-04-01", endDate: "2030-04-16", travelerCount: 2 })]);
    expect(edit.ok).toBe(true); if (!move.ok) expect(move.error.code).toBe("MOVE_PREVIEW_STALE");
    expect(await assertPositions()).toHaveLength(1); expect((await plan()).days).toHaveLength(16);
  });
  it("checks prototype ownership for all new operations", async () => {
    const item = await block(); const p = await preview(item.id); const owner = await db!.prototypeUser.create({ data: { displayName: "Other" } });
    await db!.trip.update({ where: { id: DEMO_TRIP_ID }, data: { ownerId: owner.id } });
    expect((await createPlanningBlock({ tripId: DEMO_TRIP_ID, dayId: item.dayId, type: "HOTEL_REST" })).ok).toBe(false);
    expect((await previewMoveItineraryItem({ tripId: DEMO_TRIP_ID, itemId: item.id, targetDayId: (await day("2030-04-02")).id })).ok).toBe(false);
    expect((await reorderItineraryItem({ tripId: DEMO_TRIP_ID, itemId: item.id, direction: "LATER" })).ok).toBe(false);
    expect((await confirmMoveItineraryItem(DEMO_TRIP_ID, p.token)).ok).toBe(false); expect(await rows()).toEqual([item]);
  });
});
