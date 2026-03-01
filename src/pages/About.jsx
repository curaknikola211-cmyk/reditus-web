import { Link } from 'react-router-dom';
import { Container, Section, SectionLabel, SectionTitle, Breadcrumbs } from '../ui/Layout';
import { C, FONT, TOKENS } from '../ui/tokens';
import Icons from '../ui/Icons';

const VALUES = [
  { title: "Točnost",      desc: "Svaka prijava i svaki iznos — provjereni i točni." },
  { title: "Rokovi",       desc: "Nikada propušten rok. Period." },
  { title: "Povjerljivost",desc: "Vaši podaci su sigurni i zaštićeni." },
  { title: "Dostupnost",   desc: "Odgovori unutar 24 sata, svaki dan." },
];

export default function About() {
  return (
    <div style={{ paddingTop: 100 }}>
      <Section>
        <Container narrow>
          <Breadcrumbs items={[{ label: 'Naslovnica', to: '/' }, { label: 'O nama' }]} />

          <SectionLabel>O nama</SectionLabel>
          <h1 style={{
            fontFamily: FONT.display,
            fontSize: 'clamp(32px, 4.5vw, 48px)',
            fontWeight: 600, lineHeight: 1.2, marginBottom: 24, color: C.textPrimary,
          }}>
            Knjigovodstvo s<br />
            <span style={{ color: C.accent }}>ljudskim pristupom</span>
          </h1>

          <p style={{ fontSize: 17, color: C.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
            Reditus je knjigovodstveni servis iz Trogira osnovan s jasnom misijom: pružiti pouzdano, transparentno i dostupno računovodstvo malim poduzetnicima i obrtnicima.
          </p>
          <p className="about-lead-p" style={{ fontSize: 17, color: C.textSecondary, lineHeight: 1.8, marginBottom: 48 }}>
            Naš tim spaja višegodišnje iskustvo s modernim alatima i digitalnim pristupom. Nema papirnatih gomila, nema izgubljenih rokova — samo točni brojevi i jasan pregled vašeg poslovanja.
          </p>

          {/* Values grid */}
          <div className="about-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: 24, marginBottom: 64 }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{
                background: C.bgTertiary, borderRadius: TOKENS.radii.lg,
                padding: 24, textAlign: 'center',
              }}>
                <h4 style={{ fontFamily: FONT.display, fontSize: 18, fontWeight: 600, marginBottom: 8, color: C.textPrimary }}>
                  {v.title}
                </h4>
                <p style={{ fontSize: 14, color: C.textSecondary }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA box */}
          <div
            className="about-cta-box"
            style={{
              background: C.primary, borderRadius: TOKENS.radii['2xl'],
              padding: '48px 40px', color: C.textInverse, textAlign: 'center',
            }}
          >
            <h3 style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 600, marginBottom: 12 }}>
              Spremni za suradnju?
            </h3>
            <p style={{ opacity: 0.85, marginBottom: 24, maxWidth: 400, margin: '0 auto 24px', lineHeight: 1.7 }}>
              Javite nam se i saznajte kako vam možemo olakšati poslovanje.
            </p>
            <Link
              to="/kontakt"
              className="about-cta-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: FONT.body, fontWeight: 600, fontSize: 14,
                padding: '10px 22px', minHeight: 44, borderRadius: TOKENS.radii.md,
                background: C.gold, color: C.textPrimary, textDecoration: 'none',
              }}
            >
              Kontaktirajte nas <Icons.ArrowRight />
            </Link>
          </div>
        </Container>
      </Section>

      <style>{`
        @media (max-width: 640px) {
          .about-lead-p      { margin-bottom: 28px !important; }
          .about-values-grid { margin-bottom: 36px !important; }
          .about-cta-box     { padding: 28px 20px !important; }
          .about-cta-btn     { display: flex !important; width: 100% !important; justify-content: center !important; }
        }
      `}</style>
    </div>
  );
}
