import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // server and proxy added
  server: {
    port: 3000,
    proxy: {
      // insted of http:localhost/3000 when ever this is /api
      "/api": {
        changeOrigin: true,
        target: "http://localhost:6969",
      },
    },
  },
});
