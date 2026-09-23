"use server";
import { revalidatePath } from "next/cache";
import { parseLocalTime } from "@/src/modules/itinerary/domain";
import { createActivityReservation, createTransportationReservation, linkReservationEvidence, markReservationBooked, setReservationWorkflowState, updateReservationDesiredTime } from "./service";
import type { CancellationActionState, ReservationActionState, ReservationResult } from "./types";
import { previewReservationCancellation, recordReservationCancellation, recordReleaseEvidence, updateReservationNotes } from "./followup-service";
const value = (form: FormData, name: string) => String(form.get(name) ?? "");
const minute = (form: FormData, name: string) => parseLocalTime(value(form, name)) ?? (value(form, name) ? NaN : null);
function finish(tripId: string, result: ReservationResult<{ id: string }>, message: string): ReservationActionState {
  if (!result.ok) return { error: result.error, message: null };
  revalidatePath("/trips/" + tripId + "/itinerary");
  revalidatePath("/trips/" + tripId + "/reservations");
  return { error: null, message };
}
export async function createReservationAction(_previous: ReservationActionState, form: FormData) {
  const tripId = value(form, "tripId");
  return finish(tripId, await createActivityReservation({ tripId, itineraryItemId: value(form, "itemId"), state: value(form, "state"),
    desiredDate: value(form, "desiredDate") || null, desiredStartMinute: minute(form, "desiredTime"), bookingSourceLabel: value(form, "bookingSourceLabel"), bookingUrl: value(form, "bookingUrl"), notes: value(form, "notes") }), "Reservation tracking added.");
}
export async function workflowStateAction(_previous: ReservationActionState, form: FormData) {
  const tripId = value(form, "tripId");
  return finish(tripId, await setReservationWorkflowState({ tripId, reservationId: value(form, "reservationId"), state: value(form, "state"), ...(form.has("notes") ? { notes: value(form, "notes") } : {}) }), "Reservation state saved.");
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

export async function createTransportationAction(_previous: ReservationActionState, form: FormData) {
  const tripId = value(form, "tripId");
  return finish(tripId, await createTransportationReservation({ tripId, itineraryItemId: value(form, "itemId"), state: value(form, "state"),
    desiredDate: value(form, "desiredDate") || null, desiredStartMinute: minute(form, "desiredTime"), bookingSourceLabel: value(form, "bookingSourceLabel"), bookingUrl: value(form, "bookingUrl"), notes: value(form, "notes") }), "Departure reservation tracking added.");
}
export async function notesAction(_previous: ReservationActionState, form: FormData) {
  const tripId = value(form, "tripId");
  return finish(tripId, await updateReservationNotes({ tripId, reservationId: value(form, "reservationId"), notes: value(form, "notes") }), "Reservation notes saved.");
}
export async function previewCancellationAction(_previous: CancellationActionState, form: FormData): Promise<CancellationActionState> {
  const result = await previewReservationCancellation({ tripId: value(form, "tripId"), reservationId: value(form, "reservationId") });
  return result.ok ? { error: null, message: null, preview: result.data } : { error: result.error, message: null, preview: null };
}
export async function recordCancellationAction(_previous: ReservationActionState, form: FormData) {
  const tripId = value(form, "tripId");
  return finish(tripId, await recordReservationCancellation({ tripId, reservationId: value(form, "reservationId"), token: value(form, "token"), externalCancellationConfirmed: form.get("acknowledgement") === "on", cancellationNote: value(form, "cancellationNote") }), "Cancellation recorded locally. The provider was not contacted.");
}
export async function recordReleaseAction(_previous: ReservationActionState, form: FormData) {
  const tripId = value(form, "tripId");
  return finish(tripId, await recordReleaseEvidence({ tripId, reservationId: value(form, "reservationId"),
    sourceName: value(form, "sourceName"), sourceUrl: value(form, "sourceUrl"), attribution: value(form, "attribution"), factualText: value(form, "factualText"),
    availability: value(form, "availability"), precision: value(form, "precision"), releaseDate: value(form, "releaseDate"), releaseAt: value(form, "releaseAt"),
    windowStartDate: value(form, "windowStartDate"), windowEndDate: value(form, "windowEndDate"), windowDescription: value(form, "windowDescription"),
    observedAt: value(form, "observedAt"), recheckAfter: value(form, "recheckAfter"),
  }), "Observation added. Existing evidence and reservation state are unchanged.");
}
