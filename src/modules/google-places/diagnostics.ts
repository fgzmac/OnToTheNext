import type {MatchAssessment} from "./matching";
/** Only the explicitly enabled, owner-operated local pilot writes bounded server-console
 * evidence. Never included in traveler responses; no NODE_ENV requirement or client flag. */
export function ownerDiagnosticsEnabled(env:Record<string,string|undefined>=process.env){
 if(env.ONTOTHENEXT_OWNER_DIAGNOSTICS!=="bounded"||env.GOOGLE_PLACES_ENABLED!=="owner-approved"||env.GOOGLE_PLACES_APPROVAL!=="ontothenext-google-pilot1-20260924")return false;
 try{const u=new URL(env.DATABASE_URL??"");return ["localhost","127.0.0.1"].includes(u.hostname)&&u.port==="5433"&&u.username==="ontothenext"&&u.pathname==="/ontothenext_google_pilot1"&&(u.search===""||u.search==="?schema=public");}catch{return false;}
}
export function reportMatch(appPlaceId:string,matches:MatchAssessment[],env:Record<string,string|undefined>=process.env,write:(s:string)=>void=console.info){
 if(!ownerDiagnosticsEnabled(env))return;
 // appPlaceId comes from the owned curated catalog, never a caller's string.
 if(!/^curated-[a-z0-9-]{1,100}$/.test(appPlaceId))return;
 write(JSON.stringify({event:"OWNER_PLACE_MATCH",appPlaceId,code:matches.filter(m=>m.eligible).length>1?"MATCH_AMBIGUOUS":matches.length?"MATCH_ASSESSED":"MATCH_NO_CANDIDATES",candidates:matches.slice(0,5).map(m=>({code:m.code,checks:m.checks}))}));
}
