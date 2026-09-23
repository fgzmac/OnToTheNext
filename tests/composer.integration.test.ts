import { createActivityReservation, markReservationBooked, linkReservationEvidence } from "@/src/modules/reservations/service";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { getPrismaClient } from "@/src/lib/prisma";
import { createTrip, addSegment } from "@/src/modules/trips/service";
import { decideRecommendation, getRecommendationBatch, requestAnotherRecommendationBatch } from "@/src/modules/discover/service";
import { addRecommendationToDay, removeItineraryItem } from "@/src/modules/itinerary/service";
import { CATALOG } from "@/src/modules/discover/catalog";
const integration = process.env.TEST_DATABASE_URL ? describe : describe.skip;
const db = process.env.TEST_DATABASE_URL ? getPrismaClient() : null;
function ok<T>(result: { ok: true; data: T } | { ok: false; error: unknown }): T { if (!result.ok) throw Error(JSON.stringify(result.error)); return result.data; }
async function trip(city = "Tokyo") {
  const result = await createTrip({ destinationLabel: city, destinationScope: "CITY_BASE", startDate: "2032-04-01", endDate: "2032-04-03", travelerCount: 1 });
  if (!result.ok || !result.data) throw Error(JSON.stringify(result.errors));
  return result.data;
}
async function setup() {
  const t = await trip(), tripId = t.trip.id, tripSegmentId = t.segments[0].id;
  const batch = ok(await getRecommendationBatch(tripId, tripSegmentId));
  return { tripId, tripSegmentId, recommendationId: batch.cards[0].id, dayId: t.days[0].id!, t, batch };
}
integration("recommendation-first composer", () => {
  beforeEach(async () => { await db!.trip.deleteMany(); await db!.prototypeUser.deleteMany(); await db!.evidenceRecord.deleteMany(); await db!.source.deleteMany(); await db!.place.deleteMany(); });
  afterAll(async () => { await db?.$disconnect(); });
  it.each(["Tokyo", "Kyoto", "Osaka"])("provisions %s on a fresh actual Segment, idempotently", async city => {
    const t = await trip(city), id = t.trip.id, segment = t.segments[0].id;
    expect(await db!.recommendation.count({ where: { tripId: id } })).toBe(0);
    const batches = await Promise.all([getRecommendationBatch(id, segment), getRecommendationBatch(id, segment)]);
    expect(batches.every(r => r.ok)).toBe(true);
    expect(await db!.recommendation.count({ where: { tripId: id } })).toBe(8);
    expect(ok(batches[0]).cards).toHaveLength(4);
    expect(ok(batches[0]).cards.every(c => c.evidence.some(e => e.sourceKind === "OFFICIAL_CURATED" && e.sourceUrl))).toBe(true);
    const before = await db!.place.findMany({ orderBy: { id: "asc" } });
    await getRecommendationBatch(id, segment);
    expect(await db!.place.findMany({ orderBy: { id: "asc" } })).toEqual(before);
  });
  it.each(["Paris", "Tokyo / Kyoto", "Japan"])("does not guess coverage for %s", async city => {
    const t = await trip(city); expect(ok(await getRecommendationBatch(t.trip.id, t.segments[0].id)).total).toBe(0);
  });
  it("provisions simultaneous new Trips without global Place collisions", async () => {
    const a = await trip(), b = await trip();
    const results = await Promise.all([getRecommendationBatch(a.trip.id, a.segments[0].id), getRecommendationBatch(b.trip.id, b.segments[0].id)]);
    expect(results.every(r => r.ok)).toBe(true);
    expect(await db!.place.count()).toBe(8);
    expect(await db!.recommendation.count()).toBe(16);
  });
  it("atomically accepts, snapshots and appends without booking or invented time", async () => {
    const s = await setup(), r = ok(await addRecommendationToDay(s));
    const item = await db!.itineraryItem.findUniqueOrThrow({ where: { id: r.id } });
    expect(item).toMatchObject({ title: "Senso-ji", locationLabel: "Asakusa, Taito", referenceUrl: CATALOG[0].url, startMinute: null, durationMinutes: null, flexibility: "FLEXIBLE", position: 0, progress: "PENDING" });
    expect((await db!.recommendationDecision.findUniqueOrThrow({ where: { recommendationId: s.recommendationId } })).outcome).toBe("ACCEPTED");
    expect(await db!.reservation.count()).toBe(0);
  });
  it("concurrent Add and delayed retries return the same item and actual Day", async () => {
    const s = await setup(), results = await Promise.all(Array.from({ length: 6 }, () => addRecommendationToDay(s)));
    const ids = results.map(r => ok(r).id); expect(new Set(ids).size).toBe(1);
    expect(results.filter(r => ok(r).alreadyScheduled)).toHaveLength(5);
    const retry = ok(await addRecommendationToDay({ ...s, dayId: s.t.days[1].id! }));
    expect(retry).toMatchObject({ id: ids[0], dayId: s.dayId, dayNumber: 1, alreadyScheduled: true });
    expect(await db!.itineraryItem.count()).toBe(1);
  });
  it("rejects foreign Trip, Day, Segment and owner without a partial decision", async () => {
    const s = await setup(), other = await trip("Kyoto");
    for (const input of [{ ...s, dayId: other.days[0].id! }, { ...s, tripId: other.trip.id }, { ...s, tripSegmentId: other.segments[0].id }]) expect((await addRecommendationToDay(input)).ok).toBe(false);
    expect(await db!.recommendationDecision.count()).toBe(0); expect(await db!.itineraryItem.count()).toBe(0);
    const owner = await db!.prototypeUser.create({ data: { displayName: "Other" } });
    await db!.trip.update({ where: { id: s.tripId }, data: { ownerId: owner.id } });
    expect((await addRecommendationToDay(s)).ok).toBe(false);
    expect(await db!.recommendationDecision.count()).toBe(0);
  });
  it("rolls back a newly Accepted decision when the append itself fails", async () => {
    const s = await setup();
    // Force a real database failure after the decision write, not pre-validation.
    await db!.itineraryItem.create({ data: { tripId: s.tripId, dayId: s.dayId, title: "Position overflow sentinel", type: "ACTIVITY", position: 2147483647 } });
    expect((await addRecommendationToDay(s)).ok).toBe(false);
    expect(await db!.recommendationDecision.findUnique({ where: { recommendationId: s.recommendationId } })).toBeNull();
    expect(await db!.itineraryItem.count({ where: { sourceRecommendationId: s.recommendationId } })).toBe(0);
  });
  it("pure Accept remains unscheduled; remove retains acceptance; Deny retains scheduled content", async () => {
    const s = await setup();
    ok(await decideRecommendation({ ...s, outcome: "ACCEPTED" }));
    expect(await db!.itineraryItem.count()).toBe(0);
    const item = ok(await addRecommendationToDay(s));
    ok(await decideRecommendation({ ...s, outcome: "DENIED" }));
    expect(await db!.itineraryItem.count()).toBe(1);
    ok(await decideRecommendation({ ...s, outcome: "ACCEPTED" }));
    ok(await removeItineraryItem(s.tripId, item.id));
    expect((await db!.recommendationDecision.findUniqueOrThrow({ where: { recommendationId: s.recommendationId } })).outcome).toBe("ACCEPTED");
    expect(ok(await addRecommendationToDay(s)).id).not.toBe(item.id);
  });
  it("isolates repeated-city Segments and does not rewrite batches or scheduled snapshots", async () => {
    const made = await createTrip({ destinationLabel: "Japan", destinationScope: "COUNTRY_REGION", startDate: "2032-04-01", endDate: "2032-04-06", travelerCount: 1 });
    const id = made.data!.trip.id;
    await addSegment({ tripId: id, baseName: "Tokyo", arrivalDate: "2032-04-01", departureDate: "2032-04-03" });
    await addSegment({ tripId: id, baseName: "Tokyo", arrivalDate: "2032-04-04", departureDate: "2032-04-06" });
    const segments = await db!.tripSegment.findMany({ where: { tripId: id }, orderBy: { position: "asc" } });
    const a = ok(await getRecommendationBatch(id, segments[0].id)), b = ok(await getRecommendationBatch(id, segments[1].id));
    expect(a.cards[0].place.id).toBe(b.cards[0].place.id); expect(a.cards[0].id).not.toBe(b.cards[0].id);
    const days = await db!.day.findMany({ where: { tripId: id }, orderBy: { position: "asc" } });
    expect((await addRecommendationToDay({ tripId: id, tripSegmentId: segments[0].id, recommendationId: a.cards[0].id, dayId: days[4].id })).ok).toBe(false);
    const item = ok(await addRecommendationToDay({ tripId: id, tripSegmentId: segments[0].id, recommendationId: a.cards[0].id, dayId: days[0].id }));
    const before = await db!.itineraryItem.findUniqueOrThrow({ where: { id: item.id } });
    ok(await requestAnotherRecommendationBatch({ tripId: id, tripSegmentId: segments[0].id, fromBatch: 0 }));
    const history = await db!.recommendation.findMany({ where: { tripId: id }, orderBy: { id: "asc" } });
    const decision = await db!.recommendationDecision.findMany();
    await db!.place.update({ where: { id: a.cards[0].place.id }, data: { name: "Outdated catalog label" } });
    await getRecommendationBatch(id, segments[0].id);
    expect(await db!.recommendation.findMany({ where: { tripId: id }, orderBy: { id: "asc" } })).toEqual(history);
    expect(await db!.recommendationDecision.findMany()).toEqual(decision);
    expect(await db!.itineraryItem.findUniqueOrThrow({ where: { id: item.id } })).toEqual(before);
    expect(await db!.evidenceRecord.count()).toBe(8);
  });
  it("creates an initial country Segment only on explicit validated choice", async () => {
    const a = await createTrip({ destinationLabel: "Japan", destinationScope: "COUNTRY_REGION", startDate: "2032-04-01", endDate: "2032-04-03", travelerCount: 1 });
    expect(a.data!.segments).toHaveLength(0);
    const b = await createTrip({ destinationLabel: "Japan", destinationScope: "COUNTRY_REGION", startingCity: "Kyoto", startDate: "2032-04-01", endDate: "2032-04-03", travelerCount: 1 });
    expect(b.data!.segments).toHaveLength(1); expect(b.data!.days.every(d => d.primarySegmentId === b.data!.segments[0].id)).toBe(true);
    const bad = await createTrip({ destinationLabel: "Japan", destinationScope: "COUNTRY_REGION", startingCity: "Kyoto / Osaka", startDate: "2032-04-01", endDate: "2032-04-03", travelerCount: 1 });
    expect(bad.ok).toBe(false);
  });

  it("appends catalog observation versions without changing Booked history or presented content", async () => {
    const s = await setup(), added = ok(await addRecommendationToDay(s));
    const reservation = ok(await createActivityReservation({ tripId: s.tripId, itineraryItemId: added.id, state: "CHECK_BACK" }));
    ok(await markReservationBooked({ tripId: s.tripId, reservationId: reservation.id, confirmedDate: "2032-04-01", confirmedStartMinute: 600, confirmationReference: "SYNTHETIC-CATALOG-HISTORY" }));
    const source = await db!.source.create({ data: { name: "Synthetic retained availability", kind: "TEST_OBSERVATION" } });
    const evidence = await db!.evidenceRecord.create({ data: { sourceId: source.id, placeId: CATALOG[0].id, topic: "Ticket availability", factualText: "Synthetic availability history", retrievedAt: new Date("2032-01-01T00:00:00Z"), status: "TEST" } });
    ok(await linkReservationEvidence({ tripId: s.tripId, reservationId: reservation.id, evidenceRecordId: evidence.id }));
    const beforeBooking = await db!.reservation.findUniqueOrThrow({ where: { id: reservation.id } });
    const beforeItem = await db!.itineraryItem.findUniqueOrThrow({ where: { id: added.id } });
    const beforeRec = await db!.recommendation.findUniqueOrThrow({ where: { id: s.recommendationId } });
    const original = { ...CATALOG[0] };
    try {
      // A synthetic later observation exists only in this disposable test process.
      Object.assign(CATALOG[0], { checkedAt: "2032-01-02", summary: "Synthetic revised catalog summary", name: "Synthetic revised place label" });
      ok(await getRecommendationBatch(s.tripId, s.tripSegmentId));
      expect(await db!.evidenceRecord.count({ where: { placeId: CATALOG[0].id, topic: "Catalog description" } })).toBe(2);
      expect(await db!.reservation.findUniqueOrThrow({ where: { id: reservation.id } })).toEqual(beforeBooking);
      expect(await db!.itineraryItem.findUniqueOrThrow({ where: { id: added.id } })).toEqual(beforeItem);
      expect(await db!.recommendation.findUniqueOrThrow({ where: { id: s.recommendationId } })).toEqual(beforeRec);
      expect(await db!.evidenceRecord.findUniqueOrThrow({ where: { id: evidence.id } })).toEqual(evidence);
      expect(await db!.reservationEvidence.count({ where: { reservationId: reservation.id, evidenceRecordId: evidence.id } })).toBe(1);
    } finally { Object.assign(CATALOG[0], original); }
  });

});
