// ─── SHARED DATA ─────────────────────────────────────────────────
// Single source of truth for all content used across pages.
// Copy aligned with Prompt 3 (the Content Architect output).

export const SERVICES = [
  {
    slug: "knjigovodstvo-pausalni-obrt",
    title: "Paušalni obrt",
    desc: "Od prijave u odgovarajući paušalni razred do godišnje PO-SD porezne prijave. Pratimo vaš promet i obavještavamo vas pravovremeno o svim rokovima.",
    icon: "Calculator",
    audience: "Paušalni obrtnici s manjim ili umjerenim prometom — fotografi, IT freelanceri, ugostitelji, majstori, taksisti.",
    includes: [
      "Praćenje prihoda i paušalnog razreda",
      "Obračun paušalnog poreza i doprinosa",
      "Izrada i podnošenje PO-SD obrasca",
      "Podsjetnici za sve rokove",
      "Email i telefonska podrška",
      "Digitalna razmjena dokumenata",
    ],
  },
  {
    slug: "knjigovodstvo-obrt",
    title: "Obrt (dohodaš)",
    desc: "Vodimo poslovne knjige za obrtnike koji posluju po sustavu dohotka — evidencije, obračun doprinosa i uredna porezna dokumentacija.",
    icon: "FileText",
    audience: "Obrtnici s poslovnim knjigama i zaposlenicima koji vode evidencije po dohotku.",
    includes: [
      "Vođenje KPI i KPO poslovnih knjiga",
      "Obračun doprinosa i poreza na dohodak",
      "Izrada i podnošenje godišnje porezne prijave",
      "Obračun plaća zaposlenika i JOPPD obrasci",
      "Komunikacija s Poreznom upravom",
      "Digitalna razmjena dokumenata",
    ],
  },
  {
    slug: "knjigovodstvo-doo",
    title: "d.o.o. / j.d.o.o.",
    desc: "Kompletno računovodstvo za trgovačka društva: vođenje poslovnih knjiga, PDV obračun, godišnji financijski izvještaji i porezno planiranje.",
    icon: "Shield",
    audience: "Micro i mala trgovačka društva koja trebaju ozbiljno, pouzdano računovodstvo.",
    includes: [
      "Dvostavno knjgovodstvo (GFI, bilanca, RDG)",
      "PDV evidencija i mjesečne/tromjesečne prijave",
      "Godišnji financijski izvještaj (FINA)",
      "Obračun plaća i JOPPD obrasci",
      "Porezno planiranje i savjetovanje",
      "Komunikacija s Poreznom upravom i FINOM",
    ],
  },
  {
    slug: "obracun-placa",
    title: "Obračun plaća",
    desc: "Obračunavamo plaće za vaše zaposlenike, podnosimo JOPPD obrasce i pratimo sve izmjene u poreznim stopama i doprinosima.",
    icon: "Users",
    audience: "Tvrtke i obrti koji imaju zaposlenike ili planiraju zapošljavanje.",
    includes: [
      "Mjesečni obračun bruto i neto plaća",
      "Izrada i podnošenje JOPPD obrazaca",
      "Obračun bolovanja, godišnjih odmora i naknada",
      "Prijave i odjave radnika (e-Zdravstveno)",
      "Praćenje izmjena poreznih stopa i doprinosa",
      "Isplatne liste za svakog zaposlenika",
    ],
  },
  {
    slug: "pdv",
    title: "PDV obračun i prijave",
    desc: "Vodimo PDV evidencije, sastavljamo PDV obrasce i podnosimo prijave u zakonskim rokovima. Pratimo promjene u PDV propisima koje utječu na vaše poslovanje.",
    icon: "TrendingUp",
    audience: "PDV obveznici i poduzetnici koji se približavaju pragu za ulazak u sustav PDV-a.",
    includes: [
      "Vođenje ulaznih i izlaznih PDV evidencija",
      "Izrada i podnošenje PDV obrasca (PDV-S)",
      "Praćenje PDV praga i savjet pri ulasku u sustav",
      "Rekapitulacijska prijava za EU transakcije",
      "Komunikacija s Poreznom upravom",
      "Digitalna razmjena dokumenata",
    ],
  },
  {
    slug: "savjetovanje",
    title: "Porezno savjetovanje",
    desc: "Savjetujemo pri odabiru pravnog oblika, registraciji obrta ili tvrtke, te analizi poreznih posljedica poslovnih odluka.",
    icon: "Clock",
    audience: "Novi poduzetnici i oni koji planiraju veće poslovne promjene ili optimizaciju.",
    includes: [
      "Savjet pri odabiru pravnog oblika poslovanja",
      "Analiza poreznih posljedica poslovnih odluka",
      "Pomoć pri registraciji obrta ili tvrtke",
      "Optimizacija isplate (plaća vs. dividenda)",
      "Priprema za promjenu računovođe",
      "Jednokratne ili periodične konzultacije",
    ],
  },
];

export const PACKAGES = [
  {
    name: "Starter",
    target: "Paušalni obrtnici",
    fromPrice: "60",
    included: [
      "Praćenje prihoda i paušalnog razreda",
      "Obračun doprinosa i paušalnog poreza",
      "Izrada i podnošenje PO-SD obrasca",
      "Podsjetnici za rokove",
      "Email i telefonska podrška",
    ],
    notIncluded: ["PDV evidencija", "Obračun plaća", "Godišnji financijski izvještaj"],
    highlight: false,
  },
  {
    name: "Standard",
    target: "Obrti i j.d.o.o.",
    fromPrice: "130",
    included: [
      "Vođenje poslovnih knjiga",
      "PDV evidencija i prijave",
      "Obračun plaća (do 2 zaposlenika)",
      "Godišnji financijski izvještaj",
      "Porezna prijava",
      "Savjetovanje pri poslovnim odlukama",
      "Prioritetna dostupnost",
    ],
    notIncluded: ["Dodatni zaposlenici (nadoplata)", "Napredna PDV analitika (EU, uvoz)"],
    highlight: true,
  },
  {
    name: "Pro",
    target: "d.o.o. i složenije poslovanje",
    fromPrice: "Po dogovoru",
    included: [
      "Kompletno vođenje poslovnih knjiga",
      "PDV prijave i napredna PDV analitika",
      "Obračun plaća — neograničeni zaposlenici",
      "Godišnji financijski izvještaji",
      "Porezno planiranje i savjetovanje",
      "Priprema za porezni nadzor",
      "Fiskalizacija i e-računi",
      "Dedicirani kontakt — brzi odgovori",
    ],
    notIncluded: [],
    highlight: false,
  },
];

export const TESTIMONIALS = [
  {
    name: "Marko T.",
    business: "Paušalni obrtnik, Split",
    quote: "Radim kao fotograf na paušalu i godinama sam se mučio s prijavama i rokovima. Otkad surađujem s Reditiusom, znam točno što plaćam i kada. Nema iznenađenja.",
    rating: 5,
  },
  {
    name: "Ana i Petar K.",
    business: "Osnivači j.d.o.o., Kaštela",
    quote: "Otvorili smo j.d.o.o. bez ikakvog prethodnog iskustva u vođenju tvrtke. Reditus nas je vodio korak po korak — od registracije do prvog PDV obračuna. Profesionalno i strpljivo.",
    rating: 5,
  },
  {
    name: "Ivana M.",
    business: "Dohodaški obrt, Trogir",
    quote: "Imala sam računovođu koji bi javljao tek kad bi nešto kasnilo. Sad imam nekoga tko me nazove tjedan dana unaprijed. Ta razlika znači sve za mir u poslovanju.",
    rating: 5,
  },
];

export const FAQ_DATA = [
  {
    q: "Radite li samo s klijentima iz Trogira i Splita?",
    a: "Ne. Ured nam je u Trogiru, ali veliki dio naših klijenata je s područja cijele Hrvatske. Suradnja na daljinu funkcionira bez problema — dokumentaciju razmjenjujemo digitalno, a komunikacija teče mailom i telefonom.",
  },
  {
    q: "Koliko košta vaša usluga?",
    a: "Cijena ovisi o pravnom obliku, broju transakcija i opsegu usluga. Paušalni obrtnici imaju fiksne i predvidive pakete (od 60 €/mj). Za obrte i d.o.o. prilagođavamo ponudu. Sve cijene su transparentne — bez skrivenih troškova.",
  },
  {
    q: "Kako prebacujem knjige od dosadašnjeg računovođe?",
    a: "Brinemo se o tome umjesto vas. Koordiniramo preuzimanje dokumentacije i osiguravamo kontinuitet bez prekida u poslovanju.",
  },
  {
    q: "Moram li dolaziti osobno u ured?",
    a: "Ne morate. Možemo raditi potpuno na daljinu. Ako ste iz Trogira ili okolice i preferirate osobni kontakt — uvijek ste dobrodošli.",
  },
  {
    q: "Što se dogodi ako zakasnite s dokumentacijom?",
    a: "Javimo vam se unaprijed s podsjetnicima. Ako dokumentacija kasni, odmah vas obavještavamo o posljedicama — nema iznenađenja ni skrivenih situacija.",
  },
  {
    q: "Vodite li fiskalizaciju?",
    a: "Da. Pomažemo pri uvođenju fiskalizacije, savjetujemo o obvezama i pratimo izmjene propisa vezane uz izdavanje fiskalnih računa.",
  },
  {
    q: "Mogu li vas kontaktirati s pitanjem bez da ste moj računovođa?",
    a: "Da. Primamo konzultacije i za klijente koji žele pojašnjenje specifičnih poreznih situacija ili savjet pri donošenju poslovne odluke.",
  },
  {
    q: "Kako izgleda komunikacija iz mjeseca u mjesec?",
    a: "Dogovaramo kanal koji vama odgovara — mail, telefon ili aplikacija za razmjenu dokumenata. Svaki mjesec imate jasan pregled što je urađeno i što slijedi.",
  },
];

export const BLOG_POSTS = [
  {
    slug: "pdv-prag-2026",
    title: "PDV prag 2026: Što trebate znati",
    excerpt: "Prag za obvezan ulazak u sustav PDV-a iznosi 60.000 €. Saznajte kada i kako morate postati PDV obveznik i što to znači za vaše poslovanje.",
    category: "PDV",
    date: "10. veljače 2026.",
  },
  {
    slug: "pausalni-obrt-razredi-2026",
    title: "Paušalni razredi 2026: Pregled i kalkulator",
    excerpt: "Koji paušalni razred vam odgovara? Pregled svih razreda, paušalnih stopa i doprinosa za 2026. godinu s praktičnim primjerima.",
    category: "Paušal",
    date: "20. siječnja 2026.",
  },
  {
    slug: "otvaranje-doo-koraci",
    title: "Kako otvoriti d.o.o. — korak po korak",
    excerpt: "Praktični vodič za osnivanje društva s ograničenom odgovornošću: dokumenti, troškovi, rokovi, računovodstvene obveze.",
    category: "d.o.o.",
    date: "15. studenog 2025.",
  },
];

export const PROCESS_STEPS = [
  { num: "01", title: "Uvodni razgovor",         desc: "Kontaktirate nas i dogovaramo kratki razgovor. Upoznajemo vaše poslovanje i odgovaramo na pitanja." },
  { num: "02", title: "Prijedlog suradnje",       desc: "Pripremamo jasnu i transparentnu ponudu. Bez skrivenih troškova, bez neodređenih cijena." },
  { num: "03", title: "Preuzimanje dokumentacije",desc: "Koordiniramo preuzimanje knjiga od prethodnog računovođe ili postavljamo evidencije od nule." },
  { num: "04", title: "Tekuća suradnja",          desc: "Vodimo vaše knjige svaki mjesec. Dostavljate dokumentaciju — mi se brinemo o svemu." },
  { num: "05", title: "Dostupnost i proaktivnost",desc: "Uvijek smo dostupni za pitanja. Svaku bitnu promjenu propisa proaktivno vam priopćavamo." },
];

export const STATS = [
  { value: "120+", label: "Aktivnih klijenata" },
  { value: "8+",   label: "Godina iskustva" },
  { value: "0",    label: "Zakašnjelih prijava (3 god.)" },
  { value: "< 24h",label: "Prosječno vrijeme odgovora" },
];
