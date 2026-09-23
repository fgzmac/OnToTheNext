"use client";
import { useActionState, useState } from "react";
import { previewCancellationAction, recordCancellationAction, recordReleaseAction } from "@/src/modules/reservations/actions";
import { PRECISION_LABELS, AVAILABILITY_LABELS, ATTRIBUTION_LABELS } from "@/src/modules/reservations/release";
import { ReservationForm } from "./reservation-form";
export function CancellationControls({ tripId, reservationId }: { tripId: string; reservationId: string }) {
  const [state, previewAction, pending] = useActionState(previewCancellationAction, { error: null, message: null, preview: null });
  const [dismissed, setDismissed] = useState<string | null>(null);
  const preview = state.preview?.token !== dismissed ? state.preview : null;
  return <details><summary>Record cancellation</summary>
    <p>This records the cancellation in your trip. It does not contact the provider.</p>
    {preview ? <div className="cancellation-confirmation stack">
      <p>{preview.requiresAcknowledgement ? "Only record a booked reservation as cancelled after completing or confirming cancellation externally." : "This stops local reservation tracking. It does not imply that a provider booking ever existed."}</p>
      <ReservationForm action={recordCancellationAction} tripId={tripId} reservationId={reservationId} label="Confirm cancellation record">
        <input type="hidden" name="token" value={preview.token} />
        {preview.requiresAcknowledgement ? <label className="checkbox-field"><input type="checkbox" name="acknowledgement" required />I confirm the external cancellation has already been completed or confirmed with the provider.</label> : null}
        <label>Cancellation note<input name="cancellationNote" maxLength={2000} /></label>
        <div><button type="button" className="secondary" onClick={() => setDismissed(preview.token)}>Cancel</button></div>
      </ReservationForm>
    </div> : <form action={previewAction} aria-label="Review cancellation">
      <input type="hidden" name="tripId" value={tripId} /><input type="hidden" name="reservationId" value={reservationId} />
      <button disabled={pending}>{pending ? "Loading…" : "Review cancellation"}</button>
    </form>}
    {state.error ? <p role="alert">{state.error.message}</p> : null}
  </details>;
}
export function RecordReleaseForm({ tripId, reservationId }: { tripId: string; reservationId: string }) {
  const [precision, setPrecision] = useState("UNKNOWN");
  return <details><summary>Record release observation</summary>
    <p className="muted">Add a sourced observation without replacing existing evidence. The app does not independently verify user-entered sources or contact providers.</p>
    <ReservationForm action={recordReleaseAction} tripId={tripId} reservationId={reservationId} label="Save release observation" onReset={() => setPrecision("UNKNOWN")}>
      <label>Source name<input name="sourceName" maxLength={200} required /></label>
      <label>Source attribution<select name="attribution" defaultValue="USER_REPORTED">{Object.entries(ATTRIBUTION_LABELS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label>Source URL — optional<input name="sourceUrl" type="url" maxLength={2048} placeholder="https://example.com/release" /></label>
      <label>Observation<textarea name="factualText" maxLength={2000} required /></label>
      <label>Availability observation<select name="availability" defaultValue="UNKNOWN">{Object.entries(AVAILABILITY_LABELS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label>Release precision<select name="precision" value={precision} onChange={e => setPrecision(e.target.value)}>{Object.entries(PRECISION_LABELS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      {precision === "DATE_ONLY" ? <label>Release date<input type="date" name="releaseDate" required /></label> : null}
      {precision === "EXACT" ? <label>Exact release date/time with UTC offset<input name="releaseAt" placeholder="2030-03-01T10:00+09:00" required /></label> : null}
      {precision === "WINDOW" ? <>
        <label>Reported window description<input name="windowDescription" maxLength={500} placeholder="For example: sometime in early March" /></label>
        <div className="scheduling-fields"><label>Window start date — optional<input type="date" name="windowStartDate" /></label><label>Window end date — optional<input type="date" name="windowEndDate" /></label></div>
        <p className="muted">Record the reported wording or both dates. Times remain unspecified; no exact deadline is inferred.</p>
      </> : null}
      <label>Observed date/time with UTC offset<input name="observedAt" placeholder="2026-09-22T10:00+09:00" required /></label>
      <label>Recheck after — optional, with UTC offset<input name="recheckAfter" placeholder="2026-10-01T10:00+09:00" /></label>
      <p className="muted">Use an explicit offset such as +09:00 or Z (UTC), including during daylight-saving changes. Unqualified local times are not accepted.</p>
    </ReservationForm>
  </details>;
}
