"use client";
import { useEffect, useRef, useState, useTransition } from "react";
import { manualActivityAction, itemDetailsAction, type DetailsFields } from "@/src/modules/itinerary/details-actions";
import { formatLocalTime } from "@/src/modules/itinerary/domain";
import type { ItemDetails } from "@/src/modules/itinerary/details-domain";
import type { EditPreview } from "@/src/modules/itinerary/details-service";
import type { SchedulingDay, TimelineItem } from "@/src/modules/itinerary/types";
type Day = SchedulingDay & { base: string | null };
const fresh = (): DetailsFields => ({ title: "", time: "", duration: "", flexibility: "FLEXIBLE", notes: "", locationLabel: "", referenceUrl: "" });
function draft(item: TimelineItem): DetailsFields {
  return { title: item.title, time: item.startMinute === null ? "" : formatLocalTime(item.startMinute), duration: item.durationMinutes?.toString() ?? "", flexibility: item.flexibility, notes: item.notes ?? "",
    ...(item.type === "ACTIVITY" ? { locationLabel: item.locationLabel ?? "", referenceUrl: item.referenceUrl ?? "" } : {}) };
}
function Fields({ value, set, activity, freeTime = false }: { value: DetailsFields; set: (v: DetailsFields) => void; activity: boolean; freeTime?: boolean }) {
  const change = (name: keyof DetailsFields, text: string) => set({ ...value, [name]: text });
  return <>
    <label>Item name<input name="title" value={value.title} onChange={e => change("title", e.target.value)} required maxLength={160} autoFocus /></label>
    <div className="grid grid-2">
      <label>Planned start — optional<input type="time" value={value.time} onChange={e => change("time", e.target.value)} /></label>
      <label>Duration in minutes{freeTime ? " — required" : " — optional"}<input type="number" min={1} max={2147483647} step={1} value={value.duration} onChange={e => change("duration", e.target.value)} required={freeTime} /></label>
      <label>Planning flexibility<select aria-label="Planning flexibility" value={value.flexibility} onChange={e => change("flexibility", e.target.value)}><option value="FLEXIBLE">Flexible</option><option value="FIXED">Fixed</option></select></label>
    </div>
    {activity ? <><label>Location / address — optional<input value={value.locationLabel ?? ""} onChange={e => change("locationLabel", e.target.value)} maxLength={300} /></label>
      <label>Reference URL — optional<input type="url" value={value.referenceUrl ?? ""} onChange={e => change("referenceUrl", e.target.value)} maxLength={2048} /></label>
      <p className="muted">Entered planning details are not provider-verified. A reference link does not establish that information is current.</p></> : null}
    <label>Item notes — optional<textarea aria-label="Item notes — optional" value={value.notes} onChange={e => change("notes", e.target.value)} maxLength={2000} rows={3} /></label>
    <p className="muted">Blank optional fields remain unknown, or clear a previously entered value.</p>
  </>;
}
function ErrorMessage({ text }: { text: string | null }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => { if (text) ref.current?.focus(); }, [text]);
  return text ? <p ref={ref} tabIndex={-1} role="alert" className="issue error">{text}</p> : null;
}
export function AddActivity({ tripId, days, token }: { tripId: string; days: Day[]; token: string }) {
  const [open, setOpen] = useState(false), [value, setValue] = useState(fresh), [dayId, setDayId] = useState("");
  const [request, setRequest] = useState(token), [error, setError] = useState<string | null>(null), [saved, setSaved] = useState<string | null>(null);
  const [pending, start] = useTransition(); const button = useRef<HTMLButtonElement>(null), focusCreated = useRef<string | null>(null);
  useEffect(() => { if (focusCreated.current && !pending) { document.getElementById("item-" + focusCreated.current)?.focus(); focusCreated.current = null; } }, [saved, pending]);
  const cancel = () => { setOpen(false); setError(null); requestAnimationFrame(() => button.current?.focus()); };
  return <section className="card stack item-details-editor" aria-label="Add your own activity">
    <div><button ref={button} type="button" onClick={() => { setValue(fresh()); setDayId(days[0]?.id ?? ""); setRequest(token); setError(null); setSaved(null); setOpen(true); }} disabled={open}>Add activity</button></div>
    {!open ? <p className="muted">Build your own plan on any Trip Day. No Discover recommendation is needed.</p> : <form aria-label="Add activity" className="stack" onSubmit={e => { e.preventDefault(); start(async () => { const r = await manualActivityAction({ tripId, dayId, token: request, fields: value }); if (!r.ok) setError(r.error.message); else { setOpen(false); setError(null); setSaved(r.data.id); focusCreated.current = r.data.id; } }); }}>
      <fieldset disabled={pending} className="stack details-fields"><legend>New manually entered Activity</legend>
        <label>Activity day<select aria-label="Activity day" value={dayId} onChange={e => setDayId(e.target.value)} required>{days.map(day => <option key={day.id} value={day.id}>{day.date} · {day.base ?? "Unassigned"}</option>)}</select></label>
        <Fields value={value} set={setValue} activity />
        <div className="row"><button>{pending ? "Saving…" : "Save activity"}</button><button type="button" className="secondary" onClick={cancel}>Cancel</button></div>
      </fieldset><ErrorMessage text={error} />
    </form>}
    {saved ? <p role="status">Activity added to your itinerary.</p> : null}
  </section>;
}
const labels: Record<keyof ItemDetails, string> = { title: "Item name", startMinute: "Planned start", durationMinutes: "Duration", flexibility: "Planning flexibility", notes: "Notes", locationLabel: "Location / address", referenceUrl: "Reference URL" };
function display(key: keyof ItemDetails, value: ItemDetails[keyof ItemDetails]) {
  if (key === "startMinute") return formatLocalTime(value as number | null);
  return value === null ? "Not entered" : key === "durationMinutes" ? value + " minutes" : String(value);
}
export function EditItem({ tripId, item }: { tripId: string; item: TimelineItem }) {
  const [open, setOpen] = useState(false), [value, setValue] = useState(() => draft(item)), [token, setToken] = useState(item.editToken);
  const [preview, setPreview] = useState<EditPreview | null>(null), [error, setError] = useState<string | null>(null), [message, setMessage] = useState<string | null>(null);
  const [pending, start] = useTransition(); const focusSaved = useRef(false); const button = useRef<HTMLButtonElement>(null), region = useRef<HTMLElement>(null);
  useEffect(() => { if (preview) region.current?.focus(); }, [preview]);
  useEffect(() => { if (focusSaved.current && !pending && !open) { document.getElementById("item-" + item.id)?.focus(); focusSaved.current = false; } }, [pending, open, item.id]);
  const cancel = () => { setOpen(false); setPreview(null); setError(null); setMessage("Edit cancelled. Your plan is unchanged."); requestAnimationFrame(() => button.current?.focus()); };
  const submit = () => start(async () => { const r = await itemDetailsAction({ tripId, itemId: item.id, token: preview?.token ?? token, fields: value, confirm: Boolean(preview) });
    if (!r.ok) setError(r.error.message); else if (r.data.preview) { setPreview(r.data.preview); setError(null); } else { setOpen(false); setPreview(null); setError(null); setMessage("Item details saved. Booking and progress are unchanged."); focusSaved.current = true; } });
  return <div className="item-details-editor stack">
    <div><button ref={button} type="button" className="secondary" aria-label={"Edit " + item.title} disabled={open} onClick={() => { setValue(draft(item)); setToken(item.editToken); setPreview(null); setError(null); setMessage(null); setOpen(true); }}>Edit</button></div>
    {open ? <form aria-label={"Edit " + item.title} className="stack" onSubmit={e => { e.preventDefault(); submit(); }}>
      {preview ? <section ref={region} tabIndex={-1} className="edit-preview stack" aria-label="Review item changes">
        <h5>Review item changes</h5><p>{preview.fixed ? "This item is Fixed. " : ""}{preview.booked ? "This item has a Booked reservation. " : ""}<strong>This changes your plan, not your booking.</strong></p>
        <dl className="edit-comparison">{(Object.keys(labels) as (keyof ItemDetails)[]).filter(key => preview.before[key] !== preview.after[key]).map(key => <div key={key}><dt>{labels[key]}</dt><dd>Before: {display(key, preview.before[key])}</dd><dd>After: {display(key, preview.after[key])}</dd></div>)}</dl>
        <div className="row"><button disabled={pending}>Confirm changes</button><button disabled={pending} type="button" className="secondary" onClick={() => setPreview(null)}>Back to edit</button><button disabled={pending} type="button" className="secondary" onClick={cancel}>Cancel edit</button></div>
      </section> : <fieldset disabled={pending} className="stack details-fields"><legend>Edit item details</legend><Fields value={value} set={setValue} activity={item.type === "ACTIVITY"} freeTime={item.type === "FREE_TIME"} />
        <p className="muted">Type stays unchanged. Use Move to change the Day or position.</p><div className="row"><button>{pending ? "Saving…" : "Save changes"}</button><button type="button" className="secondary" onClick={cancel}>Cancel edit</button></div></fieldset>}
      <ErrorMessage text={error} />
    </form> : null}
    {message ? <p role="status">{message}</p> : null}
  </div>;
}
