# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm install` — install Babel devDependencies (first-time setup; run `npm ci` in CI).
- `npm run build` — runs `scripts/build.mjs`. Cleans `./docs`, copies static assets,
  transforms each `.html` for production (swaps dev React UMDs for prod, removes
  in-browser Babel, rewrites `.jsx` → `.js`, adds `defer`, injects per-page SEO tags),
  compiles all `.jsx` files via `@babel/core`'s programmatic API, and writes
  `sitemap.xml` + `robots.txt` if `SITE_INFO.siteUrl` is set in `content.js`.
- `npm run check` — runs `scripts/check.mjs`: validates that all image paths referenced
  in `content.js` exist on disk, every project/hobby slug has a matching HTML page and
  vice versa, no duplicate slugs, and warns about `pdf: '#'` placeholders.
- `npm run dev` — starts a local HTTP server (`scripts/serve.mjs`) at port 3000 serving
  the repo root. Source HTML pages use in-browser Babel; no build step needed.
- `npm run preview` — builds then serves `./docs` at port 3000 (production preview).
- `npm run clean` — deletes the `./docs` output folder.
- There are **no tests** and **no linter** configured.

## Architecture

### Dual-mode JSX

The same `.jsx` source files are used two ways:
- **Dev / source-in-repo**: each HTML page loads React + ReactDOM + `@babel/standalone`
  from CDN and includes `<script type="text/babel" src="….jsx">` tags. No build step
  required — just open the HTML file (or `npm run dev`).
- **Production**: `scripts/build.mjs` precompiles every `.jsx` to `.js` into `./docs`
  using `@babel/core`'s `transformFileAsync` (no subprocess / npx). It rewrites each
  HTML file to load the React **production** UMD bundles, drops `@babel/standalone`,
  changes `.jsx` references to `.js`, and adds `defer`. There is no bundler — output
  files are 1:1 with sources.

### Content vs. templates

- `content.js` is the **single source of truth** for all page text/data. It defines
  globals (`SITE_INFO`, `INTRO_*`, `ABOUT_*`, `PROJECTS`, `HOBBIES`, `RESUME`,
  `RECOMMENDATIONS`, `OTHER_DOCS`) loaded into `window` by a plain `<script>` tag
  before the JSX runs.
- The seven JSX files are **templates** that read those globals:
  - `shared.jsx` — theme tokens, nav, footer, light/dark toggle, Tweaks panel,
    `renderAccented` helper for `{accent}…{/accent}` spans, ordinal helpers,
    `useSeo` hook, `contentLoaded` / `ContentMissing` error guard.
  - `home.jsx`, `about.jsx`, `resume.jsx`, `documents.jsx` — top-level pages.
  - `project.jsx`, `hobby.jsx` — detail page templates.
- **Slug-from-filename convention**: detail pages in `projects/` and `hobbies/` derive
  their slug from the HTML filename and look up the matching entry in `PROJECTS` /
  `HOBBIES`. Adding a new project means a new entry in `content.js` **and** a copy of
  any existing file in `projects/` renamed to `<slug>.html`.

### Theme

`theme(mode, accentHex, headlineFont)` in `shared.jsx` returns the `t` token object
used by every component. Key fields:

- `t.head` — the resolved headline font-family string (serif or sans, based on
  `headlineFont`). Use this everywhere instead of recomputing per-component.
- `t.serif`, `t.sans`, `t.mono` — the three font stacks.
- `t.bg`, `t.bg2`, `t.line`, `t.line2`, `t.text`, `t.dim`, `t.faint`, `t.accent` —
  colour tokens for the current mode.

`usePageShell()` calls `theme(viewerMode, accentHex, tweaks.headlineFont)` so `t.head`
is always current. Components should only receive `t` — not a separate `headlineFont`
prop.

### Tweaks panel (editor-only)

`shared.jsx` embeds a `TWEAKS` object between special markers:

```
/*EDITMODE-BEGIN*/{ "mode": "...", "accent": "...", "headlineFont": "..." }/*EDITMODE-END*/
```

The host design tool rewrites this block in place. Preserve the markers — don't
reformat or move them. The in-page Tweaks panel writes to `localStorage` only; it
does not persist to disk.

The panel is hidden in production via a build-time string replacement: `build.mjs`
changes the sentinel `const SHOW_TWEAKS_PANEL = true; // PROD: false` to `false` in
the compiled `shared.js`. The light/dark toggle remains visible to all visitors.

### Per-page SEO injection

`scripts/build.mjs` loads `content.js` in a sandbox (`new Function`) and calls
`buildPageMeta(relPath, content)` for each HTML file. This injects per-page `<title>`,
`<meta name="description">`, Open Graph, Twitter Card, canonical link, and favicon
`<link>` directly into the production HTML — no client-side meta manipulation needed
on first load. The client-side `useSeo(opts, deps)` hook in `shared.jsx` supplements
this for client-navigations in dev mode.

### Content guard

Each page's `ReactDOM.createRoot(...).render(...)` call is wrapped with `contentLoaded`:

```js
ReactDOM.createRoot(document.getElementById('root')).render(
  contentLoaded(['SITE_INFO', 'PROJECTS'])
    ? <App />
    : <ContentMissing />
);
```

If `content.js` fails to load, visitors see a clear error instead of a JS crash.

### SEO emission (sitemap + robots)

`scripts/build.mjs` reads `SITE_INFO.siteUrl` from `content.js` to emit
`sitemap.xml` and `robots.txt` into `./docs`. If `siteUrl` is empty, neither file
is written.

### Deployment

`.github/workflows/pages.yml` is the **only** deploy workflow: it runs `npm ci`,
`npm run check`, and `npm run build` on push to `main`, then deploys `./docs` to
GitHub Pages. The legacy `static.yml` workflow (which deployed the raw repo root)
has been deleted.
