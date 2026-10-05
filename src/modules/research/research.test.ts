import {describe,it,expect,vi} from "vitest";
import {researchConfiguration} from "./config";
import {publicAddress,publicUrl,getPermittedJson,retryAfter} from "./http";
import {braveSearch,readEntity,documentFor,extract,extractionBody} from "./adapters";
import {parseCandidate,evaluate,identityKey,validMedia} from "./validation";
import {entityId} from "./policy";
import {researchQueries} from "./queries";
import {syntheticConfig as config,syntheticEntities,syntheticHttp} from "../../../tests/fixtures/research";
import type {ResearchContext,Candidate,RuntimeMedia} from "./types";
const context:ResearchContext={tripId:"private-id",segmentId:"private-segment",destination:"Lisbon",country:"Portugal",start:"2032-04-01",end:"2032-04-03",tripStart:"2032-04-01",tripEnd:"2032-04-03",language:"en",interests:["CULTURE_HISTORY"]};
const clock=()=>new Date("2026-09-23T12:00:00Z");
const doc=()=>documentFor(syntheticEntities.Q3000,context,"Q1000",["Q3000","Q1000"],clock);
const candidate=():Candidate=>({documentId:doc().id,entityId:"Q3000",name:doc().name,originalName:doc().originalName,description:doc().description,kind:"VENUE",category:"Gallery",interests:["CULTURE_HISTORY"],claimLocators:doc().claims.map(c=>c.locator),uncertainties:[],conflicts:[],event:null,media:null});
describe("runtime discovery boundaries",()=>{
 it("requires independent activation, credentials, rights, retention, model and budgets",()=>{
  const result=researchConfiguration({});expect(result.config).toBeNull();expect(result.missing).toContain("RESEARCH_APPROVAL");expect(result.missing).toContain("RESEARCH_MAX_USD");
  expect(researchConfiguration({RESEARCH_BRAVE_KEY:"existing",RESEARCH_OPENAI_KEY:"existing"}).config).toBeNull();
 });
 it.each(["127.0.0.1","10.2.3.4","169.254.169.254","192.168.1.2","172.20.0.1","100.64.0.1","0.0.0.0","224.0.0.1","::1","::ffff:127.0.0.1","198.18.0.1"])("rejects private/special connection address %s",address=>expect(publicAddress(address)).toBe(false));
 it("permits public IPv4 at connection lookup",()=>expect(publicAddress("93.184.216.34")).toBe(true));
 it.each(["file:///etc/passwd","http://localhost/a","https://user:pass@example.com","http://127.0.0.1","http://[::1]","https://example.com:9999"])("rejects unsafe URL %s",url=>expect(()=>publicUrl(url)).toThrow());
 it("rechecks redirects before any next request",async()=>{
  const send=vi.fn().mockResolvedValue({status:302,headers:{location:"http://169.254.169.254/latest"},body:""});
  await expect(getPermittedJson({url:"https://www.wikidata.org/wiki/Q1000"},send,()=>true)).rejects.toThrow("UNSAFE_URL");expect(send).toHaveBeenCalledTimes(1);
 });
 it("does not fetch unknown publisher permissions",async()=>{
  const send=vi.fn();await expect(getPermittedJson({url:"https://example.com"},send,()=>false)).rejects.toThrow("SOURCE_NOT_PERMITTED");expect(send).not.toHaveBeenCalled();
 });
 it("bounds response size",async()=>{await expect(getPermittedJson({url:"https://example.com"},async()=>({status:200,headers:{},body:"x".repeat(512001)}),()=>true)).rejects.toThrow("RESPONSE_TOO_LARGE");});
 it("surfaces Retry-After without immediate retry",async()=>{
  const send=vi.fn(syntheticHttp({rateLimit:true}));await expect(braveSearch("Lisbon",context,config,send)).rejects.toThrow("RATE_LIMIT:120");expect(send).toHaveBeenCalledTimes(1);expect(retryAfter("999999")).toBe(3600);
 });
 it("only nominates search URLs, never snippet claims",async()=>{const links=await braveSearch("Lisbon",context,config,syntheticHttp());expect(links).toContain("https://www.wikidata.org/wiki/Q3000");expect(typeof links[0]).toBe("string");});
 it("reads permitted structured claims through real adapter contract",async()=>{const e=await readEntity("Q3000",config,syntheticHttp());expect(e.id).toBe("Q3000");});
 it("uses typed Responses output, no tools, no identities or private notes",()=>{
  const body=extractionBody(doc(),context,config,2000);
  expect(body.store).toBe(false);expect(body.text.format.strict).toBe(true);expect("tools" in body).toBe(false);
  expect(JSON.stringify(body)).not.toContain("private-id");expect(body.model).toBe(config.model);
 });
 it("handles model refusal",async()=>{await expect(extract(doc(),context,config,syntheticHttp({refusal:true}),2000)).rejects.toThrow("EXTRACTION_REFUSED");});
 it("handles truncated model response",async()=>{await expect(extract(doc(),context,config,async()=>({status:200,headers:{},body:JSON.stringify({status:"incomplete"})}),2000)).rejects.toThrow("EXTRACTION_INCOMPLETE");});
 it("rejects invented document/claim references",()=>{expect(()=>evaluate({...candidate(),documentId:"unknown"},[doc()],context,clock)).toThrow("INVENTED_REFERENCE");expect(evaluate({...candidate(),claimLocators:["invented"]},[doc()],context,clock).reasons.length).toBeGreaterThan(0);});
 it("rejects material descriptions introduced by model memory",()=>{expect(evaluate({...candidate(),description:"Open daily, free tickets available."},[doc()],context,clock).reasons).toContain("description unsupported or too thin");});
 it("withholds invented material caveats while retaining supported unknowns",()=>{expect(evaluate({...candidate(),uncertainties:["Tickets are always sold out."]},[doc()],context,clock).reasons).toContain("unsupported caveat");expect(evaluate({...candidate(),uncertainties:["Access and availability unverified."]},[doc()],context,clock).reasons).toEqual([]);});
 it("rejects invalid extraction shapes",()=>{expect(()=>parseCandidate({name:"guess"})).toThrow();expect(()=>parseCandidate({...candidate(),tools:["shell"]})).toThrow("UNEXPECTED_FIELD");});
 it("holds unresolved country, location and conflicting identity",()=>{
  expect(evaluate(candidate(),[{...doc(),country:"Other"}],context,clock).reasons).toContain("destination unresolved");
  expect(evaluate({...candidate(),conflicts:["two locations"]},[doc()],context,clock).reasons).toContain("critical contradiction");
 });
 it("keeps branches and neighborhoods distinct with evidence identity",()=>{
  const a=evaluate(candidate(),[doc()],context,clock);expect(identityKey(a)).not.toBe(identityKey({...a,candidate:{...a.candidate,kind:"NEIGHBORHOOD"}}));
  expect(identityKey(a)).not.toBe(identityKey({...a,candidate:{...a.candidate,entityId:"Q3001"}}));
 });
 it("does not upgrade community events to official availability",()=>{
  const c={...candidate(),kind:"EVENT" as const,event:{startDate:"2026-02-30",endDate:"2026-02-30",timeZone:"Europe/Lisbon",status:"PUBLISHED" as const,observedAt:"2025-09-23",recheckAfter:"2025-10-01"}};
  expect(evaluate(c,[doc()],context,clock).reasons).toContain("no verified event occurrence");
 });
 it("holds stale or future evidence",()=>{expect(evaluate(candidate(),[{...doc(),retrievedAt:"2025-01-01"}],context,clock).reasons).toContain("stale observation");});
 it("rejects unreviewed or mismatched media",()=>{expect(validMedia({subjectId:"different"} as never,"Q3000")).toBe(false);expect(evaluate({...candidate(),media:{} as never},[doc()],context,clock).reasons).toContain("media requires independent rights and subject review");});
 it("validates reusable runtime media by exact subject and license URL",()=>{const m:RuntimeMedia={subjectId:"Q3000",asset:"https://upload.wikimedia.org/wikipedia/commons/a/a0/Synthetic.jpg",sourcePage:"https://commons.wikimedia.org/wiki/File:Synthetic.jpg",title:"Synthetic contract only",creator:"Test fixture author",license:"CC0",licenseUrl:"https://creativecommons.org/publicdomain/zero/1.0/",capturedAt:"unknown",retrievedAt:"2026-09-23",subjectMatch:"REVIEWED",rightsBasis:"Synthetic metadata only; no live photo",exterior:true};expect(validMedia(m,"Q3000")).toBe(true);expect(validMedia(m,"Q3001")).toBe(false);expect(validMedia({...m,licenseUrl:"https://creativecommons.org/licenses/by/4.0"},"Q3000")).toBe(false);});
 it("builds multiple language/query families without attraction seeds",()=>{
  const q=researchQueries({...context,language:"pt"}).join(" ");expect(q).toContain("agenda eventos");expect(q).toContain("2032-04-01");expect(q).toContain("culture history");expect(q).not.toContain("Synthetic River Gallery");
 });
 it("never permits Reddit, credentials, alternate wiki hosts or invented entity paths",()=>{
  for(const url of ["https://reddit.com/r/travel","https://www.wikidata.org.evil.test/wiki/Q1","https://user@www.wikidata.org/wiki/Q1","https://www.wikidata.org/wiki/not-an-entity"])expect(entityId(url)).toBeNull();
 });
});
