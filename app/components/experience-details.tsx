"use client";
import {useState,useEffect,type ReactNode} from "react";
import {DetailPanel} from "./detail-panel";
import {GoogleContext} from "./google-context";
import {ExperienceSources} from "./experience-sources";
import {RecommendationPhoto} from "./recommendation-photo";
import {DetailSession} from "@/src/modules/google-places/detail-session";
import {googleEnrichmentAction} from "@/src/modules/google-places/actions";
import type {RecommendationCardData} from "@/src/modules/discover/types";
export function newDetailSession(tripId:string,recommendationId:string){
 const session=new DetailSession({tripId,recommendationId},googleEnrichmentAction);void session.open();return session;
}
export function ActivityDetails({item,session,connect,actions}:{item:RecommendationCardData;session:DetailSession|null;connect?:()=>void;actions?:ReactNode}){
 const photo=<RecommendationPhoto photo={item.photo} name={item.place.name}/>;
 return <section className="activity-details stack" aria-label="Activity details">
  <p className="muted">{[item.place.location??item.place.baseLabel,item.durationMinutes!==null?"About "+item.durationMinutes+" min":null].filter(Boolean).join(" · ")}</p>
  <p>{item.factualSummary}</p>
  {item.logisticsNote?<p>{item.logisticsNote}</p>:null}{item.costContext?<p>{item.costContext}</p>:null}
  {item.event?<p className="issue warning">{item.event.startDate} – {item.event.endDate} · {item.event.timeZone} · Availability unconfirmed</p>:null}
  {session?<GoogleContext session={session} fallbackPhoto={photo}/>:<>{photo}{connect?<button type="button" className="secondary" onClick={connect}>View place details</button>:null}</>}
  <ExperienceSources item={item}/>
  {actions?<div className="activity-details-actions">{actions}</div>:null}
 </section>;
}
export function ExperienceDetails({item,onAdd,dayNumber,pending=false,actions}:{item:RecommendationCardData;onAdd?:()=>void;dayNumber?:number;pending?:boolean;actions?:ReactNode}){
 const [session,setSession]=useState<DetailSession|null>(null);
 useEffect(()=>()=>session?.close(),[session]);
 const close=()=>{session?.close();setSession(null);};
 return <>
  <button type="button" className="text-button" onClick={()=>{if(!session)setSession(newDetailSession(item.tripId,item.id));}}>View details</button>
  {session?<DetailPanel title={item.place.name} close={close}><ActivityDetails item={item} session={session} actions={item.scheduledDay?<p>On Day {item.scheduledDay.number}</p>:onAdd?<button disabled={pending} onClick={()=>{onAdd();close();}}>Add to Day {dayNumber}</button>:actions}/></DetailPanel>:null}
 </>;
}
