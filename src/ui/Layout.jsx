import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Button from './Button';
import { C, FONT, TOKENS } from './tokens';
import { BLOG_POSTS, FAQ_DATA } from '../data';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.reditus.hr').replace(/\/+$/, '');

const ROUTE_META = {
  '/': {
    title: 'Reditus | Računovodstveni ured Trogir',
    description: 'Reditus je računovodstveni ured u Trogiru za paušalne obrte, obrte i d.o.o. tvrtke.',
  },
  '/usluge': {
    title: 'Usluge | Reditus',
    description: 'Računovodstvene usluge za paušalni obrt, obrt, d.o.o. i obračun plaća.',
  },
  '/cjenik': {
    title: 'Cjenik | Reditus',
    description: 'Pogledajte transparentne pakete i cijene računovodstvenih usluga Reditus.',
  },
  '/o-nama': {
    title: 'O nama | Reditus',
    description: 'Upoznajte Reditus tim i naš pristup jasnom, točnom i pravovremenom računovodstvu.',
  },
  '/kontakt': {
    title: 'Kontakt | Reditus',
    description: 'Kontaktirajte Reditus i zatražite ponudu za računovodstvene usluge.',
  },
  '/faq': {
    title: 'FAQ | Reditus',
    description: 'Odgovori na najčešća pitanja o suradnji, cijenama i načinu rada.',
  },
  '/blog': {
    title: 'Blog | Reditus',
    description: 'Savjeti, novosti i praktični vodiči o računovodstvu, porezima i poslovanju.',
  },
};

const GLOBAL_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AccountingService',
      name: 'Reditus',
      url: `${SITE_URL}/`,
      email: 'reditus.hr@gmail.com',
      telephone: '+385976658870',
      priceRange: 'EUR',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Trogir',
        addressCountry: 'HR',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Croatia',
      },
      inLanguage: 'hr-HR',
    },
    {
      '@type': 'WebSite',
      name: 'Reditus',
      url: `${SITE_URL}/`,
      inLanguage: 'hr-HR',
    },
  ],
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function getMetaForPath(pathname) {
  const path = normalizePath(pathname);

  if (path.startsWith('/blog/')) {
    const slug = path.split('/').filter(Boolean)[1];
    const post = BLOG_POSTS.find((item) => item.slug === slug);

    if (post) {
      return {
        title: `${post.title} | Reditus Blog`,
        description: post.excerpt,
        path,
        ogType: 'article',
        robots: 'index, follow',
      };
    }

    return {
      ...ROUTE_META['/blog'],
      path: '/blog',
      ogType: 'website',
      robots: 'noindex, follow',
    };
  }

  return {
    ...(ROUTE_META[path] || ROUTE_META['/']),
    path,
    ogType: 'website',
    robots: 'index, follow',
  };
}

function upsertMeta(attribute, key, value) {
  const selector = `meta[${attribute}="${key}"]`;
  const found = Array.from(document.head.querySelectorAll(selector));
  const element = found[0] || document.createElement('meta');

  if (!found[0]) {
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  found.slice(1).forEach((node) => node.remove());
  element.setAttribute('content', value);
}

function upsertCanonical(href) {
  const found = Array.from(document.head.querySelectorAll('link[rel="canonical"]'));
  const element = found[0] || document.createElement('link');

  if (!found[0]) {
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  found.slice(1).forEach((node) => node.remove());
  element.setAttribute('href', href);
}

function upsertJsonLd(id, payload) {
  const existing = document.getElementById(id);

  if (!payload) {
    if (existing) existing.remove();
    return;
  }

  const script = existing || document.createElement('script');
  if (!existing) {
    script.type = 'application/ld+json';
    script.id = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(payload);
}

function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getMetaForPath(pathname);
    const canonicalUrl = `${SITE_URL}${meta.path === '/' ? '/' : meta.path}`;

    document.title = meta.title;

    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', meta.robots);

    upsertMeta('property', 'og:type', meta.ogType);
    upsertMeta('property', 'og:locale', 'hr_HR');
    upsertMeta('property', 'og:site_name', 'Reditus');
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', canonicalUrl);

    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);

    upsertCanonical(canonicalUrl);
    upsertJsonLd('seo-jsonld-global', GLOBAL_SCHEMA);
    upsertJsonLd('seo-jsonld-page', meta.path === '/faq' ? FAQ_SCHEMA : null);
  }, [pathname]);

  return null;
}

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [pathname]);
  return null;
}

function MobileCtaBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  if (pathname === '/kontakt') return null;

  return (
    <div
      className="layout-mobile-cta"
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: TOKENS.zIndex.toast,
        background: C.bgSecondary,
        borderTop: `1px solid ${C.borderDefault}`,
        boxShadow: TOKENS.shadows.md,
        padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <Button size="sm" fullWidth onClick={() => { window.location.href = 'tel:+385976658870'; }}>
          Nazovi
        </Button>
        <Button size="sm" variant="secondary" fullWidth onClick={() => navigate('/kontakt')}>
          Pošalji upit
        </Button>
      </div>
    </div>
  );
}

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SeoManager />
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="layout-main" style={{ flex: 1 }}>
        <Outlet />
      </main>
      <div className="layout-footer">
        <Footer />
      </div>
      <MobileCtaBar />
      <style>{`
        .layout-main { padding-bottom: 88px; }
        .layout-footer { margin-bottom: 88px; }

        @media (min-width: 640px) {
          .layout-main { padding-bottom: 0 !important; }
          .layout-footer { margin-bottom: 0 !important; }
          .layout-mobile-cta { display: none !important; }
        }

        @media (max-width: 640px) {
          .reditus-container { padding-left: 16px !important; padding-right: 16px !important; }
          .reditus-section   { padding-top: 48px !important; padding-bottom: 48px !important; }
        }
      `}</style>
    </div>
  );
}

export function Container({ children, style, narrow = false }) {
  return (
    <div className="reditus-container" style={{ maxWidth: narrow ? 800 : 1200, width: '100%', margin: '0 auto', padding: '0 24px', boxSizing: 'border-box', overflowX: 'hidden', ...style }}>
      {children}
    </div>
  );
}

export function Section({ children, bg, style, id }) {
  return (
    <section id={id} className="reditus-section" style={{ padding: '80px 0', background: bg || 'transparent', overflowX: 'hidden', ...style }}>
      {children}
    </section>
  );
}

export function SectionLabel({ children, light = false }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: light ? C.accentMid : C.accent,
        marginBottom: 16,
        fontFamily: FONT.body,
      }}
    >
      {children}
    </span>
  );
}

export function SectionTitle({ children, style, light = false }) {
  return (
    <h2
      style={{
        fontFamily: FONT.display,
        fontSize: 'clamp(28px, 4vw, 44px)',
        fontWeight: 600,
        letterSpacing: '-0.015em',
        color: light ? '#FFFFFF' : C.textPrimary,
        lineHeight: 1.15,
        marginBottom: 24,
        maxWidth: '100%',
        overflowWrap: 'anywhere',
        wordBreak: 'break-word',
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

// Simple breadcrumb (used in inner pages)
export function Breadcrumbs({ items }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        fontSize: 13,
        color: C.textTertiary,
        marginBottom: 24,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
      }}
    >
      {items.map((item, i) => (
        <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {i > 0 && <span style={{ color: C.borderDefault, fontSize: 14 }}>{'>'}</span>}
          {item.to ? (
            <a href={item.to} className="ui-interactive" style={{ color: C.accent, textDecoration: 'none' }}>{item.label}</a>
          ) : (
            <span style={{ color: C.textSecondary }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

