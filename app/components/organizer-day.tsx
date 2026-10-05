"use client";
import Link from "next/link";
import type { OrganizerWorkspace } from "@/src/modules/organizer/service";
import { dayContent, distinctDescription } from "@/src/modules/organizer/content";

type Item=OrganizerWorkspace["items"][number];
export function OrganizerDay({day,items,tripId,locked,pending,onMove,onEarlier,onDrop}:{
  day:OrganizerWorkspace["days"][number];items:Item[];tripId:string;locked:boolean;pending:boolean;
  onMove:(item:Item)=>void;onEarlier:(item:Item,index:number)=>void;onDrop:(id:string)=>void;
}) {
  const ordered=[...items].sort((a,b)=>a.position-b.position),content=dayContent(day,ordered);
  return <section className="card stack itinerary-day" aria-label={`Plan ${day.date}`} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();if(!locked)onDrop(e.dataTransfer.getData("text/plain"));}}>
    <header><span className="eyebrow">{day.date} · {day.departureCity&&day.arrivalCity?`${day.departureCity} → ${day.arrivalCity}`:day.city||"Unassigned"}</span><h3>{content.title}</h3></header>
    {content.purpose?<p>{content.purpose}</p>:null}
    {ordered.map((i,index)=>{
      const description=distinctDescription(i.title,i.description);
      const detached=Boolean(i.outing&&!ordered.some(other=>other.id!==i.id&&other.outing===i.outing));
      return <article key={i.id} className="organizer-item" draggable={!locked} onDragStart={e=>e.dataTransfer.setData("text/plain",i.id)}>
        <div className="row row-between"><strong>{i.period||"Flexible visit · period to decide"}{i.time?` · ${i.time}`:""}</strong><span className="muted">{i.kind==="PROTECTED"?"Protected":i.fixed?"Supplied fixed time":i.period&&i.period!==i.sourcePeriod?"Suggested period":"Supplied intention"}</span></div>
        <h4>{i.title}</h4>
        {i.descriptionSource&&i.descriptionSource.description!==description?<p>{i.descriptionSource.description}</p>:null}
        {detached?<p>Only {i.title} from “{i.outing}” is on this Day. Review the source sequence after this placement change; its combined outing description may no longer apply.</p>:description?<p>{description}</p>:<p className="muted">No visit description has been supplied for this item.</p>}
        {i.shortVisit?<p>{i.shortVisit}</p>:null}
        {i.conditionalEvening?<p className="issue warning">Conditional: {i.conditionalEvening}</p>:null}
        {i.booking?<p>{i.booking.state==="BOOKED"?"User-reported booking": "Booking action needed"}{i.booking.date?` · ${i.booking.date}`:""}{i.booking.date&&i.booking.date!==day.date?" — confirmed date conflicts with this Day":""}</p>:null}
        <div className="row"><button className="secondary" disabled={locked||pending} onClick={()=>onMove(i)}>Move to</button><button className="text-button" disabled={locked||pending||index===0} onClick={()=>onEarlier(i,index)}>Earlier</button><Link href={`?planDay=${day.id}#item-${i.id}`}>Details / booking</Link></div>
        <details><summary>Source notes and placement</summary><p>{i.sourceRole}</p>{i.source?<><p>Imported source · lines {i.source.start}–{i.source.end}</p><ul>{Object.entries(i.source.fields).map(([field,e])=><li key={field}>{field}: {e.role} · lines {e.start}–{e.end} {e.basis}</li>)}</ul></>:null}{detached&&description?<p>Source description: {description}</p>:null}{i.notes?<p>{i.notes}</p>:null}{i.outing?<p>Supplied outing: {i.outing}{i.sequence?` · sequence ${i.sequence}`:""}. This does not establish proximity or transport.</p>:null}{i.area?<p>Supplied area: {i.area}</p>:null}{i.date||i.time||i.sourcePeriod?<p>Original timing: {[i.date,i.time,i.sourcePeriod].filter(Boolean).join(" · ")}</p>:null}{i.descriptionSource?<p><a href={i.descriptionSource.sourceUrl} target="_blank" rel="noreferrer">{i.descriptionSource.sourceLabel}</a> · recorded {i.descriptionSource.observed}; not refreshed for this trip.</p>:null}<p>{i.fragment||"Saved in this trip"}</p>{i.reason?<p>Placement: {i.reason}</p>:null}</details>
      </article>;
    })}
    {content.evening?<p><strong>{content.fullDay?"Evening · flexible":"Protected-time buffer"}</strong><br/>{content.evening}</p>:null}
    {content.next?<p className="itinerary-next"><strong>Next decision</strong><br/>{content.next}</p>:null}
    <Link href={`/trips/${tripId}/discover?gap=${day.id}`}>Find something for this gap</Link>
  </section>;
}
