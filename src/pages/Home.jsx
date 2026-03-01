import { Link } from 'react-router-dom';
import { Container, Section, SectionLabel, SectionTitle } from '../ui/Layout';
import { C, FONT, TOKENS } from '../ui/tokens';
import Icons from '../ui/Icons';
import { SERVICES, PACKAGES, TESTIMONIALS, BLOG_POSTS, PROCESS_STEPS } from '../data';
import Card from '../ui/Card';

// ----
const HOME_MOBILE_STYLES = `
  /* Base: show full label, hide short label */
  .home-show-mobile { display: none; }
  .home-hide-mobile { display: inline; }

  /* Base: desktop pricing visible, mobile pricing hidden */
  .home-pricing-desktop { display: block; }
  .home-pricing-mobile  { display: none; }

  /* Remove default summary marker for mobile pricing */
  .home-pricing-mobile summary { display: flex; align-items: center; cursor: pointer; }
  .home-pricing-mobile summary::-webkit-details-marker { display: none; }

  @media (max-width: 640px) {
    /* Hero */
    .home-hero { padding-top: 88px !important; padding-bottom: 48px !important; }

    /* Hero CTA buttons - stack vertically */
    .home-hero-cta-group { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; }
    .home-hero-cta-group > a { justify-content: center !important; width: 100% !important; }
    .home-hero-cta-secondary { padding: 12px 20px !important; min-height: 48px !important; }

    /* Section spacing — py-12 on mobile (layout override) */
    .reditus-section { padding-top: 48px !important; padding-bottom: 48px !important; }

    /* Hero h1 — tighter on mobile */
    .home-hero h1 { font-size: clamp(22px, 7vw, 28px) !important; line-height: 1.15 !important; }

    /* Benefit card padding on mobile */
    .home-benefit-card { padding: 20px 16px !important; }

    /* Section heading margin */
    .home-section-header { margin-bottom: 28px !important; }
    .home-process-header  { margin-bottom: 24px !important; }
    .home-process-grid { grid-template-columns: 1fr !important; }
    .home-process-grid-bottom { grid-template-columns: 1fr !important; max-width: 100% !important; }

    /* Pricing cards - less padding */
    .home-pricing-card { padding: 20px 16px !important; }
    .home-pricing-item { margin-bottom: 8px !important; }
    .home-service-card { padding: 24px 20px !important; gap: 12px !important; }

    /* POPULAR ribbon - less dominant on mobile */
    .home-popular-ribbon {
      font-size: 9px !important;
      padding: 3px 22px !important;
      top: 10px !important;
      right: -22px !important;
    }

    /* Pricing CTA - full width on mobile */
    .home-pricing-cta { width: 100% !important; }

    /* Toggle desktop/mobile pricing sections */
    .home-pricing-desktop { display: none !important; }
    .home-pricing-mobile  { display: flex !important; flex-direction: column !important; gap: 12px !important; }

    /* CTA strip buttons - stack on mobile */
    .home-cta-strip-btns { flex-direction: column !important; align-items: stretch !important; }
    .home-cta-strip-btns > a { justify-content: center !important; width: 100% !important; box-sizing: border-box !important; }

    /* Responsive button label */
    .home-show-mobile { display: inline !important; }
    .home-hide-mobile { display: none !important; }
  }
`;

// ----
function MobilePricingCard({ pkg }) {
  const keyItems = pkg.included.slice(0, 3);
  const restItems = pkg.included.slice(3);
  return (
    <div style={{
      background: pkg.highlight ? C.primary : C.bgElevated,
      color: pkg.highlight ? C.textInverse : C.textPrimary,
      borderRadius: TOKENS.radii.xl,
      padding: '20px 16px',
      border: pkg.highlight ? 'none' : `1px solid ${C.borderDefault}`,
      boxShadow: pkg.highlight ? TOKENS.shadows.lg : 'none',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          color: pkg.highlight ? C.accentMid : C.accent,
        }}>
          {pkg.target}
        </span>
        {pkg.highlight && (
          <span style={{
            fontSize: 10, fontWeight: 700, background: C.gold,
            color: C.textPrimary, padding: '2px 8px', borderRadius: TOKENS.radii.full,
          }}>
            POPULAR
          </span>
        )}
      </div>
      <h3 style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 600, marginBottom: 2 }}>{pkg.name}</h3>
      <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 14, opacity: 0.8 }}>
        {pkg.fromPrice === 'Po dogovoru' ? 'Po dogovoru' : `od ${pkg.fromPrice} €/mj`}
      </p>

      {keyItems.map((item, j) => (
        <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
          <span style={{ color: pkg.highlight ? C.accentMid : C.accent, flexShrink: 0, marginTop: 2 }}><Icons.Check /></span>
          <span style={{ fontSize: 13, lineHeight: 1.4 }}>{item}</span>
        </div>
      ))}

      {restItems.length > 0 && (
        <details style={{ marginTop: 4 }}>
          <summary style={{
            fontSize: 13, fontWeight: 600,
            color: pkg.highlight ? C.accentMid : C.accent,
            gap: 4, userSelect: 'none',
          }}>
            + još {restItems.length} stavki
          </summary>
          <div style={{ paddingTop: 8 }}>
            {restItems.map((item, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                <span style={{ color: pkg.highlight ? C.accentMid : C.accent, flexShrink: 0, marginTop: 2 }}><Icons.Check /></span>
                <span style={{ fontSize: 13, lineHeight: 1.4 }}>{item}</span>
              </div>
            ))}
          </div>
        </details>
      )}

      <Link
        to="/kontakt"
        style={{
          display: 'block', textAlign: 'center',
          padding: '12px 20px', marginTop: 16,
          background: pkg.highlight ? C.gold : C.primary,
          color: pkg.highlight ? C.textPrimary : C.textInverse,
          borderRadius: TOKENS.radii.md, textDecoration: 'none',
          fontFamily: FONT.body, fontWeight: 600, fontSize: 14,
        }}
      >
        Zatraži ponudu
      </Link>
    </div>
  );
}

// ----
function TestimonialCard({ t }) {
  return (
    <div style={{
      background: C.bgElevated, borderRadius: TOKENS.radii.xl,
      padding: '32px 28px', border: `1px solid ${C.borderDefault}`,
      flex: '1 1 280px', minWidth: 'min(280px, 100%)',
      display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <div style={{ display: 'flex', gap: 2 }}>
        {[...Array(t.rating)].map((_, i) => <Icons.Star key={i} />)}
      </div>
      <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.7, flex: 1, fontStyle: 'italic' }}>
        "{t.quote}"
      </p>
      <div>
        <p style={{ fontWeight: 600, fontSize: 15, color: C.textPrimary }}>{t.name}</p>
        <p style={{ fontSize: 13, color: C.textTertiary }}>{t.business}</p>
      </div>
    </div>
  );
}

// ----
function ServiceCard({ s, index }) {
  const Icon = Icons[s.icon];
  return (
    <Link
      to="/usluge"
      className={`fade-up stagger-${index + 1} home-service-card mob-card`}
      style={{
        background: C.bgElevated, borderRadius: TOKENS.radii.xl,
        padding: '32px 28px', border: `1px solid ${C.borderDefault}`,
        cursor: 'pointer', textDecoration: 'none', color: 'inherit',
        display: 'flex', flexDirection: 'column', gap: 16,
        transition: `all ${TOKENS.motion.duration.micro} ease`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = TOKENS.shadows.lg;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: TOKENS.radii.lg,
        background: C.primaryLight,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: C.primary,
      }}>
        {Icon && <Icon />}
      </div>
      <h3 style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 600, color: C.textPrimary }}>{s.title}</h3>
      <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.6 }}>{s.desc}</p>
      <span style={{ fontSize: 13, color: C.accent, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, marginTop: 'auto' }}>
        Saznaj više <Icons.ArrowRight />
      </span>
    </Link>
  );
}

const BENEFITS = [
  { icon: 'Clock',    title: 'Jasni rokovi i podsjetnici',   desc: 'Nikada ne propuštate porezne obveze ili važne rokove.' },
  { icon: 'FileText', title: 'Mjesečni pregled obveza',       desc: 'Redovito dobivate pregled doprinosa, poreza i obveza.' },
  { icon: 'Shield',   title: 'Digitalna razmjena dokumenata', desc: 'Brza i jednostavna razmjena dokumentacije bez papirologije.' },
  { icon: 'Phone',    title: 'Kratki odgovori i podrška',     desc: 'Jasna komunikacija i brzi odgovori na vaša pitanja.' },
];

// ----
function PricingCard({ pkg, index }) {
  return (
    <div
      className={`scale-in stagger-${index + 1} home-pricing-card`}
      style={{
        background: pkg.highlight ? C.primary : C.bgElevated,
        color: pkg.highlight ? C.textInverse : C.textPrimary,
        borderRadius: TOKENS.radii['2xl'],
        padding: '36px 28px',
        border: pkg.highlight ? 'none' : `1px solid ${C.borderDefault}`,
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
        boxShadow: pkg.highlight ? TOKENS.shadows.xl : 'none',
      }}
    >
      {pkg.highlight && (
        <span
          className="home-popular-ribbon"
          style={{
            position: 'absolute', top: 16, right: -28,
            background: C.gold, color: C.textPrimary,
            fontSize: 11, fontWeight: 700, padding: '4px 32px',
            transform: 'rotate(45deg)', letterSpacing: '0.05em',
          }}
        >
          POPULAR
        </span>
      )}
      <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: pkg.highlight ? C.accentMid : C.accent, marginBottom: 8 }}>
        {pkg.target}
      </p>
      <h3 style={{ fontFamily: FONT.display, fontSize: 28, fontWeight: 600, marginBottom: 4 }}>{pkg.name}</h3>
      <p style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 600, marginBottom: 24, opacity: 0.85 }}>
        {pkg.fromPrice === 'Po dogovoru' ? 'Po dogovoru' : `od ${pkg.fromPrice} €/mj`}
      </p>
      <div style={{ flex: 1, marginBottom: 24 }}>
        {pkg.included.map((item, j) => (
          <div key={j} className="home-pricing-item" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
            <span style={{ color: pkg.highlight ? C.accentMid : C.accent, flexShrink: 0, marginTop: 2 }}><Icons.Check /></span>
            <span style={{ fontSize: 14, lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
      <Link
        to="/kontakt"
        className="home-pricing-cta"
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          padding: '14px 28px', minHeight: 52,
          background: pkg.highlight ? C.gold : C.primary,
          color: pkg.highlight ? C.textPrimary : C.textInverse,
          borderRadius: TOKENS.radii.md, textDecoration: 'none',
          fontFamily: FONT.body, fontWeight: 600, fontSize: 14,
        }}
      >
        <span className="home-show-mobile">Zatražite ponudu</span>
        <span className="home-hide-mobile">Zatražite personaliziranu ponudu</span>
      </Link>
    </div>
  );
}

// ----
export default function Home() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <style>{HOME_MOBILE_STYLES}</style>

      {/* ---- */}
      <section
        className="home-hero"
        style={{
          paddingTop: 140, paddingBottom: 100,
          background: `linear-gradient(165deg, ${C.bgSecondary} 0%, ${C.bgTertiary} 50%, rgba(26,143,110,0.08) 100%)`,
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 'min(300px, 60vw)', height: 'min(300px, 60vw)',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(27,58,92,0.06) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <Container>
          {/* FIX 3: explicit width + overflow guard on the inner content wrapper */}
          <div style={{ maxWidth: 720, width: '100%', boxSizing: 'border-box', overflowX: 'hidden' }} className="fade-up">
            <SectionLabel>Knjigovodstveni servis Trogir</SectionLabel>
            <h1 style={{
              fontFamily: FONT.display,
              fontSize: 'clamp(26px, 5.5vw, 60px)',
              fontWeight: 600, lineHeight: 1.12, color: C.textPrimary, marginBottom: 24, maxWidth: '100%',
              overflowWrap: 'break-word',
            }}>
              Računovodstvo koje<br />
              <span style={{ color: C.accent }}>radi za vas</span>
            </h1>
            {/* FIX 2: add width: '100%' so maxWidth 560 can't push past the container */}
            <p style={{ fontSize: 'clamp(16px, 4.5vw, 18px)', color: C.textSecondary, lineHeight: 1.7, width: '100%', maxWidth: 560, marginBottom: 36 }}>
              Prepustite nam knjige, prijave i rokove. Vi se fokusirajte na ono u čemu ste najbolji - vođenje svog posla.
            </p>
            <div className="home-hero-cta-group" style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {/* FIX 4: boxSizing + maxWidth on each CTA so padding never overflows */}
              <Link to="/kontakt" className="home-hero-cta-primary" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: FONT.body, fontWeight: 600, fontSize: 15,
                padding: '14px 28px', minHeight: 52, borderRadius: TOKENS.radii.md,
                background: C.primary, color: C.textInverse, textDecoration: 'none',
                boxSizing: 'border-box', maxWidth: '100%',
              }}>
                Zatraži ponudu <Icons.ArrowRight />
              </Link>
              <Link to="/kontakt" className="home-hero-cta-secondary" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: FONT.body, fontWeight: 600, fontSize: 15,
                padding: '14px 28px', minHeight: 52, borderRadius: TOKENS.radii.md,
                background: 'transparent', color: C.primary,
                border: `1.5px solid ${C.primary}`, textDecoration: 'none',
                boxSizing: 'border-box', maxWidth: '100%',
              }}>
                Dogovori besplatan poziv
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- */}
      <Section bg={C.bgSecondary}>
        <Container>
          <div className="home-section-header" style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>Što dobivate</SectionLabel>
            <SectionTitle>Što dobivate suradnjom s nama</SectionTitle>
            <p style={{ color: C.textSecondary, maxWidth: 520, margin: '0 auto' }}>
              Strukturirano, jasno i bez neugodnih iznenađenja.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 24 }}>
            {BENEFITS.map((b, i) => {
              const BIcon = Icons[b.icon];
              return (
              <Card key={i} className="home-benefit-card" style={{ padding: '28px 24px' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: TOKENS.radii.md,
                  background: C.primaryLight,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: C.primary, marginBottom: 16,
                }}>
                  {BIcon ? <BIcon /> : <Icons.Check />}
                </div>
                <h3 style={{ fontFamily: FONT.display, fontSize: 18, fontWeight: 600, color: C.textPrimary, marginBottom: 8 }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.6 }}>
                  {b.desc}
                </p>
              </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ---- */}
      <Section>
        <Container>
          <div className="home-section-header" style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>Usluge</SectionLabel>
            <SectionTitle>Sve što vam treba na jednom mjestu</SectionTitle>
            <p style={{ color: C.textSecondary, maxWidth: 560, margin: '0 auto' }}>
              Od paušalnog obrta do d.o.o. s ekipom - imamo paket za svaki oblik poslovanja.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: 24 }}>
            {SERVICES.map((s, i) => <ServiceCard key={s.slug} s={s} index={i} />)}
          </div>
        </Container>
      </Section>

      {/* ---- */}
      <Section bg={C.bgTertiary}>
        <Container>
          <div className="home-process-header" style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel>Kako radimo</SectionLabel>
            <SectionTitle>Od prvog kontakta do potpunog mira</SectionTitle>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="home-process-grid">
            {PROCESS_STEPS.slice(0, 3).map((step, i) => (
              <div key={i} className={`fade-up stagger-${i + 1}`} style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: FONT.display, fontSize: 48, fontWeight: 700, color: 'rgba(27,58,92,0.1)', display: 'block', marginBottom: 8 }}>
                  {step.num}
                </span>
                <h3 style={{ fontFamily: FONT.display, fontSize: 19, fontWeight: 600, marginBottom: 8, color: C.textPrimary }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32, maxWidth: '66.6%', margin: '32px auto 0' }} className="home-process-grid-bottom">
            {PROCESS_STEPS.slice(3).map((step, i) => (
              <div key={i} className={`fade-up stagger-${i + 4}`} style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: FONT.display, fontSize: 48, fontWeight: 700, color: 'rgba(27,58,92,0.1)', display: 'block', marginBottom: 8 }}>
                  {step.num}
                </span>
                <h3 style={{ fontFamily: FONT.display, fontSize: 19, fontWeight: 600, marginBottom: 8, color: C.textPrimary }}>{step.title}</h3>
                <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- */}
      <Section>
        <Container>
          <div className="home-section-header" style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>Cjenik</SectionLabel>
            <SectionTitle>Transparentne cijene, bez iznenađenja</SectionTitle>
          </div>

          {/* Desktop pricing cards (hidden on mobile via CSS) */}
          <div className="home-pricing-desktop">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 24 }}>
              {PACKAGES.map((pkg, i) => <PricingCard key={i} pkg={pkg} index={i} />)}
            </div>
          </div>

          {/* Mobile compact pricing (hidden on desktop via CSS) */}
          <div className="home-pricing-mobile">
            {PACKAGES.map((pkg, i) => <MobilePricingCard key={i} pkg={pkg} />)}
          </div>

          <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: C.textTertiary }}>
            Cijene su okvirne. Točnu ponudu šaljemo nakon besplatne procjene vaših potreba.
          </p>
        </Container>
      </Section>

      {/* ---- */}
      <Section>
        <Container>
          <div className="home-section-header" style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>Iskustva klijenata</SectionLabel>
            <SectionTitle>Što kažu naši klijenti</SectionTitle>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} />)}
          </div>
        </Container>
      </Section>

      {/* ---- */}
      <Section>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <SectionLabel>Blog</SectionLabel>
              <SectionTitle style={{ marginBottom: 0 }}>Savjeti i novosti</SectionTitle>
            </div>
            <Link to="/blog" style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontFamily: FONT.body, fontWeight: 600, fontSize: 14,
              color: C.primary, textDecoration: 'none',
            }}>
              Svi članci <Icons.ArrowRight />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 24 }}>
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <article
                key={i}
                className={`fade-up stagger-${i + 1} mob-card`}
                style={{
                  background: C.bgElevated, borderRadius: TOKENS.radii.xl,
                  overflow: 'hidden', border: `1px solid ${C.borderDefault}`,
                  transition: `all ${TOKENS.motion.duration.micro} ease`,
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = TOKENS.shadows.md; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ height: 8, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})` }} />
                <div style={{ padding: '24px 24px 28px' }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: C.accent, background: C.accentLight, padding: '4px 10px', borderRadius: TOKENS.radii.full }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: 12, color: C.textTertiary }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontFamily: FONT.display, fontSize: 18, fontWeight: 600, lineHeight: 1.35, marginBottom: 8, color: C.textPrimary }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6 }}>{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- */}
      <Section bg={C.bgInverse} style={{ padding: '64px 0' }}>
        <Container>
          <div style={{ textAlign: 'center', color: C.textInverse }}>
            <SectionTitle light>Spremni za promjenu?</SectionTitle>
            <p style={{ fontSize: 17, opacity: 0.85, maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7 }}>
              Zatražite besplatnu procjenu i saznajte koliko vas košta mir - manje nego što mislite.
            </p>
            <div className="home-cta-strip-btns" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
              <Link to="/kontakt" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: FONT.body, fontWeight: 600, fontSize: 15,
                padding: '14px 28px', minHeight: 52, borderRadius: TOKENS.radii.md,
                background: C.gold, color: C.textPrimary, textDecoration: 'none',
              }}>
                Zatraži ponudu <Icons.ArrowRight />
              </Link>
              <Link to="/kontakt" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: FONT.body, fontWeight: 600, fontSize: 15,
                padding: '14px 28px', minHeight: 52, borderRadius: TOKENS.radii.md,
                background: 'transparent', color: C.textInverse,
                border: '1.5px solid rgba(255,255,255,0.35)', textDecoration: 'none',
              }}>
                Pošalji upit
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

