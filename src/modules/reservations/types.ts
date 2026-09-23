import type { ReservationState, ReservationType } from "@/src/generated/prisma/enums";
import type { ReleaseDTO } from "./release";
export type ReservationResult<T> = { ok: true; data: T } | { ok: false; error: { code: string; message: string } };
export type ReservationActionState = { error: { code: string; message: string } | null; message: string | null };
export type EvidenceDTO = { id: string; topic: string; factualText: string; retrievedAt: string; status: string; sourceName: string; sourceKind: string; release: ReleaseDTO | null; warnings: string[] };
export type ReservationDTO = {
  id: string; title: string; type: ReservationType; itineraryItemId: string | null; state: ReservationState;
  desiredDate: string | null; desiredStartMinute: number | null; confirmedDate: string | null; confirmedStartMinute: number | null;
  bookingSourceLabel: string | null; bookingUrl: string | null; confirmationReference: string | null; notes: string | null;
  cancelledAt: string | null; cancellationNote: string | null; evidence: EvidenceDTO[]; attention: string[];
  nextRelease: number | null; sourceAvailable: boolean;
};
export type ActivityReservationContext = { itemId: string; itemType: "ACTIVITY" | "TRANSPORTATION"; reservation: ReservationDTO | null; availableEvidence: EvidenceDTO[]; sourceAvailable: boolean };
export type CancellationPreview = { token: string; title: string; state: ReservationState; requiresAcknowledgement: boolean };
export type CancellationActionState = ReservationActionState & { preview: CancellationPreview | null };
