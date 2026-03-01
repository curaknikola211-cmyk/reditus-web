import { useState } from 'react';
import Icons from './Icons';
import { C, FONT, TOKENS } from './tokens';

// Single-open FAQ accordion.
// items: array of { q: string, a: string }
export default function Accordion({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${C.borderDefault}` }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            style={{
              width: '100%',
              padding: '20px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: FONT.body,
              fontSize: 16,
              fontWeight: 500,
              color: C.textPrimary,
              textAlign: 'left',
              gap: 16,
            }}
          >
            {item.q}
            <span style={{
              transform: open === i ? 'rotate(180deg)' : 'rotate(0)',
              transition: `transform ${TOKENS.motion.duration.fast} ${TOKENS.motion.easing.out}`,
              flexShrink: 0,
              color: C.accent,
            }}>
              <Icons.ChevronDown />
            </span>
          </button>

          <div style={{
            maxHeight: open === i ? 400 : 0,
            overflow: 'hidden',
            transition: `max-height ${TOKENS.motion.duration.fast} ${TOKENS.motion.easing.out}`,
          }}>
            <p style={{ padding: '0 0 20px', color: C.textSecondary, fontSize: 15, lineHeight: 1.7 }}>
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
