import { describe, expect, it } from "vitest";
import { hasConflictingEvidence, nextExactRelease, parseOffsetInstant, releaseSummary, releaseWarnings, sourceLocalInstant, validateRelease, type ReleaseInput } from "./release";
import { bookingAttention, orderReservations } from "./attention";
import type { ReservationDTO } from "./types";
const now = new Date("2030-03-01T00:00:00Z");
const base = { precision: "UNKNOWN", availability: "UNKNOWN", attribution: "USER_REPORTED", observedAt: "2030-02-28T10:00+09:00" };
const release = (input: ReleaseInput = {}) => { const r = validateRelease({ ...base, ...input }, now); if (!r) throw Error("Invalid test observation"); return r; };
const item = { id: "item", title: "Museum", dayId: "day", date: "2030-04-01", segmentId: "tokyo-1", startMinute: 570, durationMinutes: 60 };
const booked = { state: "BOOKED" as const, confirmedDate: "2030-04-01", confirmedStartMinute: 630, notes: null };
const trip = { startDate: "2030-04-01", endDate: "2030-04-15" };
describe("Release observations retain their recorded precision", () => {
  it("distinguishes missing information, explicit unknown and sourced not-announced", () => {
    expect(releaseSummary(null)).toBe("No release information recorded");
    expect(releaseSummary(release())).toBe("Release timing unknown");
    expect(releaseSummary(release({ precision: "NOT_ANNOUNCED" }))).toContain("Source reports: release not announced");
  });
  it.each(["2030-02-30T10:00+09:00", "2030-03-01T24:00Z", "2030-03-01T10:60Z", "2030-03-01T10:00", "2026-11-01T01:30[America/New_York]", "2026-03-08T02:30[America/New_York]", "2030-03-01T10:00-00:00", "2030-03-01T10:00+14:01", "2030-03-01T10:00+25:00"])("rejects impossible or ambiguous exact input %s", input => expect(parseOffsetInstant(input)).toBeNull());
  it("accepts explicit offsets that disambiguate a repeated local clock time", () => {
    const first = parseOffsetInstant("2026-11-01T01:30-04:00")!, second = parseOffsetInstant("2026-11-01T01:30-05:00")!;
    expect(second.instant.getTime() - first.instant.getTime()).toBe(3_600_000);
  });
  it("displays and compares exact times independently of machine time zone", () => {
    const r = release({ precision: "EXACT", releaseAt: "2030-03-02T10:30+09:00" });
    expect(r.releaseAt).toBe("2030-03-02T01:30:00.000Z"); expect(r.sourceTimeZone).toBe("+09:00");
    expect(sourceLocalInstant(r.releaseAt!, r.sourceTimeZone!)).toBe("2030-03-02 · 10:30 UTC+09:00");
    expect(nextExactRelease([r], now)).toBe(Date.parse("2030-03-02T01:30Z"));
    expect(sourceLocalInstant("2030-03-02T01:30Z", "-05:00")).toBe("2030-03-01 · 20:30 UTC-05:00");
  });
  it("never invents midnight urgency for a date-only release", () => {
    const r = release({ precision: "DATE_ONLY", releaseDate: "2030-02-01" });
    expect(releaseSummary(r)).toBe("2030-02-01 · Time not announced"); expect(r.releaseAt).toBeNull();
    expect(nextExactRelease([r], now)).toBeNull(); expect(releaseWarnings(r, now)).toEqual([]);
  });
  it("preserves date ranges and vague windows outside exact comparisons", () => {
    const dated = release({ precision: "WINDOW", windowStartDate: "2030-03-01", windowEndDate: "2030-03-07" });
    const vague = release({ precision: "WINDOW", windowDescription: "Early spring, date not specified" });
    expect(releaseSummary(dated)).toContain("Times unspecified"); expect(releaseSummary(vague)).toContain("Early spring");
    expect(nextExactRelease([dated, vague], now)).toBeNull();
  });
  it.each([
    { precision: "WINDOW", windowStartDate: "2030-03-07", windowEndDate: "2030-03-01" },
    { precision: "WINDOW", windowStartDate: "2030-03-07" }, { precision: "WINDOW" },
    { precision: "DATE_ONLY", releaseDate: "2030-02-30" }, { precision: "UNKNOWN", releaseDate: "2030-03-01" },
    { precision: "EXACT", releaseAt: "2030-03-01T10:00" }, { observedAt: "2031-01-01T00:00Z" },
    { recheckAfter: "2030-01-01T00:00Z" }, { sourceUrl: "javascript:alert(1)" },
  ])("rejects inconsistent observation %j", input => expect(validateRelease({ ...base, ...input }, now)).toBeNull());
  it("uses injected now for expiry and freshness without changing the observation", () => {
    const r = release({ precision: "EXACT", releaseAt: "2030-02-28T12:00+09:00", recheckAfter: "2030-02-28T15:00+09:00" });
    const before = structuredClone(r); expect(releaseWarnings(r, now)).toHaveLength(2); expect(r).toEqual(before);
    expect(releaseWarnings(release({ observedAt: "2029-12-01T00:00Z" }), now)[0]).toContain("Stale observation");
  });
  it("retains contradictory availability and release claims instead of selecting a winner", () => {
    expect(hasConflictingEvidence([release({ availability: "AVAILABLE" }), release({ availability: "UNAVAILABLE" })])).toBe(true);
    expect(hasConflictingEvidence([release({ precision: "NOT_ANNOUNCED" }), release({ precision: "DATE_ONLY", releaseDate: "2030-03-01" })])).toBe(true);
    expect(hasConflictingEvidence([release({ precision: "EXACT", releaseAt: "2030-03-02T10:00+09:00" }), release({ precision: "EXACT", releaseAt: "2030-03-02T01:00Z" })])).toBe(false);
  });
});
describe("Derived reservation attention", () => {
  it("keeps Booked while deriving date/time and outside-Trip warnings", () => {
    const r = { ...booked, confirmedDate: "2030-05-01" }; const reasons = bookingAttention(r, item, [], trip);
    expect(reasons).toContain("Confirmed date is outside the current Trip."); expect(reasons).toContain("Confirmed date differs from the scheduled Day.");
    expect(reasons).toContain("Confirmed time differs from the known itinerary time."); expect(r.state).toBe("BOOKED");
  });
  it("does not fabricate timing mismatches for unknown values", () => {
    expect(bookingAttention({ ...booked, confirmedDate: null, confirmedStartMinute: null }, item, [], trip)).toEqual([]);
    expect(bookingAttention(booked, { ...item, startMinute: null, durationMinutes: null }, [], trip)).toEqual([]);
  });
  it("labels detached booked records without demotion and cancelled records without urgency", () => {
    expect(bookingAttention(booked, null, [], trip)).toContain("Booked reservation is not attached to an itinerary item.");
    expect(bookingAttention({ ...booked, state: "CANCELLED" }, null, [], trip)).toEqual([]);
  });
  it("reuses same-Day/base interval logic with planned duration only", () => {
    const peer = { ...item, id: "peer", title: "Rest", startMinute: 650 };
    const reasons = bookingAttention(booked, item, [peer], trip);
    expect(reasons.some(r => r.includes("planned duration (not provider-confirmed)") && r.includes("overlaps"))).toBe(true);
    expect(bookingAttention(booked, item, [{ ...peer, segmentId: "kyoto" }], trip).some(r => r.includes("overlaps"))).toBe(false);
    expect(bookingAttention(booked, { ...item, durationMinutes: null }, [peer], trip).some(r => r.includes("overlaps"))).toBe(false);
  });
  it("preserves explicit Needs attention notes", () => expect(bookingAttention({ ...booked, state: "NEEDS_ATTENTION", notes: "Check the admission terms" }, item, [], trip)).toEqual(["Needs attention: Check the admission terms"]));
  it("orders deterministically without inventing deadlines and puts Cancelled last", () => {
    const row = { state: "CHECK_BACK", attention: [], nextRelease: null, title: "Same" } as unknown as ReservationDTO;
    const records = [{ ...row, id: "z" }, { ...row, id: "a" }, { ...row, id: "cancel", state: "CANCELLED" as const, attention: ["old"], nextRelease: 1 }, { ...row, id: "exact", nextRelease: 3 }];
    expect(orderReservations(records).map(r => r.id)).toEqual(["exact", "a", "z", "cancel"]); expect(records[0].id).toBe("z");
  });
});
