import type { Prisma } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { PROTOTYPE_OWNER_ID } from "@/src/modules/identity/prototype-owner";
import { BATCH_SIZE, isOrganizerDecision, parseBatchPage } from "./domain";
import { rankUnassignedRecommendations, validateDiscoverInterests } from "./refinement";
import type { DiscoverInterest } from "@/src/generated/prisma/enums";
import type { DiscoverResult, RecommendationBatch, RecommendationCardData } from "./types";

const cardInclude = {
  place: { include: { evidence: { include: { source: true }, orderBy: { id: "asc" as const } } } },
  decision: true,
} satisfies Prisma.RecommendationInclude;

type CardRecord = Prisma.RecommendationGetPayload<{ include: typeof cardInclude }>;

function cardData(record: CardRecord): RecommendationCardData {
  return {
    id: record.id, tripId: record.tripId, tripSegmentId: record.tripSegmentId,
    place: { id: record.place.id, name: record.place.name, baseLabel: record.place.baseLabel, category: record.place.category },
    factualSummary: record.factualSummary, durationMinutes: record.durationMinutes,
    costContext: record.costContext, logisticsNote: record.logisticsNote,
    decision: record.decision?.outcome ?? null,
    evidence: record.place.evidence.map(item => ({
      id: item.id, topic: item.topic, factualText: item.factualText,
      retrievedAt: item.retrievedAt.toISOString(), status: item.status,
      sourceName: item.source.name, sourceKind: item.source.kind,
    })),
  };
}

// All assignment paths lock the same existing Segment row. Under PostgreSQL
// READ COMMITTED, a waiting retry reads assignments committed by its predecessor.
async function lockSegment(tx: Prisma.TransactionClient, tripId: string, segmentId: string) {
  const rows = await tx.$queryRaw<{ id: string }[]>`
    SELECT s."id" FROM "TripSegment" s JOIN "Trip" t ON t."id" = s."tripId"
    WHERE s."id" = ${segmentId} AND s."tripId" = ${tripId} AND t."ownerId" = ${PROTOTYPE_OWNER_ID}
    FOR UPDATE OF s
  `;
  return rows.length > 0;
}

async function ensureInitialBatch(tx: Prisma.TransactionClient, tripId: string, tripSegmentId: string) {
  const where = { tripId, tripSegmentId };
  if (await tx.recommendation.count({ where: { ...where, presentationBatch: { not: null } } })) return;
  // Initial variety follows the curated base order, independent of interests.
  const initial = await tx.recommendation.findMany({
    where: { ...where, presentationBatch: null, decision: null },
    orderBy: [{ displayRank: "asc" }, { id: "asc" }], take: BATCH_SIZE,
  });
  for (const [position, item] of initial.entries()) {
    await tx.recommendation.update({ where: { id: item.id }, data: { presentationBatch: 0, presentationOrder: position } });
  }
}

export async function getRecommendationBatch(tripId: string, tripSegmentId: string, requestedPage?: string): Promise<DiscoverResult<RecommendationBatch>> {
  try {
    return await getPrismaClient().$transaction(async tx => {
      if (!await lockSegment(tx, tripId, tripSegmentId)) return { ok: false as const, error: "This destination is unavailable. Choose a destination in this trip." };
      await ensureInitialBatch(tx, tripId, tripSegmentId);
      const where = { tripId, tripSegmentId };
      const total = await tx.recommendation.count({ where });
      const unassigned = await tx.recommendation.count({ where: { ...where, presentationBatch: null, decision: null } });
      const max = await tx.recommendation.aggregate({ where, _max: { presentationBatch: true } });
      const latestBatch = max._max.presentationBatch ?? 0;
      const page = Math.min(parseBatchPage(requestedPage), latestBatch);
      const cards = await tx.recommendation.findMany({
        where: { ...where, presentationBatch: page }, include: cardInclude,
        orderBy: [{ presentationOrder: "asc" }, { id: "asc" }],
      });
      const accepted = await tx.recommendation.findMany({
        where: { ...where, decision: { outcome: "ACCEPTED" } },
        include: cardInclude, orderBy: [{ displayRank: "asc" }, { id: "asc" }],
      });
      const preferences = await tx.tripPreferenceProfile.findUnique({ where: { tripId } });
      return { ok: true as const, data: {
        cards: cards.map(cardData), accepted: accepted.map(cardData), total, page,
        totalPages: total === 0 ? 0 : latestBatch + 1 + Math.ceil(unassigned / BATCH_SIZE),
        latestBatch, unassigned, interests: preferences?.discoverInterests ?? [],
        exhausted: total > 0 && unassigned === 0 && page === latestBatch,
      } };
    }, { isolationLevel: "ReadCommitted" });
  } catch {
    return { ok: false, error: "Recommendations could not be loaded. Please try again." };
  }
}

export async function updateTripDiscoverInterests(tripId: string, values: unknown): Promise<DiscoverResult<DiscoverInterest[]>> {
  const interests = validateDiscoverInterests(values);
  if (interests === null) return { ok: false, error: "Choose interests from the available list." };
  try {
    return await getPrismaClient().$transaction(async tx => {
      if (!await tx.trip.findFirst({ where: { id: tripId, ownerId: PROTOTYPE_OWNER_ID } })) return { ok: false as const, error: "This trip is unavailable." };
      await tx.tripPreferenceProfile.upsert({
        where: { tripId }, create: { tripId, discoverInterests: interests }, update: { discoverInterests: interests },
      });
      return { ok: true as const, data: interests };
    });
  } catch {
    return { ok: false, error: "Trip interests could not be saved. Please try again." };
  }
}

export async function requestAnotherRecommendationBatch(input: {
  tripId: string; tripSegmentId: string; fromBatch: number;
}): Promise<DiscoverResult<{ page: number }>> {
  if (!Number.isSafeInteger(input.fromBatch) || input.fromBatch < 0 || input.fromBatch > 100_000) return { ok: false, error: "Choose an existing batch first." };
  try {
    return await getPrismaClient().$transaction(async tx => {
      const { tripId, tripSegmentId, fromBatch } = input;
      if (!await lockSegment(tx, tripId, tripSegmentId)) return { ok: false as const, error: "This destination is unavailable." };
      await ensureInitialBatch(tx, tripId, tripSegmentId);
      const where = { tripId, tripSegmentId };
      const max = await tx.recommendation.aggregate({ where, _max: { presentationBatch: true } });
      const latest = max._max.presentationBatch;
      if (latest === null || fromBatch > latest) return { ok: false as const, error: "Choose an existing batch first." };
      // The originating batch is the idempotency key, including delayed retries.
      if (fromBatch < latest) return { ok: true as const, data: { page: fromBatch + 1 } };
      const candidates = await tx.recommendation.findMany({
        where: { ...where, presentationBatch: null, decision: null }, include: { place: true, decision: true },
      });
      if (candidates.length === 0) return { ok: true as const, data: { page: latest } };
      const preferences = await tx.tripPreferenceProfile.findUnique({ where: { tripId } });
      const history = await tx.recommendation.findMany({
        where: { ...where, decision: { isNot: null } }, include: { place: true, decision: true },
      });
      const ranked = rankUnassignedRecommendations(candidates.map(item => ({
        id: item.id, displayRank: item.displayRank, interestTags: item.place.interestTags,
        presentationBatch: item.presentationBatch, decision: item.decision?.outcome ?? null,
      })), preferences?.discoverInterests ?? [], history.map(item => ({
        outcome: item.decision!.outcome, interestTags: item.place.interestTags,
      }))).slice(0, BATCH_SIZE);
      for (const [position, item] of ranked.entries()) {
        await tx.recommendation.update({ where: { id: item.id }, data: { presentationBatch: latest + 1, presentationOrder: position } });
      }
      return { ok: true as const, data: { page: latest + 1 } };
    }, { isolationLevel: "ReadCommitted", timeout: 10_000 });
  } catch {
    return { ok: false, error: "Another batch could not be prepared. Please try again." };
  }
}

export async function decideRecommendation(input: {
  tripId: string; tripSegmentId: string; recommendationId: string; outcome: unknown;
}): Promise<DiscoverResult<{ outcome: "ACCEPTED" | "DENIED" }>> {
  if (!isOrganizerDecision(input.outcome)) return { ok: false, error: "Choose Accept or Deny." };
  const outcome = input.outcome;
  try {
    return await getPrismaClient().$transaction(async tx => {
      const recommendation = await tx.recommendation.findFirst({
        where: {
          id: input.recommendationId, tripId: input.tripId, tripSegmentId: input.tripSegmentId,
          trip: { ownerId: PROTOTYPE_OWNER_ID },
        },
      });
      if (!recommendation) return { ok: false as const, error: "This recommendation is unavailable in the selected destination." };
      await tx.recommendationDecision.upsert({
        where: { recommendationId: recommendation.id },
        create: { recommendationId: recommendation.id, outcome },
        update: { outcome },
      });
      // Only a decision is written: no Day, schedule, reservation or preference mutation.
      return { ok: true as const, data: { outcome } };
    });
  } catch {
    return { ok: false, error: "Your decision could not be saved. Please try again." };
  }
}
