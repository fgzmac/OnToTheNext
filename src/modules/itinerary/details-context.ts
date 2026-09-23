import type { Prisma } from "@/src/generated/prisma/client";
import { fingerprint, signActionPreview } from "./preview-token";
import { itemDetails } from "./details-domain";
export const detailsInclude = { day: { include: { primarySegment: true } }, reservation: true } as const;
export type DetailsItem = Prisma.ItineraryItemGetPayload<{ include: typeof detailsInclude }>;
export type EditToken = { purpose: "itinerary-edit" | "itinerary-edit-confirm"; tripId: string; itemId: string; revision: number; context: string; changesHash?: string };
export function editContext(item: DetailsItem) {
  return fingerprint({ id: item.id, tripId: item.tripId, dayId: item.dayId, position: item.position, type: item.type,
    details: itemDetails(item), progress: item.progress, sourceRecommendationId: item.sourceRecommendationId,
    originSegmentId: item.originSegmentId, destinationSegmentId: item.destinationSegmentId,
    day: item.day, reservation: item.reservation });
}
export function itemEditToken(item: DetailsItem, now = new Date()) {
  return signActionPreview<EditToken>({ purpose: "itinerary-edit", tripId: item.tripId, itemId: item.id,
    revision: item.revision, context: editContext(item) }, now.getTime());
}
