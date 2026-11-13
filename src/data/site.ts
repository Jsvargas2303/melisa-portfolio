/**
 * All external links and site-wide editable settings live here.
 *
 * TODO — replace the LinkedIn and Instagram URLs with Melisa's actual
 * profile links when they are available. The Behance URL is already hers.
 *
 * TODO — add Figma prototype / file URLs to `figma` to reveal the
 * "View prototype" buttons on each case-study page.
 */
export const site = {
  name: 'Melisa Pardo',
  email: 'melipardo02@gmail.com',
  emailHref: 'mailto:melipardo02@gmail.com',
  socials: {
    behance: 'https://www.behance.net/melisapardo',
    /* TODO: replace with Melisa's actual LinkedIn profile URL */
    linkedin: 'https://linkedin.com',
    /* TODO: replace with Melisa's actual Instagram profile URL */
    instagram: 'https://instagram.com',
  },
  figma: {
    pawmate: null as string | null, // TODO: Figma prototype URL
    maze: null as string | null, // TODO: Maze report or prototype URL
    'public-services': null as string | null, // TODO: Figma design-system file URL
  },
} as const

export const THEME_KEY = 'melisa-theme'
export const LANG_KEY = 'melisa-lang'

export type Lang = 'en' | 'es'
export type Theme = 'light' | 'dark'
export type ProjectId = 'pawmate' | 'maze' | 'public-services'
