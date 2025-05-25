import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://10.0.70.208:3001',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3005,
  },
});
