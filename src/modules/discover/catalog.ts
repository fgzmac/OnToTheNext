import { TOKYO_ADDITIONS } from "./tokyo-pilot";
import type { EventOccurrence, ExperienceSource } from "./tokyo-pilot";
import type { DiscoverInterest } from "@/src/generated/prisma/enums";

export const SUPPORTED_CITIES = ["Tokyo", "Kyoto", "Osaka"] as const;
export type SupportedCity = typeof SUPPORTED_CITIES[number];
// Deliberately exact apart from case and surrounding whitespace: no fuzzy geocoding.
export function supportedCity(value: string): SupportedCity | null {
  return SUPPORTED_CITIES.find(city => city.toLowerCase() === value.trim().toLowerCase()) ?? null;
}
export interface CatalogPlace {
  id: string; city: SupportedCity; name: string; category: string; interests: DiscoverInterest[];
  summary: string; location: string | null; url: string; checkedAt: string;
  durationMinutes: number | null; durationSource?: string;
  kind?: "VENUE" | "NEIGHBORHOOD" | "EVENT"; diversityGroup?: string; event?: EventOccurrence; sources?: ExperienceSource[];
}
const observed = "2026-09-23";
function entry(city: SupportedCity, slug: string, name: string, category: string, interests: DiscoverInterest[], summary: string, location: string | null, url: string, durationMinutes: number | null = null, durationSource?: string): CatalogPlace {
  return { id: "curated-" + slug, city, name, category, interests, summary, location, url, checkedAt: observed, durationMinutes, durationSource };
}
// Original concise descriptions; facts checked against the linked operator/tourism sources.
// Reusable Tokyo photos and rights are tracked separately in media-manifest.json.
export const CATALOG: CatalogPlace[] = [
  entry("Tokyo", "sensoji", "Senso-ji", "Temple", ["CULTURE_HISTORY", "SIGHTSEEING_LANDMARKS"], "Explore the temple grounds and gates of Tokyo’s oldest Buddhist temple.", "Asakusa, Taito", "https://www.senso-ji.jp/english/"),
  entry("Tokyo", "shinjuku-gyoen", "Shinjuku Gyoen", "Garden", ["NATURE_OUTDOORS"], "Walk through Japanese, formal and landscape gardens within a large city park.", "11 Naitomachi, Shinjuku", "https://www.gotokyo.org/en/spot/75/"),
  entry("Tokyo", "tokyo-national-museum", "Tokyo National Museum", "Museum", ["CULTURE_HISTORY"], "Explore galleries of Japanese art, archaeology and art from across Asia.", "Ueno Park, Taito", "https://www.tnm.jp/?lang=en"),
  entry("Tokyo", "meiji-jingu", "Meiji Jingu", "Shrine", ["CULTURE_HISTORY", "NATURE_OUTDOORS"], "Follow wooded approaches to a Shinto shrine dedicated to Emperor Meiji and Empress Shoken.", "Yoyogi Kamizono-cho, Shibuya", "https://www.meijijingu.or.jp/en/about/"),
  entry("Tokyo", "skytree", "Tokyo Skytree", "Observation tower", ["ARCHITECTURE_DESIGN", "SIGHTSEEING_LANDMARKS"], "Look across Tokyo from the observation decks of the Skytree tower.", "Oshiage, Sumida", "https://www.gotokyo.org/en/destinations/eastern-tokyo/skytree-and-around/index.html"),
  entry("Tokyo", "western-art", "National Museum of Western Art", "Art museum", ["CULTURE_HISTORY", "ARCHITECTURE_DESIGN"], "Browse Western art in the museum’s galleries in Ueno Park.", "7-7 Ueno-koen, Taito", "https://www.nmwa.go.jp/en/"),
  entry("Tokyo", "edo-tokyo-buildings", "Edo-Tokyo Open Air Architectural Museum", "Architecture museum", ["ARCHITECTURE_DESIGN", "CULTURE_HISTORY"], "Explore historic buildings relocated and preserved in an outdoor museum.", "3-7-1 Sakura-cho, Koganei", "https://www.gotokyo.org/en/spot/417/index.html", 120, "https://www.gotokyo.org/book/wp-content/uploads/2025/03/2503_tbf2025_low_EN.pdf"),
  entry("Tokyo", "sumida-aquarium", "Sumida Aquarium", "Aquarium", ["ENTERTAINMENT"], "See penguins and marine habitats, including a tank inspired by the Ogasawara Islands.", "Tokyo Skytree Town, Oshiage", "https://www.gotokyo.org/en/spot/67/"),
  ...TOKYO_ADDITIONS,
  entry("Kyoto", "kiyomizudera", "Kiyomizu-dera", "Temple", ["CULTURE_HISTORY", "SIGHTSEEING_LANDMARKS"], "Explore the temple’s hillside buildings and views over Kyoto from Mount Otowa.", "Higashiyama", "https://www.kiyomizudera.or.jp/en/"),
  entry("Kyoto", "nishiki", "Nishiki Market", "Food market", ["FOOD_DRINK", "SHOPPING"], "Browse a covered market with shops selling Kyoto foods, pickles and seasonings.", "Nakagyo", "https://www.kyoto-nishiki.or.jp/en/"),
  entry("Kyoto", "tenryuji", "Tenryu-ji", "Temple garden", ["NATURE_OUTDOORS", "CULTURE_HISTORY"], "Walk around Sogen Pond Garden, where surrounding mountains form part of the garden’s scenery.", "Arashiyama", "https://www.tenryuji.com/en/precincts/"),
  entry("Kyoto", "fushimi-inari", "Fushimi Inari Taisha", "Shrine", ["CULTURE_HISTORY", "NATURE_OUTDOORS"], "Explore the head Inari shrine and torii-lined paths on Mount Inari.", "68 Fukakusa Yabunouchi-cho, Fushimi", "https://inari.jp/en/"),
  entry("Kyoto", "nijo", "Nijo Castle", "Castle", ["CULTURE_HISTORY", "ARCHITECTURE_DESIGN"], "Explore the castle complex with its Ninomaru palace and gardens.", null, "https://nijo-jocastle.city.kyoto.lg.jp/?lang=en"),
  entry("Kyoto", "kinkakuji", "Kinkaku-ji", "Temple", ["CULTURE_HISTORY", "SIGHTSEEING_LANDMARKS"], "View the golden pavilion beside its pond and follow the surrounding garden paths.", null, "https://www.shokoku-ji.jp/en/kinkakuji/guide/"),
  entry("Kyoto", "ginkakuji", "Ginkaku-ji", "Temple garden", ["CULTURE_HISTORY", "NATURE_OUTDOORS"], "Explore the temple and garden on the former site of Ashikaga Yoshimasa’s mountain villa.", null, "https://www.shokoku-ji.jp/en/ginkakuji/about/"),
  entry("Kyoto", "railway", "Kyoto Railway Museum", "Railway museum", ["ENTERTAINMENT", "CULTURE_HISTORY"], "Explore historic railway vehicles and exhibits about railway technology.", null, "https://www.kyotorailwaymuseum.jp/en/guide/pdf/floor-guide.pdf"),
  entry("Osaka", "osaka-castle", "Osaka Castle Museum", "Castle museum", ["CULTURE_HISTORY", "SIGHTSEEING_LANDMARKS"], "Explore historical exhibits in the reconstructed castle tower and views from its upper floor.", "1-1 Osakajo, Chuo", "https://osaka-info.jp/en/spot/osaka-castle-main-keep/", 60),
  entry("Osaka", "kuromon", "Kuromon Market", "Food market", ["FOOD_DRINK", "SHOPPING"], "Browse a covered market with seafood sellers, produce shops and places to eat.", "Nipponbashi, Chuo", "https://kuromon.com/en/"),
  entry("Osaka", "nakanoshima", "Nakanoshima Park", "Riverside park", ["NATURE_OUTDOORS"], "Walk through a waterside park between the Dojima and Tosabori rivers, with a rose garden.", "Nakanoshima", "https://osaka-info.jp/en/spot/nakanoshima-park/"),
  entry("Osaka", "kaiyukan", "Kaiyukan", "Aquarium", ["ENTERTAINMENT"], "Explore exhibits representing Pacific Ocean habitats, including the central whale-shark tank.", "1-1-10 Kaigandori, Minato", "https://www.osaka-info.jp/spot/osaka-aquarium-kaiyukan/", 120),
  entry("Osaka", "shitennoji", "Shitennoji", "Temple", ["CULTURE_HISTORY"], "Explore a Buddhist temple complex with a central precinct and pond garden.", "1-11-18 Shitennoji, Tennoji", "https://osaka-info.jp/en/special/kita-minami/course01/"),
  entry("Osaka", "sumiyoshi", "Sumiyoshi Taisha", "Shrine", ["CULTURE_HISTORY", "ARCHITECTURE_DESIGN"], "Explore the shrine grounds and the distinctive arched Sorihashi bridge.", "2-9-89 Sumiyoshi, Sumiyoshi-ku", "https://www.sumiyoshitaisha.net/en/"),
  entry("Osaka", "umeda-sky", "Umeda Sky Building", "Observatory", ["ARCHITECTURE_DESIGN", "SIGHTSEEING_LANDMARKS"], "See the Osaka cityscape from Kuchu Teien, an observatory connecting the building’s twin towers.", null, "https://www.skybldg.co.jp/en/"),
  entry("Osaka", "dotonbori", "Dotonbori", "Food and entertainment district", ["FOOD_DRINK", "ENTERTAINMENT"], "Explore a restaurant-lined entertainment district known for its giant signs.", "Minami", "https://osaka-info.jp/en/spot/dotonbori/"),
];
export function catalogPlace(id: string) { return CATALOG.find(place => place.id === id); }
