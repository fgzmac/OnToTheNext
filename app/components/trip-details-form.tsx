"use client";

import { useActionState } from "react";
import type { TripShape } from "@/src/modules/trips/types";
import { updateTripAction } from "@/src/modules/trips/actions";
import { initialTripActionState } from "@/src/modules/trips/action-state";
import { ActionMessages } from "./action-messages";

export function TripDetailsForm({ trip }: { trip: TripShape }) {
  const [state, action, pending] = useActionState(updateTripAction, initialTripActionState);
  return (
    <form action={action} className="card stack">
      <input type="hidden" name="tripId" value={trip.id} />
      <div className="card-header">
        <div>
          <h2>Trip details</h2>
          <p className="muted">Sprint 1 keeps dates explicit so your calendar stays deterministic.</p>
        </div>
      </div>
      <div className="grid grid-2">
        <label>
          Trip name
          <input name="name" defaultValue={trip.name ?? ""} />
        </label>
        <label>
          Travelers
          <input name="travelerCount" type="number" min="1" required defaultValue={trip.travelerCount} />
        </label>
        <label>
          Start date
          <input name="startDate" type="date" required defaultValue={trip.startDate} />
        </label>
        <label>
          End date
          <input name="endDate" type="date" required defaultValue={trip.endDate} />
        </label>
      </div>
      <div><button type="submit" disabled={pending}>{pending ? "Saving…" : "Save trip details"}</button></div>
      <ActionMessages state={state} />
    </form>
  );
}
