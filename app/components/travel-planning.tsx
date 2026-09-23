"use client";
import { useActionState, useState, type ReactNode } from "react";
import type { TravelDTO } from "@/src/modules/itinerary/travel/service";
import { saveTravelAction, clearTravelAction, reconfirmTravelAction, type TravelActionState } from "@/src/modules/itinerary/travel/actions";
import { formatLocalTime } from "@/src/modules/itinerary/domain";
import { TravelSummary } from "./travel-summary";
function Action({ tripId, travel, action, label, children }: { tripId: string; travel: TravelDTO; action: (state: TravelActionState, form: FormData) => Promise<TravelActionState>; label: string; children?: ReactNode }) {
  const [state, submit, pending] = useActionState(action, { error: null });
  return <form action={submit} className="stack" aria-label={label}>
    <input type="hidden" name="tripId" value={tripId} /><input type="hidden" name="itemId" value={travel.itemId} /><input type="hidden" name="token" value={travel.token} />
    {children}<div><button disabled={pending}>{pending ? "Saving…" : label}</button></div>
    {state.error ? <p role="alert" className="issue error">{state.error}</p> : null}
  </form>;
}
function Acknowledgement() { return <label className="checkbox-field"><input type="checkbox" name="plannedAcknowledged" required />I choose the planned start despite the different confirmed booking time.</label>; }
type Props = { tripId: string; travel: TravelDTO; transportation: boolean };
export function TravelPlanning(props: Props) {
  return <details className="travel-planning"><summary>Travel planning</summary><TravelPlanningBody key={props.travel.token} {...props} /></details>;
}
function TravelPlanningBody({ tripId, travel, transportation }: Props) {
  const p = travel.inputs;
  const [origin, setOrigin] = useState(p?.originKind ?? "");
  const [basis, setBasis] = useState(p?.basis ?? "");
  const prefix = "travel-" + travel.itemId;
  return <div className="stack">
      {transportation ? <p>Estimate getting to this departure point. Travel minutes here are separate from the train ride, flight or other journey duration.</p> : <p>Travel minutes are separate from the activity duration.</p>}
      <TravelSummary travel={travel} />
      <p>Planned: {travel.planned.date} · {formatLocalTime(travel.planned.minute)}</p>
      <p>Confirmed: {travel.confirmed ? travel.confirmed.state + " · " + (travel.confirmed.date ?? "Date unknown") + " · " + formatLocalTime(travel.confirmed.minute) : "No attached reservation"}</p>
      {travel.needsAcknowledgement ? <p className="issue warning">Planned and confirmed timing differ. Choose the basis deliberately; saving travel planning does not retime either record.</p> : null}
      {travel.editable ? <Action tripId={tripId} travel={travel} action={saveTravelAction} label="Save travel plan">
        <label><span id={prefix + "-origin"}>Starting context</span><select aria-labelledby={prefix + "-origin"} name="originKind" value={origin} onChange={e => setOrigin(e.target.value as typeof origin)} required>
          <option value="">Choose starting context</option><option value="ENTERED">Entered starting point</option><option value="EARLIER_ITEM">Earlier itinerary item</option>
        </select></label>
        {origin === "ENTERED" ? <label>Starting point label<input name="originLabel" minLength={2} maxLength={160} defaultValue={p?.originKind === "ENTERED" ? p.originLabel : ""} required /></label> : null}
        {origin === "EARLIER_ITEM" ? <label><span id={prefix + "-source"}>Earlier planned stop</span><select aria-labelledby={prefix + "-source"} name="sourceItemId" defaultValue={p?.sourceItemId ?? ""} required><option value="">Choose a valid earlier stop</option>{p?.sourceItemId && !travel.originOptions.some(o => o.id === p.sourceItemId) ? <option value={p.sourceItemId} disabled>{p.originLabel} (unavailable)</option> : null}{travel.originOptions.map(o => <option key={o.id} value={o.id}>{o.title}</option>)}</select></label> : null}
        <div className="grid grid-2"><label>Estimated travel minutes (0–1440)<input type="number" name="travelMinutes" min={0} max={1440} step={1} defaultValue={p?.travelMinutes ?? ""} required /></label>
        <label>Arrival buffer minutes (0–240)<input type="number" name="bufferMinutes" min={0} max={240} step={1} defaultValue={p?.bufferMinutes ?? ""} required /></label></div>
        <label><span id={prefix + "-basis"}>Timing basis</span><select aria-labelledby={prefix + "-basis"} name="basis" value={basis} onChange={e => setBasis(e.target.value as typeof basis)} required><option value="">Choose timing basis</option><option value="PLANNED">Itinerary planned start</option><option value="CONFIRMED">Confirmed reservation start</option></select></label>
        <p className="muted">Different time zones or clock-change ambiguity require review.</p><label><span id={prefix + "-clock"}>Clock assumptions</span><select aria-labelledby={prefix + "-clock"} name="clockContext" defaultValue={p?.clockContext ?? ""} required><option value="">Choose clock assumptions</option><option value="SAME_LOCAL_CLOCK">Same clock; no ambiguity</option><option value="REQUIRES_REVIEW">Different or uncertain clocks</option></select></label>
        {basis === "PLANNED" && travel.needsAcknowledgement ? <Acknowledgement /> : null}
      </Action> : <p className="muted">Travel editing requires a Pending Activity or Transportation item without a Cancelled reservation. Existing inputs are retained.</p>}
      {travel.canReconfirm ? <Action tripId={tripId} travel={travel} action={reconfirmTravelAction} label="Reconfirm travel estimate">{p?.basis === "PLANNED" && travel.needsAcknowledgement ? <Acknowledgement /> : null}</Action> : null}
      {p ? <Action tripId={tripId} travel={travel} action={clearTravelAction} label="Clear travel plan" /> : null}
    </div>;
}
