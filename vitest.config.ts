
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",   // so React components can render
    globals: true,          // allows describe/it/expect without import
    setupFiles: "./src/setupTests.ts", //  setup
  },
});


//configures Vitest, the test runner 