import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    // Integration suites share a verified disposable database.
    fileParallelism: false,
    include: [
      "src/**/*.test.ts",
      "tests/**/*.integration.test.ts",
    ],
    setupFiles: ["./tests/setup-env.ts"],
    testTimeout: 20_000,
    hookTimeout: 20_000,
  },
});
