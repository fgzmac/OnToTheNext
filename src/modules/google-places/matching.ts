import type { CatalogPlace } from "../discover/catalog";
import type { GooglePlace } from "./types";
import {websiteEvidence} from "./venue-identities";
export const normalize = (s: string) => s.normalize("NFKD").replace(/\p{M}/gu, "").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const aliases: Record<string,string[]> = {
  "curated-pokemon-shibuya": ["Pokémon Center SHIBUYA"], "curated-pokemon-mega-tokyo": ["Pokémon Center MEGA TOKYO"],
  "curated-teamlab-planets": ["teamLab Planets TOKYO", "teamLab Planets TOKYO DMM"],
  "curated-imperial-east-gardens": ["Imperial Palace East Gardens", "The East Gardens of the Imperial Palace"],
  "curated-shibuya-crossing": ["Shibuya Scramble Crossing", "Shibuya Crossing"],
};
export type Evidence="passed"|"failed"|"missing";
export interface MatchAssessment {eligible:boolean;reason:string;code:string;checks:Record<"providerIdentity"|"businessStatus"|"country"|"city"|"name"|"website"|"area",Evidence>}
export function assessMatch(app:CatalogPlace,place:GooglePlace):MatchAssessment {
 const parts=place.addressComponents??[],country=parts.filter(p=>p.types?.includes("country"));
 const cities=parts.filter(p=>p.types?.some(t=>(app.city==="Tokyo"?["locality","administrative_area_level_1"]:["locality"]).includes(t)));
 const website=websiteEvidence(app,place.websiteUri),names=[app.name,...(aliases[app.id]??[])].map(normalize);
 const address=normalize(place.formattedAddress??"");
 const areaTokens=normalize(app.location??"").split(" ").filter(t=>t.length>=5&&!["tokyo","kyoto","osaka","japan","station","gardens"].includes(t));
 const area=areaTokens.some(t=>address.split(" ").includes(t));
 const checks:MatchAssessment["checks"]={
  providerIdentity:/^[A-Za-z0-9_-]{1,200}$/.test(place.id)?"passed":"failed",
  businessStatus:place.movedPlaceId?"failed":!place.businessStatus?"missing":place.businessStatus==="OPERATIONAL"?"passed":"failed",
  country:!country.some(p=>p.shortText)?"missing":country.some(p=>p.shortText==="JP")&&!country.some(p=>p.shortText&&p.shortText!=="JP")?"passed":"failed",
  city:!cities.some(p=>p.longText)?"missing":cities.some(p=>normalize(p.longText??"")===normalize(app.city))?"passed":"failed",
  name:!place.displayName?.text?"missing":names.includes(normalize(place.displayName.text))?"passed":"failed",
  website:website==="equivalent"?"passed":website==="conflicting"?"failed":"missing",
  area:area?"passed":!address?"missing":areaTokens.length?"failed":"missing"
 };
 const reject=(code:string,reason:string):MatchAssessment=>({eligible:false,code,reason,checks});
 if(checks.providerIdentity!=="passed")return reject("MATCH_PROVIDER_ID_INVALID","Invalid provider identity");
 if(checks.businessStatus!=="passed")return reject(checks.businessStatus==="missing"?"MATCH_STATUS_MISSING":"MATCH_STATUS_CONFLICT","Closed, relocated or business status unavailable; organizer recheck required");
 if(checks.country!=="passed")return reject(checks.country==="missing"?"MATCH_COUNTRY_MISSING":"MATCH_COUNTRY_CONFLICT","Country is not independently corroborated as Japan");
 if(checks.city!=="passed")return reject(checks.city==="missing"?"MATCH_CITY_MISSING":"MATCH_CITY_CONFLICT","Wrong or unconfirmed city");
 if(checks.name!=="passed")return reject(checks.name==="missing"?"MATCH_NAME_MISSING":"MATCH_NAME_CONFLICT","Exact experience name/branch not corroborated");
 if(website==="conflicting")return reject("MATCH_WEBSITE_CONFLICT","Supplied official website conflicts with independent operator/branch evidence");
 if((app.id.startsWith("curated-pokemon-")||app.id==="curated-teamlab-planets")&&website!=="equivalent")return reject("MATCH_WEBSITE_INSUFFICIENT","Specific official branch website evidence is missing or insufficient");
 if(areaTokens.length&&!area)return reject(checks.area==="missing"?"MATCH_AREA_MISSING":"MATCH_AREA_CONFLICT","Independent address/area is not corroborated; a website cannot override conflicting location evidence");
 if(!area&&website!=="equivalent")return reject("MATCH_AREA_MISSING","Area/address or specific official website not corroborated");
 return {eligible:true,code:"MATCH_CORROBORATED",reason:"Name, Japan city and independent area/official website corroborate this candidate. Review before linking.",checks};
}
