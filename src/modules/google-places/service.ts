import { browserTestTransport } from "./test-boundary";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { getPrismaClient } from "@/src/lib/prisma";
import { PROTOTYPE_OWNER_ID } from "../identity/prototype-owner";
import { catalogPlace } from "../discover/catalog";
import { resolveExperienceMetadata } from "../experiences/metadata";
import { googleConfiguration, type GoogleConfig } from "./config";
import { GoogleClient } from "./client";
import { assessMatch } from "./matching";
import { reserveGoogle } from "./budget";
import type { Enrichment, GoogleInput, GooglePlace } from "./types";
const secret=randomBytes(32); // Tokens die on process restart; no Google response cache.
const hash=(value:unknown)=>createHash("sha256").update(JSON.stringify(value)).digest("hex");
function sign(value:unknown) { const body=Buffer.from(JSON.stringify(value)).toString("base64url"); return body+"."+createHmac("sha256",secret).update(body).digest("base64url"); }
function read(token:string) {
  const [body,signature,...rest]=token.split(".");
  if(!body || !signature || rest.length || token.length>4000) throw new Error("MATCH_EXPIRED");
  const expected=createHmac("sha256",secret).update(body).digest(); const actual=Buffer.from(signature,"base64url");
  if(expected.length!==actual.length || !timingSafeEqual(expected,actual)) throw new Error("MATCH_EXPIRED");
  return JSON.parse(Buffer.from(body,"base64url").toString()) as {trip:string;app:string;id:string;identity:string;expiry:number;previous:string|null};
}
function visible(place:GooglePlace):GooglePlace {
  // Photo resource names and websites used only for matching never enter the browser result.
  const {photos:_photos,websiteUri:_website,addressComponents:_address,...data}=place;
  void _photos; void _website; void _address;
  return data;
}
export interface GoogleDependencies { configuration?:()=>GoogleConfig|null; client?:(key:string)=>GoogleClient; now?:()=>Date }
export async function enrichGoogle(input:GoogleInput,deps:GoogleDependencies={}):Promise<Enrichment> {
  const synthetic=browserTestTransport();
  const configuration=deps.configuration ?? (synthetic ? ()=>synthetic.config : googleConfiguration), config=configuration();
  if(!config) return {status:"disabled",message:"Google enrichment is disabled. Your recommendations and Add remain available."};
  if(!["identity","context","reviews","photo","confirm","open"].includes(input.purpose) || !/^[a-zA-Z0-9-]{16,80}$/.test(input.requestId)) throw new Error("INVALID_REQUEST");
  const db=getPrismaClient(),now=deps.now ?? (()=>new Date());
  const recommendation=await db.recommendation.findFirst({where:{id:input.recommendationId,tripId:input.tripId,trip:{ownerId:PROTOTYPE_OWNER_ID}},include:{place:{include:{research:true}}}});
  if(!recommendation) throw new Error("TRIP_UNAVAILABLE");
  const app=catalogPlace(recommendation.placeId), metadata=resolveExperienceMetadata(recommendation.placeId,recommendation.place.research);
  if(!app || metadata.kind==="EVENT" || metadata.unavailable || recommendation.place.research) return {status:"unavailable",message:"This slice enriches independently curated Japan places only. Google venue data cannot verify an event occurrence."};
  const identity=hash([app.id,app.name,app.city,app.location,app.url]);
  if(input.purpose==="confirm") {
    const t=read(input.token??"");
    if(t.trip!==input.tripId || t.app!==app.id || t.identity!==identity || t.expiry<now().getTime()) throw new Error("MATCH_EXPIRED");
    const linked=await db.$transaction(async tx=>{
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${app.id}))`;
      const previous=await tx.googlePlaceReference.findUnique({where:{appPlaceId:app.id}});
      if((previous?hash(previous):null)!==t.previous) throw new Error("MATCH_CHANGED");
      return await tx.googlePlaceReference.upsert({where:{appPlaceId:app.id},create:{appPlaceId:app.id,googlePlaceId:t.id,identityHash:identity,reviewedAt:now()},update:{googlePlaceId:t.id,identityHash:identity,reviewedAt:now()}});
    });
    return {status:"ready",identity:{placeId:linked.googlePlaceId,revision:hash(linked)},matched:true,message:"Place ID linked. Independent description, saved plan and bookings are unchanged. Request current context when needed."};
  }
  const ref=await db.googlePlaceReference.findUnique({where:{appPlaceId:app.id}});
  if(input.purpose==="open") return ref && ref.identityHash===identity ? {status:"ready",matched:true,identity:{placeId:ref.googlePlaceId,revision:hash(ref)},message:"Linked location available for revalidation."} : {status:"needs_confirmation",message:"Review a location before using its details."};
  if(input.reference && (!ref || input.reference.placeId!==ref.googlePlaceId || input.reference.revision!==hash(ref))) return {status:"unavailable",identityChanged:true,message:"Location changed. Reopen details to review it."};
  if(input.purpose!=="identity" && (!ref || ref.identityHash!==identity)) return {status:"needs_confirmation",message:"Find and review an exact Google match first."};
  const requestHash=hash([input.tripId,input.recommendationId,input.purpose,ref?.googlePlaceId,identity]);
  await reserveGoogle(input.requestId,requestHash,input.purpose,config);
  try {
    // Recheck kill switch after reservation and immediately before every dispatch.
    const check=()=>{if(!configuration()) throw new Error("DISABLED");}; check();
    const client=deps.client?.(config.key) ?? new GoogleClient(config.key,synthetic?.transport,synthetic?.binary);
    await db.googleOperation.update({where:{id:input.requestId},data:{state:"DISPATCHED"}});
    let result:Enrichment;
    if(input.purpose==="identity") {
      const places=await client.search([app.name,app.location,app.city,"Japan"].filter(Boolean).join(", "));
      const candidates=places.map(p=>{const match=assessMatch(app,p);return {place:visible(p),...match,token:match.eligible?sign({trip:input.tripId,app:app.id,id:p.id,identity,previous:ref?hash(ref):null,expiry:now().getTime()+300_000}):undefined};});
      const count=candidates.filter(c=>c.eligible).length;
      const diagnostic=process.env.NODE_ENV==="development"&&process.env.GOOGLE_PLACES_DIAGNOSTICS==="bounded"&&count===0 ? candidates.some(c=>c.reason.includes("website conflicts"))?"MATCH_WEBSITE_CONFLICT":candidates.some(c=>c.reason.includes("insufficient"))?"MATCH_WEBSITE_INSUFFICIENT":"MATCH_IDENTITY_UNVERIFIED" : undefined;
      result={diagnostic,status:count>1?"ambiguous":count===1?"needs_confirmation":"unavailable",candidates,message:count>1?"Ambiguous: multiple corroborated candidates. Review exact venue before linking; no match is selected automatically.":count===1?"Review this candidate before linking. Matching does not verify access, tickets or a walking route.":"No corroborated match. Independent recommendation and Add remain available."};
    } else {
      const p=await client.details(ref!.googlePlaceId,input.purpose);
      if(p.movedPlaceId) throw new Error("PLACE_MOVED");
      if(p.businessStatus?.startsWith("CLOSED")) throw new Error("PLACE_CLOSED");
      if(p.id!==ref!.googlePlaceId || !assessMatch(app,p).eligible) throw new Error("MATCH_CHANGED");
      result={status:"ready",identity:{placeId:ref!.googlePlaceId,revision:hash(ref)},place:visible(p),matched:true,observedAt:now().toISOString(),message:"Google context for the linked place. Current/regular hours do not confirm future holiday access or availability."};
      if(input.purpose==="photo") {
        const photo=p.photos?.[0];
        if(photo?.name) {check();result.photo={data:await client.photo(p.id,photo.name),authors:photo.authorAttributions??[],source:photo.googleMapsUri};}
        else result.message="No Google photo supplied. Your recommendation and Add remain available.";
      }
    }
    if(input.purpose!=="identity") {
      const current=await db.googlePlaceReference.findUnique({where:{appPlaceId:app.id}});
      if(!current || hash(current)!==hash(ref)) throw new Error("MATCH_CHANGED");
    }
    await db.googleOperation.update({where:{id:input.requestId},data:{state:"COMPLETE"}});
    return result;
  } catch (error) {
    await db.googleOperation.update({where:{id:input.requestId},data:{state:"UNCERTAIN"}});
    return {status:"unavailable",identityChanged:error instanceof Error && ["MATCH_CHANGED","PLACE_MOVED","PLACE_CLOSED"].includes(error.message),warning:error instanceof Error&&error.message==="PLACE_MOVED"?"This location has moved. Verify the new location before planning a visit.":error instanceof Error&&error.message==="PLACE_CLOSED"?"This location is marked closed. Check the venue before planning a visit.":undefined,message:"Google context is unavailable or the match changed. Recheck the match; your independent recommendation and Add remain available. Reserved cost is retained conservatively."};
  }
}
