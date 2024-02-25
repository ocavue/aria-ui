import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  // dts: true,
  format: "esm",
  dts: {
    entry: "src/index.ts",
    compilerOptions: { composite: false },
  },
})
