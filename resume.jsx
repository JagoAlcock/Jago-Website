// Resume page — PDF button ABOVE content, then full on-page resume.

function Row({ t, label, children }) {
  return (
    <div style={{ padding: '32px 0', borderBottom: `1px solid ${t.line}` }}>
      <div style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>{label}</div>
      <div>{children}</div>
    </div>
  );
}

function JobCard({ t, role, where, tag, dur, bullets }) {
  return (
    <article style={{ marginBottom: 40 }}>
      <div className="ja-flex-between" style={{ marginBottom: 6 }}>
        <h3 style={{ fontFamily: t.head, fontSize: 24, fontWeight: 400, margin: 0, letterSpacing: -0.4, color: t.text }}>
          {role} <span style={{ color: t.dim }}>— {where}</span>
        </h3>
        <span style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 1.5 }}>{tag} · {dur}</span>
      </div>
      <ul style={{ margin: '12px 0 0', padding: 0, listStyle: 'none', fontFamily: t.sans, fontSize: 14.5, lineHeight: 1.7, color: t.dim }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ paddingLeft: 20, position: 'relative', marginTop: 8 }}>
            <span style={{ position: 'absolute', left: 0, top: 10, width: 8, height: 1, background: t.accent }} />
            {b}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ResumeHero({ t }) {
  return (
    <section className="ja-page-pad" style={{
      paddingTop: 72, paddingBottom: 56, borderBottom: `1px solid ${t.line}`,
    }}>
      <Eyebrow t={t}>Resume</Eyebrow>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginTop: 20 }}>
        <div>
          <h1 className="ja-h1" style={{ fontFamily: t.head, fontWeight: 400, margin: 0, color: t.text, maxWidth: 900 }}>
            {RESUME.heading}
          </h1>
          <p style={{ fontFamily: t.sans, fontSize: 17, lineHeight: 1.65, color: t.dim, maxWidth: 780, marginTop: 24 }}>
            {RESUME.summary}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
          <a href={RESUME.pdf} target="_blank" rel="noreferrer" style={{
            background: t.accent, color: '#0f0f10', textDecoration: 'none',
            padding: '16px 32px', fontSize: 13, letterSpacing: 0.5, fontWeight: 500,
            fontFamily: t.sans, display: 'inline-flex', alignItems: 'center', gap: 14,
          }}>
            Download PDF resume <span style={{ fontSize: 16 }}>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Body({ t }) {
  return (
    <section className="ja-page-pad" style={{ paddingTop: 32, paddingBottom: 0 }}>
      <Row t={t} label="Key Competences">
        <div style={{ fontFamily: t.head, fontSize: 'clamp(20px, 2.5vw, 28px)', color: t.text, letterSpacing: -0.4, lineHeight: 1.3 }}>
          {RESUME.competences.map((c, i) => (
            <React.Fragment key={c}>
              {i > 0 && <span style={{ color: t.faint, margin: '0 8px' }}>·</span>}
              {c}
            </React.Fragment>
          ))}
        </div>
      </Row>

      <Row t={t} label="Work Experience">
        {RESUME.jobs.map((j, i) => (
          <JobCard key={i} t={t} {...j} />
        ))}
      </Row>

      <Row t={t} label="Skills — Technical">
        <div style={{ fontFamily: t.sans, fontSize: 15, lineHeight: 2, color: t.dim }}>
          {RESUME.skills.tech.map(([k, v]) => (
            <div key={k}><b style={{ color: t.text, fontWeight: 500 }}>{k}:</b> {v}</div>
          ))}
        </div>
      </Row>

      <Row t={t} label="Skills — Soft">
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontFamily: t.sans, fontSize: 15, lineHeight: 1.7, color: t.dim }}>
          {RESUME.skills.soft.map(([k, v]) => (
            <li key={k} style={{ marginTop: 12 }}>
              <span style={{ color: t.text }}>{k}.</span> {v}
            </li>
          ))}
        </ul>
      </Row>

      <Row t={t} label="Achievements">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px 40px', fontFamily: t.sans, fontSize: 14, color: t.dim, lineHeight: 1.5 }}>
          {RESUME.achievements.map(([k, v]) => (
            <div key={k}>
              <div style={{ color: t.text, fontFamily: t.head, fontSize: 18, letterSpacing: -0.2, marginBottom: 4 }}>{k}</div>
              <div>{v}</div>
            </div>
          ))}
        </div>
      </Row>

      <Row t={t} label="Community">
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontFamily: t.sans, fontSize: 15, lineHeight: 1.7, color: t.dim }}>
          {RESUME.community.map(([k, v]) => (
            <li key={k} style={{ marginBottom: 14 }}>
              <span style={{ color: t.text }}>{k}.</span> {v}
            </li>
          ))}
        </ul>
      </Row>

      <Row t={t} label="Referees">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32, fontFamily: t.sans, fontSize: 13, lineHeight: 1.7, color: t.dim }}>
          {RESUME.referees.map(([name, role, email, phone]) => (
            <div key={name}>
              <div style={{ color: t.text, fontFamily: t.head, fontSize: 18, letterSpacing: -0.2 }}>{name}</div>
              <div style={{ marginTop: 4 }}>{role}</div>
              <div style={{ marginTop: 8 }}><a href={`mailto:${email}`} style={{ color: t.accent, textDecoration: 'none', wordBreak: 'break-all' }}>{email}</a></div>
              <div>{phone}</div>
            </div>
          ))}
        </div>
      </Row>

      <div style={{ padding: '40px 0 80px' }} />
    </section>
  );
}

function App() {
  const { t, tweaks, tweakOpen, setTweak, viewerMode, toggleMode } = usePageShell();
  useSeo({
    title: `Resume — ${SITE_INFO.name}`,
    description: `Resume of ${SITE_INFO.name}: experience, education, skills, and downloadable PDF.`,
    path: 'resume.html',
    imagePath: '',
    type: 'website',
  });
  return (
    <SiteShell t={t}>
      <GlobalStyles />
      <Nav t={t} mode={viewerMode} onToggleMode={toggleMode} active="resume" />
      <ResumeHero t={t} />
      <Body t={t} />
      <Footer t={t} />
      <TweaksPanel open={tweakOpen} tweaks={tweaks} setTweak={setTweak} t={t} />
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  contentLoaded(['SITE_INFO', 'RESUME'])
    ? <App />
    : <ContentMissing />
);
