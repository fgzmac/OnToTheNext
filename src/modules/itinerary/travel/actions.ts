"use server";
import { revalidatePath } from "next/cache";
import { saveTravelPlan, clearTravelPlan, reconfirmTravelPlan } from "./service";
export type TravelActionState = { error: string | null };
const identity = (form: FormData) => ({ tripId: String(form.get("tripId") ?? ""), itemId: String(form.get("itemId") ?? ""), token: String(form.get("token") ?? "") });
async function finish(tripId: string, result: Awaited<ReturnType<typeof saveTravelPlan>>): Promise<TravelActionState> {
  if (!result.ok) return { error: result.error.message };
  revalidatePath("/trips/" + tripId); revalidatePath("/trips/" + tripId + "/itinerary"); return { error: null };
}
export async function saveTravelAction(_state: TravelActionState, form: FormData) {
  const i = identity(form);
  return finish(i.tripId, await saveTravelPlan({ ...i, originKind: form.get("originKind"), sourceItemId: form.get("sourceItemId"), originLabel: form.get("originLabel"),
    travelMinutes: form.get("travelMinutes"), bufferMinutes: form.get("bufferMinutes"), basis: form.get("basis"), clockContext: form.get("clockContext"), plannedAcknowledged: form.get("plannedAcknowledged") === "on" }));
}
export async function clearTravelAction(_state: TravelActionState, form: FormData) { const i = identity(form); return finish(i.tripId, await clearTravelPlan(i)); }
export async function reconfirmTravelAction(_state: TravelActionState, form: FormData) { const i = identity(form); return finish(i.tripId, await reconfirmTravelPlan({ ...i, plannedAcknowledged: form.get("plannedAcknowledged") === "on" })); }
