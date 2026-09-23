import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { decideRecommendation } from "@/src/modules/discover/service";
import { scheduleAcceptedRecommendation, removeItineraryItem } from "@/src/modules/itinerary/service";
import { createPlanningBlock, previewMoveItineraryItem, confirmMoveItineraryItem } from "@/src/modules/itinerary/builder-service";
import { createTrip } from "@/src/modules/trips/service";
import { formatDateOnly, toUtcDate } from "@/src/modules/trips/date-only";
import { createActivityReservation, getItineraryReservationContext, linkReservationEvidence, markReservationBooked, setReservationWorkflowState, updateReservationDesiredTime } from "@/src/modules/reservations/service";
import { PLANNING_STATES } from "@/src/modules/reservations/domain";
import { seedDemoTrip, DEMO_TRIP_ID } from "../prisma/seed-data";
import { seedDiscoverFixtures } from "../prisma/discover-seed";
const enabled = Boolean(process.env.DATABASE_URL), integration = enabled ? describe : describe.skip;
const prisma = enabled ? getPrismaClient() : null;
const tripId = DEMO_TRIP_ID;
async function day(date = "2030-04-01") { return prisma!.day.findUniqueOrThrow({ where: { tripId_date: { tripId, date: toUtcDate(date) } } }); }
async function scheduled(index = 0) {
  const rec = (await prisma!.recommendation.findMany({ where: { tripId }, orderBy: { displayRank: "asc" } }))[index];
  expect((await decideRecommendation({ tripId, tripSegmentId: rec.tripSegmentId, recommendationId: rec.id, outcome: "ACCEPTED" })).ok).toBe(true);
  const result = await scheduleAcceptedRecommendation({ tripId, recommendationId: rec.id, dayId: (await day()).id, startMinute: 570, flexibility: "FIXED" });
  if (!result.ok) throw new Error(result.error.message);
  return prisma!.itineraryItem.findUniqueOrThrow({ where: { id: result.data.id } });
}
async function reservation(index = 0) {
  const item = await scheduled(index);
  const result = await createActivityReservation({ tripId, itineraryItemId: item.id, state: "CHECK_BACK", desiredDate: "2030-04-01", desiredStartMinute: 570,
    bookingSourceLabel: "Development fixture", bookingUrl: "https://example.com/booking", notes: "Synthetic planning note" });
  if (!result.ok) throw new Error(result.error.message);
  return { item, id: result.data.id, identity: { tripId, reservationId: result.data.id } };
}
const read = (id: string) => prisma!.reservation.findUniqueOrThrow({ where: { id } });
async function evidence() { return prisma!.evidenceRecord.findMany({ where: { placeId: "cmg00000000000000000000301", topic: { in: ["Ticket availability", "Booking policy"] } }, orderBy: { topic: "asc" } }); }
integration("Explicit Activity Reservation workflow", () => {
  beforeEach(async () => {
    await prisma!.trip.deleteMany(); await prisma!.prototypeUser.deleteMany(); await prisma!.evidenceRecord.deleteMany(); await prisma!.place.deleteMany(); await prisma!.source.deleteMany();
    await seedDemoTrip(prisma!); await seedDiscoverFixtures(prisma!);
  });
  afterAll(async () => { await prisma?.$disconnect(); });
  it("accepting and scheduling a Fixed Activity never creates a Reservation", async () => {
    const item = await scheduled(); expect(item.flexibility).toBe("FIXED"); expect(await prisma!.reservation.count()).toBe(0);
    const result = await createActivityReservation({ tripId, itineraryItemId: item.id, state: "CHECK_BACK" });
    expect(result.ok).toBe(true); expect(await prisma!.reservation.count()).toBe(1);
  });
  it.each(["FREE_TIME", "HOTEL_REST", "TRANSPORTATION"])("rejects %s in Slice 1", async type => {
    const block = await createPlanningBlock({ tripId, dayId: (await day()).id, type, durationMinutes: 60, transportationMode: type === "TRANSPORTATION" ? "TRAIN" : undefined });
    if (!block.ok) throw new Error(block.error.message);
    const result = await createActivityReservation({ tripId, itineraryItemId: block.data.id, state: "CHECK_BACK" });
    expect(!result.ok && result.error.code).toBe("NOT_ACTIVITY"); expect(await prisma!.reservation.count()).toBe(0);
  });
  it.each(["BOOKED", "CANCELLED"])("rejects direct creation as %s", async state => {
    const item = await scheduled(); expect((await createActivityReservation({ tripId, itineraryItemId: item.id, state })).ok).toBe(false); expect(await prisma!.reservation.count()).toBe(0);
  });
  it("enforces same Trip, nullable uniqueness and concurrent duplicate safety", async () => {
    const item = await scheduled();
    const other = await createTrip({ destinationLabel: "Other", destinationScope: "CITY_BASE", startDate: "2031-01-01", endDate: "2031-01-02", travelerCount: 1 });
    expect((await createActivityReservation({ tripId: other.data!.trip.id, itineraryItemId: item.id, state: "CHECK_BACK" })).ok).toBe(false);
    const results = await Promise.all(Array.from({ length: 3 }, () => createActivityReservation({ tripId, itineraryItemId: item.id, state: "CHECK_BACK" })));
    expect(results.filter(result => result.ok)).toHaveLength(1); expect(await prisma!.reservation.count()).toBe(1);
    await expect(prisma!.reservation.create({ data: { tripId, itineraryItemId: item.id, type: "ACTIVITY", state: "OPTIONAL" } })).rejects.toMatchObject({ code: "P2002" });
  });
  it("rejects foreign-owner reads and every reservation mutation", async () => {
    const r = await reservation(); const e = (await evidence())[0];
    const owner = await prisma!.prototypeUser.create({ data: { displayName: "Other test owner" } });
    await prisma!.trip.update({ where: { id: tripId }, data: { ownerId: owner.id } });
    for (const result of await Promise.all([
      getItineraryReservationContext(tripId), createActivityReservation({ tripId, itineraryItemId: r.item.id, state: "CHECK_BACK" }),
      setReservationWorkflowState({ ...r.identity, state: "OPTIONAL" }), updateReservationDesiredTime({ ...r.identity, desiredStartMinute: 600 }),
      markReservationBooked(r.identity), linkReservationEvidence({ ...r.identity, evidenceRecordId: e.id }),
    ])) expect(!result.ok && result.error.code).toBe("NOT_FOUND");
    expect((await read(r.id)).state).toBe("CHECK_BACK");
  });
  it("rejects cross-Trip reservation identifiers for every mutation", async () => {
    const r = await reservation(); const other = await createTrip({ destinationLabel: "Other", destinationScope: "CITY_BASE", startDate: "2031-01-01", endDate: "2031-01-02", travelerCount: 1 });
    const identity = { tripId: other.data!.trip.id, reservationId: r.id };
    for (const result of await Promise.all([setReservationWorkflowState({ ...identity, state: "OPTIONAL" }), updateReservationDesiredTime(identity), markReservationBooked(identity), linkReservationEvidence({ ...identity, evidenceRecordId: (await evidence())[0].id })])) expect(result.ok).toBe(false);
    expect((await read(r.id)).state).toBe("CHECK_BACK");
  });
  it("persists desired and confirmed dates/minutes separately across a fresh client", async () => {
    const r = await reservation(); expect((await markReservationBooked({ ...r.identity, confirmedDate: "2030-04-03", confirmedStartMinute: 630, confirmationReference: "SYNTHETIC-ABC123" })).ok).toBe(true);
    const fresh = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.TEST_DATABASE_URL! }) });
    try { const saved = await fresh.reservation.findUniqueOrThrow({ where: { id: r.id } });
      expect(saved).toMatchObject({ state: "BOOKED", desiredStartMinute: 570, confirmedStartMinute: 630, confirmationReference: "SYNTHETIC-ABC123", notes: "Synthetic planning note" });
      expect(formatDateOnly(saved.desiredDate!)).toBe("2030-04-01"); expect(formatDateOnly(saved.confirmedDate!)).toBe("2030-04-03");
      expect(await fresh.itineraryItem.findUniqueOrThrow({ where: { id: r.item.id } })).toEqual(r.item);
    } finally { await fresh.$disconnect(); }
  });
  it("keeps reservation desired snapshots independent of itinerary moves/time edits in both directions", async () => {
    const r = await reservation(); const before = await read(r.id);
    const preview = await previewMoveItineraryItem({ tripId, itemId: r.item.id, targetDayId: (await day("2030-04-02")).id });
    if (!preview.ok) throw new Error(preview.error.message);
    expect((await confirmMoveItineraryItem(tripId, preview.data.token)).ok).toBe(true);
    await prisma!.itineraryItem.update({ where: { id: r.item.id }, data: { startMinute: 660 } });
    expect(await read(r.id)).toEqual(before);
    const moved = await prisma!.itineraryItem.findUniqueOrThrow({ where: { id: r.item.id } });
    expect((await updateReservationDesiredTime({ ...r.identity, desiredDate: "2030-04-04", desiredStartMinute: 700 })).ok).toBe(true);
    expect(await prisma!.itineraryItem.findUniqueOrThrow({ where: { id: r.item.id } })).toEqual(moved);
    expect(formatDateOnly((await read(r.id)).desiredDate!)).toBe("2030-04-04"); expect((await read(r.id)).desiredStartMinute).toBe(700);
  });
  it.each(PLANNING_STATES)("persists deliberate %s planning state", async state => {
    const r = await reservation(); expect((await setReservationWorkflowState({ ...r.identity, state })).ok).toBe(true); expect((await read(r.id)).state).toBe(state);
  });
  it.each(["BOOKED", "CANCELLED"])("generic workflow cannot set %s", async state => {
    const r = await reservation(); const before = await read(r.id); expect((await setReservationWorkflowState({ ...r.identity, state })).ok).toBe(false); expect(await read(r.id)).toEqual(before);
  });
  it("blocks Booked demotion and repeated booking without overwriting confirmation", async () => {
    const r = await reservation(); expect((await markReservationBooked({ ...r.identity, confirmationReference: "FIRST" })).ok).toBe(true); const before = await read(r.id);
    expect((await setReservationWorkflowState({ ...r.identity, state: "OPTIONAL" })).ok).toBe(false);
    expect((await updateReservationDesiredTime({ ...r.identity, desiredStartMinute: 900 })).ok).toBe(false);
    expect((await markReservationBooked({ ...r.identity, confirmationReference: "SECOND" })).ok).toBe(false); expect(await read(r.id)).toEqual(before);
  });
  it("serializes simultaneous booking confirmations so only one succeeds", async () => {
    const r = await reservation(); const results = await Promise.all(["ONE", "TWO"].map(confirmationReference => markReservationBooked({ ...r.identity, confirmationReference })));
    expect(results.filter(result => result.ok)).toHaveLength(1); expect(["ONE", "TWO"]).toContain((await read(r.id)).confirmationReference);
  });
  it.each([{ confirmedDate: "2030-02-30" }, { confirmedStartMinute: -1 }, { confirmedStartMinute: 1440 }, { confirmationReference: "x".repeat(121) }, { notes: "x".repeat(2001) }])("failed booking preserves prior state (%j)", async invalid => {
    const r = await reservation(); const before = await read(r.id); expect((await markReservationBooked({ ...r.identity, ...invalid })).ok).toBe(false); expect(await read(r.id)).toEqual(before);
  });
  it.each(["javascript:alert(1)", "data:text/plain,x", "file:///local"])("rejects unsafe booking URL %s without creating a record", async bookingUrl => {
    const item = await scheduled(); expect((await createActivityReservation({ tripId, itineraryItemId: item.id, state: "CHECK_BACK", bookingUrl })).ok).toBe(false); expect(await prisma!.reservation.count()).toBe(0);
  });
  it("URL existence and repeated context reads leave workflow unchanged", async () => {
    const r = await reservation(); const before = await read(r.id);
    for (let i = 0; i < 2; i++) { const context = await getItineraryReservationContext(tripId); expect(context.ok && context.data[0].reservation?.bookingUrl).toBe("https://example.com/booking"); }
    expect(await read(r.id)).toEqual(before);
  });
  it("links multiple reusable evidence records idempotently without changing workflow, including after evidence edits", async () => {
    const r = await reservation(); const before = await read(r.id); const records = await evidence(); expect(records).toHaveLength(2);
    for (const e of [...records, records[0]]) expect((await linkReservationEvidence({ ...r.identity, evidenceRecordId: e.id })).ok).toBe(true);
    expect(await prisma!.reservationEvidence.count()).toBe(2);
    await prisma!.evidenceRecord.update({ where: { id: records[0].id }, data: { factualText: "Development fixture: illustrative tickets available. Not live." } });
    expect(await read(r.id)).toEqual(before);
    const context = await getItineraryReservationContext(tripId); expect(context.ok && context.data[0].reservation?.evidence).toHaveLength(2);
    // The same reusable Place evidence can support a second Activity reservation.
    const other = await scheduled(1);
    await prisma!.recommendation.update({ where: { id: other.sourceRecommendationId! }, data: { placeId: r.item.sourceRecommendationId ? (await prisma!.recommendation.findUniqueOrThrow({ where: { id: r.item.sourceRecommendationId } })).placeId : "" , tripSegmentId: "cmg00000000000000000000012" } });
    const second = await createActivityReservation({ tripId, itineraryItemId: other.id, state: "OPTIONAL" });
    if (!second.ok) throw new Error(second.error.message);
    expect((await linkReservationEvidence({ tripId, reservationId: second.data.id, evidenceRecordId: records[0].id })).ok).toBe(true); expect(await prisma!.reservationEvidence.count({ where: { evidenceRecordId: records[0].id } })).toBe(2);
  });
  it("rejects wrong-Place and unrelated evidence", async () => {
    const r = await reservation(); const wrong = await prisma!.evidenceRecord.findFirstOrThrow({ where: { placeId: { not: "cmg00000000000000000000301" } } });
    const unrelated = await prisma!.evidenceRecord.findFirstOrThrow({ where: { placeId: "cmg00000000000000000000301", topic: "Development experience" } });
    for (const e of [wrong, unrelated]) expect((await linkReservationEvidence({ ...r.identity, evidenceRecordId: e.id })).ok).toBe(false); expect(await prisma!.reservationEvidence.count()).toBe(0);
  });
  it("changing the Recommendation to Denied leaves Item and Reservation unchanged", async () => {
    const r = await reservation(); const before = await read(r.id); const rec = await prisma!.recommendation.findUniqueOrThrow({ where: { id: r.item.sourceRecommendationId! } });
    expect((await decideRecommendation({ tripId, tripSegmentId: rec.tripSegmentId, recommendationId: rec.id, outcome: "DENIED" })).ok).toBe(true);
    expect(await read(r.id)).toEqual(before); expect(await prisma!.itineraryItem.findUniqueOrThrow({ where: { id: r.item.id } })).toEqual(r.item);
  });
  it.each([false, true])("item removal detaches and preserves Reservation, booking and evidence (booked=%s)", async booked => {
    const r = await reservation(); await linkReservationEvidence({ ...r.identity, evidenceRecordId: (await evidence())[0].id });
    if (booked) await markReservationBooked({ ...r.identity, confirmedDate: "2030-04-03", confirmedStartMinute: 630, confirmationReference: "PRESERVED" });
    const before = await read(r.id); expect((await removeItineraryItem(tripId, r.item.id)).ok).toBe(true);
    expect(await read(r.id)).toEqual({ ...before, itineraryItemId: null }); expect(await prisma!.reservationEvidence.count()).toBe(1);
  });
  it("Trip deletion cascades Reservations and joins while preserving reusable catalogs", async () => {
    const r = await reservation(); await linkReservationEvidence({ ...r.identity, evidenceRecordId: (await evidence())[0].id });
    await prisma!.trip.delete({ where: { id: tripId } });
    expect(await prisma!.reservation.count()).toBe(0); expect(await prisma!.reservationEvidence.count()).toBe(0);
    expect(await prisma!.evidenceRecord.count()).toBe(14); expect(await prisma!.source.count()).toBe(1); expect(await prisma!.place.count()).toBe(12);
  });
  it("normal seed creates zero Reservations and repeated seed preserves explicit bookings and edited evidence", async () => {
    expect(await prisma!.reservation.count()).toBe(0); const r = await reservation(); await markReservationBooked(r.identity); const before = await read(r.id);
    await seedDemoTrip(prisma!, { preserveExisting: true }); await seedDiscoverFixtures(prisma!); expect(await read(r.id)).toEqual(before); expect(await prisma!.reservation.count()).toBe(1);
  });
});
