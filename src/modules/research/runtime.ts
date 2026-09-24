import type { EventOccurrence, RemoteExperiencePhoto, RuntimeExperience } from "../experiences/types";
import { isRuntimeMedia } from "../experiences/media";
import { validMedia } from "./validation";
function status(value: string | null): EventOccurrence["status"] {
  return value === "PUBLISHED" || value === "CANCELLED" || value === "POSTPONED" ? value : "UNKNOWN";
}
export function runtimeEvent(r: RuntimeExperience | null | undefined): EventOccurrence | undefined {
  if (!r || r.kind !== "EVENT") return undefined;
  return { startDate: r.eventStart, endDate: r.eventEnd, timeZone: r.eventTimeZone ?? "",
    status: r.withdrawn ? "UNKNOWN" : status(r.eventStatus),
    observedAt: r.observedAt.toISOString().slice(0,10), recheckAfter: r.recheckAfter.toISOString().slice(0,10) };
}
export function runtimePhoto(r: RuntimeExperience | null | undefined): RemoteExperiencePhoto | null {
  if (!r || r.withdrawn || !isRuntimeMedia(r.media) || !validMedia(r.media, r.identity.split(":")[1])) return null;
  const m = r.media;
  return { storage: "remote", placeId: r.placeId, asset: m.asset, sourcePage: m.sourcePage,
    title: m.title, creator: m.creator, license: m.license, licenseUrl: m.licenseUrl,
    alt: (m.exterior ? "Exterior: " : "") + m.title, caption: m.exterior ? "Exterior view" : "",
    capturedAt: m.capturedAt, retrievedAt: m.retrievedAt, rightsBasis: m.rightsBasis, subjectMatch: m.subjectMatch };
}
