import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  dts: {
    entry: "src/index.ts",
    compilerOptions: {
      composite: false,
    },
  },
})
