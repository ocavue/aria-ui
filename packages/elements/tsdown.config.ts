import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  platform: 'browser',
  // TODO: resolver should work without explicitly setting to "tsc"
  dts: { build: true, incremental: true, resolver: 'tsc' },
})
