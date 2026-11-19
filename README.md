# Coco Atelier website

Static site for coco-atelier.com, built with TanStack Start, React and Tailwind CSS.

## Development

```sh
npm install
npm run dev      # local dev server on http://localhost:8080
npm test         # run tests
npm run build    # pre-render every page into dist/client
```

## Deployment

Every push to `main` builds the site and publishes it to GitHub Pages
(see `.github/workflows/deploy.yml`).
