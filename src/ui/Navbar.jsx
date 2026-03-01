import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Icons from './Icons';
import { C, FONT, TOKENS } from './tokens';

const NAV_LINKS = [
  { label: 'Usluge', to: '/usluge' },
  { label: 'Cjenik', to: '/cjenik' },
  { label: 'O nama', to: '/o-nama' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Kontakt', to: '/kontakt' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close drawer on route change (handles clicking active link)
  const { pathname } = useLocation();
  useEffect(() => { setMobileOpen(false); }, [pathname]);  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const navLinkStyle = ({ isActive }) => ({
    fontFamily: FONT.body,
    fontSize: 14,
    lineHeight: 1.2,
    fontWeight: isActive ? 600 : 500,
    letterSpacing: '0.01em',
    color: isActive ? C.primary : C.textSecondary,
    textDecoration: 'none',
    borderBottom: isActive ? `2px solid ${C.accent}` : '2px solid transparent',
    paddingBottom: 8,
    transition: `color ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out},
                 border-color ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out}`,
    cursor: 'pointer',
  });

  return (
    <>
      {/* Skip to content */}
      <a href="#main-content" className="skip-link">
        Preskoči na sadržaj
      </a>

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: TOKENS.zIndex.sticky,
          background: scrolled ? 'rgba(250,251,252,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.borderDefault}` : '1px solid transparent',
          boxShadow: scrolled ? TOKENS.shadows.xs : 'none',
          transition: `background-color ${TOKENS.motion.duration.fast} ${TOKENS.motion.easing.out},
                       border-color ${TOKENS.motion.duration.fast} ${TOKENS.motion.easing.out},
                       box-shadow ${TOKENS.motion.duration.fast} ${TOKENS.motion.easing.out}`,
        }}
      >
        <div className="reditus-container" style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
            {/* Logo */}
            <Link to="/" className="ui-interactive" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: TOKENS.radii.md,
                  background: C.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: TOKENS.shadows.xs,
                }}
              >
                <span style={{ fontFamily: FONT.display, fontSize: 21, fontWeight: 700, color: C.textInverse }}>R</span>
              </div>
              <span style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 600, color: C.textPrimary }}>Reditus</span>
            </Link>

            {/* Desktop nav */}
            <nav
              aria-label="Glavna navigacija"
              className="reditus-desktop-nav"
              style={{ display: 'flex', alignItems: 'center', gap: 24 }}
            >
              {NAV_LINKS.map((l) => (
                <NavLink key={l.to} to={l.to} className="reditus-nav-link" style={navLinkStyle}>{l.label}</NavLink>
              ))}
              <Link
                to="/kontakt"
                className="navbar-cta btn-link-primary"
                style={{
                  fontFamily: FONT.body,
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: 1,
                  letterSpacing: '0.01em',
                  padding: '8px 18px',
                  minHeight: 40,
                  borderRadius: TOKENS.radii.md,
                  background: C.primary,
                  color: C.textInverse,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                Zatraži ponudu
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Otvori navigacijski izbornik"
              className="reditus-mobile-toggle ui-interactive"
              style={{
                background: 'none',
                border: 'none',
                borderRadius: TOKENS.radii.md,
                cursor: 'pointer',
                color: C.textPrimary,
                display: 'none',
                padding: 8,
                minHeight: 44,
                minWidth: 44,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icons.Menu />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigacijski izbornik"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: TOKENS.zIndex.overlay,
            background: 'rgba(20,23,27,0.5)',
            animation: `fadeIn ${TOKENS.motion.duration.fast} ${TOKENS.motion.easing.out}`,
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 'min(320px, 85vw)',
              background: C.bgSecondary,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: TOKENS.shadows.lg,
              animation: `slideInRight ${TOKENS.motion.duration.fast} ${TOKENS.motion.easing.out}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <span style={{ fontFamily: FONT.display, fontSize: 21, fontWeight: 600, color: C.textPrimary }}>
                Reditus
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Zatvori izbornik"
                className="ui-interactive"
                style={{
                  background: 'none',
                  border: 'none',
                  borderRadius: TOKENS.radii.md,
                  cursor: 'pointer',
                  padding: 8,
                  minHeight: 44,
                  minWidth: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: C.textPrimary,
                }}
              >
                <Icons.X />
              </button>
            </div>

            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="reditus-nav-link"
                style={({ isActive }) => ({
                  display: 'block',
                  padding: '16px 0',
                  fontSize: 16,
                  lineHeight: 1.35,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? C.primary : C.textPrimary,
                  textDecoration: 'none',
                  borderBottom: `1px solid ${C.borderDefault}`,
                  fontFamily: FONT.body,
                })}
              >
                {l.label}
              </NavLink>
            ))}

            <div style={{ marginTop: 24 }}>
              <Link
                to="/kontakt"
                onClick={() => setMobileOpen(false)}
                className="btn-link-primary navbar-cta"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '16px 24px',
                  minHeight: 56,
                  background: C.primary,
                  color: C.textInverse,
                  borderRadius: TOKENS.radii.md,
                  textDecoration: 'none',
                  fontFamily: FONT.body,
                  fontWeight: 600,
                  fontSize: 15,
                  letterSpacing: '0.01em',
                }}
              >
                Zatraži ponudu
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .reditus-desktop-nav { display: none !important; }
          .reditus-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
