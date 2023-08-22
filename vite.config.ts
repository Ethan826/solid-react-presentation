import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/data": "https://beta.aviationweather.gov/cgi-bin",
    },
  },
  plugins: [react()],
});
