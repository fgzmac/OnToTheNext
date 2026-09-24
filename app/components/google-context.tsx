"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { googleEnrichmentAction } from "@/src/modules/google-places/actions";
import type { Author, Enrichment, GoogleInput } from "@/src/modules/google-places/types";
function safeLink(value?:string) { try {const u=new URL(value??"");return u.protocol==="https:"&&!u.username&&!u.password?u.href:undefined;}catch{return undefined;} }
function Link({url,children}:{url?:string;children:React.ReactNode}) { const href=safeLink(url);return href?<a href={href} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer">{children}</a>:<span>{children}</span>; }
function avatarUrl(value?:string) {const url=safeLink(value);if(!url)return undefined;return /^lh[3-6]\.googleusercontent\.com$/.test(new URL(url).hostname)?url:undefined;}
function Credits({authors}:{authors:Author[]}) {return <>{authors.map((a,i)=><p key={i}>
  {/* Provider author avatar loads only with explicitly requested content; no key or image optimizer. */}
  {/* eslint-disable-next-line @next/next/no-img-element */}
  {avatarUrl(a.photoUri)?<img src={avatarUrl(a.photoUri)} alt={"Author avatar: "+(a.displayName??"Google contributor")} width={32} height={32} referrerPolicy="no-referrer" style={{verticalAlign:"middle",marginRight:8}} />:null}
  <Link url={a.uri}>{a.displayName??"Google contributor"}</Link>{a.photoUri?<span> · <Link url={a.photoUri}>Contributor profile photo</Link></span>:null}</p>)}</>;}
export function GoogleContext({tripId,recommendationId}:{tripId:string;recommendationId:string}) {
  const [result,setResult]=useState<Enrichment|null>(null),[pending,start]=useTransition();
  const [open,setOpen]=useState(false);
  const generation=useRef(0);
  useEffect(()=>()=>{generation.current++;},[]);
  // Session-only display, cleared on close/unmount or after five minutes. This is not a cache-retention allowance.
  useEffect(()=>{if(!result)return;const timer=setTimeout(()=>setResult(null),300_000);return()=>clearTimeout(timer);},[result]);
  const request=(purpose:GoogleInput["purpose"],token?:string)=>{const version=++generation.current;start(async()=>{setResult(null);try {const response=await googleEnrichmentAction({tripId,recommendationId,purpose,token,requestId:crypto.randomUUID()});if(version===generation.current)setResult(response);}catch{if(version===generation.current)setResult({message:"Google unavailable. Your plan and Add remain available."});}});};
  const p=result?.place;
  return <section className="stack google-context" aria-label="Google place context">
    <button type="button" className="secondary" aria-expanded={open} onClick={()=>{generation.current++;setResult(null);setOpen(!open);}}>Optional Google place context</button>
    {open ? <><p>Enrichment requires owner activation. Independent recommendation and Add work without it. A place match does not verify tickets, events or a walking route.</p>
    <div className="row"><button type="button" className="secondary" disabled={pending} onClick={()=>request("identity")}>Find / correct Google match</button><button type="button" className="secondary" disabled={pending} onClick={()=>request("context")}>Request current context</button><button type="button" className="secondary" disabled={pending} onClick={()=>request("reviews")}>Request reviews</button><button type="button" className="secondary" disabled={pending} onClick={()=>request("photo")}>Request one photo</button></div>
    <p role={pending || result ? "status" : undefined}>{pending?"Requesting Google context…":result?.message}</p>
    {result ? <div className="google-provider-content"><p translate="no" style={{fontFamily:"Arial, sans-serif",fontSize:14,fontWeight:400,color:"#5e5e5e",whiteSpace:"nowrap"}}>Google Maps</p>
      {result.candidates?.map((c,i)=><div key={c.place.id+":"+i}><strong>{c.place.displayName?.text??"Name unavailable"}</strong><p>{c.place.formattedAddress}</p><p>{c.reason}</p><Link url={c.place.googleMapsUri}>View exact place on Google Maps</Link>{c.token?<button type="button" disabled={pending} onClick={()=>request("confirm",c.token)}>Link this reviewed place</button>:null}{c.place.attributions?.map((a,j)=><p key={j}><Link url={a.providerUri}>{a.provider??"Provider attribution"}</Link></p>)}</div>)}
      {p ? <><h5>{p.displayName?.text}</h5><p>{p.formattedAddress}</p><Link url={p.googleMapsUri}>View exact place on Google Maps</Link><p>Business status: {p.businessStatus??"Not supplied"}</p>
        {p.rating!==undefined?<p>Google rating: {p.rating} / 5{p.userRatingCount!==undefined?" · "+p.userRatingCount+" ratings":" · rating count not supplied"}</p>:null}
        {p.currentOpeningHours?<div><h5>Current hours</h5><p>Provider coverage: the request date and next six days, in venue-local time. This is not a check of your trip dates.</p>{p.currentOpeningHours.weekdayDescriptions?.map((s,i)=><p key={i}>{s}</p>)}{p.currentOpeningHours.openNow!==undefined?<p>Open at observation: {p.currentOpeningHours.openNow?"Yes":"No"}</p>:null}</div>:null}
        {p.regularOpeningHours?<div><h5>Regular weekly hours</h5>{p.regularOpeningHours.weekdayDescriptions?.map((s,i)=><p key={i}>{s}</p>)}</div>:null}
        <p>Observed {result.observedAt}. Hours are not confirmed for your future dates or holidays.</p>
        {p.reviews?<div><h5>Available Google review sample</h5><p>Provider relevance order; this sample does not represent all travelers.</p>{p.reviews.map((r,i)=><blockquote key={i}><Credits authors={r.authorAttribution?[r.authorAttribution]:[]} /><p>{r.rating!==undefined?r.rating+" / 5":"Rating not supplied"} · {r.publishTime}</p><p>{r.text?.text}</p>{r.originalText && r.text?.languageCode!==r.originalText.languageCode?<p>Translated display ({r.text?.languageCode??"unknown"}); original ({r.originalText.languageCode??"unknown"}): {r.originalText.text}</p>:<p>Translation status not supplied or display matches original language.</p>}<Link url={r.googleMapsUri}>Original review on Google Maps</Link></blockquote>)}</div>:null}
        {p.attributions?.map((a,i)=><p key={i}><Link url={a.providerUri}>{a.provider??"Provider attribution"}</Link></p>)}
      </>:null}
      {result.photo?<figure>{/* Direct transient data URI: deliberately bypass persistent Next image optimization. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={result.photo.data} alt="Google contributor photo of the linked place; current conditions unverified" width={480} height={320} style={{maxWidth:"100%",height:"auto",maxHeight:320,objectFit:"contain"}} onError={()=>setResult({...result,photo:undefined,message:"Photo could not load. Your recommendation and Add remain available."})} /><figcaption><Credits authors={result.photo.authors}/><Link url={result.photo.source}>Photo on Google Maps</Link><p>Photo relevance and current conditions require organizer review.</p></figcaption></figure>:null}
      <button type="button" className="secondary" onClick={()=>setResult(null)}>Clear Google context</button>
    </div>:null}
    </> : null}
  </section>;
}
