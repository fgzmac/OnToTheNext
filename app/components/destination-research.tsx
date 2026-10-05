"use client";
import {useEffect,useState,useTransition} from "react";
import {useRouter} from "next/navigation";
import {researchStart,researchRead,researchCancel} from "@/src/modules/research/actions";
export function DestinationResearch({tripId,segmentId}:{tripId:string;segmentId:string}){
  const [state,setState]=useState<Awaited<ReturnType<typeof researchRead>>|null>(null),[country,setCountry]=useState(""),[language,setLanguage]=useState("en"),[message,setMessage]=useState("");
  const [pending,start]=useTransition(),router=useRouter();
  useEffect(()=>{let active=true;const read=()=>researchRead(tripId,segmentId).then(s=>{if(active)setState(s);}).catch(()=>{if(active)setMessage("Research status unavailable.");});
    void read();const timer=setInterval(()=>{void read();},3000);return()=>{active=false;clearInterval(timer);};},[tripId,segmentId]);
  const running=state?.job&&["QUEUED","RUNNING"].includes(state.job.state);
  return <div className="stack" aria-label="Destination research">
    {state?.connected ? <details><summary>Find ideas for this destination</summary><p>Confirm the country to avoid confusing similarly named places. Dates and interests come from this trip.</p>
      <label>Country<input value={country} maxLength={80} onChange={e=>setCountry(e.target.value)}/></label>
      <label>Preferred research language<select value={language} onChange={e=>setLanguage(e.target.value)}>{[["en","English"],["pt","Português"],["ko","한국어"],["es","Español"],["ja","日本語"],["fr","Français"],["de","Deutsch"],["it","Italiano"]].map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
      <button disabled={pending||!!running||!country.trim()} onClick={()=>start(async()=>{const r=await researchStart({tripId,segmentId,country,language});setMessage(r.ok?"Research queued. Ideas will appear after processing.":r.error);setState(await researchRead(tripId,segmentId));})}>Find ideas for this destination</button>
    </details> : <p className="muted">Research is not connected. Existing curated ideas and manual planning remain available.</p>}
    {state?.job ? <div role="status"><p>Research: {state.job.state.toLowerCase()} · {state.job.searches} searches · {state.job.documents} documents · {state.job.extractions} extractions · {state.job.published} ideas published</p><p>{state.job.context.destination}, {state.job.context.country} · {state.job.context.start} – {state.job.context.end} · {state.job.context.language}</p><small>Requested {state.job.createdAt.slice(0,10)}. Source coverage is limited; results do not confirm availability.</small><p>{state.job.reason}</p>
      {running?<button className="secondary" disabled={pending} onClick={()=>start(async()=>{await researchCancel(tripId,state.job!.id);setState(await researchRead(tripId,segmentId));})}>Cancel research</button>:<button className="secondary" onClick={()=>router.refresh()}>Refresh ideas</button>}</div>:null}
    {message?<p role="status">{message}</p>:null}
  </div>;
}
