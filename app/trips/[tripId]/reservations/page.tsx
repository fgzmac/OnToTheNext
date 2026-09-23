import Link from "next/link";
import { homeContextQuery } from "@/src/modules/trips/home-context";
import { notFound } from "next/navigation";
import { getTripReservations } from "@/src/modules/reservations/service";
import { reservationTime, STATE_LABELS } from "@/src/modules/reservations/domain";
import { releaseSummary } from "@/src/modules/reservations/release";
import type { ReservationDTO } from "@/src/modules/reservations/types";
import { ReservationDetails } from "@/app/components/activity-reservation";
const typeLabel = { ACTIVITY: "Activity", TRANSPORTATION: "Transportation · Departure context", HOTEL: "Hotel" };
function ReservationRow({ tripId, r, context }: { tripId: string; r: ReservationDTO; context: string }) {
  return <article className="card stack reservation-row" aria-labelledby={"reservation-" + r.id}>
    <div><h3 id={"reservation-" + r.id}>{r.title}</h3><p>{typeLabel[r.type]} · <strong>{STATE_LABELS[r.state]}</strong></p></div>
    <p>{r.state === "BOOKED" ? "Confirmed: " + reservationTime(r.confirmedDate, r.confirmedStartMinute).replace("Time unspecified", "Time not recorded") : "Desired: " + reservationTime(r.desiredDate, r.desiredStartMinute).replace("Time unspecified", "Time not recorded")}</p>
    {r.evidence.some(e => e.release) ? <ul className="release-summary">{r.evidence.filter(e => e.release).map(e => <li key={e.id}>{releaseSummary(e.release)} · {e.sourceName}{e.sourceKind === "DEVELOPMENT_FIXTURE" || e.status === "FIXTURE" ? " · Development fixture / Not live" : ""}</li>)}</ul> : <p className="muted">No release information recorded</p>}
    {r.attention.length ? <ul className="issue warning reservation-attention">{r.attention.map(reason => <li key={reason}>{reason}</li>)}</ul> : null}
    {r.itineraryItemId ? <><p className="muted">Attached to an itinerary item</p><Link href={"/trips/" + tripId + "/itinerary" + (context ? "?" + context : "") + "#item-" + r.itineraryItemId}>View itinerary details</Link></> : <>
      <p className="muted">Not attached to an itinerary item</p><details><summary>Manage retained reservation</summary><ReservationDetails tripId={tripId} reservation={r} /></details>
    </>}
  </article>;
}
export default async function ReservationsPage({ params, searchParams }: { params: Promise<{ tripId: string }>; searchParams: Promise<{ homeView?: string; homeDay?: string }> }) {
  const { tripId } = await params;
  const query = await searchParams;
  const context = homeContextQuery(query.homeView, query.homeDay);
  const home = homeContextQuery(query.homeView, query.homeDay, true);
  const result = await getTripReservations(tripId);
  if (!result.ok) { if (result.error.code === "NOT_FOUND") notFound(); return <p role="alert">{result.error.message}</p>; }
  const active = result.data.filter(r => r.state !== "CANCELLED"), cancelled = result.data.filter(r => r.state === "CANCELLED");
  return <div className="stack reservation-list"><Link href={"/trips/" + tripId + (home ? "?" + home : "")}>Back to Home</Link>
    <header><span className="eyebrow">Trip utility</span><h2>Reservations</h2><p className="muted">Follow up on bookings and recorded release information. Warnings do not change booking state.</p></header>
    {active.length ? active.map(r => <ReservationRow key={r.id} tripId={tripId} r={r} context={context} />) : <p>No active reservation tracking. Add tracking to an Activity or Transportation item in Itinerary.</p>}
    {cancelled.length ? <details className="cancelled-reservations"><summary>Cancelled reservations ({cancelled.length})</summary><div className="stack">{cancelled.map(r => <ReservationRow key={r.id} tripId={tripId} r={r} context={context} />)}</div></details> : null}
  </div>;
}
