import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { title?: string }

const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true as const, stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

export const IconArrow = (p: P) => (
  <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden {...p}>
    <path d="M0 6h20M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
)

export const IconSun = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="4" /><path d="M12 3v1.5M12 19.5V21M4.9 4.9l1.1 1.1M18 18l1.1 1.1M3 12h1.5M19.5 12H21M4.9 19.1 6 18M18 6l1.1-1.1" /></svg>
)
export const IconMoon = (p: P) => (
  <svg {...base} {...p}><path d="M18 13.5A7 7 0 1 1 10.5 6 5.5 5.5 0 0 0 18 13.5z" /></svg>
)
export const IconMenu = (p: P) => (
  <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const IconClose = (p: P) => (
  <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const IconChevron = ({ dir = 'left', ...p }: P & { dir?: 'left' | 'right' }) => (
  <svg {...base} {...p}><path d={dir === 'left' ? 'M14.5 5 8 12l6.5 7' : 'M9.5 5 16 12l-6.5 7'} /></svg>
)
export const IconPlus = (p: P) => (
  <svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
)
export const IconMinus = (p: P) => (
  <svg {...base} {...p}><path d="M5 12h14" /></svg>
)
export const IconPerson = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="8" r="3.2" /><path d="M5 19c1.2-3.2 3.5-4.8 7-4.8s5.8 1.6 7 4.8" /></svg>
)
export const IconClock = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8" /><path d="M12 8v4.5l3 1.5" /></svg>
)
export const IconTools = (p: P) => (
  <svg {...base} {...p}><path d="M14.5 6.5a3.5 3.5 0 0 0-5 4.7L5 15.7 8.3 19l4.5-4.5a3.5 3.5 0 0 0 4.7-5L15 12l-3-3 2.5-2.5z" /></svg>
)
export const IconFocus = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /><path d="M12 4v2M12 18v2M4 12h2M18 12h2" /></svg>
)
export const IconPaw = (p: P) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <ellipse cx="7" cy="8" rx="2" ry="2.4" />
    <ellipse cx="17" cy="8" rx="2" ry="2.4" />
    <ellipse cx="10" cy="5" rx="1.7" ry="2.1" />
    <ellipse cx="14" cy="5" rx="1.7" ry="2.1" />
    <path d="M12 11c-3.4 0-5.5 2.4-5.5 5 0 1.8 1.5 2.6 3 2.2 1-.3 1.7-1 2.5-1s1.5.7 2.5 1c1.5.4 3-.4 3-2.2 0-2.6-2.1-5-5.5-5z" />
  </svg>
)
export const IconHeart = (p: P) => (
  <svg {...base} {...p}><path d="M12 19s-6.5-4.2-8.2-7.4C2.2 8.8 4 6 6.8 6c1.6 0 3 1 3.7 2.4C11.2 7 12.6 6 14.2 6c2.8 0 4.6 2.8 3 5.6C18.5 14.8 12 19 12 19z" /></svg>
)
export const IconStar = (p: P) => (
  <svg {...base} {...p}><path d="m12 3 2.4 5.6L20 9.5l-4.2 4 1 6-4.8-2.8L7.2 19.5l1-6L4 9.5l5.6-.9L12 3z" /></svg>
)
export const IconCheck = (p: P) => (
  <svg {...base} {...p}><path d="M5 12.5 9.5 17 19 7" /></svg>
)
export const IconXCircle = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8" /><path d="m9 9 6 6M15 9l-6 6" /></svg>
)
export const IconCursor = (p: P) => (
  <svg {...base} {...p}><path d="m5 4 14 8.2-6.3 1.4L10.5 20 5 4z" /></svg>
)
export const IconEye = (p: P) => (
  <svg {...base} {...p}><path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" /><circle cx="12" cy="12" r="2.6" /></svg>
)
export const IconList = (p: P) => (
  <svg {...base} {...p}><path d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01" /></svg>
)
export const IconLayers = (p: P) => (
  <svg {...base} {...p}><path d="m12 4 9 5-9 5-9-5 9-5zM3 14l9 5 9-5" /></svg>
)
export const IconVariants = (p: P) => (
  <svg {...base} {...p}><circle cx="8" cy="10" r="3" /><circle cx="16" cy="10" r="3" /><circle cx="12" cy="16" r="3" /></svg>
)
export const IconPhone = (p: P) => (
  <svg {...base} {...p}><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></svg>
)
export const IconBolt = (p: P) => (
  <svg {...base} {...p}><path d="M13 3 5 13h7l-1 8 8-10h-7l1-8z" /></svg>
)
export const IconSearch = (p: P) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6" /><path d="m20 20-3.5-3.5" /></svg>
)
export const IconUsers = (p: P) => (
  <svg {...base} {...p}><circle cx="9" cy="8.5" r="2.6" /><path d="M3.8 18c.8-2.6 2.5-4 5.2-4s4.4 1.4 5.2 4" /><circle cx="16.5" cy="9" r="2.1" /><path d="M15.2 14.2c1.8.2 3.3 1.3 4 3.3" /></svg>
)
export const IconMap = (p: P) => (
  <svg {...base} {...p}><path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4v13" /></svg>
)
export const IconSitemap = (p: P) => (
  <svg {...base} {...p}><rect x="9" y="3" width="6" height="5" rx="1" /><rect x="3" y="16" width="6" height="5" rx="1" /><rect x="15" y="16" width="6" height="5" rx="1" /><path d="M12 8v4H6v4M12 12h6v4" /></svg>
)
export const IconWire = (p: P) => (
  <svg {...base} {...p}><rect x="4" y="5" width="16" height="14" rx="1.5" /><path d="M4 9h16M8 5v4" /></svg>
)
export const IconProto = (p: P) => (
  <svg {...base} {...p}><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M10 17h4" /></svg>
)
export const IconTest = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8" /><path d="m8.5 12 2.5 2.5 4.5-5" /></svg>
)
export const IconAtom = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="2" /><ellipse cx="12" cy="12" rx="9" ry="4" /><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(-60 12 12)" /></svg>
)
export const IconMolecule = (p: P) => (
  <svg {...base} {...p}><circle cx="8" cy="12" r="3" /><circle cx="16.5" cy="8" r="2.4" /><circle cx="16" cy="16.5" r="2.4" /><path d="M10.6 10.6 14.6 9.2M10.5 13.8l3.4 1.8" /></svg>
)
export const IconOrganism = (p: P) => (
  <svg {...base} {...p}><rect x="4" y="6" width="16" height="12" rx="2" /><path d="M4 10h16M8 6v4" /></svg>
)
export const IconTemplate = (p: P) => (
  <svg {...base} strokeDasharray="3 2" {...p}><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
)
export const IconDoc = (p: P) => (
  <svg {...base} {...p}><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></svg>
)
export const IconChart = (p: P) => (
  <svg {...base} {...p}><path d="M4 19h16M7 16v-5M12 16V8M17 16v-8" /></svg>
)
export const IconBulb = (p: P) => (
  <svg {...base} {...p}><path d="M9 18h6M10 21h4" /><path d="M8 14c-1.6-1.4-2.5-3.2-2.5-5A6.5 6.5 0 0 1 18.5 9c0 1.8-.9 3.6-2.5 5L15 16H9l-1-2z" /></svg>
)
export const IconDrop = (p: P) => (
  <svg {...base} {...p}><path d="M8 8h8l-1.2 10H9.2L8 8zM10 4h4" /></svg>
)
export const IconSmile = (p: P) => (
  <svg {...base} {...p}><circle cx="12" cy="12" r="8" /><path d="M9 10h.01M15 10h.01M8.5 14.5c1 1.4 2.2 2 3.5 2s2.5-.6 3.5-2" /></svg>
)
export const IconMail = (p: P) => (
  <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
)
export const IconExternal = (p: P) => (
  <svg {...base} width={16} height={16} {...p}><path d="M8 6H5.5A1.5 1.5 0 0 0 4 7.5v9A1.5 1.5 0 0 0 5.5 18h9a1.5 1.5 0 0 0 1.5-1.5V14M12 4h6v6M10 12 18 4" /></svg>
)
