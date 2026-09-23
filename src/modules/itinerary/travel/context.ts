import { fingerprint } from "../preview-token";
import type { TravelContext, TravelInputs, TravelItemContext } from "./domain";
// Only facts that affect departure assumptions belong here. Notes, evidence,
// unrelated reservation details and shared mutation revisions are excluded.
export function targetFacts(t: TravelItemContext) {
  return { id: t.id, tripId: t.tripId, title: t.title, type: t.type, dayId: t.dayId, date: t.date,
    position: t.position, startMinute: t.startMinute, segment: t.segment, originSegmentId: t.originSegmentId, booking: t.booking };
}
export function sourceFacts(s: TravelItemContext | null) {
  return s ? { id: s.id, tripId: s.tripId, title: s.title, dayId: s.dayId, date: s.date, position: s.position,
    startMinute: s.startMinute, durationMinutes: s.durationMinutes, segment: s.segment, skipped: s.progress === "SKIPPED" } : null;
}
export function reviewedContext(c: TravelContext, input: TravelInputs): string {
  return fingerprint({ target: targetFacts(c.target), tripStart: c.tripStart, tripEnd: c.tripEnd,
    originKind: input.originKind, sourceItemId: input.sourceItemId, source: input.originKind === "EARLIER_ITEM" ? sourceFacts(c.source) : null,
    basis: input.basis, clockContext: input.clockContext });
}
