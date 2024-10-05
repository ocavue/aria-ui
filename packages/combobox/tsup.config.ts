import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/elements.ts"],
  format: "esm",
  dts: {
    entry: ["src/index.ts", "src/elements.ts"],
    compilerOptions: {
      composite: false,
    },
  },
})
