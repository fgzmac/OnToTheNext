import { describe, expect, it } from "vitest";
import { canSetPlanningState, isPlanningState, optionalText, PLANNING_STATES, reservationTime, safeBookingUrl, STATE_LABELS, validDate, validMinute } from "./domain";
describe("Reservation domain boundaries", () => {
  it("labels every approved state using readable text", () => {
    expect(Object.values(STATE_LABELS)).toEqual(["Book now", "Opens later", "Check back", "Optional reservation", "No reservation needed", "Booked", "Needs attention", "Cancelled"]);
  });
  it.each([0, 1439, null])("accepts local minute %s", value => expect(validMinute(value)).toBe(true));
  it.each([-1, 1440, 1.5, NaN, "570"])("rejects local minute %s", value => expect(validMinute(value)).toBe(false));
  it.each(["https://example.com/booking", "http://localhost:3100/booking"])("allows safe URL %s", value => expect(safeBookingUrl(value)).toBe(value));
  it.each(["javascript:alert(1)", "data:text/html,x", "file:///tmp/x", "ftp://example.com", "/booking", "https://user:secret@example.com", "https://example.com/\nbooking", "https://example.com/" + "x".repeat(2048)])("rejects unsafe or invalid URL %s", value => expect(safeBookingUrl(value)).toBeUndefined());
  it("handles optional fields and reasonable metadata lengths", () => {
    expect(safeBookingUrl("")).toBeNull(); expect(optionalText(" ref ", 120)).toBe("ref");
    expect(optionalText("x".repeat(121), 120)).toBeUndefined(); expect(optionalText({}, 120)).toBeUndefined();
  });
  it("supports only deliberate planning-to-planning changes", () => {
    for (const from of PLANNING_STATES) for (const to of PLANNING_STATES) expect(canSetPlanningState(from, to)).toBe(true);
    for (const state of ["BOOKED", "CANCELLED", "unknown"]) {
      expect(isPlanningState(state)).toBe(false); expect(canSetPlanningState("CHECK_BACK", state)).toBe(false); expect(canSetPlanningState(state, "CHECK_BACK")).toBe(false);
    }
  });
  it("keeps desired and confirmed date-only times distinguishable", () => {
    const desired = reservationTime("2030-04-03", 600), confirmed = reservationTime("2030-04-03", 630);
    expect(desired).toBe("2030-04-03 · 10:00"); expect(confirmed).toBe("2030-04-03 · 10:30");
    expect(reservationTime(null, null)).toBe("Date unspecified · Time unspecified");
    expect(validDate("2030-02-30")).toBe(false); expect(validDate("2030-04-03")).toBe(true); expect(validDate(null)).toBe(true);
  });
});
