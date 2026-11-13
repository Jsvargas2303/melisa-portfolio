import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LANG_KEY, THEME_KEY, type Lang, type Theme } from '../data/site'
import { ui, type UICopy } from '../data/copy'

function initialTheme(): Theme {
  if (typeof document !== 'undefined') {
    const t = document.documentElement.getAttribute('data-theme')
    if (t === 'light' || t === 'dark') return t
  }
  return 'light'
}

function initialLang(): Lang {
  if (typeof document !== 'undefined') {
    const l = document.documentElement.lang
    if (l === 'en' || l === 'es') return l
  }
  return 'en'
}

type Prefs = {
  theme: Theme
  lang: Lang
  toggleTheme: () => void
  setLang: (l: Lang) => void
  t: UICopy
  reducedMotion: boolean
}

const Ctx = createContext<Prefs | null>(null)

export function PrefsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(initialTheme)
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [reducedMotion, setRM] = useState(
    () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)')
    const f = () => setRM(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    root.style.colorScheme = theme
    try { localStorage.setItem(THEME_KEY, theme) } catch { /* private mode */ }
    let meta = document.querySelector('meta[name="theme-color"]:not([media])') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'theme-color')
      document.head.appendChild(meta)
    }
    meta.content = theme === 'dark' ? '#12111a' : '#f3f1ec'
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem(LANG_KEY, lang) } catch { /* private mode */ }
  }, [lang])

  const toggleTheme = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  const setLang = useCallback((l: Lang) => setLangState(l), [])
  const t = ui[lang]
  const value = useMemo(
    () => ({ theme, lang, toggleTheme, setLang, t, reducedMotion }),
    [theme, lang, toggleTheme, setLang, t, reducedMotion],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function usePrefs() {
  const c = useContext(Ctx)
  if (!c) throw new Error('usePrefs must be used within PrefsProvider')
  return c
}
