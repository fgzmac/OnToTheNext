import { getPrismaClient } from "@/src/lib/prisma";
import { lockPrototypeTrip } from "@/src/lib/trip-lock";
import { fingerprint, readActionPreview, signActionPreview } from "@/src/modules/itinerary/preview-token";
import { toUtcDate } from "@/src/modules/trips/date-only";
import { optionalText } from "./domain";
import { mutateReservation } from "./service";
import { validateRelease, type ReleaseInput } from "./release";
import type { CancellationPreview, ReservationResult } from "./types";
const failure = (code: string, message: string) => ({ ok: false as const, error: { code, message } });
type Identity = { tripId: string; reservationId: string };
type CancellationToken = Identity & { purpose: "reservation-cancellation"; fingerprint: string };
export async function previewReservationCancellation(input: Identity, now = new Date()): Promise<ReservationResult<CancellationPreview>> {
  try { return await getPrismaClient().$transaction(async tx => {
    if (!await lockPrototypeTrip(tx, input.tripId)) return failure("NOT_FOUND", "This trip is unavailable.");
    const r = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId } });
    if (!r) return failure("NOT_FOUND", "This reservation is unavailable.");
    if (r.state === "CANCELLED") return failure("ALREADY_CANCELLED", "Cancellation is already recorded; its original details were preserved.");
    return { ok: true as const, data: { title: r.title, state: r.state, requiresAcknowledgement: r.state === "BOOKED",
      token: signActionPreview<CancellationToken>({ ...input, purpose: "reservation-cancellation", fingerprint: fingerprint(r) }, now.getTime()) } };
  }); } catch { return failure("PERSISTENCE_FAILURE", "Cancellation preview could not be loaded."); }
}
export async function recordReservationCancellation(input: Identity & { token: string; externalCancellationConfirmed?: boolean; cancellationNote?: unknown }, now = new Date()) {
  const token = readActionPreview<CancellationToken>(input.token, now.getTime()), note = optionalText(input.cancellationNote, 2000);
  if (!token || token.purpose !== "reservation-cancellation" || token.tripId !== input.tripId || token.reservationId !== input.reservationId || note === undefined) return failure("STALE_PREVIEW", "Preview the current reservation again before recording cancellation.");
  return mutateReservation(input.tripId, async tx => {
    const r = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId } });
    if (!r) return failure("NOT_FOUND", "This reservation is unavailable.");
    if (r.state === "CANCELLED") return failure("ALREADY_CANCELLED", "Cancellation is already recorded; its original details were preserved.");
    if (fingerprint(r) !== token.fingerprint) return failure("STALE_PREVIEW", "The reservation changed. Preview it again before recording cancellation.");
    if (r.state === "BOOKED" && input.externalCancellationConfirmed !== true) return failure("ACKNOWLEDGEMENT_REQUIRED", "Confirm that cancellation has already been completed or confirmed with the provider.");
    await tx.reservation.update({ where: { id: r.id }, data: { revision: { increment: 1 }, state: "CANCELLED", cancelledAt: now, cancellationNote: note } });
    return { ok: true, data: { id: r.id } };
  });
}
export async function updateReservationNotes(input: Identity & { notes: unknown }) {
  const notes = optionalText(input.notes, 2000);
  if (notes === undefined) return failure("INVALID_INPUT", "Keep reservation notes to 2,000 characters or fewer.");
  return mutateReservation(input.tripId, async tx => {
    const r = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId } });
    if (!r) return failure("NOT_FOUND", "This reservation is unavailable.");
    await tx.reservation.update({ where: { id: r.id }, data: { notes, revision: { increment: 1 } } });
    return { ok: true, data: { id: r.id } };
  });
}
export async function recordReleaseEvidence(input: Identity & ReleaseInput & { sourceName: unknown; factualText: unknown }, now = new Date()) {
  const release = validateRelease(input, now), sourceName = optionalText(input.sourceName, 200), factualText = optionalText(input.factualText, 2000);
  if (!release || !sourceName || !factualText) return failure("INVALID_EVIDENCE", "Check the source and observation, dates, explicit UTC offsets and window order. Observation time cannot be in the future. Supply only fields matching the selected precision.");
  return mutateReservation(input.tripId, async tx => {
    const r = await tx.reservation.findFirst({ where: { id: input.reservationId, tripId: input.tripId }, include: { itineraryItem: { include: { sourceRecommendation: true } } } });
    const placeId = r?.itineraryItem?.sourceRecommendation?.placeId;
    if (!r || !placeId || r.type !== "ACTIVITY") return failure("SOURCE_UNAVAILABLE", "No eligible source Place is available. Existing evidence and reservation details remain saved.");
    // A new Source/Evidence observation avoids rewriting any shared historical row.
    const source = await tx.source.create({ data: { name: sourceName, kind: release.attribution } });
    const evidence = await tx.evidenceRecord.create({ data: { placeId, sourceId: source.id, topic: "Inventory release", factualText,
      retrievedAt: new Date(release.observedAt), status: release.attribution === "DEVELOPMENT_FIXTURE" ? "FIXTURE" : "USER_RECORDED",
      releaseObservation: { create: { ...release,
        releaseDate: release.releaseDate ? toUtcDate(release.releaseDate) : null, releaseAt: release.releaseAt ? new Date(release.releaseAt) : null,
        windowStartDate: release.windowStartDate ? toUtcDate(release.windowStartDate) : null, windowEndDate: release.windowEndDate ? toUtcDate(release.windowEndDate) : null,
        observedAt: new Date(release.observedAt), recheckAfter: release.recheckAfter ? new Date(release.recheckAfter) : null,
      } } } });
    await tx.reservationEvidence.create({ data: { reservationId: r.id, evidenceRecordId: evidence.id } });
    return { ok: true, data: { id: r.id } };
  });
}
