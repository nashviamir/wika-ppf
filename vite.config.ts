import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // "/" on a custom domain; "/<repo>/" on <user>.github.io (set via BASE_PATH in the deploy workflow)
  base: process.env.BASE_PATH || '/',
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
  ssr: {
    noExternal: [],
  },
});
