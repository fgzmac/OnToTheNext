"use server";
import { revalidatePath } from "next/cache";
import { parseLocalTime } from "./domain";
import { createPlanningBlock, previewMoveItineraryItem, reorderItineraryItem, confirmMoveItineraryItem } from "./builder-service";
import type { ItineraryActionState, MovementActionState, MoveDirection } from "./types";
const text = (form: FormData, key: string) => String(form.get(key) ?? "");
export async function createPlanningBlockAction(_previous: ItineraryActionState, form: FormData): Promise<ItineraryActionState> {
  const tripId = text(form, "tripId");
  const time = parseLocalTime(text(form, "time"));
  const duration = text(form, "duration");
  const result = await createPlanningBlock({ tripId, dayId: text(form, "dayId"), type: text(form, "type"),
    startMinute: time === undefined ? NaN : time, durationMinutes: duration.trim() === "" ? null : Number(duration),
    flexibility: text(form, "flexibility"), notes: text(form, "notes"), transportationMode: text(form, "mode"),
    originSegmentId: text(form, "originSegmentId"), destinationSegmentId: text(form, "destinationSegmentId"),
  });
  if (!result.ok) return { error: result.error, message: null };
  revalidatePath("/trips/" + tripId + "/itinerary");
  return { error: null, message: "Planning block added." };
}
export async function movementAction(_previous: MovementActionState, form: FormData): Promise<MovementActionState> {
  const empty = { error: null, message: null, preview: null };
  const intent = text(form, "intent");
  if (intent === "CANCEL") return { ...empty, message: "Preview cancelled. Your itinerary is unchanged." };
  const tripId = text(form, "tripId");
  const itemId = text(form, "itemId");
  if (intent === "PREVIEW") {
    const result = await previewMoveItineraryItem({ tripId, itemId, targetDayId: text(form, "targetDayId") });
    return result.ok ? { ...empty, preview: result.data } : { ...empty, error: result.error };
  }
  if (intent === "EARLIER" || intent === "LATER") {
    const result = await reorderItineraryItem({ tripId, itemId, direction: intent as MoveDirection });
    if (!result.ok) return { ...empty, error: result.error };
    if (result.data.preview) return { ...empty, preview: result.data.preview };
  } else if (intent === "CONFIRM") {
    const result = await confirmMoveItineraryItem(tripId, text(form, "token"));
    if (!result.ok) return { ...empty, error: result.error };
  } else return { ...empty, error: { code: "INVALID_BLOCK", message: "Choose a movement action." } };
  revalidatePath("/trips/" + tripId + "/itinerary");
  return { ...empty, message: "Item moved. Its planning time and flexibility are unchanged." };
}
