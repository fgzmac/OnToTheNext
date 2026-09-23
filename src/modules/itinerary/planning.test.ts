import { describe, expect, it } from "vitest";
import { deriveTimeIssues, isEligibleMoveDay, reorderIds, requiresFixedConfirmation, previewStateMatches } from "./planning";
import { fingerprint, readPreview, signPreview } from "./preview-token";
const a = { id: "a", title: "Museum", startMinute: 540, durationMinutes: 60 };
const b = { id: "b", title: "Rest", startMinute: 570, durationMinutes: 60 };
const day = { id: "target", date: "2030-04-03", primarySegmentId: "tokyo-first" };
const item = { type: "ACTIVITY", dayId: "source", sourceSegmentId: "tokyo-first", originSegmentId: null };
describe("Planning conflicts and movement rules", () => {
  it("explains half-open interval overlap with names, times and a suggestion", () => {
    expect(deriveTimeIssues([a, b])).toEqual([{ code: "TIME_OVERLAP", itemIds: ["a", "b"], message: expect.stringContaining("Museum (09:00–10:00) overlaps Rest (09:30–10:30)") }]);
    expect(deriveTimeIssues([a, b])[0].message).toContain("Move one item");
  });
  it("does not warn for back-to-back intervals", () => { expect(deriveTimeIssues([a, { ...b, startMinute: 600 }])).toEqual([]); });
  it("ignores untimed and unknown-duration intervals", () => { expect(deriveTimeIssues([a, { ...b, startMinute: null }, { ...b, durationMinutes: null }])).toEqual([]); });
  it("reports contained and equal intervals", () => { expect(deriveTimeIssues([a, { ...b, startMinute: 550, durationMinutes: 10 }])).toHaveLength(1); expect(deriveTimeIssues([a, { ...a, id: "c" }])).toHaveLength(1); });
  it("warns past midnight without wrapping", () => { const issue = deriveTimeIssues([{ ...a, startMinute: 1430, durationMinutes: 30 }])[0]; expect(issue.code).toBe("PAST_MIDNIGHT"); expect(issue.message).toContain("+1 day 00:20"); });
  it("permits an interval ending exactly at midnight", () => { expect(deriveTimeIssues([{ ...a, startMinute: 1380, durationMinutes: 60 }])).toEqual([]); });
  it("never changes the input order or planning values", () => { const input = [Object.freeze(b), Object.freeze(a)]; deriveTimeIssues(Object.freeze(input)); expect(input).toEqual([b, a]); });
  it("restricts sourced Activities by Segment identity", () => { expect(isEligibleMoveDay(item, day)).toBe(true); expect(isEligibleMoveDay(item, { ...day, primarySegmentId: "tokyo-return" })).toBe(false); expect(isEligibleMoveDay(item, { ...day, primarySegmentId: null })).toBe(false); });
  it("allows detached Activity movement without recreating source constraints", () => { expect(isEligibleMoveDay({ ...item, sourceSegmentId: null }, { ...day, primarySegmentId: null })).toBe(true); });
  it("restricts Transportation to its known origin", () => { const transport = { ...item, type: "TRANSPORTATION", originSegmentId: "kyoto" }; expect(isEligibleMoveDay(transport, day)).toBe(false); expect(isEligibleMoveDay(transport, { ...day, primarySegmentId: "kyoto" })).toBe(true); expect(isEligibleMoveDay({ ...transport, originSegmentId: null }, day)).toBe(true); });
  it.each(["FREE_TIME", "HOTEL_REST"])("allows %s onto any other same-Trip Day", type => { expect(isEligibleMoveDay({ ...item, type }, { ...day, primarySegmentId: null })).toBe(true); });
  it("excludes the current Day", () => { expect(isEligibleMoveDay(item, { ...day, id: "source" })).toBe(false); });
  it("swaps only neighbors without changing the input", () => { const ids = ["a", "b", "c"]; expect(reorderIds(ids, "b", "EARLIER")).toEqual(["b", "a", "c"]); expect(reorderIds(ids, "b", "LATER")).toEqual(["a", "c", "b"]); expect(ids).toEqual(["a", "b", "c"]); });
  it("does not wrap at boundaries or accept a missing item", () => { expect(reorderIds(["a", "b"], "a", "EARLIER")).toBeNull(); expect(reorderIds(["a", "b"], "b", "LATER")).toBeNull(); expect(reorderIds(["a"], "missing", "LATER")).toBeNull(); });
  it("protects Fixed neighbors as well as the selected Fixed item", () => { expect(requiresFixedConfirmation([{ id: "a", flexibility: "FIXED" }, { id: "b", flexibility: "FLEXIBLE" }], ["a", "b"], ["b", "a"])).toBe(true); expect(requiresFixedConfirmation([{ id: "a", flexibility: "FLEXIBLE" }], ["a", "b"], ["b", "a"])).toBe(false); });
  it("fingerprints source, target and item revisions for stale comparison", () => { const plan = { item: { revision: 0, dayId: "one" }, target: [] }; const before = fingerprint(plan); expect(previewStateMatches(before, fingerprint(plan))).toBe(true); expect(previewStateMatches(before, fingerprint({ ...plan, item: { revision: 1, dayId: "one" } }))).toBe(false); expect(previewStateMatches(before, fingerprint({ ...plan, target: ["new conflict"] }))).toBe(false); });
  it("binds a preview to its exact operation and rejects tampering", () => { const payload = { tripId: "trip", itemId: "item", targetDayId: "day", direction: null, fingerprint: "state" }; const token = signPreview(payload); expect(readPreview(token)).toMatchObject(payload); expect(readPreview(token.replace(/.$/, "!"))).toBeNull(); expect(readPreview("invalid")).toBeNull(); });
});
