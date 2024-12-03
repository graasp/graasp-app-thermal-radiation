import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '',
  build: {
    outDir: 'build',
  },
  preview: {
    strictPort: true,
    port: parseInt(process.env.VITE_PORT, 10) || 4001,
  },
});
