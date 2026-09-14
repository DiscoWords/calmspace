# Calmspace

Calmspace is a local-first personal productivity web app for tasks, notes, planning, areas, search and lightweight focus statistics.

## Stack

- React + TypeScript + Vite
- Framer Motion
- Lucide React
- date-fns
- vite-plugin-pwa
- localStorage persistence with a versioned schema

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The app uses `base: './'`, so the generated `dist/` directory is suitable for GitHub Pages static hosting.

## GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`. Push the repository to GitHub, enable Pages with **GitHub Actions** as the source, and the workflow will build and publish `dist/`.

## Data & privacy

There is no backend, authentication, analytics, or external data store. User content remains in the browser's local storage unless exported explicitly as JSON.
