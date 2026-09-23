import { createHash } from "node:crypto";
import type { Prisma } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { lockPrototypeTrip } from "@/src/lib/trip-lock";
import { PROTOTYPE_OWNER_ID } from "../identity/prototype-owner";
import { researchConfiguration, type ResearchConfig } from "./config";
import { identityKey, evaluate } from "./validation";
import type { Evaluated, ResearchContext } from "./types";
export const digest=(value:unknown)=>createHash("sha256").update(JSON.stringify(value)).digest("hex");
export const asJson=(value:unknown)=>JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
export async function contextFor(tx:Prisma.TransactionClient,tripId:string,segmentId:string,country:string,language:string):Promise<ResearchContext>{
  const segment=await tx.tripSegment.findFirst({where:{id:segmentId,tripId,trip:{ownerId:PROTOTYPE_OWNER_ID}},include:{trip:{include:{preferenceProfile:true}}}});
  if(!segment)throw new Error("DESTINATION_UNAVAILABLE");
  if(!/^[\p{L} .'-]{2,80}$/u.test(country)||!["en","pt","ko","es","ja","fr","de","it"].includes(language))throw new Error("Confirm country and a supported language.");
  if(segment.baseName.length>120)throw new Error("Confirm a compact city destination.");
  return {tripId,segmentId,destination:segment.baseName.trim(),country:country.trim(),language,
    tripStart:segment.trip.startDate.toISOString().slice(0,10),tripEnd:segment.trip.endDate.toISOString().slice(0,10),
    start:segment.arrivalDate.toISOString().slice(0,10),end:segment.departureDate.toISOString().slice(0,10),
    interests:segment.trip.preferenceProfile?.discoverInterests??[]};
}
export async function startDestinationResearch(input:{tripId:string;segmentId:string;country:string;language:string},config=researchConfiguration().config) {
  if(!config)return {ok:false as const,error:"Research is not connected"};
  return getPrismaClient().$transaction(async tx=>{
    if(!await lockPrototypeTrip(tx,input.tripId))return {ok:false as const,error:"This trip is unavailable."};
    const context=await contextFor(tx,input.tripId,input.segmentId,input.country,input.language);
    const requestKey=digest(context),now=new Date();
    await tx.researchJob.updateMany({where:{state:{in:["QUEUED","RUNNING"]},deadline:{lt:now}},data:{state:"FAILED",reason:"Interrupted or timed out; explicit retry required.",finishedAt:now}});
    const throttled=await tx.researchJob.findFirst({where:{approval:config.approval,reason:{startsWith:"RATE_LIMIT:"},finishedAt:{not:null}},orderBy:{finishedAt:"desc"}});
    if(throttled?.finishedAt && throttled.finishedAt.getTime()+Number(throttled.reason!.split(":")[1])*1000>now.getTime())return {ok:false as const,error:"Provider rate limit: wait for the recorded Retry-After period before retrying."};
    const recent=await tx.researchJob.findFirst({where:{tripId:input.tripId,segmentId:input.segmentId,requestKey,
      OR:[{state:{in:["QUEUED","RUNNING"]}},{state:{in:["COMPLETED","PARTIAL"]},createdAt:{gt:new Date(now.getTime()-24*3600_000)}}]},orderBy:{createdAt:"desc"}});
    if(recent)return {ok:true as const,id:recent.id,reused:true};
    if(await tx.researchJob.count({where:{requestKey,createdAt:{gt:new Date(now.getTime()-86400_000)}}})>=3)return {ok:false as const,error:"Research retry limit reached for this context today."};
    // Global approval budget is reserved before queuing; a crash cannot refund unknown provider charges.
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(86732011)`;
    const spent=await tx.researchBudget.upsert({where:{approval:config.approval},update:{},create:{approval:config.approval}});
    if(spent.reservedUsd+config.maxUsd>config.pilotUsd)return {ok:false as const,error:"Approved pilot budget is reserved or exhausted."};
    await tx.researchBudget.update({where:{approval:config.approval},data:{reservedUsd:{increment:config.maxUsd}}});
    const job=await tx.researchJob.create({data:{tripId:input.tripId,segmentId:input.segmentId,requestKey,context:asJson(context),
      approval:config.approval,model:config.model,budgetUsd:config.maxUsd,deadline:new Date(now.getTime()+config.maxSeconds*1000)}});
    return {ok:true as const,id:job.id,reused:false};
  });
}
export async function researchStatus(tripId:string,segmentId:string){
  const db=getPrismaClient();
  if(!await db.trip.findFirst({where:{id:tripId,ownerId:PROTOTYPE_OWNER_ID}}))throw new Error("TRIP_UNAVAILABLE");
  const job=await db.researchJob.findFirst({where:{tripId,segmentId},orderBy:{createdAt:"desc"}});
  return {connected:!!researchConfiguration().config,job:job?{id:job.id,state:job.deadline<new Date()&&["QUEUED","RUNNING"].includes(job.state)?"FAILED":job.state,
    searches:job.searches,documents:job.documents,extractions:job.extractions,published:job.published,held:job.held,
    reason:job.reason,createdAt:job.createdAt.toISOString(),context:job.context as unknown as ResearchContext}:null};
}
export async function cancelResearch(tripId:string,id:string){
  return getPrismaClient().$transaction(async tx=>{
    if(!await lockPrototypeTrip(tx,tripId))throw new Error("TRIP_UNAVAILABLE");
    return tx.researchJob.updateMany({where:{id,tripId,state:{in:["QUEUED","RUNNING"]}},data:{state:"CANCELLED",finishedAt:new Date(),reason:"Cancelled by organizer. Existing ideas and itinerary preserved."}});
  });
}
export async function publishResearch(jobId:string,results:Evaluated[],clock:()=>Date=()=>new Date()){
  const db=getPrismaClient();
  return db.$transaction(async tx=>{
    const job=await tx.researchJob.findUniqueOrThrow({where:{id:jobId}});
    if(!await lockPrototypeTrip(tx,job.tripId))throw new Error("TRIP_UNAVAILABLE");
    // Lock after Trip, same ordering as start/cancel and all itinerary actions.
    await tx.$queryRaw`SELECT "id" FROM "ResearchJob" WHERE "id"=${jobId} FOR UPDATE`;
    const current=await tx.researchJob.findUniqueOrThrow({where:{id:jobId}});
    if(current.state!=="RUNNING"||current.deadline<clock())throw new Error("JOB_NOT_ACTIVE");
    const original=job.context as unknown as ResearchContext;
    const context=await contextFor(tx,job.tripId,job.segmentId,original.country,original.language);
    if(digest(context)!==job.requestKey)throw new Error("TRIP_CONTEXT_CHANGED");
    let published=0,held=0;
    const seen=new Set<string>(),hashes=new Set<string>();
    for(const result of results){
      const checked=evaluate(result.candidate,[result.document],context,clock);
      const identity=identityKey(checked);
      if(seen.has(identity))continue;seen.add(identity);
      if(hashes.has(checked.document.contentHash))checked.reasons.push("duplicate or syndicated content");
      hashes.add(checked.document.contentHash);
      const receipt=await tx.researchCandidate.findUnique({where:{jobId_identity:{jobId,identity}}});
      if(receipt)continue;
      const row=await tx.researchCandidate.create({data:{jobId,identity,payload:asJson(checked),reasons:checked.reasons}});
      if(checked.reasons.length){held++;continue;}
      const c=checked.candidate,d=checked.document;
      const placeId="research-"+digest(identity).slice(0,32);
      await tx.place.upsert({where:{id:placeId},update:{},create:{id:placeId,name:c.name,baseLabel:context.destination,category:c.category,interestTags:c.interests,address:context.destination+", "+context.country}});
      await tx.researchPlace.upsert({where:{placeId},update:{},create:{placeId,identity,originalName:c.originalName,kind:c.kind,country:context.country,
        destinationId:d.destinationId,sourceUrl:d.url,observedAt:new Date(c.event?.observedAt ?? d.retrievedAt),recheckAfter:c.event ? new Date(c.event.recheckAfter) : new Date(Date.parse(d.retrievedAt)+30*86400_000),
        eventStart:c.event?.startDate,eventEnd:c.event?.endDate,eventTimeZone:c.event?.timeZone,eventStatus:c.event?.status,eventPrecision:c.event?"DATE_ONLY":null}});
      const sourceId="research-source-"+digest(d.url).slice(0,32);
      await tx.source.upsert({where:{id:sourceId},update:{},create:{id:sourceId,name:d.url,kind:"RUNTIME_STRUCTURED_REFERENCE"}});
      for(const claim of d.claims.filter(cl=>c.claimLocators.includes(cl.locator))){
        const id="research-evidence-"+digest([placeId,d.id,claim.locator,claim.text]).slice(0,32);
        await tx.evidenceRecord.upsert({where:{id},update:{},create:{id,placeId,sourceId,topic:d.revision+":"+claim.locator,factualText:claim.text,
          retrievedAt:new Date(d.retrievedAt),status:claim.status,sourceUrl:d.url+"?oldid="+d.revision,locator:claim.locator,permissionBasis:"Wikidata CC0 structured data"}});
      }
      const exists=await tx.recommendation.findUnique({where:{tripSegmentId_placeId:{tripSegmentId:job.segmentId,placeId}}});
      if(!exists){
        const max=await tx.recommendation.aggregate({where:{tripId:job.tripId,tripSegmentId:job.segmentId},_max:{displayRank:true}});
        await tx.recommendation.create({data:{tripId:job.tripId,tripSegmentId:job.segmentId,placeId,factualSummary:c.description,
          logisticsNote:["Runtime structured reference; hours, access and availability unverified.",...c.uncertainties].join(" "),displayRank:(max._max.displayRank??-1)+1}});
        published++;
      }
      await tx.researchCandidate.update({where:{id:row.id},data:{publishedPlaceId:placeId}});
    }
    await tx.researchJob.update({where:{id:jobId},data:{published:{increment:published},held:{increment:held}}});
    return {published,held};
  },{timeout:15_000});
}
export async function reserveCall(id:string,kind:"searches"|"documents"|"extractions",config:ResearchConfig,cost=0,input=0,output=0){
  return getPrismaClient().$transaction(async tx=>{
    await tx.$queryRaw`SELECT "id" FROM "ResearchJob" WHERE "id"=${id} FOR UPDATE`;
    const j=await tx.researchJob.findUniqueOrThrow({where:{id}});
    const limit={searches:config.maxSearch,documents:config.maxDocuments,extractions:config.maxExtractions}[kind];
    if(j.state!=="RUNNING"||j.deadline<new Date())throw new Error("CANCELLED_OR_EXPIRED");
    if(j[kind]>=limit||j.reservedUsd+cost>j.budgetUsd||j.inputTokens+input>config.maxInputTokens||j.outputTokens+output>config.maxOutputTokens)throw new Error("BUDGET_LIMIT");
    await tx.researchJob.update({where:{id},data:{[kind]:{increment:1},reservedUsd:{increment:cost},inputTokens:{increment:input},outputTokens:{increment:output}}});
  });
}
