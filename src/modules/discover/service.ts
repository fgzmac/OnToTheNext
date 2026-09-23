import type { Prisma } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { PROTOTYPE_OWNER_ID } from "@/src/modules/identity/prototype-owner";
import { batchWindow, isOrganizerDecision, parseBatchPage } from "./domain";
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

export async function getRecommendationBatch(tripId: string, tripSegmentId: string, page?: string): Promise<DiscoverResult<RecommendationBatch>> {
  try {
    return await getPrismaClient().$transaction(async tx => {
      const segment = await tx.tripSegment.findFirst({
        where: { id: tripSegmentId, tripId, trip: { ownerId: PROTOTYPE_OWNER_ID } },
      });
      if (!segment) return { ok: false as const, error: "This destination is unavailable. Choose a destination in this trip." };
      const where = { tripId, tripSegmentId };
      const total = await tx.recommendation.count({ where });
      const window = batchWindow(parseBatchPage(page), total);
      const cards = await tx.recommendation.findMany({
        where, include: cardInclude, orderBy: [{ displayRank: "asc" }, { id: "asc" }],
        skip: window.skip, take: window.take,
      });
      const accepted = await tx.recommendation.findMany({
        where: { ...where, decision: { outcome: "ACCEPTED" } },
        include: cardInclude, orderBy: [{ displayRank: "asc" }, { id: "asc" }],
      });
      return { ok: true as const, data: {
        cards: cards.map(cardData), accepted: accepted.map(cardData), total,
        page: window.page, totalPages: window.totalPages, exhausted: window.exhausted,
      } };
    }, { isolationLevel: "RepeatableRead" });
  } catch {
    return { ok: false, error: "Recommendations could not be loaded. Please try again." };
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
