import manifest from "./media-manifest.json" with { type: "json" };
import type { LocalExperiencePhoto } from "../experiences/types";
export type { ExperiencePhoto } from "../experiences/types";
export function photoFor(placeId: string): LocalExperiencePhoto | null {
  const photo = manifest.find(photo => photo.placeId === placeId);
  return photo ? { ...photo, storage: "local" } : null;
}
