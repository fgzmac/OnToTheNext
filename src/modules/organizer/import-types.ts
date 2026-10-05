export const IMPORT_LIMITS = { characters: 120_000, lines: 3_000, items: 400, reviewCharacters: 1_500_000 } as const;
export type SourceRole = "UNKNOWN" | "USER" | "ASSISTANT" | "OWNER_CORRECTION";
export type Evidence = { start: number; end: number; role: SourceRole; basis?: string };
export type ImportSource = {
  version: 1; id: string; document: string; section: string; start: number; end: number;
  parents: string[]; role: SourceRole; fields: Record<string, Evidence>;
  questions: string[]; timing: { text: string; role: string; start: number }[];
  corrections?: Record<string, { previous: string; value: string }>;
};
export function documentIdentity(text: string) {
  // Stable extraction identity, not an authentication or deduplication security boundary.
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(16);
}
