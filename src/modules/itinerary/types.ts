import type { ItineraryFlexibility, ItineraryItemType } from "@/src/generated/prisma/enums";

export type ItineraryIssueCode = "NOT_FOUND" | "NOT_ACCEPTED" | "WRONG_DAY" | "WRONG_SEGMENT" | "ALREADY_SCHEDULED" | "INVALID_TIME" | "INVALID_DURATION" | "INVALID_FLEXIBILITY" | "PERSISTENCE_FAILURE";
export interface ItineraryIssue { code: ItineraryIssueCode; message: string; }
export type ItineraryResult<T> = { ok: true; data: T } | { ok: false; error: ItineraryIssue };
export interface ItineraryActionState { error: ItineraryIssue | null; message: string | null; }
export interface TimelineItem {
  id: string; title: string; type: ItineraryItemType; startMinute: number | null;
  durationMinutes: number | null; position: number; flexibility: ItineraryFlexibility;
  notes: string | null; sourceRecommendationId: string | null;
}
export interface SchedulingDay { id: string; date: string; primarySegmentId: string | null; }
export interface UnscheduledIdea {
  id: string; title: string; segmentLabel: string; segmentId: string; durationMinutes: number | null;
}
export interface ItineraryBuilder {
  tripId: string;
  days: (SchedulingDay & { base: string | null; items: TimelineItem[] })[];
  unscheduled: UnscheduledIdea[];
}
