import { Link } from 'react-router-dom';
import { Container, Section, SectionLabel, SectionTitle, Breadcrumbs } from '../ui/Layout';
import { C, FONT, TOKENS } from '../ui/tokens';
import Icons from '../ui/Icons';
import { PACKAGES } from '../data';

const PRICE_FACTORS = [
  { title: "Oblik poslovanja",    desc: "Paušal, obrt, d.o.o., j.d.o.o." },
  { title: "Broj zaposlenika",    desc: "Svaki zaposlenik zahtijeva mjesečne obračune" },
  { title: "PDV status",          desc: "Obveznici PDV-a imaju dodatne evidencije" },
  { title: "Količina dokumenata", desc: "Broj ulaznih i izlaznih računa mjesečno" },
];

export default function Pricing() {
  return (
    <div style={{ paddingTop: 100 }}>
      <Section>
        <Container>
          <Breadcrumbs items={[{ label: 'Naslovnica', to: '/' }, { label: 'Cjenik' }]} />

          <div className="pricing-header" style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel>Cjenik</SectionLabel>
            <SectionTitle>Pronađite paket za sebe</SectionTitle>
            <p style={{ color: C.textSecondary, maxWidth: 560, margin: '0 auto' }}>
              Cijena ovisi o obliku poslovanja, broju zaposlenika, PDV statusu i količini dokumenata.
            </p>
          </div>

          {/* Pricing cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 24, marginBottom: 64 }}>
            {PACKAGES.map((pkg, i) => (
              <div
                key={i}
                className="pricing-card"
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
                    className="pricing-popular-ribbon"
                    style={{
                      position: 'absolute', top: 16, right: -28,
                      background: C.gold, color: C.textPrimary,
                      fontSize: 11, fontWeight: 700, padding: '4px 32px',
                      transform: 'rotate(45deg)',
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
                    <div key={j} className="pricing-item" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                      <span style={{ color: pkg.highlight ? C.accentMid : C.accent, flexShrink: 0, marginTop: 2 }}><Icons.Check /></span>
                      <span style={{ fontSize: 14, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                  {pkg.notIncluded.map((item, j) => (
                    <div key={`no-${j}`} className="pricing-item" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, opacity: 0.45 }}>
                      <span style={{ flexShrink: 0, marginTop: 2, color: C.textTertiary }}>✕</span>
                      <span style={{ fontSize: 14, lineHeight: 1.5, textDecoration: 'line-through' }}>{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/kontakt"
                  className="pricing-cta-link"
                  style={{
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    padding: '14px 28px', minHeight: 52,
                    background: pkg.highlight ? C.gold : C.primary,
                    color: pkg.highlight ? C.textPrimary : C.textInverse,
                    borderRadius: TOKENS.radii.md, textDecoration: 'none',
                    fontFamily: FONT.body, fontWeight: 600, fontSize: 14,
                  }}
                >
                  <span className="pricing-show-mobile">Zatražite ponudu</span>
                  <span className="pricing-hide-mobile">Zatražite personaliziranu ponudu</span>
                </Link>
              </div>
            ))}
          </div>

          {/* What affects price */}
          <div
            className="pricing-factors-box"
            style={{
              background: C.bgSecondary,
              borderRadius: TOKENS.radii['2xl'],
              padding: '48px 40px', marginBottom: 48,
            }}
          >
            <h3 style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 600, marginBottom: 24, textAlign: 'center', color: C.textPrimary }}>
              Što utječe na cijenu?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 24 }}>
              {PRICE_FACTORS.map((item, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: C.textPrimary }}>{item.title}</h4>
                  <p style={{ fontSize: 14, color: C.textSecondary }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ color: C.textSecondary, marginBottom: 16 }}>
              Niste sigurni koji paket vam treba?
            </p>
            <Link
              to="/kontakt"
              className="pricing-bottom-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: FONT.body, fontWeight: 600, fontSize: 15,
                padding: '14px 28px', minHeight: 52, borderRadius: TOKENS.radii.md,
                background: C.primary, color: C.textInverse, textDecoration: 'none',
              }}
            >
              Zatražite personaliziranu ponudu <Icons.ArrowRight />
            </Link>
          </div>
        </Container>
      </Section>

      <style>{`
        .pricing-show-mobile { display: none; }
        .pricing-hide-mobile { display: inline; }

        @media (max-width: 640px) {
          .pricing-header { margin-bottom: 28px !important; }
          .pricing-card { padding: 20px 16px !important; }
          .pricing-item { margin-bottom: 8px !important; }
          .pricing-popular-ribbon {
            font-size: 9px !important;
            padding: 3px 22px !important;
            top: 10px !important;
            right: -22px !important;
          }
          .pricing-factors-box { padding: 24px 16px !important; }
          .pricing-bottom-btn { display: flex !important; width: 100% !important; justify-content: center !important; }
          .pricing-show-mobile { display: inline !important; }
          .pricing-hide-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}


