import { Link } from 'react-router-dom';
import Icons from './Icons';
import { C, FONT, TOKENS } from './tokens';
import { SERVICES } from '../data';

const footerText = {
  fontSize: 14,
  lineHeight: 1.7,
  color: 'rgba(235,237,240,0.7)',
  fontFamily: FONT.body,
};

export default function Footer() {
  const linkStyle = {
    display: 'block',
    fontSize: 14,
    lineHeight: 1.5,
    color: 'rgba(235,237,240,0.72)',
    textDecoration: 'none',
    marginBottom: 8,
    padding: '4px 0',
    fontFamily: FONT.body,
    transition: `color ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out}`,
  };

  const headingStyle = {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: 16,
    color: C.accentMid,
    fontFamily: FONT.body,
  };

  return (
    <footer style={{ background: C.bgInverse, color: C.textInverse, padding: '72px 0 32px', overflowX: 'hidden' }}>
      <div className="reditus-container" style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: TOKENS.radii.md,
                  background: C.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: TOKENS.shadows.sm,
                }}
              >
                <span style={{ fontFamily: FONT.display, fontSize: 19, fontWeight: 700, color: C.textInverse }}>R</span>
              </div>
              <span style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 600 }}>Reditus</span>
            </div>
            <p style={{ ...footerText, maxWidth: 280 }}>
              Pouzdano knjigovodstvo za obrtnike i tvrtke. Trogir &amp; cijela Hrvatska.
            </p>
          </div>

          {/* Usluge */}
          <div>
            <h4 style={headingStyle}>Usluge</h4>
            {SERVICES.slice(0, 4).map((s) => (
              <Link key={s.slug} to="/usluge" className="ui-interactive" style={linkStyle}>{s.title}</Link>
            ))}
          </div>

          {/* Tvrtka */}
          <div>
            <h4 style={headingStyle}>Tvrtka</h4>
            {[
              { label: 'O nama', to: '/o-nama' },
              { label: 'Blog', to: '/blog' },
              { label: 'Cjenik', to: '/cjenik' },
              { label: 'FAQ', to: '/faq' },
              { label: 'Kontakt', to: '/kontakt' },
            ].map((item) => (
              <Link key={item.to} to={item.to} className="ui-interactive" style={linkStyle}>{item.label}</Link>
            ))}
          </div>

          {/* Kontakt */}
          <div>
            <h4 style={headingStyle}>Kontakt</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { Icon: Icons.MapPin, text: 'Trogir, Hrvatska' },
                { Icon: Icons.Phone, text: '+385 97 665 8870' },
                { Icon: Icons.Mail, text: 'reditus.hr@gmail.com' },
              ].map(({ Icon, text }) => (
                <span key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, ...footerText }}>
                  <Icon />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(235,237,240,0.12)',
            paddingTop: 24,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <p style={{ fontSize: 13, color: 'rgba(235,237,240,0.45)', fontFamily: FONT.body }}>
            © 2026 Reditus. Sva prava pridržana.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <a
              href="#"
              className="ui-interactive"
              style={{ fontSize: 13, color: 'rgba(235,237,240,0.45)', textDecoration: 'none', fontFamily: FONT.body }}
            >
              Politika privatnosti
            </a>
            <a
              href="#"
              className="ui-interactive"
              style={{ fontSize: 13, color: 'rgba(235,237,240,0.45)', textDecoration: 'none', fontFamily: FONT.body }}
            >
              Uvjeti korištenja
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
