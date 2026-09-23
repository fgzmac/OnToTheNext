import { describe, expect, it } from "vitest";
import { canChangeProgress, partitionDay } from "./progress";
import type { ItineraryProgress } from "@/src/generated/prisma/enums";
describe("Explicit itinerary progress", () => {
  const item = (id: string, position: number, progress: ItineraryProgress = "PENDING") => ({ id, position, progress });
  it("chooses explicit position rather than supplied array or clock order", () => {
    const items = [{ ...item("later-time", 0), startMinute: 900 }, { ...item("early-time", 1), startMinute: 500 }];
    expect(partitionDay([...items].reverse()).next?.id).toBe("later-time"); expect(items[0].progress).toBe("PENDING");
  });
  it("retains intentional untimed Free Time as next", () => {
    const free = { ...item("free", 0), type: "FREE_TIME", startMinute: null };
    expect(partitionDay([free, item("activity", 1)]).next).toEqual(free);
  });
  it("distinguishes empty from fully processed without calling skipped completed", () => {
    expect(partitionDay([])).toMatchObject({ empty: true, next: null, processed: [] });
    expect(partitionDay([item("skip", 1, "SKIPPED"), item("done", 0, "COMPLETED")])).toMatchObject({ empty: false, next: null, remaining: [], processed: [item("done", 0, "COMPLETED"), item("skip", 1, "SKIPPED")] });
  });
  it("restoration returns to original canonical position", () => {
    const records = [item("b", 1), item("a", 0, "SKIPPED")];
    expect(partitionDay(records).next?.id).toBe("b"); records[1].progress = "PENDING"; expect(partitionDay(records).next?.id).toBe("a");
  });
  it.each(["PENDING", "COMPLETED", "SKIPPED"] as const)("validates transitions from %s", from => {
    for (const to of ["PENDING", "COMPLETED", "SKIPPED"] as const) expect(canChangeProgress(from, to)).toBe(from === "PENDING" ? to !== "PENDING" : to === "PENDING");
  });
  it("uses a deterministic id tie-break without mutating input", () => {
    const records = [item("z", 1), item("a", 1)];expect(partitionDay(records).next?.id).toBe("a");expect(records[0].id).toBe("z");
  });
});
