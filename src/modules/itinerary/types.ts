import type { ItineraryFlexibility, ItineraryItemType, TransportationMode } from "@/src/generated/prisma/enums";

export type ItineraryIssueCode = "NOT_FOUND" | "NOT_ACCEPTED" | "WRONG_DAY" | "WRONG_SEGMENT" | "ALREADY_SCHEDULED" | "INVALID_TIME" | "INVALID_DURATION" | "INVALID_FLEXIBILITY" | "INVALID_BLOCK" | "INVALID_TRANSPORTATION" | "ORDER_BOUNDARY" | "FIXED_CONFIRMATION_REQUIRED" | "MOVE_PREVIEW_STALE" | "PERSISTENCE_FAILURE";
export interface ItineraryIssue { code: ItineraryIssueCode; message: string; }
export type ItineraryResult<T> = { ok: true; data: T } | { ok: false; error: ItineraryIssue };
export interface ItineraryActionState { error: ItineraryIssue | null; message: string | null; }
export interface TimelineItem {
  id: string; title: string; type: ItineraryItemType; startMinute: number | null;
  durationMinutes: number | null; position: number; flexibility: ItineraryFlexibility;
  notes: string | null; sourceRecommendationId: string | null;
  transportationMode: TransportationMode | null; originSegmentId: string | null; destinationSegmentId: string | null;
  sourceSegmentId: string | null;
}
export interface SchedulingDay { id: string; date: string; primarySegmentId: string | null; }
export interface PlanningSegment { id: string; label: string; }
export interface UnscheduledIdea {
  id: string; title: string; segmentLabel: string; segmentId: string; durationMinutes: number | null;
}
export interface TimeIssue { code: "TIME_OVERLAP" | "PAST_MIDNIGHT"; itemIds: string[]; message: string; }
export interface ItineraryBuilder {
  tripId: string;
  days: (SchedulingDay & { base: string | null; items: TimelineItem[]; issues: TimeIssue[] })[];
  segments: PlanningSegment[];
  unscheduled: UnscheduledIdea[];
}
export type MoveDirection = "EARLIER" | "LATER";
export interface MovePreview {
  token: string; itemId: string; title: string; flexibility: ItineraryFlexibility;
  sourceDay: string; targetDay: string; position: string; fixedWarning: string | null;
  issues: TimeIssue[]; operation: "MOVE" | "REORDER";
}
export interface MovementActionState extends ItineraryActionState { preview: MovePreview | null; }
