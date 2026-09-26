import { getPrismaClient } from "@/src/lib/prisma";
import { researchConfiguration, type ResearchConfig } from "./config";
import { publicHttp, type HttpTransport } from "./http";
import { braveSearch, readEntity, ids, documentFor, extract, extractionBody, type Entity } from "./adapters";
import { entityId } from "./policy";
import { parseCandidate, evaluate } from "./validation";
import { researchQueries } from "./queries";
import { publishResearch, reserveCall, digest, asJson } from "./service";
import type { Evaluated, ResearchContext } from "./types";
const norm=(s:string)=>s.normalize("NFKC").trim().toLocaleLowerCase();
export async function runResearchJob(id:string,options:{config?:ResearchConfig;transport?:HttpTransport;clock?:()=>Date;delay?:(ms:number)=>Promise<void>}={}){
  const config=options.config??researchConfiguration().config;
  if(!config)throw new Error("Research is not connected");
  const db=getPrismaClient(),transport=options.transport??publicHttp,clock=options.clock??(()=>new Date());
  const requestLog: {url:string;startedAt:string;finishedAt?:string;status?:number}[]=[];
  const send:HttpTransport=async input=>{ const row={url:input.url,startedAt:clock().toISOString()} as typeof requestLog[number]; requestLog.push(row);
    await db.researchJob.update({where:{id},data:{requestLog:JSON.parse(JSON.stringify(requestLog))}});
    const response=await transport(input);row.finishedAt=clock().toISOString();row.status=response.status;
    await db.researchJob.update({where:{id},data:{requestLog:JSON.parse(JSON.stringify(requestLog))}});return response; };
  const job=await db.researchJob.findUniqueOrThrow({where:{id}});
  if(job.approval!==config.approval||job.model!==config.model)throw new Error("ACTIVATION_CHANGED");
  const claim=await db.$transaction(async tx=>{
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(86732012)`;
    if(await tx.researchJob.count({where:{state:"RUNNING",deadline:{gt:clock()}}}))return {count:0};
    return tx.researchJob.updateMany({where:{id,state:"QUEUED",deadline:{gt:clock()}},data:{state:"RUNNING",startedAt:clock()}});
  });
  if(!claim.count)return;
  const c=job.context as unknown as ResearchContext,results:Evaluated[]=[],controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),Math.max(1,job.deadline.getTime()-clock().getTime()));
  const check=setInterval(()=>{void db.researchJob.findUnique({where:{id},select:{state:true}}).then(j=>{if(j?.state!=="RUNNING")controller.abort();}).catch(()=>controller.abort());},1000);
  const cache=new Map<string,Entity>();
  const read=async(qid:string)=>{
    const cached=cache.get(qid);if(cached)return cached;
    await reserveCall(id,"documents",config);
    await (options.delay??(ms=>new Promise(resolve=>setTimeout(resolve,ms))))(1000);
    if(controller.signal.aborted)throw new Error("CANCELLED");
    const e=await readEntity(qid,config,send,controller.signal);cache.set(qid,e);return e;
  };
  const search=async(q:string)=>{await reserveCall(id,"searches",config,config.searchUsd);return braveSearch(q,c,config,send,controller.signal);};
  let issue:string|null=null;
  try {
    const destinations:Entity[]=[];
    const hold=async(url:string,reason:string)=>{
      let reference="unsafe URL omitted";try{const u=new URL(url);if(!u.username&&!u.password)reference=u.origin+u.pathname;}catch{}
      const receipt=await db.researchCandidate.createMany({skipDuplicates:true,data:[{jobId:id,identity:"nomination:"+digest(url),payload:asJson({stage:"nomination",reference}),reasons:[reason]}]});
      if(receipt.count)await db.researchJob.update({where:{id},data:{held:{increment:1}}});
    };
    for(const url of await search(c.destination+" "+c.country+" site:wikidata.org/wiki/")){
      const qid=entityId(url);if(!qid)continue;
      const e=await read(qid);
      if(!Object.values(e.labels).some(l=>norm(l.value)===norm(c.destination)))continue;
      // Settlement taxonomy, not attraction-name seeds. A same-named store is not a city.
      if(!ids(e,"P31").some(type=>["Q515","Q1549591","Q3957","Q200250","Q5119","Q15284","Q486972"].includes(type)))continue;
      for(const country of ids(e,"P17")){
        const nation=await read(country);
        if(Object.values(nation.labels).some(l=>norm(l.value)===norm(c.country))&&!destinations.some(d=>d.id===e.id))destinations.push(e);
      }
    }
    if(destinations.length!==1)throw new Error("DESTINATION_AMBIGUOUS");
    const destination=destinations[0],countries=ids(destination,"P17"),visited=new Set<string>(),nominations=new Set<string>();
    const within=async(e:Entity,depth=0,path:string[]=[]):Promise<string[]|null>=>{
      if(e.id===destination.id)return [...path,e.id];
      if(depth>=3||path.includes(e.id))return null;
      for(const parent of ids(e,"P131").slice(0,3)){const chain=await within(await read(parent),depth+1,[...path,e.id]);if(chain)return chain;}
      return null;
    };
    for(const query of researchQueries(c)){
      for(const url of await search(query)){
        if(nominations.has(url))continue;nominations.add(url);
        const qid=entityId(url);if(!qid){await hold(url,"source access/processing not permitted");continue;}if(visited.has(qid)||qid===destination.id)continue;
        visited.add(qid);const e=await read(qid);
        const chain=await within(e);
        if(!chain||!ids(e,"P17").some(i=>countries.includes(i))){await hold(url,"exact destination/country unresolved");continue;}
        let d;try{d=documentFor(e,c,destination.id,chain,clock);}catch{await hold(url,"missing useful structured description");continue;}
        const maxOutput=Math.min(2000,config.maxOutputTokens);
        // UTF-8 bytes plus fixed overhead conservatively bound text tokens; no images/tools.
        const input=Buffer.byteLength(JSON.stringify(extractionBody(d,c,config,maxOutput)),"utf8")+2048;
        const cost=(input*config.inputUsdPerMillion+maxOutput*config.outputUsdPerMillion)/1e6;
        await reserveCall(id,"extractions",config,cost,input,maxOutput);
        const response=await extract(d,c,config,send,maxOutput,controller.signal);
        await db.researchJob.update({where:{id},data:{actualInputTokens:{increment:response.inputTokens},actualOutputTokens:{increment:response.outputTokens}}});
        if(response.inputTokens>input||response.outputTokens>maxOutput)throw new Error("PROVIDER_USAGE_EXCEEDED");
        for(const raw of response.candidates.slice(0,5)){
          try{results.push(evaluate(parseCandidate(raw),[d],c,clock));}catch{issue="Invalid extraction or invented reference withheld";}
        }
      }
    }
  }catch(error){
    const raw=error instanceof Error?error.message:"RESEARCH_FAILED";
    // Never persist raw provider responses, keys or arbitrary page text as errors.
    issue=/^(BUDGET_LIMIT|DESTINATION_AMBIGUOUS|RATE_LIMIT:\d+|HTTP_STATUS:\d+|CANCELLED|CANCELLED_OR_EXPIRED|EXTRACTION_[A-Z_]+|PROVIDER_USAGE_EXCEEDED)$/.test(raw)?raw:"Source or extraction failed; coverage incomplete.";
  }finally{clearTimeout(timeout);clearInterval(check);}
  try{
    const state=await db.researchJob.findUniqueOrThrow({where:{id}});
    if(state.state!=="RUNNING")return;
    if(state.deadline<clock())throw new Error("TIME_LIMIT");
    const publication=await publishResearch(id,results,clock);
    await db.researchJob.updateMany({where:{id,state:"RUNNING"},data:{state:issue&&!results.length?"FAILED":issue||publication.held||state.held?"PARTIAL":"COMPLETED",finishedAt:clock(),
      reason:issue??(publication.published ? "Limited to permitted structured references; no verified event or photo coverage." : "No useful verified matches; this does not mean no experiences or events exist.")}});
  }catch(error){
    await db.researchJob.updateMany({where:{id,state:"RUNNING"},data:{state:"FAILED",finishedAt:clock(),reason:error instanceof Error&&["TRIP_CONTEXT_CHANGED","TIME_LIMIT"].includes(error.message)?error.message:"Publication withheld; cancelled, expired or changed context."}});
  }
}
export async function runNextResearchJob(){
  const config=researchConfiguration().config;if(!config)throw new Error("Research is not connected");
  const db=getPrismaClient();
  await db.researchJob.updateMany({where:{state:{in:["QUEUED","RUNNING"]},deadline:{lt:new Date()}},data:{state:"FAILED",finishedAt:new Date(),reason:"Interrupted; explicit retry required."}});
  const next=await db.researchJob.findFirst({where:{state:"QUEUED"},orderBy:{createdAt:"asc"}});
  if(next)await runResearchJob(next.id,{config});
  return next?.id??null;
}
