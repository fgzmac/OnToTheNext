"use client";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ItineraryBuilder } from "@/src/modules/itinerary/types";
import type { RecommendationBatch } from "@/src/modules/discover/types";
import type { ActivityReservationContext } from "@/src/modules/reservations/types";
import type { TravelDTO } from "@/src/modules/itinerary/travel/service";
import { formatLocalTime } from "@/src/modules/itinerary/domain";
import { PROGRESS_LABELS } from "@/src/modules/itinerary/progress";
import { STATE_LABELS } from "@/src/modules/reservations/domain";
import { homeContextQuery } from "@/src/modules/trips/home-context";
import { AddActivity, EditItem } from "./item-details-editor";
import { AddPlanningBlock, ItemMovement } from "./itinerary-builder-controls";
import { RemoveScheduledItem } from "./itinerary-controls";
import { ActivityReservation } from "./activity-reservation";
import { TravelPlanning } from "./travel-planning";
import {ActivityDetails,newDetailSession} from "./experience-details";
import type {DetailSession} from "@/src/modules/google-places/detail-session";
import { DetailPanel } from "./detail-panel";
import { ComposerIdeas } from "./composer-ideas";

export function ItineraryComposer({ builder, selectedDayId, batch, recommendationError, reservations, travel, contextError }: {
  builder: ItineraryBuilder; selectedDayId: string; batch: RecommendationBatch | null; recommendationError: string | null;
  reservations: ActivityReservationContext[]; travel: TravelDTO[]; contextError: string | null;
}) {
  const router = useRouter(), query = useSearchParams();
  const [panel, setPanel] = useState<string | null>(null), [pending, start] = useTransition();
  const [googleSession,setGoogleSession]=useState<DetailSession|null>(null);
  useEffect(()=>()=>googleSession?.close(),[googleSession]);
  const { tripId, days } = builder;
  const day = days.find(d => d.id === selectedDayId) ?? days[0];
  const dayNumber = days.findIndex(d => d.id === day?.id) + 1;
  const context = homeContextQuery("planning", query.get("homeDay"), true);
  const selectDay = (id: string, hash = "") => {
    const next = new URLSearchParams(query.toString()); next.set("planDay", id);
    start(() => router.replace("/trips/" + tripId + "/itinerary?" + next + hash, { scroll: false }));
  };
  useEffect(() => {
    const reveal = () => {
      const id = window.location.hash.replace(/^#item-/, "");
      const owner = days.find(d => d.items.some(item => item.id === id));
      if (!owner) return;
      const nextItem=owner.items.find(item=>item.id===id);
      if(googleSession&&!googleSession.matches(tripId,nextItem?.sourceRecommendationId??"")){googleSession.close();setGoogleSession(null);}
      setPanel(id);
      if (owner.id !== selectedDayId) {
        const next = new URLSearchParams(window.location.search); next.set("planDay", owner.id);
        router.replace("/trips/" + tripId + "/itinerary?" + next + window.location.hash, { scroll: false });
      }
    };
    reveal(); window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [days, selectedDayId, tripId, router, googleSession]);
  const owner = days.find(d => d.items.some(item => item.id === panel));
  const item = owner?.items.find(i => i.id === panel);
  const booking = reservations.find(r => r.itemId === item?.id);
  const estimate = travel.find(t => t.itemId === item?.id);
  const close = () => { googleSession?.close();setGoogleSession(null);setPanel(null); if (window.location.hash) window.history.replaceState(null, "", window.location.pathname + window.location.search); };
  if (!day) return <p>No Trip Days are available.</p>;
  return <div className="itinerary-composer travel-dusk">
    <header className="composer-heading"><div><span className="eyebrow">Make room for what you love</span><h2>Build your days.</h2></div>
      <label className="day-picker">Selected day<select aria-label="Selected day" value={day.id} disabled={pending} onChange={e => { close(); selectDay(e.target.value); }}>
        {days.map((d, i) => <option key={d.id} value={d.id}>Day {i + 1} · {d.date} · {d.base ?? "Unassigned"}</option>)}
      </select></label><button className="text-button mobile-plan-link" onClick={() => document.getElementById("selected-plan")?.scrollIntoView({ block: "start" })}>{day.items.length} planned · View day ↓</button>
    </header>
    <div className="composer-columns" aria-busy={pending}>
      {day.primarySegmentId ? <ComposerIdeas key={day.id} tripId={tripId} segmentId={day.primarySegmentId} dayId={day.id} dayNumber={dayNumber} initial={batch} error={recommendationError} revision={days.flatMap(d => d.items.map(i => i.id)).join(",")} /> :
        <section className="composer-ideas stack"><h2>Where will this day take you?</h2><p>This Day has no destination yet.</p><Link className="button secondary" href={"/trips/" + tripId + (context ? "?" + context : "") + "#destinations"}>Set this Day’s destination in Home</Link></section>}
      <section id="selected-plan" className="composer-plan stack" aria-label="Selected day timeline">
        <header className="row row-between"><div><span className="eyebrow">{day.base ?? "Unassigned"}</span><h2>Day {dayNumber}</h2><p className="muted">{day.date}</p></div><span className="plan-count">{day.items.length} planned</span></header>
        {contextError ? <p role="alert" className="issue error">{contextError}</p> : null}
        {day.issues.length ? <section className="issue warning day-conflicts" aria-label={"Time warnings for " + day.date}><h3>Time warnings</h3><ul>{day.issues.map((issue, i) => <li key={i}>{issue.message}</li>)}</ul></section> : null}
        {!day.items.length ? <div className="composer-empty"><span aria-hidden="true">＋</span><h3>Your day starts here.</h3><p>Choose an idea to add it to your plan. You can set times later.</p></div> : <ol className="composer-timeline">{day.items.map(row => {
          const reservation = reservations.find(r => r.itemId === row.id)?.reservation;
          const t = travel.find(t => t.itemId === row.id);
          const warnings = [...(row.eventWarning ? [row.eventWarning] : []), ...(reservation?.attention ?? []), ...(t?.warnings ?? [])];
          if (["ACTIVITY", "TRANSPORTATION"].includes(row.type) && (!reservations.some(r => r.itemId === row.id) || !t) && !contextError) warnings.push("Planning details changed. Refresh to review booking and travel.");
          if (t?.status === "NEEDS_REVIEW" && !warnings.length) warnings.push("Travel estimate needs review.");
          return <li key={row.id}><article className="timeline-item compact-item" aria-labelledby={"item-" + row.id}>
            <button className="timeline-open" aria-haspopup="dialog" aria-expanded={panel===row.id} onClick={() => { googleSession?.close();setGoogleSession(row.sourceRecommendationId?newDetailSession(tripId,row.sourceRecommendationId):null);setPanel(row.id); window.history.replaceState(null, "", window.location.pathname + window.location.search + "#item-" + row.id); }} aria-label={"Open " + row.title}>
              <span className="item-time">{row.startMinute === null ? "Any time" : formatLocalTime(row.startMinute)}{row.flexibility === "FIXED" ? " · Fixed" : ""}</span>
              <h3 id={"item-" + row.id} tabIndex={-1}>{row.title}</h3>
              {row.durationMinutes !== null || row.locationLabel ? <p className="muted">{[row.durationMinutes !== null ? row.durationMinutes + " min" : null, row.locationLabel].filter(Boolean).join(" · ")}</p> : null}
              {reservation ? <span className="booking-indicator">{STATE_LABELS[reservation.state]}</span> : null}
              {row.progress !== "PENDING" ? <span>{PROGRESS_LABELS[row.progress]}</span> : null}
              <span className="detail-hint">Edit · Move · Details →</span>
            </button>
            {warnings.length ? <div className="timeline-warning">{warnings.map((warning, i) => <p key={i}>{warning}</p>)}</div> : null}
          </article></li>;
        })}</ol>}
        <div className="composer-secondary"><button className="secondary" onClick={() => setPanel("manual")}>Add your own</button><button className="text-button" onClick={() => setPanel("block")}>+ Rest, free time or transport</button></div>
      </section>
    </div>
    {panel === "manual" ? <DetailPanel title="Add your own activity" close={close}><AddActivity tripId={tripId} days={days} token={builder.createToken} defaultDayId={day.id} embedded onCreated={close} /></DetailPanel> : null}
    {panel === "block" ? <DetailPanel title="Add a planning block" close={close}><AddPlanningBlock tripId={tripId} days={days} segments={builder.segments} defaultDayId={day.id} embedded /></DetailPanel> : null}
    {item && owner ? <DetailPanel title={item.title} close={close}>
      <p className="muted">Day {days.indexOf(owner) + 1} · {owner.date} · <span className="item-time">{item.startMinute === null ? "Any time" : formatLocalTime(item.startMinute)}</span></p>
      <p>Progress: {PROGRESS_LABELS[item.progress]} · {item.enteredManually ? "Manually entered" : item.sourceRecommendationId ? "From a recommendation" : "Planning block"}</p>
      {item.eventWarning?<p className="issue warning">{item.eventWarning}</p>:null}
      {item.sourceActivity ? <ActivityDetails key={item.sourceRecommendationId} item={item.sourceActivity} actions={<p className="scheduled-status">On Day {days.indexOf(owner)+1} · {owner.date}</p>} session={googleSession?.matches(tripId,item.sourceRecommendationId??"")?googleSession:null} connect={()=>{if(!googleSession&&item.sourceRecommendationId)setGoogleSession(newDetailSession(tripId,item.sourceRecommendationId));}}/> : null}
      <EditItem key={item.id} tripId={tripId} item={item} />
      <ItemMovement key={"move-" + item.id} tripId={tripId} dayId={owner.id} item={item} days={days} first={owner.items[0]?.id === item.id} last={owner.items.at(-1)?.id === item.id} />
      {item.notes ? <p>{item.notes}</p> : null}
      {item.referenceUrl ? <a href={item.referenceUrl} target="_blank" rel="noopener noreferrer">Open reference source</a> : null}
      {booking ? <details className="item-booking" open><summary>Booking{booking.reservation ? " · " + STATE_LABELS[booking.reservation.state] : ""}</summary><ActivityReservation tripId={tripId} context={booking} date={owner.date} startMinute={item.startMinute} /></details> : null}
      {estimate ? <TravelPlanning tripId={tripId} travel={estimate} transportation={item.type === "TRANSPORTATION"} /> : null}
      {contextError ? <p role="alert" className="issue error">{contextError}</p> : ["ACTIVITY", "TRANSPORTATION"].includes(item.type) && (!booking || !estimate) ? <p role="alert">Planning details changed. Refresh before editing booking or travel.</p> : null}
      <RemoveScheduledItem tripId={tripId} itemId={item.id} title={item.title} />
    </DetailPanel> : null}
  </div>;
}
