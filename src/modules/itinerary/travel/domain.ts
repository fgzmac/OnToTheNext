import { addDays, isValidDateOnly } from "@/src/modules/trips/date-only";
import { formatLocalTime } from "../domain";
export const MAX_TRAVEL_MINUTES = 1440;
export const MAX_BUFFER_MINUTES = 240;
export type TravelInputs = {
  originKind: "ENTERED" | "EARLIER_ITEM"; sourceItemId: string | null; originLabel: string;
  travelMinutes: number; bufferMinutes: number; basis: "PLANNED" | "CONFIRMED";
  clockContext: "SAME_LOCAL_CLOCK" | "REQUIRES_REVIEW";
};
export type TravelItemContext = {
  id: string; tripId: string; title: string; type: string; progress: string; dayId: string;
  date: string; position: number; startMinute: number | null; durationMinutes: number | null;
  segment: { id: string; label: string; arrival: string; departure: string } | null;
  originSegmentId: string | null;
  booking: { id: string; state: string; date: string | null; minute: number | null } | null;
};
export type TravelContext = { target: TravelItemContext; source: TravelItemContext | null; tripStart: string; tripEnd: string };
export function enteredMinutes(value: unknown, maximum: number): number | null {
  if (typeof value === "string") {
    if (!/^\d+$/.test(value.trim())) return null;
    value = Number(value.trim());
  }
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= maximum ? value : null;
}
export function parseTravelInputs(input: Record<string, unknown>): TravelInputs | string {
  const travelMinutes = enteredMinutes(input.travelMinutes, MAX_TRAVEL_MINUTES), bufferMinutes = enteredMinutes(input.bufferMinutes, MAX_BUFFER_MINUTES);
  if (travelMinutes === null || bufferMinutes === null) return "Enter whole travel minutes from 0 to 1440 and buffer minutes from 0 to 240. Blank is unknown, not zero.";
  if (input.originKind !== "ENTERED" && input.originKind !== "EARLIER_ITEM") return "Choose a starting context.";
  if (input.basis !== "PLANNED" && input.basis !== "CONFIRMED") return "Choose planned or confirmed timing explicitly.";
  if (input.clockContext !== "SAME_LOCAL_CLOCK" && input.clockContext !== "REQUIRES_REVIEW") return "Choose the clock assumptions explicitly.";
  const originLabel = typeof input.originLabel === "string" ? input.originLabel.trim() : "";
  const sourceItemId = typeof input.sourceItemId === "string" && input.sourceItemId ? input.sourceItemId : null;
  if (input.originKind === "ENTERED" && (originLabel.length < 2 || originLabel.length > 160)) return "Enter a starting-point label of 2–160 characters.";
  if (input.originKind === "EARLIER_ITEM" && !sourceItemId) return "Choose an earlier itinerary item.";
  return { originKind: input.originKind, sourceItemId: input.originKind === "EARLIER_ITEM" ? sourceItemId : null, originLabel,
    travelMinutes, bufferMinutes, basis: input.basis, clockContext: input.clockContext };
}
export function eligibleOrigin(target: TravelItemContext, source: TravelItemContext | null): boolean {
  return Boolean(source && source.id !== target.id && source.tripId === target.tripId && source.dayId === target.dayId &&
    source.position < target.position && source.progress !== "SKIPPED" && target.segment && source.segment?.id === target.segment.id);
}
export function timingMismatch(target: TravelItemContext): boolean {
  const b = target.booking;
  return Boolean(b?.state === "BOOKED" && ((b.date !== null && b.date !== target.date) || (b.minute !== null && target.startMinute !== null && b.minute !== target.startMinute)));
}
export function contextIssues(c: TravelContext, input: TravelInputs): string[] {
  const t = c.target, b = t.booking, issues: string[] = [];
  if (!["ACTIVITY", "TRANSPORTATION"].includes(t.type)) issues.push("Travel planning is supported only for Activity and Transportation items.");
  if (t.progress !== "PENDING") issues.push("This target is not Pending. Inputs are retained; no departure recommendation is active.");
  if (b?.state === "CANCELLED") issues.push("The reservation is Cancelled. Review it in Itinerary before relying on a departure estimate.");
  if (input.originKind === "EARLIER_ITEM" && !eligibleOrigin(t, c.source)) issues.push("The planned starting stop is missing, Skipped, not earlier on this Day, or lacks matching Segment context. Choose a valid starting point.");
  if (b?.state === "BOOKED" && b.date !== null && b.date !== t.date) issues.push("Confirmed booking date differs from this Day. Review the booking and itinerary date.");
  if (input.basis === "PLANNED" && t.startMinute === null) issues.push("The itinerary planned start is unknown. No timing basis was substituted.");
  if (input.basis === "CONFIRMED" && (!b || b.state !== "BOOKED" || b.date !== t.date || b.minute === null)) issues.push("Confirmed timing requires an attached Booked reservation with a matching date and known time. No timing basis was substituted.");
  if (input.clockContext !== "SAME_LOCAL_CLOCK") issues.push("Different time zones or clock-change ambiguity require review. This estimate does not account for them.");
  return issues;
}
export function localPoint(date: string, minute: number) {
  const offset = Math.floor(minute / 1440);
  return { date: addDays(date, offset), minute: minute - offset * 1440, time: formatLocalTime(minute - offset * 1440) };
}
export function calculateDeparture(date: string, startMinute: number | null, travel: unknown, buffer: unknown, tripStart: string, tripEnd: string) {
  const travelMinutes = enteredMinutes(travel, MAX_TRAVEL_MINUTES), bufferMinutes = enteredMinutes(buffer, MAX_BUFFER_MINUTES);
  if (!isValidDateOnly(date) || !isValidDateOnly(tripStart) || !isValidDateOnly(tripEnd) || startMinute === null || !Number.isInteger(startMinute) || startMinute < 0 || startMinute > 1439 || travelMinutes === null || bufferMinutes === null) return null;
  const localMinute = startMinute - travelMinutes - bufferMinutes;
  const point = localPoint(date, localMinute);
  return { ...point, localMinute, outsideTrip: point.date < tripStart || point.date > tripEnd };
}
export function deriveDeparture(c: TravelContext, input: TravelInputs) {
  const issues = contextIssues(c, input);
  if (issues.length) return { departure: null, warnings: issues };
  const start = input.basis === "PLANNED" ? c.target.startMinute : c.target.booking?.minute ?? null;
  const departure = calculateDeparture(c.target.date, start, input.travelMinutes, input.bufferMinutes, c.tripStart, c.tripEnd);
  const warnings: string[] = [];
  if (!departure) return { departure: null, warnings: ["Travel timing is unavailable."] };
  if (departure.outsideTrip) warnings.push("Estimated leave-by falls outside the Trip dates. No Day has been added or changed.");
  if (input.originKind === "EARLIER_ITEM" && c.source) {
    if (c.source.startMinute === null || c.source.durationMinutes === null) warnings.push("Previous stop's planned end is unknown; feasibility cannot be established.");
    else {
      const endMinute = c.source.startMinute + c.source.durationMinutes, end = localPoint(c.source.date, endMinute);
      if (endMinute > departure.localMinute) warnings.push("Previous stop is planned to end at " + end.date + " " + end.time + "; this estimate requires leaving at " + departure.date + " " + departure.time + ". Both plans cannot be followed as entered.");
    }
  }
  return { departure, warnings };
}
