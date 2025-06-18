import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["fabric", "@imgly/background-removal"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://admin.sigmaagencyjo.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
      },
      "/bg": {
        target: "https://3rabapp.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bg/, "/apps"),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("fabric")) return "vendor-fabric";
            if (id.includes("@imgly")) return "vendor-imgly";
            return "vendor";
          }
        },
      },
    },
  },
});
