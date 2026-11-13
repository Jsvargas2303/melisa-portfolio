import { useEffect, useId, useRef, useState } from 'react'
import { usePrefs } from '../context/Prefs'
import { hrefHome, type HashRoute } from '../hooks/useHashRoute'
import { IconClose, IconMenu, IconMoon, IconSun } from './Icons'
import { cx } from '../lib'

export default function Header({ route }: { route: HashRoute }) {
  const { t, theme, toggleTheme, lang, setLang } = usePrefs()
  const [open, setOpen] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const btn = useRef<HTMLButtonElement>(null)
  const titleId = useId()

  useEffect(() => { setOpen(false) }, [route.key])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus() } }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panel.current?.querySelector<HTMLElement>('a, button')
    first?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const onHome = route.page === 'home'
  const projectsHref = onHome ? '#projects' : hrefHome('projects')
  const aboutHref = onHome ? '#about' : hrefHome('about')
  const contactHref = onHome ? '#contact' : hrefHome('contact')
  const logoHref = onHome ? '#top' : hrefHome()

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      <a href={projectsHref} onClick={onClick}>{t.navProjects}</a>
      <a href={aboutHref} onClick={onClick}>{t.navAbout}</a>
      <a href={contactHref} onClick={onClick}>{t.navContact}</a>
    </>
  )

  const Toggles = ({ large }: { large?: boolean }) => (
    <div className={cx('toggles', large && 'toggles-lg')}>
      <button
        type="button"
        className="icon-btn"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t.themeToLight : t.themeToDark}
        title={theme === 'dark' ? t.themeToLight : t.themeToDark}
      >
        {theme === 'dark' ? <IconSun /> : <IconMoon />}
      </button>
      <div className="lang-switch" role="group" aria-label="Language">
        <button
          type="button"
          className={cx('lang-btn', lang === 'en' && 'on')}
          aria-pressed={lang === 'en'}
          onClick={() => setLang('en')}
          lang="en"
        >
          EN
        </button>
        <button
          type="button"
          className={cx('lang-btn', lang === 'es' && 'on')}
          aria-pressed={lang === 'es'}
          onClick={() => setLang('es')}
          lang="es"
        >
          ES
        </button>
      </div>
    </div>
  )

  return (
    <header className="hdr">
      <a href={logoHref} className="logo" aria-label={t.logoAria}>MELISA</a>
      <nav className="hdr-nav" aria-label={t.navPrimary}>
        <NavLinks />
      </nav>
      <div className="hdr-end">
        <p className="mono tag">{t.tagline}</p>
        <div className="hdr-toggles">
          <Toggles />
        </div>
        <button
          ref={btn}
          type="button"
          className="icon-btn burger"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t.navClose : t.navOpen}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
      {open && (
        <div className="nav-overlay" onClick={() => setOpen(false)} />
      )}
      <div
        id="mobile-nav"
        ref={panel}
        className={cx('mobile-nav', open && 'open')}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <p id={titleId} className="sr-only">{t.navPrimary}</p>
        <nav className="mobile-links">
          <NavLinks onClick={() => setOpen(false)} />
        </nav>
        <Toggles large />
      </div>
    </header>
  )
}

