"use server";
import { revalidatePath } from "next/cache";
import { parseLocalTime } from "./domain";
import { createManualActivity, editItineraryItem, confirmItineraryEdit } from "./details-service";
export type DetailsFields = { title: string; time: string; duration: string; flexibility: string; notes: string; locationLabel?: string; referenceUrl?: string };
function details(fields: DetailsFields) {
  const minute = parseLocalTime(fields.time);
  return { title: fields.title, startMinute: minute === undefined ? NaN : minute,
    durationMinutes: fields.duration.trim() === "" ? null : Number(fields.duration), flexibility: fields.flexibility, notes: fields.notes,
    ...(fields.locationLabel === undefined ? {} : { locationLabel: fields.locationLabel }), ...(fields.referenceUrl === undefined ? {} : { referenceUrl: fields.referenceUrl }) };
}
function refresh(tripId: string) { revalidatePath("/trips/" + tripId); revalidatePath("/trips/" + tripId + "/itinerary"); }
export async function manualActivityAction(input: { tripId: string; dayId: string; token: string; fields: DetailsFields }) {
  const result = await createManualActivity({ ...input, details: details(input.fields) });
  if (result.ok) refresh(input.tripId);
  return result;
}
export async function itemDetailsAction(input: { tripId: string; itemId: string; token: string; fields: DetailsFields; confirm: boolean }) {
  const result = await (input.confirm ? confirmItineraryEdit : editItineraryItem)({ ...input, details: details(input.fields) });
  if (result.ok && !result.data.preview) refresh(input.tripId);
  return result;
}
