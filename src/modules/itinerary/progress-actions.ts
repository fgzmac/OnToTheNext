"use server";
import { revalidatePath } from "next/cache";
import { markItineraryItemCompleted, previewSkipItineraryItem, restoreItineraryItemToPending, skipItineraryItem, type ProgressResult, type SkipPreview } from "./progress-service";
export type ProgressActionState = { error: string | null; preview: SkipPreview | null };
const input = (form: FormData) => ({ tripId: String(form.get("tripId") ?? ""), itemId: String(form.get("itemId") ?? ""), token: String(form.get("token") ?? "") });
function finish(tripId: string, result: ProgressResult<{ id: string }>): ProgressActionState {
  if (!result.ok) return { error: result.error.message, preview: null };
  revalidatePath("/trips/" + tripId);
  revalidatePath("/trips/" + tripId + "/itinerary");
  return { error: null, preview: null };
}
export async function completeItemAction(_previous: ProgressActionState, form: FormData) { const i = input(form); return finish(i.tripId, await markItineraryItemCompleted(i)); }
export async function restoreItemAction(_previous: ProgressActionState, form: FormData) { const i = input(form); return finish(i.tripId, await restoreItineraryItemToPending(i)); }
export async function previewSkipAction(_previous: ProgressActionState, form: FormData): Promise<ProgressActionState> {
  const result = await previewSkipItineraryItem(input(form));
  return result.ok ? { error: null, preview: result.data } : { error: result.error.message, preview: null };
}
export async function confirmSkipAction(_previous: ProgressActionState, form: FormData) {
  const i = input(form); return finish(i.tripId, await skipItineraryItem({ ...i, bookingAcknowledged: form.get("bookingAcknowledged") === "on" }));
}
