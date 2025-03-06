import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 5173, // Changed port
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 5173, // Changed port
    allowedHosts: ["portfolio-admin-1zrr.onrender.com"],
  },
});
