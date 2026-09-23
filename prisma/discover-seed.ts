import type { PrismaClient } from "../src/generated/prisma/client";
import { DEMO_TRIP_ID } from "./seed-data";
import { DISCOVER_FIXTURES, FIXTURE_RETRIEVED_AT, FIXTURE_SEGMENT_ID, FIXTURE_SOURCE_ID } from "../src/modules/discover/fixture-catalog";

// Catalog setup is separate from trip creation. Only the known synthetic demo
// segment receives recommendations. Upserts preserve existing organizer decisions.
export async function seedDiscoverFixtures(prisma: PrismaClient) {
  await prisma.$transaction(async (tx) => {
    const segment = await tx.tripSegment.findFirst({ where: { id: FIXTURE_SEGMENT_ID, tripId: DEMO_TRIP_ID } });
    if (!segment) return;
    // Do not add new members to an already established historical batch.
    const hasAssignedBatch = await tx.recommendation.count({ where: { tripSegmentId: segment.id, presentationBatch: { not: null } } }) > 0;
    await tx.source.upsert({
      where: { id: FIXTURE_SOURCE_ID },
      update: {},
      create: { id: FIXTURE_SOURCE_ID, name: "Development Fixture Catalog", kind: "DEVELOPMENT_FIXTURE" },
    });
    for (const [index, fixture] of DISCOVER_FIXTURES.entries()) {
      const placeId = "cmg000000000000000000003" + String(index + 1).padStart(2, "0");
      await tx.place.upsert({
        where: { id: placeId },
        update: {},
        create: { id: placeId, name: fixture.name, baseLabel: "Tokyo (synthetic demo)", category: fixture.category, interestTags: [...fixture.interestTags] },
      });
      // Classify older fixture Places once; retain later explicit classifications.
      await tx.place.updateMany({ where: { id: placeId, interestTags: { isEmpty: true } }, data: { interestTags: [...fixture.interestTags] } });
      await tx.evidenceRecord.upsert({
        where: { placeId_sourceId_topic: { placeId, sourceId: FIXTURE_SOURCE_ID, topic: "Development experience" } },
        update: {},
        create: {
          placeId, sourceId: FIXTURE_SOURCE_ID, topic: "Development experience",
          factualText: fixture.summary + " Duration, cost and logistics are illustrative fixture values.",
          retrievedAt: new Date(FIXTURE_RETRIEVED_AT), status: "FIXTURE",
        },
      });
      if (index === 0) {
        for (const [topic, factualText] of [
          ["Ticket availability", "Development fixture: tickets unavailable in this illustrative scenario. Not live inventory."],
          ["Booking policy", "Development fixture: illustrative advance booking policy. Not live; consult the provider before booking."],
        ]) await tx.evidenceRecord.upsert({
          where: { placeId_sourceId_topic: { placeId, sourceId: FIXTURE_SOURCE_ID, topic } }, update: {},
          create: { placeId, sourceId: FIXTURE_SOURCE_ID, topic, factualText, retrievedAt: new Date(FIXTURE_RETRIEVED_AT), status: "FIXTURE" },
        });
      }
      await tx.recommendation.upsert({
        where: { tripSegmentId_placeId: { tripSegmentId: segment.id, placeId } },
        update: {},
        create: {
          tripId: DEMO_TRIP_ID, tripSegmentId: segment.id, placeId,
          presentationBatch: !hasAssignedBatch && index < 4 ? 0 : null,
          presentationOrder: !hasAssignedBatch && index < 4 ? index : null,
          factualSummary: fixture.summary, durationMinutes: fixture.durationMinutes,
          costContext: fixture.cost, logisticsNote: fixture.logistics, displayRank: index + 1,
        },
      });
    }
  });
}
