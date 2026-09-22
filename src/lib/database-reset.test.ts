import { describe, expect, it, vi } from "vitest";
import { RESET_BLOCKED_MESSAGE, runVerifiedReset, verifyResetTarget } from "./database-reset";

const connection = (host: string, user: string, database: string) =>
  `postgresql://${user}:never-log-this@${host}:5433/${database}?schema=public`;

describe("database reset identity", () => {
  it.each([
    ["localhost", "ontothenext"],
    ["127.0.0.1", "ontothenext_test"],
    ["localhost", "ontothenext_verify_example"],
  ])("allows %s and %s", (host, database) => {
    expect(verifyResetTarget(connection(host, "ontothenext", database))).toEqual({
      host, user: "ontothenext", database,
    });
  });

  it.each([
    ["Options database", connection("localhost", "ontothenext", "optionsapp")],
    ["Options user", connection("localhost", "optionsapp", "ontothenext")],
    ["remote host", connection("database.example.com", "ontothenext", "ontothenext")],
    ["unknown database", connection("localhost", "ontothenext", "other")],
    ["malformed URL", "not a database URL"],
    ["missing URL", undefined],
    ["wrong protocol", connection("localhost", "ontothenext", "ontothenext").replace("postgresql:", "https:")],
    ["empty verification suffix", connection("localhost", "ontothenext", "ontothenext_verify_")],
    ["hostname suffix", connection("localhost.example.com", "ontothenext", "ontothenext")],
    ["malformed percent encoding", connection("localhost", "%ZZ", "ontothenext")],
    ["encoded database separator", connection("localhost", "ontothenext", "ontothenext%2Foptionsapp")],
    ["host override", connection("localhost", "ontothenext", "ontothenext") + "&host=remote.example.com"],
    ["user override", connection("localhost", "ontothenext", "ontothenext") + "&user=optionsapp"],
    ["database override", connection("localhost", "ontothenext", "ontothenext") + "&dbname=optionsapp"],
    ["fragment", connection("localhost", "ontothenext", "ontothenext") + "#ignored"],
  ])("blocks %s without leaking credentials", (_label, url) => {
    expect(() => verifyResetTarget(url)).toThrow(RESET_BLOCKED_MESSAGE);
    try { verifyResetTarget(url); } catch (error) {
      expect(String(error)).not.toContain("never-log-this");
    }
  });
});

describe("reset command ordering", () => {
  it("never invokes Prisma for a blocked target", () => {
    const run = vi.fn(() => 0);
    expect(() => runVerifiedReset(connection("localhost", "ontothenext", "optionsapp"), run))
      .toThrow(RESET_BLOCKED_MESSAGE);
    expect(run).not.toHaveBeenCalled();
  });
  it("resets then seeds after validation using an inert runner", () => {
    const run = vi.fn(() => 0);
    expect(runVerifiedReset(connection("localhost", "ontothenext", "ontothenext_test"), run)).toBe(0);
    expect(run.mock.calls).toEqual([[["migrate", "reset", "--force"]], [["db", "seed"]]]);
  });
  it("does not seed if reset fails", () => {
    const run = vi.fn(() => 7);
    expect(runVerifiedReset(connection("localhost", "ontothenext", "ontothenext_test"), run)).toBe(7);
    expect(run).toHaveBeenCalledTimes(1);
  });
  it("propagates seed failure", () => {
    const run = vi.fn().mockReturnValueOnce(0).mockReturnValueOnce(9);
    expect(runVerifiedReset(connection("localhost", "ontothenext", "ontothenext_test"), run)).toBe(9);
  });
});