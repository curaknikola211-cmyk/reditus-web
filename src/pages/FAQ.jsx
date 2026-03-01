import { Link } from 'react-router-dom';
import { Container, Section, SectionLabel, SectionTitle, Breadcrumbs } from '../ui/Layout';
import Accordion from '../ui/Accordion';
import { C, FONT, TOKENS } from '../ui/tokens';
import Icons from '../ui/Icons';
import { FAQ_DATA } from '../data';

export default function FAQ() {
  return (
    <div style={{ paddingTop: 100 }}>
      <Section>
        <Container narrow>
          <Breadcrumbs items={[{ label: 'Naslovnica', to: '/' }, { label: 'Česta pitanja' }]} />

          <div className="faq-header" style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>FAQ</SectionLabel>
            <SectionTitle>Česta pitanja</SectionTitle>
            <p style={{ color: C.textSecondary, maxWidth: 500, margin: '0 auto' }}>
              Pronađite odgovore na najčešća pitanja o našim uslugama, cijenama i procesu rada.
            </p>
          </div>

          <Accordion items={FAQ_DATA} />

          {/* CTA if question not found */}
          <div
            className="faq-cta-box"
            style={{
              textAlign: 'center', marginTop: 48,
              background: C.bgTertiary, borderRadius: TOKENS.radii.xl, padding: 40,
            }}
          >
            <h3 style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 600, marginBottom: 8, color: C.textPrimary }}>
              Niste pronašli odgovor?
            </h3>
            <p style={{ color: C.textSecondary, marginBottom: 20 }}>
              Pošaljite nam upit i odgovorit ćemo vam unutar 24 sata.
            </p>
            <Link
              to="/kontakt"
              className="faq-cta-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: FONT.body, fontWeight: 600, fontSize: 14,
                padding: '10px 22px', minHeight: 44, borderRadius: TOKENS.radii.md,
                background: C.primary, color: C.textInverse, textDecoration: 'none',
              }}
            >
              Kontaktirajte nas <Icons.ArrowRight />
            </Link>
          </div>
        </Container>
      </Section>

      <style>{`
        @media (max-width: 640px) {
          .faq-header  { margin-bottom: 28px !important; }
          .faq-cta-box { padding: 24px 20px !important; margin-top: 32px !important; }
          .faq-cta-btn { display: flex !important; width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
