# Jago Alcock — Personal Website

Source code for [jagoalcock.github.io/Jago-Website](https://jagoalcock.github.io/Jago-Website/) — a static portfolio site covering projects, work history, and background.

## Stack

- React (UMD, no bundler) with JSX compiled by Babel
- Static HTML — one file per page, no framework routing
- Custom Node 20+ build scripts (`scripts/build.mjs`)
- Deployed to GitHub Pages

## Getting started

```bash
npm install
npm run dev   # serves the repo root at http://localhost:3000
```

No build step needed for development — pages use in-browser Babel.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Dev server at localhost:3000 |
| `npm run build` | Compile JSX and emit production site to `./docs` |
| `npm run preview` | Build then serve `./docs` locally |
| `npm run check` | Validate image paths, slugs, and content integrity |
| `npm run clean` | Delete the `./docs` output directory |

## Editing content

All site content — bio, projects, work history, hobbies, documents — is defined in one file: [`content.js`](./content.js). Edit that file; the templates pick up the changes automatically.

To add a project: add an entry to the `PROJECTS` array in `content.js` and create `projects/<slug>.html` (copy any existing project page and rename it).

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml`, which runs `npm run check`, `npm run build`, and deploys `./docs` to GitHub Pages automatically.
