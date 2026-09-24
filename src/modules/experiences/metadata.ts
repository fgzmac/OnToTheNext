import { catalogPlace } from "../discover/catalog";
import { photoFor } from "../discover/media";
import { runtimeEvent, runtimePhoto } from "../research/runtime";
import type { ExperienceKind, ExperienceMetadata, RuntimeExperience } from "./types";
function runtimeKind(kind: string): ExperienceKind {
  return kind === "VENUE" || kind === "NEIGHBORHOOD" || kind === "EVENT" ? kind : "UNKNOWN";
}
/** Pure resolution over an already-loaded record and immutable curated metadata.
 * Runtime identity/kind/event/source are authoritative when a runtime record exists.
 * Invalid/withdrawn runtime data never revives a catalog occurrence. Only genuinely
 * absent runtime media may use a licensed local photo for the same application ID.
 * No database, transport, ranking, or saved-content writes occur here.
 */
export function resolveExperienceMetadata(placeId: string, runtime?: RuntimeExperience | null): ExperienceMetadata {
  const curated = catalogPlace(placeId);
  if (runtime) {
    const kind = runtimeKind(runtime.kind);
    return {
      kind, event: runtimeEvent(runtime), eventReview: "source-observed",
      neighborhoodAuthorship: "unknown", sourceUrl: runtime.sourceUrl || null,
      unavailable: runtime.withdrawn || kind === "UNKNOWN",
      photo: runtime.withdrawn ? null : runtime.media == null ? photoFor(placeId) : runtimePhoto(runtime),
    };
  }
  return {
    kind: curated?.kind ?? (curated ? "VENUE" : "UNKNOWN"), event: curated?.event,
    eventReview: curated?.event ? "human-reviewed" : "unknown",
    neighborhoodAuthorship: curated?.kind === "NEIGHBORHOOD" ? "app-authored-walk" : "unknown",
    sourceUrl: curated?.url ?? null, unavailable: false, photo: photoFor(placeId),
  };
}
