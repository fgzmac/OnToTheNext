"use server";
import { startDestinationResearch,researchStatus,cancelResearch } from "./service";
import { revalidatePath } from "next/cache";
export async function researchStart(input:{tripId:string;segmentId:string;country:string;language:string}){
  try{return await startDestinationResearch(input);}catch{return {ok:false as const,error:"Confirm the destination country and language, then try again."};}
}
export async function researchRead(tripId:string,segmentId:string){return researchStatus(tripId,segmentId);}
export async function researchCancel(tripId:string,id:string){await cancelResearch(tripId,id);revalidatePath("/trips/"+tripId+"/itinerary");}
