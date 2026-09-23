import { getPrismaClient } from "@/src/lib/prisma";
import { lockPrototypeTrip } from "@/src/lib/trip-lock";
import { toUtcDate } from "@/src/modules/trips/date-only";
import type { Prisma } from "@/src/generated/prisma/client";
import { AVAILABILITY_TOPICS, canSetPlanningState, isPlanningState, optionalText, safeBookingUrl, validDate, validMinute } from "./domain";
import type { ReservationResult } from "./types";
const failure = (code: string, message: string) => ({ ok: false as const, error: { code, message } });
const invalid = () => failure("INVALID_INPUT", "Check the reservation dates, times, state and field lengths. Booking URLs must use HTTP or HTTPS without credentials.");
type Identity = { tripId: string; reservationId: string };
type TimeInput = { desiredDate?: unknown; desiredStartMinute?: unknown };
export async function mutateReservation(tripId: string, operation: (tx: Prisma.TransactionClient) => Promise<ReservationResult<{ id: string }>>): Promise<ReservationResult<{ id: string }>> {
  try { return await getPrismaClient().$transaction(async tx => {
    if (!await lockPrototypeTrip(tx, tripId)) return failure("NOT_FOUND", "This trip is unavailable.");
    return operation(tx);
  }); } catch { return failure("PERSISTENCE_FAILURE", "The reservation could not be saved. Please try again."); }
}
export type CreateReservationInput = TimeInput & { tripId: string; itineraryItemId: string; state: unknown; bookingSourceLabel?: unknown; bookingUrl?: unknown; notes?: unknown };
export async function createActivityReservation(input: CreateReservationInput) { return createAttachedReservation(input, "ACTIVITY"); }
export async function createTransportationReservation(input: CreateReservationInput) { return createAttachedReservation(input, "TRANSPORTATION"); }
async function createAttachedReservation(input: CreateReservationInput, type: "ACTIVITY" | "TRANSPORTATION") {
  const date = input.desiredDate ?? null, minute = input.desiredStartMinute ?? null;
  const source = optionalText(input.bookingSourceLabel, 200), notes = optionalText(input.notes, 2000), url = safeBookingUrl(input.bookingUrl);
  const state = input.state;
  if (!isPlanningState(state) || !validDate(date) || !validMinute(minute) || source === undefined || notes === undefined || url === undefined) return invalid();
  return mutateReservation(input.tripId, async tx => {
    const item = await tx.itineraryItem.findFirst({ where: { id: input.itineraryItemId, tripId: input.tripId }, include: { reservation: true } });
    if (!item) return failure("NOT_FOUND", "Choose an itinerary item in this trip.");
    if (item.type !== type) return failure(type === "ACTIVITY" ? "NOT_ACTIVITY" : "NOT_TRANSPORTATION", "Choose the matching itinerary item type for this reservation.");
    if (item.reservation) return failure("ALREADY_EXISTS", "This item already has reservation tracking.");
    const reservation = await tx.reservation.create({ data: { tripId: input.tripId, itineraryItemId: item.id, type, title: item.title, state,
      desiredDate: date ? toUtcDate(date) : null, desiredStartMinute: minute, bookingSourceLabel: source, bookingUrl: url, notes } });
    return { ok: true, data: { id: reservation.id } };
  });
}
export async function setReservationWorkflowState(input: Identity & { state: unknown; notes?: unknown }) {
  const next = input.state;
  const notes = optionalText(input.notes, 2000);
  if (notes === undefined) return invalid();
  if (!isPlanningState(next)) return invalid();
  return mutateReservation(input.tripId, async tx => {
    const reservation = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId } });
    if (!reservation) return failure("NOT_FOUND", "This reservation is unavailable.");
    if (!canSetPlanningState(reservation.state, next)) return failure("LOCKED_STATE", "This reservation cannot be changed through planning states.");
    await tx.reservation.update({ where: { id: reservation.id }, data: { revision: { increment: 1 }, state: next, ...(input.notes === undefined ? {} : { notes }) } });
    return { ok: true, data: { id: reservation.id } };
  });
}
export async function updateReservationDesiredTime(input: Identity & TimeInput) {
  const date = input.desiredDate ?? null, minute = input.desiredStartMinute ?? null;
  if (!validDate(date) || !validMinute(minute)) return invalid();
  return mutateReservation(input.tripId, async tx => {
    const reservation = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId } });
    if (!reservation) return failure("NOT_FOUND", "This reservation is unavailable.");
    if (!isPlanningState(reservation.state)) return failure("LOCKED_STATE", "Desired time editing is available before booking.");
    await tx.reservation.update({ where: { id: reservation.id }, data: { revision: { increment: 1 }, desiredDate: date ? toUtcDate(date) : null, desiredStartMinute: minute } });
    return { ok: true, data: { id: reservation.id } };
  });
}
export async function markReservationBooked(input: Identity & { confirmedDate?: unknown; confirmedStartMinute?: unknown; confirmationReference?: unknown; notes?: unknown }) {
  const date = input.confirmedDate ?? null, minute = input.confirmedStartMinute ?? null;
  const reference = optionalText(input.confirmationReference, 120), notes = optionalText(input.notes, 2000);
  if (!validDate(date) || !validMinute(minute) || reference === undefined || notes === undefined) return invalid();
  return mutateReservation(input.tripId, async tx => {
    const reservation = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId } });
    if (!reservation) return failure("NOT_FOUND", "This reservation is unavailable.");
    if (!isPlanningState(reservation.state)) return failure("LOCKED_STATE", "This reservation is already booked or cannot be booked here. Its confirmation was preserved.");
    await tx.reservation.update({ where: { id: reservation.id }, data: { revision: { increment: 1 }, state: "BOOKED", confirmedDate: date ? toUtcDate(date) : null,
      confirmedStartMinute: minute, confirmationReference: reference, ...(input.notes === undefined ? {} : { notes }) } });
    return { ok: true, data: { id: reservation.id } };
  });
}
export async function linkReservationEvidence(input: Identity & { evidenceRecordId: string }) {
  return mutateReservation(input.tripId, async tx => {
    const reservation = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId }, include: { itineraryItem: { include: { sourceRecommendation: true } } } });
    const placeId = reservation?.itineraryItem?.sourceRecommendation?.placeId;
    if (!reservation || !placeId) return failure("NOT_FOUND", "This reservation has no available source Place.");
    const evidence = await tx.evidenceRecord.findFirst({ where: { id: input.evidenceRecordId, placeId, topic: { in: AVAILABILITY_TOPICS } } });
    if (!evidence) return failure("WRONG_EVIDENCE", "Choose availability evidence for this Activity’s Place.");
    await tx.reservationEvidence.upsert({ where: { reservationId_evidenceRecordId: { reservationId: reservation.id, evidenceRecordId: evidence.id } }, update: {}, create: { reservationId: reservation.id, evidenceRecordId: evidence.id } });
    return { ok: true, data: { id: reservation.id } };
  });
}
export { getItineraryReservationContext, getTripReservations } from "./read-service";
