"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { saveComposerInterests } from "@/src/modules/itinerary/composer-actions";

import { useActionState, useState, useTransition } from "react";
import type { DiscoverInterest } from "@/src/generated/prisma/enums";
import { INTEREST_OPTIONS } from "@/src/modules/discover/refinement";
import { anotherBatchAction } from "@/src/modules/discover/actions";

export function TripInterests({ tripId, interests }: { tripId: string; interests: DiscoverInterest[] }) {
  const [confirmed, setConfirmed] = useState(interests), [error, setError] = useState<string | null>(null), [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();
  const save = (next: DiscoverInterest[]) => start(async () => {
    setError(null); setSaved(false);
    try {
      const result = await saveComposerInterests(tripId, next);
      if (!result.ok) setError(result.error);
      else { setConfirmed(result.data); setSaved(true); }
    } catch { setError("Interests could not be saved. Your last saved selection is unchanged."); }
  });
  return <details className="trip-interests">
    <summary>Interests · optional</summary>
    <fieldset disabled={pending}><legend>Shape your next ideas</legend><div className="interest-options">
      {INTEREST_OPTIONS.map(option => <label key={option.value} className={confirmed.includes(option.value) ? "selected" : undefined}>
        <input type="checkbox" name="interests" value={option.value} checked={confirmed.includes(option.value)} onChange={() => save(confirmed.includes(option.value) ? confirmed.filter(value => value !== option.value) : [...confirmed, option.value])} />{option.label}
      </label>)}
    </div></fieldset>
    <button type="button" className="text-button" disabled={pending || !confirmed.length} onClick={() => save([])}>Clear interests</button>
    <p role="status" className="muted">{pending ? "Saving interests…" : saved ? "Interests saved for future ideas." : ""}</p>
    {error ? <p role="alert" className="issue error">{error}</p> : null}
  </details>;
}

export function DestinationChoice({ segments, selectedId }: { segments: { id: string; label: string }[]; selectedId: string }) {
  const router = useRouter(), query = useSearchParams(), pathname = usePathname();
  return <label>Trip Segment<select aria-label="Trip Segment" name="segmentId" value={selectedId} onChange={e => { const next = new URLSearchParams(query.toString()); next.set("segmentId", e.target.value); next.delete("page"); router.replace(pathname + "?" + next); }}>
    {!segments.some(s => s.id === selectedId) ? <option value="">Choose a destination</option> : null}
    {segments.map(segment => <option key={segment.id} value={segment.id}>{segment.label}</option>)}
  </select></label>;
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
