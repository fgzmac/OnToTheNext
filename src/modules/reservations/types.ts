import type { ReservationState } from "@/src/generated/prisma/enums";
export type ReservationResult<T> = { ok: true; data: T } | { ok: false; error: { code: string; message: string } };
export type ReservationActionState = { error: { code: string; message: string } | null; message: string | null };
export type EvidenceDTO = { id: string; topic: string; factualText: string; retrievedAt: string; status: string; sourceName: string; sourceKind: string };
export type ReservationDTO = {
  id: string; state: ReservationState; desiredDate: string | null; desiredStartMinute: number | null;
  confirmedDate: string | null; confirmedStartMinute: number | null; bookingSourceLabel: string | null;
  bookingUrl: string | null; confirmationReference: string | null; notes: string | null; evidence: EvidenceDTO[];
};
export type ActivityReservationContext = { itemId: string; reservation: ReservationDTO | null; availableEvidence: EvidenceDTO[] };
