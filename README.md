# megheche.github.io

Personal academic website for Mireille El Gheche, migrated from the legacy static HTML site to a Vite, React, and Tailwind CSS application.

## Development

Install dependencies:

```sh
npm install
```

Start the local development server:

```sh
npm run dev
```

Create a production build:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

## GitHub Pages deployment

This project is now a Vite app. The publishable website is generated into `dist/` by `npm run build`; deploy that generated directory rather than the raw React source files.

For GitHub Pages, use a workflow that checks out the repository, runs `npm ci`, runs `npm run build`, and uploads `dist/` as the Pages artifact. The compatibility redirect files in `public/` are copied into `dist/` automatically so old URLs such as `/Publications.html` continue to work.
