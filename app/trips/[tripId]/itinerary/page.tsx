import { loadTripSkeleton } from "../load-trip";

function prettyDate(dateOnly: string) {
  const date = new Date(`${dateOnly}T12:00:00.000Z`);
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }).format(date);
}

export default async function ItineraryPage({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;
  const { days, segments } = await loadTripSkeleton(tripId);
  const segmentNames = new Map(segments.map((segment) => [segment.id, segment.baseName]));

  return (
    <section className="stack">
      <div>
        <span className="eyebrow">Itinerary</span>
        <h2>Your days are ready.</h2>
        <p className="muted">Activities will appear here as you build the trip. Sprint 1 only establishes the calendar and destination ownership.</p>
      </div>
      <div className="day-list">
        {days.map((day) => (
          <div className="day-row" key={day.date}>
            <div>
              <div className="day-date">{prettyDate(day.date)}</div>
              <div className="muted">{day.date}</div>
            </div>
            {day.primarySegmentId ? (
              <div className="day-base">{segmentNames.get(day.primarySegmentId) ?? "Destination"}</div>
            ) : (
              <div className="unassigned">Unassigned</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
