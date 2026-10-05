"use client";
import { useState } from "react";
import { PERIODS, type InputItem } from "@/src/modules/organizer/domain";
import { correctItem, type ImportDocument } from "@/src/modules/organizer/import-document";

export function SourceImportReview({document:doc,items,onChange}:{document:ImportDocument;items:InputItem[];onChange:(items:InputItem[])=>void}) {
  const [splits,setSplits]=useState<Record<number,string>>({});
  const active=items[0]?.source?.section??doc.suggested;
  const patch=(index:number,key:keyof InputItem,value:unknown)=>onChange(items.map((i,n)=>n===index?correctItem(i,key,value):i));
  const groups=[...new Set(items.map(i=>i.source?.parents[1]||i.city||"Destination unresolved"))];
  return <div className="stack" aria-label="Source import review">
    <h3>Import review · {items.length} items</h3><p>{doc.yearBasis} Dates are imported proposals unless you explicitly confirm a reported booking. Nothing is saved yet.</p>
    {doc.warnings.map(w=><p className="issue warning" key={w}>{w}</p>)}
    <label>Active proposed itinerary section<select value={active} onChange={e=>onChange(structuredClone(doc.sections.find(s=>s.id===e.target.value)!.items))}>{doc.sections.map(s=><option key={s.id} value={s.id}>{s.title} · lines {s.start}–{s.end}{s.id===doc.suggested?" · suggested":""}</option>)}</select></label>
    <p>Only this section’s reviewed items will become ideas. Other versions and references remain in the saved original text; they are not combined into the active plan.</p>
    {doc.sections.map(s=><details key={s.id}><summary>{s.id===active?"Active section references":"Archived / reference section"}: {s.title} · {s.references.length} retained passages</summary><p>Speaker: {s.role}. No source is newly verified by importing it.</p>{s.references.map((r,n)=><p key={n}>Line {r.start}: {r.text}</p>)}{s.id!==active?<p>{s.items.length} extracted items are not selected. Choose this section above to review them.</p>:null}</details>)}
    {groups.map(group=>{const indices=items.flatMap((i,n)=>(i.source?.parents[1]||i.city||"Destination unresolved")===group?[n]:[]);return <section className="card stack" key={group}><h3>{group}</h3>
      <div className="row"><label>Destination for this section<input value={items[indices[0]]?.city??""} onChange={e=>onChange(items.map((i,n)=>indices.includes(n)?correctItem(i,"city",e.target.value):i))}/></label>
      <label>Speaker / source for this section<select value={items[indices[0]]?.sourceRole??"Unknown speaker/source"} onChange={e=>onChange(items.map((i,n)=>indices.includes(n)?correctItem(i,"sourceRole",e.target.value):i))}><option>Unknown speaker/source</option><option>Direct user statement</option><option>Quoted assistant proposal</option></select></label></div>
      {indices.map(n=>{const i=items[n];return <article className="organizer-item stack" key={i.source?.id??n}>
        <h4>{i.name}</h4><p>{i.date||"Date unresolved"} · {i.period||"Period unspecified"} · {i.kind==="PROTECTED"?"Protected time":i.kind==="NOTE"?"Reference note":i.alternative?"Optional / conditional alternative":"Selected activity"}</p>
        {i.outing?<p>Source sequence {i.sequence}: {i.outing} · route unverified</p>:null}{i.description?<p>{i.description}</p>:null}{i.decision?<p>Next decision: {i.decision}</p>:null}
        <p>{i.source?.fields.booking?.basis??(i.booking||"Booking unknown")}</p>
        {i.source?.questions.map(q=><p className="issue warning" key={q}>{q}</p>)}
        <details><summary>Correct this item</summary><div className="organizer-fields">
          <label>Activity name<input value={i.name} onChange={e=>patch(n,"name",e.target.value)}/></label><label>City / area<input value={i.city} onChange={e=>patch(n,"city",e.target.value)}/></label><label>Supplied date<input type="date" value={i.date} onChange={e=>patch(n,"date",e.target.value)}/></label><label>Appointment time<input type="time" value={i.time} onChange={e=>patch(n,"time",e.target.value)}/></label>
          <label>Period<select value={i.period} onChange={e=>patch(n,"period",e.target.value)}>{PERIODS.map(p=><option key={p}>{p}</option>)}</select></label><label>Kind<select value={i.kind} onChange={e=>patch(n,"kind",e.target.value)}><option>ACTIVITY</option><option>NOTE</option><option>PROTECTED</option></select></label>
          <label>What you will do<textarea value={i.description??""} onChange={e=>patch(n,"description",e.target.value)}/></label><label>Next decision<textarea value={i.decision??""} onChange={e=>patch(n,"decision",e.target.value)}/></label>
          <label>Shared outing<input value={i.outing??""} onChange={e=>patch(n,"outing",e.target.value)}/></label><label>Order within outing<input value={i.sequence??""} onChange={e=>patch(n,"sequence",e.target.value)}/></label>
          <label>Booking interpretation<select value={i.booking} onChange={e=>patch(n,"booking",e.target.value)}><option value="">Unknown / suggestion / not booked</option><option value="NEED_TICKETS">Explicit ticket requirement</option><option value="BOOKED_STATEMENT">Reported booked — needs confirmation</option></select></label>
          <label><input type="checkbox" checked={i.alternative} onChange={e=>patch(n,"alternative",e.target.checked)}/>Optional alternative</label><label><input type="checkbox" checked={i.excluded} onChange={e=>patch(n,"excluded",e.target.checked)}/>Exclude from scheduling</label>
        </div><label>Split into names, one per line<textarea value={splits[n]??""} onChange={e=>setSplits({...splits,[n]:e.target.value})}/></label><button className="secondary" disabled={!splits[n]?.trim()} onClick={()=>{const names=splits[n].split(/\r?\n/).map(s=>s.trim()).filter(Boolean);onChange(items.flatMap((item,index)=>index!==n?[item]:names.map((name,j)=>{const child=correctItem(item,"name",name);if(child.source)child.source={...child.source,id:child.source.id+`:split${j}`};return child;})));setSplits({});}}>Preview split</button></details>
        <details><summary>Original source and field evidence</summary><p>{i.fragment}</p><p>{i.sourceRole}</p>{i.source?<><p>Lines {i.source.start}–{i.source.end} · {i.source.parents.join(" / ")}</p><ul>{Object.entries(i.source.fields).map(([key,e])=><li key={key}>{key}: lines {e.start}–{e.end} · {e.role} {e.basis}</li>)}</ul>{i.source.timing.map((t,j)=><p key={j}>{t.role}: {t.text}</p>)}</>:null}</details>
      </article>;})}
    </section>;})}
  </div>;
}
