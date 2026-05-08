import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const OUT = path.resolve(ROOT, 'docs');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function rm(p) {
  fs.rmSync(p, { recursive: true, force: true });
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

function transformHtml(html) {
  // Remove in-browser Babel and switch to React production UMD.
  html = html.replace(
    /<script[^>]*src="https:\/\/unpkg\.com\/react@18\.3\.1\/umd\/react\.development\.js"[^>]*><\/script>\s*/g,
    '<script defer src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin="anonymous"></script>\n'
  );
  html = html.replace(
    /<script[^>]*src="https:\/\/unpkg\.com\/react-dom@18\.3\.1\/umd\/react-dom\.development\.js"[^>]*><\/script>\s*/g,
    '<script defer src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous"></script>\n'
  );
  html = html.replace(
    /<script[^>]*src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]+\/babel\.min\.js"[^>]*><\/script>\s*/g,
    ''
  );

  // Switch any "text/babel" JSX script tags to normal JS.
  html = html.replace(/\s+type="text\/babel"/g, '');

  // Load compiled outputs.
  html = html.replace(/shared\.jsx/g, 'shared.js');
  html = html.replace(/home\.jsx/g, 'home.js');
  html = html.replace(/about\.jsx/g, 'about.js');
  html = html.replace(/resume\.jsx/g, 'resume.js');
  html = html.replace(/documents\.jsx/g, 'documents.js');
  html = html.replace(/project\.jsx/g, 'project.js');
  html = html.replace(/hobby\.jsx/g, 'hobby.js');

  // Defer scripts so React is available before app code runs.
  html = html.replace(/<script\s+src="([^"]+\.js)"\s*><\/script>/g, '<script defer src="$1"></script>');
  html = html.replace(/<script\s+src="([^"]+\.js)"\s*\/>\s*/g, '<script defer src="$1"></script>\n');

  return html;
}

function build() {
  rm(OUT);
  ensureDir(OUT);

  // Copy static assets / folders verbatim.
  for (const dir of ['images', 'uploads']) {
    const src = path.join(ROOT, dir);
    if (fs.existsSync(src)) copyDir(src, path.join(OUT, dir));
  }

  // Copy + transform HTML pages (root + nested).
  const allFiles = listFilesRecursive(ROOT);
  for (const abs of allFiles) {
    const rel = path.relative(ROOT, abs);

    // Skip build output / dependencies if they exist.
    if (rel.startsWith('docs' + path.sep)) continue;
    if (rel.startsWith('node_modules' + path.sep)) continue;
    if (rel.startsWith('.git' + path.sep)) continue;
    if (rel.startsWith('scripts' + path.sep)) continue;

    if (rel.endsWith('.html')) {
      const html = fs.readFileSync(abs, 'utf8');
      const outHtml = transformHtml(html);
      const dest = path.join(OUT, rel);
      ensureDir(path.dirname(dest));
      fs.writeFileSync(dest, outHtml, 'utf8');
    } else if (rel === 'content.js' || rel === 'CNAME' || rel === 'README.md') {
      copyFile(abs, path.join(OUT, rel));
    }
  }

  // Compile JSX -> JS (classic runtime, expects global React/ReactDOM from CDN).
  const jsxInputs = [
    'shared.jsx',
    'home.jsx',
    'about.jsx',
    'resume.jsx',
    'documents.jsx',
    'project.jsx',
    'hobby.jsx'
  ].map((f) => path.join(ROOT, f));

  execFileSync(
    process.platform === 'win32' ? 'npx.cmd' : 'npx',
    [
      'babel',
      ...jsxInputs,
      '--out-dir',
      OUT,
      '--extensions',
      '.jsx',
      '--source-maps'
    ],
    { stdio: 'inherit', cwd: ROOT }
  );

  console.log(`\nBuilt production site into: ${OUT}\n`);
  console.log('For GitHub Pages: set Pages source to /docs on main branch.');
}

build();

