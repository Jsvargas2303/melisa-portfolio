import { usePrefs } from '../context/Prefs'
import { mazeMetrics, nextOf, projects, type ProjectCopy } from '../data/copy'
import { projectImages } from '../data/images'
import { site, type ProjectId } from '../data/site'
import { hrefHome, hrefProject } from '../hooks/useHashRoute'
import { IconArrow, IconAtom, IconBolt, IconBulb, IconChart, IconCheck, IconClock, IconCursor, IconDoc, IconDrop, IconEye, IconFocus, IconHeart, IconLayers, IconList, IconMap, IconMolecule, IconOrganism, IconPaw, IconPerson, IconPhone, IconProto, IconSearch, IconSitemap, IconSmile, IconStar, IconTemplate, IconTest, IconTools, IconUsers, IconVariants, IconWire, IconXCircle, IconExternal } from './Icons'
import Carousel from './Carousel'
import ResponsiveImg from './ResponsiveImg'
import { cx } from '../lib'

const processIcons = [IconSearch, IconUsers, IconMap, IconSitemap, IconWire, IconHeart, IconProto, IconTest]
const mazeProcessIcons = [IconDoc, IconUsers, IconSearch, IconChart, IconBulb]
const atomicIcons = [IconDoc, IconAtom, IconMolecule, IconOrganism, IconTemplate, IconLayers]

function Meta({ p, t }: { p: ProjectCopy; t: { myRole: string; timeline: string; tools: string; focus: string } }) {
  const items = [
    { Icon: IconPerson, label: p.roleLabel || t.myRole, value: p.role },
    { Icon: IconClock, label: p.timelineLabel || t.timeline, value: p.timeline },
    { Icon: IconTools, label: p.toolsLabel || t.tools, value: p.tools },
    p.focus ? { Icon: IconFocus, label: p.focusLabel || t.focus, value: p.focus } : null,
  ].filter(Boolean) as { Icon: typeof IconPerson; label: string; value: string }[]
  return (
    <ul className="proj-meta">
      {items.map(({ Icon, label, value }) => (
        <li key={label}>
          <Icon />
          <div>
            <span className="mono small">{label}</span>
            <strong>{value}</strong>
          </div>
        </li>
      ))}
    </ul>
  )
}

function SectionHead({ n, title }: { n: string; title: string }) {
  return <h2 className="proj-h"><span className="mono">{n}</span> {title}</h2>
}

export default function ProjectPage({ slug, notFound }: { slug?: ProjectId; notFound?: boolean }) {
  const { t, lang } = usePrefs()
  if (notFound || !slug) {
    return (
      <main id="main" className="proj-missing">
        <p>{t.pageNotFound}</p>
        <a href={hrefHome()} className="btn">{t.backHome}</a>
      </main>
    )
  }
  const p = projects[slug][lang]
  const next = nextOf[slug]
  const nextP = projects[next][lang]
  const images = projectImages[slug]
  const figma = site.figma[slug]
  const tone = slug === 'pawmate' ? 'mint' : slug === 'maze' ? 'blue' : 'lav'

  return (
    <main id="main" className={cx('project-page', `tone-${tone}`)}>
      <div className="proj-hero sec">
        <a href={hrefHome('projects')} className="mono link back-link">
          ← {t.backToProjects}
        </a>
        <div className="proj-hero-grid">
          <div className="proj-hero-copy">
            <p className="mono kicker">{p.kicker}</p>
            <h1>{p.title}</h1>
            <p className="proj-sub">{p.subtitle}</p>
            <p className="proj-lead">{p.heroDescription}</p>
            <Meta p={p} t={t} />
            {figma && p.figmaLabel && (
              <a className="btn" href={figma} target="_blank" rel="noreferrer noopener">
                {p.figmaLabel} <IconExternal />
              </a>
            )}
          </div>
          <div className="proj-hero-visual">
            <div className="blob" aria-hidden />
            {p.handwritten && <p className="hand proj-hand pre" aria-hidden>{p.handwritten}</p>}
            <Carousel images={images} />
          </div>
        </div>
      </div>

      <div className="proj-body">
        {slug === 'pawmate' && <PawMateBody p={p} />}
        {slug === 'maze' && <MazeBody p={p} />}
        {slug === 'public-services' && <PublicBody p={p} />}
      </div>

      <div className="proj-foot">
        {figma && p.figmaLabel && (
          <a className="figma-cta" href={figma} target="_blank" rel="noreferrer noopener">
            {p.figmaLabel} <IconExternal />
          </a>
        )}
        <a className="next-cta" href={hrefProject(next)}>
          <span className="mono small">{t.nextProject}</span>
          <strong>{nextP.title}</strong>
          <IconArrow />
        </a>
      </div>
    </main>
  )
}

function PawMateBody({ p }: { p: ProjectCopy }) {
  return (
    <>
      <section className="proj-grid-3 reveal-block">
        <article className="panel">
          <SectionHead n="01." title={p.challengeTitle} />
          <p>{p.challengeIntro}</p>
          {p.challengeQs.map((q) => (
            <div className="qa" key={q.q}>
              <h3>{q.q}</h3>
              <p>{q.a}</p>
            </div>
          ))}
          {p.challengeNeeds && (
            <ul className="need-list">{p.challengeNeeds.map((n) => <li key={n}>{n}</li>)}</ul>
          )}
        </article>
        <article className="panel">
          <SectionHead n="02." title={p.processTitle} />
          <p>{p.processIntro}</p>
          <ul className="step-grid">
            {p.processSteps.map((s, i) => {
              const Icon = processIcons[i] ?? IconStar
              return (
                <li key={s.title}>
                  <span className="step-ico"><Icon /></span>
                  <b>{s.title}</b>
                  <span>{s.desc}</span>
                </li>
              )
            })}
          </ul>
        </article>
        <article className="panel solution-panel">
          <SectionHead n="03." title={p.solutionTitle ?? ''} />
          <p>{p.solutionBody}</p>
          {p.quote && <blockquote className="serif proj-quote">“{p.quote}”</blockquote>}
        </article>
      </section>

      <section className="impact-band reveal-block">
        <div>
          <SectionHead n="04." title={p.impactTitle} />
          <p>{p.impactIntro}</p>
          {p.learned && (
            <div className="qa"><h3>{p.learnedQ}</h3><p>{p.learned}</p></div>
          )}
        </div>
        {p.impactCards && (
          <ul className="impact-cards">
            {p.impactCards.map((c, i) => {
              const Icon = [IconPaw, IconHeart, IconStar][i] ?? IconStar
              return (
                <li key={c.title}>
                  <Icon />
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </li>
              )
            })}
          </ul>
        )}
        <aside className="whats-next">
          <h3>{p.whatsNextTitle}</h3>
          <ul>{p.whatsNext.map((w) => <li key={w}>{w}</li>)}</ul>
        </aside>
      </section>
    </>
  )
}

function MazeBody({ p }: { p: ProjectCopy }) {
  const { lang } = usePrefs()
  const metrics = [
    { ...mazeMetrics.success, tone: 'ok' },
    { ...mazeMetrics.time, tone: 'info' },
    { ...mazeMetrics.misclick, tone: 'warn' },
    { ...mazeMetrics.dropoff, tone: 'ok' },
    { ...mazeMetrics.responses, tone: 'info' },
    { ...mazeMetrics.ease, tone: 'info' },
  ]
  const findIcons = [IconEye, IconCursor, IconList]
  return (
    <>
      <section className="proj-grid-2 reveal-block">
        <article className="panel">
          <SectionHead n="01." title={p.challengeTitle} />
          <p>{p.challengeIntro}</p>
          {p.challengeQs.map((q) => (
            <div className="qa" key={q.q}><h3>{q.q}</h3><p>{q.a}</p></div>
          ))}
        </article>
        <article className="panel">
          <SectionHead n="02." title={p.processTitle} />
          <p>{p.processIntro}</p>
          <ol className="process-flow">
            {p.processSteps.map((s, i) => {
              const Icon = mazeProcessIcons[i] ?? IconStar
              return (
                <li key={s.title}>
                  <span className="step-ico"><Icon /></span>
                  <div>
                    <b>{i + 1}. {s.title}</b>
                    <span>{s.desc}</span>
                  </div>
                </li>
              )
            })}
          </ol>
        </article>
      </section>

      <section className="metrics-block reveal-block">
        <SectionHead n="03." title={p.metricsTitle ?? ''} />
        <p className="muted">{p.metricsIntro}</p>
        <ul className="metric-cards">
          {metrics.map((m) => (
            <li key={m.value + m.label.en} className={`metric ${m.tone}`}>
              <span className="mono small">{m.label[lang]}</span>
              <strong>{m.value}</strong>
            </li>
          ))}
        </ul>
      </section>

      <section className="proj-grid-3 findings-grid reveal-block">
        <article className="panel">
          <SectionHead n="04." title={p.findingsTitle ?? ''} />
          <p className="muted">{p.findingsIntro}</p>
          <ul className="finding-list">
            {p.findings?.map((f, i) => {
              const Icon = findIcons[i] ?? IconList
              return (
                <li key={f.title}>
                  <span className="step-ico"><Icon /></span>
                  <div>
                    <b>{f.title}</b>
                    {f.impact && <em className="mono small impact-tag">{f.impact}</em>}
                    <p>{f.desc}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </article>
        <article className="panel">
          <SectionHead n="05." title={p.recsTitle ?? ''} />
          <p className="muted">{p.recsIntro}</p>
          <ol className="rec-list">
            {p.recs?.map((r) => <li key={r}>{r}</li>)}
          </ol>
        </article>
        <article className="panel learn-panel">
          <SectionHead n="06." title={p.learningsTitle ?? ''} />
          <div className="learn-box">
            <h3>{p.keyLearningsTitle}</h3>
            <ul>{p.keyLearnings?.map((k) => <li key={k}><IconCheck /> {k}</li>)}</ul>
          </div>
          <div className="whats-next">
            <h3>{p.whatsNextTitle}</h3>
            <ul>{p.whatsNext.map((w) => <li key={w}>{w}</li>)}</ul>
          </div>
        </article>
      </section>

      {p.quote && (
        <blockquote className="serif proj-quote wide reveal-block">“{p.quote}”</blockquote>
      )}
    </>
  )
}

function PublicBody({ p }: { p: ProjectCopy }) {
  const { lang } = usePrefs()
  return (
    <>
      <section className="proj-grid-2 reveal-block">
        <article className="panel">
          <SectionHead n="01." title={p.challengeTitle} />
          <p>{p.challengeIntro}</p>
          {p.challengeQs.map((q) => (
            <div className="qa" key={q.q}><h3>{q.q}</h3><p>{q.a}</p></div>
          ))}
          {p.challengeIssues && (
            <div className="issues">
              <h3>{p.challengeIssues.title}</h3>
              <ul>
                {p.challengeIssues.items.map((it) => (
                  <li key={it}><IconXCircle />{it}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
        <article className="panel">
          <SectionHead n="02." title={p.processTitle} />
          <p>{p.processIntro}</p>
          <ol className="process-flow atomic-flow">
            {p.processSteps.map((s, i) => {
              const Icon = atomicIcons[i] ?? IconStar
              return (
                <li key={s.title}>
                  <span className="step-ico"><Icon /></span>
                  <div>
                    <b>{s.title}</b>
                    <span>{s.desc}</span>
                  </div>
                </li>
              )
            })}
          </ol>
        </article>
      </section>

      {p.libraryTitle && (
        <section className="panel reveal-block library-panel">
          <SectionHead n="03." title={p.libraryTitle} />
          <p className="muted">{p.libraryIntro}</p>
          <figure className="proj-figure">
            <ResponsiveImg
              image={projectImages['public-services'][0]}
              lang={lang}
              sizes="(max-width: 720px) 94vw, 1100px"
            />
          </figure>
        </section>
      )}

      <section className="proj-grid-2 together-grid reveal-block">
        <article>
          <SectionHead n="04." title={p.togetherTitle ?? ''} />
          <p>{p.togetherIntro}</p>
          <figure className="proj-figure">
            <ResponsiveImg
              image={projectImages['public-services'][1]}
              lang={lang}
              sizes="(max-width: 720px) 94vw, 700px"
            />
          </figure>
        </article>
        <article className="results-panel">
          <SectionHead n="05." title={p.resultsTitle ?? ''} />
          <p className="muted">{p.resultsIntro}</p>
          {p.stats && (
            <ul className="stat-grid">
              {p.stats.map((s, i) => {
                const Icon = [IconLayers, IconVariants, IconPhone, IconBolt][i] ?? IconStar
                return (
                  <li key={s.label}>
                    <Icon />
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </li>
                )
              })}
            </ul>
          )}
          {p.keyLearnings && (
            <div className="learn-box">
              <h3>{p.keyLearningsTitle}</h3>
              <ul>{p.keyLearnings.map((k) => <li key={k}><IconCheck /> {k}</li>)}</ul>
            </div>
          )}
          <div className="whats-next">
            <h3>{p.whatsNextTitle}</h3>
            <ul>{p.whatsNext.map((w) => <li key={w}>{w}</li>)}</ul>
          </div>
        </article>
      </section>
    </>
  )
}

