import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { defineConfig } from 'vite';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: path.join(projectRoot, 'github-pages'),
  publicDir: path.join(projectRoot, 'public'),
  base: '/',
  css: { postcss: { plugins: [tailwindcss()] } },
  resolve: {
    alias: {
      'next/link': path.join(projectRoot, 'github-pages', 'next-link.tsx'),
      '@': projectRoot,
    },
  },
  plugins: [react()],
  build: {
    outDir: path.join(projectRoot, 'github-pages-dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.join(projectRoot, 'github-pages', 'index.html'),
        policy: path.join(projectRoot, 'github-pages', 'policy-aicreator', 'index.html'),
      },
    },
  },
});
