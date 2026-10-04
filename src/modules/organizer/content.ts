import { identity, type PlanDay } from "./domain";

export type DayContentItem={id:string;title:string;period:string;time:string;kind:string;position:number;description?:string;decision?:string;outing?:string;shortVisit?:string;conditionalEvening?:string;booking?:{state:string;date:string|null}|null};
/** Always derived from the current saved items. No stored narrative can outlive a move. */
export function dayContent(day:PlanDay, input:DayContentItem[]) {
  const items=[...input].sort((a,b)=>a.position-b.position);
  const protectedItem=items.find(i=>i.kind==="PROTECTED");
  const full=items.find(i=>i.period==="Full day");
  const outings=[...new Set(items.map(i=>i.outing).filter((x):x is string=>Boolean(x)))];
  const title=protectedItem?protectedItem.title:full?full.title:items.length>1&&outings.length===1&&items.every(i=>i.outing===outings[0])?outings[0]:items.length?items.map(i=>i.title).slice(0,2).join(" + "):day.first?"Arrival, check-in and recovery":day.last?"Check-out and departure":day.transfer?"Travel and check-in":`Unallocated time in ${day.city}`;
  const purpose=day.first?"Keep arrival, onward travel and check-in spacious. Flight timing has not been supplied here.":day.last?"Keep room for check-out and the departure journey. Confirm the flight before adding sightseeing.":day.transfer?`Travel${day.departureCity&&day.arrivalCity?` from ${day.departureCity} to ${day.arrivalCity}`:" between stays"}; settle in before deciding on an evening outing.`:!items.length?"No selected activity is allocated here. Keep this as rest or decide which retained idea belongs on this Day.":"";
  const decision=items.find(i=>i.booking&&i.booking.state!=="BOOKED")?.title;
  const next=items.find(i=>i.decision)?.decision || (decision?`Choose and verify the ticket or reservation for ${decision}; placement is not a booking.`:items.some(i=>i.conditionalEvening)?"Decide after check-in whether the evening outing still works.":day.first?"Confirm arrival time and check-in arrangements.":day.last?"Confirm departure airport, flight and transfer.":day.transfer?"Confirm transport and the accommodation arrival cutoff.":"");
  return {title,purpose,next,fullDay: Boolean(full),protected: Boolean(protectedItem),
    evening:full?"Flexible finish and recovery; no second outing or dinner reservation assumed.":protectedItem&&items.some(i=>i.shortVisit)?"Leave a break after the short visit; the protected period stays clear.":""};
}
export function distinctDescription(title:string,description:string|undefined){return description&&identity(description)!==identity(title)?description:"";}
