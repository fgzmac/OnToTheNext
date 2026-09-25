"use client";
import {useState,useSyncExternalStore,useId,type ReactNode} from "react";
import type {Author,GooglePlace} from "@/src/modules/google-places/types";
import {DetailSession,type DetailState} from "@/src/modules/google-places/detail-session";
function safeLink(value?:string){try{const u=new URL(value??"");return u.protocol==="https:"&&!u.username&&!u.password?u.href:undefined;}catch{return undefined;}}
function Link({url,children}:{url?:string;children:ReactNode}){const href=safeLink(url);return href?<a href={href} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">{children}</a>:<span>{children}</span>;}
function Credits({authors}:{authors:Author[]}){return <>{authors.map((a,i)=>{
 const avatar=safeLink(a.photoUri);const allowed=avatar&&/^lh[3-6]\.googleusercontent\.com$/.test(new URL(avatar).hostname);
 return <p key={i}>{/* Transient author image, no optimizer; only explicitly requested content. */}
 {/* eslint-disable-next-line @next/next/no-img-element */}
 {allowed?<img src={avatar} alt={"Author avatar: "+(a.displayName??"Google contributor")} width={32} height={32} referrerPolicy="no-referrer"/>:null}
 <Link url={a.uri}>{a.displayName??"Google contributor"}</Link>{a.photoUri?<> · <Link url={a.photoUri}>Contributor profile photo</Link></>:null}</p>;
 })}</>;}
function Attribution({place}:{place?:GooglePlace}){return <><p className="google-attribution" translate="no">Google Maps</p>{place?.attributions?.map((a,i)=><p key={i}><Link url={a.providerUri}>{a.provider??"Provider attribution"}</Link></p>)}</>;}
export type ActivityTab="overview"|"logistics"|"reviews";
type PresentationContent={availabilityUnchecked?:boolean;fallbackPhoto?:ReactNode;summary?:ReactNode;overviewContent?:ReactNode;logisticsContent?:ReactNode};
export function GoogleDetailsView({state,tab,setTab,confirm,reviews,refresh,photoFailed,fallbackPhoto,summary,overviewContent,logisticsContent,availabilityUnchecked}:{state:DetailState;tab:ActivityTab;setTab:(tab:ActivityTab)=>void;confirm:(token:string)=>void;reviews:()=>void;refresh:()=>void;photoFailed:()=>void}&PresentationContent){
 const id=useId(),p=state.overview?.place,r=state.reviews?.place,photo=state.photo?.photo;
 const busy=state.status==="loading"||Object.values(state.sections).includes("loading");
 const copy=state.warning??(state.status==="disabled"?(availabilityUnchecked?"":"Place details aren’t connected."):state.status==="loading"?"Finding place details…":state.status==="unavailable"?"We couldn’t verify this location.":state.status==="budget_exhausted"?"Place details allowance reached.":state.status==="expired"?"Place details need refreshing":state.status==="ambiguous"?"Choose the location that matches this activity.":state.status==="needs_confirmation"?"Check this location before using its details.":"");
 return <section className="google-context stack" aria-label="Activity place details">
  <div className="activity-hero">{photo?<figure className="activity-google-photo">{/* eslint-disable-next-line @next/next/no-img-element */}
   <img src={photo.data} alt="Google contributor photo of the linked place; current conditions unverified" width={480} height={320} onError={photoFailed}/>
   <figcaption><Attribution place={state.photo?.place}/><Credits authors={photo.authors}/><Link url={photo.source}>Photo on Google Maps</Link></figcaption>
  </figure>:fallbackPhoto}
  {state.sections.photo==="loading"?<p role="status">Loading photo…</p>:state.sections.photo==="unavailable"?<p>Photo unavailable.</p>:state.sections.photo==="budget_exhausted"?<p>Photo allowance reached.</p>:null}</div>
  {summary}
  {copy?<p role="status">{copy}</p>:null}
  {state.candidates.length>0?<div className="google-provider-content"><Attribution/>{state.candidates.map(c=><div className="location-choice" key={c.place.id}><strong>{c.place.displayName?.text??"Location"}</strong><p>{c.place.formattedAddress}</p><Link url={c.place.googleMapsUri}>View on Google Maps</Link>
   {c.eligible&&c.token?<button type="button" disabled={busy} onClick={()=>confirm(c.token!)}>Use this location</button>:<p>{c.place.movedPlaceId?"This location has moved.":c.place.businessStatus?.startsWith("CLOSED")?"This location is marked closed.":"We couldn’t verify this location."}</p>}
   {c.place.attributions?.map((a,i)=><p key={i}><Link url={a.providerUri}>{a.provider??"Provider attribution"}</Link></p>)}
  </div>)}</div>:null}
  {p?<div className="google-provider-content activity-place-summary">
   {p.rating!==undefined?<p className="activity-rating">{p.rating} / 5{p.userRatingCount!==undefined?" · "+p.userRatingCount+" ratings":""}</p>:null}
   <Link url={p.googleMapsUri}>View on Google Maps</Link><Attribution place={p}/>
  </div>:null}
  <div role="tablist" aria-label="Activity information" className="activity-tabs" onKeyDown={e=>{if(e.key==="ArrowLeft"||e.key==="ArrowRight"){e.preventDefault();const tabs:ActivityTab[]=p?["overview","logistics","reviews"]:["overview","logistics"];const direction=e.key==="ArrowRight"?1:-1;const next=tabs[(Math.max(0,tabs.indexOf(tab))+direction+tabs.length)%tabs.length];setTab(next);if(next==="reviews")reviews();document.getElementById(id+"-"+next)?.focus();}}}>
   {(["overview","logistics","reviews"] as const).map(t=><button key={t} type="button" role="tab" id={id+"-"+t} aria-controls={id+"-"+t+"-panel"} aria-selected={tab===t} tabIndex={tab===t?0:-1} disabled={t==="reviews"&&!p} onClick={()=>{setTab(t);if(t==="reviews")reviews();}}>{t==="overview"?"Overview":t==="logistics"?"Logistics":"Reviews"}</button>)}
  </div>
  <div role="tabpanel" id={id+"-overview-panel"} aria-labelledby={id+"-overview"} hidden={tab!=="overview"}>{overviewContent}{p?<p className="muted">Hours are not confirmed for future dates or holidays. See Logistics for the latest available hours.</p>:null}</div>
  <div role="tabpanel" id={id+"-logistics-panel"} aria-labelledby={id+"-logistics"} hidden={tab!=="logistics"}>
   {logisticsContent}{p?.formattedAddress?<p>{p.formattedAddress}</p>:null}
   {p?.currentOpeningHours?<div><h3>Current hours</h3><p className="muted">Venue-local hours for now and the next six days; check your travel dates.</p>{p.currentOpeningHours.weekdayDescriptions?.map((s,i)=><p key={i}>{s}</p>)}{p.currentOpeningHours.openNow!==undefined?<p>{p.currentOpeningHours.openNow?"Open at last check":"Closed at last check"}</p>:null}</div>:null}
   {p?.regularOpeningHours?<div><h3>Regular hours</h3>{p.regularOpeningHours.weekdayDescriptions?.map((s,i)=><p key={i}>{s}</p>)}</div>:null}
   {p?<p className="muted">Checked {state.overview?.observedAt}. Hours are not confirmed for future dates or holidays.</p>:null}
  </div>
  <div role="tabpanel" id={id+"-reviews-panel"} aria-labelledby={id+"-reviews"} hidden={tab!=="reviews"}>
   {state.sections.reviews==="loading"?<p role="status">Loading reviews…</p>:null}
   {state.sections.reviews==="unavailable"?<p role="status">Reviews aren’t available right now.</p>:null}
   {state.sections.reviews==="budget_exhausted"?<p role="status">Review allowance reached.</p>:null}
   {r?<div className="google-provider-content"><Attribution place={r}/><p>Provider relevance order; a sample, not all travelers.</p>
    {r.reviews?.length?r.reviews.map((review,i)=><blockquote key={i}><Credits authors={review.authorAttribution?[review.authorAttribution]:[]}/><p>{review.rating!==undefined?review.rating+" / 5":""} · {review.publishTime}</p><p>{review.text?.text}</p>{review.originalText&&review.text?.languageCode!==review.originalText.languageCode?<p>Translated display ({review.text?.languageCode??"unknown"}); original ({review.originalText.languageCode??"unknown"}): {review.originalText.text}</p>:null}<Link url={review.googleMapsUri}>Original review on Google Maps</Link></blockquote>):<p>Reviews aren’t available right now.</p>}
   </div>:null}
  </div>
  {!["disabled","loading","needs_confirmation","ambiguous"].includes(state.status)?<button type="button" className="text-button" disabled={busy} onClick={()=>{setTab("overview");refresh();}}>Refresh details</button>:null}
  {state.diagnostic?<details><summary>Developer diagnostics</summary><code>{state.diagnostic}</code></details>:null}
 </section>;
}
export function GoogleContext({session,...content}:{session:DetailSession}&PresentationContent){
 const state=useSyncExternalStore(session.subscribe,session.snapshot,session.snapshot);
 const [tab,setTab]=useState<ActivityTab>("overview");
 return <GoogleDetailsView state={state} tab={tab} setTab={setTab} confirm={t=>void session.confirm(t)} reviews={()=>void session.reviews()} refresh={()=>void session.refresh()} photoFailed={()=>session.photoFailed()} {...content}/>;
}
