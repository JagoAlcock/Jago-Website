// About page — portrait photo + story + hobby gallery.

function AboutHero({ t }) {
  return (
    <section className="ja-page-pad ja-section-y-lg ja-grid-hero" style={{
      paddingBottom: 72, borderBottom: `1px solid ${t.line}`
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
          fontFamily: t.head, fontSize: 'clamp(48px, 7vw, 72px)', fontWeight: 400,
          margin: '20px 0 0', lineHeight: 1, color: t.text
        }}>
          {ABOUT_HEADING}<br />
          <span style={{ fontStyle: t.head === t.sans ? 'normal' : 'italic', color: t.dim }}>
            {ABOUT_SUBHEADING}
          </span>
        </h1>
      </div>
    </section>
  );
}

function Story({ t }) {
  const para = { fontFamily: t.sans, fontSize: 17, lineHeight: 1.75, color: t.text, margin: '0 0 24px' };
  return (
    <section className="ja-page-pad ja-section-y-lg" style={{ borderBottom: `1px solid ${t.line}` }}>
      <div style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 32 }}>
        ⟶ Background
      </div>
      <div style={{ maxWidth: 760 }}>
        {ABOUT_TEXT.map((p, i) =>
        <p key={i} style={para}>{renderAccented(p, t)}</p>
        )}
      </div>
    </section>
  );
}

function Hobbies({ t }) {
  return (
    <section className="ja-page-pad" style={{ paddingTop: 96, paddingBottom: 96, borderBottom: `1px solid ${t.line}` }}>
      <div className="ja-flex-between" style={{ marginBottom: 48 }}>
        <h2 className="ja-h2" style={{ fontFamily: t.head, fontWeight: 400, margin: 0, color: t.text }}>
          Outside the workshop
        </h2>
        <span style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 1.5 }}>
          {HOBBIES.length} PURSUITS
        </span>
      </div>
      <Gallery
        items={HOBBIES} t={t}
        hrefFor={(h) => `hobbies/${h.slug}.html`} bigIndices={[0, 1]} />
    </section>
  );
}

function App() {
  const { t, tweaks, tweakOpen, setTweak, viewerMode, toggleMode } = usePageShell();
  useSeo({
    title: `About — ${SITE_INFO.name}`,
    description: `About ${SITE_INFO.name} — background, experience, and interests outside engineering.`,
    path: 'about.html',
    imagePath: ABOUT_PHOTO || '',
    type: 'profile',
  });
  return (
    <SiteShell t={t}>
      <GlobalStyles />
      <Nav t={t} mode={viewerMode} onToggleMode={toggleMode} active="about" />
      <AboutHero t={t} />
      <Story t={t} />
      <Hobbies t={t} />
      <Footer t={t} />
      <TweaksPanel open={tweakOpen} tweaks={tweaks} setTweak={setTweak} t={t} />
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  contentLoaded(['SITE_INFO', 'HOBBIES', 'ABOUT_TEXT', 'ABOUT_PHOTO', 'ABOUT_HEADING'])
    ? <App />
    : <ContentMissing />
);
