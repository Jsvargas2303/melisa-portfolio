import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Img } from '../data/images'
import { usePrefs } from '../context/Prefs'
import ResponsiveImg from './ResponsiveImg'
import { IconChevron, IconClose, IconMinus, IconPlus } from './Icons'

type Props = {
  images: Img[]
  className?: string
}

function fmt(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))
}

export default function Carousel({ images, className }: Props) {
  const { t, lang, reducedMotion } = usePrefs()
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const track = useRef<HTMLDivElement>(null)
  const viewport = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, dx: 0, id: 0 })
  const labelId = useId()
  const n = images.length
  if (n === 0) return null

  const go = useCallback((i: number) => {
    setIndex(((i % n) + n) % n)
  }, [n])

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    if ((e.target as HTMLElement).closest('button')) return
    drag.current = { active: true, startX: e.clientX, dx: 0, id: e.pointerId }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active) return
    drag.current.dx = e.clientX - drag.current.startX
    const el = track.current
    if (el) {
      const w = viewport.current?.offsetWidth ?? 1
      el.style.transition = 'none'
      el.style.transform = `translateX(${-index * 100 + (drag.current.dx / w) * 100}%)`
    }
  }
  const endDrag = () => {
    if (!drag.current.active) return
    const w = viewport.current?.offsetWidth ?? 1
    const dx = drag.current.dx
    drag.current.active = false
    const el = track.current
    if (el) el.style.transition = ''
    if (dx < -Math.min(60, w * 0.15)) go(index + 1)
    else if (dx > Math.min(60, w * 0.15)) go(index - 1)
    else if (el) el.style.transform = `translateX(${-index * 100}%)`
    drag.current.dx = 0
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(index - 1) }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(index + 1) }
    else if (e.key === 'Home') { e.preventDefault(); go(0) }
    else if (e.key === 'End') { e.preventDefault(); go(n - 1) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true) }
  }

  useEffect(() => {
    const el = track.current
    if (el) {
      el.style.transition = reducedMotion ? 'none' : ''
      el.style.transform = `translateX(${-index * 100}%)`
    }
  }, [index, reducedMotion])

  const status = fmt(t.slideOf, { n: index + 1, total: n })

  return (
    <div className={`carousel ${className ?? ''}`.trim()}>
      <div
        ref={viewport}
        className="carousel-vp"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-labelledby={labelId}
        onKeyDown={onKey}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <p id={labelId} className="sr-only">{t.carouselLabel}. {status}</p>
        <div className="carousel-track" ref={track}>
          {images.map((img, i) => (
            <div className="carousel-slide" key={img.id} aria-hidden={i !== index}>
              <button
                type="button"
                className="carousel-open"
                onClick={() => { if (Math.abs(drag.current.dx) < 8) setOpen(true) }}
                aria-label={`${t.openLightbox}: ${img.alt[lang]}`}
                tabIndex={i === index ? 0 : -1}
              >
                <ResponsiveImg
                  image={img}
                  lang={lang}
                  sizes="(max-width: 720px) 94vw, (max-width: 1100px) 80vw, 860px"
                  lazy={i !== 0}
                  priority={i === 0}
                />
              </button>
            </div>
          ))}
        </div>
        {n > 1 && (
          <>
            <button type="button" className="carousel-nav prev" onClick={() => go(index - 1)} aria-label={t.prevSlide}>
              <IconChevron dir="left" />
            </button>
            <button type="button" className="carousel-nav next" onClick={() => go(index + 1)} aria-label={t.nextSlide}>
              <IconChevron dir="right" />
            </button>
          </>
        )}
      </div>
      <div className="carousel-bar">
        <span className="mono small carousel-status" aria-live="polite">{status}</span>
        {n > 1 && (
          <div className="carousel-dots" role="tablist" aria-label={t.carouselLabel}>
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={fmt(t.goToSlide, { n: i + 1 })}
                className={i === index ? 'on' : ''}
                onClick={() => go(i)}
              />
            ))}
          </div>
        )}
      </div>
      {n > 1 && (
        <div className="carousel-thumbs" aria-hidden>
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              className={i === index ? 'on' : ''}
              onClick={() => go(i)}
              tabIndex={-1}
            >
              <ResponsiveImg image={img} lang={lang} sizes="96px" lazy className="thumb-img" decorative />
            </button>
          ))}
        </div>
      )}
      {open && (
        <Lightbox
          images={images}
          index={index}
          onIndex={go}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  )
}

function Lightbox({
  images, index, onIndex, onClose,
}: {
  images: Img[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const { t, lang, reducedMotion } = usePrefs()
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const wrap = useRef<HTMLDivElement>(null)
  const imgBox = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const dragging = useRef({ on: false, x: 0, y: 0, px: 0, py: 0 })
  const pinch = useRef({ d: 0, s: 1 })
  const n = images.length
  const img = images[index]

  const clampScale = (s: number) => Math.min(5, Math.max(1, s))

  useEffect(() => {
    lastFocus.current = document.activeElement as HTMLElement
    closeBtn.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      lastFocus.current?.focus()
    }
  }, [])

  useEffect(() => {
    setScale(1)
    setPan({ x: 0, y: 0 })
  }, [index])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onIndex(index - 1)
      else if (e.key === 'ArrowRight') onIndex(index + 1)
      else if (e.key === '+' || e.key === '=') setScale((s) => clampScale(s + 0.4))
      else if (e.key === '-' || e.key === '_') { setScale((s) => { const n = clampScale(s - 0.4); if (n === 1) setPan({ x: 0, y: 0 }); return n }) }
      else if (e.key === 'Tab' && wrap.current) {
        const f = Array.from(wrap.current.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'))
          .filter((el) => !el.hasAttribute('disabled'))
        if (!f.length) return
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose, onIndex])

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const next = clampScale(scale + (e.deltaY < 0 ? 0.2 : -0.2))
    setScale(next)
    if (next === 1) setPan({ x: 0, y: 0 })
  }

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    dragging.current = { on: true, x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current.on || scale <= 1) return
    setPan({
      x: dragging.current.px + (e.clientX - dragging.current.x),
      y: dragging.current.py + (e.clientY - dragging.current.y),
    })
  }
  const onUp = () => { dragging.current.on = false }

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const [a, b] = [e.touches[0], e.touches[1]]
      pinch.current = { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), s: scale }
    }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinch.current.d) {
      const [a, b] = [e.touches[0], e.touches[1]]
      const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
      const next = clampScale(pinch.current.s * (d / pinch.current.d))
      setScale(next)
      if (next === 1) setPan({ x: 0, y: 0 })
    }
  }

  const dbl = () => {
    if (scale > 1) { setScale(1); setPan({ x: 0, y: 0 }) }
    else setScale(2.2)
  }

  const status = fmt(t.slideOf, { n: index + 1, total: n })

  return createPortal(
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={t.openLightbox}
      ref={wrap}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="lightbox-top">
        <span className="mono small">{status}</span>
        <span className="mono small lightbox-hint">{t.zoomHint}</span>
        <div className="lightbox-actions">
          <button type="button" onClick={() => setScale((s) => clampScale(s + 0.4))} aria-label={t.zoomIn}><IconPlus /></button>
          <button type="button" onClick={() => { setScale((s) => { const n = clampScale(s - 0.4); if (n === 1) setPan({ x: 0, y: 0 }); return n }); }} aria-label={t.zoomOut}><IconMinus /></button>
          <button type="button" ref={closeBtn} onClick={onClose} aria-label={t.closeLightbox}><IconClose /></button>
        </div>
      </div>
      {n > 1 && (
        <>
          <button type="button" className="lightbox-nav prev" onClick={() => onIndex(index - 1)} aria-label={t.prevSlide}><IconChevron dir="left" /></button>
          <button type="button" className="lightbox-nav next" onClick={() => onIndex(index + 1)} aria-label={t.nextSlide}><IconChevron dir="right" /></button>
        </>
      )}
      <div
        className="lightbox-stage"
        ref={imgBox}
        onWheel={onWheel}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onDoubleClick={dbl}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{ cursor: scale > 1 ? 'grab' : 'zoom-in' }}
      >
        <div
          className="lightbox-img"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transition: reducedMotion || dragging.current.on ? 'none' : 'transform .25s ease',
          }}
        >
          <ResponsiveImg
            image={img}
            lang={lang}
            sizes="100vw"
            lazy={false}
            className="lightbox-photo"
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
