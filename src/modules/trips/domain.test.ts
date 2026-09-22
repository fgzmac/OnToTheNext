import { describe, expect, it } from "vitest";
import { buildDayPlan, structureWarnings, validateTripBasics, validateTripStructure } from "./domain";
import type { SegmentShape, TripShape } from "./types";

const trip: TripShape = {
  id: "trip-1",
  name: "Japan Demo",
  destinationLabel: "Japan",
  destinationScope: "COUNTRY_REGION",
  startDate: "2030-04-01",
  endDate: "2030-04-15",
  travelerCount: 2,
};

function segment(
  id: string,
  baseName: string,
  arrivalDate: string,
  departureDate: string,
  position: number,
): SegmentShape {
  return { id, tripId: trip.id, baseName, arrivalDate, departureDate, position };
}

describe("trip domain rules", () => {
  it.each(["2030-99-01", "2030-04-99", "2030-02-29", "not-a-date"])("rejects malformed calendar date %s without throwing", value => {
    expect(validateTripBasics({ startDate: value, endDate: "2030-04-15", travelerCount: 1 })[0]?.code).toBe("INVALID_TRIP_DATE_RANGE");
  });
  it.each([0, -1, 1.5])("rejects invalid traveler count %s", travelerCount => {
    expect(validateTripBasics({ ...trip, travelerCount }).some(issue => issue.code === "INVALID_TRAVELER_COUNT")).toBe(true);
  });
  it("rejects reversed and out-of-trip segment ranges", () => {
    expect(validateTripStructure(trip, [segment("a", "Tokyo", "2030-04-05", "2030-04-01", 0)]).some(issue => issue.code === "INVALID_SEGMENT_DATE_RANGE")).toBe(true);
    expect(validateTripStructure(trip, [segment("a", "Tokyo", "2030-03-31", "2030-04-16", 0)]).some(issue => issue.code === "SEGMENT_OUTSIDE_TRIP")).toBe(true);
  });

  it("rejects invalid trip dates", () => {
    expect(validateTripBasics({ startDate: "2030-04-15", endDate: "2030-04-01", travelerCount: 1 })[0]?.code)
      .toBe("INVALID_TRIP_DATE_RANGE");
  });

  it("accepts one shared transfer boundary date", () => {
    const segments = [
      segment("a", "Tokyo", "2030-04-01", "2030-04-05", 0),
      segment("b", "Kyoto", "2030-04-05", "2030-04-09", 1),
    ];
    expect(validateTripStructure(trip, segments)).toEqual([]);
  });

  it("rejects a true overlap", () => {
    const segments = [
      segment("a", "Tokyo", "2030-04-01", "2030-04-06", 0),
      segment("b", "Kyoto", "2030-04-05", "2030-04-09", 1),
    ];
    expect(validateTripStructure(trip, segments).some((issue) => issue.code === "SEGMENT_OVERLAP")).toBe(true);
  });

  it("allows the same base more than once", () => {
    const segments = [
      segment("a", "Tokyo", "2030-04-01", "2030-04-05", 0),
      segment("b", "Kyoto", "2030-04-05", "2030-04-09", 1),
      segment("c", "Tokyo", "2030-04-09", "2030-04-15", 2),
    ];
    expect(validateTripStructure(trip, segments)).toEqual([]);
  });

  it("assigns a transfer day to the segment where the traveler starts the day", () => {
    const segments = [
      segment("a", "Tokyo", "2030-04-01", "2030-04-05", 0),
      segment("b", "Kyoto", "2030-04-05", "2030-04-09", 1),
    ];
    const transferDay = buildDayPlan(trip, segments).find((day) => day.date === "2030-04-05");
    expect(transferDay?.primarySegmentId).toBe("a");
  });

  it("preserves gaps as unassigned dates", () => {
    const segments = [segment("a", "Tokyo", "2030-04-01", "2030-04-05", 0)];
    const days = buildDayPlan(trip, segments);
    expect(days.find((day) => day.date === "2030-04-10")?.primarySegmentId).toBeNull();
    expect(structureWarnings(days)[0]?.code).toBe("UNASSIGNED_DATES");
  });
});
