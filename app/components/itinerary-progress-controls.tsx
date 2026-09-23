"use client";
import { useActionState, useState, type ReactNode } from "react";
import { completeItemAction, restoreItemAction, previewSkipAction, confirmSkipAction, type ProgressActionState } from "@/src/modules/itinerary/progress-actions";
import type { ItineraryProgress } from "@/src/generated/prisma/enums";
const initial: ProgressActionState = { error: null, preview: null };
function Action({ action, tripId, itemId, token, label, children }: { action: (state: ProgressActionState, form: FormData) => Promise<ProgressActionState>; tripId: string; itemId: string; token: string; label: string; children?: ReactNode }) {
  const [state, submit, pending] = useActionState(action, initial);
  return <form action={submit} aria-label={label} className="stack">
    <input type="hidden" name="tripId" value={tripId} /><input type="hidden" name="itemId" value={itemId} /><input type="hidden" name="token" value={token} />
    {children}<div><button disabled={pending}>{pending ? "Saving…" : label}</button></div>
    {state.error ? <p role="alert" className="issue error">{state.error}</p> : null}
  </form>;
}
export function ItineraryProgressControls({ tripId, itemId, token, progress }: { tripId: string; itemId: string; token: string; progress: ItineraryProgress }) {
  const [state, submit, pending] = useActionState(previewSkipAction, initial);
  const [dismissed, setDismissed] = useState<string | null>(null);
  const preview = state.preview && state.preview.token !== dismissed ? state.preview : null;
  const identity = { tripId, itemId, token };
  if (progress !== "PENDING") return <Action {...identity} action={restoreItemAction} label="Restore to remaining plan" />;
  return <div className="stack progress-controls">
    <Action {...identity} action={completeItemAction} label="Mark completed" />
    {preview ? <section className="issue warning stack" aria-label={"Skip preview: " + preview.title}>
      <h4>Skip {preview.title}?</h4>
      <p>Skipping keeps this item in your itinerary. It does not cancel a reservation, contact a provider, or create a refund.</p>
      {preview.fixed ? <p><strong>This item is Fixed.</strong></p> : null}
      {preview.booked ? <p><strong>The reservation remains Booked.</strong></p> : null}
      <Action {...identity} token={preview.token} action={confirmSkipAction} label="Confirm skip">
        {preview.booked ? <label className="checkbox-field"><input type="checkbox" name="bookingAcknowledged" required />I understand this booking remains Booked; skipping does not cancel it.</label> : null}
        <div><button type="button" className="secondary" onClick={() => setDismissed(preview.token)}>Cancel</button></div>
      </Action>
    </section> : <form action={submit} aria-label="Preview skip">
      <input type="hidden" name="tripId" value={tripId} /><input type="hidden" name="itemId" value={itemId} /><input type="hidden" name="token" value={token} />
      <button className="secondary" disabled={pending}>{pending ? "Loading…" : "Skip item"}</button>
    </form>}
    {state.error ? <p role="alert" className="issue error">{state.error}</p> : null}
  </div>;
}
