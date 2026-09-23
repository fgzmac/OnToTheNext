import { describe, expect, it } from "vitest";
import { rankUnassignedRecommendations as rank, validateDiscoverInterests } from "./refinement";
import type { RankedCandidate, DecisionSignal } from "./refinement";

const candidate = (id: string, displayRank: number, interestTags: RankedCandidate["interestTags"] = []): RankedCandidate => ({ id, displayRank, interestTags, presentationBatch: null, decision: null });
const neutral = candidate("neutral", 1);
const architecture = candidate("architecture", 2, ["ARCHITECTURE_DESIGN"]);
const accepted: DecisionSignal = { outcome: "ACCEPTED", interestTags: ["ARCHITECTURE_DESIGN"] };
const denied: DecisionSignal = { outcome: "DENIED", interestTags: ["ARCHITECTURE_DESIGN"] };

describe("Discover refinement", () => {
  it("ranks with no interests or decisions", () => {
    expect(rank([architecture, neutral], [], []).map(item => item.id)).toEqual(["neutral", "architecture"]);
  });
  it("raises an explicit interest above a neutral candidate", () => {
    expect(rank([neutral, architecture], ["ARCHITECTURE_DESIGN"], [])[0].id).toBe("architecture");
  });
  it("raises candidates sharing an accepted category", () => {
    expect(rank([neutral, architecture], [], [accepted])[0].id).toBe("architecture");
  });
  it("weakly lowers a denied category even with an earlier base rank", () => {
    expect(rank([{ ...architecture, displayRank: 0 }, neutral], [], [denied])[0].id).toBe("neutral");
  });
  it("never bans a denied category", () => {
    expect(rank([architecture], [], [denied])).toEqual([architecture]);
  });
  it("explicit interests outweigh even repeated deny signals", () => {
    expect(rank([neutral, architecture], ["ARCHITECTURE_DESIGN"], Array(100).fill(denied))[0].id).toBe("architecture");
  });
  it("keeps explicit interests stronger than accumulated acceptance", () => {
    const food = candidate("food", 99, ["FOOD_DRINK"]);
    expect(rank([architecture, food], ["FOOD_DRINK"], Array(100).fill(accepted))[0].id).toBe("food");
  });
  it("resolves ties by display rank then ID independent of input order", () => {
    const items = [candidate("z", 1), candidate("b", 2), candidate("a", 1)];
    expect(rank(items, [], []).map(item => item.id)).toEqual(["a", "z", "b"]);
    expect(rank([...items].reverse(), [], [])).toEqual(rank(items, [], []));
  });
  it("excludes assigned or already decided candidates without mutating history", () => {
    const items = [{ ...architecture, presentationBatch: 1 }, { ...neutral, decision: "DENIED" }, candidate("new", 3)];
    const before = structuredClone(items);
    expect(rank(items, [], []).map(item => item.id)).toEqual(["new"]);
    expect(items).toEqual(before);
  });
  it("validates, deduplicates, and canonicalizes typed interests", () => {
    expect(validateDiscoverInterests(["FOOD_DRINK", "ARCHITECTURE_DESIGN", "FOOD_DRINK"])).toEqual(["ARCHITECTURE_DESIGN", "FOOD_DRINK"]);
  });
  it("rejects unknown or malformed interest updates", () => {
    for (const input of [null, "FOOD_DRINK", ["UNKNOWN"], [null], [1], {}]) expect(validateDiscoverInterests(input)).toBeNull();
  });
  it("accepts an optional or cleared empty list", () => {
    expect(validateDiscoverInterests([])).toEqual([]);
  });
});
