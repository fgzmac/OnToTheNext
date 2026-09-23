import { TodayView } from "@/app/components/today-view";
import Link from "next/link";
import { homeContextQuery } from "@/src/modules/trips/home-context";
import { AddSegmentForm } from "@/app/components/add-segment-form";
import { SegmentCard } from "@/app/components/segment-card";
import { TripDetailsForm } from "@/app/components/trip-details-form";
import { loadTripSkeleton } from "./load-trip";

export default async function TripHomePage({ params, searchParams }: { params: Promise<{ tripId: string }>; searchParams: Promise<{ view?: string; day?: string }> }) {
  const { tripId } = await params;
  const query = await searchParams;
  const dayId = typeof query.day === "string" ? query.day : undefined;
  const dayMode = query.view === "day";
  const utilityContext = homeContextQuery(query.view, dayId);
  const href = (view: string) => "/trips/" + tripId + "?" + new URLSearchParams({ view, ...(dayId ? { day: dayId } : {}) });
  const modes = <div className="home-modes row" role="group" aria-label="Home mode"><Link aria-current={!dayMode ? "page" : undefined} href={href("planning")}>Planning</Link><Link aria-current={dayMode ? "page" : undefined} href={href("day")}>Today / Day view</Link></div>;
  const { trip, segments, unassignedDates } = await loadTripSkeleton(tripId);
  if (dayMode) return <div className="stack">{modes}<TodayView tripId={tripId} dayId={dayId} /></div>;
  const ids = segments.map((segment) => segment.id);

  const makeMoveOrder = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= ids.length) return null;
    const next = [...ids];
    [next[index], next[target]] = [next[target], next[index]];
    return next;
  };

  const nextUnassigned = unassignedDates[0] ?? trip.startDate;

  return (
    <div className="stack">
      {modes}
      {unassignedDates.length > 0 ? (
        <div className="issue warning">
          {unassignedDates.length} date{unassignedDates.length === 1 ? " is" : "s are"} still Unassigned. That is allowed while you build the route.
        </div>
      ) : (
        <div className="issue success">Every trip date currently has a destination base.</div>
      )}

      <section aria-label="Trip utilities"><Link className="button secondary" href={"/trips/" + tripId + "/reservations" + (utilityContext ? "?" + utilityContext : "")}>Reservations</Link></section>

      <section>
        <div className="card-header">
          <div>
            <span className="eyebrow">Route</span>
            <h2>Destination sequence</h2>
            <p className="muted">Transfer days belong to the place where you start the day. The same city can appear more than once.</p>
          </div>
        </div>

        {segments.length === 0 ? (
          <div className="card">
            <h3>Where will you stay first?</h3>
            <p className="muted">Your trip has dates, but no city/base yet. Add the first real place you will stay.</p>
          </div>
        ) : (
          <div className="segment-list">
            {segments.map((segment, index) => (
              <SegmentCard
                key={segment.id}
                segment={segment}
                displayPosition={index + 1}
                moveUpOrder={makeMoveOrder(index, -1)}
                moveDownOrder={makeMoveOrder(index, 1)}
              />
            ))}
          </div>
        )}
      </section>

      <AddSegmentForm tripId={trip.id} defaultArrival={nextUnassigned} defaultDeparture={trip.endDate} />
      <TripDetailsForm trip={trip} />
    </div>
  );
}
