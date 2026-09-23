import { describe, expect, it } from "vitest";
import { formatLocalTime, isSchedulableDecision, parseLocalTime, validatePlanning } from "./domain";
const valid = { startMinute: null, durationMinutes: null, flexibility: "FLEXIBLE" };

describe("Itinerary planning validation", () => {
  it("permits midnight and 23:59 as within-day minutes", () => {
    expect(validatePlanning({ ...valid, startMinute: 0 })).toBeNull();
    expect(validatePlanning({ ...valid, startMinute: 1439 })).toBeNull();
  });
  it("rejects negative, overflow, fractional and nonnumeric times", () => {
    for (const startMinute of [-1, 1440, 1.5, NaN, Infinity, "09:30"]) expect(validatePlanning({ ...valid, startMinute })?.code).toBe("INVALID_TIME");
  });
  it("allows an intentionally unset time", () => {
    expect(validatePlanning(valid)).toBeNull();
    expect(formatLocalTime(null)).toBe("Time not set");
  });
  it("accepts positive whole-minute duration snapshots", () => {
    expect(validatePlanning({ ...valid, durationMinutes: 1 })).toBeNull();
    expect(validatePlanning({ ...valid, durationMinutes: 90 })).toBeNull();
  });
  it("rejects zero, negative, fractional or unrepresentable durations", () => {
    for (const durationMinutes of [0, -1, 0.5, NaN, 2_147_483_648, "60"]) expect(validatePlanning({ ...valid, durationMinutes })?.code).toBe("INVALID_DURATION");
  });
  it("permits Fixed and Flexible only", () => {
    expect(validatePlanning({ ...valid, flexibility: "FIXED" })).toBeNull();
    expect(validatePlanning(valid)).toBeNull();
    for (const flexibility of ["BOOKED", "PAID", "COMPLETED", "", null]) expect(validatePlanning({ ...valid, flexibility })?.code).toBe("INVALID_FLEXIBILITY");
  });
  it("parses local HH:MM without timezone conversion", () => {
    expect(parseLocalTime("00:00")).toBe(0);
    expect(parseLocalTime("09:30")).toBe(570);
    expect(parseLocalTime("12:30")).toBe(750);
    expect(parseLocalTime("23:59")).toBe(1439);
  });
  it("distinguishes omitted time from malformed time", () => {
    expect(parseLocalTime("")).toBeNull();
    for (const value of ["24:00", "12:60", "9:30", "-1:00", "12:30:00", "NaN"]) expect(parseLocalTime(value)).toBeUndefined();
  });
  it("formats time without adding dates or timezone offsets", () => {
    expect(formatLocalTime(0)).toBe("00:00");
    expect(formatLocalTime(750)).toBe("12:30");
    expect(formatLocalTime(1439)).toBe("23:59");
  });
  it("allows Accepted as a prerequisite, not a scheduled or booking state", () => {
    expect(isSchedulableDecision("ACCEPTED")).toBe(true);
    for (const outcome of [null, "DENIED", "SAVED", "MUST_DO", "SCHEDULED", "BOOKED"]) expect(isSchedulableDecision(outcome)).toBe(false);
  });
});
