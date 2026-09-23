"use client";
import { useActionState, type ReactNode } from "react";
import { createReservationAction, desiredTimeAction, linkEvidenceAction, markBookedAction, workflowStateAction } from "@/src/modules/reservations/actions";
import { isPlanningState, PLANNING_STATES, reservationTime, safeBookingUrl, STATE_LABELS } from "@/src/modules/reservations/domain";
import type { ActivityReservationContext, ReservationActionState } from "@/src/modules/reservations/types";
function ReservationForm({ action, tripId, itemId, reservationId, label, children }: {
  action: (previous: ReservationActionState, form: FormData) => Promise<ReservationActionState>;
  tripId: string; itemId?: string; reservationId?: string; label: string; children: ReactNode;
}) {
  const [state, submit, pending] = useActionState(action, { error: null, message: null });
  return <form action={submit} className="stack" aria-label={label}>
    <input type="hidden" name="tripId" value={tripId} />
    <input type="hidden" name="itemId" value={itemId ?? ""} />
    <input type="hidden" name="reservationId" value={reservationId ?? ""} />
    {children}<div><button disabled={pending}>{pending ? "Saving…" : label}</button></div>
    <div aria-live="polite">{state.error ? <p className="issue error" role="alert">{state.error.message}</p> : null}{state.message ? <p>{state.message}</p> : null}</div>
  </form>;
}
function StateField({ state = "CHECK_BACK" }: { state?: string }) {
  return <label>Reservation state<select name="state" defaultValue={state}>{PLANNING_STATES.map(value => <option value={value} key={value}>{STATE_LABELS[value]}</option>)}</select></label>;
}
const timeValue = (minute: number | null) => minute === null ? "" : `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;
function DesiredFields({ date, minute }: { date: string | null; minute: number | null }) {
  return <div className="scheduling-fields"><label>Desired date<input type="date" name="desiredDate" defaultValue={date ?? ""} /></label><label>Desired time<input type="time" name="desiredTime" defaultValue={timeValue(minute)} /></label></div>;
}
export function ActivityReservation({ tripId, context, date, startMinute }: { tripId: string; context: ActivityReservationContext; date: string; startMinute: number | null }) {
  const r = context.reservation;
  if (!r) return <details className="reservation-context"><summary>Add reservation tracking</summary>
    <p className="muted">Desired time starts from your itinerary as a separate snapshot. Tracking does not make a booking.</p>
    <ReservationForm action={createReservationAction} tripId={tripId} itemId={context.itemId} label="Save reservation tracking">
      <StateField /><DesiredFields date={date} minute={startMinute} />
      <label>Booking source label<input name="bookingSourceLabel" maxLength={200} /></label>
      <label>Booking URL<input name="bookingUrl" type="url" maxLength={2048} placeholder="https://example.com/booking" /></label>
      <label>Reservation notes<textarea name="notes" maxLength={2000} /></label>
    </ReservationForm>
  </details>;
  const planning = isPlanningState(r.state);
  const url = safeBookingUrl(r.bookingUrl);
  const available = context.availableEvidence.filter(e => !r.evidence.some(link => link.id === e.id));
  return <section className="reservation-context stack" aria-label="Activity reservation">
    <p className="reservation-state"><strong>Reservation: {STATE_LABELS[r.state]}</strong></p>
    <p>Desired: {reservationTime(r.desiredDate, r.desiredStartMinute)}</p>
    {r.state === "BOOKED" ? <><p>Confirmed: {reservationTime(r.confirmedDate, r.confirmedStartMinute)}</p>
      {r.confirmationReference ? <p>Confirmation: {r.confirmationReference}</p> : null}
      {(r.confirmedDate !== null && r.confirmedDate !== date) || (r.confirmedStartMinute !== null && r.confirmedStartMinute !== startMinute) ? <p className="muted">Confirmed reservation time differs from itinerary time. Both have been preserved.</p> : null}</> : null}
    {r.bookingSourceLabel ? <p>Booking source: {r.bookingSourceLabel}</p> : null}
    {url ? <p><a href={url} target="_blank" rel="noopener noreferrer">Open booking site</a><span className="muted"> · Opens externally; reservation state stays unchanged.</span></p> : null}
    {r.notes ? <p>{r.notes}</p> : null}
    {planning ? <>
      <details><summary>Change reservation state</summary><ReservationForm action={workflowStateAction} tripId={tripId} reservationId={r.id} label="Save reservation state"><StateField state={r.state} /></ReservationForm></details>
      <details><summary>Change desired time</summary><ReservationForm action={desiredTimeAction} tripId={tripId} reservationId={r.id} label="Save desired time"><DesiredFields date={r.desiredDate} minute={r.desiredStartMinute} /></ReservationForm></details>
      <details><summary>Mark booked</summary><p>Confirm the booking you made externally. This leaves your desired and itinerary times unchanged.</p>
        <ReservationForm action={markBookedAction} tripId={tripId} reservationId={r.id} label="Mark booked">
          <div className="scheduling-fields"><label>Confirmed date<input type="date" name="confirmedDate" /></label><label>Confirmed time<input type="time" name="confirmedTime" /></label></div>
          <label>Confirmation reference<input name="confirmationReference" maxLength={120} /></label>
          <label>Booking note<textarea name="notes" maxLength={2000} defaultValue={r.notes ?? ""} /></label>
        </ReservationForm>
      </details>
    </> : null}
    <div className="reservation-evidence stack"><h5>Availability evidence</h5><p className="muted">Evidence informs your planning; it does not change your reservation state.</p>
      {r.evidence.length ? r.evidence.map(e => <div key={e.id} className="evidence-record"><strong>{e.topic}</strong><p>{e.factualText}</p><p className="muted">Source: {e.sourceName} · {e.sourceKind === "DEVELOPMENT_FIXTURE" || e.status === "FIXTURE" ? "Development fixture · Not live" : e.status} · Catalog retrieval: {e.retrievedAt.slice(0, 10)}</p></div>) : <p>No evidence linked.</p>}
      {available.length ? <details><summary>Link availability evidence</summary><ReservationForm action={linkEvidenceAction} tripId={tripId} reservationId={r.id} label="Link evidence">
        <label>Availability evidence<select name="evidenceRecordId">{available.map(e => <option key={e.id} value={e.id}>{e.topic} · {e.sourceName}</option>)}</select></label>
      </ReservationForm></details> : null}
    </div>
    <p className="muted">Removing this Activity keeps its reservation and booking details; only the itinerary link is removed. The reservation remains saved to this trip.</p>
  </section>;
}
