import Link from "next/link";
import { TravelSummary } from "./travel-summary";
import { notFound } from "next/navigation";
import { getTodayView, type TodayItem } from "@/src/modules/today/service";
import { TYPE_LABELS } from "@/src/modules/itinerary/planning";
import { PROGRESS_LABELS } from "@/src/modules/itinerary/progress";
import { formatLocalTime } from "@/src/modules/itinerary/domain";
import { STATE_LABELS, reservationTime } from "@/src/modules/reservations/domain";
import { ItineraryProgressControls } from "./itinerary-progress-controls";
function Item({ tripId, dayId, date, item, unavailable }: { tripId: string; dayId: string; date: string; item: TodayItem; unavailable: boolean }) {
  const r = item.reservation;
  const query = new URLSearchParams({ homeView: "day", homeDay: dayId });
  return <article className="card stack day-view-item" aria-labelledby={"today-item-" + item.id}>
    <div className="row row-between"><strong className="planned-time">{item.startMinute === null ? "Time not set" : formatLocalTime(item.startMinute)}</strong><span>{item.flexibility === "FIXED" ? "Fixed" : "Flexible"}</span></div>
    <h3 id={"today-item-" + item.id}>{item.title}</h3>
    <p>{TYPE_LABELS[item.type]}{item.durationMinutes !== null ? " · " + item.durationMinutes + " minutes" : ""} · <strong className="progress-label">{PROGRESS_LABELS[item.progress]}</strong></p>
    {unavailable ? <p role="alert">Reservation context unavailable. Open the itinerary or refresh before relying on booking details.</p> : r ? <div className="stack today-reservation">
      <p className="reservation-state"><strong>Reservation: {STATE_LABELS[r.state]}</strong></p>
      {r.type === "TRANSPORTATION" ? <p className="muted">Departure context</p> : null}
      {r.state === "BOOKED" || r.confirmedDate || r.confirmedStartMinute !== null ? <><p>Confirmed: {reservationTime(r.confirmedDate, r.confirmedStartMinute).replace("Time unspecified", "Time not recorded")}</p><p>Planned: {date} · {item.startMinute === null ? "Time not set" : formatLocalTime(item.startMinute)}</p></> : null}
      {r.state === "CANCELLED" ? <p className="issue warning">This reservation is Cancelled. The itinerary item remains in your plan.</p> : null}
      {r.attention.length ? <ul className="issue warning">{r.attention.map(reason => <li key={reason}>{reason}</li>)}</ul> : null}
      {r.confirmationReference ? <details><summary>Private trip booking details</summary><p>Confirmation reference: {r.confirmationReference}</p><p className="muted">A reference is not an admission ticket. Verify entry requirements with your provider.</p></details> : null}
    </div> : <p className="muted">No reservation linked.</p>}
    {(item.type === "ACTIVITY" || item.type === "TRANSPORTATION") ? <>{item.type === "TRANSPORTATION" ? <p className="muted">Travel estimate to the departure point, separate from the journey duration.</p> : null}<TravelSummary travel={item.travel} unavailable={item.travelUnavailable} /></> : null}
    <Link href={"/trips/" + tripId + "/itinerary?" + query + "#item-" + item.id}>Manage this item in Itinerary</Link>
    <ItineraryProgressControls key={item.token} tripId={tripId} itemId={item.id} token={item.token} progress={item.progress} />
    {item.progressChangedAt ? <details><summary>Progress record</summary><p className="muted">Action recorded (UTC): {item.progressChangedAt}. This is not verified attendance or payment.</p></details> : null}
  </article>;
}
export async function TodayView({ tripId, dayId }: { tripId: string; dayId?: string }) {
  const result = await getTodayView(tripId, dayId);
  if (!result.ok) { if (result.error.code === "NOT_FOUND") notFound(); return <p role="alert">{result.error.message}</p>; }
  const { days, selected, invalidDay, plan, reservationUnavailable } = result.data;
  const item = (value: TodayItem) => <Item key={value.id} tripId={tripId} dayId={selected!.id} date={selected!.date} item={value} unavailable={reservationUnavailable} />;
  return <section className="stack today-view" aria-label="Day view">
    <header><span className="eyebrow">Your selected plan</span><h2>{selected ? "Day view · " + selected.date : "Choose a day"}</h2><p className="muted">Select a trip date explicitly. This view does not infer today&apos;s date or progress from the clock.</p></header>
    <form method="get" action={"/trips/" + tripId} className="row day-selector" aria-label="Select trip day">
      <input type="hidden" name="view" value="day" />
      <label><span id="trip-day-label">Trip day</span><select aria-labelledby="trip-day-label" name="day" defaultValue={selected?.id ?? ""} key={selected?.id ?? ""} required><option value="">Choose a day</option>{days.map(d => <option key={d.id} value={d.id}>{d.date} · {d.context}</option>)}</select></label>
      <button>Show day</button>
    </form>
    {invalidDay ? <p role="alert">That day is unavailable in this trip. Select one of the listed days.</p> : null}
    {selected ? <>
      <p className="day-segment">{selected.context}</p>
      {reservationUnavailable ? <p role="alert" className="issue warning">Reservation context is unavailable; booking state has not been inferred.</p> : null}
      {plan.empty ? <p className="card">Nothing scheduled for this day. An empty day is not an intentional Free Time block.</p> : <>
        {plan.next ? <section className="stack next-in-plan" aria-label="Next in your plan"><h2>Next in your plan</h2>{item(plan.next)}</section> : <p className="card">No pending items for this day.</p>}
        {plan.remaining.length ? <section className="stack" aria-label="Remaining plan"><h2>Remaining plan</h2>{plan.remaining.map(item)}</section> : null}
        {plan.processed.length ? <details className="processed-plan"><summary>Completed / Skipped ({plan.processed.length})</summary><div className="stack">{plan.processed.map(item)}</div></details> : null}
      </>}
      <p className="muted">Completed does not mean Paid. Skipped does not mean Cancelled. Manage scheduling and bookings in Itinerary.</p>
    </> : null}
  </section>;
}
