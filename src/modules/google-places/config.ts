export interface GoogleConfig {
  key: string; approval: string; ceilingMicros: number; googleMicros: number;
  maxSearch: number; maxDetails: number; maxPhotos: number;
}
export const COST = { search: 35_000, context: 20_000, reviews: 25_000, photo: 7_000 } as const;
const integer = (value: string | undefined, max: number) => value && /^\d+$/.test(value) && Number(value)>0 && Number(value)<=max ? Number(value) : null;
export function googleConfiguration(env: Record<string,string|undefined> = process.env): GoogleConfig | null {
  if (env.GOOGLE_PLACES_ENABLED !== "owner-approved" || !env.GOOGLE_PLACES_APPROVAL?.trim() || !env.GOOGLE_PLACES_API_KEY?.trim()
    || env.GOOGLE_PLACES_POLICY_CONFIRMED !== "yes" || env.GOOGLE_PLACES_KEY_RESTRICTIONS_CONFIRMED !== "yes") return null;
  for (const key of ["GOOGLE_PLACES_TERMS_URL", "GOOGLE_PLACES_PRIVACY_URL"]) {
    try { const u = new URL(env[key] ?? ""); if (u.protocol !== "https:" || u.username || u.password || u.hostname === "localhost") return null; } catch { return null; }
  }
  const ceilingMicros = integer(env.GOOGLE_PLACES_TOTAL_MICRO_USD, 10_000_000), googleMicros = integer(env.GOOGLE_PLACES_PROVIDER_MICRO_USD, 10_000_000);
  const maxSearch = integer(env.GOOGLE_PLACES_MAX_SEARCH, 40), maxDetails = integer(env.GOOGLE_PLACES_MAX_DETAILS, 100), maxPhotos = integer(env.GOOGLE_PLACES_MAX_PHOTOS, 20);
  if (!ceilingMicros || !googleMicros || googleMicros > ceilingMicros || !maxSearch || !maxDetails || !maxPhotos) return null;
  return { key: env.GOOGLE_PLACES_API_KEY!, approval: env.GOOGLE_PLACES_APPROVAL!, ceilingMicros, googleMicros, maxSearch, maxDetails, maxPhotos };
}
