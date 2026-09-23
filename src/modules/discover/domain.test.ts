import { describe, expect, it } from "vitest";
import { batchWindow, decisionLabel, isOrganizerDecision, parseBatchPage } from "./domain";
import { DISCOVER_FIXTURES } from "./fixture-catalog";

describe("Discover Slice 1 domain", () => {
  it("permits only Accept and Deny actions", () => {
    expect(isOrganizerDecision("ACCEPTED")).toBe(true);
    expect(isOrganizerDecision("DENIED")).toBe(true);
    for (const value of ["SAVED", "MUST_DO", "BOOKED", "SCHEDULED", "", null, undefined]) expect(isOrganizerDecision(value)).toBe(false);
  });
  it("keeps accepted, denied and undecided labels distinct", () => {
    expect(decisionLabel("ACCEPTED")).toBe("Accepted");
    expect(decisionLabel("DENIED")).toBe("Denied");
    expect(decisionLabel(null)).toBe("No decision yet");
    expect(decisionLabel("SAVED")).toBe("Saved");
    expect(decisionLabel("MUST_DO")).toBe("Must-do");
  });
  it("does not convert acceptance into scheduling or booking", () => {
    expect(decisionLabel("ACCEPTED")).not.toMatch(/scheduled|booked|paid|completed/i);
    expect(isOrganizerDecision("SCHEDULED")).toBe(false);
    expect(isOrganizerDecision("BOOKED")).toBe(false);
  });
  it("parses a deterministic page cursor", () => {
    expect(parseBatchPage("0")).toBe(0);
    expect(parseBatchPage("1")).toBe(1);
    expect(parseBatchPage("2")).toBe(2);
  });
  it("rejects malformed, negative and unbounded cursors", () => {
    for (const value of [undefined, "-1", "1.5", "NaN", "1x", "9007199254740992", "100001"]) expect(parseBatchPage(value)).toBe(0);
  });
  it("returns two disjoint batches from the eight-place catalog", () => {
    const first = batchWindow(0, 8);
    const second = batchWindow(1, 8);
    const firstNames = DISCOVER_FIXTURES.slice(first.skip, first.skip + first.take).map(item => item.name);
    const secondNames = DISCOVER_FIXTURES.slice(second.skip, second.skip + second.take).map(item => item.name);
    expect(firstNames).toHaveLength(4);
    expect(secondNames).toHaveLength(4);
    expect(new Set([...firstNames, ...secondNames]).size).toBe(8);
  });
  it("stops at exhaustion instead of recycling recommendations", () => {
    expect(batchWindow(2, 8)).toEqual({ page: 2, totalPages: 2, skip: 8, take: 4, exhausted: true });
    expect(batchWindow(999, 8)).toEqual(batchWindow(2, 8));
  });
  it("distinguishes no catalog from an exhausted catalog", () => {
    expect(batchWindow(0, 0)).toEqual({ page: 0, totalPages: 0, skip: 0, take: 4, exhausted: false });
  });
});
