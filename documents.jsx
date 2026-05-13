// Supporting documents — recommendations as cards, other docs as a list below.

function DocsHero({ t, headlineFont }) {
  const headFam = headlineFont === 'sans' ? t.sans : t.serif;
  return (
    <section className="ja-page-pad" style={{ padding: '72px 56px 56px', borderBottom: `1px solid ${t.line}` }}>
      <Eyebrow t={t}>Supporting Documents</Eyebrow>
      <h1 className="ja-h1" style={{ fontFamily: headFam, fontWeight: 400, margin: '20px 0 0', color: t.text }}>
        Letters of Recommendation<span style={{ color: t.dim }}>.</span>
      </h1>
      <p style={{ fontFamily: t.sans, fontSize: 17, lineHeight: 1.65, color: t.dim, maxWidth: 680, marginTop: 20 }}>
        Letters of recommendation from former managers and colleagues. Additional documents — transcripts, certificates, technical reports — are listed below.
      </p>
    </section>);

}

function PDFButton({ t, href, label = 'Read full PDF' }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href} target="_blank" rel="noreferrer"
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      textDecoration: 'none',
      fontFamily: t.sans, fontSize: 13, fontWeight: 500, letterSpacing: 0.3,
      padding: '12px 22px',
      background: hover ? t.accent : 'transparent',
      color: hover ? '#0f0f10' : t.text,
      border: `1px solid ${hover ? t.accent : t.line2}`,
      transition: 'all .15s'
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
      </svg>
      {label} <span style={{ fontSize: 14 }}>↗</span>
    </a>);

}

function RecommendationCard({ t, headlineFont, r, idx }) {
  const headFam = headlineFont === 'sans' ? t.sans : t.serif;
  const paragraphs = r.excerpt.split('\n\n');
  return (
    <article style={{
      borderTop: `1px solid ${t.line2}`,
      padding: '64px 0',
      display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)'
    }}>
      <div className="ja-grid-sidebar" style={{ alignItems: 'start' }}>
        <div>
          <div style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 2, textTransform: 'uppercase' }}>
            /{String(idx + 1).padStart(2, '0')} · Recommendation
          </div>
          <h2 className="ja-h2" style={{ fontFamily: headFam, fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 400, margin: '16px 0 4px', color: t.text, letterSpacing: -0.6, lineHeight: 1.05 }}>
            {r.name}
          </h2>
          <div style={{ fontFamily: t.sans, fontSize: 14, color: t.dim, lineHeight: 1.5 }}>
            {r.role}
          </div>
          {r.date &&
          <div style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 1.5, marginTop: 14, textTransform: 'uppercase' }}>
              {r.date}
            </div>
          }
          <div style={{ marginTop: 28 }}>
            <PDFButton t={t} href={r.pdf} />
          </div>
        </div>

        <div style={{ maxWidth: 720 }}>
          <div style={{ fontFamily: t.serif, fontSize: 56, color: t.accent, lineHeight: 1, height: 28, opacity: 0.7 }}>"</div>
          {paragraphs.map((p, i) =>
          <p key={i} style={{
            fontFamily: t.sans, fontSize: 17, lineHeight: 1.75, color: t.text,
            margin: i === 0 ? '8px 0 20px' : '0 0 20px'
          }}>
              {p}
            </p>
          )}
        </div>
      </div>
    </article>);

}

function Recommendations({ t, headlineFont }) {
  return (
    <section className="ja-page-pad" style={{ padding: '0 56px 24px' }}>
      {RECOMMENDATIONS.map((r, i) =>
      <RecommendationCard key={r.name} t={t} headlineFont={headlineFont} r={r} idx={i} />
      )}
    </section>);

}

function OtherDocs({ t, headlineFont }) {
  const [hoverN, setHoverN] = React.useState(null);
  const headFam = headlineFont === 'sans' ? t.sans : t.serif;
  return (
    <section className="ja-page-pad" style={{
      padding: '72px 56px 96px',
      borderTop: `1px solid ${t.line2}`,
      background: t.bg2
    }}>
      <div className="ja-flex-between" style={{ marginBottom: 40 }}>
        <div>
          <Eyebrow t={t}>Other documents</Eyebrow>
          <h2 className="ja-h2" style={{ fontFamily: headFam, fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 400, margin: '14px 0 0', color: t.text, letterSpacing: -0.6 }}>
            Transcripts, certificates &amp; reports.
          </h2>
        </div>
        <span style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 1.5 }}>
          {String(OTHER_DOCS.length).padStart(2, '0')} ITEMS
        </span>
      </div>

      <div>
        {OTHER_DOCS.map((d, i) => {
          const active = hoverN === i;
          return (
            <a key={i} href={d.url} target="_blank" rel="noreferrer"
            onMouseEnter={() => setHoverN(i)} onMouseLeave={() => setHoverN(null)}
            style={{
              display: 'grid', gridTemplateColumns: '60px 1fr auto',
              padding: '22px 16px', marginLeft: -16, marginRight: -16,
              borderTop: `1px solid ${t.line}`,
              borderBottom: i === OTHER_DOCS.length - 1 ? `1px solid ${t.line}` : 'none',
              fontFamily: t.sans, fontSize: 16, color: t.text, textDecoration: 'none',
              alignItems: 'center', cursor: 'pointer',
              background: active ? t.bg : 'transparent',
              transition: 'background .15s',
              gap: 20
            }}>
              <div style={{ fontFamily: t.mono, fontSize: 11, color: t.accent }}>/{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div style={{ color: t.text, fontFamily: headFam, fontSize: 19, letterSpacing: -0.2 }}>{d.title}</div>
                {d.note && <div style={{ fontFamily: t.sans, fontSize: 13, color: t.dim, marginTop: 4 }}>{d.note}</div>}
              </div>
              <div style={{ fontFamily: t.mono, fontSize: 10, color: active ? t.accent : t.faint, letterSpacing: 1.5, whiteSpace: 'nowrap' }}>
                PDF <span style={{ marginLeft: 6 }}>↗</span>
              </div>
            </a>);

        })}
      </div>
    </section>);

}

function App() {
  const { t, tweaks, tweakOpen, setTweak, viewerMode, toggleMode } = usePageShell();
  const downloads = [
  { label: 'Download PDF resume', url: RESUME.pdf, primary: true }];

  React.useEffect(() => {
    applySeo({
      title: `Supporting documents — ${SITE_INFO.name}`,
      description: `Letters of recommendation, supporting documents, and downloads for ${SITE_INFO.name}.`,
      path: 'documents.html',
      imagePath: '',
      type: 'website',
    });
  }, []);

  return (
    <SiteShell t={t}>
      <GlobalStyles />
      <Nav t={t} mode={viewerMode} onToggleMode={toggleMode} active="docs" />
      <DocsHero t={t} headlineFont={tweaks.headlineFont} />
      <Recommendations t={t} headlineFont={tweaks.headlineFont} />
      <OtherDocs t={t} headlineFont={tweaks.headlineFont} />
      <Footer t={t} headlineFont={tweaks.headlineFont} />
      <TweaksPanel open={tweakOpen} tweaks={tweaks} setTweak={setTweak} t={t} />
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);