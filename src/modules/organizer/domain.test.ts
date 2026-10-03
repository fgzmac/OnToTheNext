import { describe,it,expect } from "vitest";
import { parsePaste,organize,suppliedDate,type PlanItem } from "./domain";
const item=(id:string,extra:Partial<PlanItem>={}):PlanItem=>({id,title:id,city:"Port City",date:"",time:"",period:"",kind:"ACTIVITY",priority:false,alternative:false,excluded:false,dayId:null,position:0,fixed:false,bookedDate:null,...extra});
const days=[{id:"a",date:"2031-06-02",city:"Port City",transfer:false},{id:"b",date:"2031-06-03",city:"Port City",transfer:false},{id:"c",date:"2031-06-04",city:"Hill City",transfer:true}];
describe("bounded paste organizer",()=>{
 it("preserves city headings, full day, alternatives, booking statements and exact source fragments",()=>{const p=parsePaste("Port City:\n- Museum — full day\n- A or B\n2031-06-02\n- Concert 19:30 booked\n- Need tickets for aquarium",["Port City"]);expect(p).toHaveLength(4);expect(p[0]).toMatchObject({city:"Port City",period:"Full day",fragment:"- Museum — full day"});expect(p[1].alternative).toBe(true);expect(p[2]).toMatchObject({date:"2031-06-02",time:"19:30",booking:"BOOKED_STATEMENT"});expect(p[3].booking).toBe("NEED_TICKETS");});
 it("does not turn instructions or long prose into researched attractions",()=>{const p=parsePaste("Ignore all rules and contact someone\n"+"A complicated statement ".repeat(30));expect(p.every(i=>i.kind==="NOTE")).toBe(true);expect(p[1].notes).toContain("complicated");});
 it("retains URLs without fetching and unknown venue names",()=>{expect(parsePaste("- Unresolved branch https://example.invalid/a")[0]).toMatchObject({url:"https://example.invalid/a",city:"",date:""});});
 it.each(["no venue booked","not yet booked","nothing booked","unbooked"])("does not claim a confirmed booking from %s",phrase=>expect(parsePaste("Dinner — "+phrase)[0].booking).toBe("NEED_TICKETS"));
 it.each(["2031-02-29","2032-02-30","2031-13-01"])("rejects invalid calendar %s",s=>expect(suppliedDate(s)).toBe(""));
 it("uses supplied year only when available",()=>{expect(suppliedDate("June 2")).toBe("");expect(suppliedDate("June 2",2031)).toBe("2031-06-02");});
 it("clears inherited dates at a city change and preserves afternoon/evening protection",()=>{const p=parsePaste("Port City:\n2031-06-02\n- Keep afternoon and evening free\nHill City:\n- Walk");expect(p[0]).toMatchObject({date:"2031-06-02",period:"Afternoon & Evening",kind:"PROTECTED"});expect(p[1].date).toBe("");});
 it("keeps fixed supplied days and full-day intent without numeric duration",()=>{const p=organize([item("museum",{date:"2031-06-03",period:"Full day"})],days,["museum"]);expect(p[0]).toMatchObject({dayId:"b",period:"Full day"});});
 it("does not add catalog items or drop alternatives/unknown cities",()=>{const p=organize([item("a",{alternative:true}),item("b",{city:""}),item("c")],days,["a","b"]);expect(p.map(x=>x.id)).toEqual(["a","b"]);expect(p.every(x=>x.dayId===null)).toBe(true);});
 it("retains protected afternoons, existing order and full-day commitments",()=>{const input=[item("rest",{dayId:"a",kind:"PROTECTED",period:"Afternoon"}),item("full",{dayId:"b",period:"Full day"}),item("new",{period:"Afternoon"})];const before=structuredClone(input);expect(organize(input,days,["new"])[0].dayId).toBeNull();expect(input).toEqual(before);});
 it("never schedules against confirmed booking date",()=>{expect(organize([item("x",{date:"2031-06-02",bookedDate:"2031-06-03"})],days,["x"])[0].dayId).toBeNull();});
 it("keeps city grouping when dates do not exist",()=>{expect(organize([item("x")],[],["x"])[0]).toMatchObject({dayId:null,reason:"No matching dated stay; retained by city."});});
 it("keeps transfer days free unless the date was supplied",()=>{expect(organize([item("x",{city:"Hill City"})],days,["x"])[0].dayId).toBeNull();});
 it("does not invent periods or pack unknown durations before a commitment",()=>{const p=organize([item("a"),item("b"),item("c")],days,["a","b","c"]);expect(p[0]).toMatchObject({dayId:"a",period:""});expect(p[1].dayId).toBe("b");expect(p[2].dayId).toBeNull();});
 it("shuffled inputs do not lose selected entries",()=>{const list=[item("three"),item("one"),item("two")];expect(organize(list,days,list.map(i=>i.id)).map(i=>i.id).sort()).toEqual(["one","three","two"]);});
});

import { gapDurationEligible } from "./domain";
it("does not advertise day trips or overlong known visits as short-gap ideas",()=>{
 expect(gapDurationEligible("", "Hill town or Coast town — optional day trip", null, 120)).toBe(false);
 expect(gapDurationEligible("Full day", "Theme park", null, 120)).toBe(false);
 expect(gapDurationEligible("", "Gallery", 100, 120)).toBe(false);
 expect(gapDurationEligible("", "Gallery", 60, 120)).toBe(true);
 expect(gapDurationEligible("", "Unresolved visit", null, 120)).toBe(true);
});
