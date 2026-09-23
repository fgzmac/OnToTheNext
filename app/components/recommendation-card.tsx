import type { RecommendationCardData } from "@/src/modules/discover/types";
import { RecommendationDecision } from "./recommendation-decision";

export function RecommendationCard({ recommendation }: { recommendation: RecommendationCardData }) {
  const item = recommendation;
  return (
    <article className="card recommendation-card" aria-labelledby={"recommendation-" + item.id}>
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
      <div className="recommendation-evidence">
        {item.evidence.length === 0 ? <p>Evidence: unavailable.</p> : item.evidence.map(evidence => (
          <div key={evidence.id}>
            <p>Source: {evidence.sourceName}</p>
            <p>Evidence: {evidence.status === "FIXTURE" && evidence.sourceKind === "DEVELOPMENT_FIXTURE" ? "fixture data — not live" : "not verified as current"}</p>
            <details>
              <summary>Evidence details</summary>
              <p>{evidence.factualText}</p>{evidence.sourceUrl ? <a href={evidence.sourceUrl} target="_blank" rel="noopener noreferrer">Official source</a> : null}
              <p>Observed / record date: {evidence.retrievedAt.slice(0, 10)}. This is not a live verification date.</p>
            </details>
          </div>
        ))}
      </div>
      <RecommendationDecision tripId={item.tripId} tripSegmentId={item.tripSegmentId} recommendationId={item.id} name={item.place.name} outcome={item.decision} />
    </article>
  );
}
