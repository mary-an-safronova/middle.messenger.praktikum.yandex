/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  css: {
    postcss: {
      map: true,
    },
  },
});
