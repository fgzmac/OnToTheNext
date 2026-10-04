import { CATALOG } from "../discover/catalog";
import { identity } from "./domain";

/** Exact city and unique name, allowing only its own category or city suffix. Never fuzzy branch matching. */
export function independentContent(name:string,city:string) {
  const matches=CATALOG.filter(p=>identity(p.city)===identity(city)&&[p.name,`${p.name} ${p.category}`,identity(p.name).endsWith(" "+identity(p.city))?p.name.slice(0,-p.city.length).trim():p.name].some(n=>identity(n)===identity(name)));
  if(matches.length!==1||matches[0].kind==="EVENT")return null;
  const p=matches[0];
  return {description:p.summary,sourceUrl:p.url,sourceLabel:"Existing independent catalog description",observed:p.checkedAt};
}
