// Shared theme, UI, and page shell for all Jago Alcock site pages.
// Content comes from content.js (loaded before this file).

const ACCENT_OPTIONS = [
  { id: 'terracotta', hex: '#d97757', name: 'Terracotta' },
  { id: 'ember',      hex: '#c24d2c', name: 'Ember' },
  { id: 'sulphur',    hex: '#d9a441', name: 'Sulphur' },
  { id: 'steel',      hex: '#5f8aa4', name: 'Steel' },
  { id: 'moss',       hex: '#7a9461', name: 'Moss' },
];

// Persisted tweak defaults — host can rewrite this block.
const TWEAKS = /*EDITMODE-BEGIN*/{
  "mode": "dark",
  "accent": "moss",
  "headlineFont": "serif"
}/*EDITMODE-END*/;

// Set to false in production builds (build.mjs replaces this line).
const SHOW_TWEAKS_PANEL = true; // PROD: false

// Helper: render text with {accent}…{/accent} spans coloured in the accent.
function renderAccented(text, t) {
  const parts = text.split(/(\{accent\}.*?\{\/accent\})/gs).filter(Boolean);
  return parts.map((p, i) => {
    const m = p.match(/^\{accent\}(.*)\{\/accent\}$/);
    if (m) return <span key={i} style={{ color: t.accent }}>{m[1]}</span>;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

// ── Theme ───────────────────────────────────────────────────────────────
function theme(mode, accentHex, headlineFont) {
  const dark = mode === 'dark';
  const serif = '"Fraunces", "GT Sectra", "Tiempos Text", Georgia, serif';
  const sans  = '"Inter", -apple-system, system-ui, sans-serif';
  return {
    mode,
    bg:    dark ? '#0f0f10' : '#faf7f0',
    bg2:   dark ? '#161618' : '#f0ebdd',
    line:  dark ? 'rgba(240,237,229,0.1)'  : 'rgba(26,23,20,0.12)',
    line2: dark ? 'rgba(240,237,229,0.18)' : 'rgba(26,23,20,0.2)',
    text:  dark ? '#f0ede5' : '#1a1714',
    dim:   dark ? 'rgba(240,237,229,0.6)'  : 'rgba(26,23,20,0.62)',
    faint: dark ? 'rgba(240,237,229,0.55)' : 'rgba(26,23,20,0.55)',
    accent: accentHex,
    serif, sans,
    mono:  '"JetBrains Mono", ui-monospace, monospace',
    // Resolved headline font — use t.head instead of the headFam pattern everywhere.
    head: headlineFont === 'sans' ? sans : serif,
  };
}

/** "01", "02", … from 0-based index into the ordered list in content.js */
function ordinalFromIndex(index) {
  return String(Math.max(0, index) + 1).padStart(2, '0');
}

/** Same label, from an item's slug and the ordered array it belongs to */
function ordinalFromSlug(items, slug) {
  const i = items.findIndex((x) => x.slug === slug);
  return ordinalFromIndex(i < 0 ? 0 : i);
}

// ── Responsive styles: injected once into <head> ────────────────────────
// Uses class names + CSS custom properties so inline styles still work.
const RESPONSIVE_CSS = `
  html, body { margin: 0; padding: 0; }
  * { box-sizing: border-box; }
  img, video { max-width: 100%; height: auto; }

  :where(a:not(.ja-skip-link), button):focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }

  .ja-skip-link {
    position: fixed;
    left: 16px;
    top: -120px;
    z-index: 200;
    padding: 12px 18px;
    font: 500 13px var(--ja-skip-font, ui-sans-serif, system-ui, sans-serif);
    text-decoration: none;
    background: var(--ja-skip-bg, Field);
    color: var(--ja-skip-fg, FieldText);
    border: 2px solid var(--ja-skip-border, ButtonText);
    border-radius: 2px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.2);
  }
  .ja-skip-link:focus-visible {
    top: 16px;
    outline: none;
  }

  /* Use these classes in JSX for responsive behaviour */
  .ja-page-pad      { padding-left: 56px;  padding-right: 56px; }
  .ja-section-y-lg  { padding-top: 96px;   padding-bottom: 96px; }
  .ja-section-y-md  { padding-top: 72px;   padding-bottom: 72px; }

  .ja-grid-2        { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
  .ja-grid-3        { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
  .ja-grid-sidebar  { display: grid; grid-template-columns: 1fr 2.3fr; gap: 80px; align-items: start; }
  .ja-grid-hero     { display: grid; grid-template-columns: 1fr 1.25fr; gap: 64px; align-items: center; }

  .ja-h1            { font-size: clamp(48px, 7vw, 88px); line-height: 0.96; letter-spacing: -0.03em; }
  .ja-h2            { font-size: clamp(36px, 5vw, 56px); line-height: 1.0; letter-spacing: -0.02em; }

  .ja-nav-wrap      { padding: 22px 56px; }
  .ja-nav-links     { display: flex; gap: 32px; }
  .ja-nav-right     { display: flex; align-items: center; gap: 28px; }

  .ja-flex-between  { display: flex; justify-content: space-between; align-items: baseline; gap: 24px; flex-wrap: wrap; }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition: none !important; animation: none !important; }
  }

  /* ── Hover + focus-visible state for accent-coloured interactive elements ── */
  .ja-nav-link:hover, .ja-nav-link:focus-visible { color: var(--ja-text) !important; }
  .ja-mode-toggle:hover, .ja-mode-toggle:focus-visible {
    border-color: var(--ja-accent) !important;
    color: var(--ja-text) !important;
  }

  /* ── Tablet ── */
  @media (max-width: 980px) {
    .ja-page-pad     { padding-left: 32px; padding-right: 32px; }
    .ja-section-y-lg { padding-top: 72px;  padding-bottom: 72px; }
    .ja-section-y-md { padding-top: 56px;  padding-bottom: 56px; }
    .ja-grid-3       { grid-template-columns: 1fr 1fr; gap: 32px; }
    .ja-grid-sidebar { grid-template-columns: 1fr; gap: 32px; }
    .ja-grid-hero    { grid-template-columns: 1fr; gap: 40px; }
    .ja-project-body { grid-template-columns: 1fr !important; }
    .ja-nav-wrap     { padding: 16px 32px; }
    .ja-nav-links    { gap: 20px; }
  }

  /* ── Mobile ── */
  @media (max-width: 680px) {
    .ja-page-pad     { padding-left: 20px; padding-right: 20px; }
    .ja-section-y-lg { padding-top: 56px;  padding-bottom: 56px; }
    .ja-section-y-md { padding-top: 40px;  padding-bottom: 40px; }
    .ja-grid-2       { grid-template-columns: 1fr; gap: 28px; }
    .ja-grid-3       { grid-template-columns: 1fr; gap: 28px; }
    .ja-nav-wrap     { padding: 14px 20px; flex-wrap: wrap; gap: 10px; }
    .ja-nav-right    { gap: 14px; width: 100%; justify-content: space-between; }
    .ja-nav-links    { gap: 14px; font-size: 12px; }

    .ja-hide-mobile  { display: none !important; }
  }
`;

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: RESPONSIVE_CSS }} />;
}

// Skip link + landmark wrapper — use on every page root for keyboard / SR users.
// Theme tokens for the skip control live on a wrapper so the link (a sibling of <main>) inherits CSS variables.
function SiteShell({ t, children }) {
  const shellVars = {
    '--ja-skip-bg':   t.bg2,
    '--ja-skip-fg':   t.text,
    '--ja-skip-border': t.accent,
    '--ja-skip-font': t.sans,
    '--ja-accent':    t.accent,
    '--ja-text':      t.text,
  };
  return (
    <div className="ja-site-shell" style={shellVars}>
      <a href="#main-content" className="ja-skip-link">Skip to main content</a>
      <main
        id="main-content"
        tabIndex={-1}
        style={{
          background: t.bg,
          color: t.text,
          minHeight: '100vh',
          fontFamily: t.sans,
          transition: 'background .25s, color .25s',
        }}
      >
        {children}
      </main>
    </div>
  );
}

// ── Common UI ───────────────────────────────────────────────────────────
function Eyebrow({ t, children }) {
  return (
    <div style={{ fontFamily: t.mono, fontSize: 11, color: t.accent,
      letterSpacing: 2, textTransform: 'uppercase',
      display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 20, height: 1, background: t.accent }} />
      {children}
    </div>
  );
}

function ModeToggle({ mode, onToggle, t }) {
  const isDark = mode === 'dark';
  return (
    <button onClick={onToggle} aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="ja-mode-toggle"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'transparent', border: `1px solid ${t.line2}`,
        padding: '6px 10px', cursor: 'pointer', color: t.dim,
        fontFamily: t.mono, fontSize: 10, letterSpacing: 1.5,
        transition: 'border-color .2s, color .2s',
      }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
        {isDark ? (<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />) : (
          <g><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></g>
        )}
      </svg>
      <span>{isDark ? 'DARK' : 'LIGHT'}</span>
    </button>
  );
}

function Nav({ t, mode, onToggleMode, active, pathPrefix = '' }) {
  const links = [
    ['Portfolio',           pathPrefix + 'index.html',     'work'],
    ['About Me',            pathPrefix + 'about.html',     'about'],
    ['Resume',              pathPrefix + 'resume.html',    'resume'],
    ['Supporting Documents', pathPrefix + 'documents.html', 'docs'],
  ];
  return (
    <header className="ja-nav-wrap" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: `1px solid ${t.line}`,
      position: 'sticky', top: 0, zIndex: 20,
      background: `color-mix(in srgb, ${t.bg} 88%, transparent)`,
      backdropFilter: 'blur(10px)',
    }}>
      <a href={pathPrefix + 'index.html'} style={{ display: 'flex', alignItems: 'baseline', gap: 12, textDecoration: 'none' }}>
        <span style={{ fontFamily: t.serif, fontSize: 22, letterSpacing: -0.3, color: t.text }}>{SITE_INFO.name}</span>
        <span className="ja-hide-mobile" style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 0.5 }}>— {SITE_INFO.tagline}</span>
      </a>
      <div className="ja-nav-right">
        <nav className="ja-nav-links" style={{ fontSize: 13, letterSpacing: 0.2, fontFamily: t.sans }}>
          {links.map(([l, href, id]) => {
            const isActive = id === active;
            return (
              <a key={id} href={href} className="ja-nav-link" style={{
                color: isActive ? t.text : t.dim, textDecoration: 'none',
                paddingBottom: 4,
                borderBottom: isActive ? `1px solid ${t.accent}` : '1px solid transparent',
                transition: 'color .2s',
              }}>{l}</a>
            );
          })}
        </nav>
        <div className="ja-hide-mobile" style={{ width: 1, height: 18, background: t.line2 }} />
        <ModeToggle mode={mode} onToggle={onToggleMode} t={t} />
      </div>
    </header>
  );
}

// ── Download button (used above every page's content) ──────────────────
function DownloadBar({ t, items }) {
  // items: [{ label, url, note?, primary? }]
  return (
    <div className="ja-page-pad" style={{
      paddingTop: 20, paddingBottom: 20, borderBottom: `1px solid ${t.line}`,
      display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center',
      background: t.bg2,
    }}>
      <div style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 2, textTransform: 'uppercase', marginRight: 8 }}>
        ⟶ Downloads
      </div>
      {items.map((it, i) => (
        <a key={i} href={it.url} target="_blank" rel="noreferrer" style={{
          textDecoration: 'none', fontFamily: t.sans, fontSize: 13, fontWeight: 500,
          padding: '10px 18px', letterSpacing: 0.3,
          background: it.primary ? t.accent : 'transparent',
          color: it.primary ? '#0f0f10' : t.text,
          border: it.primary ? 'none' : `1px solid ${t.line2}`,
          display: 'inline-flex', alignItems: 'center', gap: 10,
        }}>
          <span>{it.label}</span>
          <span style={{ fontSize: 14 }}>↗</span>
        </a>
      ))}
    </div>
  );
}

// ── Gallery card (unified style used for both projects AND hobbies) ─────
function GalleryCard({ item, t, href, ordinal, hoverSlug, setHoverSlug, big, pathPrefix = '' }) {
  const active = hoverSlug === item.slug;
  const hasImage = Boolean(item.image);
  const imgSrc = hasImage ? pathPrefix + item.image : null;
  return (
    <a href={href}
      onMouseEnter={() => setHoverSlug(item.slug)}
      onMouseLeave={() => setHoverSlug(null)}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', cursor: 'pointer' }}>
      <div style={{
        background: t.bg2, aspectRatio: big ? '4/3' : '3/2', position: 'relative',
        backgroundImage: hasImage ? undefined
          : `repeating-linear-gradient(45deg, ${t.line} 0 10px, transparent 10px 22px)`,
        border: `1px solid ${active ? t.accent : t.line}`, overflow: 'hidden',
        transition: 'border-color .2s',
      }}>
        {hasImage ? (
          <img src={imgSrc} alt={`${item.title} — cover image`} loading="lazy" decoding="async" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: item.imagePosition || 'center',
            transition: 'transform .6s cubic-bezier(.2,.7,.3,1)',
            transform: active ? 'scale(1.03)' : 'scale(1)',
            filter: t.mode === 'dark' ? 'brightness(0.82)' : 'brightness(0.95)',
          }} />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 2,
          }}>
            [ {item.title.toUpperCase()} ]
          </div>
        )}
        {hasImage && (
          <div style={{
            position: 'absolute', inset: 0,
            background: t.mode === 'dark'
              ? 'linear-gradient(180deg, rgba(15,15,16,0.05) 40%, rgba(15,15,16,0.55) 100%)'
              : 'linear-gradient(180deg, rgba(250,247,240,0.05) 40%, rgba(250,247,240,0.35) 100%)',
          }} />
        )}
        <span style={{
          position: 'absolute', top: 16, left: 16, fontFamily: t.mono,
          fontSize: 10, letterSpacing: 1.5, color: t.accent,
          textShadow: hasImage ? '0 1px 4px rgba(0,0,0,0.4)' : 'none',
        }}>/{ordinal}</span>
        <span style={{
          position: 'absolute', top: 16, right: 16, fontFamily: t.mono,
          fontSize: 10, letterSpacing: 1.5, color: hasImage ? '#f0ede5' : t.dim,
          border: `1px solid ${hasImage ? 'rgba(240,237,229,0.4)' : t.line2}`,
          padding: '4px 8px',
          background: hasImage ? 'rgba(15,15,16,0.35)' : 'transparent',
          backdropFilter: hasImage ? 'blur(4px)' : 'none',
        }}>{item.tag}</span>
        <span style={{
          position: 'absolute', bottom: 16, right: 16, fontFamily: t.mono,
          fontSize: 12, color: active ? t.accent : (hasImage ? '#f0ede5' : t.faint),
          transform: active ? 'translateX(4px)' : 'translateX(0)',
          transition: 'transform .2s, color .2s',
        }}>→</span>
      </div>
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
        <div>
          <div style={{
            fontFamily: t.head, fontSize: 22, color: t.text, letterSpacing: -0.2,
            fontWeight: 400,
          }}>{item.title}</div>
          <div style={{ fontFamily: t.sans, fontSize: 12, color: t.dim, marginTop: 4 }}>
            {item.client || item.context}
          </div>
        </div>
        <span style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, whiteSpace: 'nowrap' }}>{item.year}</span>
      </div>
    </a>
  );
}

// ── Unified Gallery grid (used for Work + Hobbies) ──────────────────────
function Gallery({ items, t, hrefFor, bigIndices = [0, 1], pathPrefix = '' }) {
  const [hoverSlug, setHoverSlug] = React.useState(null);
  return (
    <div className="ja-grid-2">
      {items.map((p, i) => (
        <GalleryCard
          key={p.slug} item={p} t={t}
          ordinal={ordinalFromIndex(i)}
          href={hrefFor(p)} hoverSlug={hoverSlug} setHoverSlug={setHoverSlug}
          big={bigIndices.includes(i)} pathPrefix={pathPrefix}
        />
      ))}
    </div>
  );
}

function Footer({ t, variant = 'full', pathPrefix = '' }) {
  return (
    <>
      {variant === 'full' && (
        <footer id="contact" className="ja-page-pad ja-grid-3" style={{
          paddingTop: 72, paddingBottom: 72, borderTop: `1px solid ${t.line}`,
        }}>
          <div>
            <Eyebrow t={t}>Let's talk</Eyebrow>
            <div style={{
              fontFamily: t.head, fontSize: 'clamp(36px, 5vw, 52px)', letterSpacing: -1.4,
              fontWeight: 400, color: t.text, marginTop: 16, lineHeight: 1,
              whiteSpace: 'pre-line',
            }}>{SITE_INFO.footerHeadline}</div>
          </div>
          <div style={{ fontFamily: t.sans, fontSize: 13, color: t.dim, lineHeight: 2 }}>
            <div style={{ color: t.text, marginBottom: 8, fontFamily: t.mono, fontSize: 10, letterSpacing: 1.5 }}>CONTACT</div>
            <div><a href={`mailto:${SITE_INFO.email}`} style={{ color: t.text, textDecoration: 'none' }}>{SITE_INFO.email}</a></div>
            <div>{SITE_INFO.phone}</div>
            <div style={{ marginTop: 4 }}><a href={SITE_INFO.linkedin} style={{ color: t.accent, textDecoration: 'none' }}>LinkedIn ↗</a></div>
          </div>
          <div style={{ fontFamily: t.sans, fontSize: 13, color: t.dim, lineHeight: 2 }}>
            <div style={{ color: t.text, marginBottom: 8, fontFamily: t.mono, fontSize: 10, letterSpacing: 1.5 }}>SITE</div>
            <div><a href={pathPrefix + 'index.html'}     style={{ color: 'inherit', textDecoration: 'none' }}>Work</a></div>
            <div><a href={pathPrefix + 'about.html'}     style={{ color: 'inherit', textDecoration: 'none' }}>About</a></div>
            <div><a href={pathPrefix + 'resume.html'}    style={{ color: 'inherit', textDecoration: 'none' }}>Resume</a></div>
            <div><a href={pathPrefix + 'documents.html'} style={{ color: 'inherit', textDecoration: 'none' }}>Supporting docs</a></div>
          </div>
        </footer>
      )}
      <div className="ja-page-pad" style={{
        paddingTop: 16, paddingBottom: 16, fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 1.5,
        borderTop: `1px solid ${t.line}`, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
      }}>
        <span>{SITE_INFO.copyright}</span>
        <span>{SITE_INFO.hostingNote}</span>
      </div>
    </>
  );
}

// ── Tweaks panel ────────────────────────────────────────────────────────
function TweaksPanel({ open, tweaks, setTweak, t }) {
  if (!SHOW_TWEAKS_PANEL || !open) return null;
  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, zIndex: 100,
      width: 280, background: t.mode === 'dark' ? '#1c1c1e' : '#ffffff',
      color: t.text, border: `1px solid ${t.line2}`,
      fontFamily: t.sans, fontSize: 12, padding: 18,
      boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
      maxWidth: 'calc(100vw - 40px)',
    }}>
      <div style={{ fontFamily: t.mono, fontSize: 10, letterSpacing: 2, color: t.faint, marginBottom: 14, textTransform: 'uppercase' }}>
        Tweaks
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ color: t.dim, marginBottom: 8 }}>Mode (default)</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['dark', 'light'].map(m => (
            <button key={m} onClick={() => setTweak('mode', m)} style={{
              flex: 1, padding: '8px 0', fontSize: 12, fontFamily: t.sans,
              border: `1px solid ${tweaks.mode === m ? t.accent : t.line2}`,
              background: tweaks.mode === m ? `color-mix(in srgb, ${t.accent} 15%, transparent)` : 'transparent',
              color: t.text, cursor: 'pointer', textTransform: 'capitalize',
            }}>{m}</button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ color: t.dim, marginBottom: 8 }}>Accent</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {ACCENT_OPTIONS.map(a => (
            <button key={a.id} title={a.name} aria-label={`Set accent colour to ${a.name}`} onClick={() => setTweak('accent', a.id)} style={{
              flex: 1, height: 28, background: a.hex,
              border: tweaks.accent === a.id ? `2px solid ${t.text}` : `1px solid ${t.line2}`,
              cursor: 'pointer', padding: 0,
            }} />
          ))}
        </div>
        <div style={{ color: t.faint, marginTop: 6, fontSize: 11 }}>
          {ACCENT_OPTIONS.find(a => a.id === tweaks.accent)?.name}
        </div>
      </div>

      <div>
        <div style={{ color: t.dim, marginBottom: 8 }}>Headline font</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[['serif', 'Serif'], ['sans', 'Sans']].map(([k, l]) => (
            <button key={k} onClick={() => setTweak('headlineFont', k)} style={{
              flex: 1, padding: '8px 0', fontSize: 12,
              fontFamily: k === 'serif' ? t.serif : t.sans,
              border: `1px solid ${tweaks.headlineFont === k ? t.accent : t.line2}`,
              background: tweaks.headlineFont === k ? `color-mix(in srgb, ${t.accent} 15%, transparent)` : 'transparent',
              color: t.text, cursor: 'pointer',
            }}>{l}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page shell hook ─────────────────────────────────────────────────────
function usePageShell() {
  const [tweaks, setTweaks] = React.useState(TWEAKS);
  const [tweakOpen, setTweakOpen] = React.useState(false);
  const [viewerMode, setViewerMode] = React.useState(() => {
    try {
      const saved = localStorage.getItem('jago-site-mode');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch {}
    // Respect the visitor's OS dark/light preference before falling back to TWEAKS default.
    try {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
      if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light';
    } catch {}
    return tweaks.mode;
  });

  React.useEffect(() => { try { localStorage.setItem('jago-site-mode', viewerMode); } catch {} }, [viewerMode]);
  const tweaksModeApplied = React.useRef(false);
  React.useEffect(() => {
    // Skip the initial mount so the saved localStorage preference is not overwritten.
    if (!tweaksModeApplied.current) { tweaksModeApplied.current = true; return; }
    setViewerMode(tweaks.mode);
  }, [tweaks.mode]);

  const accentHex = ACCENT_OPTIONS.find(a => a.id === tweaks.accent)?.hex || ACCENT_OPTIONS[0].hex;
  const t = theme(viewerMode, accentHex, tweaks.headlineFont);
  const toggleMode = () => setViewerMode(m => m === 'dark' ? 'light' : 'dark');
  const setTweak = (key, val) => {
    setTweaks(prev => ({ ...prev, [key]: val }));
    if (SHOW_TWEAKS_PANEL) {
      try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*'); } catch {}
    }
  };

  React.useEffect(() => {
    if (!SHOW_TWEAKS_PANEL) return;
    const onMsg = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweakOpen(true);
      if (e.data.type === '__deactivate_edit_mode') setTweakOpen(false);
    };
    window.addEventListener('message', onMsg);
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  return { t, tweaks, tweakOpen, setTweak, viewerMode, toggleMode };
}

// ── SEO helpers ──────────────────────────────────────────────────────────
function ensureMeta(attrName, attrValue) {
  if (typeof document === 'undefined') return null;
  const sel = `meta[${attrName}="${attrValue}"]`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  return el;
}

function setMetaName(name, content) {
  if (!content) return;
  const el = ensureMeta('name', name);
  if (el) el.setAttribute('content', content);
}

function setMetaProperty(prop, content) {
  if (!content) return;
  const el = ensureMeta('property', prop);
  if (el) el.setAttribute('content', content);
}

function setCanonical(href) {
  if (!href || typeof document === 'undefined') return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, obj) {
  if (typeof document === 'undefined') return;
  const scriptId = `jsonld:${id}`;
  let el = document.getElementById(scriptId);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = scriptId;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(obj, null, 0);
}

function absUrl(siteUrl, path) {
  if (!siteUrl) return '';
  try {
    return new URL(path, siteUrl).toString();
  } catch {
    return '';
  }
}

function applySeo({
  title,
  description,
  path,
  imagePath,
  type = 'website',
}) {
  if (typeof document === 'undefined') return;

  const siteUrl = (SITE_INFO && SITE_INFO.siteUrl) ? SITE_INFO.siteUrl : '';
  const canonical = siteUrl && path ? absUrl(siteUrl, path) : '';
  const ogImage = siteUrl && imagePath ? absUrl(siteUrl, imagePath) : '';

  if (title) document.title = title;

  setMetaName('description', description);

  setMetaProperty('og:type', type);
  setMetaProperty('og:title', title);
  setMetaProperty('og:description', description);
  setMetaProperty('og:url', canonical);
  setMetaProperty('og:image', ogImage);

  setMetaName('twitter:card', ogImage ? 'summary_large_image' : 'summary');
  setMetaName('twitter:title', title);
  setMetaName('twitter:description', description);
  setMetaName('twitter:image', ogImage);

  setCanonical(canonical);

  // Helps Google disambiguate "Jago Alcock" as a person.
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_INFO?.name,
    email: SITE_INFO?.email ? `mailto:${SITE_INFO.email}` : undefined,
    sameAs: [SITE_INFO?.linkedin].filter(Boolean),
    jobTitle: SITE_INFO?.role,
    homeLocation: SITE_INFO?.location,
    url: canonical || siteUrl || undefined,
  };
  upsertJsonLd('person', person);
}

function useSeo(opts, deps) {
  React.useEffect(() => applySeo(opts), deps || []);
}

function ContentMissing() {
  return (
    <div style={{ padding: '80px 40px', textAlign: 'center', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ fontSize: 13, color: '#cc0000', letterSpacing: 1, marginBottom: 12 }}>CONTENT NOT LOADED</div>
      <p style={{ fontSize: 14, color: '#666', maxWidth: 440, margin: '0 auto', lineHeight: 1.6 }}>
        <code>content.js</code> failed to load or is missing required globals.
        Open the browser console for details.
      </p>
    </div>
  );
}

function contentLoaded(keys) {
  return keys.every(k => typeof window[k] !== 'undefined');
}

Object.assign(window, {
  ACCENT_OPTIONS, TWEAKS,
  theme, ordinalFromIndex, ordinalFromSlug, renderAccented, GlobalStyles, SiteShell,
  Eyebrow, ModeToggle, Nav, DownloadBar,
  GalleryCard, Gallery, Footer, TweaksPanel,
  usePageShell,
  applySeo, useSeo, ContentMissing, contentLoaded,
});
