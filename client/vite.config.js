import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],

  // ✅ Important for Render or any static hosting (fixes missing assets)
  base: "./",

  build: {
    outDir: "dist", // default for Vite, just making it explicit
  },
});
