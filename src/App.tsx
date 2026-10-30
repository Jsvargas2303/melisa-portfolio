import { useRef, useEffect, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
gsap.registerPlugin(ScrollTrigger, useGSAP)
const Aurora = lazy(() => import('./Aurora'))
const Orb = lazy(() => import('./Orb'))

const projects = [
  { n: '01', t: 'PawMate', c: 'UX/UI Design · Social Impact', d: 'A kinder way to adopt. Connecting pets with people through a more human and accessible adoption experience.', tone: 'mint' },
  { n: '02', t: 'Clarity', c: 'UX/UI Design · Wellbeing', d: 'Understand your mind, day by day. A mental wellness app designed to make self-care more accessible and less overwhelming.', tone: 'lav' },
  { n: '03', t: 'Raíces', c: 'UX/UI Design · Community', d: 'Small actions, bigger communities. A platform that connects people, local initiatives and resources to strengthen communities from within.', tone: 'blue' },
]
const interests = ['Accessibility', 'Design Systems', 'Visual Storytelling', 'Social Impact', 'Product Design']
const links = [['Email me', 'mailto:melipardo02@gmail.com', '✉'], ['LinkedIn', 'https://linkedin.com', 'in'], ['Instagram', 'https://instagram.com', '◎'], ['Behance', 'https://behance.net', 'Bē']]
const Arrow = () => <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden><path d="M0 6h20M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.3" /></svg>

function Phone({ kind }: { kind: string }) {
  return <div className={`phone ph-${kind === 'Raíces' ? 'raices' : kind.toLowerCase()}`} aria-hidden>
    <div className="notch" />
    {kind === 'PawMate' && <><div className="pill">Adopt</div><div className="pet">🐶</div><p className="ph-h">Good things<br />take a home</p><span className="heart">♡</span></>}
    {kind === 'Clarity' && <><p className="ph-h">Small<br />steps, big<br />changes.</p><span className="plus">+</span><ul>{['Journal', 'Breathe', 'Reflect', 'Progress'].map(i => <li key={i}><i />{i}</li>)}</ul></>}
    {kind === 'Raíces' && <><p className="ph-h">Juntas<br />hacemos<br />comunidad</p><div className="leaf">🌿</div></>}
  </div>
}

function Seal() {
  const txt = 'DESIGN FOR A MORE INCLUSIVE WORLD • DESIGN FOR A MORE INCLUSIVE WORLD • '
  return <div className="seal" aria-hidden><svg viewBox="0 0 200 200"><defs><path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
    <text><textPath href="#circ">{txt}</textPath></text></svg><span className="star">✦</span></div>
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ lerp: 0.09 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000); gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'))
    const onClick = (e: Event) => { e.preventDefault(); lenis.scrollTo((e.currentTarget as HTMLAnchorElement).getAttribute('href')!, { offset: -64 }) }
    anchors.forEach(a => a.addEventListener('click', onClick))
    return () => { anchors.forEach(a => a.removeEventListener('click', onClick)); gsap.ticker.remove(tick); lenis.destroy() }
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
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
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => gsap.from(el, { y: 50, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }))
      gsap.utils.toArray<HTMLElement>('.rule').forEach(el => gsap.from(el, { scaleX: 0, transformOrigin: 'left', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 92%' } }))
      gsap.from('.card', { y: 80, opacity: 0, stagger: 0.12, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.cards', start: 'top 80%' } })
      gsap.from('.quote .w', { yPercent: 100, opacity: 0, stagger: 0.05, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.quote', start: 'top 85%' } })
      gsap.from('.ws img', { scale: 1.25, ease: 'none', scrollTrigger: { trigger: '.ws', scrub: true } })
    })
    gsap.utils.toArray<HTMLElement>('.card').forEach(card => {
      const img = card.querySelector('.card-img'), ar = card.querySelector('.card-arrow')
      card.addEventListener('pointerenter', () => { gsap.to(img, { scale: 1.06, y: -8, duration: 0.8, ease: 'expo.out' }); gsap.to(ar, { x: 6, backgroundColor: '#111', color: '#fff', duration: 0.4 }) })
      card.addEventListener('pointerleave', () => { gsap.to(img, { scale: 1, y: 0, duration: 0.8, ease: 'expo.out' }); gsap.to(ar, { x: 0, backgroundColor: '#fff', color: '#111', duration: 0.4 }); gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8 }) })
      card.addEventListener('pointermove', (e: PointerEvent) => { const r = card.getBoundingClientRect(); gsap.to(card, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 6, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 6, duration: 0.6, transformPerspective: 900 }) })
    })
    gsap.utils.toArray<HTMLElement>('.magnetic').forEach(b => {
      b.addEventListener('pointermove', (e: PointerEvent) => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.5 }) })
      b.addEventListener('pointerleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)' }))
    })
  }, { scope: root })

  const quote = 'A more inclusive internet is a kinder internet.'
  return <div ref={root}>
    <Suspense fallback={null}><Aurora /></Suspense>
    <a className="skip" href="#main">Skip to content</a>
    <header className="hdr">
      <a href="#top" className="logo">MELISA</a>
      <nav aria-label="Primary"><a href="#projects">Projects</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
      <p className="mono tag">Designing a more<br />inclusive tomorrow</p>
    </header>
    <main id="main">
      <section className="hero sec" id="top" aria-labelledby="h1">
        <div className="num mono">01</div>
        <div className="hero-copy">
          <p className="mono hero-fade">UX/UI Designer</p>
          <h1 id="h1" className="hero-title"><span className="line"><span>Hi, I’m</span></span><span className="line"><span>Melisa<i className="dot" /></span></span></h1>
          <p className="lead hero-fade">I design inclusive, meaningful and human-centered digital experiences that create a positive impact.</p>
          <div className="hero-cta hero-fade"><a href="#projects" className="btn magnetic">View projects <Arrow /></a><p className="mono small">People<br />Ideas<br />Impact</p></div>
        </div>
        <div className="hero-visual">
          <div className="halo" />
          <div className="portrait-wrap"><img src={`${import.meta.env.BASE_URL}assets/hero.jpg`} alt="Black and white portrait of Melisa smiling, resting her chin on her hand" /></div>
          <div className="scribble hand" aria-hidden><span>Good<br />design<br />brighter<br />people ♡</span>
            <svg viewBox="0 0 200 240"><path d="M100 10 C 30 10, 10 80, 20 140 C 30 210, 160 230, 185 150 C 200 90, 170 20, 95 18" fill="none" stroke="#6b5bd6" strokeWidth="1.4" strokeDasharray="600" /></svg></div>
          <Seal />
        </div>
        <div className="plant"><img src={`${import.meta.env.BASE_URL}assets/plant.jpg`} alt="Monstera plant in black and white" /><div className="sticky hand">Same passion.<br />A brighter<br />tomorrow ♡.</div></div>
        <aside className="hero-side hero-fade">
          <p className="serif big">Design is a tool to create a kinder, more inclusive and brighter world.</p>
          <span className="dash" /><p className="mono small">Based anywhere<br />Open to opportunities</p><span className="star">✦</span>
        </aside>
      </section>
      <hr className="rule" />
      <section className="sec projects" id="projects" aria-labelledby="h2">
        <div className="num mono">02</div>
        <div className="intro reveal"><h2 id="h2">Featured<br />Projects</h2><p>A selection of projects where design meets real people, real needs and real impact.</p><a href="#projects" className="mono link">View all projects <Arrow /></a></div>
        <div className="cards">{projects.map(p => <a href="#projects" className={`card ${p.tone}`} key={p.t} aria-label={`${p.t} — ${p.c}`}>
          <div className="card-txt"><span className="mono">{p.n}</span><h3>{p.t}</h3><p className="mono small">{p.c}</p><p className="desc">{p.d}</p></div>
          <div className="card-img"><Phone kind={p.t} /></div>
          <span className="card-arrow"><Arrow /></span></a>)}</div>
      </section>
      <hr className="rule" />
      <section className="sec about" id="about" aria-labelledby="h3">
        <div className="num mono">03</div>
        <div className="reveal"><h2 id="h3">About Me</h2><p>I’m a UX/UI Designer with a background in graphic design, passionate about creating meaningful experiences through research, design systems and visual storytelling. I’m especially interested in projects with a social impact and in making digital spaces more accessible for everyone.</p><a href="#contact" className="mono link">More about me <Arrow /></a></div>
        <figure className="ws reveal"><img src={`${import.meta.env.BASE_URL}assets/workspace.jpg`} alt="Black and white photo of Melisa's workspace with plants and posters" loading="lazy" /><div className="sticky hand s2">Design<br />People<br />Purpose ♡</div></figure>
        <div className="interests reveal"><h4>Areas of Interest</h4><ul>{interests.map(i => <li key={i}>{i}</li>)}</ul><span className="dash" /></div>
        <blockquote className="quote serif">“{quote.split(' ').map((w, i) => <span className="wm" key={i}><span className="w">{w}</span>&nbsp;</span>)}”<span className="dash" /></blockquote>
      </section>
      <hr className="rule" />
      <section className="sec contact" id="contact" aria-labelledby="h4">
        <div className="num mono">04</div>
        <div className="reveal"><h2 id="h4">Let’s connect</h2><p>I’d love to hear about your ideas, projects or opportunities.</p></div>
        <ul className="socials">{links.map(([l, h, i]) => <li key={l}><a className="mono magnetic" href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><b>{i}</b>{l}</a></li>)}</ul>
        <div className="sign"><Suspense fallback={<div className="orb" />}><Orb className="orb" /></Suspense><p className="mono small">Good<br />design<br />brighter<br />tomorrow</p></div>
      </section>
    </main>
    <footer className="foot mono small"><span>© 2026 Melisa</span><span>Swiss · Editorial · Aurora</span><a href="#top">Back to top ↑</a></footer>
  </div>
}
