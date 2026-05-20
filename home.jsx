// Homepage — featured hero + unified gallery.

function Hero({ t }) {
  const featured = PROJECTS.find(p => p.featured) || PROJECTS[0];
  const featuredIndex = PROJECTS.findIndex(p => p.slug === featured.slug);
  const featuredOrd = ordinalFromIndex(featuredIndex >= 0 ? featuredIndex : 0);
  const heroImgRef = React.useRef(null);
  React.useEffect(() => {
    const img = heroImgRef.current;
    if (!img) return;
    let raf;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        img.style.transform = `translateY(${window.scrollY * 0.35}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section style={{ position: 'relative', height: 'min(82vh, 780px)', minHeight: 520, overflow: 'hidden' }}>
      <img ref={heroImgRef} src={featured.image} alt={`${featured.title} — featured project`} style={{
        position: 'absolute', top: '-20%', left: 0, right: 0, width: '100%', height: '140%',
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
            fontFamily: t.head, margin: '20px 0 0', fontWeight: 400, color: t.text,
          }}>
            {featured.title}.<br/>
            <span style={{ fontStyle: t.head === t.sans ? 'normal' : 'italic', color: t.dim }}>
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

function StatTile({ s, t }) {
  const statFont = { color: t.text, fontFamily: t.head, fontSize: 32, lineHeight: 1, marginBottom: 6, fontWeight: 400 };
  const rawValue = s.value;
  const match = rawValue != null ? String(rawValue).match(/^(\d+)(\D*)$/) : null;
  const isNumeric = match != null || rawValue === null;

  const autoTarget = rawValue === null ? new Set(PROJECTS.map(p => p.tag)).size : null;
  const target = rawValue === null ? autoTarget : (match ? parseInt(match[1], 10) : 0);
  const suffix = match ? match[2] : '';
  const [count, setCount] = React.useState(0);
  const tileRef = React.useRef(null);

  const lines = s.label.split('\n');
  const [typedLines, setTypedLines] = React.useState(lines.map(() => ''));
  const [typingLine, setTypingLine] = React.useState(-1);

  // Advance typewriter one line at a time
  React.useEffect(() => {
    if (typingLine < 0 || typingLine >= lines.length) return;
    const full = lines[typingLine];
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTypedLines(prev => { const n = [...prev]; n[typingLine] = full.slice(0, i); return n; });
      if (i >= full.length) {
        clearInterval(iv);
        setTimeout(() => setTypingLine(l => l + 1), 180);
      }
    }, 38);
    return () => clearInterval(iv);
  }, [typingLine]);

  React.useEffect(() => {
    const el = tileRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      if (isNumeric) {
        const start = performance.now();
        const duration = 3500;
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      } else {
        setTypingLine(0);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (isNumeric) return (
    <div ref={tileRef} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      {s.prefix && <span style={{ fontFamily: t.sans, fontSize: 13, color: t.dim }}>{s.prefix}</span>}
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div style={{ ...statFont, visibility: 'hidden' }}>{target + suffix}</div>
        <div style={{ ...statFont, position: 'absolute', top: 0, left: 0 }}>{count + suffix}</div>
      </div>
      <span style={{ fontFamily: t.sans, fontSize: 13, color: t.dim }}>{s.label}</span>
    </div>
  );
  return (
    <div ref={tileRef}>
      <div style={statFont}>{rawValue}</div>
      <div style={{ fontFamily: t.mono, fontSize: 11, lineHeight: 1.9, letterSpacing: 0.3 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ position: 'relative', minHeight: '1.9em' }}>
            <div style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>{line}</div>
            <div style={{ position: 'absolute', top: 0, left: 0, whiteSpace: 'nowrap' }}>
              {typedLines[i]}
              {typingLine === i && <span style={{ animation: 'ja-blink 0.7s step-end infinite' }}>|</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Intro({ t }) {
  return (
    <section className="ja-page-pad ja-section-y-lg" style={{ borderBottom: `1px solid ${t.line}` }}>
      <div style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 32 }}>
        ⟶ Introduction
      </div>
      <div>
        <p style={{ fontFamily: t.head, fontSize: 'clamp(22px, 2.6vw, 32px)', lineHeight: 1.35, margin: 0, fontWeight: 400, letterSpacing: -0.4, color: t.text }}>
          {renderAccented(INTRO_TEXT, t)}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, auto))', gap: 40, marginTop: 48, fontSize: 13, color: t.dim, fontFamily: t.sans }}>
          {INTRO_STATS.map((s, i) => <StatTile key={i} s={s} t={t} />)}
        </div>
      </div>
    </section>
  );
}

function Work({ t }) {
  return (
    <section className="ja-page-pad" style={{ paddingTop: 96, paddingBottom: 96 }}>
      <div className="ja-flex-between" style={{ marginBottom: 48 }}>
        <div>
          <Eyebrow t={t}>Selected Work</Eyebrow>
          <h2 className="ja-h2" style={{ fontFamily: t.head, fontWeight: 400, margin: '16px 0 0', color: t.text }}>
            Projects.
          </h2>
        </div>
        <span style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 1.5 }}>
          {String(PROJECTS.length).padStart(2, '0')} PROJECTS · {new Set(PROJECTS.map(p=>p.tag)).size} DISCIPLINES
        </span>
      </div>
      <Gallery
        items={PROJECTS} t={t}
        hrefFor={(p) => `projects/${p.slug}.html`}
        bigIndices={[0, 1]}
      />
    </section>
  );
}

function App() {
  const { t, tweaks, tweakOpen, setTweak, viewerMode, toggleMode } = usePageShell();
  useSeo({
    title: `${SITE_INFO.name} — Mechanical & Aerospace Engineer`,
    description: `Portfolio of ${SITE_INFO.name}, a mechanical engineer with aerospace focus. Projects, experience, and contact details.`,
    path: 'index.html',
    imagePath: (PROJECTS.find(p => p.featured)?.image) || (PROJECTS[0]?.image) || '',
    type: 'website',
  });
  return (
    <SiteShell t={t}>
      <GlobalStyles />
      <Nav t={t} mode={viewerMode} onToggleMode={toggleMode} active="work" />
      <Hero t={t} />
      <Intro t={t} />
      <Work t={t} />
      <Footer t={t} />
      <TweaksPanel open={tweakOpen} tweaks={tweaks} setTweak={setTweak} t={t} />
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  contentLoaded(['SITE_INFO', 'PROJECTS', 'INTRO_TEXT', 'INTRO_STATS'])
    ? <App />
    : <ContentMissing />
);
