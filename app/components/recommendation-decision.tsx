"use client";

import { useActionState } from "react";
import { recommendationDecisionAction } from "@/src/modules/discover/actions";
import { decisionLabel } from "@/src/modules/discover/domain";

export function RecommendationDecision({ tripId, tripSegmentId, recommendationId, name, outcome }: {
  tripId: string; tripSegmentId: string; recommendationId: string; name: string; outcome: string | null;
}) {
  const [state, action, pending] = useActionState(recommendationDecisionAction, { error: null, message: null });
  return (
    <form action={action} className="stack">
      <input type="hidden" name="tripId" value={tripId} />
      <input type="hidden" name="tripSegmentId" value={tripSegmentId} />
      <input type="hidden" name="recommendationId" value={recommendationId} />
      <p className="decision-status">Decision: {decisionLabel(outcome)}</p>
      <div className="row">
        <button name="outcome" value="ACCEPTED" disabled={pending || outcome === "ACCEPTED"} aria-label={"Accept " + name}>Accept</button>
        <button name="outcome" value="DENIED" className="secondary" disabled={pending || outcome === "DENIED"} aria-label={"Deny " + name}>Deny</button>
      </div>
      <div aria-live="polite">
        {state.error ? <p className="issue error" role="alert">{state.error}</p> : null}
        {state.message ? <p className="muted">{state.message}</p> : null}
      </div>
    </form>
  );
}
