// ─── REDITUS DESIGN TOKENS — SOURCE OF TRUTH ─────────────────────
// Extracted from reditus-design-system.jsx (v1.0).
// Do NOT edit colors/typography/spacing here without updating the
// design system document.

export const TOKENS = {
  colors: {
    light: {
      primary: {
        50: "#EEF2F7", 100: "#D4DFEC", 200: "#A9BFD9", 300: "#7E9FC6",
        400: "#5380B3", 500: "#1B3A5C", 600: "#163050", 700: "#112644",
        800: "#0C1C38", 900: "#07122C",
      },
      accent: {
        50: "#EDFAF5", 100: "#D1F3E6", 200: "#A3E7CD", 300: "#74DBB4",
        400: "#46CF9B", 500: "#1A8F6E", 600: "#157A5E", 700: "#10654E",
        800: "#0B503E", 900: "#063B2E",
      },
      neutral: {
        0: "#FFFFFF", 25: "#FAFBFC", 50: "#F5F6F8", 100: "#EBEDF0",
        200: "#D8DBE0", 300: "#B8BCC4", 400: "#9198A1", 500: "#6B737E",
        600: "#515861", 700: "#3B4149", 800: "#262B31", 900: "#14171B",
      },
      semantic: {
        success: { light: "#E8F8EF", base: "#1A8F6E", dark: "#10654E" },
        warning: { light: "#FFF8E6", base: "#D4930D", dark: "#A07009" },
        error:   { light: "#FEF0F0", base: "#C43D3D", dark: "#9A2E2E" },
        info:    { light: "#EEF2F7", base: "#1B3A5C", dark: "#112644" },
      },
      bg:     { primary: "#FFFFFF", secondary: "#F5F6F8", tertiary: "#EBEDF0", elevated: "#FFFFFF", inverse: "#14171B" },
      text:   { primary: "#14171B", secondary: "#515861", tertiary: "#6B737E", inverse: "#FFFFFF", link: "#1B3A5C" },
      border: { default: "#D8DBE0", subtle: "#EBEDF0", strong: "#B8BCC4", focus: "#1B3A5C" },
    },
    dark: {
      bg:     { primary: "#0D1017", secondary: "#12151A", tertiary: "#181C22", elevated: "#1F242B", inverse: "#F5F6F8" },
      text:   { primary: "#EBEDF0", secondary: "#9198A1", tertiary: "#6B737E", inverse: "#14171B", link: "#7E9FC6" },
      border: { default: "#2A3039", subtle: "#1F242B", strong: "#3B4149", focus: "#5380B3" },
    },
  },
  typography: {
    families: {
      display: "'Source Serif 4', 'Georgia', serif",
      body:    "'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif",
      mono:    "'IBM Plex Mono', 'Consolas', monospace",
    },
    scale: {
      display: { size: "3.5rem",   lineHeight: 1.1,  weight: 600, tracking: "-0.025em" },
      h1:      { size: "2.75rem",  lineHeight: 1.15, weight: 600, tracking: "-0.02em"  },
      h2:      { size: "2rem",     lineHeight: 1.2,  weight: 600, tracking: "-0.015em" },
      h3:      { size: "1.5rem",   lineHeight: 1.3,  weight: 600, tracking: "-0.01em"  },
      h4:      { size: "1.25rem",  lineHeight: 1.35, weight: 600, tracking: "0"        },
      lead:    { size: "1.125rem", lineHeight: 1.65, weight: 400, tracking: "0"        },
      body:    { size: "1rem",     lineHeight: 1.65, weight: 400, tracking: "0"        },
      small:   { size: "0.875rem", lineHeight: 1.55, weight: 400, tracking: "0.005em" },
      caption: { size: "0.75rem",  lineHeight: 1.5,  weight: 500, tracking: "0.02em"  },
    },
    measure: { narrow: "45ch", default: "65ch", wide: "80ch" },
  },
  spacing: {
    "0.5": 4, "1": 8, "1.5": 12, "2": 16, "3": 24,
    "4": 32, "5": 40, "6": 48,  "8": 64, "10": 80,
  },
  radii: { sm: 4, md: 8, lg: 12, xl: 16, "2xl": 20, full: 9999 },
  shadows: {
    xs: "0 1px 2px rgba(20,23,27,0.05)",
    sm: "0 1px 3px rgba(20,23,27,0.08), 0 1px 2px rgba(20,23,27,0.04)",
    md: "0 4px 12px rgba(20,23,27,0.08), 0 2px 4px rgba(20,23,27,0.04)",
    lg: "0 8px 24px rgba(20,23,27,0.1),  0 4px 8px rgba(20,23,27,0.04)",
    xl: "0 16px 48px rgba(20,23,27,0.12), 0 8px 16px rgba(20,23,27,0.04)",
  },
  motion: {
    duration: { instant: "80ms", micro: "150ms", fast: "240ms", normal: "320ms", slow: "480ms" },
    easing: {
      default: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      out:     "cubic-bezier(0, 0, 0.25, 1)",
      inOut:   "cubic-bezier(0.42, 0, 0.58, 1)",
    },
  },
  zIndex: { dropdown: 100, sticky: 200, overlay: 300, modal: 400, toast: 500 },
};

// ─── LIGHT-MODE COLOR SHORTCUTS ──────────────────────────────────
// Use C.primary, C.accent, C.bgSecondary etc. in components.
const lc = TOKENS.colors.light;

export const C = {
  // Brand
  primary:       lc.primary[500],   // #1B3A5C — navy, CTAs, headings
  primaryDark:   lc.primary[600],   // #163050 — hover state
  primaryLight:  lc.primary[50],    // #EEF2F7 — tinted backgrounds
  accent:        lc.accent[500],    // #1A8F6E — emerald, success, highlights
  accentDark:    lc.accent[600],    // #157A5E — hover state
  accentLight:   lc.accent[50],     // #EDFAF5 — tinted backgrounds
  accentMid:     lc.accent[300],    // #74DBB4 — on dark backgrounds (replaces mint)

  // Surfaces
  bgPrimary:     lc.bg.primary,     // #FFFFFF
  bgSecondary:   lc.bg.secondary,   // #F5F6F8 — warm/off-white sections
  bgTertiary:    lc.bg.tertiary,    // #EBEDF0 — cream sections
  bgElevated:    lc.bg.elevated,    // #FFFFFF — cards
  bgInverse:     lc.bg.inverse,     // #14171B — dark sections (footer, CTA bar)

  // Text
  textPrimary:   lc.text.primary,   // #14171B
  textSecondary: lc.text.secondary, // #515861
  textTertiary:  lc.text.tertiary,  // #6B737E
  textInverse:   lc.text.inverse,   // #FFFFFF
  textLink:      lc.text.link,      // #1B3A5C

  // Borders
  borderDefault: lc.border.default, // #D8DBE0
  borderSubtle:  lc.border.subtle,  // #EBEDF0
  borderFocus:   lc.border.focus,   // #1B3A5C

  // Semantic
  error:         lc.semantic.error.base,    // #C43D3D
  success:       lc.semantic.success.base,  // #1A8F6E
  warning:       lc.semantic.warning.base,  // #D4930D

  // Gold — used only for pricing highlight badge (no direct token equivalent)
  gold:          "#C9A84C",
  goldLight:     "#E8D49A",
};

// ─── FONT ALIAS ───────────────────────────────────────────────────
export const FONT = TOKENS.typography.families;
