import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  site: "https://megheche.github.io",
  base: "/",
  integrations: [
    sitemap({
      // These static HTML pages live in public/ rather than Astro's page routes.
      customPages: [
        "https://megheche.github.io/en/100-women-ai-robotics-switzerland.html",
        "https://megheche.github.io/ar/100-women-ai-robotics-switzerland.html",
      ],
    }),
  ],
  devToolbar: { enabled: false },
});
