"use client";

import { useActionState } from "react";
import { addSegmentAction } from "@/src/modules/trips/actions";
import { initialTripActionState } from "@/src/modules/trips/action-state";
import { ActionMessages } from "./action-messages";

export function AddSegmentForm({ tripId, defaultArrival, defaultDeparture }: { tripId: string; defaultArrival: string; defaultDeparture: string }) {
  const [state, action, pending] = useActionState(addSegmentAction, initialTripActionState);
  return (
    <form action={action} className="card stack">
      <input type="hidden" name="tripId" value={tripId} />
      <div>
        <span className="eyebrow">Route</span>
        <h2>Add a destination base</h2>
        <p className="muted">A base is a city or place where you stay, not a whole country or region.</p>
      </div>
      <div className="grid grid-3">
        <label>
          City / base
          <input name="baseName" required placeholder="Tokyo" />
        </label>
        <label>
          Arrival date
          <input name="arrivalDate" type="date" required defaultValue={defaultArrival} />
        </label>
        <label>
          Departure date
          <input name="departureDate" type="date" required defaultValue={defaultDeparture} />
        </label>
      </div>
      <div><button type="submit" disabled={pending}>{pending ? "Adding…" : "Add destination"}</button></div>
      <ActionMessages state={state} />
    </form>
  );
}
