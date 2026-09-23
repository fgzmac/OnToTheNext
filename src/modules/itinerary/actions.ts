"use server";

import { revalidatePath } from "next/cache";
import { parseLocalTime } from "./domain";
import { removeItineraryItem, scheduleAcceptedRecommendation } from "./service";
import type { ItineraryActionState } from "./types";

export async function scheduleRecommendationAction(_previous: ItineraryActionState, form: FormData): Promise<ItineraryActionState> {
  const tripId = String(form.get("tripId") ?? "");
  const time = parseLocalTime(String(form.get("time") ?? ""));
  const result = await scheduleAcceptedRecommendation({
    tripId, recommendationId: String(form.get("recommendationId") ?? ""), dayId: String(form.get("dayId") ?? ""),
    startMinute: time === undefined ? NaN : time, flexibility: form.get("flexibility"),
  });
  if (!result.ok) return { error: result.error, message: null };
  revalidatePath("/trips/" + tripId + "/itinerary");
  return { error: null, message: "Added to itinerary." };
}
export async function removeItineraryItemAction(_previous: ItineraryActionState, form: FormData): Promise<ItineraryActionState> {
  const tripId = String(form.get("tripId") ?? "");
  const result = await removeItineraryItem(tripId, String(form.get("itemId") ?? ""));
  if (!result.ok) return { error: result.error, message: null };
  revalidatePath("/trips/" + tripId + "/itinerary");
  return { error: null, message: "Removed from itinerary. Your Discover decision is unchanged." };
}
