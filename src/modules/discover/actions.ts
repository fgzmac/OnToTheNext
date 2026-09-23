"use server";

import { revalidatePath } from "next/cache";
import { homeContextQuery } from "@/src/modules/trips/home-context";
import { redirect } from "next/navigation";
import { decideRecommendation, updateTripDiscoverInterests, requestAnotherRecommendationBatch } from "./service";
import type { DecisionActionState } from "./types";

export async function recommendationDecisionAction(_previous: DecisionActionState, formData: FormData): Promise<DecisionActionState> {
  const tripId = String(formData.get("tripId") ?? "");
  const result = await decideRecommendation({
    tripId,
    tripSegmentId: String(formData.get("tripSegmentId") ?? ""),
    recommendationId: String(formData.get("recommendationId") ?? ""),
    outcome: formData.get("outcome"),
  });
  if (!result.ok) return { error: result.error, message: null };
  revalidatePath("/trips/" + tripId + "/discover");
  revalidatePath("/trips/" + tripId + "/itinerary");
  return { error: null, message: result.data.outcome === "ACCEPTED" ? "Accepted. Scheduling is a separate action in Itinerary." : "Denied. Your decision is saved." };
}

export async function tripInterestsAction(_previous: DecisionActionState, formData: FormData): Promise<DecisionActionState> {
  const tripId = String(formData.get("tripId") ?? "");
  const values = formData.get("intent") === "clear" ? [] : formData.getAll("interests");
  const result = await updateTripDiscoverInterests(tripId, values);
  if (!result.ok) return { error: result.error, message: null };
  revalidatePath("/trips/" + tripId + "/discover");
  return { error: null, message: "Trip interests saved. Existing batches are unchanged." };
}

export async function anotherBatchAction(_previous: DecisionActionState, formData: FormData): Promise<DecisionActionState> {
  const tripId = String(formData.get("tripId") ?? "");
  const tripSegmentId = String(formData.get("tripSegmentId") ?? "");
  const from = formData.get("fromBatch");
  const result = await requestAnotherRecommendationBatch({
    tripId, tripSegmentId, fromBatch: typeof from === "string" && /^\d+$/.test(from) ? Number(from) : NaN,
  });
  if (!result.ok) return { error: result.error, message: null };
  revalidatePath("/trips/" + tripId + "/discover");
  const context = homeContextQuery(formData.get("homeView"), formData.get("homeDay"));
  redirect("/trips/" + tripId + "/discover?segmentId=" + encodeURIComponent(tripSegmentId) + "&page=" + result.data.page + (context ? "&" + context : ""));
}
