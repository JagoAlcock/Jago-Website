// Homepage — featured hero + unified gallery.

function Hero({ t, headlineFont }) {
  const featured = PROJECTS.find(p => p.featured) || PROJECTS[0];
  const featuredIndex = PROJECTS.findIndex(p => p.slug === featured.slug);
  const featuredOrd = ordinalFromIndex(featuredIndex >= 0 ? featuredIndex : 0);
  const headFam = headlineFont === 'sans' ? t.sans : t.serif;
  return (
    <section style={{ position: 'relative', height: 'min(82vh, 780px)', minHeight: 520, overflow: 'hidden' }}>
      <img src={featured.image} alt={`${featured.title} — featured project`} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center 45%',
        filter: t.mode === 'dark' ? 'brightness(0.65) contrast(1.05)' : 'brightness(0.95) contrast(1.05) saturate(0.9)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: t.mode === 'dark'
          ? `linear-gradient(180deg, rgba(15,15,16,0.15) 0%, rgba(15,15,16,0.35) 55%, ${t.bg} 100%)`
          : `linear-gradient(180deg, rgba(250,247,240,0.1) 0%, rgba(250,247,240,0.35) 55%, ${t.bg} 100%)`,
      }} />
      <div className="ja-page-pad" style={{ position: 'absolute', left: 0, right: 0, bottom: 40, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 820, flex: '1 1 460px' }}>
          <Eyebrow t={t}>FEATURED · MASTERS RESEARCH</Eyebrow>
          <h1 className="ja-h1" style={{
            fontFamily: headFam, margin: '20px 0 0', fontWeight: 400, color: t.text,
          }}>
            {featured.title}.<br/>
            <span style={{ fontStyle: headlineFont === 'sans' ? 'normal' : 'italic', color: t.dim }}>
              {featured.tagline}
            </span>
          </h1>
          <p style={{ fontFamily: t.sans, fontSize: 16, lineHeight: 1.6, color: t.dim, maxWidth: 580, marginTop: 26 }}>
            {featured.summary}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 14, flexShrink: 0 }}>
          <a href={`projects/${featured.slug}.html`} style={{
            background: t.accent, color: '#0f0f10', textDecoration: 'none',
            padding: '14px 26px', fontSize: 13, letterSpacing: 0.5,
            fontFamily: t.sans, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 10,
            transition: 'transform .2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateX(2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}>
            Read the case study <span style={{ fontSize: 16 }}>→</span>
          </a>
          <span style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 1.5 }}>
            {featuredOrd} / {String(PROJECTS.length).padStart(2, '0')} PROJECTS
          </span>
        </div>
      </div>
    </section>
  );
}

function Intro({ t, headlineFont }) {
  const headFam = headlineFont === 'sans' ? t.sans : t.serif;
  const statFont = { color: t.text, fontFamily: headFam, fontSize: 32, lineHeight: 1, marginBottom: 6, fontWeight: 400 };
  return (
    <section className="ja-page-pad ja-section-y-lg ja-grid-sidebar" style={{ borderBottom: `1px solid ${t.line}` }}>
      <div style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 2, textTransform: 'uppercase' }}>
        ⟶ Introduction
      </div>
      <div>
        <p style={{ fontFamily: headFam, fontSize: 'clamp(22px, 2.6vw, 32px)', lineHeight: 1.35, margin: 0, fontWeight: 400, letterSpacing: -0.4, color: t.text }}>
          {renderAccented(INTRO_TEXT, t)}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, auto))', gap: 40, marginTop: 48, fontSize: 13, color: t.dim, fontFamily: t.sans }}>
          {INTRO_STATS.map((s, i) => (
            <div key={i}>
              <div style={statFont}>{s.value}</div>
              <div style={{ whiteSpace: 'pre-line', lineHeight: 1.45 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work({ t, headlineFont }) {
  return (
    <section className="ja-page-pad" style={{ padding: '96px 56px' }}>
      <div className="ja-flex-between" style={{ marginBottom: 48 }}>
        <div>
          <Eyebrow t={t}>Selected Work</Eyebrow>
          <h2 className="ja-h2" style={{ fontFamily: headlineFont === 'sans' ? t.sans : t.serif, fontWeight: 400, margin: '16px 0 0', color: t.text }}>
            Projects.
          </h2>
        </div>
        <span style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 1.5 }}>
          {String(PROJECTS.length).padStart(2, '0')} PROJECTS · {new Set(PROJECTS.map(p=>p.tag)).size} DISCIPLINES
        </span>
      </div>
      <Gallery
        items={PROJECTS} t={t} headlineFont={headlineFont}
        hrefFor={(p) => `projects/${p.slug}.html`}
        bigIndices={[0, 1]}
      />
    </section>
  );
}

function App() {
  const { t, tweaks, tweakOpen, setTweak, viewerMode, toggleMode } = usePageShell();
  React.useEffect(() => {
    applySeo({
      title: `${SITE_INFO.name} — Mechanical & Aerospace Engineer`,
      description: `Portfolio of ${SITE_INFO.name}, a mechanical engineer with aerospace focus. Projects, experience, and contact details.`,
      path: 'index.html',
      imagePath: (PROJECTS.find(p => p.featured)?.image) || (PROJECTS[0]?.image) || '',
      type: 'website',
    });
  }, []);
  return (
    <SiteShell t={t}>
      <GlobalStyles />
      <Nav t={t} mode={viewerMode} onToggleMode={toggleMode} active="work" />
      <Hero t={t} headlineFont={tweaks.headlineFont} />
      <Intro t={t} headlineFont={tweaks.headlineFont} />
      <Work t={t} headlineFont={tweaks.headlineFont} />
      <Footer t={t} headlineFont={tweaks.headlineFont} />
      <TweaksPanel open={tweakOpen} tweaks={tweaks} setTweak={setTweak} t={t} />
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
