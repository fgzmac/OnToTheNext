"use server";
import { revalidatePath } from "next/cache";
import { addRecommendationToDay } from "./service";
import { decideRecommendation, getRecommendationBatch, requestAnotherRecommendationBatch, updateTripDiscoverInterests } from "@/src/modules/discover/service";

function refresh(tripId: string) {
  revalidatePath("/trips/" + tripId);
  revalidatePath("/trips/" + tripId + "/itinerary");
  revalidatePath("/trips/" + tripId + "/discover");
}
export async function composerAdd(input: Parameters<typeof addRecommendationToDay>[0]) {
  const result = await addRecommendationToDay(input);
  if (result.ok) refresh(input.tripId);
  return result;
}
export async function composerDeny(input: { tripId: string; tripSegmentId: string; recommendationId: string }) {
  const result = await decideRecommendation({ ...input, outcome: "DENIED" });
  if (result.ok) refresh(input.tripId);
  return result;
}
export async function composerBatch(tripId: string, tripSegmentId: string, page: number, more = false, dayId?: string) {
  if (more) {
    const result = await requestAnotherRecommendationBatch({ tripId, tripSegmentId, fromBatch: page, dayId });
    if (!result.ok) return result;
    page = result.data.page;
  }
  return getRecommendationBatch(tripId, tripSegmentId, String(page), dayId);
}
export async function saveComposerInterests(tripId: string, interests: unknown) {
  const result = await updateTripDiscoverInterests(tripId, interests);
  if (result.ok) refresh(tripId);
  return result;
}
