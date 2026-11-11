# Mireille El Gheche — personal website

An Astro static website adapted from the supplied personal-website template. It uses Mireille's blue palette with a persistent light/dark preference. The template's Projects section is now Blog.

## Development

Use Node.js 22.23.4 or later, then run:

```sh
npm ci
npm run dev
```

The local preview runs at the URL printed by Astro (normally `http://localhost:4321`).

```sh
npm run build
npm run lint
npm run preview
```

Astro generates the publishable static website in `dist/`. The existing GitHub Pages workflow builds and deploys this directory.

## Content

- `src/data/about.json`: profile, portrait, social links, and research introduction.
- `src/data/positions.json` and `education.json`: the About timelines.
- `src/data/publications.json`: all publication groups and resource links. The template provides search, year sorting, and pagination.
- `src/data/featured.json`: the featured research carousel.
- `src/data/courseChapters.json`: Language Models chapter summaries.
- `src/data/blogPosts.json`: Blog entries, recordings, images, and slide links.
- `src/data/contact.json`: contact details.

The page sections live in `src/sections/`. The home page includes the blog cards and filters through `src/components/BlogIndex.astro`, with a shortcut at `/#home/blog`. Individual posts open at `/#blog/<entry-id>` and return to the home-page blog list. Existing `#blog`, `#publications`, and `#teaching` links continue to work, alongside the template's `#research` and `#courses` URLs.

The light/dark colors are declared in `src/global.css`. The `theme` preference in local storage is preserved from the previous website.

Static articles, PDFs, and images live in `public/`. The Oregano font and its license are in `public/assets/fonts/`.
