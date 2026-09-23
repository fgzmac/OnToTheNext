import { detailsInclude, itemEditToken } from "./details-context";
import { manualActivityToken } from "./details-service";
import { deriveTimeIssues } from "./planning";
import { normalizeDayPositions } from "./ordering";
import { getPrismaClient } from "@/src/lib/prisma";
import { lockPrototypeTrip } from "@/src/lib/trip-lock";
import { PROTOTYPE_OWNER_ID } from "@/src/modules/identity/prototype-owner";
import { formatDateOnly } from "@/src/modules/trips/date-only";
import { isSchedulableDecision, validatePlanning } from "./domain";
import type { ItineraryBuilder, ItineraryIssueCode, ItineraryResult } from "./types";

const failure = (code: ItineraryIssueCode, message: string) => ({ ok: false as const, error: { code, message } });

export async function scheduleAcceptedRecommendation(input: {
  tripId: string; recommendationId: string; dayId: string;
  startMinute?: unknown; flexibility?: unknown;
}): Promise<ItineraryResult<{ id: string }>> {
  try {
    return await getPrismaClient().$transaction(async tx => {
      if (!await lockPrototypeTrip(tx, input.tripId)) return failure("NOT_FOUND", "This trip is unavailable.");
      const recommendation = await tx.recommendation.findFirst({
        where: { id: input.recommendationId, tripId: input.tripId },
        include: { place: true, decision: true, scheduledItem: true },
      });
      if (!recommendation) return failure("NOT_FOUND", "This recommendation is unavailable in this trip.");
      if (!isSchedulableDecision(recommendation.decision?.outcome ?? null)) return failure("NOT_ACCEPTED", "Accept this idea in Discover before scheduling it.");
      if (recommendation.scheduledItem) return failure("ALREADY_SCHEDULED", "This idea is already on the itinerary.");
      const day = await tx.day.findFirst({ where: { id: input.dayId, tripId: input.tripId } });
      if (!day) return failure("WRONG_DAY", "Choose a day in this trip.");
      if (day.primarySegmentId !== recommendation.tripSegmentId) return failure("WRONG_SEGMENT", "Choose a day owned by this idea’s destination segment.");
      const startMinute = input.startMinute === undefined ? null : input.startMinute;
      const flexibility = input.flexibility === undefined ? "FLEXIBLE" : input.flexibility;
      const issue = validatePlanning({ startMinute, durationMinutes: recommendation.durationMinutes, flexibility });
      if (issue) return { ok: false as const, error: issue };
      // The Trip lock serializes append/removal and all structural Day edits.
      const last = await tx.itineraryItem.aggregate({ where: { dayId: day.id }, _max: { position: true } });
      const item = await tx.itineraryItem.create({ data: {
        tripId: input.tripId, dayId: day.id, type: "ACTIVITY", title: recommendation.place.name,
        sourceRecommendationId: recommendation.id, durationMinutes: recommendation.durationMinutes,
        startMinute: startMinute as number | null, flexibility: flexibility === "FIXED" ? "FIXED" : "FLEXIBLE",
        position: (last._max.position ?? -1) + 1,
      } });
      return { ok: true as const, data: { id: item.id } };
    });
  } catch {
    return failure("PERSISTENCE_FAILURE", "The idea could not be scheduled. Please try again.");
  }
}

export async function removeItineraryItem(tripId: string, itemId: string): Promise<ItineraryResult<{ id: string }>> {
  try {
    return await getPrismaClient().$transaction(async tx => {
      if (!await lockPrototypeTrip(tx, tripId)) return failure("NOT_FOUND", "This trip is unavailable.");
      const item = await tx.itineraryItem.findFirst({ where: { id: itemId, tripId } });
      if (!item) return failure("NOT_FOUND", "This scheduled item is unavailable in this trip.");
      // Keep origin history; the composite FK prevents cross-Trip references.
      // Detach before deleting a referenced stop, so the target survives for review.
      await tx.itineraryTravelPlan.updateMany({ where: { tripId, sourceItemId: item.id }, data: { sourceItemId: null } });
      await tx.itineraryItem.delete({ where: { id: item.id } });
      await normalizeDayPositions(tx, item.dayId);
      return { ok: true as const, data: { id: item.id } };
    });
  } catch {
    return failure("PERSISTENCE_FAILURE", "The scheduled item could not be removed. Please try again.");
  }
}

export async function getItineraryBuilder(tripId: string): Promise<ItineraryResult<ItineraryBuilder>> {
  try {
    return await getPrismaClient().$transaction(async tx => {
      const trip = await tx.trip.findFirst({
        where: { id: tripId, ownerId: PROTOTYPE_OWNER_ID },
        include: { segments: { orderBy: { position: "asc" } }, days: { orderBy: { position: "asc" }, include: {
          primarySegment: true, itineraryItems: { orderBy: { position: "asc" }, include: { ...detailsInclude, sourceRecommendation: { select: { tripSegmentId: true } } } },
        } } },
      });
      if (!trip) return failure("NOT_FOUND", "This trip is unavailable.");
      const accepted = await tx.recommendation.findMany({
        where: { tripId, decision: { outcome: "ACCEPTED" }, scheduledItem: null },
        include: { place: true, tripSegment: true },
        orderBy: [{ tripSegment: { position: "asc" } }, { displayRank: "asc" }, { id: "asc" }],
      });
      return { ok: true as const, data: {
        tripId, createToken: manualActivityToken(tripId),
        segments: trip.segments.map(segment => ({ id: segment.id, label: (segment.position + 1) + ". " + segment.baseName + " · " + formatDateOnly(segment.arrivalDate) + " to " + formatDateOnly(segment.departureDate) })),
        days: trip.days.map(day => ({
          id: day.id, date: formatDateOnly(day.date), primarySegmentId: day.primarySegmentId,
          base: day.primarySegment?.baseName ?? null,
          issues: deriveTimeIssues(day.itineraryItems),
          items: day.itineraryItems.map(item => ({
            editToken: itemEditToken(item), enteredManually: item.enteredManually, locationLabel: item.locationLabel, referenceUrl: item.referenceUrl,
            id: item.id, title: item.title, type: item.type, startMinute: item.startMinute, progress: item.progress,
            durationMinutes: item.durationMinutes, position: item.position, flexibility: item.flexibility,
            notes: item.notes, sourceRecommendationId: item.sourceRecommendationId,
            sourceSegmentId: item.sourceRecommendation?.tripSegmentId ?? null,
            transportationMode: item.transportationMode, originSegmentId: item.originSegmentId, destinationSegmentId: item.destinationSegmentId,
          })),
        })),
        unscheduled: accepted.map(item => ({
          id: item.id, title: item.place.name, segmentId: item.tripSegmentId, durationMinutes: item.durationMinutes,
          segmentLabel: (item.tripSegment.position + 1) + ". " + item.tripSegment.baseName + " · " + formatDateOnly(item.tripSegment.arrivalDate) + " to " + formatDateOnly(item.tripSegment.departureDate),
        })),
      } };
    }, { isolationLevel: "RepeatableRead" });
  } catch {
    return failure("PERSISTENCE_FAILURE", "The itinerary could not be loaded. Please try again.");
  }
}
