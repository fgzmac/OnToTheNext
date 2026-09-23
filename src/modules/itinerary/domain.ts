import type { ItineraryIssue } from "./types";

// Empty means deliberately untimed; undefined means malformed input.
export function parseLocalTime(value: string): number | null | undefined {
  if (value === "") return null;
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return undefined;
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}
export function formatLocalTime(value: number | null): string {
  if (value === null) return "Time not set";
  return String(Math.floor(value / 60)).padStart(2, "0") + ":" + String(value % 60).padStart(2, "0");
}
export function validatePlanning(input: { startMinute: unknown; durationMinutes: unknown; flexibility: unknown }): ItineraryIssue | null {
  if (input.startMinute !== null && (typeof input.startMinute !== "number" || !Number.isInteger(input.startMinute) || input.startMinute < 0 || input.startMinute > 1439)) {
    return { code: "INVALID_TIME", message: "Choose a local time from 00:00 to 23:59, or leave time empty." };
  }
  if (input.durationMinutes !== null && (typeof input.durationMinutes !== "number" || !Number.isInteger(input.durationMinutes) || input.durationMinutes <= 0 || input.durationMinutes > 2_147_483_647)) {
    return { code: "INVALID_DURATION", message: "Duration must be a positive whole number of minutes when known." };
  }
  if (input.flexibility !== "FIXED" && input.flexibility !== "FLEXIBLE") {
    return { code: "INVALID_FLEXIBILITY", message: "Choose Fixed or Flexible." };
  }
  return null;
}
export function isSchedulableDecision(outcome: string | null): boolean { return outcome === "ACCEPTED"; }
