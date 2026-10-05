import type { InputItem } from "./domain";
import { appointment, dateIn, monthPattern, rangeIssue } from "./import-dates";
import { documentIdentity, IMPORT_LIMITS, type SourceRole } from "./import-types";

export type ImportSection = { id: string; title: string; start: number; end: number; role: SourceRole; revised: boolean; items: InputItem[]; references: { start: number; end: number; text: string }[] };
export type ImportDocument = { id: string; sections: ImportSection[]; suggested: string; year?: number; yearBasis: string; warnings: string[] };
const normal = (s:string) => s.normalize("NFKC").toLowerCase().replace(/\s*\/\s*/g,"/").replace(/\s+/g," ").trim();
const categories = /^(?:places to go|hotels?|accommodations?|booking(?: priorities| queue| order)?|sources?|date(?:\s+proposed plan)?|notes?|tbd|must-do activities.*|.*day trip (?:places|ideas).*)[:：]?$/i;
const instruction = /^(?:ignore\b|system\s*:|execute\b|run\s+(?:command|script)|reveal\b|send\s+(?:secret|password)|<script|please\b)/i;
const hours = /\b(?:opening|closes?|closing|last admission|last entry|published.*schedule|deadline|ticket.release|drawing closes|cancellation cutoff)\b/i;
function period(s:string) { return /\b(?:not|no) (?:a |another |separate )?full.day/i.test(s)?"":/\bfull[ -]day\b/i.test(s)?"Full day":/afternoon.*evening/i.test(s)?"Afternoon & Evening":/early[ ,]+morning/i.test(s)?"Early morning":/\bafternoon\b/i.test(s)?"Afternoon":/\bevening\b/i.test(s)?"Evening":/\bmorning\b/i.test(s)?"Morning":""; }
function booking(s:string, protectedItem:boolean): { value:InputItem["booking"]; status:string } {
  if (/\b(?:no(?:\s+\w+){0,3}\s+booked|not(?:\s+\w+){0,3}\s+booked|nothing booked|unbooked)\b/i.test(s)) return {value:"",status:"No booking yet / unresolved"};
  if (protectedItem) return {value:"",status:"No admission implied by protection"};
  if (/\b(?:need tickets|tickets required|to book|buy (?:the |a |dated )?(?:ticket|admission))\b/i.test(s)) return {value:"NEED_TICKETS",status:"Explicit admission requirement"};
  if (/\b(?:booked|confirmed reservation)\b/i.test(s) && !/\b(?:if|when|once|would|should|suggest|consider)\b/i.test(s)) return {value:"BOOKED_STATEMENT",status:"Reported booking; owner confirmation required"};
  return {value:"",status:/\b(?:book|reserve|tickets?)\b/i.test(s)?"Booking suggestion or condition; not confirmed":"Unknown booking state"};
}
function cleanName(s:string) {
  return s.replace(/https?:\/\/[^\s<>]+/g,"").replace(/^Check in,? then explore\s+/i,"").replace(/^Optional short,? early\s+/i,"").replace(/^(?:need tickets for|visit|explore|browse|hike)\s+/i,"")
    .split(/,\s*(?:followed by|with .+ as the nearby addition)/i)[0]
    .split(/\s+[—–]\s+|\s+-\s+(?=(?:need|book|full|early|optional|transport|restful|one of)\b)/i)[0]
    .replace(/\s+(?:at\s+)?(?:[01]?\d|2[0-3]):[0-5]\d(?:\s*(?:a\.?m\.?|p\.?m\.?))?(?:\s+booked)?\s*$/i,"")
    .replace(/\s+(?:at\s+)?\d{1,2}(?::\d\d)?\s*(?:a\.?m\.?|p\.?m\.?)(?:\s+booked)?\s*$/i,"")
    .replace(/;\s*(?:no .+booked|need tickets|not .+booked).*$/i,"")
    .replace(/\s+and have dinner$/i,"").replace(/\s+booked\s*$/i,"").replace(/[.;]+$/,"").trim();
}
/** Structural, offline extraction. Ambiguous prose remains source material, not a guessed attraction. */
export function parseDocument(text:string, cities:string[]=[], tripYear?:number):ImportDocument {
  if(text.length>IMPORT_LIMITS.characters)throw Error(`Paste up to ${IMPORT_LIMITS.characters.toLocaleString("en-US")} characters at a time.`);
  const lines=text.split(/\r?\n/);if(lines.length>IMPORT_LIMITS.lines)throw Error(`Review up to ${IMPORT_LIMITS.lines} source lines at a time.`);
  const doc=documentIdentity(text), sections:ImportSection[]=[];
  const explicitYears=[...text.matchAll(/\b(?:20\d{2}|21\d{2})\b/g)].map(m=>Number(m[0]));
  const uniqueYears=[...new Set(explicitYears)];
  // A historical year elsewhere must not silently replace the known trip year.
  const year=tripYear??(uniqueYears.length===1?uniqueYears[0]:undefined);
  const yearBasis=tripYear?`Trip year ${tripYear} used only where the source omits a year.`:year?`Source year ${year}.`:"Year unresolved; dates without a year need review.";
  let section!:ImportSection; let city="", cityLine=0, date="", dateLine=0, dateIssue="", parents:string[]=[], last:InputItem|undefined, lastIndent=0, referenceSection=false;
  const startSection=(line:number,title:string,role:SourceRole="UNKNOWN")=>{if(section)section.end=line-1;section={id:`${doc}:s${line}`,title,start:line,end:lines.length,role,revised:false,items:[],references:[]};sections.push(section);city="";date="";dateIssue="";parents=[];last=undefined;referenceSection=false;};
  startSection(1,"Supplied text");
  const ref=(n:number,s:string)=>section.references.push({start:n,end:n,text:s});
  const evidence=(i:InputItem,key:string,start:number,end=start,basis?:string)=>{if(i.source)i.source.fields[key]={start,end,role:section.role,...(basis?{basis}:{})};};
  const attach=(i:InputItem,n:number,s:string)=>{
    i.notes += "\n"+s;i.fragment += "\n"+lines[n-1];if(i.source){i.source.end=n;i.source.questions=[...new Set(i.source.questions)];}
    if(hours.test(s)){i.source?.timing.push({text:s,role:/deadline|release|drawing|cancellation/i.test(s)?"deadline / historical claim":"opening or closing hours / historical claim",start:n});return;}
    if(/^(?:choose|confirm|check|decide|verify|reserve|book)\b/i.test(s)&&s.length<=2000){i.decision=s;evidence(i,"decision",n);}
    else if(!i.description&&s.length<=2000){i.description=s;evidence(i,"description",n);}
  };
  const emit=(s:string,n:number,options:{note?:boolean; fragment?:string; part?:number; suppliedPeriod?:string; outing?:string; sequence?:string}={})=>{
    const protectedItem=/\b(?:keep .*(?:free|clear)|protect(?:ed)? (?:the )?(?:afternoon|evening|morning)|rest time)\b/i.test(s);
    const kind=protectedItem?"PROTECTED":options.note||instruction.test(s)||s.length>240?"NOTE":"ACTIVITY";
    const b=booking(s,protectedItem);const rawDate=dateIn(s,year);
    const i:InputItem={name:cleanName(s).slice(0,240)||"Retained source note",city,date:date||(!hours.test(s)?rawDate.value:""),time:kind==="NOTE"?"":appointment(s),period:options.suppliedPeriod??period(s),notes:s,kind,priority:/\b(?:must-do|priority)\b/i.test(s),alternative:kind!=="PROTECTED"&&/\b(?:or|optional|if admission|conditional on|if tickets)\b/i.test(s),booking:b.value,url:s.match(/https?:\/\/[^\s<>]+/)?.[0]??"",fragment:options.fragment??lines[n-1].trim(),excluded:false,sourceRole:section.role==="UNKNOWN"?"Unknown speaker/source":section.role==="USER"?"Direct user statement":"Quoted assistant proposal",source:{version:1,id:`${doc}:${n}:${options.part??0}`,document:doc,section:section.id,start:n,end:n,parents:[section.title,...parents],role:section.role,fields:{},questions:[],timing:[]}};
    evidence(i,"name",n);evidence(i,"booking",n,n,b.status);if(city)evidence(i,"city",cityLine);else i.source!.questions.push("Confirm the destination for this section.");
    if(i.date)evidence(i,"date",date?dateLine:n,date?dateLine:n,yearBasis);
    if(i.time)evidence(i,"time",n,n,"Appointment in supplied text; not independently verified");
    if(i.period)evidence(i,"period",n);if(i.kind==="PROTECTED")evidence(i,"kind",n);if(i.alternative)evidence(i,"alternative",n);
    if(dateIssue||rawDate.issue)i.source!.questions.push(dateIssue||rawDate.issue);
    if(date&&rawDate.value&&date!==rawDate.value)i.source!.questions.push("This line's date conflicts with its inherited date; confirm which applies.");
    if(options.outing){i.outing=options.outing;i.sequence=options.sequence;evidence(i,"outing",n,n,"Explicit source sequence; route not verified");evidence(i,"sequence",n);}
    if(/\bshort\b/i.test(s)&&/\b(?:walk|visit|stop)\b/i.test(s)){i.shortVisit=s;evidence(i,"shortVisit",n);}
    if(/(?:after (?:arrival|check.in)|check in,? then)/i.test(s)&&/evening|dinner|explore|walk/i.test(s)){i.conditionalEvening=s;evidence(i,"conditionalEvening",n);i.source!.questions.push("Confirm usable time after arrival; no travel duration supplied.");}
    if(kind==="NOTE")i.source!.questions.push("Reference text retained; split or identify an activity only if intended.");
    if(i.name!==s&&!options.outing&&!options.note){i.description=s;evidence(i,"description",n);}
    section.items.push(i);last=i;return i;
  };
  for(let idx=0;idx<lines.length;idx++){
    const n=idx+1,raw=lines[idx],trim=raw.trim();if(!trim)continue;
    const indent=raw.match(/^\s*/)?.[0].length??0;
    const bullet=/^(?:[-*•]|\d+[.)])\s+/.test(trim);
    const line=trim.replace(/^#{1,6}\s*/,"").replace(/^(?:[-*•]|\d+[.)])\s+/,"").trim();
    if(/^Worked for\s+\d/i.test(line)){startSection(n,`Conversation section ${sections.length+1}`);ref(n,raw);continue;}
    const speaker=line.match(/^(User|Assistant):\s*$/i);if(speaker){startSection(n,`${speaker[1]} section`,speaker[1].toLowerCase()==="user"?"USER":"ASSISTANT");ref(n,raw);continue;}
    if(/^(?:revised|updated|corrected|earlier|original) (?:plan|itinerary)(?:\s|$)/i.test(line)&&line.length<100){startSection(n,line,section.role);section.revised=/^(revised|updated|corrected)/i.test(line);ref(n,raw);continue;}
    if(/\b(?:revised|updated|corrected) day.by.day itinerary/i.test(line)&&line.length<100){section.revised=true;section.title=line;parents=[line];last=undefined;referenceSection=false;ref(n,raw);continue;}
    if(/^(?:hotels?|accommodation options|hotel dates|booking priorities|booking order|what to book|my .*hotel recommendations)\b/i.test(line)&&line.length<100){referenceSection=true;last=undefined;parents=[line];ref(n,raw);continue;}
    if(/^Generated image|^Sources$|^…$/.test(line)){ref(n,raw);continue;}
    const context=line.match(/^(Outing|Area|Description|Decision|Source role|Sequence|Short visit|Conditional evening):\s*(.+)$/i);
    if(context&&last){const keys:Record<string,string>={outing:"outing",area:"area",description:"description",decision:"decision","source role":"sourceRole",sequence:"sequence","short visit":"shortVisit","conditional evening":"conditionalEvening"};const key=keys[context[1].toLowerCase()];Object.assign(last,{[key]:context[2]});last.fragment+="\n"+trim;last.source!.end=n;evidence(last,key,n);continue;}
    const bare=line.replace(/[:：]$/,"");
    const headingCity=cities.find(c=>normal(bare)===normal(c)||(line.length<90&&!/[\t|]/.test(line)&&normal(bare).startsWith(normal(c)+":")));
    const rangeHeading=line.length<90&&!/[\t|]/.test(line)?line.match(new RegExp(`^([^:]{1,70}):\\s*(${monthPattern}\\s+\\d|\\d{4}-\\d\\d-\\d\\d)`,"i")):null;
    const plausibleCity=/^[\p{L}][\p{L}\s/-]{0,55}(?:City|Town|Borough|Village):$/u.test(line);
    if(headingCity||rangeHeading||(!categories.test(line)&&plausibleCity)){
      city=headingCity??(plausibleCity?bare:"");cityLine=n;date="";dateIssue="";parents=[line];last=undefined;referenceSection=false;ref(n,raw);
      // A stay range supplies destination context, not the visit date of every child.
      continue;
    }
    if(referenceSection){ref(n,raw);continue;}
    const datePrefix=new RegExp(`^(?:(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:day)?[.,]?\\s*)?(${monthPattern}\\s+\\d{1,2}(?:,?\\s+\\d{4})?|\\d{4}-\\d\\d-\\d\\d)(?:\\s*[-–]\\s*(?:${monthPattern}\\s+)?\\d{1,2})?`,"i");
    const dm=line.replace(/^Day\s+\d+\s*[-:·]?\s*/i,"").match(datePrefix);
    let body=line;
    if(dm){const remainder=line.slice(line.indexOf(dm[0])+dm[0].length);if(remainder.trim()&&!/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)[.,\s]/i.test(line)&&!/[\t|]/.test(remainder)&&!/^\s*[:·-]/.test(remainder)&&!cities.some(c=>normal(c)===normal(remainder))){ref(n,raw);continue;}
      const parsed=dateIn(dm[0],year);date=parsed.value;dateIssue=parsed.issue;dateLine=n;body=remainder.replace(/^\s*[:·\t|-]+\s*/,"").trim();last=undefined;if(!body){ref(n,raw);continue;}if(cities.some(c=>normal(c)===normal(body))){city=cities.find(c=>normal(c)===normal(body))!;cityLine=n;ref(n,raw);continue;}}
    if(categories.test(line)||/^#{1,6}\s/.test(trim)||/^(?:\d+\.?\s*)?(?:hotel dates|booking order|what to book|accommodation options|decisions before|the part I would|my .*recommendations)/i.test(line)||(!bullet&&!dm&&line.length<70&&/[:：]$/.test(line))){parents=[...parents.slice(0,1),line];last=undefined;ref(n,raw);continue;}
    // Date-table headings and explanatory paragraphs remain reference material.
    if(/^Date\s|^Stay\s|^Base\s|^Priority\s|^Total\b|^Version\b|^\d+ calendar days/i.test(line)){ref(n,raw);continue;}
    if(!dm&&last&&(indent>lastIndent||hours.test(line)||/^(?:Go early|Keep (?:this|the)|Do not|Confirm|Check|Choose|Verify|\d+[–-]\d+ (?:hours|minutes))/i.test(line))){attach(last,n,line);continue;}
    if(!dm&&!bullet&&(line.length>240||/^(?:I |We |You |Your |The |This |That |For |Before |Once |Neither |Both |My |With |As their |It |A private |What |Why |Are |Shall |Worked |Two nights|Six .*nights)/i.test(line)||/\b(?:are part of|is also listed|has not been|is not |not verified|lists a |is approximately)\b/i.test(line))){ref(n,raw);continue;}
    if(dm){
      const sentences=body.split(/(?<=[.!?])\s+(?=[A-Z])/);let emitted:InputItem|undefined;
      for(const [part,sentence] of sentences.entries()){
        if(part>0&&!/^(?:Protect |Keep .*free|Visit |Check in,? then|Optional short)/i.test(sentence)){if(emitted)attach(emitted,n,sentence);else ref(n,sentence);continue;}
        if(/\s(?:→|->)\s/.test(sentence)&&!/^Travel|^Return|^Leave|^Arrive|^Enjoy breakfast/i.test(sentence)){
          const stops=sentence.replace(/[.]$/,"").split(/\s+(?:→|->)\s+/);
          if(stops.length<=8&&!stops.some(s=>cities.some(c=>normal(c)===normal(s)))&&stops.every(s=>s.length<100)){
            stops.forEach((s,j)=>{emitted=emit(s,n,{fragment:trim,part:part*10+j,outing:sentence,sequence:String(j+1)});});continue;
          }
        }
        const transit=/^(?:Arrive|Travel|Leave|Depart|Departure|Check out|Enjoy breakfast|Collect luggage|Return to)\b/i.test(sentence);
        const ambiguous=(/\b(?:followed by|, then|and a |along with|collect your luggage|move to)\b/i.test(sentence))&&!/^Optional short|^Protect|^Keep .*free|^Check in,? then explore/i.test(sentence);
        emitted=emit(sentence,n,{part:part*10,fragment:trim,note:transit||ambiguous});
        if(ambiguous)emitted.source!.questions.push("This sentence contains several actions; review the split before scheduling.");
      }
    }else if(/\s(?:→|->)\s/.test(body)&&!/^Travel|^Route|^Return|^Leave/i.test(body)){
      const stops=body.split(/\s+(?:→|->)\s+/);if(stops.length<=8&&stops.every(s=>s.length<100)&&!stops.some(s=>cities.some(c=>normal(c)===normal(s))))stops.forEach((s,j)=>emit(s,n,{fragment:trim,part:j,outing:body,sequence:String(j+1)}));else emit(body,n,{note:true});
    }else emit(body,n,{note:instruction.test(body)||hours.test(body)});
    lastIndent=indent;
  }
  const total=sections.reduce((sum,s)=>sum+s.items.length,0);if(total>IMPORT_LIMITS.items)throw Error(`Review up to ${IMPORT_LIMITS.items} extracted items at a time; split at a section boundary.`);
  const suggested=[...sections].reverse().find(s=>s.revised&&s.items.length)??[...sections].reverse().find(s=>s.items.length)??sections[0];
  const warnings=sections.length>1?["Multiple source versions retained. Confirm the active section; other sections remain archived in the original text."]:[];
  if(uniqueYears.length>1)warnings.push("Several source years occur in this document. Historical examples and later corrections are not merged or newly verified.");
  lines.forEach((line,n)=>{const issue=rangeIssue(line,year)||dateIn(line,year).issue;if(issue)warnings.push(`Line ${n+1}: ${issue}`);});
  return {id:doc,sections,suggested:suggested.id,year,yearBasis,warnings:[...new Set(warnings)]};
}

export function correctItem(item:InputItem,key:keyof InputItem,value:unknown):InputItem {
  const result={...item,[key]:value};if(!item.source)return result;
  result.source={...item.source,fields:{...item.source.fields,[key]:{start:item.source.start,end:item.source.end,role:"OWNER_CORRECTION",basis:"Owner edited during import review"}},corrections:{...item.source.corrections,[key]:{previous:String(item[key]??""),value:String(value)}}};
  return result;
}
