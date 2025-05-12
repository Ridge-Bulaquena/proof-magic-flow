
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Only use the componentTagger in development mode if it's available
    mode === 'development' && 
      (() => {
        try {
          const { componentTagger } = require('lovable-tagger');
          return componentTagger();
        } catch (e) {
          console.warn('lovable-tagger not found, continuing without it');
          return null;
        }
      })(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
