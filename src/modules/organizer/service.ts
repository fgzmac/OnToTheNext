import type { Prisma } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { lockPrototypeTrip } from "@/src/lib/trip-lock";
import { PROTOTYPE_OWNER_ID } from "../identity/prototype-owner";
import { formatDateOnly, toUtcDate } from "../trips/date-only";
import { safeBookingUrl, validDate } from "../reservations/domain";
import { fingerprint, readActionPreview, signActionPreview } from "../itinerary/preview-token";
import { normalizeDayPositions } from "../itinerary/ordering";
import { resolveExperienceMetadata } from "../experiences/metadata";
import { eventMatches } from "../discover/events";
import { independentContent } from "./independent-content";
import { identity, organize, periodsOverlap, gapDurationEligible, PERIODS, type InputItem, type Placement } from "./domain";

async function context(tx:Prisma.TransactionClient, tripId:string) {
  const trip=await tx.trip.findFirst({where:{id:tripId,ownerId:PROTOTYPE_OWNER_ID},include:{organizerState:true,segments:{orderBy:{position:"asc"}},days:{orderBy:{position:"asc"}},reservations:true,
    itineraryItems:{include:{organizerIdea:true,reservation:true,sourceRecommendation:{include:{place:{include:{research:true}}}}},orderBy:[{position:"asc"},{id:"asc"}]}}});
  if(!trip)throw Error("Trip unavailable.");
  return trip;
}
type Context=Awaited<ReturnType<typeof context>>;
type StoredItem=Context["itineraryItems"][number];
function data(i:StoredItem):InputItem|null {return i.organizerIdea?.input as InputItem|null;}
function hash(c:Context){return fingerprint(c);}
function dto(c:Context) {
  const days=c.days.map((d,index)=>({id:d.id,date:formatDateOnly(d.date),city:c.segments.find(s=>s.id===d.primarySegmentId)?.baseName??"",transfer:c.segments.some(s=>formatDateOnly(s.arrivalDate)===formatDateOnly(d.date)||formatDateOnly(s.departureDate)===formatDateOnly(d.date)),arrivalCity:c.segments.find(s=>formatDateOnly(s.arrivalDate)===formatDateOnly(d.date))?.baseName,departureCity:c.segments.find(s=>formatDateOnly(s.departureDate)===formatDateOnly(d.date))?.baseName,first:index===0,last:index===c.days.length-1}));
  const items=c.itineraryItems.map(i=>{const input=data(i),independent=independentContent(i.title,input?.city??"");return {id:i.id,title:i.title,city:input?.city??days.find(d=>d.id===i.dayId)?.city??"",date:input?.date??"",time:input?.time??"",period:i.period??input?.period??"",sourcePeriod:input?.period??"",kind:input?.kind??(["FREE_TIME","HOTEL_REST"].includes(i.type)?"PROTECTED":"ACTIVITY"),priority:input?.priority??false,
    outing:input?.outing??"",area:input?.area??"",sequence:input?.sequence??"",shortVisit:input?.shortVisit??"",conditionalEvening:input?.conditionalEvening??"",description:input?.description||independent?.description||"",decision:input?.decision??"",sourceRole:input?.sourceRole??"Supplied planning input",descriptionSource:input?.description?null:independent,
    alternative:i.organizerIdea?.disposition==="OPTIONAL",excluded:i.organizerIdea?.disposition==="EXCLUDED",dayId:i.dayId,position:i.position,fixed:i.flexibility==="FIXED",bookedDate:i.reservation?.state==="BOOKED"&&i.reservation.confirmedDate?formatDateOnly(i.reservation.confirmedDate):null,
    booking:i.reservation?{id:i.reservation.id,state:i.reservation.state,date:i.reservation.confirmedDate?formatDateOnly(i.reservation.confirmedDate):null,time:i.reservation.confirmedStartMinute,reference:i.reservation.confirmationReference}:null,
    reason:(i.organizerIdea?.input as {outcomeReason?:string}|null)?.outcomeReason??"",notes:i.notes??"",fragment:i.organizerIdea?.sourceFragment??"",pending:i.organizerIdea?.pending??false,imported:Boolean(i.organizerIdea),revision:i.revision,progress:i.progress};});
  return {tripId:c.id,locked:c.organizerState?.locked??false,revision:c.organizerState?.revision??0,token:signActionPreview({purpose:"organizer-state",tripId:c.id,hash:hash(c)}),days,items};
}
export type OrganizerWorkspace=ReturnType<typeof dto>;
export async function getOrganizer(tripId:string) {return getPrismaClient().$transaction(async tx=>dto(await context(tx,tripId)),{isolationLevel:"RepeatableRead"});}
function verify(token:string,c:Context,purpose="organizer-state") {const t=readActionPreview<{purpose:string;tripId:string;hash:string}>(token);if(!t||t.purpose!==purpose||t.tripId!==c.id||t.hash!==hash(c))throw Error("The itinerary, lock, inputs or booking changed. Refresh and preview again; nothing was overwritten.");}
async function mutate<T>(tripId:string,fn:(tx:Prisma.TransactionClient,c:Context)=>Promise<T>) {return getPrismaClient().$transaction(async tx=>{if(!await lockPrototypeTrip(tx,tripId))throw Error("Trip unavailable.");return fn(tx,await context(tx,tripId));},{timeout:15000});}
async function bump(tx:Prisma.TransactionClient,tripId:string,locked?:boolean) {await tx.organizerState.upsert({where:{tripId},create:{tripId,locked:locked??false,revision:1},update:{revision:{increment:1},...(locked===undefined?{}:{locked})}});}
function unlocked(c:Context){if(c.organizerState?.locked)throw Error("Itinerary is locked. Ideas and bookings can still be saved; unlock before changing placements.");}
export async function setLock(tripId:string,token:string,locked:boolean){return mutate(tripId,async(tx,c)=>{verify(token,c);await bump(tx,tripId,locked);});}
function validateItem(value:InputItem) {
  if(!value || typeof value!=="object")throw Error("Invalid import item.");
  for(const key of ["name","city","date","time","period","notes","url","fragment","kind","booking"] as const)if(typeof value[key]!=="string"||value[key].length>(["notes","fragment"].includes(key)?40000:500))throw Error("Review the input field lengths.");
  for(const key of ["outing","area","description","decision","sourceRole","sequence","shortVisit","conditionalEvening"] as const)if(value[key]!==undefined&&(typeof value[key]!=="string"||value[key]!.length>2000))throw Error("Keep source context fields within 2,000 characters.");
  if(value.sequence&&!/^\d{1,3}$/.test(value.sequence))throw Error("Source sequence must be a whole number between 0 and 999.");
  if(!value.name.trim()||!PERIODS.includes(value.period as typeof PERIODS[number])||!["ACTIVITY","NOTE","PROTECTED"].includes(value.kind)||!["","NEED_TICKETS","BOOKED_STATEMENT"].includes(value.booking))throw Error("Review item name, kind, period and booking statement.");
  if(value.date&&!validDate(value.date))throw Error("Use a real calendar date.");
  if(value.time&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(value.time))throw Error("Use a valid 24-hour time.");
  if(value.url && !safeBookingUrl(value.url))throw Error("Reference links must use HTTP(S), without credentials.");
  return value;
}
export async function acceptImport(tripId:string,text:string,values:InputItem[],repeatKey:string,confirmBooked:boolean) {
  if(typeof text!=="string"||!text.trim()||text.length>40000||!Array.isArray(values)||!values.length||values.length>150||typeof repeatKey!=="string"||repeatKey.length>80)throw Error("Invalid import size.");
  values.forEach(validateItem);
  return mutate(tripId,async(tx,c)=>{
    const requestHash=fingerprint({text,repeatKey});
    const previous=await tx.importBatch.findUnique({where:{tripId_requestHash:{tripId,requestHash}}});if(previous)return {alreadySaved:true};
    const batch=await tx.importBatch.create({data:{tripId,requestHash,originalText:text}});
    const seen=new Set(c.itineraryItems.map(i=>identity(i.title)+"|"+identity(data(i)?.city??"")+"|"+(data(i)?.date??"")));
    for(const [sourceOrder,input] of values.entries()){
      const duplicate=seen.has(identity(input.name)+"|"+identity(input.city)+"|"+input.date)&&!repeatKey;
      const disposition=input.excluded?"EXCLUDED":duplicate?"DUPLICATE_REVIEW":input.alternative?"OPTIONAL":"INCLUDED";
      const item=await tx.itineraryItem.create({data:{tripId,dayId:null,type:input.kind==="PROTECTED"?"HOTEL_REST":"ACTIVITY",title:input.name.trim(),enteredManually:true,position:sourceOrder,period:input.period||null,notes:input.notes||null,locationLabel:input.city||null,referenceUrl:safeBookingUrl(input.url)||null,
        startMinute:input.time?Number(input.time.slice(0,2))*60+Number(input.time.slice(3)):null,flexibility:input.time||input.kind==="PROTECTED"?"FIXED":"FLEXIBLE"}});
      await tx.organizerIdea.create({data:{tripId,batchId:batch.id,itemId:item.id,input:input as unknown as Prisma.InputJsonValue,sourceFragment:input.fragment,pending:disposition==="INCLUDED",disposition}});
      if(input.booking && !duplicate && !input.excluded){
        const booked=input.booking==="BOOKED_STATEMENT"&&confirmBooked;
        await tx.reservation.create({data:{tripId,itineraryItemId:item.id,title:item.title,type:"ACTIVITY",state:booked?"BOOKED":"BOOK_NOW",desiredDate:input.date?toUtcDate(input.date):null,confirmedDate:booked&&input.date?toUtcDate(input.date):null,confirmedStartMinute:booked?item.startMinute:null,bookingSourceLabel:"User-supplied import; not independently verified",notes:input.notes}});
      }
      seen.add(identity(input.name)+"|"+identity(input.city)+"|"+input.date);
    }
    await bump(tx,tripId);return {alreadySaved:false};
  });
}
type Proposal={placements:Placement[];token:string;warnings:string[]};
function sourceEligible(i:StoredItem,c:Context,dayId:string) {
  const d=c.days.find(d=>d.id===dayId);if(!d)throw Error("Choose a Day in this trip.");
  const source=i.sourceRecommendation;
  if(source){const own=c.segments.find(s=>s.id===source.tripSegmentId),target=c.segments.find(s=>s.id===d.primarySegmentId);if(!own||!target||identity(own.baseName)!==identity(target.baseName))throw Error("This activity belongs to a different destination.");
    const m=resolveExperienceMetadata(source.placeId,source.place.research);if(m.unavailable||(m.event&&!eventMatches(m.event,formatDateOnly(d.date))))throw Error("Event or source eligibility needs review for this date.");}
  const input=data(i);if(input?.city&&!c.segments.some(s=>identity(s.baseName)===identity(input.city)&&d.date>=s.arrivalDate&&d.date<=s.departureDate))throw Error("Choose a Day matching the supplied city; no location was guessed.");
}
function seal(c:Context,placements:Placement[],warnings:string[]):Proposal {return {placements,warnings,token:signActionPreview({purpose:"organizer-apply",tripId:c.id,hash:hash(c),proposalHash:fingerprint(placements)})};}
export async function previewOrganization(tripId:string,ids:string[]) {return getPrismaClient().$transaction(async tx=>{const c=await context(tx,tripId),w=dto(c);if(!Array.isArray(ids)||ids.length>150)throw Error("Select up to 150 ideas.");
  const eligible=w.items.filter(i=>i.imported&&!i.dayId&&i.pending).map(i=>i.id);if(ids.some(id=>!eligible.includes(id)))throw Error("Select pending user-supplied ideas; saved placements remain untouched.");
  const checked=w.items.map(i=>{const stored=c.itineraryItems.find(x=>x.id===i.id)!;let eligibilityReason="";const eligibleDays=w.days.filter(d=>{try{sourceEligible(stored,c,d.id);return true;}catch(e){if(identity(d.city)===identity(i.city)||identity(d.arrivalCity??"")===identity(i.city))eligibilityReason=e instanceof Error?e.message:"Source eligibility needs review.";return false;}}).map(d=>d.id);return {...i,eligibleDays,eligibilityReason};});
  const placements=organize(checked,w.days,ids);return seal(c,placements,["Only selected waiting ideas are proposed. Saved placements and bookings stay unchanged.","Suggested periods are an outline, not verified hours, duration or transport."]);},{isolationLevel:"RepeatableRead"});}
export async function previewPlacement(tripId:string,itemId:string,dayId:string|null,period:string,index?:number) {return getPrismaClient().$transaction(async tx=>{
  const c=await context(tx,tripId),item=c.itineraryItems.find(i=>i.id===itemId);if(!item)throw Error("Item unavailable.");
  if(!PERIODS.includes(period as typeof PERIODS[number]))throw Error("Invalid period.");
  if(dayId)sourceEligible(item,c,dayId);
  const others=c.itineraryItems.filter(i=>i.dayId===dayId&&i.id!==itemId);
  if(dayId&&others.some(i=>(i.period==="Full day"||period==="Full day")||((data(i)?.kind==="PROTECTED"||["HOTEL_REST","FREE_TIME"].includes(i.type))&&periodsOverlap(period,i.period??""))))throw Error("This placement conflicts with protected or full-day time. Review that protection separately.");
  const warnings:string[]=[];
  if(data(item)?.date && (!dayId || data(item)!.date!==formatDateOnly(c.days.find(d=>d.id===dayId)!.date)))warnings.push("This changes the placement away from the supplied date. The original source date remains in the notes and import record.");
  if(item.flexibility==="FIXED"||item.startMinute!==null||item.reservation?.state==="BOOKED")warnings.push("Fixed-time / booking consequence: only the itinerary placement changes. The supplier booking and its confirmed date/time remain unchanged.");
  if(dayId&&item.reservation?.confirmedDate&&formatDateOnly(item.reservation.confirmedDate)!==formatDateOnly(c.days.find(d=>d.id===dayId)!.date))warnings.push("The proposed Day disagrees with the confirmed booking date.");
  if(dayId&&item.sourceRecommendation?.place.research?.kind==="EVENT")warnings.push("Event-date eligibility was rechecked; ticket availability is not verified.");
  const placement:Placement={id:itemId,dayId,period,reason:index===undefined?"Move to end of selected Day.":"Reorder within selected Day at position "+Math.max(0,Math.min(others.length,index))};
  return seal(c,[placement],warnings);
},{isolationLevel:"RepeatableRead"});}
export async function applyProposal(tripId:string,proposal:Proposal,relock:boolean) {return mutate(tripId,async(tx,c)=>{
  const receipt=fingerprint(proposal.token);const old=await tx.organizerChange.findUnique({where:{id:receipt}});if(old&&old.tripId===tripId)return {undo:receipt,repeated:true};
  unlocked(c);verify(proposal.token,c,"organizer-apply");const token=readActionPreview<{proposalHash:string}>(proposal.token);if(!token||token.proposalHash!==fingerprint(proposal.placements))throw Error("The proposal was changed. Preview again.");
  const before=c.itineraryItems.map(i=>({id:i.id,dayId:i.dayId,position:i.position,period:i.period,pending:i.organizerIdea?.pending??null,input:i.organizerIdea?.input??null}));
  const affected=new Set<string>();
  for(const p of proposal.placements){
    const item=c.itineraryItems.find(i=>i.id===p.id);if(!item)throw Error("Item unavailable.");
    if(item.dayId)affected.add(item.dayId);if(p.dayId){sourceEligible(item,c,p.dayId);affected.add(p.dayId);}
    const max=p.dayId?await tx.itineraryItem.aggregate({where:{dayId:p.dayId},_max:{position:true}}):null;
    await tx.itineraryItem.update({where:{id:item.id},data:{dayId:p.dayId,period:p.period||null,position:p.dayId?(max?._max.position??-1)+1:0,revision:{increment:1}}});
    if(item.organizerIdea)await tx.organizerIdea.update({where:{id:item.organizerIdea.id},data:{...(p.dayId?{pending:false}:{}),input:{...(data(item)??{}),outcomeReason:p.reason} as Prisma.InputJsonValue,revision:{increment:1}}});
    const indexMatch=p.reason.match(/^Reorder within selected Day at position (\d+)$/);
    if(indexMatch&&p.dayId){const ids=(await tx.itineraryItem.findMany({where:{dayId:p.dayId,id:{not:item.id}},orderBy:{position:"asc"},select:{id:true}})).map(i=>i.id);ids.splice(Number(indexMatch[1]),0,item.id);await normalizeDayPositions(tx,p.dayId,ids);}
  }
  for(const id of affected)await normalizeDayPositions(tx,id);
  await bump(tx,tripId,relock?true:undefined);
  const afterHash=hash(await context(tx,tripId));await tx.organizerChange.create({data:{id:receipt,tripId,afterHash,before:before as Prisma.InputJsonValue}});
  return {undo:receipt,repeated:false};
});}
export async function undoChange(tripId:string,id:string) {return mutate(tripId,async(tx,c)=>{unlocked(c);const change=await tx.organizerChange.findUnique({where:{id}});if(!change||change.tripId!==tripId||change.afterHash!==hash(c))throw Error("Undo is stale: the plan, lock or booking changed. Review the current itinerary.");
  const previous=change.before as {id:string;dayId:string|null;position:number;period:string|null;pending:boolean|null;input?:Prisma.InputJsonValue}[];
  await tx.itineraryItem.updateMany({where:{tripId},data:{position:{increment:100000}}});
  for(const p of previous){await tx.itineraryItem.update({where:{id:p.id},data:{dayId:p.dayId,position:p.position,period:p.period,revision:{increment:1}}});if(p.pending!==null)await tx.organizerIdea.update({where:{itemId:p.id},data:{pending:p.pending,...(p.input?{input:p.input}:{}),revision:{increment:1}}});}
  await bump(tx,tripId);
});}
export async function includeIdea(tripId:string,itemId:string,token:string,disposition:string,resolvedName?:string){return mutate(tripId,async(tx,c)=>{verify(token,c);const i=c.itineraryItems.find(i=>i.id===itemId);if(!i?.organizerIdea||i.dayId||!["INCLUDED","OPTIONAL","EXCLUDED"].includes(disposition))throw Error("Choose an unscheduled imported idea.");const supplied=data(i)!;if(disposition==="INCLUDED"&&supplied.alternative&&/\sor\s/i.test(supplied.name)){const choices=supplied.name.split(/\s+or\s+/i);if(!resolvedName||!choices.includes(resolvedName))throw Error("Choose one of the supplied alternatives first.");await tx.itineraryItem.update({where:{id:itemId},data:{title:resolvedName,revision:{increment:1}}});}await tx.organizerIdea.update({where:{itemId},data:{disposition,pending:disposition==="INCLUDED",...(resolvedName?{input:{...supplied,name:resolvedName,alternative:false} as Prisma.InputJsonValue}:{}),revision:{increment:1}}});await bump(tx,tripId);});}
export async function saveIdeaNotes(tripId:string,itemId:string,revision:number,notes:string){return mutate(tripId,async(tx,c)=>{const i=c.itineraryItems.find(i=>i.id===itemId);if(!i||i.revision!==revision)throw Error("Item changed. Refresh before editing notes.");if(typeof notes!=="string"||notes.length>2000)throw Error("Keep notes within 2,000 characters.");await tx.itineraryItem.update({where:{id:itemId},data:{notes,revision:{increment:1}}});});}
export async function saveRecommendationIdea(tripId:string,recommendationId:string){return mutate(tripId,async(tx,c)=>{const r=await tx.recommendation.findFirst({where:{id:recommendationId,tripId},include:{place:true,tripSegment:true}});if(!r)throw Error("Idea unavailable.");if(c.itineraryItems.some(i=>i.sourceRecommendationId===r.id))return;
  await tx.itineraryItem.create({data:{tripId,dayId:null,type:"ACTIVITY",title:r.place.name,sourceRecommendationId:r.id,position:0,durationMinutes:r.durationMinutes,locationLabel:r.place.address,notes:r.factualSummary}});await bump(tx,tripId);});}
export async function findGapIdeas(tripId:string,dayId:string,start:string,minutes:number,period:string,allowProtected:boolean) {
  if(typeof start!=="string"||start.trim().length<2||start.length>200||!Number.isInteger(minutes)||minutes<1||minutes>1440||!PERIODS.includes(period as typeof PERIODS[number]))throw Error("Confirm your starting point, available minutes and period.");
  return getPrismaClient().$transaction(async tx=>{const c=await context(tx,tripId),w=dto(c),day=w.days.find(d=>d.id===dayId);if(!day)throw Error("Choose a Day.");
    const scheduled=w.items.filter(i=>i.dayId===dayId);
    if(!allowProtected&&scheduled.some(i=>i.kind==="PROTECTED"&&periodsOverlap(i.period,period)))throw Error("This time is protected. Keep it free, or explicitly request ideas for this protected period.");
    const names=new Set(w.items.filter(i=>i.dayId||i.progress==="COMPLETED"||i.excluded).map(i=>identity(i.title)));
    const own=w.items.filter(i=>!i.dayId&&!i.excluded&&i.progress!=="COMPLETED"&&i.kind==="ACTIVITY"&&identity(i.city)===identity(day.city)&&!names.has(identity(i.title))&&(!i.date||i.date===day.date)&&(!i.bookedDate||i.bookedDate===day.date)&&i.period!=="Full day").filter(i=>{try{const stored=c.itineraryItems.find(x=>x.id===i.id)!;sourceEligible(stored,c,dayId);return gapDurationEligible(i.period,i.notes,stored.durationMinutes,minutes);}catch{return false;}});
    const rows=await tx.recommendation.findMany({where:{tripId,tripSegmentId:c.days.find(d=>d.id===dayId)!.primarySegmentId??"",decision:{isNot:{outcome:"DENIED"}}},include:{place:{include:{research:true}},scheduledItem:true},orderBy:{displayRank:"asc"}});
    const others=rows.filter(r=>!r.scheduledItem&&!names.has(identity(r.place.name))&&!own.some(i=>identity(i.title)===identity(r.place.name))).filter(r=>{const m=resolveExperienceMetadata(r.placeId,r.place.research);return !m.unavailable&&(!m.event||eventMatches(m.event,day.date))&&(r.durationMinutes===null||r.durationMinutes+30<=minutes);}).slice(0,5).map(r=>({id:r.id,title:r.place.name,description:r.factualSummary,duration:r.durationMinutes,warning:r.durationMinutes===null?"Visit duration unknown; fit is not established.":"Stored duration plus a 30-minute planning buffer only; transport, access and opening hours need review."}));
    const commitments=scheduled.filter(i=>i.fixed||i.booking||i.kind==="PROTECTED").map(i=>`${i.title} · ${i.time||i.period||"time unknown"}`);
    return {own,others,commitments,locked:w.locked,warning:`Starting point confirmed by you: ${start}. No live route, current location or transport time was inferred. Available time: ${minutes} minutes. Unknown duration, access preferences and booking requirements need your review before adding.`};
  },{isolationLevel:"RepeatableRead"});
}
