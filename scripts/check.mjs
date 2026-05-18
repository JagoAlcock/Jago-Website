// Content and asset validator — run with: npm run check
// Exits non-zero only on errors; warnings are printed but do not block the build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ── Load content.js by extracting the relevant globals ───────────────────
const contentSrc = fs.readFileSync(path.join(ROOT, 'content.js'), 'utf8');

// Quick-and-dirty extraction: evaluate the file in a sandboxed scope.
// content.js assigns to window, so we stub that out.
const sandbox = { window: {} };
const fn = new Function('window', 'Object', contentSrc);
fn(sandbox.window, Object);
const { PROJECTS = [], HOBBIES = [], SITE_INFO = {} } = sandbox.window;

let errors = 0;
let warnings = 0;

function err(msg)  { console.error(`  ✖  ${msg}`); errors++; }
function warn(msg) { console.warn(`  ⚠  ${msg}`);  warnings++; }
function ok(msg)   { console.log(`  ✓  ${msg}`); }

console.log('\nChecking content and assets…\n');

// ── 1. siteUrl must be set ────────────────────────────────────────────────
if (SITE_INFO.siteUrl) {
  ok(`siteUrl is set: ${SITE_INFO.siteUrl}`);
} else {
  err('SITE_INFO.siteUrl is empty — sitemap.xml will not be generated');
}

// ── 2. No duplicate slugs ─────────────────────────────────────────────────
const projectSlugs = PROJECTS.map(p => p.slug);
const hobbySlugs   = HOBBIES.map(h => h.slug);

const dupProjects = projectSlugs.filter((s, i) => projectSlugs.indexOf(s) !== i);
const dupHobbies  = hobbySlugs.filter((s, i) => hobbySlugs.indexOf(s) !== i);
if (dupProjects.length) err(`Duplicate project slugs: ${dupProjects.join(', ')}`);
if (dupHobbies.length)  err(`Duplicate hobby slugs: ${dupHobbies.join(', ')}`);
if (!dupProjects.length && !dupHobbies.length) ok('No duplicate slugs');

// ── 3. Every media ref exists on disk ────────────────────────────────────
function resolveMediaSrc(entry) {
  return typeof entry === 'string' ? entry : (entry && entry.src) || null;
}

const allMediaRefs = [
  ...PROJECTS.flatMap(p => [p.image, ...(p.gallery || []).map(resolveMediaSrc)]),
  ...HOBBIES.flatMap(h => [h.image, ...(h.gallery || []).map(resolveMediaSrc)]),
  ...PROJECTS.flatMap(p => (p.gallery || []).filter(e => e && e.poster).map(e => e.poster)),
  ...HOBBIES.flatMap(h => (h.gallery || []).filter(e => e && e.poster).map(e => e.poster)),
].filter(p => p && !p.startsWith('http'));

let missingMedia = 0;
for (const mediaPath of allMediaRefs) {
  const abs = path.join(ROOT, mediaPath);
  if (!fs.existsSync(abs)) {
    err(`Missing media file: ${mediaPath}`);
    missingMedia++;
  }
}
if (!missingMedia) ok(`All ${allMediaRefs.length} media references resolve to existing files`);

// ── 4. Every project slug has a matching HTML file ────────────────────────
let missingProjectPages = 0;
for (const p of PROJECTS) {
  const htmlPath = path.join(ROOT, 'projects', `${p.slug}.html`);
  if (!fs.existsSync(htmlPath)) {
    err(`Missing project page: projects/${p.slug}.html`);
    missingProjectPages++;
  }
}
// And vice versa — no orphaned HTML files without a slug
const projectHtmlFiles = fs.readdirSync(path.join(ROOT, 'projects'))
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace('.html', ''));
for (const slug of projectHtmlFiles) {
  if (!PROJECTS.find(p => p.slug === slug)) {
    warn(`Orphaned project page projects/${slug}.html has no matching entry in PROJECTS`);
  }
}
if (!missingProjectPages) ok(`All ${PROJECTS.length} project slugs have matching HTML pages`);

// ── 5. Every hobby slug has a matching HTML file ──────────────────────────
let missingHobbyPages = 0;
for (const h of HOBBIES) {
  const htmlPath = path.join(ROOT, 'hobbies', `${h.slug}.html`);
  if (!fs.existsSync(htmlPath)) {
    err(`Missing hobby page: hobbies/${h.slug}.html`);
    missingHobbyPages++;
  }
}
const hobbyHtmlFiles = fs.readdirSync(path.join(ROOT, 'hobbies'))
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace('.html', ''));
for (const slug of hobbyHtmlFiles) {
  if (!HOBBIES.find(h => h.slug === slug)) {
    warn(`Orphaned hobby page hobbies/${slug}.html has no matching entry in HOBBIES`);
  }
}
if (!missingHobbyPages) ok(`All ${HOBBIES.length} hobby slugs have matching HTML pages`);

// ── 6. Placeholder PDF warnings ───────────────────────────────────────────
const placeholderPdfs = [];
for (const p of PROJECTS) {
  if (p.pdf === '#') placeholderPdfs.push(`projects/${p.slug} pdf`);
}
const { RECOMMENDATIONS = [], OTHER_DOCS = [] } = sandbox.window;
for (const r of RECOMMENDATIONS) {
  if (r.pdf === '#') placeholderPdfs.push(`recommendation from ${r.name}`);
}
for (const d of OTHER_DOCS) {
  if (d.url === '#') placeholderPdfs.push(`other doc "${d.title}"`);
}
if (placeholderPdfs.length) {
  for (const p of placeholderPdfs) warn(`Placeholder '#' URL for: ${p}`);
} else {
  ok('No placeholder "#" URLs');
}

// ── Summary ───────────────────────────────────────────────────────────────
console.log('');
if (errors === 0 && warnings === 0) {
  console.log('All checks passed.\n');
} else {
  if (warnings) console.warn(`${warnings} warning(s)`);
  if (errors)   console.error(`${errors} error(s)\n`);
}

if (errors > 0) process.exit(1);
