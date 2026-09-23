"use server";
import { revalidatePath } from "next/cache";
import { parseLocalTime } from "@/src/modules/itinerary/domain";
import { createActivityReservation, linkReservationEvidence, markReservationBooked, setReservationWorkflowState, updateReservationDesiredTime } from "./service";
import type { ReservationActionState, ReservationResult } from "./types";
const value = (form: FormData, name: string) => String(form.get(name) ?? "");
const minute = (form: FormData, name: string) => parseLocalTime(value(form, name)) ?? (value(form, name) ? NaN : null);
function finish(tripId: string, result: ReservationResult<{ id: string }>, message: string): ReservationActionState {
  if (!result.ok) return { error: result.error, message: null };
  revalidatePath("/trips/" + tripId + "/itinerary");
  return { error: null, message };
}
export async function createReservationAction(_previous: ReservationActionState, form: FormData) {
  const tripId = value(form, "tripId");
  return finish(tripId, await createActivityReservation({ tripId, itineraryItemId: value(form, "itemId"), state: value(form, "state"),
    desiredDate: value(form, "desiredDate") || null, desiredStartMinute: minute(form, "desiredTime"), bookingSourceLabel: value(form, "bookingSourceLabel"), bookingUrl: value(form, "bookingUrl"), notes: value(form, "notes") }), "Reservation tracking added.");
}
export async function workflowStateAction(_previous: ReservationActionState, form: FormData) {
  const tripId = value(form, "tripId");
  return finish(tripId, await setReservationWorkflowState({ tripId, reservationId: value(form, "reservationId"), state: value(form, "state") }), "Reservation state saved.");
}
export async function desiredTimeAction(_previous: ReservationActionState, form: FormData) {
  const tripId = value(form, "tripId");
  return finish(tripId, await updateReservationDesiredTime({ tripId, reservationId: value(form, "reservationId"), desiredDate: value(form, "desiredDate") || null, desiredStartMinute: minute(form, "desiredTime") }), "Desired reservation time saved. Itinerary time is unchanged.");
}
export async function markBookedAction(_previous: ReservationActionState, form: FormData) {
  const tripId = value(form, "tripId");
  return finish(tripId, await markReservationBooked({ tripId, reservationId: value(form, "reservationId"), confirmedDate: value(form, "confirmedDate") || null,
    confirmedStartMinute: minute(form, "confirmedTime"), confirmationReference: value(form, "confirmationReference"), notes: value(form, "notes") }), "Marked booked. Desired and itinerary times are unchanged.");
}
export async function linkEvidenceAction(_previous: ReservationActionState, form: FormData) {
  const tripId = value(form, "tripId");
  return finish(tripId, await linkReservationEvidence({ tripId, reservationId: value(form, "reservationId"), evidenceRecordId: value(form, "evidenceRecordId") }), "Evidence linked. Reservation state is unchanged.");
}
