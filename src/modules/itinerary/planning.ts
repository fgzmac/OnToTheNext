import { formatLocalTime } from "./domain";
import type { MoveDirection, SchedulingDay, TimeIssue } from "./types";

export const BLOCK_TYPES = ["FREE_TIME", "HOTEL_REST", "TRANSPORTATION"] as const;
export const TRANSPORT_MODES = ["TRAIN", "FLIGHT", "BUS", "CAR", "TRANSIT", "WALK", "FERRY", "OTHER"] as const;
export const TYPE_LABELS: Record<string, string> = { ACTIVITY: "Activity", FREE_TIME: "Free Time", HOTEL_REST: "Hotel / Rest", TRANSPORTATION: "Transportation", MEAL: "Meal", SHOPPING: "Shopping", CUSTOM: "Custom" };
export const MODE_LABELS: Record<string, string> = { TRAIN: "Train", FLIGHT: "Flight", BUS: "Bus", CAR: "Car", TRANSIT: "Transit", WALK: "Walk", FERRY: "Ferry", OTHER: "Other" };
interface TimedItem { id: string; title: string; startMinute: number | null; durationMinutes: number | null; }
function clockMinute(minute: number) {
  return (minute >= 1440 ? "+" + Math.floor(minute / 1440) + " day " : "") + formatLocalTime(minute % 1440);
}
export function deriveTimeIssues(items: readonly TimedItem[]): TimeIssue[] {
  const intervals = items.flatMap(item => item.startMinute === null || item.durationMinutes === null ? [] : [{ ...item, start: item.startMinute, end: item.startMinute + item.durationMinutes }]);
  const issues: TimeIssue[] = [];
  for (const [index, a] of intervals.entries()) {
    if (a.end > 1440) issues.push({ code: "PAST_MIDNIGHT", itemIds: [a.id], message: a.title + " (" + clockMinute(a.start) + "–" + clockMinute(a.end) + ") extends past the end of the day. Move or remove it, or plan a shorter duration later; nothing is carried into the next day automatically." });
    for (const b of intervals.slice(index + 1)) {
      if (a.start < b.end && b.start < a.end) issues.push({ code: "TIME_OVERLAP", itemIds: [a.id, b.id], message: a.title + " (" + clockMinute(a.start) + "–" + clockMinute(a.end) + ") overlaps " + b.title + " (" + clockMinute(b.start) + "–" + clockMinute(b.end) + "). Move one item, change its planning time later, or remove one item." });
    }
  }
  return issues;
}
export function isEligibleMoveDay(item: { type: string; dayId: string; sourceSegmentId: string | null; originSegmentId: string | null }, day: SchedulingDay): boolean {
  if (day.id === item.dayId) return false;
  const segmentId = item.type === "ACTIVITY" ? item.sourceSegmentId : item.type === "TRANSPORTATION" ? item.originSegmentId : null;
  return segmentId === null || day.primarySegmentId === segmentId;
}
export function reorderIds(ids: readonly string[], itemId: string, direction: MoveDirection): string[] | null {
  const index = ids.indexOf(itemId);
  const neighbor = index + (direction === "EARLIER" ? -1 : 1);
  if (index < 0 || neighbor < 0 || neighbor >= ids.length) return null;
  const result = [...ids];
  [result[index], result[neighbor]] = [result[neighbor], result[index]];
  return result;
}
export function requiresFixedConfirmation(items: readonly { id: string; flexibility: string }[], before: readonly string[], after: readonly string[]): boolean {
  return items.some(item => item.flexibility === "FIXED" && before.indexOf(item.id) !== after.indexOf(item.id));
}
export function previewStateMatches(expected: string, current: string): boolean { return expected === current; }
