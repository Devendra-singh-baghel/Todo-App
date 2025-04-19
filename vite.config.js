import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // ✅ super important
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
