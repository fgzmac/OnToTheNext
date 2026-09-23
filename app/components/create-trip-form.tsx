"use client";
import { useActionState, useState } from "react";
import { createTripAction } from "@/src/modules/trips/actions";
import { initialTripActionState } from "@/src/modules/trips/action-state";
import { ActionMessages } from "./action-messages";
export function CreateTripForm() {
  const [state, action, pending] = useActionState(createTripAction, initialTripActionState);
  const [destination, setDestination] = useState("Tokyo"), [travelers, setTravelers] = useState(1);
  return <form action={action} className="card stack trip-setup">
    <h2>Create a trip</h2>
    <label>Destination<select aria-label="Destination" name="destinationChoice" value={destination} onChange={e => setDestination(e.target.value)} required>
      <optgroup label="Curated city ideas"><option>Tokyo</option><option>Kyoto</option><option>Osaka</option></optgroup>
      <option value="Japan">Japan · choose a starting city</option><option value="OTHER_CITY">Another city</option><option value="OTHER_REGION">Another country or region</option>
    </select></label>
    {destination.startsWith("OTHER") ? <label>Destination name<input aria-label="Destination name" name="destinationLabel" required maxLength={200} /><small>Curated ideas currently cover Tokyo, Kyoto and Osaka. Manual planning works everywhere.</small></label> : null}
    {destination === "Japan" ? <label>Starting city<select aria-label="Starting city" name="startingCity" defaultValue=""><option value="">Decide later</option><option>Tokyo</option><option>Kyoto</option><option>Osaka</option></select><small>This city will cover the Trip dates initially. You can adjust destinations in Home.</small></label> : null}
    <div className="grid grid-2"><label>Start date<input name="startDate" type="date" required /></label><label>End date<input name="endDate" type="date" required /></label></div>
    <details className="setup-options"><summary>Travelers and optional details</summary><div className="stack">
      <label>Travelers<div className="traveler-stepper"><button type="button" className="secondary" aria-label="Fewer travelers" onClick={() => setTravelers(Math.max(1, travelers - 1))}>−</button><input aria-label="Travelers" name="travelerCount" type="number" min="1" value={travelers} onChange={e => setTravelers(Number(e.target.value))} /><button type="button" className="secondary" aria-label="More travelers" onClick={() => setTravelers(travelers + 1)}>+</button></div></label>
      <label>Trip name — optional<input name="name" placeholder={destination.startsWith("OTHER") ? "Your trip name" : destination + " Trip"} /></label>
      <label>Rough budget / comfort — optional<input name="budgetComfort" placeholder="What feels comfortable?" /></label>
    </div></details>
    <div><button disabled={pending}>{pending ? "Creating…" : "Start planning"}</button></div><ActionMessages state={state} />
  </form>;
}
