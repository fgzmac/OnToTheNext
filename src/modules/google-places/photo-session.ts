import {randomUUID} from "node:crypto";
type Session={binding:string;expiresAt:number;positions:Set<number>};
/** Ephemeral admission counters only. Never stores provider content or photo names.
 * Process restart expires grants; distributed workers fail closed on unknown grants. */
export class PhotoSessions {
 private sessions=new Map<string,Session>();
 constructor(private now=()=>Date.now()){}
 issue(binding:string){
  for(const [id,s] of this.sessions)if(s.expiresAt<=this.now())this.sessions.delete(id);
  if(this.sessions.size>=1000)throw Error("PHOTO_SESSION_CAPACITY");
  const token=randomUUID(),expiresAt=this.now()+300_000;
  this.sessions.set(token,{binding,expiresAt,positions:new Set()});return {token,expiresAt};
 }
 validate(token:string|undefined,binding:string){
  const s=token?this.sessions.get(token):undefined;
  if(!s||s.expiresAt<=this.now()){if(token)this.sessions.delete(token);throw Error("PHOTO_SESSION_EXPIRED");}
  if(s.binding!==binding)throw Error("MATCH_CHANGED");return s;
 }
 claim(token:string|undefined,binding:string,position:unknown){
  if(!Number.isInteger(position)||Number(position)<0||Number(position)>2)throw Error("PHOTO_POSITION_INVALID");
  const s=this.validate(token,binding);
  if(s.positions.size>=3||s.positions.has(Number(position)))throw Error("PHOTO_ATTEMPT_LIMIT");
  // Synchronous admission before any reservation await: rapid/concurrent calls cannot exceed three.
  s.positions.add(Number(position));
 }
}
export const photoSessions=new PhotoSessions();
