import { useState } from 'react';
import { C, FONT, TOKENS } from './tokens';

const BRACKETS = [
  { index: 1, min: 0,        max: 11300.00, label: '0 – 11.300,00',         osnovica: 1695.00, godisnji: 203.40,  kvartalni: 50.85,  mjesecni: 16.95 },
  { index: 2, min: 11300.01, max: 15300.00, label: '11.300,01 – 15.300,00', osnovica: 2295.00, godisnji: 275.40,  kvartalni: 68.85,  mjesecni: 22.95 },
  { index: 3, min: 15300.01, max: 19900.00, label: '15.300,01 – 19.900,00', osnovica: 2985.00, godisnji: 358.20,  kvartalni: 89.55,  mjesecni: 29.85 },
  { index: 4, min: 19900.01, max: 30600.00, label: '19.900,01 – 30.600,00', osnovica: 4590.00, godisnji: 550.80,  kvartalni: 137.70, mjesecni: 45.90 },
  { index: 5, min: 30600.01, max: 40000.00, label: '30.600,01 – 40.000,00', osnovica: 6000.00, godisnji: 720.00,  kvartalni: 180.00, mjesecni: 60.00 },
  { index: 6, min: 40000.01, max: 50000.00, label: '40.000,01 – 50.000,00', osnovica: 7500.00, godisnji: 900.00,  kvartalni: 225.00, mjesecni: 75.00 },
  { index: 7, min: 50000.01, max: 60000.00, label: '50.000,01 – 60.000,00', osnovica: 9000.00, godisnji: 1080.00, kvartalni: 270.00, mjesecni: 90.00 },
];

function fmt(n) {
  return n.toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function findBracket(value) {
  return BRACKETS.find(b => value >= b.min && value <= b.max) || null;
}

// ─── CALCULATOR ────────────────────────────────────────────────────────────────

export default function PausalCalculator() {
  const [raw, setRaw] = useState('');
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState(false);

  function compute(val) {
    const normalized = val.replace(',', '.');
    const num = parseFloat(normalized);

    if (!val.trim() || isNaN(num)) {
      setResult(null);
      setMessage('');
      return;
    }

    if (num <= 0) {
      setResult(null);
      setMessage('Unesite iznos primitaka.');
      return;
    }

    if (num > 60000) {
      setResult(null);
      setMessage('Iznos je iznad raspona tablice; provjerite obveze izvan paušalnog oporezivanja.');
      return;
    }

    setResult(findBracket(num));
    setMessage('');
  }

  function handleChange(e) {
    setRaw(e.target.value);
    compute(e.target.value);
  }

  const inputStyle = {
    fontFamily: FONT.body,
    fontSize: 15,
    lineHeight: 1.5,
    padding: '12px 16px',
    border: `1.5px solid ${focused ? C.borderFocus : C.borderDefault}`,
    borderRadius: TOKENS.radii.md,
    width: '100%',
    background: C.bgPrimary,
    color: C.textPrimary,
    outline: 'none',
    minHeight: 48,
    boxSizing: 'border-box',
    transition: `border-color ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out},
                 box-shadow ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out}`,
    boxShadow: focused ? '0 0 0 3px rgba(27,58,92,0.16)' : 'none',
  };

  return (
    <div style={{ marginTop: 48 }}>

      {/* ── Calculator card ─────────────────────────────────────────── */}
      <div style={{
        background: C.bgElevated,
        border: `1px solid ${C.borderDefault}`,
        borderRadius: TOKENS.radii.xl,
        padding: '32px 28px',
        boxShadow: TOKENS.shadows.sm,
        marginBottom: 40,
      }}>
        <h2 style={{
          fontFamily: FONT.display,
          fontSize: 22,
          fontWeight: 600,
          color: C.textPrimary,
          marginBottom: 6,
        }}>
          Kalkulator paušalnog razreda
        </h2>
        <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 24, lineHeight: 1.6 }}>
          Unesite godišnji primitak i saznajte koji paušalni razred vam odgovara za 2026. godinu.
        </p>

        <label
          htmlFor="pausal-input"
          style={{
            display: 'block', fontSize: 14, fontWeight: 600,
            marginBottom: 8, color: C.textPrimary,
          }}
        >
          Godišnji primitak (EUR)
        </label>
        <input
          id="pausal-input"
          type="text"
          inputMode="decimal"
          placeholder="npr. 25000"
          value={raw}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle}
          autoComplete="off"
        />

        {/* ── Message (error / out-of-range) ──────────────────────── */}
        {message && (
          <div style={{
            marginTop: 16,
            padding: '12px 16px',
            background: C.bgTertiary,
            borderRadius: TOKENS.radii.md,
            fontSize: 14,
            color: C.textSecondary,
            border: `1px solid ${C.borderDefault}`,
            lineHeight: 1.6,
          }}>
            {message}
          </div>
        )}

        {/* ── Result ──────────────────────────────────────────────── */}
        {result && (
          <div style={{
            marginTop: 20,
            padding: '20px',
            background: C.accentLight,
            borderRadius: TOKENS.radii.lg,
            border: `1.5px solid ${TOKENS.colors.light.accent[100]}`,
          }}>
            <div style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: C.accent,
              marginBottom: 14,
            }}>
              Razred {result.index} &mdash; {result.label} EUR
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(152px, 100%), 1fr))',
              gap: 10,
            }}>
              {[
                { label: 'Porezna osnovica', value: result.osnovica },
                { label: 'Godišnji porez',   value: result.godisnji },
                { label: 'Kvartalni porez',  value: result.kvartalni },
                { label: 'Mjesečni porez',   value: result.mjesecni },
              ].map(item => (
                <div key={item.label} style={{
                  background: C.bgElevated,
                  borderRadius: TOKENS.radii.md,
                  padding: '14px 16px',
                  border: `1px solid ${TOKENS.colors.light.accent[100]}`,
                }}>
                  <div style={{
                    fontSize: 11,
                    color: C.textTertiary,
                    marginBottom: 6,
                    lineHeight: 1.4,
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontFamily: FONT.body,
                    fontWeight: 700,
                    fontSize: 19,
                    color: C.primary,
                    lineHeight: 1,
                  }}>
                    {fmt(item.value)}{' '}
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.textSecondary }}>EUR</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Table ───────────────────────────────────────────────────── */}
      <h2 style={{
        fontFamily: FONT.display,
        fontSize: 22,
        fontWeight: 600,
        color: C.textPrimary,
        marginBottom: 16,
      }}>
        Tablica paušalnih razreda 2026.
      </h2>

      <div style={{
        overflowX: 'auto',
        borderRadius: TOKENS.radii.lg,
        border: `1px solid ${C.borderDefault}`,
        boxShadow: TOKENS.shadows.xs,
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontFamily: FONT.body,
          fontSize: 14,
          minWidth: 560,
        }}>
          <thead>
            <tr style={{ background: C.primary }}>
              {[
                { label: 'Razred',                  align: 'center' },
                { label: 'Godišnji primitak (EUR)', align: 'right'  },
                { label: 'Osnovica (EUR)',           align: 'right'  },
                { label: 'Godišnji (EUR)',           align: 'right'  },
                { label: 'Kvartalni (EUR)',          align: 'right'  },
                { label: 'Mjesečni (EUR)',           align: 'right'  },
              ].map((h, i) => (
                <th key={i} style={{
                  padding: '11px 14px',
                  textAlign: h.align,
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: '0.03em',
                  color: C.textInverse,
                  whiteSpace: 'nowrap',
                  borderBottom: `2px solid ${TOKENS.colors.light.primary[600]}`,
                }}>
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BRACKETS.map((b, i) => {
              const isActive = result && result.index === b.index;
              const isEven = i % 2 === 1;
              const rowBg = isActive ? C.accentLight : isEven ? C.bgSecondary : C.bgPrimary;
              const cellColor = isActive ? C.textPrimary : C.textSecondary;
              const numColor  = isActive ? C.primary : C.textPrimary;
              const fw        = isActive ? 600 : 400;

              return (
                <tr
                  key={b.index}
                  style={{
                    background: rowBg,
                    transition: `background ${TOKENS.motion.duration.micro} ease`,
                  }}
                >
                  <td style={{
                    padding: '10px 14px',
                    textAlign: 'center',
                    fontWeight: isActive ? 700 : 600,
                    color: isActive ? C.accent : C.textTertiary,
                    borderBottom: `1px solid ${C.borderSubtle}`,
                    fontSize: 13,
                  }}>
                    {b.index}
                  </td>
                  <td style={{
                    padding: '10px 14px',
                    textAlign: 'right',
                    fontWeight: fw,
                    color: cellColor,
                    borderBottom: `1px solid ${C.borderSubtle}`,
                    whiteSpace: 'nowrap',
                  }}>
                    {b.label}
                  </td>
                  {[b.osnovica, b.godisnji, b.kvartalni, b.mjesecni].map((v, j) => (
                    <td key={j} style={{
                      padding: '10px 14px',
                      textAlign: 'right',
                      fontWeight: isActive ? 700 : 400,
                      color: numColor,
                      borderBottom: `1px solid ${C.borderSubtle}`,
                      whiteSpace: 'nowrap',
                    }}>
                      {fmt(v)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p style={{
        fontSize: 12,
        color: C.textTertiary,
        marginTop: 10,
        lineHeight: 1.6,
      }}>
        Iznosi u EUR. Podaci za 2026. godinu prema važećim propisima. Paušalni porez na dohodak iznosi 12 % od porezne osnovice.
      </p>
    </div>
  );
}
