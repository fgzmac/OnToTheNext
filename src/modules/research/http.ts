import https from "node:https";
import http from "node:http";
import { lookup } from "node:dns";
import { isIP } from "node:net";
export function publicAddress(address: string): boolean {
  if (isIP(address) !== 4) return false; // Conservatively refuse IPv6, mapped/transition and unknown address forms.
  const [a,b,c] = address.split(".").map(Number);
  return !(a===0 || a===10 || a===127 || a>=224 || (a===100&&b>=64&&b<=127) || (a===169&&b===254)
    || (a===172&&b>=16&&b<=31) || (a===192&&(b===168 || b===0 || (b===88&&c===99)))
    || (a===198&&(b===18||b===19||(b===51&&c===100))) || (a===203&&b===0&&c===113));
}
export function publicUrl(value: string) {
  const u = new URL(value);
  if (!["https:","http:"].includes(u.protocol) || u.username || u.password || (u.port && !["80","443"].includes(u.port))
    || u.hostname.endsWith(".local") || u.hostname === "localhost" || (isIP(u.hostname.replace(/[\[\]]/g,"")) && !publicAddress(u.hostname))) throw new Error("UNSAFE_URL");
  return u;
}
export interface HttpInput { url: string; method?: "GET" | "POST"; headers?: Record<string,string>; body?: string; signal?: AbortSignal }
export interface HttpResult { status: number; headers: Record<string,string>; body: string }
export type HttpTransport = (input: HttpInput) => Promise<HttpResult>;
// No implicit redirects/decompression. DNS is checked in the actual socket lookup,
// not a separate preflight susceptible to rebinding. Every redirected hop is rechecked.
export const publicHttp: HttpTransport = input => new Promise((resolve,reject) => {
  let u: URL; try { u=publicUrl(input.url); } catch(e) { reject(e); return; }
  const req = (u.protocol === "https:" ? https : http).request(u, {
    method:input.method ?? "GET", agent:false, family:4, signal:input.signal,
    headers:{ ...input.headers, "Accept-Encoding":"identity" },
    lookup:(hostname,options,callback) => lookup(hostname,{family:4,all:true},(error,addresses) => {
      if(error || !addresses.length || addresses.some(a=>!publicAddress(a.address))) return callback(error ?? new Error("UNSAFE_ADDRESS"),"",4);
      if(options.all) callback(null,addresses); else callback(null,addresses[0].address,4);
    }),
  }, res => {
    if(res.headers["content-encoding"] && res.headers["content-encoding"] !== "identity") { res.destroy(); reject(new Error("COMPRESSED_RESPONSE_REJECTED")); return; }
    let size=0; const chunks:Buffer[]=[];
    res.on("data",(chunk:Buffer)=>{size+=chunk.length; if(size>512_000) {req.destroy(new Error("RESPONSE_TOO_LARGE"));}else chunks.push(chunk);});
    res.on("error",reject);
    res.on("end",()=>resolve({status:res.statusCode ?? 0,headers:Object.fromEntries(Object.entries(res.headers).map(([k,v])=>[k,Array.isArray(v)?v.join(","):v??""])),body:Buffer.concat(chunks).toString("utf8")}));
  });
  const timeout=setTimeout(()=>req.destroy(new Error("HTTP_TIMEOUT")),15_000);
  req.on("close",()=>clearTimeout(timeout));req.on("error",reject);req.end(input.body);
});
export async function getPermittedJson(input: HttpInput, transport: HttpTransport, allowed: (url:string)=>boolean) {
  let url=input.url;
  for(let redirects=0;redirects<=2;redirects++){
    publicUrl(url); if(!allowed(url)) throw new Error("SOURCE_NOT_PERMITTED");
    const response=await transport({...input,url});
    if([301,302,303,307,308].includes(response.status)) { if(redirects===2) throw new Error("REDIRECT_LIMIT"); url=new URL(response.headers.location,url).href; continue; }
    if(response.status===429) throw new Error("RATE_LIMIT:"+retryAfter(response.headers["retry-after"]));
    if(response.status!==200) throw new Error("HTTP_STATUS:"+response.status);
    if(response.body.length>512_000) throw new Error("RESPONSE_TOO_LARGE");
    return JSON.parse(response.body) as unknown;
  }
  throw new Error("REDIRECT_LIMIT");
}
export function retryAfter(value?: string): number {
  const seconds=Number(value);return Math.min(3600,Math.max(1,Number.isFinite(seconds)?seconds:Math.ceil((Date.parse(value??"")-Date.now())/1000)||60));
}
