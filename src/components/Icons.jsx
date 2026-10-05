const P = ({ children, size = 24, ...r }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...r}>{children}</svg>
)

export const Search = (p) => <P {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></P>
export const User = (p) => <P {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></P>
export const Book = (p) => <P {...p}><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M8 16c1-2 2-2.5 4-2.5s3 .5 4 2.5"/></P>
export const Bank = (p) => <P {...p}><path d="M3 9l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/></P>
export const Swap = (p) => <P {...p}><path d="M4 12a8 8 0 0114-5l2 2M20 12a8 8 0 01-14 5l-2-2M20 4v5h-5M4 20v-5h5"/></P>
export const Wallet = (p) => <P {...p}><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/></P>
export const Scan = (p) => <P {...p}><path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3"/><rect x="8" y="8" width="3" height="3"/><rect x="13" y="8" width="3" height="3"/><rect x="8" y="13" width="3" height="3"/><path d="M13 14h3v2"/></P>
export const Home = (p) => <P {...p}><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z"/></P>
export const Back = (p) => <P {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></P>
export const Close = (p) => <P {...p}><path d="M6 6l12 12M18 6L6 18"/></P>
export const Copy = (p) => <P {...p}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/></P>
export const Image = (p) => <P {...p}><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/></P>
export const Bolt = (p) => <P {...p}><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></P>
export const Flash = (p) => <P {...p}><path d="M8 3h8l-2 6h3l-6 12 1-8H8z"/></P>
export const Chev = (p) => <P {...p}><path d="M9 6l6 6-6 6"/></P>
export const Dots = (p) => (
  <svg width={p.size || 20} height={p.size || 20} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <circle cx="12" cy="5" r="2"/>
    <circle cx="12" cy="12" r="2"/>
    <circle cx="12" cy="19" r="2"/>
  </svg>
)

// GPay Action Icons
export const PayAnyoneIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M6 12h5" />
    <path d="M15 15l3-3-3-3" />
    <path d="M18 12h-4" />
  </svg>
)

export const MobileRechargeIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <path d="M12 18h.01" />
    <path d="M11 7l-2 5h4l-2 5" fill="currentColor" />
  </svg>
)

export const QrTileIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="3" height="3" />
    <path d="M20 14v3h-3" />
    <path d="M20 20h-3v-3" />
  </svg>
)

export const BankTileIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-5 9 5M5 10v7M9.5 10v7M14.5 10v7M19 10v7M2 20h20" />
  </svg>
)

export const RocketIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
  </svg>
)

export const TrophyIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fbbc04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
    <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </svg>
)

export const SpeedometerIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 14l3-3" stroke="#ea4335" strokeWidth="2.2" />
    <path d="M3.34 17a10 10 0 1 1 17.32 0" />
    <circle cx="12" cy="14" r="2" fill="currentColor" />
  </svg>
)

export const MoneyBagIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fbbc04" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 7a4 4 0 0 1 8 0v1h2a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-9a2 2 0 0 1 2-2h2V7z" fill="#fbbc04" fillOpacity="0.2" />
    <path d="M9 13h6" />
    <path d="M12 11v6" />
  </svg>
)

export const CreditCardIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#8ab4f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
)

// GPay Night Landscape SVG Header matching screenshots
export const GPayLandscape = () => (
  <div className="absolute top-0 inset-x-0 h-44 overflow-hidden pointer-events-none select-none z-0">
    <svg viewBox="0 0 500 180" preserveAspectRatio="none" className="w-full h-full opacity-60">
      {/* Sky Gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1716" />
          <stop offset="60%" stopColor="#142c22" />
          <stop offset="100%" stopColor="#111215" />
        </linearGradient>
      </defs>
      <rect width="500" height="180" fill="url(#skyGrad)" />
      
      {/* Moon */}
      <circle cx="140" cy="35" r="12" fill="#d4e8c1" opacity="0.35" />
      <circle cx="145" cy="33" r="10" fill="#0b1716" opacity="0.8" />

      {/* Stars */}
      <circle cx="60" cy="25" r="1" fill="#fff" opacity="0.4" />
      <circle cx="210" cy="40" r="1" fill="#fff" opacity="0.5" />
      <circle cx="340" cy="20" r="1" fill="#fff" opacity="0.3" />

      {/* Distant Hills */}
      <path d="M0 130 Q120 70 260 110 T500 90 L500 180 L0 180 Z" fill="#0e2319" opacity="0.7" />
      <path d="M0 145 Q160 100 320 135 T500 120 L500 180 L0 180 Z" fill="#143224" opacity="0.85" />
      
      {/* Foreground rolling green */}
      <path d="M0 160 Q180 130 360 155 T500 145 L500 180 L0 180 Z" fill="#19402e" opacity="0.9" />

      {/* Distant buildings */}
      <rect x="400" y="80" width="16" height="35" rx="1" fill="#0b1716" opacity="0.8" />
      <rect x="420" y="70" width="22" height="45" rx="1" fill="#081412" opacity="0.9" />
      <circle cx="426" cy="78" r="1.5" fill="#fbbc04" opacity="0.7" />
      <circle cx="434" cy="78" r="1.5" fill="#fbbc04" opacity="0.7" />
      <circle cx="426" cy="88" r="1.5" fill="#fbbc04" opacity="0.7" />
      <circle cx="434" cy="88" r="1.5" fill="#fbbc04" opacity="0.7" />

      {/* Tea stall / vendor cart illustration */}
      <g transform="translate(370, 110) scale(0.65)">
        <rect x="20" y="30" width="40" height="25" fill="#e37400" rx="3" />
        <line x1="25" y1="30" x2="25" y2="15" stroke="#777" strokeWidth="2" />
        <line x1="55" y1="30" x2="55" y2="15" stroke="#777" strokeWidth="2" />
        <path d="M15 15 L65 15 L60 8 L20 8 Z" fill="#4285f4" />
        <circle cx="30" cy="55" r="7" fill="#333" stroke="#bbb" strokeWidth="2" />
        <circle cx="50" cy="55" r="7" fill="#333" stroke="#bbb" strokeWidth="2" />
      </g>
    </svg>
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111215]/60 to-[#111215]" />
  </div>
)
