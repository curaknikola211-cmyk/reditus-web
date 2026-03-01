import { useState } from 'react';
import { Container, Section, SectionLabel, SectionTitle, Breadcrumbs } from '../ui/Layout';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import { C, FONT, TOKENS } from '../ui/tokens';
import Icons from '../ui/Icons';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xreajrbr';

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '', consent: false });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]     = useState(null);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || 'Slanje nije uspjelo. Pokušajte ponovo ili nas kontaktirajte direktno.');
      }
    } catch {
      setError('Greška pri slanju. Provjerite internetsku vezu i pokušajte ponovo.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: 100 }}>
      <Section>
        <Container>
          <Breadcrumbs items={[{ label: 'Naslovnica', to: '/' }, { label: 'Kontakt' }]} />

          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}
            className="contact-grid"
          >
            {/* Left: info */}
            <div>
              <SectionLabel>Kontakt</SectionLabel>
              <SectionTitle>Javite nam se</SectionTitle>
              <p className="contact-info-lead" style={{ color: C.textSecondary, lineHeight: 1.7, marginBottom: 40 }}>
                Imate pitanje ili želite ponudu? Ispunite formu ili nas kontaktirajte direktno. Odgovaramo unutar 24 sata.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
                {[
                  { Icon: Icons.MapPin, label: 'Adresa',  text: 'Balančane 8, 21220 Trogir, Hrvatska' },
                  { Icon: Icons.Phone,  label: 'Telefon', text: '097 665 8870', href: 'tel:+385976658870' },
                  { Icon: Icons.Mail,   label: 'Email',   text: 'reditus.hr@gmail.com', href: 'mailto:reditus.hr@gmail.com' },
                ].map(({ Icon, label, text, href }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: TOKENS.radii.lg,
                      background: C.primaryLight, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: C.primary, flexShrink: 0,
                    }}>
                      <Icon />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 15, color: C.textPrimary }}>{label}</p>
                      {href ? (
                        <a href={href} style={{ color: C.textSecondary, fontSize: 14, textDecoration: 'none' }}>{text}</a>
                      ) : (
                        <p style={{ color: C.textSecondary, fontSize: 14 }}>{text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: C.bgTertiary, borderRadius: TOKENS.radii.lg, padding: 20 }}>
                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: C.textPrimary }}>Radno vrijeme</p>
                <p style={{ fontSize: 14, color: C.textSecondary }}>Pon - Pet: 8:00 - 16:00</p>
                <p style={{ fontSize: 14, color: C.textSecondary }}>Digitalni upiti: 0 - 24</p>
              </div>
            </div>

            {/* Right: form */}
            <div
              className="contact-form-panel"
              style={{
                background: C.bgElevated, borderRadius: TOKENS.radii['2xl'],
                padding: '36px 32px', border: `1px solid ${C.borderDefault}`,
                boxShadow: TOKENS.shadows.md,
              }}
            >
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }} className="scale-in">
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: C.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 20px', color: C.accent,
                  }}>
                    <Icons.Check />
                  </div>
                  <h3 style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 600, marginBottom: 8, color: C.textPrimary }}>
                    Hvala!
                  </h3>
                  <p style={{ color: C.textSecondary, fontSize: 15 }}>
                    Vaša poruka je zaprimljena. Javit ćemo vam se uskoro.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 style={{ fontFamily: FONT.display, fontSize: 22, fontWeight: 600, marginBottom: 24, color: C.textPrimary }}>
                    Pošaljite upit
                  </h3>
                  <Input label="Ime i prezime" name="name"    type="text"  value={form.name}    onChange={handle} required placeholder="Vaše ime" />
                  <Input label="Email"         name="email"   type="email" value={form.email}   onChange={handle} required placeholder="ime@email.com" />
                  <Input label="Telefon"       name="phone"   type="tel"   value={form.phone}   onChange={handle} placeholder="+385 ..." />
                  <Textarea label="Poruka"     name="message"              value={form.message} onChange={handle} rows={4} placeholder="Opišite ukratko vaše potrebe…" required />

                  {/* GDPR consent */}
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 24, cursor: 'pointer' }}>
                    <input
                      type="checkbox" name="consent" checked={form.consent} onChange={handle} required
                      style={{ marginTop: 4, accentColor: C.primary, width: 18, height: 18, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5 }}>
                      Pristajem na obradu osobnih podataka sukladno{' '}
                      <a href="#" style={{ color: C.accent, textDecoration: 'underline' }}>Politici privatnosti</a>. *
                    </span>
                  </label>

                  {error && (
                    <p style={{
                      fontSize: 13, color: '#C43D3D', marginBottom: 16,
                      padding: '10px 14px', borderRadius: TOKENS.radii.md,
                      background: 'rgba(196,61,61,0.06)', border: '1px solid rgba(196,61,61,0.2)',
                    }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                      width: '100%', padding: '14px 28px', minHeight: 52,
                      fontFamily: FONT.body, fontWeight: 600, fontSize: 15,
                      background: C.primary, color: C.textInverse,
                      border: 'none', borderRadius: TOKENS.radii.md,
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.65 : 1,
                    }}
                  >
                    {submitting ? 'Slanje…' : <>Pošalji upit <Icons.ArrowRight /></>}
                  </button>
                  <p style={{ fontSize: 13, color: C.textTertiary, marginTop: 12, textAlign: 'center', lineHeight: 1.5 }}>
                    Odgovaramo u razumnom roku (radnim danom).
                  </p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 640px) {
          .contact-info-lead  { margin-bottom: 24px !important; }
          .contact-form-panel { padding: 24px 20px !important; }
        }
      `}</style>
    </div>
  );
}

