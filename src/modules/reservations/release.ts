import type { AvailabilityObservation, EvidenceAttribution, ReleasePrecision } from "@/src/generated/prisma/enums";
import { isValidDateOnly } from "@/src/modules/trips/date-only";
import { optionalText, safeBookingUrl } from "./domain";
export const PRECISION_LABELS: Record<ReleasePrecision, string> = { UNKNOWN: "Unknown", NOT_ANNOUNCED: "Not announced", DATE_ONLY: "Known date", EXACT: "Exact time with UTC offset", WINDOW: "Reported window" };
export const AVAILABILITY_LABELS: Record<AvailabilityObservation, string> = { UNKNOWN: "Availability unknown", AVAILABLE: "Reported available", UNAVAILABLE: "Reported unavailable", LIMITED: "Reported limited" };
export const ATTRIBUTION_LABELS: Record<EvidenceAttribution, string> = { OFFICIAL: "Official source", THIRD_PARTY: "Third-party source", USER_REPORTED: "User-reported source", DEVELOPMENT_FIXTURE: "Development fixture · Not live" };
export interface ReleaseDTO {
  availability: AvailabilityObservation; precision: ReleasePrecision; releaseDate: string | null;
  releaseAt: string | null; sourceTimeZone: string | null; windowStartDate: string | null; windowEndDate: string | null;
  windowDescription: string | null; observedAt: string; recheckAfter: string | null; attribution: EvidenceAttribution;
  sourceUrl: string | null; recordedByUser: boolean;
}
export interface ReleaseInput {
  availability?: unknown; precision?: unknown; releaseDate?: unknown; releaseAt?: unknown;
  windowStartDate?: unknown; windowEndDate?: unknown; windowDescription?: unknown;
  observedAt?: unknown; recheckAfter?: unknown; attribution?: unknown; sourceUrl?: unknown;
}
// Accept only explicitly disambiguated offsets. Unqualified or named-zone local
// times are rejected rather than guessed through the machine's DST/time zone.
export function parseOffsetInstant(value: unknown): { instant: Date; offset: string } | null {
  if (typeof value !== "string") return null;
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})$/.exec(value);
  if (!match || !isValidDateOnly(match[1]) || +match[2] > 23 || +match[3] > 59 || +(match[4] ?? 0) > 59) return null;
  const offset = match[5] === "Z" ? "+00:00" : match[5];
  const hour = +offset.slice(1, 3), minute = +offset.slice(4);
  if (offset === "-00:00" || hour > 14 || minute > 59 || (hour === 14 && minute !== 0)) return null;
  const instant = new Date(value);
  return Number.isFinite(instant.getTime()) ? { instant, offset } : null;
}
export function sourceLocalInstant(instant: string, offset: string): string {
  const parsed = parseOffsetInstant("2000-01-01T00:00" + offset);
  if (!parsed) return "Source time zone unavailable";
  const minutes = (+offset.slice(1, 3) * 60 + +offset.slice(4)) * (offset[0] === "-" ? -1 : 1);
  return new Date(new Date(instant).getTime() + minutes * 60_000).toISOString().slice(0, 16).replace("T", " · ") + " UTC" + offset;
}
export function validateRelease(input: ReleaseInput, now: Date): ReleaseDTO | null {
  const precision = input.precision, availability = input.availability ?? "UNKNOWN", attribution = input.attribution;
  if (typeof precision !== "string" || !Object.hasOwn(PRECISION_LABELS, precision) || typeof availability !== "string" || !Object.hasOwn(AVAILABILITY_LABELS, availability) || typeof attribution !== "string" || !Object.hasOwn(ATTRIBUTION_LABELS, attribution)) return null;
  const observed = parseOffsetInstant(input.observedAt), recheck = input.recheckAfter ? parseOffsetInstant(input.recheckAfter) : null;
  const sourceUrl = safeBookingUrl(input.sourceUrl);
  if (!observed || observed.instant.getTime() > now.getTime() || (input.recheckAfter && !recheck) || (recheck && recheck.instant < observed.instant) || sourceUrl === undefined) return null;
  const date = optionalText(input.releaseDate, 10), start = optionalText(input.windowStartDate, 10), end = optionalText(input.windowEndDate, 10), description = optionalText(input.windowDescription, 500);
  if (date === undefined || start === undefined || end === undefined || description === undefined) return null;
  if ([date, start, end].some(d => d !== null && !isValidDateOnly(d))) return null;
  const exact = input.releaseAt ? parseOffsetInstant(input.releaseAt) : null;
  if (input.releaseAt && !exact) return null;
  if (precision === "DATE_ONLY" ? !date : date !== null) return null;
  if (precision === "EXACT" ? !exact : exact !== null) return null;
  if (precision === "WINDOW") {
    if ((!description && !(start && end)) || Boolean(start) !== Boolean(end) || (start && end && start > end)) return null;
  } else if (start || end || description) return null;
  return { precision: precision as ReleasePrecision, availability: availability as AvailabilityObservation, attribution: attribution as EvidenceAttribution,
    releaseDate: date, releaseAt: exact?.instant.toISOString() ?? null, sourceTimeZone: exact?.offset ?? null,
    windowStartDate: start, windowEndDate: end, windowDescription: description, observedAt: observed.instant.toISOString(),
    recheckAfter: recheck?.instant.toISOString() ?? null, sourceUrl, recordedByUser: true };
}
export function releaseSummary(release: ReleaseDTO | null): string {
  if (!release) return "No release information recorded";
  switch (release.precision) {
    case "UNKNOWN": return "Release timing unknown";
    case "NOT_ANNOUNCED": return "Source reports: release not announced";
    case "DATE_ONLY": return `${release.releaseDate} · Time not announced`;
    case "EXACT": return sourceLocalInstant(release.releaseAt!, release.sourceTimeZone!);
    case "WINDOW": return "Reported window: " + [release.windowStartDate ? `${release.windowStartDate} to ${release.windowEndDate} · Times unspecified` : null, release.windowDescription].filter(Boolean).join(" · ");
  }
}
export function releaseWarnings(release: ReleaseDTO | null, now: Date): string[] {
  if (!release) return [];
  const warnings: string[] = [];
  if (release.recheckAfter && new Date(release.recheckAfter) <= now) warnings.push("Evidence needs rechecking: its recorded recheck time has passed.");
  else if (now.getTime() - new Date(release.observedAt).getTime() >= 30 * 86_400_000) warnings.push("Stale observation: recorded at least 30 days ago; recheck the source.");
  if (release.precision === "EXACT" && release.releaseAt && new Date(release.releaseAt) <= now) warnings.push("Reported release time has passed; recheck the source. Availability is not inferred.");
  return warnings;
}
export function hasConflictingEvidence(releases: ReleaseDTO[]): boolean {
  const availability = new Set(releases.map(r => r.availability).filter(v => v !== "UNKNOWN"));
  const exact = new Set(releases.filter(r => r.precision === "EXACT").map(r => r.releaseAt));
  const dates = new Set(releases.filter(r => r.precision === "DATE_ONLY").map(r => r.releaseDate));
  const announced = releases.some(r => ["EXACT", "DATE_ONLY", "WINDOW"].includes(r.precision));
  return availability.size > 1 || exact.size > 1 || dates.size > 1 || (announced && releases.some(r => r.precision === "NOT_ANNOUNCED"));
}
export function nextExactRelease(releases: ReleaseDTO[], now: Date): number | null {
  const times = releases.filter(r => r.precision === "EXACT" && r.releaseAt).map(r => new Date(r.releaseAt!).getTime()).filter(t => t > now.getTime());
  return times.length ? Math.min(...times) : null;
}
