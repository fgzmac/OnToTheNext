import Link from "next/link";
import { loadTripSkeleton } from "../load-trip";
import { getRecommendationBatch } from "@/src/modules/discover/service";
import { RecommendationCard } from "@/app/components/recommendation-card";
import { RecommendationDecision } from "@/app/components/recommendation-decision";

export default async function DiscoverPage({ params, searchParams }: {
  params: Promise<{ tripId: string }>;
  searchParams: Promise<{ segmentId?: string | string[]; page?: string | string[] }>;
}) {
  const { tripId } = await params;
  const query = await searchParams;
  const { segments } = await loadTripSkeleton(tripId);
  if (segments.length === 0) {
    return <section className="card stack">
      <span className="eyebrow">Discover</span>
      <h2>Add a destination to discover.</h2>
      <p>Add your first city or base in Home, then return here for destination-specific recommendations.</p>
    </section>;
  }
  const selectedId = typeof query.segmentId === "string" ? query.segmentId : segments[0].id;
  const selected = segments.find(segment => segment.id === selectedId);
  const result = selected ? await getRecommendationBatch(tripId, selected.id, typeof query.page === "string" ? query.page : undefined) : null;
  const batch = result?.ok ? result.data : null;
  const path = "/trips/" + tripId + "/discover";
  const batchHref = (page: number) => path + "?segmentId=" + encodeURIComponent(selectedId) + "&page=" + page;
  return (
    <div className="stack discover">
      <header>
        <span className="eyebrow">Discover</span>
        <h2>Choose experiences for this destination.</h2>
        <p className="muted">Accept keeps an idea here. It does not schedule or book anything.</p>
      </header>
      <form action={path} method="get" className="card discover-context">
        <label>
          Trip Segment
          <select name="segmentId" defaultValue={selected?.id ?? ""} required>
            {!selected ? <option value="" disabled>Choose a destination</option> : null}
            {segments.map(segment => <option key={segment.id} value={segment.id}>
              {segment.position + 1}. {segment.baseName} · {segment.arrivalDate} to {segment.departureDate}
            </option>)}
          </select>
        </label>
        <button type="submit">View destination</button>
      </form>
      {!selected ? <p role="alert" className="issue error">This destination is no longer available. Choose a destination in this trip.</p> : null}
      {result && !result.ok ? <p role="alert" className="issue error">{result.error}</p> : null}
      {batch ? <>
        {batch.total > 0 ? <p className="issue warning">Development fixtures: imaginary places with illustrative details. No live prices, hours or availability.</p> : null}
        <section aria-labelledby="batch-heading" className="stack">
          <h2 id="batch-heading">{batch.total === 0 ? "No recommendations available yet." : batch.exhausted ? "No more fixture recommendations." : "Batch " + (batch.page + 1) + " of " + batch.totalPages}</h2>
          {batch.total === 0 ? <p>There are no recommendations for this destination yet. Your trip and decisions are saved.</p> : null}
          {batch.exhausted ? <p>You have reached the end of this destination’s development catalog.</p> : null}
          <div className="grid grid-2 recommendation-grid">
            {batch.cards.map(item => <RecommendationCard key={item.id} recommendation={item} />)}
          </div>
          <div className="row">
            {batch.page > 0 ? <Link className="button secondary" href={batchHref(batch.page - 1)}>Previous batch</Link> : null}
            {batch.total > 0 && !batch.exhausted ? <Link className="button" href={batchHref(batch.page + 1)}>Show another batch</Link> : null}
          </div>
        </section>
        <section className="card stack accepted-section" aria-labelledby="accepted-heading">
          <h2 id="accepted-heading">Accepted</h2>
          <p className="muted">Ideas kept for this destination. Nothing has been scheduled or booked.</p>
          {batch.accepted.length === 0 ? <p>No accepted recommendations for this destination yet.</p> : <ul className="accepted-list">
            {batch.accepted.map(item => <li key={item.id}>
              <h3>{item.place.name}</h3>
              <RecommendationDecision tripId={item.tripId} tripSegmentId={item.tripSegmentId} recommendationId={item.id} name={item.place.name} outcome={item.decision} />
            </li>)}
          </ul>}
        </section>
      </> : null}
    </div>
  );
}
