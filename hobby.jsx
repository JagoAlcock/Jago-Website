// Hobby detail page — slug derived from filename (hobbies/<slug>.html).
// Mirrors project.jsx so the structure feels consistent.

function currentHobbySlug() {
  const path = location.pathname.split('/').pop() || '';
  return path.replace('.html', '') || 'canoe-polo';
}

function HobbyHero({ t, headlineFont, h }) {
  const headFam = headlineFont === 'sans' ? t.sans : t.serif;
  return (
    <>
      <div className="ja-page-pad" style={{
        padding: '20px 56px', fontFamily: t.mono, fontSize: 11, color: t.dim, letterSpacing: 1.5,
        borderBottom: `1px solid ${t.line}`, display: 'flex', justifyContent: 'space-between', gap: 16,
      }}>
        <a href="../about.html" style={{ color: t.dim, textDecoration: 'none' }}>← BACK TO ABOUT</a>
        <span>/{ordinalFromSlug(HOBBIES, h.slug)} · {h.tag.toUpperCase()} · {h.year}</span>
      </div>

      <section style={{ position: 'relative', height: 'clamp(360px, 58vh, 640px)', overflow: 'hidden', borderBottom: `1px solid ${t.line}` }}>
        <img src={'../' + h.image} alt={`${h.title} — hobby hero`} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%',
          filter: t.mode === 'dark' ? 'brightness(0.7) contrast(1.05)' : 'brightness(0.95) contrast(1.05)',
        }} />
        <div style={{ position: 'absolute', inset: 0,
          background: t.mode === 'dark'
            ? `linear-gradient(180deg, rgba(15,15,16,0.2) 0%, rgba(15,15,16,0.55) 60%, ${t.bg} 100%)`
            : `linear-gradient(180deg, rgba(250,247,240,0.2) 0%, rgba(250,247,240,0.55) 60%, ${t.bg} 100%)` }} />
        <div className="ja-page-pad" style={{ position: 'absolute', left: 0, right: 0, bottom: 40, maxWidth: '100%' }}>
          <div style={{ maxWidth: 980 }}>
            <Eyebrow t={t}>{h.tag}</Eyebrow>
            <h1 className="ja-h1" style={{
              fontFamily: headFam, fontSize: 'clamp(40px, 6vw, 84px)',
              margin: '20px 0 0', fontWeight: 400, color: t.text,
            }}>
              {h.title}.
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}

function HobbyBody({ t, headlineFont, h }) {
  const headFam = headlineFont === 'sans' ? t.sans : t.serif;
  const para = { fontFamily: t.sans, fontSize: 17, lineHeight: 1.75, color: t.text, margin: '0 0 24px' };
  return (
    <section className="ja-page-pad" style={{ padding: '72px 56px' }}>
      <div className="ja-project-body" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(240px, 1fr)', gap: 56, alignItems: 'start' }}>
        <div style={{ maxWidth: 760, minWidth: 0 }}>
          <p style={{ ...para, fontFamily: headFam, fontSize: 'clamp(20px, 2.4vw, 24px)', color: t.text, lineHeight: 1.45, letterSpacing: -0.2 }}>
            {h.intro || h.context}
          </p>
          {h.body && h.body.map((b, i) => (<p key={i} style={para}>{b}</p>))}
        </div>
        <aside>
          <div style={{ border: `1px solid ${t.line2}`, padding: 24, background: t.bg2, position: 'sticky', top: 120 }}>
            <div style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Details</div>
            {(h.specs || []).map(([k, v]) => (
              <div key={k} style={{ padding: '10px 0', borderTop: `1px solid ${t.line}` }}>
                <div style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 1.5 }}>{k.toUpperCase()}</div>
                <div style={{ fontFamily: t.sans, fontSize: 14, color: t.text, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function HobbyGallery({ t, h }) {
  const imgs = (h.gallery && h.gallery.length) ? h.gallery : null;
  return (
    <section className="ja-page-pad" style={{ padding: '0 56px 72px' }}>
      <div style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
        ⟶ Gallery
      </div>
      <div className="ja-grid-2" style={{ gap: 24 }}>
        {imgs
          ? imgs.map((src, i) => (
              <div key={i} style={{ height: 360, overflow: 'hidden', border: `1px solid ${t.line}` }}>
                <img src={'../' + src} alt={`${h.title} — gallery ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))
          : ['MOMENT', 'ACTION', 'TEAM', 'PLACE'].map((label, i) => (
              <div key={i} style={{
                height: 360, background: t.bg2, border: `1px solid ${t.line}`,
                backgroundImage: `repeating-linear-gradient(45deg, ${t.line} 0 10px, transparent 10px 22px)`,
                position: 'relative',
              }}>
                <span style={{ position: 'absolute', top: 16, left: 16, fontFamily: t.mono, fontSize: 10, color: t.accent, letterSpacing: 1.5 }}>/{String(i + 1).padStart(2, '0')}</span>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 2 }}>[ {label} ]</div>
              </div>
            ))
        }
      </div>
    </section>
  );
}

function HobbyPrevNext({ t, headlineFont, h }) {
  const idx = HOBBIES.findIndex(x => x.slug === h.slug);
  const prev = HOBBIES[(idx - 1 + HOBBIES.length) % HOBBIES.length];
  const next = HOBBIES[(idx + 1) % HOBBIES.length];
  const prevOrd = ordinalFromSlug(HOBBIES, prev.slug);
  const nextOrd = ordinalFromSlug(HOBBIES, next.slug);
  const headFam = headlineFont === 'sans' ? t.sans : t.serif;
  const cell = { padding: '36px 0', color: t.text, textDecoration: 'none', display: 'block' };
  return (
    <section className="ja-page-pad ja-grid-2" style={{ padding: '0 56px', borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}`, gap: 0 }}>
      <a href={`${prev.slug}.html`} style={{ ...cell, borderRight: `1px solid ${t.line}`, paddingRight: 24 }}>
        <div style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 1.5 }}>← PREVIOUS /{prevOrd}</div>
        <div style={{ fontFamily: headFam, fontSize: 'clamp(20px, 2.8vw, 26px)', marginTop: 8, letterSpacing: -0.4 }}>{prev.title}</div>
      </a>
      <a href={`${next.slug}.html`} style={{ ...cell, paddingLeft: 24, textAlign: 'right' }}>
        <div style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 1.5 }}>NEXT /{nextOrd} →</div>
        <div style={{ fontFamily: headFam, fontSize: 'clamp(20px, 2.8vw, 26px)', marginTop: 8, letterSpacing: -0.4 }}>{next.title}</div>
      </a>
    </section>
  );
}

function App() {
  const { t, tweaks, tweakOpen, setTweak, viewerMode, toggleMode } = usePageShell();
  const slug = currentHobbySlug();
  const h = HOBBIES.find(x => x.slug === slug) || HOBBIES[0];

  React.useEffect(() => {
    applySeo({
      title: `${h.title} — ${SITE_INFO.name}`,
      description: (h.context || h.intro || '').slice(0, 170),
      path: `hobbies/${h.slug}.html`,
      imagePath: h.image || '',
      type: 'article',
    });
  }, [h.slug]);

  return (
    <SiteShell t={t}>
      <GlobalStyles />
      <Nav t={t} mode={viewerMode} onToggleMode={toggleMode} active="about" pathPrefix="../" />
      <HobbyHero t={t} headlineFont={tweaks.headlineFont} h={h} />
      <HobbyBody t={t} headlineFont={tweaks.headlineFont} h={h} />
      <HobbyGallery t={t} h={h} />
      <HobbyPrevNext t={t} headlineFont={tweaks.headlineFont} h={h} />
      <Footer t={t} headlineFont={tweaks.headlineFont} pathPrefix="../" />
      <TweaksPanel open={tweakOpen} tweaks={tweaks} setTweak={setTweak} t={t} />
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
