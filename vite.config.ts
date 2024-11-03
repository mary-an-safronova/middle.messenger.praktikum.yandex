import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
  },
  css: {
    postcss: {
      map: true,
    },
  },
});
