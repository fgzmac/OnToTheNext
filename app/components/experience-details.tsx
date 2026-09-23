import type { RecommendationCardData } from "@/src/modules/discover/types";
export function ExperienceDetails({ item }: { item: RecommendationCardData }) {
  return <details className="idea-sources"><summary>Sources and photo details</summary>
    {item.experienceKind === "NEIGHBORHOOD" ? <p>App-authored, self-directed walk. Not a purchasable guided tour. Mentioned stops are optional and are not scheduled separately.</p> : null}
    {item.evidence.map(e => <div key={e.id}><p>{e.factualText}</p>
      {e.sourceUrl ? <a href={e.sourceUrl} target="_blank" rel="noopener noreferrer">{e.sourceKind === "OFFICIAL_CURATED" ? "official" : e.sourceKind} source</a> : <p>{e.sourceName}</p>}
      <p className="muted">Observed {e.retrievedAt.slice(0, 10)} · {e.sourceKind === "DEVELOPMENT_FIXTURE" ? "Synthetic test data" : "Manually researched; not live availability"}</p></div>)}
    {!item.evidence.length ? <p>No source details available.</p> : null}
    {item.durationMinutes !== null ? <p>Duration: editorial planning estimate, not provider-confirmed timing.</p> : null}
    {item.event ? <p>{item.event.timeNote ?? "Session times unverified."} Source recheck due {item.event.recheckAfter}. Published dates do not confirm availability.</p> : null}
    {item.photo ? <div><p><a href={item.photo.sourcePage} target="_blank" rel="noopener noreferrer">{item.photo.title}</a> · Photograph by {item.photo.creator} · Wikimedia Commons · <a href={item.photo.licenseUrl} target="_blank" rel="noopener noreferrer">{item.photo.license}</a></p><p>{item.photo.changes}</p><p>{item.photo.restrictions}</p><p>Photographed: {item.photo.capturedAt}. Photo rights and place match checked {item.photo.observedAt}. A photograph does not verify current conditions.</p></div> : null}
  </details>;
}
