import { useState } from 'react';
import { C, FONT, TOKENS } from './tokens';

const PRAG = 60000;

function fmt(n) {
  return n.toLocaleString('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PdvPragBox() {
  const [raw, setRaw] = useState('');
  const [focused, setFocused] = useState(false);

  const normalized = raw.replace(',', '.');
  const num = parseFloat(normalized);
  const hasValue = raw.trim() !== '' && !isNaN(num) && num > 0;
  const overThreshold = hasValue && num > PRAG;

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
    <div style={{
      background: C.bgElevated,
      border: `1px solid ${C.borderDefault}`,
      borderRadius: TOKENS.radii.xl,
      padding: '28px 24px',
      boxShadow: TOKENS.shadows.sm,
      marginTop: 40,
      marginBottom: 8,
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        color: C.accent,
        marginBottom: 8,
      }}>
        Alat
      </div>
      <h3 style={{
        fontFamily: FONT.display,
        fontSize: 20,
        fontWeight: 600,
        color: C.textPrimary,
        marginBottom: 6,
      }}>
        Brzi kalkulator PDV praga
      </h3>
      <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6, marginBottom: 22 }}>
        Unesite godišnji promet i provjerite jeste li iznad ili ispod praga od {fmt(PRAG)} €.
      </p>

      <label
        htmlFor="pdv-prag-input"
        style={{
          display: 'block', fontSize: 14, fontWeight: 600,
          marginBottom: 8, color: C.textPrimary,
        }}
      >
        Godišnji promet (EUR)
      </label>
      <input
        id="pdv-prag-input"
        type="text"
        inputMode="decimal"
        placeholder="npr. 55000"
        value={raw}
        onChange={e => setRaw(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={inputStyle}
        autoComplete="off"
      />

      {hasValue && (
        <div style={{
          marginTop: 16,
          padding: '14px 18px',
          borderRadius: TOKENS.radii.lg,
          background: overThreshold
            ? 'rgba(196,61,61,0.06)'
            : 'rgba(26,143,110,0.07)',
          border: `1.5px solid ${overThreshold
            ? 'rgba(196,61,61,0.22)'
            : TOKENS.colors.light.accent[100]}`,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}>
          <span style={{
            fontSize: 18,
            lineHeight: 1,
            marginTop: 1,
            flexShrink: 0,
          }}>
            {overThreshold ? '⚠️' : '✅'}
          </span>
          <div>
            <div style={{
              fontWeight: 700,
              fontSize: 14,
              color: overThreshold ? C.error : C.accent,
              marginBottom: 3,
            }}>
              {overThreshold
                ? 'Prešli ste prag'
                : 'Ispod praga'}
            </div>
            <div style={{
              fontSize: 13,
              color: C.textSecondary,
              lineHeight: 1.6,
            }}>
              {overThreshold
                ? 'U PDV ulazite od prvog sljedećeg dana nakon prelaska praga.'
                : 'Niste obvezni ući u PDV po ovoj osnovi.'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
