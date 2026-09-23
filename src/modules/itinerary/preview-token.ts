import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { MoveDirection } from "./types";

// Prototype is one server process. Restart invalidates outstanding previews safely.
const globals = globalThis as unknown as { itineraryPreviewKey?: Buffer };
const key = globals.itineraryPreviewKey ??= randomBytes(32);
export interface PreviewToken {
  tripId: string; itemId: string; targetDayId: string; direction: MoveDirection | null;
  fingerprint: string; expires: number;
}
export function fingerprint(value: unknown): string { return createHash("sha256").update(JSON.stringify(value)).digest("hex"); }
export function signPreview(value: Omit<PreviewToken, "expires">): string {
  const body = Buffer.from(JSON.stringify({ ...value, expires: Date.now() + 30 * 60_000 })).toString("base64url");
  return body + "." + createHmac("sha256", key).update(body).digest("base64url");
}
export function readPreview(token: string): PreviewToken | null {
  try {
    if (token.length > 4096) return null;
    const [body, signature, extra] = token.split(".");
    if (extra || !body || !signature) return null;
    const expected = createHmac("sha256", key).update(body).digest();
    const supplied = Buffer.from(signature, "base64url");
    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return null;
    const value = JSON.parse(Buffer.from(body, "base64url").toString()) as PreviewToken;
    return value.expires > Date.now() ? value : null;
  } catch { return null; }
}
