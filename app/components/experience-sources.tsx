import { neighborhoodDescription } from "@/src/modules/experiences/provenance";
import { eventObservationLabel } from "@/src/modules/discover/events";
import type { RecommendationCardData } from "@/src/modules/discover/types";
export function ExperienceSources({ item }: { item: RecommendationCardData }) {
  return <details className="idea-sources"><summary>Sources</summary>
    {item.experienceKind === "NEIGHBORHOOD" ? <p>{neighborhoodDescription(item.neighborhoodAuthorship)}</p> : null}
    {item.evidence.map(e => <div key={e.id}><p>{e.factualText}</p>
      {e.sourceUrl ? <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer">{e.sourceKind === "OFFICIAL_CURATED" ? "official" : e.sourceKind} source</a> : <p>{e.sourceName}</p>}
      <p className="muted">Observed {e.retrievedAt.slice(0, 10)} · {e.sourceKind === "DEVELOPMENT_FIXTURE" ? "Synthetic test data" : e.sourceKind.startsWith("RUNTIME_") ? "Runtime research; not live availability" : e.sourceKind === "OFFICIAL_CURATED" ? "Curated source observation; not live availability" : "Source observation; review method not recorded"}</p></div>)}
    {!item.evidence.length ? <p>No source details available.</p> : null}
    {item.durationMinutes !== null ? <p>Duration: editorial planning estimate, not provider-confirmed timing.</p> : null}
    {item.event ? <p>{eventObservationLabel(item.event, item.eventReview)}. {item.event.timeNote ?? "Session times unverified."} Source recheck due {item.event.recheckAfter}. Published dates do not confirm availability.</p> : null}
    {item.photo ? <div><p><a href={item.photo.sourcePage} target="_blank" rel="noopener noreferrer">{item.photo.title}</a> · Photograph by {item.photo.creator} · Wikimedia Commons · <a href={item.photo.licenseUrl} target="_blank" rel="noopener noreferrer">{item.photo.license}</a></p>{item.photo.storage === "local" ? <><p>{item.photo.changes}</p><p>{item.photo.restrictions}</p><p>Photographed: {item.photo.capturedAt}. Photo rights and place match checked {item.photo.observedAt}. A photograph does not verify current conditions.</p></> : <><p>{item.photo.rightsBasis}</p><p>Captured: {item.photo.capturedAt}. Retrieved: {item.photo.retrievedAt}. Subject match recorded; human review date not recorded. A photograph does not verify current conditions.</p></>}</div> : null}
  </details>;
}
