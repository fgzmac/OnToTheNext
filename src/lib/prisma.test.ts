import { expect, it, vi } from "vitest";
import { getPrismaClient } from "./prisma";

it("reuses one Prisma client and pool across production service calls", async () => {
  const state = globalThis as unknown as { prisma?: ReturnType<typeof getPrismaClient> };
  const previous = state.prisma;
  delete state.prisma;
  vi.stubEnv("NODE_ENV", "production");
  vi.stubEnv("DATABASE_URL", "postgresql://unused:unused@localhost:5433/unused");
  const clients: ReturnType<typeof getPrismaClient>[] = [];
  try {
    clients.push(getPrismaClient(), getPrismaClient());
    expect(clients[0] === clients[1]).toBe(true);
  } finally {
    for (const client of new Set(clients)) await client.$disconnect();
    state.prisma = previous;
    vi.unstubAllEnvs();
  }
});
