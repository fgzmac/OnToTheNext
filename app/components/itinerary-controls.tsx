"use client";

import { useActionState } from "react";
import { removeItineraryItemAction, scheduleRecommendationAction } from "@/src/modules/itinerary/actions";
import type { SchedulingDay, UnscheduledIdea } from "@/src/modules/itinerary/types";

export function ScheduleIdea({ tripId, idea, days }: { tripId: string; idea: UnscheduledIdea; days: SchedulingDay[] }) {
  const [state, action, pending] = useActionState(scheduleRecommendationAction, { error: null, message: null });
  const eligible = days.filter(day => day.primarySegmentId === idea.segmentId);
  return <article className="unscheduled-idea stack" aria-labelledby={"idea-" + idea.id}>
    <div>
      <h3 id={"idea-" + idea.id}>{idea.title}</h3>
      <p className="muted">{idea.segmentLabel}</p>
      {idea.durationMinutes !== null ? <p>{idea.durationMinutes} minutes · Planning estimate</p> : null}
    </div>
    {eligible.length === 0 ? <p className="issue warning">No day is currently owned by this destination. Update the trip structure in Home before scheduling this idea.</p> : <form action={action} className="stack">
      <input type="hidden" name="tripId" value={tripId} />
      <input type="hidden" name="recommendationId" value={idea.id} />
      <div className="scheduling-fields">
        <label>Day
          <select name="dayId" required aria-label={"Day for " + idea.title} defaultValue="">
            <option value="" disabled>Choose a day</option>
            {eligible.map(day => <option key={day.id} value={day.id}>{day.date} · {idea.segmentLabel.split(" · ")[0]}</option>)}
          </select>
        </label>
        <label>Time — optional
          <input name="time" type="time" aria-label={"Time for " + idea.title} />
        </label>
        <label>Planning flexibility
          <select name="flexibility" defaultValue="FLEXIBLE" aria-label={"Flexibility for " + idea.title}>
            <option value="FLEXIBLE">Flexible</option>
            <option value="FIXED">Fixed</option>
          </select>
        </label>
      </div>
      <div><button disabled={pending} aria-label={"Add " + idea.title + " to itinerary"}>{pending ? "Adding…" : "Add to itinerary"}</button></div>
      <div aria-live="polite">
        {state.error ? <p className="issue error" role="alert">{state.error.message}</p> : null}
        {state.message ? <p>{state.message}</p> : null}
      </div>
    </form>}
  </article>;
}

export function RemoveScheduledItem({ tripId, itemId, title }: { tripId: string; itemId: string; title: string }) {
  const [state, action, pending] = useActionState(removeItineraryItemAction, { error: null, message: null });
  return <form action={action}>
    <input type="hidden" name="tripId" value={tripId} />
    <input type="hidden" name="itemId" value={itemId} />
    <button className="secondary" disabled={pending} aria-label={"Remove " + title + " from itinerary"}>{pending ? "Removing…" : "Remove"}</button>
    {state.error ? <p className="issue error" role="alert">{state.error.message}</p> : null}
  </form>;
}
