import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Section, SectionLabel, SectionTitle, Breadcrumbs } from '../ui/Layout';
import { C, FONT, TOKENS } from '../ui/tokens';
import Icons from '../ui/Icons';
import { BLOG_POSTS } from '../data';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('Sve');

  const categories = ['Sve', ...new Set(BLOG_POSTS.map(p => p.category))];
  const filtered = activeCategory === 'Sve'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  return (
    <div style={{ paddingTop: 100 }}>
      <Section>
        <Container>
          <Breadcrumbs items={[{ label: 'Naslovnica', to: '/' }, { label: 'Blog' }]} />
          <SectionLabel>Blog</SectionLabel>
          <SectionTitle>Savjeti, novosti i vodiči</SectionTitle>
          <p className="blog-lead" style={{ color: C.textSecondary, maxWidth: 560, marginBottom: 32 }}>
            Pratite regulatorne promjene, porezne novosti i praktične savjete za vaše poslovanje.
          </p>

          {/* Category filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className="blog-filter-btn"
                style={{
                  fontFamily: FONT.body, fontSize: 13,
                  fontWeight: activeCategory === c ? 600 : 400,
                  padding: '8px 18px', borderRadius: TOKENS.radii.full,
                  background: activeCategory === c ? C.primary : C.bgElevated,
                  color: activeCategory === c ? C.textInverse : C.textSecondary,
                  border: `1px solid ${activeCategory === c ? C.primary : C.borderDefault}`,
                  cursor: 'pointer',
                  transition: `all ${TOKENS.motion.duration.micro} ease`,
                  minHeight: 36,
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Post grid — 1 col mobile, 2 col tablet, 3 col desktop via auto-fill */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 24 }}>
            {filtered.map((post, i) => (
              <article
                key={i}
                style={{
                  background: C.bgElevated, borderRadius: TOKENS.radii.xl,
                  overflow: 'hidden', border: `1px solid ${C.borderDefault}`,
                  transition: `all ${TOKENS.motion.duration.micro} ease`,
                }}
                onMouseEnter={e => { if (!window.matchMedia('(hover: none)').matches) { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = TOKENS.shadows.md; }}}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ height: 6, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})` }} />
                <div style={{ padding: '24px 24px 28px' }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
                    <span style={{
                      fontSize: 12, fontWeight: 600, color: C.accent,
                      background: C.accentLight, padding: '4px 10px', borderRadius: TOKENS.radii.full,
                    }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: 12, color: C.textTertiary }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontFamily: FONT.display, fontSize: 19, fontWeight: 600, lineHeight: 1.35, marginBottom: 8, color: C.textPrimary }}>
                    {post.title}
                  </h3>
                  <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.65, marginBottom: 16 }}>
                    {post.excerpt}
                  </p>
                  <Link to={`/blog/${post.slug}`} style={{
                    fontSize: 13, color: C.accent, fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none',
                    minHeight: 44,
                  }}>
                    Pročitaj više <Icons.ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <style>{`
        @media (max-width: 640px) {
          .blog-lead       { margin-bottom: 20px !important; }
          .blog-filter-btn { min-height: 44px !important; }
        }
      `}</style>
    </div>
  );
}
