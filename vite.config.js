import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["fabric", "@imgly/background-removal"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("fabric")) return "vendor-fabric";
            if (id.includes("@imgly")) return "vendor-imgly";
            return "vendor"; // Let Vite handle react splitting naturally
          }
        },
      },
    },
  },
});
