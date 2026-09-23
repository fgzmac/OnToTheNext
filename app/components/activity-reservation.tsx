"use client";
import { createReservationAction, createTransportationAction, desiredTimeAction, linkEvidenceAction, markBookedAction, notesAction, workflowStateAction } from "@/src/modules/reservations/actions";
import { isPlanningState, PLANNING_STATES, reservationTime, safeBookingUrl, STATE_LABELS } from "@/src/modules/reservations/domain";
import type { ActivityReservationContext, EvidenceDTO, ReservationDTO } from "@/src/modules/reservations/types";
import { ReservationForm } from "./reservation-form";
import { CancellationControls, RecordReleaseForm } from "./reservation-followup-controls";
import { ReservationEvidenceRecord } from "./reservation-evidence";
function StateField({ state = "CHECK_BACK" }: { state?: string }) {
  return <label>Reservation state<select name="state" defaultValue={state}>{PLANNING_STATES.map(value => <option value={value} key={value}>{STATE_LABELS[value]}</option>)}</select></label>;
}
const timeValue = (minute: number | null) => minute === null ? "" : `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
function DesiredFields({ date, minute }: { date: string | null; minute: number | null }) {
  return <div className="scheduling-fields"><label>Desired date<input type="date" name="desiredDate" defaultValue={date ?? ""} /></label><label>Desired time<input type="time" name="desiredTime" defaultValue={timeValue(minute)} /></label></div>;
}
const displayTime = (date: string | null, minute: number | null) => reservationTime(date, minute).replace("Time unspecified", "Time not recorded");
export function ActivityReservation({ tripId, context, date, startMinute }: { tripId: string; context: ActivityReservationContext; date: string; startMinute: number | null }) {
  if (context.reservation) return <ReservationDetails tripId={tripId} reservation={context.reservation} availableEvidence={context.availableEvidence} />;
  return <details className="reservation-context"><summary>Add reservation tracking</summary>
    {context.itemType === "TRANSPORTATION" ? <p>Transportation times describe departure context.</p> : null}
    <p className="muted">Desired time starts from your itinerary as a separate snapshot. Tracking does not make a booking.</p>
    <ReservationForm action={context.itemType === "TRANSPORTATION" ? createTransportationAction : createReservationAction} tripId={tripId} itemId={context.itemId} label="Save reservation tracking">
      <StateField /><DesiredFields date={date} minute={startMinute} />
      <label>Booking source label<input name="bookingSourceLabel" maxLength={200} /></label><label>Booking URL<input name="bookingUrl" type="url" maxLength={2048} placeholder="https://example.com/booking" /></label><label>Reservation notes<textarea name="notes" maxLength={2000} /></label>
    </ReservationForm>
  </details>;
}
export function ReservationDetails({ tripId, reservation: r, availableEvidence = [] }: { tripId: string; reservation: ReservationDTO; availableEvidence?: EvidenceDTO[] }) {
  const planning = isPlanningState(r.state), url = safeBookingUrl(r.bookingUrl);
  const available = availableEvidence.filter(e => !r.evidence.some(link => link.id === e.id));
  return <section className="reservation-context stack" aria-label="Reservation details">
    <p className="reservation-state"><strong>Reservation: {STATE_LABELS[r.state]}</strong></p>
    {r.type === "TRANSPORTATION" ? <p className="muted">Transportation · Departure context</p> : null}
    <p>Desired: {displayTime(r.desiredDate, r.desiredStartMinute)}</p>
    {r.state === "BOOKED" || r.confirmedDate || r.confirmedStartMinute !== null || r.confirmationReference ? <><p>Confirmed: {displayTime(r.confirmedDate, r.confirmedStartMinute)}</p>{r.confirmationReference ? <p>Confirmation: {r.confirmationReference}</p> : null}</> : null}
    {r.attention.length ? <div className="reservation-attention issue warning"><strong>Review needed</strong><ul>{r.attention.map(reason => <li key={reason}>{reason}</li>)}</ul>
      {r.attention.some(reason => reason.startsWith("Confirmed time differs") || reason.startsWith("Confirmed date differs")) ? <p>Confirmed reservation time differs from itinerary time. Both have been preserved.</p> : null}
    </div> : null}
    {r.cancelledAt ? <div><p>Cancellation recorded locally (UTC): {r.cancelledAt}</p>{r.cancellationNote ? <p>Cancellation note: {r.cancellationNote}</p> : null}<p className="muted">The app did not contact the provider. Existing itinerary and confirmation details were retained.</p></div> : null}
    {r.bookingSourceLabel ? <p>Booking source: {r.bookingSourceLabel}</p> : null}
    {url ? <p><a href={url} target="_blank" rel="noopener noreferrer">Open booking site</a><span className="muted"> · Opens externally; reservation state stays unchanged.</span></p> : null}
    {r.notes ? <p>{r.notes}</p> : null}
    <details><summary>Edit reservation notes</summary><ReservationForm action={notesAction} tripId={tripId} reservationId={r.id} label="Save reservation notes"><label>Reservation notes<textarea name="notes" maxLength={2000} defaultValue={r.notes ?? ""} /></label></ReservationForm></details>
    {planning ? <>
      <details><summary>Change reservation state</summary><ReservationForm action={workflowStateAction} tripId={tripId} reservationId={r.id} label="Save reservation state"><StateField state={r.state} /><label>Reason / note — optional<textarea name="notes" maxLength={2000} defaultValue={r.notes ?? ""} /></label></ReservationForm></details>
      <details><summary>Change desired time</summary><ReservationForm action={desiredTimeAction} tripId={tripId} reservationId={r.id} label="Save desired time"><DesiredFields date={r.desiredDate} minute={r.desiredStartMinute} /></ReservationForm></details>
      <details><summary>Mark booked</summary><p>Confirm the booking you made externally. This leaves your desired and itinerary times unchanged.</p>
        <ReservationForm action={markBookedAction} tripId={tripId} reservationId={r.id} label="Mark booked">
          <div className="scheduling-fields"><label>Confirmed date<input type="date" name="confirmedDate" /></label><label>Confirmed time<input type="time" name="confirmedTime" /></label></div>
          <label>Confirmation reference<input name="confirmationReference" maxLength={120} /></label><label>Booking note<textarea name="notes" maxLength={2000} defaultValue={r.notes ?? ""} /></label>
        </ReservationForm>
      </details>
    </> : null}
    <details className="reservation-evidence"><summary>Availability and release evidence</summary><div className="stack">
      <p className="muted">Evidence informs your planning; it does not change your reservation state.</p>
      {r.evidence.length ? r.evidence.map(e => <ReservationEvidenceRecord key={e.id} evidence={e} />) : <p>No release information recorded. Availability unknown.</p>}
      {available.length ? <details><summary>Link availability evidence</summary><ReservationForm action={linkEvidenceAction} tripId={tripId} reservationId={r.id} label="Link evidence"><label>Availability evidence<select name="evidenceRecordId">{available.map(e => <option key={e.id} value={e.id}>{e.topic} · {e.sourceName} · {e.retrievedAt.slice(0, 10)}</option>)}</select></label></ReservationForm></details> : null}
      {r.sourceAvailable ? <RecordReleaseForm tripId={tripId} reservationId={r.id} /> : <p className="muted">No eligible source Place is available for adding or linking evidence. Previously linked evidence and reservation details remain saved.</p>}
    </div></details>
    {r.state !== "CANCELLED" ? <CancellationControls tripId={tripId} reservationId={r.id} /> : null}
    {r.itineraryItemId ? <p className="muted">Removing this {r.type === "ACTIVITY" ? "Activity" : "Transportation item"} keeps its reservation and booking details; only the itinerary link is removed. Find retained reservations through Home’s Reservations utility.</p> : <p className="muted">Not attached to an itinerary item. This reservation remains saved to your trip.</p>}
  </section>;
}
