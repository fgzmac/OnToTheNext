import {describe,it,expect} from "vitest";
import {createElement} from "react";
import {renderToStaticMarkup} from "react-dom/server";
import {GoogleDetailsView} from "@/app/components/google-context";
import type {DetailState} from "./detail-session";
const base:DetailState={status:"unavailable",candidates:[],sections:{overview:"idle",reviews:"idle",photo:"idle"}};
const render=(state:DetailState,tab:"overview"|"reviews"="overview")=>renderToStaticMarkup(createElement(GoogleDetailsView,{state,tab,setTab:()=>{},confirm:()=>{},reviews:()=>{},refresh:()=>{},photoFailed:()=>{}}));
describe("traveler details presentation",()=>{
 it.each(["disabled","unavailable","budget_exhausted","expired"] as const)("%s message alone has no empty Google provider container",status=>{const html=render({...base,status});expect(html).not.toContain('class="google-provider-content"');expect(html).not.toContain("Google Maps");expect(html).not.toContain("owner activation");});
 it("ready content has attribution and no API control panel",()=>{const html=render({...base,status:"ready",overview:{message:"",place:{id:"synthetic",rating:4.3,userRatingCount:123,formattedAddress:"Synthetic address",attributions:[{provider:"Synthetic credit"}]}}});expect(html).toContain("Google Maps");expect(html).toContain("Synthetic credit");expect(html).toContain("123 ratings");for(const text of ["Find / correct","Request current","Request reviews","Request one photo","Clear Google","requires owner activation"])expect(html).not.toContain(text);});
 it("review failure retains visible overview while providing concise recovery",()=>{const html=render({...base,status:"ready",overview:{message:"",place:{id:"synthetic",rating:4.3}},sections:{overview:"ready",photo:"unavailable",reviews:"unavailable"}},"reviews");expect(html).toContain("4.3 / 5");expect(html).toContain("Reviews aren’t available right now.");expect(html).toContain("Photo unavailable.");});
 it("mandatory review credits and relevance order remain visible",()=>{const html=render({...base,status:"ready",reviews:{message:"",place:{id:"synthetic",reviews:[{text:{text:"Synthetic review",languageCode:"en"},originalText:{text:"合成",languageCode:"ja"},authorAttribution:{displayName:"Synthetic author"}}]}}},"reviews");for(const text of ["Google Maps","Provider relevance order","Synthetic author","Translated display"])expect(html).toContain(text);});
});
