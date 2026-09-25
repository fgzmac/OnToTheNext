"use client";
import {useState,useEffect,type ReactNode} from "react";
import {DetailPanel} from "./detail-panel";
import {GoogleContext,GoogleDetailsView,type ActivityTab} from "./google-context";
import {ExperienceSources} from "./experience-sources";
import {ExperienceChips} from "./experience-chips";
import {RecommendationPhoto} from "./recommendation-photo";
import {DetailSession} from "@/src/modules/google-places/detail-session";
import {googleEnrichmentAction} from "@/src/modules/google-places/actions";
import type {RecommendationCardData} from "@/src/modules/discover/types";
export function newDetailSession(tripId:string,recommendationId:string){
 const session=new DetailSession({tripId,recommendationId},googleEnrichmentAction);void session.open();return session;
}
export function ActivityDetails({item,session,connect,actions}:{item:RecommendationCardData;session:DetailSession|null;connect?:()=>void;actions?:ReactNode}){
 const [tab,setTab]=useState<ActivityTab>("overview");
 const photo=<RecommendationPhoto photo={item.photo} name={item.place.name}/>;
 const summary=<div className="activity-summary"><p className="activity-location">{item.place.location??item.place.baseLabel}</p><ExperienceChips item={item}/><p>{item.factualSummary}</p>
  {item.event?<p className="issue warning">{item.event.startDate} – {item.event.endDate} · {item.event.timeZone} · Availability unconfirmed</p>:null}</div>;
 const overviewContent=<>{item.logisticsNote?<p>{item.logisticsNote}</p>:null}{item.costContext?<p>{item.costContext}</p>:null}</>;
 const logisticsContent=<dl className="activity-logistics"><div><dt>Location</dt><dd>{item.place.location??item.place.baseLabel}</dd></div>
  {item.durationMinutes!==null?<div><dt>Estimated visit</dt><dd>About {item.durationMinutes} minutes · planning estimate</dd></div>:null}</dl>;
 const content={fallbackPhoto:photo,summary,overviewContent,logisticsContent};
 return <section className="activity-details stack" aria-label="Activity details">
  {session?<GoogleContext session={session} {...content}/>:<><GoogleDetailsView availabilityUnchecked state={{status:"disabled",candidates:[],sections:{overview:"idle",reviews:"idle",photo:"idle"}}} tab={tab} setTab={setTab} confirm={()=>{}} reviews={()=>{}} refresh={()=>{}} photoFailed={()=>{}} {...content}/>{connect?<button type="button" className="secondary" onClick={connect}>View place details</button>:null}</>}
  <ExperienceSources item={item}/>
  {actions?<div className="activity-details-actions">{actions}</div>:null}
 </section>;
}
export function ExperienceDetails({item,onAdd,dayNumber,pending=false,actions}:{item:RecommendationCardData;onAdd?:()=>void;dayNumber?:number;pending?:boolean;actions?:ReactNode}){
 const [session,setSession]=useState<DetailSession|null>(null);
 useEffect(()=>()=>session?.close(),[session]);
 const close=()=>{session?.close();setSession(null);};
 return <>
  <button type="button" className="text-button" aria-haspopup="dialog" aria-expanded={!!session} onClick={()=>{if(!session)setSession(newDetailSession(item.tripId,item.id));}}>View details</button>
  {session?<DetailPanel title={item.place.name} close={close}><ActivityDetails item={item} session={session} actions={item.scheduledDay?<p>On Day {item.scheduledDay.number}</p>:onAdd?<button disabled={pending} onClick={()=>{onAdd();close();}}>Add to Day {dayNumber}</button>:actions}/></DetailPanel>:null}
 </>;
}
