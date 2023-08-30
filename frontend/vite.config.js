import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8000,
  },
  build: {
    chunkSizeWarningLimit: 1500, // Adjust the value as needed
    rollupOptions: {
      output: {
        manualChunks: {
          mapbox: ['react-map-gl', 'mapbox-gl'],
          // customComponents: ['CustomMarker'], // Corrected the component name here
        },
      },
    },
  },
});
