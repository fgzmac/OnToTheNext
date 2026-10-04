import { CATALOG } from "../discover/catalog";
import { identity } from "./domain";

/** Exact city and unique name (optionally its own category). Never fuzzy branch matching. */
export function independentContent(name:string,city:string) {
  const matches=CATALOG.filter(p=>identity(p.city)===identity(city)&&[p.name,`${p.name} ${p.category}`].some(n=>identity(n)===identity(name)));
  if(matches.length!==1||matches[0].kind==="EVENT")return null;
  const p=matches[0];
  return {description:p.summary,sourceUrl:p.url,sourceLabel:"Existing independent catalog description",observed:p.checkedAt};
}
