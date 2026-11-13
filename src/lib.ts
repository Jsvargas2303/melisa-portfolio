export function asset(path: string) {
  const base = import.meta.env.BASE_URL || './'
  return `${base}${path.replace(/^\//, '')}`
}

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function srcSet(variants: Record<string, string>) {
  return Object.entries(variants)
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(([w, p]) => `${asset(p)} ${w}w`)
    .join(', ')
}

export function fallbackSrc(variants: Record<string, string>) {
  const widths = Object.keys(variants).map(Number).sort((a, b) => a - b)
  const mid = widths[Math.max(0, widths.length - 2)] ?? widths[0]
  return asset(variants[String(mid)])
}
