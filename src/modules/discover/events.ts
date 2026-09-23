import type { EventOccurrence } from "./tokyo-pilot";
export type EventClock = () => Date;
const systemClock: EventClock = () => new Date();
function validDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
}
// Trip/Day values are civil dates in the event's named time zone. Only the
// injected current instant is converted; browser/server machine zones are irrelevant.
export function eventMatches(event: EventOccurrence, start: string, end = start, clock: EventClock = systemClock): boolean {
  try {
    const today = new Intl.DateTimeFormat("en-CA", { timeZone: event.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(clock());
    return event.status === "PUBLISHED" && !!event.startDate && !!event.endDate
      && [event.startDate, event.endDate, start, end, event.observedAt, event.recheckAfter, today].every(validDate)
      && event.startDate <= event.endDate && start <= end && event.observedAt <= today && today <= event.recheckAfter
      && today <= event.endDate && event.startDate <= end && event.endDate >= start;
  } catch { return false; }
}
export function eventReviewWarning(event: EventOccurrence | undefined, date: string, clock: EventClock = systemClock): string | null {
  if (!event) return null;
  if (!eventMatches(event, date, date, clock)) return "Event dates or source status need review. Your saved item and reservation have not been changed; check the organizer.";
  return "Event occurrence was manually checked on " + event.observedAt + ". Session access and availability are unconfirmed; check the organizer.";
}
