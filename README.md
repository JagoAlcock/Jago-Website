# Jago Alcock — Portfolio Website

A static personal portfolio site, built as plain HTML + JS so it can be
hosted for free on **GitHub Pages** (or any other static host) and edited
by changing one well-commented file.

Live site: https://jagoalcock.github.io/Jago-Website/

---

## Hosting on GitHub Pages

### Option A (recommended): automatic deploy with GitHub Actions

This repository includes a workflow that builds a production version of the site
and deploys it to GitHub Pages on every push to `main`.

1. Push this repo to GitHub.
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push any change to `main`. The workflow publishes the site.

> Why this is recommended: the source version of this site uses in-browser JSX
> compilation for simplicity, but the workflow publishes a faster production
> build (no Babel in the browser, React production builds).

### Option B: deploy from a branch (no build step)

1. Create a new public GitHub repository named exactly
   **`<your-username>.github.io`** (e.g. `jagoalcock.github.io`).
2. Upload the contents of this project to the repo (drag-and-drop on the
   web UI is fine — make sure `index.html` ends up at the repo root, not
   inside a sub-folder).
3. Go to **Settings → Pages**:
   - Source: *Deploy from a branch*
   - Branch: `main` / root
   - Save
4. Wait ~1 minute. The site is live at
   `https://<your-username>.github.io`.

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
   GitHub Pages reads this file automatically.
4. In **Settings → Pages → Custom domain**, enter your domain and
   tick **Enforce HTTPS** once the certificate is issued.

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
     n: '17',                         // display number
     title: 'Project Title',
     tag: 'CATEGORY',                 // small label (e.g. AEROSPACE)
     year: '2025',
     client: 'CLIENT / CONTEXT',      // top-of-card eyebrow
     image: 'images/my-project.jpg',  // hero image
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

---

## Project layout

```
├── index.html           # Home
├── about.html           # About me
├── resume.html          # Resume
├── documents.html       # Supporting documents
├── projects/            # 1 HTML file per portfolio project
│   ├── coaxial-rotor.html
│   ├── syos.html
│   └── …
├── hobbies/             # 1 HTML file per hobby
│   ├── canoe-polo.html
│   └── …
├── images/              # Photos used across the site
├── content.js           # ← ALL TEXT AND DATA LIVE HERE
├── shared.jsx           # Shared theme + nav + footer (rarely edited)
├── home.jsx             # Homepage rendering
├── about.jsx            # About-page rendering
├── resume.jsx           # Resume-page rendering
├── documents.jsx        # Supporting-docs rendering
├── project.jsx          # Project detail page template
├── hobby.jsx            # Hobby detail page template
└── CNAME                # Custom domain (optional)
```

---

## Editing in your browser, no installs needed

Press `.` (period) while viewing the repo on github.com — it opens a
full VS Code editor in your browser. Save commits straight from there.

For quick text edits on a phone, the pencil-icon GitHub editor is
fastest.

---

## Light / dark mode

The toggle in the top-right of the site switches between modes; the
visitor's choice persists across reloads (stored in their browser).
There is no setting to change here.

---

## Tweaks panel

When the site is opened in this design tool, a "Tweaks" panel appears
in the bottom-right that lets you change the accent colour and toggle
serif/sans headlines. These tweaks **don't appear on the live site for
your visitors** — they're only for previewing and tuning the design.
