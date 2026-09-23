import manifest from "./media-manifest.json" with { type: "json" };
export type ExperiencePhoto = typeof manifest[number];
export function photoFor(placeId: string): ExperiencePhoto | null { return manifest.find(photo => photo.placeId === placeId) ?? null; }
