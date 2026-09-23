"use client";

import { useActionState } from "react";
import type { DiscoverInterest } from "@/src/generated/prisma/enums";
import { INTEREST_OPTIONS } from "@/src/modules/discover/refinement";
import { anotherBatchAction, tripInterestsAction } from "@/src/modules/discover/actions";

export function TripInterests({ tripId, interests }: { tripId: string; interests: DiscoverInterest[] }) {
  const [state, action, pending] = useActionState(tripInterestsAction, { error: null, message: null });
  return <details className="card trip-interests">
    <summary>Interests for this trip</summary>
    <p className="muted">Optional — use these to shape future recommendation batches.</p>
    <form key={interests.join(",")} action={action} className="stack">
      <input type="hidden" name="tripId" value={tripId} />
      <fieldset disabled={pending}>
        <legend>Choose any interests</legend>
        <div className="interest-options">
          {INTEREST_OPTIONS.map(option => <label key={option.value}>
            <input type="checkbox" name="interests" value={option.value} defaultChecked={interests.includes(option.value)} />
            {option.label}
          </label>)}
        </div>
      </fieldset>
      <div className="row">
        <button name="intent" value="save" disabled={pending}>Save interests</button>
        <button name="intent" value="clear" className="secondary" disabled={pending}>Clear interests</button>
      </div>
      <div aria-live="polite">
        {state.error ? <p role="alert" className="issue error">{state.error}</p> : null}
        {state.message ? <p className="muted">{state.message}</p> : null}
      </div>
    </form>
  </details>;
}

export function AnotherBatch({ tripId, tripSegmentId, fromBatch, homeContext = "" }: { tripId: string; tripSegmentId: string; fromBatch: number; homeContext?: string }) {
  const [state, action, pending] = useActionState(anotherBatchAction, { error: null, message: null });
  return <form action={action}>
    <input type="hidden" name="tripId" value={tripId} />
    <input type="hidden" name="tripSegmentId" value={tripSegmentId} />
    <input type="hidden" name="fromBatch" value={fromBatch} />
    {[...new URLSearchParams(homeContext)].map(([name, value]) => <input key={name} type="hidden" name={name} value={value} />)}
    <button disabled={pending}>{pending ? "Preparing batch…" : "Show another batch"}</button>
    {state.error ? <p role="alert" className="issue error">{state.error}</p> : null}
  </form>;
}
