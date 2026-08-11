import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";

export default defineConfig({
  root: fileURLToPath(new URL("./github-pages", import.meta.url)),
  base: "/-OS/",
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [
    react(),
    {
      name: "github-pages-nojekyll",
      closeBundle() {
        writeFileSync(fileURLToPath(new URL("./docs/.nojekyll", import.meta.url)), "");
      },
    },
  ],
  build: {
    outDir: fileURLToPath(new URL("./docs", import.meta.url)),
    emptyOutDir: true,
    sourcemap: false,
  },
});
