import { fallbackSrc, srcSet } from '../lib'
import type { Img } from '../data/images'
import type { Lang } from '../data/site'

type Props = {
  image: Img
  lang: Lang
  sizes: string
  className?: string
  lazy?: boolean
  priority?: boolean
  onClick?: () => void
  decorative?: boolean
}

export default function ResponsiveImg({ image, lang, sizes, className, lazy = true, priority, onClick, decorative }: Props) {
  return (
    <img
      src={fallbackSrc(image.variants)}
      srcSet={srcSet(image.variants)}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={decorative ? '' : image.alt[lang]}
      loading={priority ? 'eager' : lazy ? 'lazy' : 'eager'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      onClick={onClick}
      draggable={false}
    />
  )
}
