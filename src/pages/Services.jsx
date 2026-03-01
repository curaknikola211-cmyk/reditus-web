import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Section, SectionLabel, SectionTitle, Breadcrumbs } from '../ui/Layout';
import Accordion from '../ui/Accordion';
import { C, FONT, TOKENS } from '../ui/tokens';
import Icons from '../ui/Icons';
import { SERVICES, FAQ_DATA } from '../data';

const INCLUDE_LIST = null; // Replaced by service.includes from data.js


export default function Services() {
  const [selected, setSelected] = useState(0);
  const service = SERVICES[selected];
  const Icon = Icons[service.icon];

  return (
    <div style={{ paddingTop: 100, overflowX: 'hidden' }}>
      <Section style={{ paddingBottom: 0 }}>
        <Container>
          <Breadcrumbs items={[{ label: 'Naslovnica', to: '/' }, { label: 'Usluge' }]} />
          <SectionLabel>Naše usluge</SectionLabel>
          <SectionTitle style={{ maxWidth: '100%', lineHeight: 1.12, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
            Knjigovodstvo prilagođeno vašem poslovanju
          </SectionTitle>
          <p className="svc-intro" style={{ color: C.textSecondary, maxWidth: 600, marginBottom: 48 }}>
            Svaki oblik poslovanja ima specifične zahtjeve. Odaberite uslugu koja odgovara vašim potrebama.
          </p>
        </Container>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <Container>
          {/* Service tabs */}
          <div
            className="svc-tabs-wrap"
            style={{
              display: 'flex', flexWrap: 'wrap', gap: 8,
              marginBottom: 48, borderBottom: `2px solid ${C.borderDefault}`,
            }}
          >
            {SERVICES.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  fontFamily: FONT.body, fontSize: 14,
                  fontWeight: selected === i ? 600 : 400,
                  padding: '12px 20px', minHeight: 44,
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: selected === i ? C.primary : C.textSecondary,
                  borderBottom: selected === i ? `3px solid ${C.primary}` : '3px solid transparent',
                  transition: `all ${TOKENS.motion.duration.micro} ease`,
                  marginBottom: -2,
                  whiteSpace: 'nowrap',
                }}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Selected service detail */}
          <div
            key={selected}
            className="fade-in services-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}
          >
            <div>
              <div style={{
                width: 64, height: 64, borderRadius: TOKENS.radii.xl,
                background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: C.primary, marginBottom: 24,
              }}>
                {Icon && <Icon />}
              </div>
              <h2 className="svc-h2" style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 600, lineHeight: 1.15, maxWidth: '100%', marginBottom: 12, color: C.textPrimary, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                {service.title}
              </h2>
              <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.7, marginBottom: 24 }}>
                {service.desc}
              </p>

              <div className="svc-who-card" style={{ background: C.bgTertiary, borderRadius: TOKENS.radii.lg, padding: 24, marginBottom: 24 }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: C.primary }}>Za koga je ova usluga?</h4>
                <p style={{ fontSize: 15, color: C.textSecondary }}>{service.audience}</p>
              </div>

              <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: C.textPrimary }}>Što je uključeno:</h4>
              {(service.includes || []).map((item, i) => (
                <div key={i} className="svc-include-item" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: C.accent }}><Icons.Check /></span>
                  <span style={{ fontSize: 15, color: C.textSecondary }}>{item}</span>
                </div>
              ))}

              <div style={{ marginTop: 32 }}>
                <Link
                  to="/kontakt"
                  className="svc-cta-link"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    fontFamily: FONT.body, fontWeight: 600, fontSize: 14,
                    padding: '10px 22px', minHeight: 44, borderRadius: TOKENS.radii.md,
                    background: C.primary, color: C.textInverse, textDecoration: 'none',
                  }}
                >
                  Zatraži ponudu za {service.title.toLowerCase()} <Icons.ArrowRight />
                </Link>
              </div>
            </div>

            <div
              className="svc-faq-panel"
              style={{
                background: C.bgElevated, borderRadius: TOKENS.radii.xl,
                border: `1px solid ${C.borderDefault}`, padding: 32,
              }}
            >
              <h4 style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 600, marginBottom: 20, color: C.textPrimary }}>
                Česta pitanja
              </h4>
              <Accordion items={FAQ_DATA.slice(0, 3)} />
            </div>
          </div>
        </Container>
      </Section>

      <style>{`
        @media (max-width: 768px) {
          .services-grid,
          div[style*="grid-template-columns: 1fr 1fr"][style*="gap: 64"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 640px) {
          .svc-intro  { margin-bottom: 28px !important; }
          .svc-tabs-wrap {
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            margin-bottom: 28px !important;
            gap: 0 !important;
          }
          .svc-tabs-wrap::-webkit-scrollbar { display: none; }
          .svc-tabs-wrap button {
            font-size: 12px !important;
            padding: 10px 12px !important;
            flex-shrink: 0 !important;
          }
          .svc-h2 {
            font-size: 24px !important;
            line-height: 1.1 !important;
            max-width: 100% !important;
            overflow-wrap: anywhere !important;
            word-break: break-word !important;
          }
          .svc-who-card { padding: 20px !important; }
          .svc-include-item { margin-bottom: 8px !important; }
          .svc-faq-panel { padding: 20px !important; }
          .svc-cta-link { display: flex !important; width: 100% !important; }
        }
      `}</style>
    </div>
  );
}


