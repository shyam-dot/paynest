const P = ({ children, size = 24, ...r }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...r}>{children}</svg>
)
export const Logo = ({ size = 96 }) => (
  <svg width={size} height={size} viewBox="0 0 512 512"><path d="M130 170h170l-40 40H170v136h-40z" fill="#22d081"/><path d="M200 262h130v84H200z" fill="#22d081"/><path d="M290 130h92v92h-40v-24l-62 62-28-28 62-62h-24z" fill="#22d081"/></svg>
)
export const Search = (p) => <P {...p}><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></P>
export const User = (p) => <P {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></P>
export const Book = (p) => <P {...p}><rect x="5" y="3" width="14" height="18" rx="2"/><circle cx="12" cy="10" r="2.5"/><path d="M8 16c1-2 2-2.5 4-2.5s3 .5 4 2.5"/></P>
export const Bank = (p) => <P {...p}><path d="M3 9l9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/></P>
export const Swap = (p) => <P {...p}><path d="M4 12a8 8 0 0114-5l2 2M20 12a8 8 0 01-14 5l-2-2M20 4v5h-5M4 20v-5h5"/></P>
export const Wallet = (p) => <P {...p}><rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10h18M16 15h2"/></P>
export const Scan = (p) => <P {...p}><path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3"/><rect x="8" y="8" width="3" height="3"/><rect x="13" y="8" width="3" height="3"/><rect x="8" y="13" width="3" height="3"/><path d="M13 14h3v2"/></P>
export const Home = (p) => <P {...p}><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6H9v6H5a1 1 0 01-1-1z"/></P>
export const Money = (p) => <P {...p}><circle cx="12" cy="12" r="9"/><path d="M14.5 9a2.5 2 0 00-2.5-1.5c-1.5 0-2.5.8-2.5 1.8 0 2.4 5 1.2 5 3.6 0 1-1 1.8-2.5 1.8a2.7 2 0 01-2.6-1.5M12 6v1.5M12 16.5V18"/></P>
export const Back = (p) => <P {...p}><path d="M19 12H5M11 6l-6 6 6 6"/></P>
export const Close = (p) => <P {...p}><path d="M6 6l12 12M18 6L6 18"/></P>
export const Copy = (p) => <P {...p}><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/></P>
export const Image = (p) => <P {...p}><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/></P>
export const Bolt = (p) => <P {...p}><path d="M13 3L5 14h6l-1 7 8-11h-6z"/></P>
export const Shield = (p) => <P {...p}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></P>
export const Flash = (p) => <P {...p}><path d="M8 3h8l-2 6h3l-6 12 1-8H8z"/></P>
export const Chev = (p) => <P {...p}><path d="M9 6l6 6-6 6"/></P>
