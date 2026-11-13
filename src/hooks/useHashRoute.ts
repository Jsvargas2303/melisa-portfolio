import { useEffect, useState } from 'react'
import type { ProjectId } from '../data/site'

export type Route =
  | { page: 'home'; section: string | null }
  | { page: 'project'; slug: ProjectId }
  | { page: 'unknown'; slug: string }

const PROJECTS = new Set(['pawmate', 'maze', 'public-services'])

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#/, '').split('/').filter(Boolean)
  if (parts.length === 0) return { page: 'home', section: null }
  if (parts[0] === 'projects' && parts[1]) {
    if (PROJECTS.has(parts[1])) return { page: 'project', slug: parts[1] as ProjectId }
    return { page: 'unknown', slug: parts[1] }
  }
  if ((parts[0] === 'projects' || parts[0] === 'about' || parts[0] === 'contact' || parts[0] === 'top') && !parts[1]) {
    return { page: 'home', section: parts[0] === 'top' ? null : parts[0] }
  }
  return { page: 'home', section: null }
}

export type HashRoute = Route & { hash: string; key: string }

export function useHashRoute(): HashRoute {
  const [hash, setHash] = useState(() => (typeof location !== 'undefined' ? location.hash : ''))
  useEffect(() => {
    const on = () => setHash(location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  const route = parseHash(hash)
  const key = route.page === 'project' ? `project:${route.slug}` : `home:${'section' in route ? route.section ?? '' : ''}`
  return { ...route, hash, key }
}

export function hrefProject(slug: string) {
  return `#/projects/${slug}`
}

export function hrefHome(section?: string) {
  if (!section || section === 'top') return '#/'
  return `#/${section}`
}
