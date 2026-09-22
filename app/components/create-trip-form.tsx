"use client";

import { useActionState } from "react";
import { createTripAction } from "@/src/modules/trips/actions";
import { initialTripActionState } from "@/src/modules/trips/action-state";
import { ActionMessages } from "./action-messages";

export function CreateTripForm() {
  const [state, action, pending] = useActionState(createTripAction, initialTripActionState);

  return (
    <form action={action} className="card stack">
      <div className="card-header">
        <div>
          <span className="eyebrow">Start simple</span>
          <h2>Create a trip</h2>
          <p className="muted">Give the trip a destination and dates. Cities can be added one at a time.</p>
        </div>
      </div>

      <div className="grid grid-2">
        <label>
          Trip name <span className="muted">(optional)</span>
          <input name="name" placeholder="Japan spring trip" />
        </label>
        <label>
          Destination
          <input name="destinationLabel" required placeholder="Japan or Tokyo" />
        </label>
        <label>
          Destination type
          <select name="destinationScope" defaultValue="COUNTRY_REGION">
            <option value="COUNTRY_REGION">Country / region</option>
            <option value="CITY_BASE">Specific city / base</option>
          </select>
        </label>
        <label>
          Travelers
          <input name="travelerCount" type="number" min="1" defaultValue="1" required />
        </label>
        <label>
          Start date
          <input name="startDate" type="date" required />
        </label>
        <label>
          End date
          <input name="endDate" type="date" required />
        </label>
      </div>

      <label>
        Rough budget / comfort <span className="muted">(optional)</span>
        <input name="budgetComfort" placeholder="Value-conscious, comfortable" />
      </label>

      <div className="row">
        <button type="submit" disabled={pending}>{pending ? "Creating…" : "Create trip"}</button>
      </div>
      <ActionMessages state={state} />
    </form>
  );
}
