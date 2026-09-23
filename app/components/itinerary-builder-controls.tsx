"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { createPlanningBlockAction, movementAction } from "@/src/modules/itinerary/builder-actions";
import { BLOCK_TYPES, TRANSPORT_MODES, TYPE_LABELS, MODE_LABELS, isEligibleMoveDay } from "@/src/modules/itinerary/planning";
import type { PlanningSegment, SchedulingDay, TimelineItem } from "@/src/modules/itinerary/types";

type DayChoice = SchedulingDay & { base: string | null };
const label = (day: DayChoice) => day.date + " · " + (day.base ?? "Unassigned");
export function AddPlanningBlock({ tripId, days, segments, defaultDayId = "", embedded = false }: { tripId: string; days: DayChoice[]; segments: PlanningSegment[]; defaultDayId?: string; embedded?: boolean }) {
  const [type, setType] = useState<string>("FREE_TIME");
  const [state, action, pending] = useActionState(createPlanningBlockAction, { error: null, message: null });
  return <details className="card planning-block-creator" open={embedded || undefined}>
    <summary>Add planning block</summary>
    <form action={action} className="stack" aria-label="Add planning block">
      <input type="hidden" name="tripId" value={tripId} />
      <p className="muted">Plan Free Time, Hotel / Rest, or Transportation. These blocks do not create bookings.</p>
      <div className="grid grid-2">
        <label>Block type<select aria-label="Block type" name="type" value={type} onChange={event => setType(event.target.value)}>{BLOCK_TYPES.map(value => <option key={value} value={value}>{TYPE_LABELS[value]}</option>)}</select></label>
        <label>Block day<select aria-label="Block day" name="dayId" required defaultValue={defaultDayId}><option value="" disabled>Choose a day</option>{days.map(day => <option key={day.id} value={day.id}>{label(day)}</option>)}</select></label>
        <label>Block time — optional<input name="time" type="time" /></label>
        <label>Duration in minutes{type === "FREE_TIME" ? " — required" : " — optional"}<input name="duration" type="number" min="1" max="2147483647" step="1" required={type === "FREE_TIME"} /></label>
        <label>Block flexibility<select aria-label="Block flexibility" name="flexibility" defaultValue="FLEXIBLE"><option value="FLEXIBLE">Flexible</option><option value="FIXED">Fixed</option></select></label>
      </div>
      {type === "TRANSPORTATION" ? <fieldset className="stack transport-fields"><legend>Transportation details</legend>
        <label>Mode<select aria-label="Mode" name="mode" defaultValue="OTHER">{TRANSPORT_MODES.map(mode => <option key={mode} value={mode}>{MODE_LABELS[mode]}</option>)}</select></label>
        <label>Origin Segment — optional<select aria-label="Origin Segment — optional" name="originSegmentId" defaultValue=""><option value="">No origin Segment</option>{segments.map(segment => <option key={segment.id} value={segment.id}>{segment.label}</option>)}</select></label>
        <label>Destination Segment — optional<select aria-label="Destination Segment — optional" name="destinationSegmentId" defaultValue=""><option value="">No destination Segment</option>{segments.map(segment => <option key={segment.id} value={segment.id}>{segment.label}</option>)}</select></label>
        <p className="muted">For a transfer, choose a day owned by the origin Segment. Segments are optional for local transportation.</p>
      </fieldset> : null}
      <label>Block notes — optional<textarea name="notes" maxLength={2000} rows={2} /></label>
      <div><button disabled={pending}>{pending ? "Adding…" : "Add block"}</button></div>
      {state.error ? <p role="alert" className="issue error">{state.error.message}</p> : null}
      {state.message ? <p role="status">{state.message}</p> : null}
    </form>
  </details>;
}
export function ItemMovement({ tripId, dayId, item, days, first, last }: { tripId: string; dayId: string; item: TimelineItem; days: DayChoice[]; first: boolean; last: boolean }) {
  const [state, action, pending] = useActionState(movementAction, { error: null, message: null, preview: null });
  const region = useRef<HTMLElement>(null);
  const eligible = days.filter(day => isEligibleMoveDay({ ...item, dayId }, day));
  useEffect(() => { if (state.preview) region.current?.focus(); }, [state.preview]);
  return <form action={action} className="stack item-movement" aria-label={"Move " + item.title}>
    <input type="hidden" name="tripId" value={tripId} />
    <input type="hidden" name="itemId" value={item.id} />
    {state.preview ? <section ref={region} tabIndex={-1} className="move-preview stack" aria-labelledby={"preview-" + item.id}>
      <h5 id={"preview-" + item.id}>Preview move: {state.preview.title}</h5>
      <p>From: {state.preview.sourceDay}</p>
      <p>To: {state.preview.targetDay}</p>
      <p>Position: {state.preview.position}</p>
      <p>Planning flexibility: {state.preview.flexibility === "FIXED" ? "Fixed" : "Flexible"}</p>
      {state.preview.fixedWarning ? <p className="issue warning">{state.preview.fixedWarning}</p> : null}
      {state.preview.issues.length ? <ul className="conflict-list">{state.preview.issues.map((issue, index) => <li key={index}>{issue.message}</li>)}</ul> : <p>No known time conflicts.</p>}
      <p className="muted">Nothing has moved yet. Time warnings do not block your choice.</p>
      <input type="hidden" name="token" value={state.preview.token} />
      <div className="row"><button name="intent" value="CONFIRM" disabled={pending}>Confirm move</button><button className="secondary" name="intent" value="CANCEL" disabled={pending}>Cancel</button></div>
    </section> : <>
      <div className="row movement-buttons">
        <button className="secondary" name="intent" value="EARLIER" disabled={pending || first} aria-label={"Move " + item.title + " earlier"}>Move earlier</button>
        <button className="secondary" name="intent" value="LATER" disabled={pending || last} aria-label={"Move " + item.title + " later"}>Move later</button>
      </div>
      {eligible.length ? <details><summary aria-label={"Move " + item.title + " to another day"}>Move to another day</summary>
        <div className="stack move-target">
          <label>Target day<select name="targetDayId" defaultValue="" aria-label={"Target day for " + item.title}><option value="" disabled>Choose a day</option>{eligible.map(day => <option value={day.id} key={day.id}>{label(day)}</option>)}</select></label>
          <div><button className="secondary" name="intent" value="PREVIEW" disabled={pending}>Preview move</button></div>
        </div>
      </details> : <p className="muted">No other eligible day.</p>}
    </>}
    {state.error ? <p role="alert" className="issue error">{state.error.message}</p> : null}
    {state.message ? <p role="status">{state.message}</p> : null}
  </form>;
}
