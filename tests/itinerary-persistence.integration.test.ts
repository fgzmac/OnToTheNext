import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { decideRecommendation } from "@/src/modules/discover/service";
import { getItineraryBuilder, removeItineraryItem, scheduleAcceptedRecommendation } from "@/src/modules/itinerary/service";
import { createTrip, getTripSkeleton, removeSegment, updateTrip } from "@/src/modules/trips/service";
import { toUtcDate } from "@/src/modules/trips/date-only";
import { seedDemoTrip, DEMO_TRIP_ID } from "../prisma/seed-data";
import { seedDiscoverFixtures } from "../prisma/discover-seed";

const enabled = Boolean(process.env.DATABASE_URL);
const integration = enabled ? describe : describe.skip;
const prisma = enabled ? getPrismaClient() : null;
async function recommendation(index = 0) {
  return (await prisma!.recommendation.findMany({ where: { tripId: DEMO_TRIP_ID }, orderBy: { displayRank: "asc" } }))[index];
}
async function day(date = "2030-04-01", tripId = DEMO_TRIP_ID) {
  return prisma!.day.findUniqueOrThrow({ where: { tripId_date: { tripId, date: toUtcDate(date) } } });
}
async function accept(index = 0) {
  const rec = await recommendation(index);
  expect((await decideRecommendation({ tripId: rec.tripId, tripSegmentId: rec.tripSegmentId, recommendationId: rec.id, outcome: "ACCEPTED" })).ok).toBe(true);
  return rec;
}
async function scheduled(index = 0, date = "2030-04-01", startMinute?: number, flexibility?: string) {
  const rec = await accept(index);
  const result = await scheduleAcceptedRecommendation({ tripId: DEMO_TRIP_ID, recommendationId: rec.id, dayId: (await day(date)).id, startMinute, flexibility });
  if (!result.ok) throw new Error(result.error.message);
  return prisma!.itineraryItem.findUniqueOrThrow({ where: { id: result.data.id } });
}
async function builder() {
  const result = await getItineraryBuilder(DEMO_TRIP_ID);
  if (!result.ok) throw new Error(result.error.message);
  return result.data;
}

integration("Itinerary scheduling and content safety", () => {
  beforeEach(async () => {
    await prisma!.trip.deleteMany();
    await prisma!.prototypeUser.deleteMany();
    await prisma!.evidenceRecord.deleteMany();
    await prisma!.place.deleteMany();
    await prisma!.source.deleteMany();
    await seedDemoTrip(prisma!);
    await seedDiscoverFixtures(prisma!);
  });
  afterAll(async () => { await prisma?.$disconnect(); });

  it("keeps acceptance unscheduled until explicit ACTIVITY creation and persists planning snapshots", async () => {
    const rec = await accept();
    const decision = await prisma!.recommendationDecision.findUniqueOrThrow({ where: { recommendationId: rec.id } });
    expect(await prisma!.itineraryItem.count()).toBe(0);
    expect((await builder()).unscheduled.map(item => item.id)).toEqual([rec.id]);
    const item = await scheduled(0, "2030-04-01", 570, "FIXED");
    expect(item).toMatchObject({ type: "ACTIVITY", title: "Riverside Observation Deck", startMinute: 570, durationMinutes: 45, flexibility: "FIXED", position: 0, sourceRecommendationId: rec.id });
    expect((await builder()).unscheduled).toEqual([]);
    await prisma!.recommendation.update({ where: { id: rec.id }, data: { durationMinutes: 120 } });
    await prisma!.place.update({ where: { id: rec.placeId }, data: { name: "Changed catalog name" } });
    const fresh = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.TEST_DATABASE_URL! }) });
    try { expect(await fresh.itineraryItem.findUniqueOrThrow({ where: { id: item.id } })).toEqual(item); }
    finally { await fresh.$disconnect(); }
    expect((await prisma!.recommendationDecision.findUniqueOrThrow({ where: { recommendationId: rec.id } })).outcome).toBe(decision.outcome);
  });

  it.each([null, "DENIED", "SAVED", "MUST_DO"] as const)("rejects a %s decision without allocating a position", async outcome => {
    const rec = await recommendation();
    if (outcome) await prisma!.recommendationDecision.create({ data: { recommendationId: rec.id, outcome } });
    const result = await scheduleAcceptedRecommendation({ tripId: DEMO_TRIP_ID, recommendationId: rec.id, dayId: (await day()).id });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("NOT_ACCEPTED");
    expect(await prisma!.itineraryItem.count()).toBe(0);
  });

  it("rejects cross-Trip Recommendations and Days and enforces Day ownership in PostgreSQL", async () => {
    const rec = await accept();
    const other = await createTrip({ destinationLabel: "Other", destinationScope: "CITY_BASE", startDate: "2031-01-01", endDate: "2031-01-02", travelerCount: 1 });
    const otherId = other.data!.trip.id;
    const foreignDay = await day("2031-01-01", otherId);
    expect((await scheduleAcceptedRecommendation({ tripId: otherId, recommendationId: rec.id, dayId: foreignDay.id })).ok).toBe(false);
    const result = await scheduleAcceptedRecommendation({ tripId: DEMO_TRIP_ID, recommendationId: rec.id, dayId: foreignDay.id });
    expect(!result.ok && result.error.code).toBe("WRONG_DAY");
    await expect(prisma!.itineraryItem.create({ data: { tripId: DEMO_TRIP_ID, dayId: foreignDay.id, type: "ACTIVITY", title: "Invalid cross-trip item", position: 0 } })).rejects.toMatchObject({ code: "P2003" });
    expect(await prisma!.itineraryItem.count()).toBe(0);
  });

  it("checks prototype ownership for scheduling, reading and removal", async () => {
    const item = await scheduled();
    const rec = await accept(1);
    const owner = await prisma!.prototypeUser.create({ data: { displayName: "Other test owner" } });
    await prisma!.trip.update({ where: { id: DEMO_TRIP_ID }, data: { ownerId: owner.id } });
    expect((await scheduleAcceptedRecommendation({ tripId: DEMO_TRIP_ID, recommendationId: rec.id, dayId: item.dayId })).ok).toBe(false);
    expect((await getItineraryBuilder(DEMO_TRIP_ID)).ok).toBe(false);
    expect((await removeItineraryItem(DEMO_TRIP_ID, item.id)).ok).toBe(false);
    expect(await prisma!.itineraryItem.count()).toBe(1);
  });

  it("uses Segment identity, including shared transfer Day ownership and repeated Tokyo", async () => {
    const rec = await accept();
    for (const date of ["2030-04-06", "2030-04-13"]) {
      const result = await scheduleAcceptedRecommendation({ tripId: DEMO_TRIP_ID, recommendationId: rec.id, dayId: (await day(date)).id });
      expect(!result.ok && result.error.code).toBe("WRONG_SEGMENT");
    }
    const item = await scheduled(0, "2030-04-05");
    expect(item.dayId).toBe((await day("2030-04-05")).id);
  });

  it("blocks duplicate scheduling, including simultaneous requests and database bypass", async () => {
    const rec = await accept();
    const dayId = (await day()).id;
    const input = { tripId: DEMO_TRIP_ID, recommendationId: rec.id, dayId };
    const results = await Promise.all(Array.from({ length: 5 }, () => scheduleAcceptedRecommendation(input)));
    expect(results.filter(result => result.ok)).toHaveLength(1);
    expect(results.filter(result => !result.ok && result.error.code === "ALREADY_SCHEDULED")).toHaveLength(4);
    expect(await prisma!.itineraryItem.count()).toBe(1);
    await expect(prisma!.itineraryItem.create({ data: { tripId: DEMO_TRIP_ID, dayId, type: "ACTIVITY", title: "Duplicate", position: 1, sourceRecommendationId: rec.id } })).rejects.toMatchObject({ code: "P2002" });
  });

  it("appends explicit position independently of local time and supports untimed Flexible items", async () => {
    const late = await scheduled(0, "2030-04-01", 1080, "FIXED");
    const early = await scheduled(1, "2030-04-01", 540);
    const untimed = await scheduled(2);
    expect([late.position, early.position, untimed.position]).toEqual([0, 1, 2]);
    expect(untimed).toMatchObject({ startMinute: null, flexibility: "FLEXIBLE" });
    expect((await builder()).days[0].items.map(item => item.id)).toEqual([late.id, early.id, untimed.id]);
  });

  it("allocates unique contiguous positions during simultaneous distinct appends", async () => {
    const recs = await Promise.all([accept(0), accept(1), accept(2)]);
    const dayId = (await day()).id;
    const results = await Promise.all(recs.map(rec => scheduleAcceptedRecommendation({ tripId: DEMO_TRIP_ID, recommendationId: rec.id, dayId })));
    expect(results.every(result => result.ok)).toBe(true);
    expect((await builder()).days[0].items.map(item => item.position)).toEqual([0, 1, 2]);
  });

  it("does not modify scheduled planning when Accepted changes to Denied", async () => {
    const item = await scheduled(0, "2030-04-01", 750, "FIXED");
    const rec = await recommendation();
    await decideRecommendation({ tripId: DEMO_TRIP_ID, tripSegmentId: rec.tripSegmentId, recommendationId: rec.id, outcome: "DENIED" });
    expect(await prisma!.itineraryItem.findUniqueOrThrow({ where: { id: item.id } })).toEqual(item);
    expect((await builder()).unscheduled).toEqual([]);
  });

  it("removes only the item, normalizes positions, and permits accepted rescheduling", async () => {
    const first = await scheduled(0);
    const middle = await scheduled(1);
    const last = await scheduled(2);
    const recs = await prisma!.recommendation.findMany({ orderBy: { id: "asc" } });
    const decisions = await prisma!.recommendationDecision.findMany({ orderBy: { id: "asc" } });
    const places = await prisma!.place.findMany({ orderBy: { id: "asc" } });
    const evidence = await prisma!.evidenceRecord.findMany({ orderBy: { id: "asc" } });
    expect((await removeItineraryItem(DEMO_TRIP_ID, middle.id)).ok).toBe(true);
    expect((await builder()).days[0].items.map(item => [item.id, item.position])).toEqual([[first.id, 0], [last.id, 1]]);
    expect((await builder()).unscheduled.map(item => item.id)).toEqual([middle.sourceRecommendationId]);
    expect(await prisma!.recommendation.findMany({ orderBy: { id: "asc" } })).toEqual(recs);
    expect(await prisma!.recommendationDecision.findMany({ orderBy: { id: "asc" } })).toEqual(decisions);
    expect(await prisma!.place.findMany({ orderBy: { id: "asc" } })).toEqual(places);
    expect(await prisma!.evidenceRecord.findMany({ orderBy: { id: "asc" } })).toEqual(evidence);
    const again = await scheduled(1);
    expect(again.position).toBe(2);
    expect(again.id).not.toBe(middle.id);
  });

  it("detaches a deleted Recommendation without deleting its planned snapshot", async () => {
    const item = await scheduled(0, "2030-04-01", 570, "FIXED");
    await prisma!.recommendation.delete({ where: { id: item.sourceRecommendationId! } });
    expect(await prisma!.itineraryItem.findUniqueOrThrow({ where: { id: item.id } })).toEqual({ ...item, sourceRecommendationId: null });
  });

  it("preserves scheduled content and Day identity when its source Segment is removed", async () => {
    const item = await scheduled(0, "2030-04-01", 750, "FIXED");
    const rec = await recommendation();
    expect((await removeSegment(DEMO_TRIP_ID, rec.tripSegmentId)).ok).toBe(true);
    expect(await prisma!.recommendation.findUnique({ where: { id: rec.id } })).toBeNull();
    expect(await prisma!.itineraryItem.findUniqueOrThrow({ where: { id: item.id } })).toEqual({ ...item, sourceRecommendationId: null });
    expect((await day()).id).toBe(item.dayId);
    expect((await day()).primarySegmentId).toBeNull();
    expect((await builder()).days[0].items).toHaveLength(1);
  });

  it("deletes Trip-owned itinerary data without deleting reusable Places or Evidence", async () => {
    await scheduled();
    await prisma!.trip.delete({ where: { id: DEMO_TRIP_ID } });
    expect(await prisma!.itineraryItem.count()).toBe(0);
    expect(await prisma!.day.count()).toBe(0);
    expect(await prisma!.recommendation.count()).toBe(0);
    expect(await prisma!.place.count()).toBe(12);
    expect(await prisma!.source.count()).toBe(1);
    expect(await prisma!.evidenceRecord.count()).toBe(14);
  });

  it("allows shrinking empty Days while preserving retained Day IDs", async () => {
    const created = await createTrip({ destinationLabel: "Empty calendar", destinationScope: "COUNTRY_REGION", startDate: "2031-01-01", endDate: "2031-01-03", travelerCount: 1 });
    const id = created.data!.trip.id;
    const before = created.data!.days;
    const result = await updateTrip({ tripId: id, startDate: "2031-01-01", endDate: "2031-01-02", travelerCount: 1 });
    expect(result.ok).toBe(true);
    expect(result.data!.days.map(item => item.id)).toEqual(before.slice(0, 2).map(item => item.id));
  });

  it("blocks scheduled-Day removal with a structured error and unchanged complete Trip state", async () => {
    const item = await scheduled();
    const before = await prisma!.trip.findUniqueOrThrow({ where: { id: DEMO_TRIP_ID }, include: { days: { orderBy: { position: "asc" } }, segments: { orderBy: { position: "asc" } }, itineraryItems: true, preferenceProfile: true } });
    const result = await updateTrip({ tripId: DEMO_TRIP_ID, name: "Must roll back", startDate: "2030-04-02", endDate: "2030-04-15", travelerCount: 99 });
    expect(result.ok).toBe(false);
    expect(result.errors[0]).toMatchObject({ code: "ITINERARY_CONTENT_WOULD_BE_REMOVED", dates: ["2030-04-01"] });
    expect(result.errors[0].message).toContain("scheduled itinerary items");
    expect(await prisma!.trip.findUniqueOrThrow({ where: { id: DEMO_TRIP_ID }, include: { days: { orderBy: { position: "asc" } }, segments: { orderBy: { position: "asc" } }, itineraryItems: true, preferenceProfile: true } })).toEqual(before);
    await expect(prisma!.day.delete({ where: { id: item.dayId } })).rejects.toMatchObject({ code: "P2003" });
  });

  it("serializes date edits with scheduling so neither ordering can lose content", async () => {
    const rec = await accept();
    const dayId = (await day()).id;
    const [scheduling, shrink] = await Promise.all([
      scheduleAcceptedRecommendation({ tripId: DEMO_TRIP_ID, recommendationId: rec.id, dayId }),
      updateTrip({ tripId: DEMO_TRIP_ID, startDate: "2030-04-02", endDate: "2030-04-15", travelerCount: 2 }),
    ]);
    expect(scheduling.ok).toBe(true);
    expect(shrink.ok).toBe(false);
    expect(await prisma!.itineraryItem.count()).toBe(1);
    expect((await getTripSkeleton(DEMO_TRIP_ID)).data!.days).toHaveLength(15);
  });

  it("rejects invalid planning values without partial rows or position changes", async () => {
    const existing = await scheduled();
    const rec = await accept(1);
    const input = { tripId: DEMO_TRIP_ID, recommendationId: rec.id, dayId: existing.dayId };
    for (const fields of [{ startMinute: -1 }, { startMinute: 1440 }, { flexibility: "BOOKED" }]) expect((await scheduleAcceptedRecommendation({ ...input, ...fields })).ok).toBe(false);
    await prisma!.recommendation.update({ where: { id: rec.id }, data: { durationMinutes: 0 } });
    const invalidDuration = await scheduleAcceptedRecommendation(input);
    expect(!invalidDuration.ok && invalidDuration.error.code).toBe("INVALID_DURATION");
    expect(await prisma!.itineraryItem.findMany()).toEqual([existing]);
    await expect(prisma!.itineraryItem.create({ data: { tripId: DEMO_TRIP_ID, dayId: existing.dayId, type: "ACTIVITY", title: "Invalid minute", startMinute: 1440, position: 1 } })).rejects.toThrow();
    expect(await prisma!.itineraryItem.count()).toBe(1);
  });

  it("does not automatically schedule or alter existing scheduled content during normal seeding", async () => {
    expect(await prisma!.itineraryItem.count()).toBe(0);
    const item = await scheduled();
    await seedDemoTrip(prisma!, { preserveExisting: true });
    await seedDiscoverFixtures(prisma!);
    expect(await prisma!.itineraryItem.findMany()).toEqual([item]);
  });
});
