import { parseDocument } from "./import-document";
import type { ImportSource } from "./import-types";
import { validDate } from "../reservations/domain";

export const PERIODS = ["", "Early morning", "Morning", "Afternoon", "Evening", "Afternoon & Evening", "Full day"] as const;
export function periodsOverlap(a:string,b:string){if(!a||!b||a==="Full day"||b==="Full day")return true;const parts=(s:string)=>s==="Afternoon & Evening"?["Afternoon","Evening"]:s==="Early morning"?["Morning"]:[s];return parts(a).some(p=>parts(b).includes(p));}
export type InputItem = {
  source?: ImportSource;
  name: string; city: string; date: string; time: string; period: string; notes: string;
  kind: "ACTIVITY" | "NOTE" | "PROTECTED"; priority: boolean; alternative: boolean;
  booking: "" | "NEED_TICKETS" | "BOOKED_STATEMENT"; url: string; fragment: string; excluded: boolean;
  /** Optional, reviewed source context. Never a confirmed time, route or booking. */
  outing?: string; area?: string; description?: string; decision?: string; sourceRole?: string;
  sequence?: string; shortVisit?: string; conditionalEvening?: string;
};
export function identity(name: string) { return name.normalize("NFKC").toLocaleLowerCase().replace(/\s+/g, " ").trim(); }
const months = ["january","february","march","april","may","june","july","august","september","october","november","december"];
export function suppliedDate(text: string, year?: number): string {
  const iso = text.match(/\b\d{4}-\d{2}-\d{2}\b/)?.[0];
  if (iso) return validDate(iso) ? iso : "";
  const m = text.match(/\b(Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+(\d{1,2})(?:,?\s+(\d{4}))?\b/i);
  if (!m || !(m[3] || year)) return "";
  const date = `${m[3] || year}-${String(months.findIndex(x=>x.startsWith(m[1].toLowerCase()))+1).padStart(2,"0")}-${m[2].padStart(2,"0")}`;
  return validDate(date) ? date : "";
}
/** The compatibility entry point uses the same section-aware parser as the review UI. */
export function parsePaste(text: string, cities: string[] = [], year?: number): InputItem[] {
  const doc = parseDocument(text,cities,year);
  return doc.sections.find(s=>s.id===doc.suggested)?.items ?? [];
}
/** Known full-day intentions cannot be advertised as a short-gap fit. */
export function gapDurationEligible(period:string, notes:string, duration:number|null, minutes:number) {
  if(period === "Full day" || /\b(?:full[ -]day|day[ -]trip)\b/i.test(notes)) return false;
  return duration === null || duration + 30 <= minutes;
}
export type PlanItem = {id:string;title:string;city:string;date:string;time:string;period:string;kind:string;priority:boolean;alternative:boolean;excluded:boolean;dayId:string|null;position:number;fixed:boolean;bookedDate:string|null;
  outing?:string;area?:string;sequence?:string;shortVisit?:string;conditionalEvening?:string;eligibleDays?:string[];eligibilityReason?:string};
export type PlanDay = {id:string;date:string;city:string;transfer:boolean;arrivalCity?:string;departureCity?:string;first?:boolean;last?:boolean};
export type Placement = {id:string;dayId:string|null;period:string;reason:string};
export function related(a:PlanItem,b:PlanItem) {
  return identity(a.city)===identity(b.city) && Boolean((a.outing&&b.outing&&identity(a.outing)===identity(b.outing)) || (a.area&&b.area&&identity(a.area)===identity(b.area)));
}
const slots=["Morning","Afternoon","Evening"];
/** Qualitative allocation is deliberately separate from hard period overlap / gap feasibility. */
export function organize(items:PlanItem[], days:PlanDay[], selected:string[]):Placement[] {
  const occupied=new Map<string,PlanItem[]>();
  for(const i of items.filter(i=>i.dayId))occupied.set(i.dayId!,[...(occupied.get(i.dayId!)??[]),i]);
  const pending=items.filter(i=>selected.includes(i.id));
  // A source-defined outing is allocated together, with its supplied sequence. No city-only proximity claim.
  const order=(i:PlanItem)=>Math.min(i.position,...pending.filter(x=>related(i,x)&&!x.date).map(x=>x.position));
  const placements=pending.sort((a,b)=>Number(b.kind==="PROTECTED")-Number(a.kind==="PROTECTED")||Number(Boolean(b.date))-Number(Boolean(a.date))||(!a.date&&!b.date?Number(b.priority)-Number(a.priority):0)||order(a)-order(b)||(!a.date&&!b.date&&related(a,b)?Number(a.sequence||0)-Number(b.sequence||0):0)||a.position-b.position).map(i=>{
    const hold=(reason:string):Placement=>({id:i.id,dayId:null,period:i.period,reason});
    if(i.dayId)return {id:i.id,dayId:i.dayId,period:i.period,reason:"Existing placement preserved."};
    if(i.excluded)return hold("Explicitly excluded.");
    if(i.alternative)return hold("Optional alternative: choose it explicitly before scheduling.");
    if(i.kind==="NOTE")return hold("Retained note; not interpreted as an attraction.");
    if(!i.city)return hold("Location needs identification: supply a city or area before scheduling.");
    const choices=days.filter(d=>(identity(d.city)===identity(i.city)||identity(d.arrivalCity??"")===identity(i.city))&&(!i.date||d.date===i.date)&&(!i.bookedDate||d.date===i.bookedDate));
    if(!choices.length)return hold(i.date?"Supplied date conflicts with the available stay or confirmed booking.":"No matching dated stay; retained by city.");
    const blockers=new Set<string>();
    const score=(d:PlanDay)=>{const existing=occupied.get(d.id)??[];return existing.some(x=>related(i,x))?3:i.shortVisit&&existing.some(x=>x.kind==="PROTECTED"&&!periodsOverlap(i.period,x.period))?2:i.conditionalEvening&&d.arrivalCity&&identity(d.arrivalCity)===identity(i.city)&&!d.first?1:0;};
    for(const day of [...choices].sort((a,b)=>score(b)-score(a))){
      const existing=occupied.get(day.id)??[];
      const reject=(reason:string)=>{blockers.add(reason);};
      if(i.eligibleDays&&!i.eligibleDays.includes(day.id)){reject(i.eligibilityReason||"Event dates or source identity are not eligible for this stay.");continue;}
      const conditional=Boolean(i.conditionalEvening&&day.arrivalCity&&identity(day.arrivalCity)===identity(i.city)&&!day.first&&!day.last&&!i.fixed&&!i.bookedDate&&(!i.period||i.period==="Evening"));
      if(day.transfer&&!i.date&&!conditional){reject("Arrival or transfer time is unknown; no supported usable period was supplied.");continue;}
      if(existing.some(x=>identity(x.title)===identity(i.title)))continue;
      if(existing.some(x=>x.period==="Full day")){reject("Existing full-day activity occupies the available Day.");continue;}
      if(i.period==="Full day"&&existing.length){reject("This full-day outing needs a Day without another commitment.");continue;}
      if(existing.some(x=>x.kind==="PROTECTED"&&(periodsOverlap(i.period,x.period)||(!i.shortVisit&&!i.date)))){reject("Protected time needs a clear, limited preceding visit; unknown timing cannot use that space.");continue;}
      if(existing.some(x=>x.kind!=="PROTECTED"&&(x.fixed||x.bookedDate)&&(!x.period||!i.period||periodsOverlap(i.period,x.period)))){reject("A fixed or booked commitment has overlapping or incomplete timing.");continue;}
      if((i.fixed||i.bookedDate)&&existing.some(x=>!i.period||!x.period||periodsOverlap(i.period,x.period))){reject("Fixed timing conflicts with this Day's existing outline.");continue;}
      const flexible=existing.filter(x=>x.kind!=="PROTECTED");
      if(flexible.length>=3){reject("The current outline limit is three flexible stops; choose a different Day or grouping.");continue;}
      if(flexible.length&&!i.date&&!flexible.some(x=>related(i,x))){reject("The organizer cannot assess this grouping: no shared outing or supplied area connects these activities.");continue;}
      const grouped=Boolean(i.outing||i.area);
      const period=i.period || (conditional?"Evening":grouped&&!i.fixed&&!i.bookedDate?slots.find(p=>!existing.some(x=>periodsOverlap(x.period,p)))??"":"");
      if(existing.some(x=>periodsOverlap(x.period,period))){reject("The supplied periods overlap; the organizer cannot establish a timed fit.");continue;}
      occupied.set(day.id,[...existing,{...i,period}]);
      return {id:i.id,dayId:day.id,period,reason:i.date?"Supplied date and order retained.":conditional?"Conditional evening after arrival and check-in; omit if travel leaves insufficient time.":i.outing?`Source outing: ${i.outing}. Sequence retained; transport remains unverified.`:i.area?`Supplied area: ${i.area}. No route or travel time inferred.`:i.shortVisit&&existing.some(x=>x.kind==="PROTECTED")?"Only the supplied short visit precedes protected time; leave a break before the commitment.":"Separate visit; no supported relationship to other selected activities was supplied."};
    }
    return hold([...blockers].join(" ")||"The organizer cannot assess a different placement without disturbing saved work.");
  });
  // Protection is allocated first, but the proposed Day reads in time-of-day order.
  // Explicitly dated source sequences retain their order, even if unusual.
  return placements.sort((a,b)=>{
    const dayOrder=(id:string|null)=>id?days.findIndex(d=>d.id===id):days.length;
    const delta=dayOrder(a.dayId)-dayOrder(b.dayId);if(delta)return delta;
    if(!a.dayId||!b.dayId)return 0;
    const ai=items.find(i=>i.id===a.id)!,bi=items.find(i=>i.id===b.id)!;
    if(ai.date&&bi.date)return ai.position-bi.position;
    const rank=(p:string)=>p==="Early morning"?0:p==="Morning"||p==="Full day"?1:p==="Afternoon"||p==="Afternoon & Evening"?2:p==="Evening"?3:4;
    return rank(a.period)-rank(b.period);
  });
}
