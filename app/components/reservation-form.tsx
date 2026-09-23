"use client";
import { useActionState, type ReactNode } from "react";
import type { ReservationActionState } from "@/src/modules/reservations/types";
export function ReservationForm({ action, tripId, itemId, reservationId, label, children, onReset }: {
  action: (previous: ReservationActionState, form: FormData) => Promise<ReservationActionState>;
  tripId: string; itemId?: string; reservationId?: string; label: string; children: ReactNode; onReset?: () => void;
}) {
  const [state, submit, pending] = useActionState(action, { error: null, message: null });
  return <form action={submit} className="stack" aria-label={label} onReset={onReset}>
    <input type="hidden" name="tripId" value={tripId} /><input type="hidden" name="itemId" value={itemId ?? ""} /><input type="hidden" name="reservationId" value={reservationId ?? ""} />
    {children}<div><button disabled={pending}>{pending ? "Saving…" : label}</button></div>
    <div aria-live="polite">{state.error ? <p className="issue error" role="alert">{state.error.message}</p> : null}{state.message ? <p>{state.message}</p> : null}</div>
  </form>;
}
