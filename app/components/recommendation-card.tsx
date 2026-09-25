import { RecommendationPhoto } from "./recommendation-photo";
import { ExperienceDetails } from "./experience-details";
import type { RecommendationCardData } from "@/src/modules/discover/types";
import { RecommendationDecision } from "./recommendation-decision";

export function RecommendationCard({ recommendation }: { recommendation: RecommendationCardData }) {
  const item = recommendation;
  return (
    <article className="card recommendation-card" aria-labelledby={"recommendation-" + item.id}>
      <RecommendationPhoto photo={item.photo} name={item.place.name} />
      <div>
        <span className="eyebrow">{item.place.category}</span>
        <h3 id={"recommendation-" + item.id}>{item.place.name}</h3>
        <p className="muted">{item.place.baseLabel}</p>
      </div>
      <p>{item.factualSummary}</p>
      <dl className="recommendation-facts">
        {item.durationMinutes !== null ? <><dt>{item.evidence.some(e => e.sourceKind === "DEVELOPMENT_FIXTURE") ? "Illustrative duration" : "Estimated visit duration"}</dt><dd>{item.durationMinutes} minutes</dd></> : null}
        {item.costContext ? <><dt>Cost context</dt><dd>{item.costContext}</dd></> : null}
        {item.logisticsNote ? <><dt>Practical notes</dt><dd>{item.logisticsNote}</dd></> : null}
      </dl>
      {item.event ? <p>{item.event.startDate} – {item.event.endDate} · {item.event.timeZone} · Availability unconfirmed</p> : null}
      {item.evidence.filter(e => e.sourceKind === "DEVELOPMENT_FIXTURE").map(e => <div key={e.id}><p>Source: {e.sourceName}</p><p>Evidence: {e.status === "FIXTURE" ? "fixture data — not live" : "not verified as current"}</p></div>)}
      <ExperienceDetails item={item} actions={<RecommendationDecision tripId={item.tripId} tripSegmentId={item.tripSegmentId} recommendationId={item.id} name={item.place.name} outcome={item.decision} />} />
      <RecommendationDecision tripId={item.tripId} tripSegmentId={item.tripSegmentId} recommendationId={item.id} name={item.place.name} outcome={item.decision} />
    </article>
  );
}
