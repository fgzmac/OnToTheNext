"use client";

import { useActionState } from "react";
import type { SegmentShape } from "@/src/modules/trips/types";
import { initialTripActionState } from "@/src/modules/trips/action-state";
import { removeSegmentAction, reorderSegmentsAction, updateSegmentAction } from "@/src/modules/trips/actions";
import { ActionMessages } from "./action-messages";

interface Props {
  segment: SegmentShape;
  displayPosition: number;
  moveUpOrder: string[] | null;
  moveDownOrder: string[] | null;
}

export function SegmentCard({ segment, displayPosition, moveUpOrder, moveDownOrder }: Props) {
  const [updateState, updateAction, updatePending] = useActionState(updateSegmentAction, initialTripActionState);
  const [removeState, removeAction, removePending] = useActionState(removeSegmentAction, initialTripActionState);
  const [reorderState, reorderAction, reorderPending] = useActionState(reorderSegmentsAction, initialTripActionState);

  return (
    <article className="card segment-card">
      <div className="row-between">
        <div className="segment-heading">
          <span className="segment-number">{displayPosition}</span>
          <div>
            <h3>{segment.baseName}</h3>
            <span className="muted">{segment.arrivalDate} → {segment.departureDate}</span>
          </div>
        </div>
        <div className="segment-actions">
          {moveUpOrder ? (
            <form action={reorderAction}>
              <input type="hidden" name="tripId" value={segment.tripId} />
              <input type="hidden" name="orderedSegmentIds" value={moveUpOrder.join(",")} />
              <button className="ghost" type="submit" disabled={reorderPending}>Move up</button>
            </form>
          ) : null}
          {moveDownOrder ? (
            <form action={reorderAction}>
              <input type="hidden" name="tripId" value={segment.tripId} />
              <input type="hidden" name="orderedSegmentIds" value={moveDownOrder.join(",")} />
              <button className="ghost" type="submit" disabled={reorderPending}>Move down</button>
            </form>
          ) : null}
        </div>
      </div>

      <form action={updateAction} className="stack">
        <input type="hidden" name="tripId" value={segment.tripId} />
        <input type="hidden" name="segmentId" value={segment.id} />
        <div className="grid grid-3">
          <label>
            City / base
            <input name="baseName" required defaultValue={segment.baseName} />
          </label>
          <label>
            Arrival
            <input name="arrivalDate" type="date" required defaultValue={segment.arrivalDate} />
          </label>
          <label>
            Departure
            <input name="departureDate" type="date" required defaultValue={segment.departureDate} />
          </label>
        </div>
        <div><button type="submit" disabled={updatePending}>{updatePending ? "Saving…" : "Save destination"}</button></div>
        <ActionMessages state={updateState} />
      </form>

      <form action={removeAction}>
        <input type="hidden" name="tripId" value={segment.tripId} />
        <input type="hidden" name="segmentId" value={segment.id} />
        <button className="danger" type="submit" disabled={removePending}>{removePending ? "Removing…" : "Remove destination"}</button>
        <ActionMessages state={removeState} />
      </form>
      <ActionMessages state={reorderState} />
    </article>
  );
}
