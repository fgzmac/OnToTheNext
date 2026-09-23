import { getPrismaClient } from "@/src/lib/prisma";
import { PROTOTYPE_OWNER_ID } from "@/src/modules/identity/prototype-owner";
import type { Prisma } from "@/src/generated/prisma/client";
import { formatDateOnly } from "@/src/modules/trips/date-only";
import { AVAILABILITY_TOPICS } from "./domain";
import { hasConflictingEvidence, nextExactRelease, releaseWarnings, type ReleaseDTO } from "./release";
import { bookingAttention, orderReservations } from "./attention";
import type { ActivityReservationContext, EvidenceDTO, ReservationDTO, ReservationResult } from "./types";
const evidenceInclude = { source: true, releaseObservation: true } as const;
function evidenceDTO(e: Prisma.EvidenceRecordGetPayload<{ include: typeof evidenceInclude }>, now: Date): EvidenceDTO {
  const r = e.releaseObservation;
  const release: ReleaseDTO | null = r ? { availability: r.availability, precision: r.precision, releaseDate: r.releaseDate ? formatDateOnly(r.releaseDate) : null,
    releaseAt: r.releaseAt?.toISOString() ?? null, sourceTimeZone: r.sourceTimeZone, windowStartDate: r.windowStartDate ? formatDateOnly(r.windowStartDate) : null,
    windowEndDate: r.windowEndDate ? formatDateOnly(r.windowEndDate) : null, windowDescription: r.windowDescription, observedAt: r.observedAt.toISOString(),
    recheckAfter: r.recheckAfter?.toISOString() ?? null, attribution: r.attribution, sourceUrl: r.sourceUrl, recordedByUser: r.recordedByUser } : null;
  return { id: e.id, topic: e.topic, factualText: e.factualText, retrievedAt: e.retrievedAt.toISOString(), status: e.status, sourceName: e.source.name, sourceKind: e.source.kind, release, warnings: releaseWarnings(release, now) };
}
async function workspace(tripId: string, now: Date): Promise<ReservationResult<{ reservations: ReservationDTO[]; items: ActivityReservationContext[] }>> {
  try { return await getPrismaClient().$transaction(async tx => {
    const trip = await tx.trip.findFirst({ where: { id: tripId, ownerId: PROTOTYPE_OWNER_ID }, include: {
      itineraryItems: { include: { day: true, sourceRecommendation: { include: { place: { include: { evidence: { where: { topic: { in: AVAILABILITY_TOPICS } }, include: evidenceInclude, orderBy: [{ retrievedAt: "asc" }, { id: "asc" }] } } } } } } },
      reservations: { include: { evidenceLinks: { include: { evidenceRecord: { include: evidenceInclude } }, orderBy: [{ createdAt: "asc" }, { evidenceRecordId: "asc" }] } } },
    } });
    if (!trip) return { ok: false as const, error: { code: "NOT_FOUND", message: "This trip is unavailable." } };
    const peers = trip.itineraryItems.map(i => ({ id: i.id, title: i.title, dayId: i.dayId, date: formatDateOnly(i.day.date), segmentId: i.day.primarySegmentId, startMinute: i.startMinute, durationMinutes: i.durationMinutes }));
    const reservations = orderReservations(trip.reservations.map(r => {
      const item = trip.itineraryItems.find(i => i.id === r.itineraryItemId), evidence = r.evidenceLinks.map(link => evidenceDTO(link.evidenceRecord, now));
      const releases = evidence.flatMap(e => e.release ? [e.release] : []);
      const attention = bookingAttention({ ...r, confirmedDate: r.confirmedDate ? formatDateOnly(r.confirmedDate) : null }, peers.find(i => i.id === r.itineraryItemId) ?? null, peers, { startDate: formatDateOnly(trip.startDate), endDate: formatDateOnly(trip.endDate) });
      if (r.state !== "CANCELLED") {
        attention.push(...evidence.flatMap(e => e.warnings));
        if (hasConflictingEvidence(releases)) attention.push("Conflicting evidence: compare the recorded sources; no availability or workflow change was inferred.");
      }
      return { id: r.id, title: r.title, type: r.type, itineraryItemId: r.itineraryItemId, state: r.state,
        desiredDate: r.desiredDate ? formatDateOnly(r.desiredDate) : null, desiredStartMinute: r.desiredStartMinute,
        confirmedDate: r.confirmedDate ? formatDateOnly(r.confirmedDate) : null, confirmedStartMinute: r.confirmedStartMinute,
        bookingSourceLabel: r.bookingSourceLabel, bookingUrl: r.bookingUrl, confirmationReference: r.confirmationReference, notes: r.notes,
        cancelledAt: r.cancelledAt?.toISOString() ?? null, cancellationNote: r.cancellationNote, evidence, attention: [...new Set(attention)],
        nextRelease: r.state === "CANCELLED" ? null : nextExactRelease(releases, now), sourceAvailable: r.type === "ACTIVITY" && Boolean(item?.sourceRecommendation?.placeId) };
    }));
    const items: ActivityReservationContext[] = trip.itineraryItems.flatMap(i => i.type !== "ACTIVITY" && i.type !== "TRANSPORTATION" ? [] : [{ itemId: i.id, itemType: i.type,
      reservation: reservations.find(r => r.itineraryItemId === i.id) ?? null, sourceAvailable: i.type === "ACTIVITY" && Boolean(i.sourceRecommendation?.placeId),
      availableEvidence: i.type === "ACTIVITY" ? (i.sourceRecommendation?.place.evidence ?? []).map(e => evidenceDTO(e, now)) : [] }]);
    return { ok: true as const, data: { reservations, items } };
  }, { isolationLevel: "RepeatableRead" }); } catch { return { ok: false, error: { code: "PERSISTENCE_FAILURE", message: "Reservation context could not be loaded. Please refresh." } }; }
}
export async function getItineraryReservationContext(tripId: string, now = new Date()): Promise<ReservationResult<ActivityReservationContext[]>> {
  const result = await workspace(tripId, now); return result.ok ? { ok: true, data: result.data.items } : result;
}
export async function getTripReservations(tripId: string, now = new Date()): Promise<ReservationResult<ReservationDTO[]>> {
  const result = await workspace(tripId, now); return result.ok ? { ok: true, data: result.data.reservations } : result;
}
