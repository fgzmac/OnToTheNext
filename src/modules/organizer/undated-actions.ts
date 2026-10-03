"use server";
import { getPrismaClient } from "@/src/lib/prisma";
import { PROTOTYPE_OWNER_ID } from "../identity/prototype-owner";
import { fingerprint,signActionPreview,readActionPreview } from "../itinerary/preview-token";
import { parsePaste,type InputItem } from "./domain";
import { acceptImport } from "./service";
import type { Prisma } from "@/src/generated/prisma/client";
function fail(e:unknown){return {ok:false as const,error:e instanceof Error?e.message:"The list could not be saved."};}
export async function listUndated(){try{const db=getPrismaClient();const lists=await db.importBatch.findMany({where:{ownerId:PROTOTYPE_OWNER_ID,tripId:null},orderBy:{createdAt:"desc"}});const trips=await db.trip.findMany({where:{ownerId:PROTOTYPE_OWNER_ID},select:{id:true,name:true,destinationLabel:true},orderBy:{createdAt:"desc"}});return {ok:true as const,lists:lists.map(l=>({id:l.id,text:l.originalText,items:l.undatedItems as unknown as InputItem[],token:signActionPreview({purpose:"undated",id:l.id,hash:fingerprint(l)})})),trips};}catch(e){return fail(e);}}
export async function saveUndated(text:string,items:InputItem[],id?:string,token?:string){try{
 if(typeof text!=="string"||!text.trim()||text.length>40000||!Array.isArray(items)||items.length>150)throw Error("Review up to 150 items and 40,000 characters.");
 // Reuse the bounded parser's structure; this surface edits the source text, not arbitrary JSON.
 const parsed=parsePaste(text);if(fingerprint(parsed)!==fingerprint(items))throw Error("Review the current source text again.");
 const db=getPrismaClient();return await db.$transaction(async tx=>{
 const requestHash=fingerprint({text,undated:true});
 if(id){await tx.$queryRaw`SELECT "id" FROM "ImportBatch" WHERE "id"=${id} AND "ownerId"=${PROTOTYPE_OWNER_ID} FOR UPDATE`;const current=await tx.importBatch.findFirst({where:{id,ownerId:PROTOTYPE_OWNER_ID,tripId:null}});const expected=readActionPreview<{purpose:string;id:string;hash:string}>(token??"");if(!current||!expected||expected.purpose!=="undated"||expected.id!==id||expected.hash!==fingerprint(current))throw Error("This list changed. Reopen it before saving.");await tx.importBatch.update({where:{id},data:{requestHash,originalText:text,undatedItems:parsed as unknown as Prisma.InputJsonValue}});return {ok:true as const,id};}
 const previous=await tx.importBatch.findUnique({where:{ownerId_requestHash:{ownerId:PROTOTYPE_OWNER_ID,requestHash}}});if(previous)return {ok:true as const,id:previous.id};
 const batch=await tx.importBatch.create({data:{ownerId:PROTOTYPE_OWNER_ID,requestHash,originalText:text,undatedItems:parsed as unknown as Prisma.InputJsonValue}});return {ok:true as const,id:batch.id};
 });}catch(e){return fail(e);}}
export async function attachUndated(id:string,tripId:string,token:string){try{const batch=await getPrismaClient().importBatch.findFirst({where:{id,ownerId:PROTOTYPE_OWNER_ID,tripId:null}});const expected=readActionPreview<{purpose:string;id:string;hash:string}>(token);if(!batch||!expected||expected.purpose!=="undated"||expected.id!==id||expected.hash!==fingerprint(batch))throw Error("This list changed. Reopen it before attaching.");await acceptImport(tripId,batch.originalText,batch.undatedItems as unknown as InputItem[],"",false);return {ok:true as const};}catch(e){return fail(e);}}
