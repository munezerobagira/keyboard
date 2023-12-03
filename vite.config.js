import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  server: {
    open: true,
    port: 5101,
  },
});
