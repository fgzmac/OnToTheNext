import { describe, expect, it } from "vitest";
import { CATALOG, SUPPORTED_CITIES, supportedCity } from "./catalog";
describe("curated catalog boundaries", () => {
  it.each(SUPPORTED_CITIES)("has eight distinct source-backed %s experiences", city => {
    const places = CATALOG.filter(p => p.city === city);
    expect(places).toHaveLength(8);
    expect(new Set(places.map(p => p.id)).size).toBe(8);
    for (const p of places) {
      expect(new URL(p.url).protocol).toBe("https:");
      expect(p.checkedAt).toBe("2026-09-23");
      expect(p.interests.length).toBeGreaterThan(0);
    }
  });
  it.each(["Tokyo / Kyoto", "Greater Tokyo", "Japan", "Kyoto Station", "Osaka?", ""] )("does not silently map %s", value => { expect(supportedCity(value)).toBeNull(); });
  it("accepts only canonical city names with case/whitespace normalization", () => { expect(supportedCity(" tokyo ")).toBe("Tokyo"); expect(supportedCity("KYOTO")).toBe("Kyoto"); });
});
