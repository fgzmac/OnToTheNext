import { getPrismaClient } from "@/src/lib/prisma";
import { lockPrototypeTrip } from "@/src/lib/trip-lock";
import { PROTOTYPE_OWNER_ID } from "@/src/modules/identity/prototype-owner";
import { formatDateOnly, toUtcDate } from "@/src/modules/trips/date-only";
import type { Prisma } from "@/src/generated/prisma/client";
import { AVAILABILITY_TOPICS, canSetPlanningState, isPlanningState, optionalText, safeBookingUrl, validDate, validMinute } from "./domain";
import type { ActivityReservationContext, EvidenceDTO, ReservationResult } from "./types";
const failure = (code: string, message: string) => ({ ok: false as const, error: { code, message } });
const invalid = () => failure("INVALID_INPUT", "Check the reservation dates, times, state and field lengths. Booking URLs must use HTTP or HTTPS without credentials.");
type Identity = { tripId: string; reservationId: string };
type TimeInput = { desiredDate?: unknown; desiredStartMinute?: unknown };
async function mutate(tripId: string, operation: (tx: Prisma.TransactionClient) => Promise<ReservationResult<{ id: string }>>): Promise<ReservationResult<{ id: string }>> {
  try { return await getPrismaClient().$transaction(async tx => {
    if (!await lockPrototypeTrip(tx, tripId)) return failure("NOT_FOUND", "This trip is unavailable.");
    return operation(tx);
  }); } catch { return failure("PERSISTENCE_FAILURE", "The reservation could not be saved. Please try again."); }
}
export async function createActivityReservation(input: TimeInput & { tripId: string; itineraryItemId: string; state: unknown; bookingSourceLabel?: unknown; bookingUrl?: unknown; notes?: unknown }) {
  const date = input.desiredDate ?? null, minute = input.desiredStartMinute ?? null;
  const source = optionalText(input.bookingSourceLabel, 200), notes = optionalText(input.notes, 2000), url = safeBookingUrl(input.bookingUrl);
  const state = input.state;
  if (!isPlanningState(state) || !validDate(date) || !validMinute(minute) || source === undefined || notes === undefined || url === undefined) return invalid();
  return mutate(input.tripId, async tx => {
    const item = await tx.itineraryItem.findFirst({ where: { id: input.itineraryItemId, tripId: input.tripId }, include: { reservation: true } });
    if (!item) return failure("NOT_FOUND", "Choose an Activity in this trip.");
    if (item.type !== "ACTIVITY") return failure("NOT_ACTIVITY", "Reservation tracking is available for Activities only.");
    if (item.reservation) return failure("ALREADY_EXISTS", "This Activity already has reservation tracking.");
    const reservation = await tx.reservation.create({ data: { tripId: input.tripId, itineraryItemId: item.id, type: "ACTIVITY", state,
      desiredDate: date ? toUtcDate(date) : null, desiredStartMinute: minute, bookingSourceLabel: source, bookingUrl: url, notes } });
    return { ok: true, data: { id: reservation.id } };
  });
}
export async function setReservationWorkflowState(input: Identity & { state: unknown }) {
  const next = input.state;
  if (!isPlanningState(next)) return invalid();
  return mutate(input.tripId, async tx => {
    const reservation = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId } });
    if (!reservation) return failure("NOT_FOUND", "This reservation is unavailable.");
    if (!canSetPlanningState(reservation.state, next)) return failure("LOCKED_STATE", "This reservation cannot be changed through planning states.");
    await tx.reservation.update({ where: { id: reservation.id }, data: { state: next } });
    return { ok: true, data: { id: reservation.id } };
  });
}
export async function updateReservationDesiredTime(input: Identity & TimeInput) {
  const date = input.desiredDate ?? null, minute = input.desiredStartMinute ?? null;
  if (!validDate(date) || !validMinute(minute)) return invalid();
  return mutate(input.tripId, async tx => {
    const reservation = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId } });
    if (!reservation) return failure("NOT_FOUND", "This reservation is unavailable.");
    if (!isPlanningState(reservation.state)) return failure("LOCKED_STATE", "Desired time editing is available before booking.");
    await tx.reservation.update({ where: { id: reservation.id }, data: { desiredDate: date ? toUtcDate(date) : null, desiredStartMinute: minute } });
    return { ok: true, data: { id: reservation.id } };
  });
}
export async function markReservationBooked(input: Identity & { confirmedDate?: unknown; confirmedStartMinute?: unknown; confirmationReference?: unknown; notes?: unknown }) {
  const date = input.confirmedDate ?? null, minute = input.confirmedStartMinute ?? null;
  const reference = optionalText(input.confirmationReference, 120), notes = optionalText(input.notes, 2000);
  if (!validDate(date) || !validMinute(minute) || reference === undefined || notes === undefined) return invalid();
  return mutate(input.tripId, async tx => {
    const reservation = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId } });
    if (!reservation) return failure("NOT_FOUND", "This reservation is unavailable.");
    if (!isPlanningState(reservation.state)) return failure("LOCKED_STATE", "This reservation is already booked or cannot be booked here. Its confirmation was preserved.");
    await tx.reservation.update({ where: { id: reservation.id }, data: { state: "BOOKED", confirmedDate: date ? toUtcDate(date) : null,
      confirmedStartMinute: minute, confirmationReference: reference, ...(input.notes === undefined ? {} : { notes }) } });
    return { ok: true, data: { id: reservation.id } };
  });
}
export async function linkReservationEvidence(input: Identity & { evidenceRecordId: string }) {
  return mutate(input.tripId, async tx => {
    const reservation = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId }, include: { itineraryItem: { include: { sourceRecommendation: true } } } });
    const placeId = reservation?.itineraryItem?.sourceRecommendation?.placeId;
    if (!reservation || !placeId) return failure("NOT_FOUND", "This reservation has no available source Place.");
    const evidence = await tx.evidenceRecord.findFirst({ where: { id: input.evidenceRecordId, placeId, topic: { in: AVAILABILITY_TOPICS } } });
    if (!evidence) return failure("WRONG_EVIDENCE", "Choose availability evidence for this Activity’s Place.");
    await tx.reservationEvidence.upsert({ where: { reservationId_evidenceRecordId: { reservationId: reservation.id, evidenceRecordId: evidence.id } }, update: {}, create: { reservationId: reservation.id, evidenceRecordId: evidence.id } });
    return { ok: true, data: { id: reservation.id } };
  });
}
export async function getItineraryReservationContext(tripId: string): Promise<ReservationResult<ActivityReservationContext[]>> {
  try { return await getPrismaClient().$transaction(async tx => {
    if (!await tx.trip.findFirst({ where: { id: tripId, ownerId: PROTOTYPE_OWNER_ID } })) return failure("NOT_FOUND", "This trip is unavailable.");
    const items = await tx.itineraryItem.findMany({ where: { tripId, type: "ACTIVITY" }, include: {
      reservation: { include: { evidenceLinks: { include: { evidenceRecord: { include: { source: true } } } } } },
      sourceRecommendation: { include: { place: { include: { evidence: { where: { topic: { in: AVAILABILITY_TOPICS } }, include: { source: true }, orderBy: { topic: "asc" } } } } } },
    } });
    const evidenceDTO = (e: Prisma.EvidenceRecordGetPayload<{ include: { source: true } }>): EvidenceDTO => ({ id: e.id, topic: e.topic, factualText: e.factualText, retrievedAt: e.retrievedAt.toISOString(), status: e.status, sourceName: e.source.name, sourceKind: e.source.kind });
    return { ok: true as const, data: items.map(item => {
      const r = item.reservation;
      return { itemId: item.id, availableEvidence: (item.sourceRecommendation?.place.evidence ?? []).map(evidenceDTO), reservation: r ? {
        id: r.id, state: r.state, desiredDate: r.desiredDate ? formatDateOnly(r.desiredDate) : null, desiredStartMinute: r.desiredStartMinute,
        confirmedDate: r.confirmedDate ? formatDateOnly(r.confirmedDate) : null, confirmedStartMinute: r.confirmedStartMinute,
        bookingSourceLabel: r.bookingSourceLabel, bookingUrl: r.bookingUrl, confirmationReference: r.confirmationReference, notes: r.notes,
        evidence: r.evidenceLinks.map(link => evidenceDTO(link.evidenceRecord)),
      } : null };
    }) };
  }, { isolationLevel: "RepeatableRead" }); } catch { return failure("PERSISTENCE_FAILURE", "Reservation context could not be loaded. Please refresh."); }
}
