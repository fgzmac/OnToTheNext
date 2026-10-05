import { object,array,string } from "./adapters";
import { SOURCE_POLICIES } from "./policy";
import { publicUrl } from "./http";
import { validateDiscoverInterests } from "../discover/refinement";
import { eventMatches } from "../discover/events";
import type { Candidate,Document,Evaluated,ResearchContext,RuntimeMedia } from "./types";
export function parseCandidate(value:unknown):Candidate {
  const c=object(value);const allowed=["documentId","entityId","name","originalName","kind","description","category","interests","claimLocators","uncertainties","conflicts","event","media"];
  if(Object.keys(c).some(k=>!allowed.includes(k)))throw new Error("UNEXPECTED_FIELD");
  const interests=validateDiscoverInterests(c.interests);if(!interests)throw new Error("INVALID_INTERESTS");
  const kind=string(c.kind);if(!["VENUE","NEIGHBORHOOD","EVENT"].includes(kind))throw new Error("INVALID_KIND");
  return {documentId:string(c.documentId),entityId:string(c.entityId),name:string(c.name,200),originalName:string(c.originalName,200),
    kind:kind as Candidate["kind"],description:string(c.description,1200),category:string(c.category,100),interests,
    claimLocators:array(c.claimLocators).map(v=>string(v)),uncertainties:array(c.uncertainties).map(v=>string(v)),
    conflicts:array(c.conflicts).map(v=>string(v)),event:(c.event??null) as Candidate["event"],media:(c.media??null) as Candidate["media"]};
}
export function validMedia(m:RuntimeMedia,id:string):boolean {
  const licenses:Record<string,string>={"CC0":"https://creativecommons.org/publicdomain/zero/1.0","CC BY 4.0":"https://creativecommons.org/licenses/by/4.0","CC BY-SA 4.0":"https://creativecommons.org/licenses/by-sa/4.0"};
  try{return m.subjectId===id&&m.subjectMatch==="REVIEWED"&&!!string(m.creator)&&!!string(m.rightsBasis)&&!!string(m.title)
    && ["CC0","CC BY 4.0","CC BY-SA 4.0"].includes(m.license)&&publicUrl(m.asset).protocol==="https:"
    && new URL(m.asset).hostname==="upload.wikimedia.org"&&new URL(m.sourcePage).hostname==="commons.wikimedia.org"&&new URL(m.sourcePage).protocol==="https:"&&new URL(m.sourcePage).pathname.startsWith("/wiki/File:")
    && m.licenseUrl.replace(/\/$/,"")===licenses[m.license]&&Number.isFinite(Date.parse(m.retrievedAt))&&!!m.capturedAt;
  }catch{return false;}
}
export function evaluate(candidate:Candidate,docs:Document[],context:ResearchContext,clock:()=>Date):Evaluated {
  const d=docs.find(d=>d.id===candidate.documentId);
  if(!d)throw new Error("INVENTED_REFERENCE");
  const reasons:string[]=[];
  const policy=SOURCE_POLICIES.find(p=>p.id===d.policyId);
  if(!policy || policy.status!=="enabled"||!policy.processing)reasons.push("source permission missing");
  if(candidate.entityId!==d.entityId || candidate.name!==d.name || candidate.originalName!==d.originalName)reasons.push("identity unsupported");
  if(d.country!==context.country||!d.destinationId||!d.locationIds.includes(d.destinationId))reasons.push("destination unresolved");
  if(candidate.description!==d.description || candidate.description.length<20)reasons.push("description unsupported or too thin");
  if(/ignore (all|previous|the) (rules|instructions)|execute (a )?(shell|command)|system prompt|api[ _-]?key/i.test(candidate.description))reasons.push("instruction-like content withheld");
  if(candidate.uncertainties.some(text=>!["Access and availability unverified.","Opening hours unknown.","Photo unavailable."].includes(text)&&!d.claims.some(cl=>cl.text===text)))reasons.push("unsupported caveat");
  if(candidate.conflicts.length)reasons.push("critical contradiction");
  if(!candidate.claimLocators.length || candidate.claimLocators.some(l=>!d.claims.some(c=>c.locator===l))
    || !candidate.claimLocators.some(l=>l.startsWith("descriptions/"))||!candidate.claimLocators.includes("claims/P131")||!candidate.claimLocators.includes("claims/P17"))reasons.push("material claim references missing");
  const age=clock().getTime()-Date.parse(d.retrievedAt);
  if(!Number.isFinite(age)||age<0||age>30*86400_000)reasons.push("stale observation");
  if(candidate.kind==="EVENT") {
    if(policy?.role!=="official organizer" || d.sourceRole!=="official organizer" || !candidate.event || !eventMatches(candidate.event,context.start,context.end,clock))reasons.push("no verified event occurrence");
    if(candidate.event)for(const field of ["startDate","endDate","timeZone","status","observedAt","recheckAfter"] as const){const locator="event/"+field;if(!candidate.claimLocators.includes(locator)||!d.claims.some(cl=>cl.locator===locator&&cl.text===candidate.event![field]))reasons.push("unsupported event "+field);}
  } else if(candidate.event)reasons.push("event type mismatch");
  // Extractors cannot grant media rights or establish visual matches.
  if(candidate.media)reasons.push("media requires independent rights and subject review");
  return {candidate,document:d,reasons};
}
export function identityKey(e:Evaluated){return [e.document.policyId,e.candidate.entityId,e.candidate.kind,e.candidate.event?.startDate??"",e.candidate.event?.endDate??""].join(":");}
