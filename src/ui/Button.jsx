import { useState } from 'react';
import { C, FONT, TOKENS } from './tokens';

// Variants: primary | secondary | ghost | destructive | gold
// Sizes:    sm | md | lg
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  style,
  type = 'button',
  fullWidth = false,
  disabled = false,
  loading = false,
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(false);

  const isDisabled = disabled || loading;
  const isLifted = hovered && !active && !isDisabled && variant !== 'ghost';

  const focusRingColor = {
    primary: 'rgba(27, 58, 92, 0.22)',
    secondary: 'rgba(27, 58, 92, 0.22)',
    ghost: 'rgba(27, 58, 92, 0.22)',
    destructive: 'rgba(196, 61, 61, 0.2)',
    gold: 'rgba(201, 168, 76, 0.24)',
  };

  const variantShadow = {
    primary: isLifted ? TOKENS.shadows.md : TOKENS.shadows.xs,
    secondary: isLifted ? TOKENS.shadows.sm : 'none',
    ghost: 'none',
    destructive: isLifted ? TOKENS.shadows.md : TOKENS.shadows.xs,
    gold: isLifted ? TOKENS.shadows.md : TOKENS.shadows.xs,
  };

  const base = {
    fontFamily: FONT.body,
    fontWeight: 600,
    letterSpacing: '0.01em',
    borderRadius: TOKENS.radii.md,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    border: '1px solid transparent',
    transition: `background-color ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out},
                 border-color ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out},
                 transform ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out},
                 box-shadow ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out},
                 opacity ${TOKENS.motion.duration.micro} ${TOKENS.motion.easing.out}`,
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: isDisabled ? 0.56 : 1,
    pointerEvents: isDisabled ? 'none' : 'auto',
    outline: 'none',
    transform: active || !isLifted ? 'translateY(0)' : 'translateY(-1px)',
    boxShadow: focused
      ? `0 0 0 3px ${focusRingColor[variant]}, ${variantShadow[variant]}`
      : variantShadow[variant],
    willChange: 'transform, box-shadow',
  };

  const sizes = {
    sm: { fontSize: 14, padding: '8px 16px', minHeight: 40 },
    md: { fontSize: 14, padding: '12px 24px', minHeight: 48 },
    lg: { fontSize: 15, padding: '16px 32px', minHeight: 56 },
  };

  const variantStyles = {
    primary: {
      background: active ? C.primaryDark : hovered ? C.primaryDark : C.primary,
      color: C.textInverse,
      borderColor: C.primary,
    },
    secondary: {
      background: hovered ? 'rgba(27,58,92,0.08)' : 'transparent',
      color: C.primary,
      borderColor: C.primary,
    },
    ghost: {
      background: hovered ? 'rgba(27,58,92,0.06)' : 'transparent',
      color: C.primary,
      borderColor: 'transparent',
      padding: '8px',
    },
    destructive: {
      background: active ? '#A93232' : hovered ? '#B83A3A' : '#D64F4F',
      color: C.textInverse,
      borderColor: '#B83A3A',
    },
    gold: {
      background: active ? '#B69741' : hovered ? C.goldLight : C.gold,
      color: C.textPrimary,
      borderColor: C.gold,
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className="ui-interactive"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{ ...base, ...sizes[size], ...variantStyles[variant], ...style }}
    >
      {loading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 16,
              height: 16,
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'spin 0.7s linear infinite',
            }}
          />
          Učitavanje…
        </span>
      ) : children}
    </button>
  );
}
