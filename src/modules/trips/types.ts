export type DateOnly = string;

export type DestinationScope = "CITY_BASE" | "COUNTRY_REGION";

export type IssueCode =
  | "INVALID_TRIP_DATE_RANGE"
  | "INVALID_TRAVELER_COUNT"
  | "INVALID_DESTINATION"
  | "INVALID_SEGMENT_NAME"
  | "INVALID_SEGMENT_DATE_RANGE"
  | "SEGMENT_OUTSIDE_TRIP"
  | "SEGMENT_OVERLAP"
  | "DUPLICATE_SEGMENT_POSITION"
  | "INVALID_REORDER"
  | "UNASSIGNED_DATES"
  | "NOT_FOUND"
  | "PERSISTENCE_FAILURE"
  | "DAY_GENERATION_FAILED"
  | "ITINERARY_CONTENT_WOULD_BE_REMOVED";

export interface DomainIssue {
  code: IssueCode;
  message: string;
  field?: string;
  segmentIds?: string[];
  dates?: DateOnly[];
}

export interface TripShape {
  id: string;
  name: string | null;
  destinationLabel: string;
  destinationScope: DestinationScope;
  startDate: DateOnly;
  endDate: DateOnly;
  travelerCount: number;
}

export interface SegmentShape {
  id: string;
  tripId: string;
  baseName: string;
  arrivalDate: DateOnly;
  departureDate: DateOnly;
  position: number;
}

export interface DayShape {
  id?: string;
  tripId: string;
  date: DateOnly;
  primarySegmentId: string | null;
  position: number;
}

export interface TripPreferenceShape {
  budgetComfort: string | null;
  planningNote: string | null;
}

export interface TripSkeleton {
  trip: TripShape;
  segments: SegmentShape[];
  days: DayShape[];
  preferences: TripPreferenceShape | null;
  unassignedDates: DateOnly[];
}

export interface Result<T> {
  ok: boolean;
  data: T | null;
  errors: DomainIssue[];
  warnings: DomainIssue[];
}

export function okResult<T>(data: T, warnings: DomainIssue[] = []): Result<T> {
  return { ok: true, data, errors: [], warnings };
}

export function errorResult<T>(errors: DomainIssue[], warnings: DomainIssue[] = []): Result<T> {
  return { ok: false, data: null, errors, warnings };
}
