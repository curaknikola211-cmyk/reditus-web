// ─── INLINE SVG ICON LIBRARY ─────────────────────────────────────
// All icons from reditus-website.jsx, kept pixel-perfect.

const Icons = {
  Menu: () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 12h18M3 6h18M3 18h18"/>
    </svg>
  ),
  X: () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.67 5L7.5 14.17 3.33 10"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 7.5l5 5 5-5"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 3l5 5-5 5"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10h10M11 6l4 4-4 4"/>
    </svg>
  ),
  Phone: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A18 18 0 013 6a2 2 0 012-2"/>
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="4" width="16" height="12" rx="2"/>
      <path d="M2 4l8 6 8-6"/>
    </svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M10 17S4 11.5 4 8a6 6 0 1112 0c0 3.5-6 9-6 9z"/>
      <circle cx="10" cy="8" r="2"/>
    </svg>
  ),
  Star: () => (
    <svg width="18" height="18" fill="#C9A84C" stroke="none">
      <path d="M9 1l2.47 5.01L17 6.76l-4 3.9.94 5.5L9 13.77l-4.94 2.39.94-5.5-4-3.9 5.53-.75z"/>
    </svg>
  ),
  Calculator: () => (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="2" width="24" height="28" rx="3"/>
      <rect x="8" y="6" width="16" height="6" rx="1" fill="currentColor" opacity=".15"/>
      <circle cx="10" cy="17" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="17" r="1.5" fill="currentColor"/>
      <circle cx="22" cy="17" r="1.5" fill="currentColor"/>
      <circle cx="10" cy="23" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="23" r="1.5" fill="currentColor"/>
      <circle cx="22" cy="23" r="1.5" fill="currentColor"/>
    </svg>
  ),
  FileText: () => (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 4a2 2 0 012-2h10l8 8v18a2 2 0 01-2 2H8a2 2 0 01-2-2V4z"/>
      <path d="M18 2v8h8"/>
      <path d="M10 16h12M10 21h12M10 26h8" strokeWidth="1.2"/>
    </svg>
  ),
  Users: () => (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="10" r="5"/>
      <path d="M2 28a10 10 0 0120 0"/>
      <circle cx="22" cy="12" r="3.5"/>
      <path d="M30 28a7 7 0 00-10-6"/>
    </svg>
  ),
  Shield: () => (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 2L4 8v8c0 7.73 5.12 14.95 12 17 6.88-2.05 12-9.27 12-17V8L16 2z"/>
      <path d="M11 16l3 3 6-6" strokeWidth="2"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 26l8-10 5 5L28 6"/>
      <path d="M20 6h8v8"/>
    </svg>
  ),
  Clock: () => (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="16" cy="16" r="13"/>
      <path d="M16 8v8l5 3" strokeWidth="2"/>
    </svg>
  ),
};

export default Icons;
