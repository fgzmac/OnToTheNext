import type { TravelDTO } from "@/src/modules/itinerary/travel/service";
import { formatLocalTime } from "@/src/modules/itinerary/domain";
export function TravelSummary({ travel, unavailable = false }: { travel: TravelDTO | null; unavailable?: boolean }) {
  if (unavailable) return <p role="alert">Travel planning unavailable. No departure time has been inferred.</p>;
  if (!travel || travel.status === "MISSING") return <p className="muted">Travel estimate not entered.</p>;
  const p = travel.inputs!;
  const start = p.basis === "PLANNED" ? travel.planned : travel.confirmed;
  return <section className="stack travel-summary" aria-label="Travel estimate">
    {travel.departure ? <strong className="leave-by">Estimated leave-by: {travel.departure.date} · {travel.departure.time}</strong> : <strong>{travel.status === "INACTIVE" ? "Travel estimate inactive" : "Travel estimate needs review"}</strong>}
    <p>{p.originKind === "ENTERED" ? "Entered starting point: " : "From planned stop: "}{p.originLabel}</p>
    <p>Timing basis: {p.basis === "PLANNED" ? "Itinerary planned start" : "Confirmed reservation start"}{start ? " · " + (start.date ?? "Date unknown") + " · " + formatLocalTime(start.minute) : " · Unavailable"}</p>
    <p>Travel: {p.travelMinutes} minutes · Arrival buffer: {p.bufferMinutes} minutes</p>
    <p className="muted">Manual estimate — not live routing. Same local clock only; no time-zone conversion or clock-change adjustment.</p>
    {p.originKind === "EARLIER_ITEM" ? <p className="muted">A planned stop or completion does not establish your physical location. Hotel / Rest is not proof of a selected or booked hotel.</p> : null}
    {travel.warnings.length ? <ul className="issue warning">{travel.warnings.map(w => <li key={w}>{w}</li>)}</ul> : null}
  </section>;
}
