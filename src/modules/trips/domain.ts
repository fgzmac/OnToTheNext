import { compareDateOnly, enumerateDates, isValidDateOnly } from "./date-only";
import type { DayShape, DomainIssue, SegmentShape, TripShape } from "./types";

export function validateTripBasics(trip: Pick<TripShape, "startDate" | "endDate" | "travelerCount">): DomainIssue[] {
  const errors: DomainIssue[] = [];

  if (!isValidDateOnly(trip.startDate) || !isValidDateOnly(trip.endDate) || compareDateOnly(trip.endDate, trip.startDate) < 0) {
    errors.push({
      code: "INVALID_TRIP_DATE_RANGE",
      message: "Trip end date must be on or after the start date.",
      field: "endDate",
    });
  }

  if (!Number.isInteger(trip.travelerCount) || trip.travelerCount < 1) {
    errors.push({
      code: "INVALID_TRAVELER_COUNT",
      message: "Traveler count must be at least 1.",
      field: "travelerCount",
    });
  }

  return errors;
}

export function validateTripStructure(trip: TripShape, segments: SegmentShape[]): DomainIssue[] {
  const errors: DomainIssue[] = [...validateTripBasics(trip)];
  const positions = new Set<number>();
  const ordered = [...segments].sort((a, b) => a.position - b.position);

  for (const segment of ordered) {
    if (positions.has(segment.position)) {
      errors.push({
        code: "DUPLICATE_SEGMENT_POSITION",
        message: "Each trip segment must have a unique position.",
        segmentIds: [segment.id],
      });
    }
    positions.add(segment.position);

    if (
      !isValidDateOnly(segment.arrivalDate) ||
      !isValidDateOnly(segment.departureDate) ||
      compareDateOnly(segment.departureDate, segment.arrivalDate) < 0
    ) {
      errors.push({
        code: "INVALID_SEGMENT_DATE_RANGE",
        message: `${segment.baseName} departure must be on or after arrival.`,
        segmentIds: [segment.id],
      });
    }

    if (
      compareDateOnly(segment.arrivalDate, trip.startDate) < 0 ||
      compareDateOnly(segment.departureDate, trip.endDate) > 0
    ) {
      errors.push({
        code: "SEGMENT_OUTSIDE_TRIP",
        message: `${segment.baseName} must stay inside the trip date range.`,
        segmentIds: [segment.id],
      });
    }
  }

  for (let index = 1; index < ordered.length; index += 1) {
    const previous = ordered[index - 1];
    const current = ordered[index];

    if (compareDateOnly(current.arrivalDate, previous.departureDate) < 0) {
      errors.push({
        code: "SEGMENT_OVERLAP",
        message: `${current.baseName} starts before ${previous.baseName} ends.`,
        segmentIds: [previous.id, current.id],
      });
    }
  }

  return errors;
}

export function buildDayPlan(trip: TripShape, segments: SegmentShape[]): DayShape[] {
  const ordered = [...segments].sort((a, b) => a.position - b.position);
  const dates = enumerateDates(trip.startDate, trip.endDate);

  return dates.map((date, position) => {
    const owner = ordered.find(
      (segment) =>
        compareDateOnly(segment.arrivalDate, date) <= 0 &&
        compareDateOnly(date, segment.departureDate) <= 0,
    );

    return {
      tripId: trip.id,
      date,
      primarySegmentId: owner?.id ?? null,
      position,
    };
  });
}

export function structureWarnings(days: DayShape[]): DomainIssue[] {
  const unassignedDates = days.filter((day) => day.primarySegmentId === null).map((day) => day.date);

  if (unassignedDates.length === 0) return [];

  return [
    {
      code: "UNASSIGNED_DATES",
      message: `${unassignedDates.length} trip date${unassignedDates.length === 1 ? " is" : "s are"} still unassigned.`,
      dates: unassignedDates,
    },
  ];
}
