import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // GitHub Pages hosts your app at /testing/, so production builds need this base path.
  // In development, we use '/' to keep localhost working normally.
  base: mode === 'production' ? '/testing/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
}));
