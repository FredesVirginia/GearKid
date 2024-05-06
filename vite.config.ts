import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    // chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router", "react-router-dom"],
          ui: ["@mui/material", "@mui/icons-material", "@mui/system"],
          dnd: [
            "@dnd-kit/core",
            "@dnd-kit/sortable",
            "@dnd-kit/utilities",
            "react-beautiful-dnd",
            "react-dnd",
            "react-dnd-html5-backend",
          ],
          i18n: ["i18next", "react-i18next"],
          forms: ["formik", "yup"],
          http: ["axios"],
          state: ["zustand", "@tanstack/react-query", "react-jwt"],
          utils: ["uuid", "ldrs", "animate.css"],
        },
      },
    },
  },
});
