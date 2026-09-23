"use server";

import { revalidatePath } from "next/cache";
import { decideRecommendation } from "./service";
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
  return { error: null, message: result.data.outcome === "ACCEPTED" ? "Accepted. Nothing has been scheduled or booked." : "Denied. Your decision is saved." };
}
