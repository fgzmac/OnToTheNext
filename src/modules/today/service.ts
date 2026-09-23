import { getTravelPlanning, type TravelDTO } from "@/src/modules/itinerary/travel/service";
import { getPrismaClient } from "@/src/lib/prisma";
import { PROTOTYPE_OWNER_ID } from "@/src/modules/identity/prototype-owner";
import { formatDateOnly } from "@/src/modules/trips/date-only";
import { getTripReservations } from "@/src/modules/reservations/read-service";
import { progressInclude, progressToken } from "@/src/modules/itinerary/progress-context";
import { partitionDay } from "@/src/modules/itinerary/progress";
import type { ProgressResult } from "@/src/modules/itinerary/progress-service";
import type { ItineraryProgress, ItineraryFlexibility, ItineraryItemType } from "@/src/generated/prisma/enums";
import type { ReservationDTO } from "@/src/modules/reservations/types";
export type DayOption = { id: string; date: string; segmentId: string | null; context: string };
export type TodayItem = { travel: TravelDTO | null; travelUnavailable: boolean; id: string; title: string; type: ItineraryItemType; position: number; startMinute: number | null; durationMinutes: number | null; flexibility: ItineraryFlexibility; progress: ItineraryProgress; progressChangedAt: string | null; token: string; reservation: ReservationDTO | null };
export type TodayView = { tripId: string; days: DayOption[]; selected: DayOption | null; invalidDay: boolean; reservationUnavailable: boolean; plan: ReturnType<typeof partitionDay<TodayItem>> };
export async function getTodayView(tripId: string, dayId?: string, now = new Date()): Promise<ProgressResult<TodayView>> {
  try { return await getPrismaClient().$transaction(async tx => {
    const trip = await tx.trip.findFirst({ where: { id: tripId, ownerId: PROTOTYPE_OWNER_ID }, include: { days: { orderBy: { position: "asc" }, include: { primarySegment: true } } } });
    if (!trip) return { ok: false, error: { code: "NOT_FOUND", message: "This trip is unavailable." } };
    const days = trip.days.map(d => ({ id: d.id, date: formatDateOnly(d.date), segmentId: d.primarySegmentId, context: d.primarySegment ? (d.primarySegment.position + 1) + ". " + d.primarySegment.baseName + " · " + formatDateOnly(d.primarySegment.arrivalDate) + " to " + formatDateOnly(d.primarySegment.departureDate) : "Unassigned" }));
    const selected = days.find(d => d.id === dayId) ?? null;
    if (!selected) return { ok: true, data: { tripId, days, selected, invalidDay: Boolean(dayId), reservationUnavailable: false, plan: partitionDay<TodayItem>([]) } };
    const items = await tx.itineraryItem.findMany({ where: { tripId, dayId: selected.id }, orderBy: [{ position: "asc" }, { id: "asc" }], include: progressInclude });
    const reservations = await getTripReservations(tripId, now, tx);
    const travel = await getTravelPlanning(tripId, now, tx);
    const rows: TodayItem[] = items.map(i => ({ travel: travel.ok ? travel.data.find(t => t.itemId === i.id) ?? null : null, travelUnavailable: !travel.ok || !reservations.ok, id: i.id, title: i.title, type: i.type, position: i.position, startMinute: i.startMinute, durationMinutes: i.durationMinutes, flexibility: i.flexibility, progress: i.progress, progressChangedAt: i.progressChangedAt?.toISOString() ?? null, token: progressToken(i, now), reservation: reservations.ok ? reservations.data.find(r => r.itineraryItemId === i.id) ?? null : null }));
    return { ok: true, data: { tripId, days, selected, invalidDay: false, reservationUnavailable: !reservations.ok, plan: partitionDay(rows) } };
  }, { isolationLevel: "RepeatableRead" }); } catch { return { ok: false, error: { code: "PERSISTENCE_FAILURE", message: "Day view could not be loaded. Please refresh." } }; }
}
