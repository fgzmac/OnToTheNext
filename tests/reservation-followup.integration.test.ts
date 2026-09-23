import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { getPrismaClient } from "@/src/lib/prisma";
import { decideRecommendation } from "@/src/modules/discover/service";
import { scheduleAcceptedRecommendation, removeItineraryItem } from "@/src/modules/itinerary/service";
import { createPlanningBlock } from "@/src/modules/itinerary/builder-service";
import { createTrip } from "@/src/modules/trips/service";
import { createActivityReservation, createTransportationReservation, getTripReservations, getItineraryReservationContext, linkReservationEvidence, markReservationBooked, setReservationWorkflowState } from "@/src/modules/reservations/service";
import { previewReservationCancellation, recordReservationCancellation, recordReleaseEvidence, updateReservationNotes } from "@/src/modules/reservations/followup-service";
import { PLANNING_STATES } from "@/src/modules/reservations/domain";
import { seedDemoTrip, DEMO_TRIP_ID } from "../prisma/seed-data";
import { seedDiscoverFixtures } from "../prisma/discover-seed";
const enabled = Boolean(process.env.DATABASE_URL), integration = enabled ? describe : describe.skip;
const db = enabled ? getPrismaClient() : null, tripId = DEMO_TRIP_ID;
const now = new Date("2030-03-01T00:00Z");
const observation = { sourceName: "Synthetic source", attribution: "DEVELOPMENT_FIXTURE", sourceUrl: "https://example.com/release", factualText: "Synthetic source observation. Not live.", precision: "UNKNOWN", availability: "UNKNOWN", observedAt: "2030-02-28T00:00Z" };
async function activity(index = 0) {
  const rec = (await db!.recommendation.findMany({ where: { tripId }, orderBy: { displayRank: "asc" } }))[index];
  expect((await decideRecommendation({ tripId, tripSegmentId: rec.tripSegmentId, recommendationId: rec.id, outcome: "ACCEPTED" })).ok).toBe(true);
  const day = await db!.day.findFirstOrThrow({ where: { tripId, primarySegmentId: rec.tripSegmentId }, orderBy: { date: "asc" } });
  const result = await scheduleAcceptedRecommendation({ tripId, recommendationId: rec.id, dayId: day.id, startMinute: 570, flexibility: "FIXED" });
  if (!result.ok) throw Error(result.error.message);
  return db!.itineraryItem.findUniqueOrThrow({ where: { id: result.data.id } });
}
async function reservation(index = 0) {
  const item = await activity(index);
  const result = await createActivityReservation({ tripId, itineraryItemId: item.id, state: "CHECK_BACK", desiredDate: "2030-04-01", desiredStartMinute: 570, notes: "Synthetic original note" });
  if (!result.ok) throw Error(result.error.message);
  return { item, id: result.data.id, identity: { tripId, reservationId: result.data.id } };
}
const read = (id: string) => db!.reservation.findUniqueOrThrow({ where: { id } });
async function preview(identity: { tripId: string; reservationId: string }) {
  const result = await previewReservationCancellation(identity, now); if (!result.ok) throw Error(result.error.message); return result.data;
}
async function list() { const result = await getTripReservations(tripId, now); if (!result.ok) throw Error(result.error.message); return result.data; }
integration("Reservation follow-up, release evidence and cancellation", () => {
  beforeEach(async () => {
    await db!.trip.deleteMany(); await db!.prototypeUser.deleteMany(); await db!.evidenceRecord.deleteMany(); await db!.place.deleteMany(); await db!.source.deleteMany();
    await seedDemoTrip(db!); await seedDiscoverFixtures(db!);
  });
  afterAll(async () => { await db?.$disconnect(); });
  it("snapshots real titles and retains identifiable orphan details/evidence after deletion", async () => {
    const r = await reservation();
    const e = await db!.evidenceRecord.findFirstOrThrow({ where: { placeId: "cmg00000000000000000000301", topic: "Ticket availability" } });
    await linkReservationEvidence({ ...r.identity, evidenceRecordId: e.id });
    await markReservationBooked({ ...r.identity, confirmedDate: "2030-04-01", confirmedStartMinute: 630, confirmationReference: "SYNTHETIC-RETAIN" });
    const before = await read(r.id); expect(before.title).toBe(r.item.title);
    await db!.itineraryItem.update({ where: { id: r.item.id }, data: { title: "Changed itinerary title" } });
    await removeItineraryItem(tripId, r.item.id);
    expect(await read(r.id)).toEqual({ ...before, itineraryItemId: null });
    const row = (await list())[0]; expect(row.title).toBe(r.item.title); expect(row.evidence).toHaveLength(1); expect(row.sourceAvailable).toBe(false);
    expect(row.attention).toContain("Booked reservation is not attached to an itinerary item.");
    expect((await updateReservationNotes({ ...r.identity, notes: "Still manageable" })).ok).toBe(true);
    expect((await read(r.id)).notes).toBe("Still manageable");
  });
  it("lists every planning state, Booked, Cancelled and unattached records", async () => {
    const rows = [];
    for (const [i, state] of PLANNING_STATES.entries()) { const r = await reservation(i); await setReservationWorkflowState({ ...r.identity, state }); rows.push(r); }
    const booked = await reservation(6); await markReservationBooked(booked.identity);
    const cancelled = await reservation(7); const p = await preview(cancelled.identity);
    await recordReservationCancellation({ ...cancelled.identity, token: p.token }, now);
    await removeItineraryItem(tripId, rows[0].item.id);
    const records = await list(); expect(records).toHaveLength(8); expect(records.at(-1)?.state).toBe("CANCELLED"); expect(records.some(r => !r.itineraryItemId)).toBe(true);
    expect(new Set(records.map(r => r.state))).toEqual(new Set([...PLANNING_STATES, "BOOKED", "CANCELLED"]));
  });
  it("enforces Trip scope on reads, notes, release recording, previews and cancellation", async () => {
    const r = await reservation(); const p = await preview(r.identity);
    const other = await createTrip({ destinationLabel: "Other", destinationScope: "CITY_BASE", startDate: "2031-01-01", endDate: "2031-01-02", travelerCount: 1 });
    const identity = { tripId: other.data!.trip.id, reservationId: r.id };
    expect((await getTripReservations(identity.tripId)).ok && (await getTripReservations(identity.tripId) as { data: unknown[] }).data).toEqual([]);
    for (const result of await Promise.all([previewReservationCancellation(identity, now), updateReservationNotes({ ...identity, notes: "no" }), recordReleaseEvidence({ ...identity, ...observation }, now), recordReservationCancellation({ ...identity, token: p.token }, now)])) expect(result.ok).toBe(false);
    const owner = await db!.prototypeUser.create({ data: { displayName: "Other owner" } }); await db!.trip.update({ where: { id: tripId }, data: { ownerId: owner.id } });
    expect((await getTripReservations(tripId)).ok).toBe(false); expect((await previewReservationCancellation(r.identity, now)).ok).toBe(false);
    expect((await recordReleaseEvidence({ ...r.identity, ...observation }, now)).ok).toBe(false);
    expect((await recordReservationCancellation({ ...r.identity, token: p.token }, now)).ok).toBe(false);
  });
  it.each(["UNKNOWN", "NOT_ANNOUNCED", "DATE_ONLY", "EXACT", "WINDOW"])("persists typed %s evidence without changing workflow", async precision => {
    const r = await reservation(); const before = await read(r.id);
    const fields = precision === "EXACT" ? { releaseAt: "2030-03-02T10:00+09:00" } : precision === "DATE_ONLY" ? { releaseDate: "2030-03-02" } : precision === "WINDOW" ? { windowDescription: "Early March" } : {};
    expect((await recordReleaseEvidence({ ...r.identity, ...observation, precision, ...fields }, now)).ok).toBe(true);
    expect(await read(r.id)).toEqual(before);
    const saved = (await list())[0].evidence[0]; expect(saved.release?.precision).toBe(precision); expect(saved.release?.observedAt).toBe("2030-02-28T00:00:00.000Z");
    expect(saved.sourceKind).toBe("DEVELOPMENT_FIXTURE"); expect(saved.release?.recordedByUser).toBe(true);
    if (precision === "EXACT") { expect(saved.release?.releaseAt).toBe("2030-03-02T01:00:00.000Z"); expect(saved.release?.sourceTimeZone).toBe("+09:00"); }
  });
  it("missing structured evidence does not mean Not announced", async () => {
    const r = await reservation(); const e = await db!.evidenceRecord.findFirstOrThrow({ where: { topic: "Ticket availability" } });
    await linkReservationEvidence({ ...r.identity, evidenceRecordId: e.id }); expect((await list())[0].evidence[0].release).toBeNull();
  });
  it("adds conflicting observations instead of rewriting a shared record, including across Trips", async () => {
    const r = await reservation(); await recordReleaseEvidence({ ...r.identity, ...observation, precision: "EXACT", releaseAt: "2030-03-02T10:00+09:00", availability: "UNAVAILABLE" }, now);
    const first = await db!.evidenceRecord.findFirstOrThrow({ where: { topic: "Inventory release" }, include: { releaseObservation: true } });
    const other = await createTrip({ destinationLabel: "Other", destinationScope: "CITY_BASE", startDate: "2031-01-01", endDate: "2031-01-02", travelerCount: 1 });
    const shared = await db!.reservation.create({ data: { tripId: other.data!.trip.id, title: "Synthetic shared observation", type: "ACTIVITY", state: "CHECK_BACK", evidenceLinks: { create: { evidenceRecordId: first.id } } } });
    await recordReleaseEvidence({ ...r.identity, ...observation, precision: "EXACT", releaseAt: "2030-03-03T10:00+09:00", availability: "AVAILABLE" }, now);
    expect(await db!.evidenceRecord.findUniqueOrThrow({ where: { id: first.id }, include: { releaseObservation: true } })).toEqual(first);
    expect(await db!.reservationEvidence.count({ where: { reservationId: shared.id } })).toBe(1);
    expect((await list())[0].evidence).toHaveLength(2); expect((await list())[0].attention.join(" ")).toContain("Conflicting evidence"); expect((await read(r.id)).state).toBe("CHECK_BACK");
  });
  it("clock expiry, stale observations and refresh never demote Booked or reset freshness", async () => {
    const r = await reservation(); await markReservationBooked(r.identity);
    await recordReleaseEvidence({ ...r.identity, ...observation, observedAt: "2029-01-01T00:00Z", precision: "EXACT", releaseAt: "2030-02-01T10:00+09:00" }, now);
    const before = await read(r.id), evidenceBefore = await db!.releaseObservation.findMany();
    const row = (await list())[0]; expect(row.state).toBe("BOOKED"); expect(row.attention.join(" ")).toContain("Stale observation"); expect(row.attention.join(" ")).toContain("release time has passed");
    await getTripReservations(tripId, new Date("2030-03-05T00:00Z")); await seedDemoTrip(db!, { preserveExisting: true }); await seedDiscoverFixtures(db!);
    expect(await read(r.id)).toEqual(before); expect(await db!.releaseObservation.findMany()).toEqual(evidenceBefore);
  });
  it("rejects unsafe sources, unrelated evidence, invalid times and unavailable Places without partial rows", async () => {
    const r = await reservation();
    for (const invalid of [{ sourceUrl: "file:///local" }, { precision: "EXACT", releaseAt: "2030-03-02T10:00" }, { precision: "WINDOW", windowStartDate: "2030-03-03", windowEndDate: "2030-03-01" }]) expect((await recordReleaseEvidence({ ...r.identity, ...observation, ...invalid }, now)).ok).toBe(false);
    expect(await db!.source.count()).toBe(1); expect(await db!.releaseObservation.count()).toBe(0);
    const unrelated = await db!.evidenceRecord.findFirstOrThrow({ where: { placeId: { not: "cmg00000000000000000000301" } } });
    expect((await linkReservationEvidence({ ...r.identity, evidenceRecordId: unrelated.id })).ok).toBe(false);
    await db!.recommendation.delete({ where: { id: r.item.sourceRecommendationId! } });
    expect((await recordReleaseEvidence({ ...r.identity, ...observation }, now)).ok).toBe(false); expect((await list())[0].sourceAvailable).toBe(false);
    expect((await updateReservationNotes({ ...r.identity, notes: "Source disappeared, booking retained" })).ok).toBe(true);
  });
  it("derives Booked mismatch/overlap with planned duration without changing any Item field", async () => {
    const r = await reservation(); await createPlanningBlock({ tripId, dayId: r.item.dayId, type: "FREE_TIME", startMinute: 650, durationMinutes: 45 });
    const items = await db!.itineraryItem.findMany({ orderBy: { id: "asc" } });
    await markReservationBooked({ ...r.identity, confirmedDate: "2030-04-01", confirmedStartMinute: 630 });
    const row = (await list())[0]; expect(row.state).toBe("BOOKED"); expect(row.attention.join(" ")).toContain("planned duration (not provider-confirmed)");
    expect(await db!.itineraryItem.findMany({ orderBy: { id: "asc" } })).toEqual(items);
    await db!.itineraryItem.update({ where: { id: r.item.id }, data: { startMinute: null, durationMinutes: null } });
    expect((await list())[0].attention).toEqual([]);
  });
  it("Booked cancellation requires acknowledgement and preserves all historical and itinerary data", async () => {
    const r = await reservation(); await markReservationBooked({ ...r.identity, confirmedDate: "2030-04-01", confirmedStartMinute: 630, confirmationReference: "SYNTHETIC-CONFIRM" });
    await recordReleaseEvidence({ ...r.identity, ...observation }, now);
    const before = await read(r.id), item = await db!.itineraryItem.findUniqueOrThrow({ where: { id: r.item.id } }), decisions = await db!.recommendationDecision.findMany(), joins = await db!.reservationEvidence.findMany();
    const p = await preview(r.identity); expect(p.requiresAcknowledgement).toBe(true); expect(await read(r.id)).toEqual(before);
    expect((await recordReservationCancellation({ ...r.identity, token: p.token }, now)).ok).toBe(false); expect(await read(r.id)).toEqual(before);
    expect((await recordReservationCancellation({ ...r.identity, token: p.token, externalCancellationConfirmed: true, cancellationNote: "Synthetic provider cancellation confirmed" }, now)).ok).toBe(true);
    const after = await read(r.id); expect(after).toMatchObject({ ...before, state: "CANCELLED", cancelledAt: now, cancellationNote: "Synthetic provider cancellation confirmed", revision: before.revision + 1, updatedAt: expect.any(Date) });
    expect(await db!.itineraryItem.findUniqueOrThrow({ where: { id: item.id } })).toEqual(item); expect(await db!.recommendationDecision.findMany()).toEqual(decisions); expect(await db!.reservationEvidence.findMany()).toEqual(joins);
    expect((await setReservationWorkflowState({ ...r.identity, state: "CHECK_BACK" })).ok).toBe(false); expect((await markReservationBooked(r.identity)).ok).toBe(false);
  });
  it("unbooked cancellation stops tracking locally, retains desired context and has no urgent reasons", async () => {
    const r = await reservation(), p = await preview(r.identity); expect(p.requiresAcknowledgement).toBe(false);
    expect((await recordReservationCancellation({ ...r.identity, token: p.token, cancellationNote: "No longer tracking" }, now)).ok).toBe(true);
    expect((await read(r.id)).desiredStartMinute).toBe(570); expect((await list())[0].attention).toEqual([]); expect((await read(r.id)).confirmedDate).toBeNull();
  });
  it("stale unbooked preview cannot cancel a reservation that became Booked", async () => {
    const r = await reservation(), p = await preview(r.identity); await markReservationBooked(r.identity); const before = await read(r.id);
    const result = await recordReservationCancellation({ ...r.identity, token: p.token, externalCancellationConfirmed: true }, now);
    expect(!result.ok && result.error.code).toBe("STALE_PREVIEW"); expect(await read(r.id)).toEqual(before);
  });
  it("stale notes, detached context, tampered and expired previews cannot cancel", async () => {
    const r = await reservation(), p = await preview(r.identity);
    expect((await recordReservationCancellation({ ...r.identity, token: p.token + "tampered" }, now)).ok).toBe(false);
    expect((await recordReservationCancellation({ ...r.identity, token: p.token }, new Date(now.getTime() + 31 * 60_000))).ok).toBe(false);
    await updateReservationNotes({ ...r.identity, notes: "New context" }); expect((await recordReservationCancellation({ ...r.identity, token: p.token }, now)).ok).toBe(false);
    const latest = await preview(r.identity); await removeItineraryItem(tripId, r.item.id); expect((await recordReservationCancellation({ ...r.identity, token: latest.token }, now)).ok).toBe(false);
  });
  it("simultaneous mark-booked and cancellation cannot both succeed", async () => {
    const r = await reservation(), p = await preview(r.identity);
    const results = await Promise.all([markReservationBooked(r.identity), recordReservationCancellation({ ...r.identity, token: p.token }, now)]);
    expect(results.filter(r => r.ok)).toHaveLength(1); expect(["BOOKED", "CANCELLED"]).toContain((await read(r.id)).state);
  });
  it("simultaneous and repeated cancellation cannot overwrite the first timestamp/note", async () => {
    const r = await reservation(), p = await preview(r.identity);
    const results = await Promise.all(["FIRST", "SECOND"].map(cancellationNote => recordReservationCancellation({ ...r.identity, token: p.token, cancellationNote }, now)));
    expect(results.filter(r => r.ok)).toHaveLength(1); const before = await read(r.id);
    expect((await recordReservationCancellation({ ...r.identity, token: p.token, cancellationNote: "REPEAT" }, new Date(now.getTime() + 1000))).ok).toBe(false); expect(await read(r.id)).toEqual(before);
  });
  it("Transportation uses its own creation capability and shared departure/booking/cancellation workflow", async () => {
    const day = await db!.day.findFirstOrThrow({ where: { tripId }, orderBy: { date: "asc" } });
    const block = await createPlanningBlock({ tripId, dayId: day.id, type: "TRANSPORTATION", transportationMode: "TRAIN", startMinute: 600 }); if (!block.ok) throw Error(block.error.message);
    expect((await createActivityReservation({ tripId, itineraryItemId: block.data.id, state: "CHECK_BACK" })).ok).toBe(false);
    const created = await createTransportationReservation({ tripId, itineraryItemId: block.data.id, state: "CHECK_BACK", desiredDate: "2030-04-01", desiredStartMinute: 600 }); if (!created.ok) throw Error(created.error.message);
    const identity = { tripId, reservationId: created.data.id }; expect((await list())[0]).toMatchObject({ type: "TRANSPORTATION", state: "CHECK_BACK", sourceAvailable: false, evidence: [] });
    expect((await recordReleaseEvidence({ ...identity, ...observation }, now)).ok).toBe(false);
    expect((await markReservationBooked({ ...identity, confirmedDate: "2030-04-01", confirmedStartMinute: 630 })).ok).toBe(true);
    const p = await preview(identity); expect((await recordReservationCancellation({ ...identity, token: p.token, externalCancellationConfirmed: true }, now)).ok).toBe(true);
    expect((await db!.itineraryItem.findUniqueOrThrow({ where: { id: block.data.id } })).startMinute).toBe(600);
    const contexts = await getItineraryReservationContext(tripId); expect(contexts.ok && contexts.data[0].itemType).toBe("TRANSPORTATION");
  });
  it.each(["ACTIVITY", "FREE_TIME", "HOTEL_REST"])("Transportation creation rejects %s", async type => {
    const day = await db!.day.findFirstOrThrow({ where: { tripId } });
    const item = type === "ACTIVITY" ? await activity() : await db!.itineraryItem.create({ data: { tripId, dayId: day.id, type: type as "FREE_TIME" | "HOTEL_REST", title: "Synthetic block", position: 0 } });
    expect((await createTransportationReservation({ tripId, itineraryItemId: item.id, state: "CHECK_BACK" })).ok).toBe(false);
  });
  it("repeat seed preserves cancellation, notes and user evidence exactly", async () => {
    const r = await reservation(); await recordReleaseEvidence({ ...r.identity, ...observation }, now); const p = await preview(r.identity);
    await recordReservationCancellation({ ...r.identity, token: p.token, cancellationNote: "Keep this history" }, now); await updateReservationNotes({ ...r.identity, notes: "User retained note" });
    const before = await read(r.id), evidence = await db!.releaseObservation.findMany();
    await seedDemoTrip(db!, { preserveExisting: true }); await seedDiscoverFixtures(db!); await seedDiscoverFixtures(db!);
    expect(await read(r.id)).toEqual(before); expect(await db!.releaseObservation.findMany()).toEqual(evidence);
  });
  it("deleting the source Place preserves linked evidence, source attribution and management", async () => {
    const r = await reservation(); await recordReleaseEvidence({ ...r.identity, ...observation }, now);
    const e = await db!.evidenceRecord.findFirstOrThrow({ where: { topic: "Inventory release" }, include: { releaseObservation: true } });
    await db!.recommendation.delete({ where: { id: r.item.sourceRecommendationId! } });
    await db!.place.delete({ where: { id: e.placeId! } });
    expect(await db!.evidenceRecord.findUniqueOrThrow({ where: { id: e.id }, include: { releaseObservation: true } })).toEqual({ ...e, placeId: null });
    const row = (await list())[0]; expect(row.evidence).toHaveLength(1); expect(row.evidence[0].sourceName).toBe("Synthetic source"); expect(row.sourceAvailable).toBe(false);
    expect((await recordReleaseEvidence({ ...r.identity, ...observation }, now)).ok).toBe(false);
    expect((await updateReservationNotes({ ...r.identity, notes: "Place gone, history retained" })).ok).toBe(true);
  });
  it("Trip deletion removes owned reservations/joins but preserves reusable release evidence and sources", async () => {
    const r = await reservation(); await recordReleaseEvidence({ ...r.identity, ...observation }, now);
    const evidence = await db!.releaseObservation.findMany(), sources = await db!.source.findMany();
    await db!.trip.delete({ where: { id: tripId } }); expect(await db!.reservation.count()).toBe(0); expect(await db!.reservationEvidence.count()).toBe(0);
    expect(await db!.releaseObservation.findMany()).toEqual(evidence); expect(await db!.source.findMany()).toEqual(sources);
  });
});
