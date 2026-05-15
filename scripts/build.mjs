import * as babel from '@babel/core';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const OUT = path.resolve(ROOT, 'docs');

// ── Helpers ─────────────────────────────────────────────────────────────

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

function copyDir(srcDir, destDir) {
  ensureDir(destDir);
  for (const ent of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const src = path.join(srcDir, ent.name);
    const dest = path.join(destDir, ent.name);
    if (ent.isDirectory()) copyDir(src, dest);
    else if (ent.isFile()) copyFile(src, dest);
  }
}

function listFilesRecursive(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...listFilesRecursive(p));
    else if (ent.isFile()) out.push(p);
  }
  return out;
}

// ── Content parsing ───────────────────────────────────────────────────────
// Load PROJECTS, HOBBIES, and SITE_INFO from content.js for per-page SEO.

function loadContent() {
  const src = fs.readFileSync(path.join(ROOT, 'content.js'), 'utf8');
  const sandbox = { window: {} };
  try {
    const fn = new Function('window', 'Object', src);
    fn(sandbox.window, Object);
  } catch (err) {
    console.warn('[build] Warning: could not evaluate content.js —', err.message);
  }
  return sandbox.window;
}

// ── Per-page SEO meta ─────────────────────────────────────────────────────

function buildPageMeta(relPath, content) {
  const { PROJECTS = [], HOBBIES = [], SITE_INFO = {} } = content;
  const siteUrl = SITE_INFO.siteUrl || '';
  const siteName = SITE_INFO.name || '';
  const defaultImg = siteUrl ? new URL('images/favicon.svg', siteUrl).toString() : '';

  function abs(p) {
    return siteUrl ? new URL(p, siteUrl).toString() : '';
  }

  let title, description, ogImage, canonicalUrl, ogType;

  const rel = relPath.replaceAll(path.sep, '/');

  if (rel === 'index.html') {
    title = `${siteName} — Mechanical & Aerospace Engineer`;
    description = `Portfolio of ${siteName}, a graduate mechanical engineer with focus on aerospace, robotics, and optimisation.`;
    const featured = PROJECTS.find(p => p.featured) || PROJECTS[0];
    ogImage = featured?.image ? abs(featured.image) : defaultImg;
    canonicalUrl = abs('index.html');
    ogType = 'website';

  } else if (rel === 'about.html') {
    title = `About — ${siteName}`;
    description = `About ${siteName} — background, experience, and interests outside engineering.`;
    ogImage = abs('images/profile.jpg');
    canonicalUrl = abs('about.html');
    ogType = 'profile';

  } else if (rel === 'resume.html') {
    title = `Resume — ${siteName}`;
    description = `Resume of ${siteName}: engineering experience, skills, achievements, and downloadable PDF.`;
    ogImage = defaultImg;
    canonicalUrl = abs('resume.html');
    ogType = 'website';

  } else if (rel === 'documents.html') {
    title = `Supporting Documents — ${siteName}`;
    description = `Letters of recommendation, transcripts, certificates, and supporting documents for ${siteName}.`;
    ogImage = defaultImg;
    canonicalUrl = abs('documents.html');
    ogType = 'website';

  } else if (rel === '404.html') {
    title = `Page not found — ${siteName}`;
    description = '';
    ogImage = defaultImg;
    canonicalUrl = '';
    ogType = 'website';

  } else if (rel.startsWith('projects/')) {
    const slug = rel.replace('projects/', '').replace('.html', '');
    const p = PROJECTS.find(x => x.slug === slug) || {};
    title = p.title ? `${p.title} — ${siteName}` : `Project — ${siteName}`;
    description = (p.summary || p.intro || '').slice(0, 170);
    ogImage = p.image ? abs(p.image) : defaultImg;
    canonicalUrl = abs(rel);
    ogType = 'article';

  } else if (rel.startsWith('hobbies/')) {
    const slug = rel.replace('hobbies/', '').replace('.html', '');
    const h = HOBBIES.find(x => x.slug === slug) || {};
    title = h.title ? `${h.title} — ${siteName}` : `Hobby — ${siteName}`;
    description = (h.context || h.intro || '').slice(0, 170);
    ogImage = h.image ? abs(h.image) : defaultImg;
    canonicalUrl = abs(rel);
    ogType = 'article';

  } else {
    return '';
  }

  const depth = rel.split('/').length - 1;
  const faviconHref = depth > 0 ? '../images/favicon.svg' : 'images/favicon.svg';

  const tags = [
    `  <link rel="icon" href="${faviconHref}" type="image/svg+xml">`,
    canonicalUrl ? `  <link rel="canonical" href="${canonicalUrl}">` : '',
    `  <meta name="description" content="${escapeAttr(description)}">`,
    `  <meta property="og:type" content="${ogType}">`,
    `  <meta property="og:title" content="${escapeAttr(title)}">`,
    `  <meta property="og:description" content="${escapeAttr(description)}">`,
    ogImage ? `  <meta property="og:image" content="${escapeAttr(ogImage)}">` : '',
    canonicalUrl ? `  <meta property="og:url" content="${escapeAttr(canonicalUrl)}">` : '',
    `  <meta name="twitter:card" content="${ogImage ? 'summary_large_image' : 'summary'}">`,
    `  <meta name="twitter:title" content="${escapeAttr(title)}">`,
    `  <meta name="twitter:description" content="${escapeAttr(description)}">`,
    ogImage ? `  <meta name="twitter:image" content="${escapeAttr(ogImage)}">` : '',
  ].filter(Boolean).join('\n');

  return { title, tags };
}

function escapeAttr(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

// ── HTML transformation ────────────────────────────────────────────────────

function transformHtml(html, relPath, content) {
  // Switch to React production UMD bundles.
  html = html.replace(
    /<script[^>]*src="https:\/\/unpkg\.com\/react@18\.3\.1\/umd\/react\.development\.js"[^>]*><\/script>\s*/g,
    '<script defer src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin="anonymous"></script>\n'
  );
  html = html.replace(
    /<script[^>]*src="https:\/\/unpkg\.com\/react-dom@18\.3\.1\/umd\/react-dom\.development\.js"[^>]*><\/script>\s*/g,
    '<script defer src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous"></script>\n'
  );
  // Remove in-browser Babel.
  html = html.replace(
    /<script[^>]*src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]+\/babel\.min\.js"[^>]*><\/script>\s*/g,
    ''
  );

  // Switch "text/babel" JSX script tags to normal JS.
  html = html.replace(/\s+type="text\/babel"/g, '');

  // Rewrite .jsx references to compiled .js outputs.
  const jsxFiles = ['shared', 'home', 'about', 'resume', 'documents', 'project', 'hobby'];
  for (const f of jsxFiles) {
    html = html.replace(new RegExp(`${f}\\.jsx`, 'g'), `${f}.js`);
  }

  // Add defer to plain JS script tags.
  html = html.replace(/<script\s+src="([^"]+\.js)"\s*><\/script>/g, '<script defer src="$1"></script>');
  html = html.replace(/<script\s+src="([^"]+\.js)"\s*\/>\s*/g, '<script defer src="$1"></script>\n');

  // Inject per-page SEO meta + favicon before </head>.
  if (content) {
    const { title, tags } = buildPageMeta(relPath, content);
    if (title) {
      html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
    }
    if (tags) {
      html = html.replace('</head>', `${tags}\n</head>`);
    }
  }

  return html;
}

// ── Main build ────────────────────────────────────────────────────────────

async function build() {
  fs.rmSync(OUT, { recursive: true, force: true });
  ensureDir(OUT);

  const content = loadContent();
  const siteUrl = content.SITE_INFO?.siteUrl || '';
  let normalizedSiteUrl = siteUrl;
  if (normalizedSiteUrl && !normalizedSiteUrl.endsWith('/')) normalizedSiteUrl += '/';

  // Copy static asset folders verbatim.
  for (const dir of ['images', 'uploads']) {
    const src = path.join(ROOT, dir);
    if (fs.existsSync(src)) copyDir(src, path.join(OUT, dir));
  }
  const docsDir = path.join(ROOT, 'documents');
  if (fs.existsSync(docsDir)) copyDir(docsDir, path.join(OUT, 'documents'));

  // Copy + transform HTML pages; copy content.js and CNAME verbatim.
  const allFiles = listFilesRecursive(ROOT);
  for (const abs of allFiles) {
    const rel = path.relative(ROOT, abs);
    if (rel.startsWith('docs' + path.sep)) continue;
    if (rel.startsWith('node_modules' + path.sep)) continue;
    if (rel.startsWith('.git' + path.sep)) continue;
    if (rel.startsWith('scripts' + path.sep)) continue;

    if (rel.endsWith('.html')) {
      const html = fs.readFileSync(abs, 'utf8');
      const dest = path.join(OUT, rel);
      ensureDir(path.dirname(dest));
      fs.writeFileSync(dest, transformHtml(html, rel, content), 'utf8');
    } else if (rel === 'content.js' || rel === 'CNAME') {
      copyFile(abs, path.join(OUT, rel));
    }
  }

  // Compile JSX → JS using Babel's programmatic API.
  const jsxInputs = [
    'shared', 'home', 'about', 'resume', 'documents', 'project', 'hobby',
  ].map((f) => path.join(ROOT, `${f}.jsx`));

  for (const inputPath of jsxInputs) {
    const result = await babel.transformFileAsync(inputPath, {
      presets: [['@babel/preset-react', { runtime: 'classic' }]],
      sourceMaps: true,
    });
    const baseName = path.basename(inputPath, '.jsx');
    const outJs = path.join(OUT, `${baseName}.js`);
    const outMap = path.join(OUT, `${baseName}.js.map`);

    // Strip the Tweaks panel from production shared.js.
    let code = result.code;
    if (baseName === 'shared') {
      code = code.replace(
        'const SHOW_TWEAKS_PANEL = true; // PROD: false',
        'const SHOW_TWEAKS_PANEL = false;'
      );
    }

    fs.writeFileSync(outJs, code + `\n//# sourceMappingURL=${baseName}.js.map\n`, 'utf8');
    if (result.map) fs.writeFileSync(outMap, JSON.stringify(result.map), 'utf8');
  }

  // Emit sitemap.xml + robots.txt when siteUrl is configured.
  if (normalizedSiteUrl) {
    const htmlFiles = listFilesRecursive(OUT)
      .filter((p) => p.endsWith('.html'))
      .map((p) => path.relative(OUT, p).replaceAll(path.sep, '/'))
      .filter((rel) => !rel.startsWith('.') && rel !== '404.html');

    const urls = htmlFiles
      .map((rel) => new URL(rel, normalizedSiteUrl).toString())
      .sort((a, b) => a.localeCompare(b));

    const sitemap =
      `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n') +
      `\n</urlset>\n`;

    fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap, 'utf8');
    fs.writeFileSync(
      path.join(OUT, 'robots.txt'),
      `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', normalizedSiteUrl).toString()}\n`,
      'utf8'
    );
  }

  console.log(`\nBuilt production site → ${OUT}\n`);
}

build().catch((err) => { console.error(err); process.exit(1); });
