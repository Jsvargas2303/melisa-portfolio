import { useEffect, useRef, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { PrefsProvider, usePrefs } from './context/Prefs'
import { useHashRoute } from './hooks/useHashRoute'
import { projects, titles } from './data/copy'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import ProjectPage from './components/ProjectPage'

gsap.registerPlugin(ScrollTrigger, useGSAP)
const Aurora = lazy(() => import('./Aurora'))

function Shell() {
  const root = useRef<HTMLDivElement>(null)
  const route = useHashRoute()
  const { t, lang, reducedMotion, theme } = usePrefs()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const title =
      route.page === 'project'
        ? `${projects[route.slug][lang].title} — Melisa Pardo`
        : titles.home[lang]
    document.title = title
  }, [route, lang])

  useEffect(() => {
    if (reducedMotion) {
      window.scrollTo(0, 0)
      return
    }
    const lenis = new Lenis({ lerp: 0.09 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion, route.key])

  // Scroll to top on project pages; to a section when arriving at home with a hash section.
  useEffect(() => {
    const lenis = lenisRef.current
    const scrollTo = (target: string | number, immediate = false) => {
      if (lenis && !reducedMotion) lenis.scrollTo(target, { immediate, offset: target === 0 ? 0 : -64 })
      else if (typeof target === 'number') window.scrollTo({ top: target, behavior: reducedMotion || immediate ? 'auto' : 'smooth' })
      else {
        const el = document.querySelector(target)
        el?.scrollIntoView({ behavior: reducedMotion || immediate ? 'auto' : 'smooth', block: 'start' })
      }
    }
    if (route.page === 'project' || route.page === 'unknown') {
      scrollTo(0, true)
    } else if (route.section) {
      // Allow the home tree to paint first.
      requestAnimationFrame(() => scrollTo(`#${route.section}`))
    } else {
      scrollTo(0, true)
    }
    ScrollTrigger.refresh()
  }, [route.key, reducedMotion])

  // In-page anchor clicks on the home page (e.g. #projects) should use Lenis.
  useEffect(() => {
    if (route.page !== 'home') return
    const onClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement
      const href = a.getAttribute('href')
      if (!href || !href.startsWith('#') || href.startsWith('#/')) return
      e.preventDefault()
      const lenis = lenisRef.current
      if (lenis && !reducedMotion) lenis.scrollTo(href, { offset: -64 })
      else document.querySelector(href)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
      history.replaceState(null, '', href === '#top' ? '#/' : `#/${href.slice(1)}`)
    }
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]:not([href^="#/"])'))
    anchors.forEach((a) => a.addEventListener('click', onClick))
    return () => anchors.forEach((a) => a.removeEventListener('click', onClick))
  }, [route.key, reducedMotion, lang])

  useGSAP(() => {
    if (reducedMotion) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const page = root.current?.querySelector('.page-inner')
      if (page) gsap.from(page, { y: 28, opacity: 0, duration: 0.85, ease: 'expo.out' })

      if (route.page === 'home') {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.4 } })
        tl.from('.hdr > *', { y: -20, opacity: 0, stagger: 0.08, duration: 1 })
          .from('.hero-title .line > span', { yPercent: 110, stagger: 0.12 }, 0.2)
          .from('.hero-fade', { y: 24, opacity: 0, stagger: 0.08 }, 0.6)
          .from('.portrait-wrap', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6 }, 0.3)
          .from('.plant', { clipPath: 'inset(0% 0% 0% 100%)', duration: 1.6 }, 0.5)
          .from('.halo', { scale: 0.6, opacity: 0, duration: 2 }, 0.2)
          .from('.sticky', { rotate: 18, y: -40, opacity: 0, ease: 'back.out(2)' }, 1.1)
          .from('.scribble path', { strokeDashoffset: 600, duration: 2, ease: 'power2.inOut' }, 1)
        gsap.to('.seal svg', { rotation: 360, duration: 22, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
        gsap.to('.portrait-wrap img', { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
        gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) =>
          gsap.from(el, { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }),
        )
        gsap.utils.toArray<HTMLElement>('.rule').forEach((el) =>
          gsap.from(el, { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 92%' } }),
        )
        gsap.from('.card', { y: 80, opacity: 0, stagger: 0.12, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.cards', start: 'top 80%' } })
        gsap.from('.quote .w', { yPercent: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.quote', start: 'top 85%' } })
        gsap.from('.ws img', { scale: 1.25, ease: 'none', scrollTrigger: { trigger: '.ws', scrub: true } })
      } else {
        gsap.utils.toArray<HTMLElement>('.reveal-block').forEach((el) =>
          gsap.from(el, { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }),
        )
      }

      gsap.utils.toArray<HTMLElement>('.card').forEach((card) => {
        const img = card.querySelector('.card-visual')
        const ar = card.querySelector('.card-arrow')
        const enter = () => {
          gsap.to(img, { scale: 1.03, y: -6, duration: 0.8, ease: 'expo.out' })
          gsap.to(ar, { x: 6, backgroundColor: 'var(--ink)', color: 'var(--bg)', duration: 0.4 })
        }
        const leave = () => {
          gsap.to(img, { scale: 1, y: 0, duration: 0.8, ease: 'expo.out' })
          gsap.to(ar, { x: 0, backgroundColor: 'var(--card-arrow-bg)', color: 'var(--ink)', duration: 0.4 })
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8 })
        }
        const move = (e: PointerEvent) => {
          if (e.pointerType !== 'mouse') return
          const r = card.getBoundingClientRect()
          gsap.to(card, {
            rotateY: ((e.clientX - r.left) / r.width - 0.5) * 6,
            rotateX: -((e.clientY - r.top) / r.height - 0.5) * 6,
            duration: 0.6,
            transformPerspective: 900,
          })
        }
        card.addEventListener('pointerenter', enter)
        card.addEventListener('pointerleave', leave)
        card.addEventListener('pointermove', move)
      })

      gsap.utils.toArray<HTMLElement>('.magnetic').forEach((b) => {
        b.addEventListener('pointermove', (e: PointerEvent) => {
          if (e.pointerType !== 'mouse') return
          const r = b.getBoundingClientRect()
          gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.5 })
        })
        b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)' }))
      })
    })
    return () => mm.revert()
  }, { scope: root, dependencies: [route.key, lang, reducedMotion] })

  return (
    <div ref={root} data-theme-watch={theme}>
      <Suspense fallback={null}><Aurora /></Suspense>
      <a className="skip" href="#main">{t.skip}</a>
      <Header route={route} />
      <div className="page-inner" key={route.key + lang}>
        {route.page === 'home' && <Home />}
        {route.page === 'project' && <ProjectPage slug={route.slug} />}
        {route.page === 'unknown' && <ProjectPage notFound />}
      </div>
      <Footer route={route} />
    </div>
  )
}

export default function App() {
  return (
    <PrefsProvider>
      <Shell />
    </PrefsProvider>
  )
}
