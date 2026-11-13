/**
 * All external links and site-wide editable settings live here.
 *
 * Melisa asked to show only email, LinkedIn and Behance (no Instagram),
 * and to keep the Figma / prototype buttons hidden (leave `figma` null).
 */
export const site = {
  name: 'Melisa Pardo',
  email: 'melipardo02@gmail.com',
  emailHref: 'mailto:melipardo02@gmail.com',
  socials: {
    behance: 'https://www.behance.net/melisapardo',
    linkedin: 'https://www.linkedin.com/in/melisa-pardo-rosas',
  },
  figma: {
    pawmate: null as string | null, // hidden on purpose
    maze: null as string | null, // hidden on purpose
    'public-services': null as string | null, // hidden on purpose
  },
} as const

export const THEME_KEY = 'melisa-theme'
export const LANG_KEY = 'melisa-lang'

export type Lang = 'en' | 'es'
export type Theme = 'light' | 'dark'
export type ProjectId = 'pawmate' | 'maze' | 'public-services'
