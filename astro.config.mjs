import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  site: "https://megheche.github.io",
  base: "/",
  devToolbar: { enabled: false },
});
