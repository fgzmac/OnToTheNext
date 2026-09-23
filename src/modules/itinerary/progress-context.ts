import type { Prisma } from "@/src/generated/prisma/client";
import { fingerprint, signActionPreview } from "./preview-token";
export const progressInclude = { day: true, reservation: true } as const;
export type ProgressItem = Prisma.ItineraryItemGetPayload<{ include: typeof progressInclude }>;
export type ProgressContext = { purpose: "itinerary-progress" | "itinerary-skip"; tripId: string; itemId: string; revision: number; progress: string; context: string };
export function progressContext(item: ProgressItem): string {
  // Exclude only metadata that this capability changes; retain every planning,
  // Day and booking field so an intervening context change invalidates a request.
  const { progress: _progress, progressChangedAt: _at, progressActionKey: _key, revision: _revision, updatedAt: _updated, ...context } = item;
  void _progress; void _at; void _key; void _revision; void _updated;
  return fingerprint(context);
}
export function progressToken(item: ProgressItem, now: Date, purpose: ProgressContext["purpose"] = "itinerary-progress"): string {
  return signActionPreview<ProgressContext>({ purpose, tripId: item.tripId, itemId: item.id, revision: item.revision, progress: item.progress, context: progressContext(item) }, now.getTime());
}
