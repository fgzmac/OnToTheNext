import { validDate } from "../reservations/domain";
const months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
export const monthPattern = "(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\\.?";
export function dateIn(text: string, year?: number) {
  const iso = text.match(/\b\d{4}-\d{2}-\d{2}\b/);
  if (iso) return { raw: iso[0], value: validDate(iso[0]) ? iso[0] : "", issue: validDate(iso[0]) ? "" : "Invalid calendar date; correct the source date." };
  const m = text.match(new RegExp(`\\b(${monthPattern})\\s+(\\d{1,2})(?:,?\\s+(\\d{4}))?`, "i"));
  if (m) {
    const y = m[3] ? Number(m[3]) : year;
    const value = y ? `${y}-${String(months.indexOf(m[1].slice(0,3).toLowerCase())+1).padStart(2,"0")}-${m[2].padStart(2,"0")}` : "";
    return { raw: m[0], value: value && validDate(value) ? value : "", issue: !y ? "Supply the year for this date." : !validDate(value) ? "Invalid calendar date; correct the source date." : "" };
  }
  return { raw: "", value: "", issue: /\b\d{1,2}\/\d{1,2}\b/.test(text) ? "Numeric date is ambiguous; confirm its date and year." : "" };
}
export function appointment(text: string) {
  if (/\b(open(?:s|ing)?|clos(?:es|ing|ed)|last (?:entry|admission)|hours|deadline|release|drawing|cancellation|published|until)\b/i.test(text)) return "";
  const m = text.match(/\b(\d{1,2})(?::([0-5]\d))?\s*(a\.?m\.?|p\.?m\.?)\b/i);
  if (m && Number(m[1]) >= 1 && Number(m[1]) <= 12) return `${String(Number(m[1])%12 + (/^p/i.test(m[3])?12:0)).padStart(2,"0")}:${m[2]||"00"}`;
  return text.match(/\b([01]?\d|2[0-3]):([0-5]\d)\b/)?.[0].padStart(5,"0") ?? "";
}

export function rangeIssue(text:string, year?:number) {
  const m=text.match(new RegExp(`(${monthPattern})\\s+(\\d{1,2})\\s*[–-]\\s*(?:(${monthPattern})\\s+)?(\\d{1,2})(?:,?\\s+(\\d{4}))?`,"i"));
  if(!m)return "";
  const y=m[5]?Number(m[5]):year;
  if(!y)return "Supply the year for this date range.";
  const first=dateIn(`${m[1]} ${m[2]}, ${y}`).value,last=dateIn(`${m[3]||m[1]} ${m[4]}, ${y}`).value;
  if(!first||!last)return "Invalid calendar date in range; preserve and correct the supplied range.";
  return last<first?"Date range ends before it starts; confirm the intended year or order.":"";
}
