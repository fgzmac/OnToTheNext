import type { Prisma } from "@/src/generated/prisma/client";
import { getPrismaClient } from "@/src/lib/prisma";
import { COST, type GoogleConfig } from "./config";
import type { Purpose } from "./types";
export const ACCOUNT = "aggregate-pilot";
export async function ensureAccount(tx:Prisma.TransactionClient,config:GoogleConfig) {
  return tx.providerPilotBudget.upsert({where:{id:ACCOUNT},update:{},create:{id:ACCOUNT,ceilingMicros:config.ceilingMicros,googleLimitMicros:config.googleMicros,maxSearch:config.maxSearch,maxDetails:config.maxDetails,maxPhotos:config.maxPhotos}});
}
export async function researchAggregateAvailable(tx:Prisma.TransactionClient, extraUsd:number) {
  const account=await tx.providerPilotBudget.findUnique({where:{id:ACCOUNT}});
  if(!account) return true;
  const rows=await tx.researchBudget.findMany();
  const prior=rows.reduce((sum,row)=>sum+Math.ceil(row.reservedUsd*1_000_000),0);
  return prior+Math.ceil(extraUsd*1_000_000)+account.googleReservedMicros<=account.ceilingMicros;
}
export async function reserveGoogle(id:string,requestHash:string,purpose:Purpose,config:GoogleConfig) {
  return getPrismaClient().$transaction(async tx=>{
    // Same global accounting lock as existing research; no external work and no Trip lock.
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(86732011)`;
    if(await tx.googleOperation.findUnique({where:{id}})) throw new Error("DUPLICATE_REQUEST");
    const a=await ensureAccount(tx,config);
    const searches=purpose==="identity"?1:0,details=purpose==="identity"?0:1,photos=purpose==="photo"?1:0;
    const cost=purpose==="identity"?COST.search:purpose==="reviews"?COST.reviews:COST.context+photos*COST.photo;
    const legacy=(await tx.researchBudget.findMany()).reduce((sum,row)=>sum+Math.ceil(row.reservedUsd*1_000_000),0);
    if(a.googleReservedMicros+cost>Math.min(a.googleLimitMicros,config.googleMicros) || legacy+a.googleReservedMicros+cost>Math.min(a.ceilingMicros,config.ceilingMicros)
      || a.searches+searches>Math.min(a.maxSearch,config.maxSearch) || a.details+details>Math.min(a.maxDetails,config.maxDetails) || a.photos+photos>Math.min(a.maxPhotos,config.maxPhotos)) throw new Error("BUDGET_EXHAUSTED");
    await tx.providerPilotBudget.update({where:{id:ACCOUNT},data:{googleReservedMicros:{increment:cost},searches:{increment:searches},details:{increment:details},photos:{increment:photos}}});
    await tx.googleOperation.create({data:{id,requestHash,purpose,approval:config.approval,reservedMicros:cost,searches,details,photos}});
  });
}
