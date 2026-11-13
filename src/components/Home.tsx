import { lazy, Suspense } from 'react'
import { usePrefs } from '../context/Prefs'
import { projects, projectOrder, mazeMetrics } from '../data/copy'
import { covers } from '../data/images'
import { hrefProject } from '../hooks/useHashRoute'
import { IconArrow } from './Icons'
import ResponsiveImg from './ResponsiveImg'
import { site } from '../data/site'

const Orb = lazy(() => import('../Orb'))

function Seal({ text }: { text: string }) {
  return (
    <div className="seal" aria-hidden>
      <svg viewBox="0 0 200 200">
        <defs>
          <path id="circ" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text><textPath href="#circ">{text}</textPath></text>
      </svg>
      <span className="star">✦</span>
    </div>
  )
}

export default function Home() {
  const { t, lang } = usePrefs()
  const quote = t.quote
  const links: [string, string, string][] = [
    [t.emailMe, site.emailHref, '✉'],
    [t.linkedin, site.socials.linkedin, 'in'],
    [t.behance, site.socials.behance, 'Bē'],
  ]

  return (
    <main id="main">
      <section className="hero sec" id="top" aria-labelledby="h1">
        <div className="num mono">01</div>
        <div className="hero-copy">
          <p className="mono hero-fade">{t.role}</p>
          <h1 id="h1" className="hero-title">
            <span className="line"><span>{t.heroTitle1}</span></span>
            <span className="line"><span>{t.heroTitle2}<i className="dot" /></span></span>
          </h1>
          <p className="lead hero-fade">{t.heroLead}</p>
          <div className="hero-cta hero-fade">
            <a href="#projects" className="btn magnetic">{t.viewProjects} <IconArrow /></a>
            <p className="mono small pre">{t.peopleIdeasImpact}</p>
          </div>
        </div>
        <div className="hero-visual">
          <div className="halo" />
          <div className="portrait-wrap" role="img" aria-hidden="true" />
          <div className="scribble hand" aria-hidden>
            <span className="pre">{t.scribble}</span>
            <svg viewBox="0 0 200 240"><path d="M100 10 C 30 10, 10 80, 20 140 C 30 210, 160 230, 185 150 C 200 90, 170 20, 95 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="600" /></svg>
          </div>
          <Seal text={t.seal} />
        </div>
        <div className="plant">
          <div className="sticky hand pre">{t.sticky1}</div>
        </div>
        <aside className="hero-side hero-fade">
          <p className="serif big">{t.heroSide}</p>
          <span className="dash" />
          <p className="mono small">{t.based}<br />{t.openTo}</p>
          <span className="star">✦</span>
        </aside>
      </section>

      <hr className="rule" />

      <section className="sec projects" id="projects" aria-labelledby="h2">
        <div className="num mono">02</div>
        <div className="intro reveal">
          <h2 id="h2" className="pre">{t.featuredTitle}</h2>
          <p>{t.featuredIntro}</p>
        </div>
        <div className="cards">
          {projectOrder.map((id, i) => {
            const p = projects[id][lang]
            const cover = covers[id]
            return (
              <a
                href={hrefProject(id)}
                className={`card card-${id} ${id === 'pawmate' ? 'mint' : id === 'maze' ? 'blue' : 'lav'}`}
                key={id}
                aria-label={`${p.title} — ${p.subtitle}. ${t.viewCase}`}
              >
                <div className="card-txt">
                  {i === 0 && <span className="pill">{t.featuredProject}</span>}
                  <span className="mono card-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{p.title}</h3>
                  <p className="mono small card-sub">{p.subtitle}</p>
                  <p className="desc">{p.cardDescription}</p>
                </div>
                <div className="card-visual">
                  {id === 'maze' ? (
                    <div className="card-metrics" aria-hidden>
                      <ResponsiveImg image={cover} lang={lang} sizes="(max-width: 720px) 90vw, 320px" className="card-photo" decorative />
                      <div className="metric-float">
                        <div className="mf-row">
                          <span>{mazeMetrics.success.label[lang]}</span>
                          <strong>{mazeMetrics.success.value[lang]}</strong>
                        </div>
                        <span className="mf-bar"><i /></span>
                        <div className="mf-grid">
                          <div><span>{mazeMetrics.time.label[lang]}</span><b>{mazeMetrics.time.value[lang]}</b></div>
                          <div><span>{mazeMetrics.misclick.label[lang]}</span><b>{mazeMetrics.misclick.value[lang]}</b></div>
                        </div>
                      </div>
                    </div>
                  ) : id === 'public-services' ? (
                    <div className="card-ds" aria-hidden>
                      <div className="cds-row">
                        <span className="cds-btn">{t.psChips.button}</span>
                        <span className="cds-round"><IconArrow /></span>
                      </div>
                      <span className="cds-select">{t.psChips.select}<i>⌄</i></span>
                      <div className="cds-row">
                        <span className="cds-appt"><b className="mono">{t.psChips.appt}</b>{t.psChips.apptTime}</span>
                        <span className="cds-col">
                          <span className="cds-toggle"><i /></span>
                          <span className="cds-tag">✓ {t.psChips.success}</span>
                        </span>
                      </div>
                      <div className="cds-row">
                        <span className="cds-swatches"><i /><i /><i /><i /></span>
                        <span className="cds-aa">Aa</span>
                      </div>
                    </div>
                  ) : (
                    <ResponsiveImg image={cover} lang={lang} sizes="(max-width: 720px) 90vw, 560px" className="card-photo" decorative />
                  )}
                </div>
                <span className="card-arrow" aria-hidden><IconArrow /></span>
              </a>
            )
          })}
        </div>
      </section>

      <hr className="rule" />

      <section className="sec about" id="about" aria-labelledby="h3">
        <div className="num mono">03</div>
        <div className="reveal">
          <h2 id="h3">{t.aboutTitle}</h2>
          <p>{t.aboutBody}</p>
        </div>
        <figure className="ws reveal">
          <div className="sticky hand s2 pre">{t.sticky2}</div>
        </figure>
        <div className="interests reveal">
          <h4>{t.interestsTitle}</h4>
          <ul>{t.interests.map((i) => <li key={i}>{i}</li>)}</ul>
          <span className="dash" />
        </div>
        <blockquote className="quote serif">
          “{quote.split(' ').map((w, i) => <span className="wm" key={i}><span className="w">{w}</span>&nbsp;</span>)}”
          <span className="dash" />
        </blockquote>
      </section>

      <hr className="rule" />

      <section className="sec contact" id="contact" aria-labelledby="h4">
        <div className="num mono">04</div>
        <div className="reveal">
          <h2 id="h4">{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
        </div>
        <ul className="socials">
          {links.map(([label, href, icon]) => (
            <li key={label}>
              <a
                className="mono magnetic"
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
              >
                <b>{icon}</b>{label}
              </a>
            </li>
          ))}
        </ul>
        <div className="sign">
          <Suspense fallback={<div className="orb" />}>
            <Orb className="orb" />
          </Suspense>
          <p className="mono small pre">{t.signoff}</p>
        </div>
      </section>
    </main>
  )
}
