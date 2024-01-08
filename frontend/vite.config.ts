import { UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

const config: UserConfig = {
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8000,
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          mapbox: ['react-map-gl', 'mapbox-gl'],
        },
      },
    },
  },
};

export default config;
