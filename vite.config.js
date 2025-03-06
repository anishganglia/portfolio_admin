import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allow external access
    port: process.env.PORT || 4173, // Use Render's assigned port or default to 4173
    strictPort: true
  },
  preview: {
    host: "0.0.0.0", // Ensure preview mode is accessible externally
    port: process.env.PORT || 4173, // Same as above
    allowedHosts: ["portfolio-admin-1zrr.onrender.com"], // ✅ Add your Render domain here
  }
});
