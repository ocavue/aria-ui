import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    './src/listbox/index.ts',
    './src/menu/index.ts',
    './src/overlay/index.ts',
    './src/popover/index.ts',
    './src/tooltip/index.ts',
  ],
  platform: 'browser',
  // TODO: resolver should work without explicitly setting to "tsc"
  dts: { build: true, incremental: true, resolver: 'tsc' },
})
