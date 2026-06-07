export const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export const IconSearch = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export const IconPlus = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export const IconX = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
export const IconFilter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
export const IconCompass = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M16.5 7.5l-2.5 5-5 2.5 2.5-5 5-2.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
export const IconFridge = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M5 10h14" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 6v2M9 14v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
export const IconBookmark = ({ className }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 3h12a1 1 0 011 1v16l-7-4-7 4V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
export const IconBookmarkFilled = ({ className }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 3h12a1 1 0 011 1v16l-7-4-7 4V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor"/>
  </svg>
);
export const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
export const IconCoin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7v10M9.5 9.5C9.5 8.67 10.67 8 12 8s2.5.67 2.5 1.5S13.33 11 12 11s-2.5.83-2.5 1.5S10.67 16 12 16s2.5-.67 2.5-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const IconLeaf = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M12 22c0-6-4-10-9-11 0 5 3 9 7 10.5M12 22V12M12 12C12 6 17 2 22 2c0 5-3 9-7 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─── NOWE IKONY ───────────────────────────────────────────────────────────────

export const IconArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 21C12 21 3 14.5 3 8.5A5 5 0 0112 5.5 5 5 0 0121 8.5C21 14.5 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);
export const IconHeartFilled = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 21C12 21 3 14.5 3 8.5A5 5 0 0112 5.5 5 5 0 0121 8.5C21 14.5 12 21 12 21z" stroke="currentColor" strokeWidth="1.8" fill="currentColor" strokeLinejoin="round" />
  </svg>
);
export const IconClock = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconRefresh = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 12a8 8 0 018-8 8 8 0 016.93 4M20 12a8 8 0 01-8 8 8 8 0 01-6.93-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 4v4h-4M4 20v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconPlay = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6 4l14 8-14 8V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);