import type {Candidate,DetailOutcome,Enrichment,GoogleInput,PlaceIdentity} from "./types";
type Section = "overview" | "reviews" | "photo";
type Load = "idle" | "loading" | "ready" | "empty" | "missing" | "unavailable" | "budget_exhausted";
export interface Gallery {entries:(Enrichment|undefined)[];states:Load[];selected:number;displayed?:number;attempts:number}
export interface DetailState {
 status:DetailOutcome; candidates:Candidate[]; identity?:PlaceIdentity;
 gallery?:Gallery;
 overview?:Enrichment; reviews?:Enrichment; photo?:Enrichment;
 sections:Record<Section,Load>; expiresAt?:number; diagnostic?:string; warning?:string;
}
const initial=():DetailState=>({status:"loading",candidates:[],gallery:{entries:[],states:["idle","idle","idle"],selected:0,attempts:0},sections:{overview:"idle",reviews:"idle",photo:"idle"}});
export const sameIdentity=(a?:PlaceIdentity,b?:PlaceIdentity)=>!!a&&!!b&&a.placeId===b.placeId&&a.revision===b.revision;
/** One explicit panel-opening session. No storage, module cache, remount effect or automatic retry. */
export class DetailSession {
 private state=initial(); private listeners=new Set<()=>void>(); private generation=0;
 private begun=false; private closed=false; private confirming=false; private timer:ReturnType<typeof setTimeout>|undefined;
 constructor(private input:{tripId:string;recommendationId:string},private send:(input:GoogleInput)=>Promise<Enrichment>,private now=()=>Date.now()) {}
 matches(tripId:string,recommendationId:string){return this.input.tripId===tripId&&this.input.recommendationId===recommendationId;}
 snapshot=()=>this.state;
 subscribe=(listener:()=>void)=>{this.listeners.add(listener);return()=>{this.listeners.delete(listener);};};
 private update(patch:Partial<DetailState>){this.state={...this.state,...patch};this.listeners.forEach(fn=>fn());}
 private fresh(version:number){if(this.closed||version!==this.generation)return false;if(this.state.expiresAt&&this.now()>=this.state.expiresAt){this.expire();return false;}return true;}
 private expire(){this.generation++;clearTimeout(this.timer);this.state={...initial(),status:"expired"};this.listeners.forEach(fn=>fn());}
 private retain(response:Enrichment) {
  if(!this.state.expiresAt&&(response.place||response.candidates?.length||response.photo)){
   const expiresAt=this.now()+300_000;
   this.update({expiresAt});this.timer=setTimeout(()=>this.expire(),Math.max(0,expiresAt-this.now()));
  }
 }
 private async request(purpose:GoogleInput["purpose"],token?:string,photoPosition?:number):Promise<Enrichment>{
  try{return await this.send({...this.input,purpose,token,photoPosition,photoSession:purpose==="photo"?this.state.overview?.photoSession?.token:undefined,reference:purpose==="open"||purpose==="identity"||purpose==="confirm"?undefined:this.state.identity,requestId:crypto.randomUUID()});}
  catch{return {status:"unavailable",message:"Place details are unavailable."};}
 }
 async open() {
  if(this.begun||this.closed)return;
  this.begun=true;const version=this.generation;
  const available=await this.request("open");if(!this.fresh(version))return;
  if(available.matched&&available.identity){this.update({identity:available.identity});await this.loadOverview();return;}
  if(available.status!=="needs_confirmation"){this.update({status:available.status??"unavailable",diagnostic:available.diagnostic});return;}
  const found=await this.request("identity");if(!this.fresh(version))return;
  this.retain(found);this.update({status:found.status??"unavailable",candidates:found.candidates??[],diagnostic:found.diagnostic});
 }
 async confirm(token:string) {
  if(this.closed||this.confirming||!this.fresh(this.generation)||!this.state.candidates.some(c=>c.eligible&&c.token===token))return;
  this.confirming=true;const version=this.generation;this.update({status:"loading"});
  const linked=await this.request("confirm",token);if(!this.fresh(version))return;
  this.confirming=false;
  if(!linked.matched||!linked.identity){this.update({status:linked.status??"unavailable",diagnostic:linked.diagnostic});return;}
  this.update({identity:linked.identity,candidates:[]});await this.loadOverview();
 }
 private invalidate(warning?:string){clearTimeout(this.timer);this.generation++;this.state={...initial(),status:"unavailable",warning};this.listeners.forEach(fn=>fn());}
 private async section(section:"overview"|"reviews",purpose:"context"|"reviews") {
  if(!this.state.identity||this.state.sections[section]!=="idle"||!this.fresh(this.generation))return;
  const version=this.generation,identity=this.state.identity;
  this.update({sections:{...this.state.sections,[section]:"loading"}});
  const result=await this.request(purpose);if(!this.fresh(version))return;
  if(result.status==="expired"){this.expire();return;}
  if(result.identityChanged || (result.identity&&!sameIdentity(identity,result.identity)) || (result.place&&result.place.id!==identity.placeId)){this.invalidate(result.warning);return;}
  if(!result.matched||!sameIdentity(identity,result.identity)||!result.place){
   this.update({sections:{...this.state.sections,[section]:result.status==="budget_exhausted"?"budget_exhausted":"unavailable"},diagnostic:result.diagnostic,...(section==="overview"?{status:result.status??"unavailable"}:{})});return;
  }
  this.retain(result);
  this.update({[section]:result,sections:{...this.state.sections,[section]:section==="reviews"&&!result.place.reviews?.length?"empty":"ready"},...(section==="overview"?{status:"ready" as const}:{})});
 }
 private async loadOverview(){await this.section("overview","context");if(this.state.overview&&!this.closed)await this.selectPhoto(0);}
 async reviews(){if(this.state.overview)await this.section("reviews","reviews");}

 async selectPhoto(position:number){
  if(!Number.isInteger(position)||position<0||position>2||!this.state.overview||!this.state.identity||!this.fresh(this.generation))return;
  const g=this.state.gallery!;
  if(g.states.includes("loading"))return;
  if(g.entries[position]){this.update({photo:g.entries[position],gallery:{...g,selected:position,displayed:position},sections:{...this.state.sections,photo:"ready"}});return;}
  if(g.states[position]!=="idle"||g.attempts>=3){this.update({gallery:{...g,selected:position},sections:{...this.state.sections,photo:g.states[position]}});return;}
  const version=this.generation,identity=this.state.identity;
  this.update({gallery:{...g,selected:position,attempts:g.attempts+1,states:g.states.map((s,i)=>i===position?"loading":s)},sections:{...this.state.sections,photo:"loading"}});
  const result=await this.request("photo",undefined,position);
  if(!this.fresh(version))return;
  if(result.status==="expired"){this.expire();return;}
  if(result.identityChanged||(result.identity&&!sameIdentity(identity,result.identity))||(result.place&&result.place.id!==identity.placeId)){this.invalidate(result.warning);return;}
  const ready=result.matched&&sameIdentity(identity,result.identity)&&result.place;
  const status:Load=result.status==="budget_exhausted"?"budget_exhausted":!ready?"unavailable":result.photo?"ready":"missing";
  const current=this.state.gallery!,entries=[...current.entries];
  if(status==="ready")entries[position]=result;
  this.update({gallery:{...current,entries,states:current.states.map((s,i)=>i===position?status:s),...(status==="ready"?{displayed:position}:{})},
   ...(status==="ready"?{photo:result}:{}),sections:{...this.state.sections,photo:status}});
 }
 photoFailed(data?:string,position=this.state.gallery?.displayed){
  if(!this.fresh(this.generation)||!this.state.photo||(data&&data!==this.state.photo.photo?.data)||position!==this.state.gallery?.displayed)return;
  const g=this.state.gallery!,entries=[...g.entries];if(position!==undefined)entries[position]=undefined;
  const fallback=entries.findIndex(e=>!!e?.photo);
  this.update({photo:fallback>=0?entries[fallback]:undefined,gallery:{...g,entries,displayed:fallback>=0?fallback:undefined,states:g.states.map((s,i)=>i===position?"unavailable":s)},sections:{...this.state.sections,photo:"unavailable"}});
 }
 async refresh(){
  if(this.closed||this.state.status==="loading"||Object.values(this.state.sections).includes("loading"))return;
  clearTimeout(this.timer);this.generation++;this.state=initial();this.begun=false;this.confirming=false;this.listeners.forEach(fn=>fn());await this.open();
 }
 close(){this.closed=true;this.generation++;clearTimeout(this.timer);this.state={...initial(),status:"unavailable"};this.listeners.forEach(fn=>fn());this.listeners.clear();}
}
