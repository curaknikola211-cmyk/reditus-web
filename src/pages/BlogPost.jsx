import { useParams, Link } from 'react-router-dom';
import { Container, Section, SectionLabel, Breadcrumbs } from '../ui/Layout';
import { C, FONT, TOKENS } from '../ui/tokens';
import Icons from '../ui/Icons';
import { BLOG_POSTS } from '../data';
import PausalCalculator from '../ui/PausalCalculator';
import PdvPragBox from '../ui/PdvPragBox';

const PAUSAL_SLUG = 'pausalni-obrt-razredi-2026';
const PDV_SLUG    = 'pdv-prag-2026';
const DOO_SLUG    = 'otvaranje-doo-koraci';

// ─── Helpers for d.o.o. post ──────────────────────────────────────

const h2Style = {
  fontFamily: FONT.display, fontSize: 22, fontWeight: 600,
  color: C.textPrimary, marginBottom: 16, marginTop: 40,
};

function StepList({ items }) {
  return (
    <ol style={{ paddingLeft: 0, listStyle: 'none', margin: '0 0 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, i) => (
        <li key={i} style={{
          display: 'flex', alignItems: 'flex-start', gap: 14,
          background: C.bgElevated, border: `1px solid ${C.borderSubtle}`,
          borderRadius: TOKENS.radii.lg, padding: '14px 16px',
        }}>
          <span style={{
            flexShrink: 0, minWidth: 26, height: 26, borderRadius: TOKENS.radii.full,
            background: C.primary, color: C.textInverse,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, marginTop: 1,
          }}>
            {i + 1}
          </span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: C.textPrimary, marginBottom: item.desc ? 3 : 0 }}>
              {item.title}
            </div>
            {item.desc && (
              <div style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.65 }}>{item.desc}</div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function BulletList({ items, accent }) {
  return (
    <ul style={{ paddingLeft: 0, listStyle: 'none', margin: '0 0 8px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {items.map((item, i) => (
        <li key={i} style={{
          display: 'flex', alignItems: 'flex-start', gap: 10,
          fontSize: 15, color: C.textSecondary, lineHeight: 1.7,
        }}>
          <span style={{
            flexShrink: 0, marginTop: '0.35em', width: 7, height: 7,
            borderRadius: TOKENS.radii.full,
            background: accent ? C.accent : C.borderDefault,
          }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

// ─── Component ────────────────────────────────────────────────────

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  // Post not found
  if (!post) {
    return (
      <div style={{ paddingTop: 100 }}>
        <Section>
          <Container narrow>
            <Breadcrumbs items={[{ label: 'Naslovnica', to: '/' }, { label: 'Blog', to: '/blog' }, { label: 'Članak nije pronađen' }]} />
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <h1 style={{ fontFamily: FONT.display, fontSize: 32, fontWeight: 600, marginBottom: 12, color: C.textPrimary }}>
                Članak nije pronađen
              </h1>
              <p style={{ color: C.textSecondary, marginBottom: 24 }}>
                Članak koji tražite ne postoji ili je uklonjen.
              </p>
              <Link to="/blog" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: FONT.body, fontWeight: 600, fontSize: 14,
                padding: '10px 22px', minHeight: 44, borderRadius: TOKENS.radii.md,
                background: C.primary, color: C.textInverse, textDecoration: 'none',
              }}>
                Natrag na blog
              </Link>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  // Other posts (excluding current)
  const related = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3);

  const isPausal = slug === PAUSAL_SLUG;
  const isPdv    = slug === PDV_SLUG;
  const isDoo    = slug === DOO_SLUG;

  return (
    <div style={{ paddingTop: 100 }}>
      <Section>
        <Container narrow>
          <Breadcrumbs items={[
            { label: 'Naslovnica', to: '/' },
            { label: 'Blog', to: '/blog' },
            { label: post.title },
          ]} />

          {/* Category + date */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 12, fontWeight: 600, color: C.accent,
              background: C.accentLight, padding: '4px 10px', borderRadius: TOKENS.radii.full,
            }}>
              {post.category}
            </span>
            <time dateTime={post.date} style={{ fontSize: 13, color: C.textTertiary }}>{post.date}</time>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: FONT.display,
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 600, lineHeight: 1.2, color: C.textPrimary, marginBottom: 16,
          }}>
            {post.title}
          </h1>

          {/* Accent line */}
          <div style={{ height: 4, width: 48, background: C.accent, borderRadius: 2, marginBottom: 32 }} />

          {/* Lead paragraph (excerpt) */}
          <p style={{ fontSize: 18, color: C.textSecondary, lineHeight: 1.75, marginBottom: 32, maxWidth: '65ch' }}>
            {post.excerpt}
          </p>

          {isPausal ? (
            /* ── Paušalni razredi 2026 ────────────────────────────── */
            <div style={{ maxWidth: '65ch' }}>
              <h2 style={h2Style}>Što je paušalni obrt?</h2>
              <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.8, marginBottom: 20 }}>
                Paušalni obrt je oblik poslovanja namijenjen obrtnicima čiji godišnji prihodi ne prelaze određeni iznos. Umjesto stvarnih troškova, porez se plaća na paušalno utvrđenu osnovicu — što znači <strong style={{ color: C.textPrimary }}>manje administracije i predvidive troškove</strong> svakog kvartala.
              </p>

              <h2 style={h2Style}>Paušalni razredi za 2026. godinu</h2>
              <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.8, marginBottom: 20 }}>
                Razred u koji ulazite ovisi o ostvarenim godišnjim primicima u prethodnoj godini. Što je razred viši, viša je i porezna osnovica na koju se primjenjuje stopa od <strong style={{ color: C.textPrimary }}>12%</strong>.
              </p>
              <BulletList accent items={[
                'Razred 1: do 11.300,00 € — osnovica 1.695,00 €, godišnji porez 203,40 €',
                'Razred 2: 11.300,01 – 15.300,00 € — osnovica 2.295,00 €, godišnji porez 275,40 €',
                'Razred 3: 15.300,01 – 19.900,00 € — osnovica 2.985,00 €, godišnji porez 358,20 €',
                'Razred 4: 19.900,01 – 30.600,00 € — osnovica 4.590,00 €, godišnji porez 550,80 €',
                'Razred 5: 30.600,01 – 40.000,00 € — osnovica 6.000,00 €, godišnji porez 720,00 €',
                'Razred 6: 40.000,01 – 50.000,00 € — osnovica 7.500,00 €, godišnji porez 900,00 €',
                'Razred 7: 50.000,01 – 60.000,00 € — osnovica 9.000,00 €, godišnji porez 1.080,00 €',
              ]} />

              <h2 style={h2Style}>Kada se plaća porez?</h2>
              <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.8, marginBottom: 20 }}>
                Paušalni porez plaća se <strong style={{ color: C.textPrimary }}>kvartalno</strong> — do kraja siječnja, travnja, srpnja i listopada za prethodni kvartal. Podsjetnici na rokove su nešto što Reditus šalje svim klijentima unaprijed.
              </p>

              <h2 style={h2Style}>Tko može biti paušalac?</h2>
              <BulletList accent items={[
                'Obrtnici kojima godišnji primici ne prelaze 60.000 € (PDV prag)',
                'Koji nisu u sustavu PDV-a',
                'Koji nemaju zaposlenike (uz određene iznimke)',
                'Koji ne obavljaju djelatnosti isključene iz paušalnog oporezivanja',
              ]} />

              <h2 style={h2Style}>Kalkulator paušalnog razreda</h2>
              <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.8, marginBottom: 8 }}>
                Unesite vaš godišnji primitak i odmah saznajte koji razred vam odgovara i koliko poreza plaćate.
              </p>
              <PausalCalculator />

              <div style={{
                background: C.primaryLight,
                border: `1px solid ${TOKENS.colors.light.primary[100]}`,
                borderRadius: TOKENS.radii.xl,
                padding: '24px 24px',
                display: 'flex', flexDirection: 'column', gap: 12,
                marginTop: 40,
              }}>
                <p style={{ fontWeight: 600, fontSize: 15, color: C.textPrimary, margin: 0 }}>
                  Niste sigurni koji razred vam odgovara?
                </p>
                <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.65, margin: 0 }}>
                  Kontaktirajte nas — besplatno provjerimo vaš status i savjetujemo o optimalnom obliku poslovanja.
                </p>
                <Link
                  to="/kontakt"
                  className="bpost-inline-btn"
                  style={{
                    alignSelf: 'flex-start',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: FONT.body, fontWeight: 600, fontSize: 14,
                    padding: '10px 22px', minHeight: 44, borderRadius: TOKENS.radii.md,
                    background: C.primary, color: C.textInverse, textDecoration: 'none',
                  }}
                >
                  Besplatna konzultacija <Icons.ArrowRight />
                </Link>
              </div>
            </div>

          ) : isPdv ? (
            /* ── PDV prag 2026 ────────────────────────────────────── */
            <div style={{ maxWidth: '65ch' }}>
              <h2 style={h2Style}>Koji je prag za PDV u 2026. godini?</h2>
              <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.8, marginBottom: 20 }}>
                Prag za obvezan ulazak u sustav PDV-a iznosi <strong style={{ color: C.textPrimary }}>60.000,00 €</strong> godišnjeg prometa u tuzemstvu (bez PDV-a). Radi se o ukupnoj vrijednosti isporuka dobara i usluga ostvarenih na području Republike Hrvatske.
              </p>
              <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.8, marginBottom: 20 }}>
                Ako u tekućoj godini ukupni promet prijeđe taj iznos, obveznik postaje PDV obveznik <strong style={{ color: C.textPrimary }}>od prvog sljedećeg dana</strong> — tj. od dana koji neposredno slijedi dan u kojemu je prag prijeđen.
              </p>

              <h2 style={h2Style}>Praktični primjer</h2>
              <div style={{
                background: C.bgTertiary, border: `1px solid ${C.borderDefault}`,
                borderRadius: TOKENS.radii.lg, padding: '20px 22px', marginBottom: 28,
              }}>
                <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.8, margin: 0 }}>
                  Ako prijeđete prag <strong style={{ color: C.textPrimary }}>15. srpnja</strong>, u sustav PDV-a ulazite <strong style={{ color: C.textPrimary }}>od 16. srpnja</strong>. Sve daljnje isporuke od tog datuma ispostavljate s obračunatim PDV-om.
                </p>
              </div>

              <h2 style={h2Style}>Što trebate napraviti</h2>
              <ul style={{
                paddingLeft: 0, listStyle: 'none', margin: '0 0 28px',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                {[
                  { icon: '📊', text: 'Kontinuirano pratite godišnji promet — osobito ako ste blizu praga.' },
                  { icon: '📋', text: 'Prijavite se nadležnoj Poreznoj upravi podnošenjem obrasca P-PDV (zahtjev za upis u registar PDV obveznika).' },
                  { icon: '🧾', text: 'Prilagodite izdavanje računa — od datuma upisa svaki izlazni račun mora sadržavati PDV.' },
                ].map((item, i) => (
                  <li key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    background: C.bgElevated, border: `1px solid ${C.borderSubtle}`,
                    borderRadius: TOKENS.radii.lg, padding: '14px 16px',
                  }}>
                    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                    <span style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.65 }}>{item.text}</span>
                  </li>
                ))}
              </ul>

              <PdvPragBox />
            </div>

          ) : isDoo ? (
            /* ── Otvaranje d.o.o. ─────────────────────────────────── */
            <div style={{ maxWidth: '65ch' }}>
              <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.8, marginBottom: 20 }}>
                Vodič je namijenjen poduzetnicima koji razmatraju osnivanje društva s ograničenom odgovornošću (d.o.o.) u Hrvatskoj — bez obzira radi li se o prvom pothvatu ili prelasku s obrta. Na jednom ćete mjestu naći redoslijed koraka, popis potrebnih dokumenata i najčešće zamke koje usporavaju proces.
              </p>

              <h2 style={h2Style}>Koraci otvaranja d.o.o.</h2>
              <StepList items={[
                { title: 'Odaberite naziv i provjerite dostupnost', desc: 'Naziv mora biti jedinstven i ne smije se podudarati s već registriranim tvrtkama. Provjeru obavite u sudskom registru ili putem eRegistracije.' },
                { title: 'Odredite sjedište društva', desc: 'Sjedište može biti poslovni prostor, ured ili — uz određene uvjete — privatna adresa. Potrebno je imati pravnu osnovu za korištenje adrese (ugovor o najmu, vlasništvo ili suglasnost vlasnika).' },
                { title: 'Definirajte djelatnosti (NKD šifre)', desc: 'Pažljivo odaberite šifre djelatnosti koje pokrivaju sve planirane poslovne aktivnosti — naknadno dodavanje je moguće, ali zahtijeva izmjenu statuta.' },
                { title: 'Dogovorite temeljni kapital i vlasničku strukturu', desc: 'Minimalni temeljni kapital za d.o.o. propisan je zakonom. Ako je osnivača više, dogovorite udjele i ovlasti unaprijed — to uvelike olakšava izradu osnivačkog akta.' },
                { title: 'Izrada osnivačkog akta kod javnog bilježnika', desc: 'Osnivački akt (Izjava o osnivanju za jednog osnivača ili Društveni ugovor za više osnivača) mora biti sastavljen i ovjeren od strane javnog bilježnika. Sa sobom ponesite osobne isprave svih osnivača i prijedlog naziva i djelatnosti.' },
                { title: 'Uplata temeljnog kapitala', desc: 'Temeljni kapital uplaćuje se na privremeni račun koji otvara bilježnik ili neposredno prema uputama za upis. Potvrda o uplati sastavni je dio prijave za upis u registar.' },
                { title: 'Upis u sudski registar', desc: 'Prijava za upis podnosi se nadležnom Trgovačkom sudu, neposredno ili putem javnog bilježnika koji je ovjerio osnivački akt. Po upisu društvo dobiva MBS i postaje pravna osoba.' },
                { title: 'Upis u Poreznu upravu i dodjela OIB-a društva', desc: 'Nakon sudskog upisa, društvo se registrira u Poreznoj upravi. OIB društva dodjeljuje se automatski ili putem zahtjeva — provjerite s javnim bilježnikom ili računovođom.' },
                { title: 'Otvaranje poslovnog transakcijskog računa', desc: 'Svako d.o.o. mora imati zasebni poslovni račun u banci. Osobni i poslovni novac ne smiju se miješati.' },
                { title: 'Procjena obveze PDV-a', desc: 'Ako planirani promet prelazi 60.000 € godišnje ili neposredno krećete s klijentima koji zahtijevaju PDV račune, razmotrite dobrovoljnu prijavu PDV-a. Inače pratite promet i prijavite se kada prag bude prijeđen.' },
                { title: 'Postavljanje računovodstvenog sustava', desc: 'd.o.o. ima zakonsku obvezu dvostavnog knjigo­vodstva od prvog dana. Uspostavite suradnju s računovođom i dogovorite tijek dokumentacije prije nego što počnete fakturirati.' },
              ]} />

              <h2 style={h2Style}>Dokumentacija — što pripremiti</h2>
              <BulletList accent items={[
                'Osobne iskaznice ili putovnice svih osnivača',
                'OIB-ovi svih osnivača',
                'Pravna osnova za korištenje sjedišta (ugovor o najmu, izvadak iz zemljišne knjige ili suglasnost vlasnika)',
                'Prijedlog naziva tvrtke (poželjno 2–3 varijante u slučaju zauzetos­ti)',
                'Popis planiranih djelatnosti (NKD šifre)',
                'Podaci o visini temeljnog kapitala i vlasnič­kim udjelima',
                'Potvrda o uplati temeljnog kapitala (dostavlja se bilježniku)',
              ]} />

              <h2 style={h2Style}>Česte greške</h2>
              <BulletList items={[
                'Preuski odabir djelatnosti — ako planirate proširiti poslovanje, bolje je odmah uključiti relevantne NKD šifre nego ih docrtavati kroz izmjenu statuta.',
                'Mješanje osobnih i poslovnih financija — čest problem kod prvih poduzetnika, a može komplicirati knjigo­vodstvo i odnose s Poreznom upravom.',
                'Nerealno planiranje troškova prve godine — osnivački troškovi, javnobilježničke pristojbe, sudske takse i računovodstvo zbrajaju se brže nego što se očekuje.',
                'Zanemarivanje računovodstvenih obveza od prvog dana — d.o.o. je obveznik dvostavnog knjigo­vodstva odmah po upisu, bez obzira na promet.',
                'Kasna prijava PDV-a — ako promet prijeđe propisani prag, prijava mora uslijediti odmah; zakašnjenje nosi financijske posljedice.',
                'Neprilagođeno sjedište — adresa koja nije stvarno dostupna za dostavu pošte može uzrokovati propuštanje važnih pismena nadležnih tijela.',
                'Nekvalitetan osnivački akt — površno definirani udjeli, glasačka prava i mehanizmi odlučivanja postaju problem čim dođe do prvog neslaganja između osnivača.',
              ]} />

              <h2 style={h2Style}>Koliko to traje i okvirno košta?</h2>
              <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                Trajanje postupka ovisi o opterećenosti nadležnog Trgovačkog suda i o tome koliko brzo se sakupi sva dokumentacija. Od potpisa kod bilježnika do pravomoćnog upisa može proći od nekoliko radnih dana do nekoliko tjedana.
              </p>
              <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                Troškovi osnivanja uključuju javnobilježničke pristojbe, sudske takse i eventualne troškove izrade pečata ili otvaranja računa — konkretni iznosi ovise o visini temeljnog kapitala i odabranom javnom bilježniku. Preporučujemo da konkretnu kalkulaciju zatražite neposredno od bilježnika ili računovođu prije pokretanja postupka.
              </p>
              <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.8, marginBottom: 32 }}>
                Troškovi tekućeg računovodstva dogovaraju se individualno, ovisno o opsegu poslovanja, broju transakcija i potrebnim uslugama.
              </p>

              {/* In-body CTA */}
              <div style={{
                background: C.primaryLight,
                border: `1px solid ${TOKENS.colors.light.primary[100]}`,
                borderRadius: TOKENS.radii.xl,
                padding: '24px 24px',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <p style={{ fontWeight: 600, fontSize: 15, color: C.textPrimary, margin: 0 }}>
                  Planirate otvoriti d.o.o.?
                </p>
                <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.65, margin: 0 }}>
                  Pomažemo pri uspostavi računovodstvenog sustava od prvog dana — od odabira pravnog oblika do tekućeg vođenja knjiga. Zatražite personaliziranu ponudu.
                </p>
                <Link
                  to="/kontakt"
                  className="bpost-inline-btn"
                  style={{
                    alignSelf: 'flex-start',
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: FONT.body, fontWeight: 600, fontSize: 14,
                    padding: '10px 22px', minHeight: 44, borderRadius: TOKENS.radii.md,
                    background: C.primary, color: C.textInverse, textDecoration: 'none',
                  }}
                >
                  Zatražite personaliziranu ponudu <Icons.ArrowRight />
                </Link>
              </div>
            </div>

          ) : (
            /* ── Generic placeholder body ─────────────────────────── */
            <div style={{ maxWidth: '65ch' }}>
              {[
                'Ovo je placeholder sadržaj članka. U produkcijskom sustavu ovdje bi se nalazio kompletan tekst članka, strukturiran u odlomke s podnaslovima, popisima i relevantnim primjerima.',
                'Reditus tim redovito objavljuje stručne članke o aktualnim promjenama u poreznom i računovodstvenom zakonodavstvu, praktične vodiče za poduzetnike i savjete za optimizaciju poslovanja.',
                'Ako imate pitanja o ovoj temi ili trebate individualnu konzultaciju, slobodno nas kontaktirajte — odgovaramo unutar 24 sata.',
              ].map((paragraph, i) => (
                <p key={i} style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.8, marginBottom: 20 }}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* CTA */}
          <div
            className="bpost-cta-box"
            style={{
              marginTop: 48, padding: '32px 28px',
              background: C.bgTertiary, borderRadius: TOKENS.radii.xl,
            }}
          >
            <p style={{ fontWeight: 600, fontSize: 16, color: C.textPrimary, marginBottom: 8 }}>
              Trebate savjet vezan uz ovu temu?
            </p>
            <p style={{ color: C.textSecondary, marginBottom: 16, fontSize: 14 }}>
              Kontaktirajte nas za besplatnu konzultaciju.
            </p>
            <Link
              to="/kontakt"
              className="bpost-cta-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
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

      {/* Related posts */}
      {related.length > 0 && (
        <Section bg={C.bgSecondary}>
          <Container>
            <SectionLabel>Više članaka</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 24 }}>
              {related.map((p, i) => (
                <Link key={i} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                  <article style={{
                    background: C.bgElevated, borderRadius: TOKENS.radii.xl,
                    overflow: 'hidden', border: `1px solid ${C.borderDefault}`,
                    transition: `all ${TOKENS.motion.duration.micro} ease`,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = TOKENS.shadows.md; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ height: 6, background: `linear-gradient(90deg, ${C.primary}, ${C.accent})` }} />
                    <div style={{ padding: '20px 20px 24px' }}>
                      <span style={{
                        fontSize: 12, fontWeight: 600, color: C.accent,
                        background: C.accentLight, padding: '3px 8px', borderRadius: TOKENS.radii.full,
                        display: 'inline-block', marginBottom: 10,
                      }}>
                        {p.category}
                      </span>
                      <h3 style={{ fontFamily: FONT.display, fontSize: 17, fontWeight: 600, lineHeight: 1.35, color: C.textPrimary, marginBottom: 6 }}>
                        {p.title}
                      </h3>
                      <p style={{ fontSize: 13, color: C.textTertiary }}>{p.date}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <style>{`
        @media (max-width: 640px) {
          .bpost-cta-box   { padding: 20px 16px !important; margin-top: 32px !important; }
          .bpost-cta-btn   { display: flex !important; width: 100% !important; justify-content: center !important; }
          .bpost-inline-btn {
            align-self: stretch !important;
            display: flex !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </div>
  );
}
