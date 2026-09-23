import { deriveTimeIssues } from "@/src/modules/itinerary/planning";
import type { ReservationDTO } from "./types";
export type PlannedContext = { id: string; title: string; dayId: string; date: string; segmentId: string | null; startMinute: number | null; durationMinutes: number | null };
export function bookingAttention(r: Pick<ReservationDTO, "state" | "confirmedDate" | "confirmedStartMinute" | "notes">, item: PlannedContext | null, peers: PlannedContext[], trip: { startDate: string; endDate: string }): string[] {
  if (r.state === "CANCELLED") return [];
  const reasons = r.state === "NEEDS_ATTENTION" ? [r.notes ? "Needs attention: " + r.notes : "Needs attention: review this reservation."] : [];
  if (r.state !== "BOOKED") return reasons;
  if (!item) reasons.push("Booked reservation is not attached to an itinerary item.");
  if (r.confirmedDate && (r.confirmedDate < trip.startDate || r.confirmedDate > trip.endDate)) reasons.push("Confirmed date is outside the current Trip.");
  if (item && r.confirmedDate && r.confirmedDate !== item.date) reasons.push("Confirmed date differs from the scheduled Day.");
  if (item && r.confirmedStartMinute !== null && item.startMinute !== null && r.confirmedStartMinute !== item.startMinute) reasons.push("Confirmed time differs from the known itinerary time.");
  if (item && item.segmentId && r.confirmedDate === item.date && r.confirmedStartMinute !== null && item.durationMinutes !== null) {
    const intervals = [{ ...item, startMinute: r.confirmedStartMinute }, ...peers.filter(p => p.id !== item.id && p.dayId === item.dayId && p.segmentId === item.segmentId)];
    for (const issue of deriveTimeIssues(intervals).filter(issue => issue.itemIds.includes(item.id))) reasons.push("Confirmed start with planned duration (not provider-confirmed): " + issue.message);
  }
  return reasons;
}
export function orderReservations(records: ReservationDTO[]): ReservationDTO[] {
  return [...records].sort((a, b) => Number(a.state === "CANCELLED") - Number(b.state === "CANCELLED") || Number(b.attention.length > 0) - Number(a.attention.length > 0) || (a.nextRelease ?? Infinity) - (b.nextRelease ?? Infinity) || a.title.localeCompare(b.title, "en") || a.id.localeCompare(b.id, "en"));
}
