import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { createTrip, getTripSkeleton, removeSegment } from "@/src/modules/trips/service";
import { decideRecommendation, getRecommendationBatch, requestAnotherRecommendationBatch } from "@/src/modules/discover/service";
import { FIXTURE_SEGMENT_ID, FIXTURE_SOURCE_ID } from "@/src/modules/discover/fixture-catalog";
import { seedDemoTrip, DEMO_TRIP_ID } from "../prisma/seed-data";
import { seedDiscoverFixtures } from "../prisma/discover-seed";

const enabled = Boolean(process.env.DATABASE_URL);
const integration = enabled ? describe : describe.skip;
const prisma = enabled ? getPrismaClient() : null;

async function batch(page = "0") {
  const result = await getRecommendationBatch(DEMO_TRIP_ID, FIXTURE_SEGMENT_ID, page);
  expect(result.ok).toBe(true);
  if (!result.ok) throw new Error(result.error);
  return result.data;
}
function choose(recommendationId: string, outcome: unknown, tripSegmentId = FIXTURE_SEGMENT_ID, tripId = DEMO_TRIP_ID) {
  return decideRecommendation({ tripId, tripSegmentId, recommendationId, outcome });
}

integration("Discover PostgreSQL persistence", () => {
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

  it("persists distinct Places, Recommendations, Sources and linked fixture Evidence", async () => {
    expect(await prisma!.place.count()).toBe(12);
    expect(await prisma!.recommendation.count()).toBe(12);
    expect(await prisma!.source.count()).toBe(1);
    expect(await prisma!.evidenceRecord.count()).toBe(14);
    expect(await prisma!.recommendationDecision.count()).toBe(0);
    const first = (await batch()).cards[0];
    expect(first.id).not.toBe(first.place.id);
    expect(first.tripId).toBe(DEMO_TRIP_ID);
    expect(first.tripSegmentId).toBe(FIXTURE_SEGMENT_ID);
    expect(first.evidence).toHaveLength(3);
    expect(first.evidence[0]).toMatchObject({ status: "FIXTURE", sourceKind: "DEVELOPMENT_FIXTURE", sourceName: "Development Fixture Catalog" });
    expect((await prisma!.evidenceRecord.findFirstOrThrow({ where: { placeId: first.place.id } })).sourceId).toBe(FIXTURE_SOURCE_ID);
  });

  it("upserts one current decision, persists through a fresh database client, and never schedules", async () => {
    const id = (await batch()).cards[0].id;
    const skeleton = (await getTripSkeleton(DEMO_TRIP_ID)).data;
    const recommendationBefore = await prisma!.recommendation.findUniqueOrThrow({ where: { id } });
    expect((await choose(id, "ACCEPTED")).ok).toBe(true);
    expect((await choose(id, "DENIED")).ok).toBe(true);
    expect(await prisma!.recommendationDecision.count({ where: { recommendationId: id } })).toBe(1);
    expect((await batch()).accepted).toHaveLength(0);
    expect((await batch()).cards[0].decision).toBe("DENIED");
    expect((await choose(id, "ACCEPTED")).ok).toBe(true);
    const freshClient = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.TEST_DATABASE_URL! }) });
    try {
      expect((await freshClient.recommendationDecision.findUniqueOrThrow({ where: { recommendationId: id } })).outcome).toBe("ACCEPTED");
    } finally { await freshClient.$disconnect(); }
    expect((await getTripSkeleton(DEMO_TRIP_ID)).data).toEqual(skeleton);
    expect(await prisma!.recommendation.findUniqueOrThrow({ where: { id } })).toEqual(recommendationBefore);
  });

  it("keeps different batches stable and leaves accepted/denied decisions unchanged", async () => {
    const first = await batch();
    await choose(first.cards[0].id, "ACCEPTED");
    await choose(first.cards[1].id, "DENIED");
    const before = await prisma!.recommendationDecision.findMany({ orderBy: { id: "asc" } });
    expect((await requestAnotherRecommendationBatch({ tripId: DEMO_TRIP_ID, tripSegmentId: FIXTURE_SEGMENT_ID, fromBatch: 0 })).ok).toBe(true);
    const second = await batch("1");
    expect(second.cards).toHaveLength(4);
    expect(second.cards.every(card => !first.cards.some(other => other.id === card.id))).toBe(true);
    expect(second.accepted.map(card => card.id)).toEqual([first.cards[0].id]);
    await requestAnotherRecommendationBatch({ tripId: DEMO_TRIP_ID, tripSegmentId: FIXTURE_SEGMENT_ID, fromBatch: 1 });
    expect((await batch("2")).exhausted).toBe(true);
    expect((await batch("2")).cards).toHaveLength(4);
    expect(await prisma!.recommendationDecision.findMany({ orderBy: { id: "asc" } })).toEqual(before);
    expect((await batch()).cards.map(card => card.decision)).toEqual(["ACCEPTED", "DENIED", null, null]);
  });

  it("scopes repeated-city recommendations and decisions by Segment identity", async () => {
    const first = (await batch()).cards[0];
    const returnSegmentId = "cmg00000000000000000000014";
    const second = await prisma!.recommendation.create({ data: {
      tripId: DEMO_TRIP_ID, tripSegmentId: returnSegmentId, placeId: first.place.id,
      factualSummary: first.factualSummary, displayRank: 1,
    } });
    await choose(first.id, "ACCEPTED");
    const returned = await getRecommendationBatch(DEMO_TRIP_ID, returnSegmentId);
    expect(returned.ok && returned.data.cards[0].id).toBe(second.id);
    expect(returned.ok && returned.data.cards[0].decision).toBeNull();
    expect(returned.ok && returned.data.accepted).toEqual([]);
    expect((await choose(first.id, "DENIED", returnSegmentId)).ok).toBe(false);
    expect((await batch()).cards[0].decision).toBe("ACCEPTED");
  });

  it("rejects wrong-trip relationships at the service and database boundaries", async () => {
    const first = (await batch()).cards[0];
    const other = await createTrip({ destinationLabel: "Elsewhere", destinationScope: "COUNTRY_REGION", startDate: "2031-01-01", endDate: "2031-01-02", travelerCount: 1 });
    const otherId = other.data!.trip.id;
    expect((await getRecommendationBatch(otherId, FIXTURE_SEGMENT_ID)).ok).toBe(false);
    expect((await choose(first.id, "ACCEPTED", FIXTURE_SEGMENT_ID, otherId)).ok).toBe(false);
    await expect(prisma!.recommendation.create({ data: {
      tripId: otherId, tripSegmentId: "cmg00000000000000000000014", placeId: first.place.id, factualSummary: "Invalid cross-trip context", displayRank: 1,
    } })).rejects.toMatchObject({ code: "P2003" });
    expect(await prisma!.recommendationDecision.count()).toBe(0);
  });

  it("preserves decisions when fixture evidence is reread or catalog seeding repeats", async () => {
    const first = (await batch()).cards[0];
    await choose(first.id, "DENIED");
    const before = await prisma!.recommendationDecision.findMany();
    await seedDiscoverFixtures(prisma!);
    expect(await prisma!.recommendationDecision.findMany()).toEqual(before);
    expect(await prisma!.place.count()).toBe(12);
    expect(await prisma!.recommendation.count()).toBe(12);
    await prisma!.evidenceRecord.update({ where: { id: first.evidence[0].id }, data: { factualText: "Updated synthetic fixture description." } });
    expect((await batch()).cards[0].decision).toBe("DENIED");
    expect((await batch()).cards[0].evidence[0].factualText).toBe("Updated synthetic fixture description.");
  });

  it("cascades Trip-owned recommendations and decisions while retaining reusable data", async () => {
    await choose((await batch()).cards[0].id, "ACCEPTED");
    await prisma!.trip.delete({ where: { id: DEMO_TRIP_ID } });
    expect(await prisma!.recommendation.count()).toBe(0);
    expect(await prisma!.recommendationDecision.count()).toBe(0);
    expect(await prisma!.place.count()).toBe(12);
    expect(await prisma!.source.count()).toBe(1);
    expect(await prisma!.evidenceRecord.count()).toBe(14);
    expect(await prisma!.prototypeUser.count()).toBe(1);
  });

  it("removes Segment-owned recommendations and decisions without deleting Trip Days or Places", async () => {
    await choose((await batch()).cards[0].id, "DENIED");
    const before = (await getTripSkeleton(DEMO_TRIP_ID)).data!.days.map(day => day.id);
    expect((await removeSegment(DEMO_TRIP_ID, FIXTURE_SEGMENT_ID)).ok).toBe(true);
    expect(await prisma!.recommendation.count()).toBe(0);
    expect(await prisma!.recommendationDecision.count()).toBe(0);
    expect((await getTripSkeleton(DEMO_TRIP_ID)).data!.days.map(day => day.id)).toEqual(before);
    expect(await prisma!.place.count()).toBe(12);
    expect(await prisma!.source.count()).toBe(1);
  });

  it("returns an honest empty catalog and rejects unsupported or missing decisions", async () => {
    const empty = await getRecommendationBatch(DEMO_TRIP_ID, "cmg00000000000000000000012");
    expect(empty.ok && empty.data.total).toBe(0);
    expect(empty.ok && empty.data.exhausted).toBe(false);
    const id = (await batch()).cards[0].id;
    expect((await choose(id, "SAVED")).ok).toBe(false);
    expect((await choose("missing", "ACCEPTED")).ok).toBe(false);
    expect(await prisma!.recommendationDecision.count()).toBe(0);
  });
});
