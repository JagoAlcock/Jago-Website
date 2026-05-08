// About page — portrait photo + story + hobby gallery.

function AboutHero({ t, headlineFont }) {
  const headFam = headlineFont === 'sans' ? t.sans : t.serif;
  return (
    <section className="ja-page-pad ja-section-y-lg ja-grid-hero" style={{
      padding: '96px 56px 72px', borderBottom: `1px solid ${t.line}`
    }}>
      {/* Portrait photo — fixed aspect ratio, not zoomed */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 440, justifySelf: 'start' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5', background: t.bg2 }}>
          <img src={ABOUT_PHOTO} alt="Jago Alcock" style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectPosition: ABOUT_PHOTO_POSITION, display: 'block',
            filter: t.mode === 'dark' ? 'brightness(0.92)' : 'none', objectFit: "cover"
          }} />
        </div>
      </div>

      <div>
        <Eyebrow t={t}>My Story</Eyebrow>
        <h1 className="ja-h1" style={{
          fontFamily: headFam, fontSize: 'clamp(48px, 7vw, 72px)', fontWeight: 400,
          margin: '20px 0 0', lineHeight: 1, color: t.text
        }}>
          {ABOUT_HEADING}<br />
          <span style={{ fontStyle: headlineFont === 'sans' ? 'normal' : 'italic', color: t.dim }}>
            {ABOUT_SUBHEADING}
          </span>
        </h1>
      </div>
    </section>);

}

function Story({ t }) {
  const para = { fontFamily: t.sans, fontSize: 17, lineHeight: 1.75, color: t.text, margin: '0 0 24px' };
  return (
    <section className="ja-page-pad ja-section-y-lg ja-grid-sidebar" style={{ borderBottom: `1px solid ${t.line}` }}>
      <div style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 2, textTransform: 'uppercase' }}>
        ⟶ Background
      </div>
      <div style={{ maxWidth: 760 }}>
        {ABOUT_TEXT.map((p, i) =>
        <p key={i} style={para}>{renderAccented(p, t)}</p>
        )}
      </div>
    </section>);

}

function Hobbies({ t, headlineFont }) {
  const headFam = headlineFont === 'sans' ? t.sans : t.serif;
  return (
    <section className="ja-page-pad" style={{ padding: '96px 56px', borderBottom: `1px solid ${t.line}` }}>
      <div className="ja-flex-between" style={{ marginBottom: 48 }}>
        <h2 className="ja-h2" style={{ fontFamily: headFam, fontWeight: 400, margin: 0, color: t.text }}>
          Outside the workshop
        </h2>
        <span style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 1.5 }}>
          {HOBBIES.length} PURSUITS
        </span>
      </div>
      <Gallery
        items={HOBBIES} t={t} headlineFont={headlineFont}
        hrefFor={(h) => `hobbies/${h.slug}.html`} bigIndices={[0, 1]} />
      
    </section>);

}

function App() {
  const { t, tweaks, tweakOpen, setTweak, viewerMode, toggleMode } = usePageShell();
  React.useEffect(() => {
    applySeo({
      title: `About — ${SITE_INFO.name}`,
      description: `About ${SITE_INFO.name} — background, experience, and interests outside engineering.`,
      path: 'about.html',
      imagePath: ABOUT_PHOTO || '',
      type: 'profile',
    });
  }, []);
  return (
    <div style={{ background: t.bg, color: t.text, minHeight: '100vh', fontFamily: t.sans, transition: 'background .25s, color .25s' }}>
      <GlobalStyles />
      <Nav t={t} mode={viewerMode} onToggleMode={toggleMode} active="about" />
      <AboutHero t={t} headlineFont={tweaks.headlineFont} />
      <Story t={t} />
      <Hobbies t={t} headlineFont={tweaks.headlineFont} />
      <Footer t={t} headlineFont={tweaks.headlineFont} />
      <TweaksPanel open={tweakOpen} tweaks={tweaks} setTweak={setTweak} t={t} />
    </div>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);