import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Fixe le chemin de base à la racine
  base: '/',
  plugins: [
    react(),
    tailwindcss(), // Active Tailwind CSS v4
  ],
  server: {
    port: 5173,
  }
});