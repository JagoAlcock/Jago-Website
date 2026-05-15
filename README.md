# Jago Alcock — Portfolio Website

A static personal portfolio site, built as plain HTML + JS so it can be
hosted for free on **GitHub Pages** (or any other static host) and edited
by changing one well-commented file.

Live site: https://jagoalcock.github.io/Jago-Website/

---

## Editing content

**All content lives in one file: [`content.js`](./content.js).**

Open it in any text editor — or, easier, open it directly on GitHub
(click the file, then the pencil icon). Commit your changes and the
site updates in ~30 seconds.

The file is split into seven numbered, commented sections:

| Section | What's in it |
|---|---|
| `1. SITE_INFO` | Name, email, phone, LinkedIn, footer text |
| `2. INTRO_*` | Homepage hero text and stats |
| `3. ABOUT_*` | About-page heading and story paragraphs |
| `4. PROJECTS` | Every portfolio project |
| `5. HOBBIES` | Every hobby on the About page |
| `6. RESUME` | Jobs, skills, achievements, referees |
| `7. DOCS` | Recommendations and supporting PDFs |

### Common tasks

#### Change a phone number, email, or piece of body text
Edit the field in `content.js`. Done.

#### Add a new project

1. **Add the entry to `PROJECTS`** in `content.js`. Copy any existing
   project block as a template and edit the fields:
   ```js
   {
     slug: 'my-new-project',          // becomes projects/my-new-project.html
     title: 'Project Title',          // order in PROJECTS sets the /01, /02 … badge
     tag: 'CATEGORY',                 // small label (e.g. AEROSPACE)
     year: '2025',
     client: 'CLIENT / CONTEXT',      // top-of-card eyebrow
     image: 'images/my-project.jpg',  // hero image (target <250 KB — see Images below)
     summary: 'One-line summary.',
     intro: 'Opening paragraph on the detail page.',
     body: ['First paragraph…', 'Second paragraph…'],
     specs: [['Discipline', 'Mechanical'], ['Year', '2025']],
     gallery: [],                     // optional extra images
     pdf: '',                         // optional PDF download URL
   },
   ```
2. **Add the project image** into the `images/` folder and reference
   its path in the `image` field.
3. **Add the detail page** — copy any file in `projects/` (e.g.
   `projects/coaxial-rotor.html`), rename it to match your new slug
   (e.g. `projects/my-new-project.html`). You don't need to edit
   anything inside the file — the slug is taken from the filename.
4. Commit. The new project appears on the homepage and gets its own
   detail page automatically.

#### Add a new hobby
Same pattern as projects, but edit `HOBBIES` in `content.js` and copy
a file in the `hobbies/` folder.

#### Reorder projects or hobbies
Drag the entries up or down inside the `PROJECTS` / `HOBBIES` array in
`content.js`. The order in the file is the order on the site.

#### Remove a project or hobby
1. Delete its entry from `PROJECTS` / `HOBBIES` in `content.js`.
2. Delete the matching file from `projects/` or `hobbies/`.

#### Add a recommendation or supporting PDF
Edit `RECOMMENDATIONS` or `OTHER_DOCS` in `content.js`.

#### Replace the resume PDF
Upload your new PDF somewhere it can be downloaded (Google Drive,
Dropbox shared link, your own GitHub repo, etc), and paste the URL
into the `pdf` field of the `RESUME` object in `content.js`.

#### Images
Keep images under **250 KB** each. The free tool
[squoosh.app](https://squoosh.app) converts and compresses images in
your browser with no install. Export as WebP at ~80% quality, max
1600 px wide.

---

## Hosting on GitHub Pages

### Automatic deploy with GitHub Actions (recommended)

This repository includes a workflow that builds a production version of the site
and deploys it to GitHub Pages on every push to `main`.

1. Push this repo to GitHub.
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push any change to `main`. The workflow publishes the site.

> The source version uses in-browser JSX compilation for simplicity, but the
> workflow publishes a faster production build (no Babel in the browser, React
> production bundles, per-page SEO meta tags injected at build time).

### Custom domain (optional)

1. Buy a domain (Namecheap, Porkbun, etc — usually ~$15/yr).
2. In your DNS provider, add four `A` records pointing the apex domain
   (`yourdomain.com`) to GitHub's IPs:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   …and a `CNAME` record pointing `www` to `<your-username>.github.io`.
3. Edit the `CNAME` file at the root of this project and replace the
   placeholder with your domain (one line, e.g. `jagoalcock.com`).
4. In `content.js`, update `SITE_INFO.siteUrl` to your new domain.
5. In **Settings → Pages → Custom domain**, enter your domain and
   tick **Enforce HTTPS** once the certificate is issued.

---

## Developer setup

For anyone forking or modifying the codebase:

```bash
# Install build dependencies (Babel)
npm install

# Validate content + images before building
npm run check

# Build production site into ./docs
npm run build

# Serve the source files with a local HTTP server (dev mode, no build)
npm run dev
# …then open http://localhost:3000

# Build then serve the production output
npm run preview
# …then open http://localhost:3000
```

**Node 20+** is required (see `.nvmrc`).

### How the build works

`scripts/build.mjs` does four things:

1. Copies static assets (`images/`, `uploads/`, `documents/`) verbatim into `docs/`.
2. Transforms each HTML file: swaps dev React CDN scripts for production bundles,
   removes `@babel/standalone`, rewrites `.jsx` → `.js` references, adds `defer`,
   and injects per-page `<title>`, `<meta>`, Open Graph, and Twitter Card tags.
3. Compiles every `.jsx` to `.js` using `@babel/core` programmatically.
4. Emits `sitemap.xml` and `robots.txt` when `SITE_INFO.siteUrl` is configured.

### Dual-mode JSX

The same `.jsx` source files work two ways without any configuration:

- **Dev**: open any `.html` directly in a browser. It loads React +
  `@babel/standalone` from CDN and compiles the JSX on the fly.
- **Prod**: `npm run build` pre-compiles everything and rewrites the HTML.
  Visitors get no Babel overhead.

---

## Editing in your browser, no installs needed

Press `.` (period) while viewing the repo on github.com — it opens a
full VS Code editor in your browser. Save commits straight from there.

For quick text edits on a phone, the pencil-icon GitHub editor is fastest.

---

## Light / dark mode

The toggle in the top-right switches between modes; the visitor's
choice persists across reloads (stored in their browser).

---

## Tweaks panel

When the site is opened in this design tool, a "Tweaks" panel appears
in the bottom-right to change the accent colour and toggle serif/sans
headlines. The panel is **stripped from the production build** and is
invisible to visitors.
