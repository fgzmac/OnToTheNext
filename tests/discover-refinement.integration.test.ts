import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { createTrip } from "@/src/modules/trips/service";
import { decideRecommendation, getRecommendationBatch, requestAnotherRecommendationBatch, updateTripDiscoverInterests } from "@/src/modules/discover/service";
import { FIXTURE_SEGMENT_ID } from "@/src/modules/discover/fixture-catalog";
import { seedDemoTrip, DEMO_TRIP_ID } from "../prisma/seed-data";
import { seedDiscoverFixtures } from "../prisma/discover-seed";

const enabled = Boolean(process.env.DATABASE_URL);
const integration = enabled ? describe : describe.skip;
const prisma = enabled ? getPrismaClient() : null;
const another = (fromBatch: number, segmentId = FIXTURE_SEGMENT_ID, tripId = DEMO_TRIP_ID) => requestAnotherRecommendationBatch({ tripId, tripSegmentId: segmentId, fromBatch });
async function batch(page = 0, segmentId = FIXTURE_SEGMENT_ID) {
  const result = await getRecommendationBatch(DEMO_TRIP_ID, segmentId, String(page));
  if (!result.ok) throw new Error(result.error);
  return result.data;
}
async function decide(index: number, outcome: "ACCEPTED" | "DENIED") {
  const item = (await batch()).cards[index];
  expect((await decideRecommendation({ tripId: DEMO_TRIP_ID, tripSegmentId: FIXTURE_SEGMENT_ID, recommendationId: item.id, outcome })).ok).toBe(true);
}
const assignments = () => prisma!.recommendation.findMany({
  orderBy: { id: "asc" }, select: { id: true, presentationBatch: true, presentationOrder: true },
});

integration("Discover stable refinement persistence", () => {
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

  it("persists typed optional interests through a fresh client and preserves other preference fields", async () => {
    const before = await prisma!.tripPreferenceProfile.findUniqueOrThrow({ where: { tripId: DEMO_TRIP_ID } });
    expect((await updateTripDiscoverInterests(DEMO_TRIP_ID, ["CULTURE_HISTORY", "ARCHITECTURE_DESIGN"])).ok).toBe(true);
    const fresh = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.TEST_DATABASE_URL! }) });
    try {
      const reread = await fresh.tripPreferenceProfile.findUniqueOrThrow({ where: { tripId: DEMO_TRIP_ID } });
      expect(reread.discoverInterests).toEqual(["ARCHITECTURE_DESIGN", "CULTURE_HISTORY"]);
      expect(reread.budgetComfort).toBe(before.budgetComfort);
      expect(reread.planningNote).toBe(before.planningNote);
    } finally { await fresh.$disconnect(); }
    expect((await updateTripDiscoverInterests(DEMO_TRIP_ID, [])).ok).toBe(true);
    expect((await batch()).interests).toEqual([]);
    expect((await batch()).cards).toHaveLength(4);
  });

  it("creates missing Trip preferences without affecting another Trip or accepting invalid values", async () => {
    const created = await createTrip({ destinationLabel: "Synthetic base", destinationScope: "CITY_BASE", startDate: "2031-01-01", endDate: "2031-01-02", travelerCount: 1 });
    const id = created.data!.trip.id;
    expect(await prisma!.tripPreferenceProfile.findUnique({ where: { tripId: id } })).toBeNull();
    expect((await updateTripDiscoverInterests(id, ["FOOD_DRINK"])).ok).toBe(true);
    expect((await batch()).interests).toEqual([]);
    expect((await updateTripDiscoverInterests(id, ["UNKNOWN"])).ok).toBe(false);
    expect((await updateTripDiscoverInterests("missing", [])).ok).toBe(false);
    expect((await prisma!.tripPreferenceProfile.findUniqueOrThrow({ where: { tripId: id } })).discoverInterests).toEqual(["FOOD_DRINK"]);
  });

  it("keeps initial variety and generates a persisted refined order from explicit interests", async () => {
    const first = (await batch()).cards.map(card => card.id);
    await updateTripDiscoverInterests(DEMO_TRIP_ID, ["ARCHITECTURE_DESIGN", "CULTURE_HISTORY"]);
    expect((await batch()).cards.map(card => card.id)).toEqual(first);
    expect((await another(0)).ok).toBe(true);
    const second = await batch(1);
    expect(second.cards.map(card => card.place.name)).toEqual(["Brickwork Design Studio", "Railway History Gallery", "Courtyard Architecture Gallery", "City Garden Pavilion"]);
    expect((await batch(1)).cards.map(card => card.id)).toEqual(second.cards.map(card => card.id));
    expect(second.unassigned).toBe(4);
  });

  it("uses acceptance to raise similar future candidates without modifying decisions", async () => {
    await decide(2, "ACCEPTED");
    const decisions = await prisma!.recommendationDecision.findMany();
    await another(0);
    expect((await batch(1)).cards.map(card => card.place.name)).toEqual(["Railway History Gallery", "Brickwork Design Studio", "Courtyard Architecture Gallery", "City Garden Pavilion"]);
    expect(await prisma!.recommendationDecision.findMany()).toEqual(decisions);
  });

  it("weakly lowers denied categories but includes them in a later finite batch", async () => {
    const twilight = await prisma!.recommendation.findFirstOrThrow({ where: { place: { name: "Twilight Food Court" } } });
    await prisma!.recommendation.update({ where: { id: twilight.id }, data: { displayRank: 0 } });
    await decide(1, "DENIED");
    await another(0);
    expect((await batch(1)).cards.map(card => card.place.name)).toEqual(["City Garden Pavilion", "Railway History Gallery", "Craft Street Arcade", "Canal Evening Promenade"]);
    await another(1);
    expect((await batch(2)).cards.map(card => card.place.name)).toContain("Twilight Food Court");
    expect((await batch(2)).exhausted).toBe(true);
  });

  it("lets explicit Trip interest outweigh denial", async () => {
    await decide(1, "DENIED");
    await updateTripDiscoverInterests(DEMO_TRIP_ID, ["FOOD_DRINK"]);
    await another(0);
    expect((await batch(1)).cards[0].place.name).toBe("Twilight Food Court");
  });

  it("makes simultaneous double clicks and delayed retries idempotent", async () => {
    const results = await Promise.all(Array.from({ length: 6 }, () => another(0)));
    expect(results.every(result => result.ok && result.data.page === 1)).toBe(true);
    expect(await prisma!.recommendation.count({ where: { presentationBatch: 1 } })).toBe(4);
    expect(await prisma!.recommendation.count({ where: { presentationBatch: 2 } })).toBe(0);
    const before = await assignments();
    await updateTripDiscoverInterests(DEMO_TRIP_ID, ["SHOPPING"]);
    expect((await another(0)).ok).toBe(true);
    expect(await assignments()).toEqual(before);
    await another(1);
    const complete = await assignments();
    const retry = await another(0);
    expect(retry.ok && retry.data.page).toBe(1);
    expect(await assignments()).toEqual(complete);
    await another(2);
    expect(await assignments()).toEqual(complete);
  });

  it("keeps historical membership and order after preference and decision edits", async () => {
    await another(0);
    const first = (await batch()).cards.map(card => card.id);
    const second = (await batch(1)).cards.map(card => card.id);
    await decide(2, "ACCEPTED");
    await updateTripDiscoverInterests(DEMO_TRIP_ID, ["FOOD_DRINK"]);
    const before = await assignments();
    expect((await batch()).cards.map(card => card.id)).toEqual(first);
    expect((await batch(1)).cards.map(card => card.id)).toEqual(second);
    expect((await batch(999)).page).toBe(1);
    expect(await assignments()).toEqual(before);
    await another(1);
    expect((await batch(2)).cards[0].place.name).toBe("Twilight Food Court");
    await decide(2, "DENIED");
    expect((await batch(1)).cards.map(card => card.id)).toEqual(second);
    expect(await prisma!.recommendationDecision.count()).toBe(1);
  });

  it("isolates repeated-city batch histories and rejects wrong Trip or future requests", async () => {
    expect((await another(0, "cmg00000000000000000000014")).ok).toBe(false);
    expect((await another(0, FIXTURE_SEGMENT_ID, "other-trip")).ok).toBe(false);
    expect((await another(99)).ok).toBe(false);
    expect((await another(-1)).ok).toBe(false);
    await another(0);
    const empty = await batch(0, "cmg00000000000000000000014");
    expect(empty.total).toBe(0);
    expect(empty.cards).toEqual([]);
    expect(empty.accepted).toEqual([]);
  });

  it("preserves full demo state, decisions and assignments during idempotent reseeding", async () => {
    await decide(0, "ACCEPTED");
    await decide(1, "DENIED");
    await updateTripDiscoverInterests(DEMO_TRIP_ID, ["NATURE_OUTDOORS"]);
    await another(0);
    const before = await assignments();
    const decisions = await prisma!.recommendationDecision.findMany({ orderBy: { id: "asc" } });
    const trip = await prisma!.trip.findUniqueOrThrow({ where: { id: DEMO_TRIP_ID }, include: { segments: true, days: true, preferenceProfile: true } });
    for (let i = 0; i < 2; i++) {
      await seedDemoTrip(prisma!, { preserveExisting: true });
      await seedDiscoverFixtures(prisma!);
    }
    expect(await assignments()).toEqual(before);
    expect(await prisma!.recommendationDecision.findMany({ orderBy: { id: "asc" } })).toEqual(decisions);
    expect(await prisma!.trip.findUniqueOrThrow({ where: { id: DEMO_TRIP_ID }, include: { segments: true, days: true, preferenceProfile: true } })).toEqual(trip);
    expect(await prisma!.recommendation.count()).toBe(12);
  });

  it("deletes Trip-owned generated state while retaining reusable factual entities", async () => {
    await another(0);
    await decide(0, "ACCEPTED");
    await updateTripDiscoverInterests(DEMO_TRIP_ID, ["FOOD_DRINK"]);
    await prisma!.trip.delete({ where: { id: DEMO_TRIP_ID } });
    expect(await prisma!.recommendation.count()).toBe(0);
    expect(await prisma!.recommendationDecision.count()).toBe(0);
    expect(await prisma!.tripPreferenceProfile.count()).toBe(0);
    expect(await prisma!.place.count()).toBe(12);
    expect(await prisma!.source.count()).toBe(1);
    expect(await prisma!.evidenceRecord.count()).toBe(14);
  });
});
