import { usePrefs } from '../context/Prefs'
import { mazeEase, mazeMetrics, mazeTasks, nextOf, type Metric, projects, type LibCopy, type ProjectCopy } from '../data/copy'
import { projectImages } from '../data/images'
import { site, type Lang, type ProjectId } from '../data/site'
import { hrefHome, hrefProject } from '../hooks/useHashRoute'
import {
  IconArrow, IconAtom, IconBolt, IconBulb, IconChart, IconCheck, IconChevron, IconClock, IconCursor, IconDoc,
  IconExternal, IconEye, IconFocus, IconHeart, IconLayers, IconList, IconMail, IconMap, IconMolecule, IconOrganism,
  IconPaw, IconPerson, IconPhone, IconPlus, IconProto, IconSearch, IconSitemap, IconSmile, IconStar, IconTemplate,
  IconTest, IconTools, IconUsers, IconVariants, IconWire, IconXCircle,
} from './Icons'
import Carousel from './Carousel'
import ResponsiveImg from './ResponsiveImg'
import { cx } from '../lib'

const pawProcessIcons = [IconSearch, IconUsers, IconMap, IconSitemap, IconWire, IconHeart, IconProto, IconTest]
const mazeProcessIcons = [IconDoc, IconProto, IconChart, IconSearch, IconBulb]
const publicProcessIcons = [IconSearch, IconAtom, IconLayers, IconVariants, IconPhone, IconSitemap]
const atomicIcons = [IconAtom, IconMolecule, IconOrganism, IconTemplate]

type UIt = { myRole: string; timeline: string; tools: string; focus: string }

function Meta({ p, t }: { p: ProjectCopy; t: UIt }) {
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
          <span className="meta-ico"><Icon /></span>
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

function HandNote({ text, className }: { text?: string; className?: string }) {
  if (!text) return null
  return <p className={cx('hand hand-note pre', className)} aria-hidden>{text}</p>
}

function Challenge({ p, n = '01.' }: { p: ProjectCopy; n?: string }) {
  return (
    <article className="panel">
      <SectionHead n={n} title={p.challengeTitle} />
      <p>{p.challengeIntro}</p>
      {p.challengeQs.map((q) => (
        <div className="qa" key={q.q}>
          <h3>{q.q}</h3>
          <p>{q.a}</p>
        </div>
      ))}
      {p.challengeNeeds && (
        <ul className="need-list">{p.challengeNeeds.map((x) => <li key={x}>{x}</li>)}</ul>
      )}
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
  )
}

function Process({ p, icons, layout, n = '02.' }: { p: ProjectCopy; icons: typeof pawProcessIcons; layout: 'grid' | 'flow'; n?: string }) {
  return (
    <article className="panel">
      <SectionHead n={n} title={p.processTitle} />
      <p>{p.processIntro}</p>
      <ol className={cx('step-grid', layout === 'flow' && 'step-flow')}>
        {p.processSteps.map((s, i) => {
          const Icon = icons[i] ?? IconStar
          return (
            <li key={s.title}>
              <span className="step-ico"><Icon /></span>
              <b><span className="step-n mono">{String(i + 1).padStart(2, '0')}</span> {s.title}</b>
              <span className="step-desc">{s.desc}</span>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

/** Outcome: What did I learn? / What improved? / What would I validate next? (from Melisa's document). */
function Outcome({ p, n }: { p: ProjectCopy; n: string }) {
  return (
    <section className="panel outcome reveal-block" aria-labelledby={`outcome-${n}`}>
      <h2 className="proj-h" id={`outcome-${n}`}><span className="mono">{n}</span> {p.outcomeTitle}</h2>
      <div className="outcome-grid">
        {p.learned && (
          <div className="outcome-col">
            <span className="outcome-ico"><IconBulb /></span>
            <h3>{p.learnedQ}</h3>
            <p>{p.learned}</p>
          </div>
        )}
        {p.improved && (
          <div className="outcome-col">
            <span className="outcome-ico"><IconCheck /></span>
            <h3>{p.improvedQ}</h3>
            <ul className="check-list">{p.improved.map((x) => <li key={x}><IconCheck /> {x}</li>)}</ul>
          </div>
        )}
        <div className="outcome-col whats-next">
          <span className="outcome-ico"><IconArrow /></span>
          <p className="mono small outcome-kicker">{p.whatsNextTitle}</p>
          <h3>{p.nextQ}</h3>
          <ul>{p.whatsNext.map((w) => <li key={w}>{w}</li>)}</ul>
        </div>
      </div>
    </section>
  )
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
    <main id="main" className={cx('project-page', `tone-${tone}`, `proj-${slug}`)}>
      <div className="proj-hero sec">
        <a href={hrefHome('projects')} className="mono link back-link">
          ← {t.backToProjects}
        </a>
        <div className="proj-hero-grid">
          <div className="proj-hero-copy">
            <p className="mono kicker"><span className="kicker-dot" aria-hidden />{p.kicker}</p>
            <h1>{p.title}</h1>
            <p className="proj-sub">{p.subtitle}</p>
            <p className="proj-lead">{p.heroDescription}</p>
            <Meta p={p} t={t} />
            {slug === 'maze' && <HeroMetrics lang={lang} />}
            {figma && p.figmaLabel && (
              <div className="proj-ctas">
                <a className="btn" href={figma} target="_blank" rel="noreferrer noopener">
                  {p.figmaLabel} <IconExternal />
                </a>
              </div>
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
            <IconHeart /> {p.figmaLabel} <IconExternal />
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

function Delta({ m, note }: { m: Metric; note?: string }) {
  if (!m.delta) return null
  const up = m.delta.dir === 'up'
  return (
    <span className="delta mono small">
      {up ? '↑' : '↓'} {m.delta.value}
      {note && <span className="delta-note"> {note}</span>}
    </span>
  )
}

function HeroMetrics({ lang }: { lang: Lang }) {
  const items = [mazeMetrics.success, mazeMetrics.time, mazeMetrics.misclick, mazeMetrics.dropoff]
  return (
    <ul className="hero-chips">
      {items.map((m) => (
        <li key={m.label.en}>
          <strong>{m.value[lang]}</strong>
          <span className="mono small">{m.label[lang]}</span>
          <Delta m={m} />
        </li>
      ))}
    </ul>
  )
}

function TaskChart({ p }: { p: ProjectCopy }) {
  const { lang } = usePrefs()
  const summary = mazeTasks.map((x) => `${x.label[lang]}: ${x.value}%`).join(', ')
  return (
    <figure className="task-chart panel">
      <figcaption>
        <h3>{p.tasksTitle}</h3>
        <p className="muted small-p">{p.tasksIntro}</p>
      </figcaption>
      <div className="task-plot" role="img" aria-label={`${p.tasksTitle}. ${summary}.`}>
        <div className="task-axis mono" aria-hidden>{[100, 75, 50, 25, 0].map((v) => <span key={v} style={{ bottom: `${v}%` }}>{v}%</span>)}</div>
        <div className="task-bars">
          <div className="task-grid" aria-hidden>{[100, 75, 50, 25, 0].map((v) => <span key={v} style={{ bottom: `${v}%` }} />)}</div>
          {mazeTasks.map((x, i) => (
            <div className="task-col" key={x.label.en}>
              <span className="ease-val mono">{x.value}%</span>
              <span className="task-bar" data-i={i} style={{ ['--h' as string]: `${x.value}%` }} />
              <span className="ease-x mono">{x.label[lang]}</span>
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}

/* ------------------------------ PawMate ------------------------------ */
function PawMateBody({ p }: { p: ProjectCopy }) {
  return (
    <>
      <section className="proj-grid-3 reveal-block">
        <Challenge p={p} />
        <Process p={p} icons={pawProcessIcons} layout="grid" />
        <article className="panel solution-panel">
          <SectionHead n="03." title={p.solutionTitle ?? ''} />
          <p>{p.solutionBody}</p>
          <HandNote text={p.handNotes?.[0]} className="note-solution" />
          {p.quote && <blockquote className="serif proj-quote">“{p.quote}”<IconPaw className="quote-paw" /></blockquote>}
        </article>
      </section>

      <section className="impact-band reveal-block">
        <div>
          <SectionHead n="04." title={p.impactTitle} />
          <p>{p.impactIntro}</p>
        </div>
        {p.impactCards && (
          <ul className="impact-cards">
            {p.impactCards.map((c, i) => {
              const Icon = [IconPaw, IconHeart, IconLayers][i] ?? IconStar
              return (
                <li key={c.title}>
                  <span className="step-ico"><Icon /></span>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <Outcome p={p} n="05." />
    </>
  )
}

/* ------------------------------ Maze ------------------------------ */
function EaseChart({ p }: { p: ProjectCopy }) {
  const { t } = usePrefs()
  const total = mazeEase.reduce((a, b) => a + b, 0)
  const max = Math.max(...mazeEase)
  const summary = mazeEase.map((c, i) => `${i + 1}: ${c} (${Math.round((c / total) * 100)}%)`).join(', ')
  return (
    <figure className="ease-chart panel">
      <figcaption>
        <h3>{p.easeTitle}</h3>
        <p className="muted small-p">{p.easeQuestion}</p>
      </figcaption>
      <div className="ease-bars" role="img" aria-label={`${p.easeTitle}. ${summary}.`}>
        {mazeEase.map((c, i) => (
          <div className="ease-col" key={i}>
            <span className="ease-val mono">{Math.round((c / total) * 100)}%</span>
            <span className="ease-bar" style={{ ['--h' as string]: `${(c / max) * 100}%` }} data-level={i + 1} />
            <span className="ease-x mono">{i + 1}</span>
            <span className="ease-n">{c} {c === 1 ? t.person : t.people}</span>
          </div>
        ))}
      </div>
      <div className="ease-scale mono small" aria-hidden><span>← {p.easeLow}</span><span>{p.easeHigh} →</span></div>
    </figure>
  )
}

function MazeBody({ p }: { p: ProjectCopy }) {
  const { lang, t } = usePrefs()
  const metrics = [
    { m: mazeMetrics.success, tone: 'ok', Icon: IconCheck },
    { m: mazeMetrics.time, tone: 'info', Icon: IconClock },
    { m: mazeMetrics.misclick, tone: 'info', Icon: IconCursor },
    { m: mazeMetrics.dropoff, tone: 'ok', Icon: IconBolt },
    { m: mazeMetrics.satisfaction, tone: 'ok', Icon: IconSmile },
    { m: mazeMetrics.ease, tone: 'info', Icon: IconUsers },
  ]
  const findIcons = [IconEye, IconCursor, IconList, IconStar]
  return (
    <>
      <section className="proj-grid-2 reveal-block">
        <Challenge p={p} />
        <Process p={p} icons={mazeProcessIcons} layout="flow" />
      </section>

      <section className="metrics-block reveal-block">
        <div className="metrics-head">
          <div>
            <SectionHead n="03." title={p.metricsTitle ?? ''} />
            <p className="muted">{p.metricsIntro}</p>
          </div>
          <HandNote text={p.handNotes?.[0]} className="note-metrics" />
        </div>
        <div className="metrics-layout v2">
          <ul className="metric-cards">
            {metrics.map(({ m, tone, Icon }) => (
              <li key={m.label.en} className={`metric ${tone}`}>
                <span className="metric-top"><Icon /><span className="mono small">{m.label[lang]}</span></span>
                <strong>{m.value[lang]}</strong>
                <Delta m={m} note={m === mazeMetrics.success ? p.deltaNote : undefined} />
              </li>
            ))}
          </ul>
          <div className="chart-stack">
            <TaskChart p={p} />
            <EaseChart p={p} />
          </div>
        </div>
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
                    {f.impact && <em className={cx('mono small impact-tag', i < 2 ? 'hi' : 'mid')}>{t.impactLevel}: {f.impact}</em>}
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
            {p.recs?.map((r) => (
              <li key={r.title}>
                <b>{r.title}</b>
                {r.impact && <em className={cx('mono small impact-tag', /high|alto/i.test(r.impact) ? 'hi' : 'mid')}>{t.impactLevel}: {r.impact}</em>}
                <p>{r.desc}</p>
              </li>
            ))}
          </ol>
          {p.recsFramework && <p className="mono small rec-note">{p.recsFramework}</p>}
        </article>
        <article className="panel learn-panel">
          <SectionHead n="06." title={p.learningsTitle ?? ''} />
          <div className="learn-box">
            <h3>{p.keyLearningsTitle}</h3>
            <ul>{p.keyLearnings?.map((k) => <li key={k}><IconCheck /> {k}</li>)}</ul>
          </div>
          {p.quote && <blockquote className="serif proj-quote">“{p.quote}”</blockquote>}
        </article>
      </section>

      <section className="impact-band impact-solo reveal-block">
        <div>
          <SectionHead n="07." title={p.impactTitle} />
          <p>{p.impactIntro}</p>
        </div>
      </section>

      <Outcome p={p} n="08." />
    </>
  )
}

/* ------------------------------ Public Services ------------------------------ */
function LiveLibrary({ lib }: { lib: LibCopy }) {
  const icons = [IconSearch, IconClock, IconPerson, IconMail, IconHeart, IconMap, IconPlus, IconCheck, IconDoc, IconPhone, IconStar, IconArrow]
  const tagTones = ['def', 'info', 'ok', 'warn', 'err']
  return (
    <div className="ds-lib">
      <p className="sr-only">{lib.srSummary}</p>
      <div className="ds-grid" aria-hidden="true">
        <div className="ds-card">
          <h4>{lib.buttons}</h4>
          <span className="ds-btn">{lib.primary}</span>
          <span className="ds-btn is-hover">{lib.hover}</span>
          <span className="ds-btn is-disabled">{lib.disabled}</span>
        </div>
        <div className="ds-card">
          <h4>{lib.inputs}</h4>
          <div className="ds-row"><span className="ds-lbl mono">{lib.default}</span><span className="ds-input">{lib.placeholder}</span></div>
          <div className="ds-row"><span className="ds-lbl mono">{lib.focus}</span><span className="ds-input is-focus">{lib.placeholder}<i className="ds-caret" /></span></div>
          <div className="ds-row"><span className="ds-lbl mono">{lib.error}</span><span className="ds-input is-error">{lib.placeholder}<IconXCircle /></span></div>
          <span className="ds-err-msg">{lib.errorMsg}</span>
        </div>
        <div className="ds-card">
          <h4>{lib.dropdown}</h4>
          <div className="ds-row"><span className="ds-lbl mono">{lib.default}</span><span className="ds-select">{lib.selectOption}<IconChevron dir="right" className="ds-chev" /></span></div>
          <div className="ds-row ds-row-top">
            <span className="ds-lbl mono">{lib.open}</span>
            <div className="ds-open">
              <span className="ds-select is-open">{lib.selectOption}<IconChevron dir="right" className="ds-chev up" /></span>
              <ul className="ds-menu">
                {lib.options.map((o, i) => <li key={o} className={i === 1 ? 'on' : undefined}>{o}</li>)}
              </ul>
            </div>
          </div>
        </div>
        <div className="ds-card">
          <h4>{lib.tags}</h4>
          <div className="ds-tags">
            {lib.tagList.map((tg, i) => <span key={tg} className={`ds-tag ${tagTones[i]}`}>{tg}</span>)}
          </div>
        </div>
        <div className="ds-card">
          <h4>{lib.icons}</h4>
          <div className="ds-icons">{icons.map((I, i) => <span key={i}><I /></span>)}</div>
        </div>
      </div>
      <p className="mono small ds-note">{lib.liveNote}</p>
    </div>
  )
}

function PublicBody({ p }: { p: ProjectCopy }) {
  const { lang } = usePrefs()
  return (
    <>
      <section className="proj-grid-2 reveal-block">
        <Challenge p={p} />
        <Process p={p} icons={publicProcessIcons} layout="grid" />
      </section>

      <section className="panel reveal-block library-panel">
        <div className="metrics-head">
          <div>
            <SectionHead n="03." title={p.libraryTitle ?? ''} />
            <p className="muted">{p.libraryIntro}</p>
          </div>
          <HandNote text={p.handNotes?.[0]} className="note-library" />
        </div>
        {p.atomicLevels && (
          <>
            <h3 className="sub-h">{p.atomicTitle}</h3>
            <ol className="atomic-levels">
              {p.atomicLevels.map((a, i) => {
                const Icon = atomicIcons[i] ?? IconStar
                return (
                  <li key={a.title}>
                    <span className="step-ico"><Icon /></span>
                    <b>{a.title}</b>
                    <span>{a.desc}</span>
                  </li>
                )
              })}
            </ol>
          </>
        )}
        {p.lib && <LiveLibrary lib={p.lib} />}
        <figure className="proj-figure">
          <ResponsiveImg image={projectImages['public-services'][0]} lang={lang} sizes="(max-width: 720px) 94vw, 1100px" />
        </figure>
      </section>

      <section className="proj-grid-2 together-grid reveal-block">
        <article className="panel">
          <SectionHead n="04." title={p.togetherTitle ?? ''} />
          <p>{p.togetherIntro}</p>
          <figure className="proj-figure">
            <ResponsiveImg image={projectImages['public-services'][1]} lang={lang} sizes="(max-width: 720px) 94vw, 700px" />
          </figure>
        </article>
        <article className="panel results-panel">
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
          <p>{p.impactIntro}</p>
          {p.keyLearnings && (
            <div className="learn-box">
              <h3>{p.keyLearningsTitle}</h3>
              <ul>{p.keyLearnings.map((k) => <li key={k}><IconCheck /> {k}</li>)}</ul>
            </div>
          )}
        </article>
      </section>

      <Outcome p={p} n="06." />
    </>
  )
}
