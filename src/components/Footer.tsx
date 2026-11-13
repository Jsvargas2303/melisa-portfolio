import { usePrefs } from '../context/Prefs'
import { hrefHome, type HashRoute } from '../hooks/useHashRoute'

export default function Footer({ route }: { route: HashRoute }) {
  const { t } = usePrefs()
  const topHref = route.page === 'home' ? '#top' : hrefHome()
  return (
    <footer className="foot mono small">
      <span>{t.copyright}</span>
      <span className="foot-mid">{t.footerRole}</span>
      <a href={topHref}>{t.backToTop}</a>
    </footer>
  )
}
