import type { CatalogPlace } from "../discover/catalog";
import type { GooglePlace } from "./types";
export const normalize = (s: string) => s.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const aliases: Record<string,string[]> = {
  "curated-pokemon-shibuya": ["Pokémon Center SHIBUYA"], "curated-pokemon-mega-tokyo": ["Pokémon Center MEGA TOKYO"],
  "curated-teamlab-planets": ["teamLab Planets TOKYO", "teamLab Planets TOKYO DMM"],
  "curated-imperial-east-gardens": ["Imperial Palace East Gardens", "The East Gardens of the Imperial Palace"],
  "curated-shibuya-crossing": ["Shibuya Scramble Crossing", "Shibuya Crossing"],
};
function officialMatch(app: CatalogPlace, actual?: string) {
  if (!actual) return false;
  try {
    const a = new URL(app.url), b = new URL(actual);
    if (["www.gotokyo.org", "gotokyo.org", "osaka-info.jp", "www.japan.travel", "japan.travel"].includes(a.hostname)) return false;
    return a.hostname.replace(/^www\./, "") === b.hostname.replace(/^www\./, "") && b.pathname.replace(/\/$/, "").startsWith(a.pathname.replace(/\/$/, ""));
  } catch { return false; }
}
function conflictingWebsite(app:CatalogPlace,actual?:string) {
  if(!actual)return false;
  try {
    const a=new URL(app.url),b=new URL(actual),host=(u:URL)=>u.hostname.replace(/^www\./,"");
    if(["gotokyo.org","osaka-info.jp","japan.travel"].includes(host(a)))return false;
    if(host(a)!==host(b))return true;
    // A generic operator home page is not branch evidence. A supplied specific
    // competing branch/exhibition URL must not be overridden by a matching name.
    if((app.id.startsWith("curated-pokemon-") && b.pathname.includes("pokemoncenter-")) || (app.id==="curated-teamlab-planets" && b.pathname.includes("/e/"))) return !officialMatch(app,actual);
    return false;
  } catch {return true;}
}
export function assessMatch(app: CatalogPlace, place: GooglePlace): { eligible: boolean; reason: string } {
  const reject = (reason: string) => ({eligible:false,reason});
  if (!/^[A-Za-z0-9_-]{1,200}$/.test(place.id)) return reject("Invalid provider identity");
  if (place.movedPlaceId || place.businessStatus !== "OPERATIONAL") return reject("Closed, relocated or business status unavailable; organizer recheck required");
  const parts = place.addressComponents ?? [];
  if (!parts.some(p => p.types?.includes("country") && p.shortText === "JP")) return reject("Country is not independently corroborated as Japan");
  const city = normalize(app.city);
  if (!parts.some(p => p.types?.some(t => (app.city === "Tokyo" ? ["locality","administrative_area_level_1"] : ["locality"]).includes(t)) && normalize(p.longText ?? "") === city)) return reject("Wrong or unconfirmed city");
  const names = [app.name, ...(aliases[app.id] ?? [])].map(normalize);
  if (!names.includes(normalize(place.displayName?.text ?? ""))) return reject("Exact experience name/branch not corroborated");
  if (conflictingWebsite(app,place.websiteUri)) return reject("Supplied official website conflicts with independent operator/branch evidence");
  const address = normalize(place.formattedAddress ?? "");
  const areaTokens = normalize(app.location ?? "").split(" ").filter(t => t.length >= 5 && !["tokyo","kyoto","osaka","japan","station","gardens"].includes(t));
  const area = areaTokens.some(t => address.split(" ").includes(t));
  if (areaTokens.length && !area) return reject("Independent address/area is not corroborated; a website cannot override conflicting location evidence");
  if (!area && !officialMatch(app, place.websiteUri)) return reject("Area/address or specific official website not corroborated");
  return {eligible:true,reason:"Name, Japan city and independent area/official website corroborate this candidate. Review before linking."};
}
