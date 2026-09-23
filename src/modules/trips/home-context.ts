// Navigation state only; never used to authorize a Day or mutate business data.
export function homeContextQuery(view: unknown, day: unknown, home = false): string {
  if (view !== "day" && view !== "planning") return "";
  return new URLSearchParams({ [home ? "view" : "homeView"]: view,
    ...(typeof day === "string" && day ? { [home ? "day" : "homeDay"]: day } : {}) }).toString();
}
