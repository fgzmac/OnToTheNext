import { ATTRIBUTION_LABELS, AVAILABILITY_LABELS, releaseSummary } from "@/src/modules/reservations/release";
import { safeBookingUrl } from "@/src/modules/reservations/domain";
import type { EvidenceDTO } from "@/src/modules/reservations/types";
export function ReservationEvidenceRecord({ evidence: e }: { evidence: EvidenceDTO }) {
  const sourceUrl = safeBookingUrl(e.release?.sourceUrl);
  return <div className="evidence-record stack">
    <strong>{e.topic}</strong><p>{e.factualText}</p>
    <p>{releaseSummary(e.release)}</p>
    {e.release ? <p>{AVAILABILITY_LABELS[e.release.availability]}</p> : null}
    <p className="muted">Source: {e.sourceName} · {e.release ? ATTRIBUTION_LABELS[e.release.attribution] : e.sourceKind === "DEVELOPMENT_FIXTURE" || e.status === "FIXTURE" ? "Development fixture · Not live" : e.sourceKind}
      {e.release?.recordedByUser ? " · Recorded by user; not independently verified by the app" : ""}</p>
    <p className="muted">Observed / retrieved (UTC): {e.release?.observedAt ?? e.retrievedAt}</p>
    {sourceUrl ? <a href={sourceUrl} target="_blank" rel="noopener noreferrer">Open source</a> : null}
    {e.warnings.map(warning => <p className="issue warning" key={warning}>{warning}</p>)}
  </div>;
}
