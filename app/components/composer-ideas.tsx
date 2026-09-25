"use client";
import { useState, useTransition, useEffect } from "react";
import type { RecommendationBatch, RecommendationCardData } from "@/src/modules/discover/types";
import { composerAdd, composerBatch, composerDeny } from "@/src/modules/itinerary/composer-actions";
import { RecommendationPhoto } from "./recommendation-photo";
import { ExperienceDetails } from "./experience-details";
import { recommendationProvenanceLabel } from "@/src/modules/experiences/provenance";
import { DestinationResearch } from "./destination-research";
import { TripInterests } from "./discover-controls";

export function ComposerIdeas({ tripId, segmentId, dayId, dayNumber, initial, error: initialError, revision }: {
  tripId: string; segmentId: string; dayId: string; dayNumber: number; initial: RecommendationBatch | null; error: string | null; revision: string;
}) {
  const [batch, setBatch] = useState(initial), [error, setError] = useState(initialError), [message, setMessage] = useState("");
  const [pending, start] = useTransition();
  const refresh = async (page: number, more = false) => {
    const result = await composerBatch(tripId, segmentId, page, more, dayId);
    if (!result.ok) { setError(result.error); return; }
    setBatch(result.data);
  };
  useEffect(() => { let active = true; composerBatch(tripId, segmentId, batch?.page ?? 0, false, dayId).then(result => { if (active) { if (result.ok) setBatch(result.data); else setError(result.error); } }).catch(() => { if (active) setError("Ideas could not be refreshed. Try again."); }); return () => { active = false; }; }, [revision, tripId, segmentId, dayId, batch?.page]);
  const act = (item: RecommendationCardData, deny: boolean) => start(async () => {
    setError(null); setMessage("");
    try {
      if (deny) {
        const result = await composerDeny({ tripId, tripSegmentId: segmentId, recommendationId: item.id });
        if (!result.ok) { setError(result.error); return; }
        setMessage("Not interested saved.");
      } else {
        const result = await composerAdd({ tripId, tripSegmentId: segmentId, recommendationId: item.id, dayId });
        if (!result.ok) { setError(result.error.message); return; }
        setMessage(item.place.name + (result.data.alreadyScheduled ? " is already on Day " : " added to Day ") + result.data.dayNumber + ".");
      }
      await refresh(batch?.page ?? 0);
    } catch { setError("Could not confirm the result. Refresh to check your plan before retrying."); }
  });
  const cards = batch ? [...batch.cards, ...batch.accepted.filter(item => !item.scheduledDay && !batch.cards.some(card => card.id === item.id))].filter(item => item.decision !== "DENIED") : [];
  return <section className="composer-ideas stack" aria-label="Ideas for selected day">
    <div><span className="eyebrow">A little inspiration</span><h2>Ideas for {dayNumber ? "Day " + dayNumber : "your day"}</h2></div>
    <DestinationResearch tripId={tripId} segmentId={segmentId} />
    {batch ? <TripInterests key={batch.interests.join()} tripId={tripId} interests={batch.interests} /> : null}
    {error ? <div role="alert" className="issue error">{error} <button className="secondary" disabled={pending} onClick={() => start(async () => { try { setError(null); await refresh(batch?.page ?? 0); } catch { setError("Recommendations could not be loaded. Try again."); } })}>Retry recommendations</button></div> : null}
    <p role="status" className="composer-feedback">{pending ? "Saving…" : message}</p>
    {batch?.total === 0 ? <p>Curated ideas currently cover Tokyo, Kyoto and Osaka. You can still add your own activities here.</p> : null}
    {batch?.eventCount === 0 ? <p className="muted event-coverage">No verified events found for these dates.</p> : null}
    {cards.map(item => <article key={item.id} className={"idea-card" + (item.scheduledDay ? " idea-scheduled" : "")} aria-labelledby={"recommendation-" + item.id}>
      {item.scheduledDay ? <div className="scheduled-choice"><h3 id={"recommendation-" + item.id}>{item.place.name}</h3><span>On Day {item.scheduledDay.number}</span><button className="text-button" disabled={pending} onClick={() => act(item, true)}>Not interested</button></div> : <><RecommendationPhoto photo={item.photo} name={item.place.name} /><p className="eyebrow">{item.place.category}{item.place.location ? " · " + item.place.location : ""}</p>
      <h3 id={"recommendation-" + item.id}>{item.place.name}</h3><p>{item.factualSummary}</p>
      {item.event ? <p className="idea-duration">{item.event.startDate} – {item.event.endDate} · {item.event.timeZone} · Published occurrence, availability unconfirmed</p> : null}
      {item.durationMinutes !== null ? <p className="idea-duration">About {item.durationMinutes} min · planning estimate</p> : null}
      <small className="muted">{recommendationProvenanceLabel(item.evidence)}</small>
      <div className="idea-actions"><button disabled={pending} onClick={() => act(item, false)}>{"Add to Day " + dayNumber}</button><button className="text-button" disabled={pending} onClick={() => act(item, true)}>Not interested</button></div>
      <ExperienceDetails item={item} onAdd={()=>act(item,false)} dayNumber={dayNumber} pending={pending} /></>}
    </article>)}
    {batch && !cards.length && batch.total > 0 ? <p>No ideas left in this batch. Try another batch or revisit an earlier one.</p> : null}
    {batch ? <div className="row">
      {batch.page > 0 ? <button className="secondary" disabled={pending} onClick={() => start(async () => { try { await refresh(batch.page - 1); } catch { setError("Ideas could not be loaded. Try again."); } })}>Previous ideas</button> : null}
      {batch.page < batch.latestBatch || batch.unassigned > 0 ? <button className="secondary" disabled={pending} onClick={() => start(async () => { try { setError(null); await refresh(batch.page, true); } catch { setError("More ideas could not be loaded. Try again."); } })}>More ideas</button> : <small className="muted">You’ve reached the end of this city’s catalog.</small>}
    </div> : null}
  </section>;
}
