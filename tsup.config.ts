import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  format: ['esm'], // ensure ESM
  dts: true,
  sourcemap: true,
  loader: {
    '.css': 'copy',
  },
});
