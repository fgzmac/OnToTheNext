import type { ReservationState } from "@/src/generated/prisma/enums";
import { isValidDateOnly } from "@/src/modules/trips/date-only";
export const STATE_LABELS: Record<ReservationState, string> = {
  BOOK_NOW: "Book now", OPENS_LATER: "Opens later", CHECK_BACK: "Check back", OPTIONAL: "Optional reservation",
  NO_RESERVATION_NEEDED: "No reservation needed", BOOKED: "Booked", NEEDS_ATTENTION: "Needs attention", CANCELLED: "Cancelled",
};
export const PLANNING_STATES = ["BOOK_NOW", "OPENS_LATER", "CHECK_BACK", "OPTIONAL", "NO_RESERVATION_NEEDED", "NEEDS_ATTENTION"] as const;
export type PlanningState = typeof PLANNING_STATES[number];
export function isPlanningState(state: unknown): state is PlanningState { return PLANNING_STATES.some(value => value === state); }
export function canSetPlanningState(current: unknown, next: unknown) { return isPlanningState(current) && isPlanningState(next); }
export function validMinute(value: unknown): value is number | null { return value === null || (typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 1439); }
export function validDate(value: unknown): value is string | null { return value === null || (typeof value === "string" && isValidDateOnly(value)); }
export function safeBookingUrl(value: unknown): string | null | undefined {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string" || value.length > 2048 || /[\x00-\x20\x7f]/.test(value)) return undefined;
  try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password ? url.href : undefined; } catch { return undefined; }
}
export function optionalText(value: unknown, maximum: number): string | null | undefined {
  if (value === undefined || value === null) return null;
  if (typeof value !== "string" || value.length > maximum) return undefined;
  return value.trim() || null;
}
export const AVAILABILITY_TOPICS = ["Ticket availability", "Booking policy", "Inventory release"];
export function reservationTime(date: string | null, minute: number | null) {
  const time = minute === null ? "Time unspecified" : `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
  return `${date ?? "Date unspecified"} · ${time}`;
}
