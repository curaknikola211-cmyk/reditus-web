import { useState } from 'react';
import { C, TOKENS } from './tokens';

// Generic card wrapper.
// hoverable  - adds lift + shadow on hover
// elevated   - starts with shadow-sm instead of shadow-xs
// onClick    - makes card interactive (pointer cursor + hover effect)
export default function Card({ children, style, elevated = false, hoverable = false, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const isInteractive = hoverable || !!onClick;
  const strongBorder = TOKENS.colors.light.border.strong;

  const lift = hovered && isInteractive ? 'translateY(-4px)' : 'translateY(0)';
  const shadow = hovered && isInteractive
    ? TOKENS.shadows.lg
    : elevated
      ? TOKENS.shadows.sm
      : TOKENS.shadows.xs;

  const focusShadow = focused && isInteractive
    ? `0 0 0 3px rgba(27, 58, 92, 0.18), ${shadow}`
    : shadow;

  const handleKeyDown = (e) => {
    if (!onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => isInteractive && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => isInteractive && setFocused(true)}
      onBlur={() => setFocused(false)}
      tabIndex={isInteractive ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      className={isInteractive ? 'card-hover-reset' : undefined}
      style={{
        background: C.bgElevated,
        borderRadius: TOKENS.radii.lg,
        border: `1px solid ${(hovered || focused) && isInteractive ? strongBorder : C.borderDefault}`,
        boxShadow: focusShadow,
        transform: lift,
        transition: `transform ${TOKENS.motion.duration.fast} ${TOKENS.motion.easing.out},
                     box-shadow ${TOKENS.motion.duration.fast} ${TOKENS.motion.easing.out},
                     border-color ${TOKENS.motion.duration.fast} ${TOKENS.motion.easing.out}`,
        cursor: isInteractive ? 'pointer' : 'default',
        outline: 'none',
        willChange: isInteractive ? 'transform, box-shadow' : 'auto',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
