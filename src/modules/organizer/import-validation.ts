import type { InputItem } from "./domain";
import { documentIdentity, IMPORT_LIMITS } from "./import-types";
/** Shared dated/undated persistence boundary. Old source-less JSON remains readable. */
export function validateImportEnvelope(text:string, values:InputItem[]) {
  if(typeof text!=="string"||!text.trim()||text.length>IMPORT_LIMITS.characters||text.split(/\r?\n/).length>IMPORT_LIMITS.lines||!Array.isArray(values)||!values.length||values.length>IMPORT_LIMITS.items||JSON.stringify(values).length>IMPORT_LIMITS.reviewCharacters)throw Error("Import exceeds the bounded source or review limits.");
  const count=text.split(/\r?\n/).length,doc=documentIdentity(text),ids=new Set<string>();
  for(const v of values){
    if(!v||typeof v!=="object")throw Error("Invalid import item.");
    if(!v.source)continue;
    const s=v.source,roles=["UNKNOWN","USER","ASSISTANT","OWNER_CORRECTION"];
    const span=(a:number,b:number)=>Number.isInteger(a)&&Number.isInteger(b)&&a>=1&&b>=a&&b<=count;
    if(s.version!==1||s.document!==doc||typeof s.id!=="string"||ids.has(s.id)||!s.id.startsWith(doc+":")||typeof s.section!=="string"||!s.section.startsWith(doc+":")||!span(s.start,s.end)||!roles.includes(s.role)||!Array.isArray(s.parents)||!s.parents.every(p=>typeof p==="string"&&p.length<2000)||!Array.isArray(s.questions)||!s.questions.every(q=>typeof q==="string"&&q.length<2000)||!Array.isArray(s.timing)||s.timing.some(t=>typeof t.text!=="string"||typeof t.role!=="string"||!span(t.start,t.start))||!s.fields||Object.values(s.fields).some(e=>!span(e.start,e.end)||!roles.includes(e.role)))throw Error("Source evidence does not belong to this input. Review again.");
    ids.add(s.id);
  }
}
