export interface ResearchConfig {
  approval: string; braveKey: string; openaiKey: string; model: string; userAgent: string;
  retention: "standard-30-days" | "zdr"; searchStorage: boolean;
  maxSearch: number; maxDocuments: number; maxExtractions: number; maxSeconds: number;
  maxInputTokens: number; maxOutputTokens: number; maxUsd: number; pilotUsd: number;
  searchUsd: number; inputUsdPerMillion: number; outputUsdPerMillion: number;
}
export function researchConfiguration(env: Record<string,string|undefined> = process.env): { config: ResearchConfig | null; missing: string[] } {
  const required = ["RESEARCH_APPROVAL","RESEARCH_BRAVE_KEY","RESEARCH_OPENAI_KEY","RESEARCH_MODEL","RESEARCH_USER_AGENT",
    "RESEARCH_RETENTION","RESEARCH_SEARCH_STORAGE","RESEARCH_MAX_SEARCH","RESEARCH_MAX_DOCUMENTS","RESEARCH_MAX_EXTRACTIONS",
    "RESEARCH_MAX_SECONDS","RESEARCH_MAX_INPUT_TOKENS","RESEARCH_MAX_OUTPUT_TOKENS","RESEARCH_MAX_USD","RESEARCH_PILOT_USD",
    "RESEARCH_SEARCH_USD","RESEARCH_INPUT_USD_PER_MILLION","RESEARCH_OUTPUT_USD_PER_MILLION"];
  const missing = required.filter(key => !env[key]?.trim());
  if (env.RESEARCH_ENABLED !== "approved") missing.push("RESEARCH_ENABLED");
  if (!["standard-30-days","zdr"].includes(env.RESEARCH_RETENTION ?? "")) missing.push("approved retention");
  if (env.RESEARCH_SEARCH_STORAGE !== "approved") missing.push("Brave storage/processing rights");
  const number = (key: string, ceiling: number, integer = true) => {
    const value = Number(env[key]);
    if (!Number.isFinite(value) || value <= 0 || value > ceiling || (integer && !Number.isInteger(value))) missing.push(key + " limit");
    return value;
  };
  const limits = { maxSearch: number("RESEARCH_MAX_SEARCH",12), maxDocuments: number("RESEARCH_MAX_DOCUMENTS",30),
    maxExtractions: number("RESEARCH_MAX_EXTRACTIONS",12), maxSeconds: number("RESEARCH_MAX_SECONDS",300),
    maxInputTokens: number("RESEARCH_MAX_INPUT_TOKENS",200_000), maxOutputTokens: number("RESEARCH_MAX_OUTPUT_TOKENS",24_000),
    maxUsd: number("RESEARCH_MAX_USD",5,false), pilotUsd: number("RESEARCH_PILOT_USD",20,false),
    searchUsd: number("RESEARCH_SEARCH_USD",1,false), inputUsdPerMillion: number("RESEARCH_INPUT_USD_PER_MILLION",100,false),
    outputUsdPerMillion: number("RESEARCH_OUTPUT_USD_PER_MILLION",200,false) };
  return { missing: [...new Set(missing)], config: missing.length ? null : {
    ...limits, approval: env.RESEARCH_APPROVAL!, braveKey: env.RESEARCH_BRAVE_KEY!, openaiKey: env.RESEARCH_OPENAI_KEY!,
    model: env.RESEARCH_MODEL!, userAgent: env.RESEARCH_USER_AGENT!, retention: env.RESEARCH_RETENTION as ResearchConfig["retention"], searchStorage: true,
  } };
}
