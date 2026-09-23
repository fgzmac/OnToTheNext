import { AddPlanningBlock, ItemMovement } from "@/app/components/itinerary-builder-controls";
import { TYPE_LABELS, MODE_LABELS } from "@/src/modules/itinerary/planning";
import { notFound } from "next/navigation";
import { ScheduleIdea, RemoveScheduledItem } from "@/app/components/itinerary-controls";
import { getItineraryBuilder } from "@/src/modules/itinerary/service";
import { formatLocalTime } from "@/src/modules/itinerary/domain";

function prettyDate(dateOnly: string) {
  const date = new Date(`${dateOnly}T12:00:00.000Z`);
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }).format(date);
}

export default async function ItineraryPage({ params }: { params: Promise<{ tripId: string }> }) {
  const { tripId } = await params;
  const result = await getItineraryBuilder(tripId);
  if (!result.ok) {
    if (result.error.code === "NOT_FOUND") notFound();
    return <p className="issue error" role="alert">{result.error.message}</p>;
  }
  const { days, unscheduled, segments } = result.data;
  return <div className="stack itinerary-builder">
    <header>
      <span className="eyebrow">Itinerary</span>
      <h2>Your day timeline.</h2>
      <p className="muted">Choose a day for an accepted idea. Scheduling is separate from accepting an idea or making a booking.</p>
    </header>
    <section className="card stack" aria-labelledby="unscheduled-heading">
      <h2 id="unscheduled-heading">Accepted ideas not scheduled</h2>
      <p className="muted">Fixed and Flexible describe your plan. Fixed does not mean a reservation is confirmed.</p>
      {unscheduled.length ? unscheduled.map(idea => <ScheduleIdea key={idea.id} tripId={tripId} idea={idea} days={days} />)
        : <p>No accepted ideas waiting to be scheduled. You can accept ideas in Discover.</p>}
    </section>
    <AddPlanningBlock tripId={tripId} days={days} segments={segments} />
    <div className="day-list">
      {days.map((day, index) => <section className="day-row timeline-day" key={day.id} aria-labelledby={"day-" + day.id}>
        <header className="row row-between">
          <div>
            <span className="eyebrow">Day {index + 1}</span>
            <h3 className="day-date" id={"day-" + day.id}>{prettyDate(day.date)}</h3>
            <p className="muted">{day.date}</p>
          </div>
          {day.primarySegmentId ? <span className="day-base">{day.base ?? "Destination"}</span> : <span className="unassigned">Unassigned</span>}
        </header>
        {day.issues.length ? <section className="issue warning day-conflicts" aria-label={"Time warnings for " + day.date}><h4>Time warnings</h4><ul className="conflict-list">{day.issues.map((issue, index) => <li key={index}>{issue.message}</li>)}</ul></section> : null}
        {day.items.length === 0 ? <p className="muted empty-timeline">Nothing scheduled yet.</p> : <ol className="timeline-items">
          {day.items.map((item, itemIndex) => <li key={item.id}>
            <article className="timeline-item stack" aria-labelledby={"item-" + item.id}>
              <div className="row row-between">
                <span className="item-time">{formatLocalTime(item.startMinute)}</span>
                <span className="item-flexibility">{item.flexibility === "FIXED" ? "Fixed" : "Flexible"}</span>
              </div>
              <h4 id={"item-" + item.id}>{item.title}</h4>
              <p>{TYPE_LABELS[item.type]}{item.durationMinutes !== null ? " · " + item.durationMinutes + " minutes" : ""}</p>
              <p className="muted">{item.type === "ACTIVITY" ? (item.sourceRecommendationId ? "From accepted recommendation" : "Source recommendation no longer available") : "Intentional planning block"}</p>
              {item.transportationMode ? <p>Mode: {MODE_LABELS[item.transportationMode]}</p> : null}
              {item.notes ? <p>{item.notes}</p> : null}
              <ItemMovement tripId={tripId} dayId={day.id} item={item} days={days} first={itemIndex === 0} last={itemIndex === day.items.length - 1} />
              <RemoveScheduledItem tripId={tripId} itemId={item.id} title={item.title} />
            </article>
          </li>)}
        </ol>}
      </section>)}
    </div>
  </div>;
}
