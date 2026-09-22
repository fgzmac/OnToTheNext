"use client";

import type { TripActionState } from "@/src/modules/trips/action-state";

export function ActionMessages({ state }: { state: TripActionState }) {
  if (state.status === "idle" && state.warnings.length === 0) return null;

  return (
    <div className="issue-list" aria-live="polite">
      {state.status === "success" && state.message ? <div className="issue success">{state.message}</div> : null}
      {state.errors.map((issue, index) => (
        <div className="issue error" key={`${issue.code}-${index}`}>{issue.message}</div>
      ))}
      {state.warnings.map((issue, index) => (
        <div className="issue warning" key={`${issue.code}-${index}`}>{issue.message}</div>
      ))}
    </div>
  );
}
