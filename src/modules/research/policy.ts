export interface SourcePolicy {
  id: string; domain: string; role: string; access: string; status: "enabled" | "blocked" | "awaiting permission";
  processing: boolean; storage: string; attribution: string; recheckDays: number; concurrency: number; intervalMs: number; evidence: string;
}
export const SOURCE_POLICIES: readonly SourcePolicy[] = [
  { id:"wikidata",domain:"www.wikidata.org",role:"structured community reference",access:"Special:EntityData JSON only",status:"enabled",
    processing:true,storage:"CC0 selected structured claims; raw response in memory only",attribution:"Wikidata, entity and revision",
    recheckDays:30,concurrency:1,intervalMs:1000,evidence:"https://www.wikidata.org/wiki/Wikidata:Licensing" },
  { id:"commons",domain:"commons.wikimedia.org",role:"media rights metadata",access:"MediaWiki API only",status:"awaiting permission",
    processing:false,storage:"per-file reuse license and exact subject review required",attribution:"creator, source, license, alterations",
    recheckDays:30,concurrency:1,intervalMs:1000,evidence:"https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia" },
  { id:"reddit",domain:"reddit.com",role:"firsthand account",access:"none",status:"blocked",processing:false,storage:"none",
    attribution:"not collected",recheckDays:0,concurrency:0,intervalMs:0,evidence:"D-035; provider approval pending" },
  { id:"publishers",domain:"*",role:"official / local editorial / organizer",access:"none until individually reviewed",
    status:"awaiting permission",processing:false,storage:"none",attribution:"publisher-specific",recheckDays:0,concurrency:0,intervalMs:0,evidence:"No publisher grant established" },
];
export function entityId(url: string): string | null {
  try { const u = new URL(url); if (u.protocol !== "https:" || u.hostname !== "www.wikidata.org" || u.username || u.password || u.port || u.search) return null;
    return /^\/wiki\/(Q[1-9]\d*)$/.exec(u.pathname)?.[1] ?? /^\/wiki\/Special:EntityData\/(Q[1-9]\d*)\.json$/.exec(u.pathname)?.[1] ?? null;
  } catch { return null; }
}
