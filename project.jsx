// Project detail page — slug derived from filename (projects/<slug>.html).

function currentSlug() {
  const path = location.pathname.split('/').pop() || '';
  return path.replace('.html', '') || 'coaxial-rotor';
}

function ProjectHero({ t, p }) {
  return (
    <>
      <div className="ja-page-pad" style={{
        paddingTop: 20, paddingBottom: 20, fontFamily: t.mono, fontSize: 11, color: t.dim, letterSpacing: 1.5,
        borderBottom: `1px solid ${t.line}`, display: 'flex', justifyContent: 'space-between', gap: 16,
      }}>
        <a href="../index.html" style={{ color: t.dim, textDecoration: 'none' }}>← ALL WORK</a>
        <span>/{ordinalFromSlug(PROJECTS, p.slug)} · {p.tag.toUpperCase()} · {p.year}</span>
      </div>

      <section style={{ position: 'relative', height: 'clamp(360px, 58vh, 640px)', overflow: 'hidden', borderBottom: `1px solid ${t.line}` }}>
        <img src={'../' + p.image} alt={`${p.title} — project hero`} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%',
          filter: t.mode === 'dark' ? 'brightness(0.7) contrast(1.05)' : 'brightness(0.95) contrast(1.05)',
        }} />
        <div style={{ position: 'absolute', inset: 0,
          background: t.mode === 'dark'
            ? `linear-gradient(180deg, rgba(15,15,16,0.2) 0%, rgba(15,15,16,0.55) 60%, ${t.bg} 100%)`
            : `linear-gradient(180deg, rgba(250,247,240,0.2) 0%, rgba(250,247,240,0.55) 60%, ${t.bg} 100%)` }} />
        <div className="ja-page-pad" style={{ position: 'absolute', left: 0, right: 0, bottom: 40, maxWidth: '100%' }}>
          <div style={{ maxWidth: 980 }}>
            <Eyebrow t={t}>{p.client}</Eyebrow>
            <h1 className="ja-h1" style={{
              fontFamily: t.head, fontSize: 'clamp(40px, 6vw, 84px)',
              margin: '20px 0 0', fontWeight: 400, color: t.text,
            }}>
              {p.title}.{p.tagline && <><br/><span style={{ fontStyle: t.head === t.sans ? 'normal' : 'italic', color: t.dim }}>{p.tagline}</span></>}
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectBody({ t, p }) {
  const para = { fontFamily: t.sans, fontSize: 17, lineHeight: 1.75, color: t.text, margin: '0 0 24px' };
  return (
    <section className="ja-page-pad" style={{ paddingTop: 72, paddingBottom: 72 }}>
      <div className="ja-project-body" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(240px, 1fr)', gap: 56, alignItems: 'start' }}>
        <div style={{ maxWidth: 760, minWidth: 0 }}>
          <p style={{ ...para, fontFamily: t.head, fontSize: 'clamp(20px, 2.4vw, 24px)', color: t.text, lineHeight: 1.45, letterSpacing: -0.2 }}>
            {p.intro || p.summary}
          </p>
          {p.body && p.body.map((b, i) => (<p key={i} style={para}>{b}</p>))}
        </div>
        <aside>
          <div style={{ border: `1px solid ${t.line2}`, padding: 24, background: t.bg2, position: 'sticky', top: 120 }}>
            <div style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Project details</div>
            {(p.specs || []).map(([k, v]) => (
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

function isVideoSrc(src) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(src);
}

function isEmbedSrc(src) {
  return typeof src === 'string' && src.startsWith('http');
}

function GalleryItem({ entry, title, idx, t }) {
  const [portrait, setPortrait] = React.useState(null);
  const mediaRef = React.useRef(null);
  const src    = typeof entry === 'string' ? entry : entry.src;
  const imgPos = typeof entry === 'string' ? 'center' : (entry.position || 'center');
  const poster = typeof entry === 'object' && entry.poster ? entry.poster : null;
  const isVideo = isVideoSrc(src);
  const isEmbed = isEmbedSrc(src);
  const detectImg   = () => { if (mediaRef.current) setPortrait(mediaRef.current.naturalHeight > mediaRef.current.naturalWidth); };
  const detectVideo = () => { if (mediaRef.current) setPortrait(mediaRef.current.videoHeight > mediaRef.current.videoWidth); };
  React.useEffect(() => { if (!isVideo && !isEmbed && mediaRef.current && mediaRef.current.complete) detectImg(); }, []);

  // Embeds can't be introspected cross-origin; derive portrait from explicit aspect string e.g. '9/16'.
  const embedAspect = (typeof entry === 'object' && entry.aspect) ? entry.aspect : '16/9';
  const embedIsPortrait = isEmbed && (() => { const [w, h] = embedAspect.split('/').map(Number); return h > w; })();

  const isPortrait = isEmbed ? embedIsPortrait : portrait === true;
  const cls = isPortrait ? 'ja-gallery-portrait' : 'ja-gallery-landscape';
  const container = { aspectRatio: isEmbed ? embedAspect : (isPortrait ? '2/3' : '4/3'), overflow: 'hidden', border: `1px solid ${t.line}` };

  if (isEmbed) return (
    <div className={cls} style={container}>
      <iframe src={src} title={`${title} — video ${idx + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-presentation"
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }} />
    </div>
  );
  if (isVideo) return (
    <div className={cls} style={container}>
      <video ref={mediaRef} autoPlay muted loop playsInline
             poster={poster ? '../' + poster : undefined}
             onLoadedMetadata={detectVideo}
             style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
        <source src={'../' + src} />
      </video>
    </div>
  );
  return (
    <div className={cls} style={container}>
      <img ref={mediaRef} src={'../' + src} alt={`${title} — gallery ${idx + 1}`}
           loading="lazy" decoding="async" onLoad={detectImg}
           style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: imgPos, display: 'block' }} />
    </div>
  );
}


function ProjectGallery({ t, p }) {
  const imgs = (p.gallery && p.gallery.length) ? p.gallery : null;
  return (
    <section className="ja-page-pad" style={{ paddingBottom: 72 }}>
      <div style={{ fontFamily: t.mono, fontSize: 11, color: t.faint, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
        ⟶ Gallery
      </div>
      <div className="ja-gallery-grid">
        {imgs
          ? imgs.map((entry, i) => (
              <GalleryItem key={i} entry={entry} title={p.title} idx={i} t={t} />
            ))
          : ['OVERVIEW', 'DETAIL', 'PROTOTYPE', 'TEST'].map((label, i) => (
              <div key={i} style={{
                aspectRatio: '4/3', background: t.bg2, border: `1px solid ${t.line}`,
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

function PrevNext({ t, p }) {
  const idx = PROJECTS.findIndex(x => x.slug === p.slug);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const prevOrd = ordinalFromSlug(PROJECTS, prev.slug);
  const nextOrd = ordinalFromSlug(PROJECTS, next.slug);
  const cell = { padding: '36px 0', color: t.text, textDecoration: 'none', display: 'block' };
  return (
    <section className="ja-page-pad ja-grid-2" style={{ borderTop: `1px solid ${t.line}`, borderBottom: `1px solid ${t.line}`, gap: 0 }}>
      <a href={`${prev.slug}.html`} style={{ ...cell, borderRight: `1px solid ${t.line}`, paddingRight: 24 }}>
        <div style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 1.5 }}>← PREVIOUS /{prevOrd}</div>
        <div style={{ fontFamily: t.head, fontSize: 'clamp(20px, 2.8vw, 26px)', marginTop: 8, letterSpacing: -0.4 }}>{prev.title}</div>
      </a>
      <a href={`${next.slug}.html`} style={{ ...cell, paddingLeft: 24, textAlign: 'right' }}>
        <div style={{ fontFamily: t.mono, fontSize: 10, color: t.faint, letterSpacing: 1.5 }}>NEXT /{nextOrd} →</div>
        <div style={{ fontFamily: t.head, fontSize: 'clamp(20px, 2.8vw, 26px)', marginTop: 8, letterSpacing: -0.4 }}>{next.title}</div>
      </a>
    </section>
  );
}

function App() {
  const { t, tweaks, tweakOpen, setTweak, viewerMode, toggleMode } = usePageShell();
  const slug = currentSlug();
  const p = PROJECTS.find(x => x.slug === slug);
  useSeo(p ? {
    title: `${p.title} — ${SITE_INFO.name}`,
    description: (p.summary || p.intro || '').slice(0, 170),
    path: `projects/${p.slug}.html`,
    imagePath: p.image || '',
    type: 'article',
  } : {}, [slug]);

  if (!p) return (
    <SiteShell t={t}>
      <GlobalStyles />
      <Nav t={t} mode={viewerMode} onToggleMode={toggleMode} active="work" pathPrefix="../" />
      <section className="ja-page-pad" style={{ paddingTop: 120, paddingBottom: 120, textAlign: 'center' }}>
        <div style={{ fontFamily: t.mono, fontSize: 11, color: t.accent, letterSpacing: 2, marginBottom: 20 }}>404</div>
        <p style={{ fontFamily: t.sans, fontSize: 16, color: t.dim }}>Project <code>{slug}</code> not found.</p>
        <a href="../index.html" style={{ color: t.accent, fontFamily: t.sans, fontSize: 14 }}>← All work</a>
      </section>
      <Footer t={t} pathPrefix="../" variant="minimal" />
    </SiteShell>
  );

  return (
    <SiteShell t={t}>
      <GlobalStyles />
      <Nav t={t} mode={viewerMode} onToggleMode={toggleMode} active="work" pathPrefix="../" />
      <ProjectHero t={t} p={p} />
      <ProjectBody t={t} p={p} />
      <ProjectGallery t={t} p={p} />
      <PrevNext t={t} p={p} />
      <Footer t={t} pathPrefix="../" />
      <TweaksPanel open={tweakOpen} tweaks={tweaks} setTweak={setTweak} t={t} />
    </SiteShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  contentLoaded(['SITE_INFO', 'PROJECTS'])
    ? <App />
    : <ContentMissing />
);
