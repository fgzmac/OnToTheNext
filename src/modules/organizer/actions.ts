"use server";
import { revalidatePath } from "next/cache";
import { acceptImport, applyProposal, findGapIdeas, getOrganizer, includeIdea, previewOrganization, previewPlacement, saveIdeaNotes, saveRecommendationIdea, setLock, undoChange } from "./service";
import { getItineraryReservationContext } from "../reservations/service";
import type { InputItem, Placement } from "./domain";
async function run<T>(tripId:string, operation:()=>Promise<T>) {try {const data=await operation();revalidatePath(`/trips/${tripId}/itinerary`);revalidatePath(`/trips/${tripId}/reservations`);return {ok:true as const,data};}catch(e){return {ok:false as const,error:e instanceof Error?e.message:"Could not save. Your prior plan is unchanged."};}}
export async function loadOrganizer(tripId:string){try{return {ok:true as const,data:await getOrganizer(tripId)};}catch(e){return {ok:false as const,error:e instanceof Error?e.message:"Organizer could not be loaded."};}}
export async function importActivities(tripId:string,text:string,items:InputItem[],repeatKey:string,confirmBooked:boolean){return run(tripId,()=>acceptImport(tripId,text,items,repeatKey,confirmBooked));}
export async function lockItinerary(tripId:string,token:string,locked:boolean){return run(tripId,()=>setLock(tripId,token,locked));}
export async function organizeActivities(tripId:string,ids:string[]){return run(tripId,()=>previewOrganization(tripId,ids));}
export async function moveActivity(tripId:string,itemId:string,dayId:string|null,period:string,index?:number){return run(tripId,()=>previewPlacement(tripId,itemId,dayId,period,index));}
export async function applyOrganization(tripId:string,proposal:{placements:Placement[];token:string;warnings:string[]},relock:boolean){return run(tripId,()=>applyProposal(tripId,proposal,relock));}
export async function undoOrganization(tripId:string,id:string){return run(tripId,()=>undoChange(tripId,id));}
export async function chooseIdea(tripId:string,id:string,token:string,disposition:string,resolvedName?:string){return run(tripId,()=>includeIdea(tripId,id,token,disposition,resolvedName));}
export async function saveOtherIdea(tripId:string,id:string){return run(tripId,()=>saveRecommendationIdea(tripId,id));}
export async function gapIdeas(tripId:string,dayId:string,start:string,minutes:number,period:string,allowProtected:boolean){return run(tripId,()=>findGapIdeas(tripId,dayId,start,minutes,period,allowProtected));}
export async function updateIdeaNotes(tripId:string,id:string,revision:number,notes:string){return run(tripId,()=>saveIdeaNotes(tripId,id,revision,notes));}
export async function ideaBookings(tripId:string){return getItineraryReservationContext(tripId);}
