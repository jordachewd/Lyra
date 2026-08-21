import {toNestedImageField} from '@/lib/images/normalize'
import type {AnyImageField} from '@/lib/images/types'
import type {SectionOf} from '@/lib/zod/website/content/page'
import type {Section} from '@/lib/zod/website/layout/sections'

export function getOgImage(sections: Section[]): AnyImageField | undefined {
  const imgs: AnyImageField[] = []

  for (const s of sections) {
    if (s.kind === 'hero') {
      const section = s as SectionOf<'hero'>
      const sImg = toNestedImageField(section.image as AnyImageField)
      const hasImg = !!sImg?.image?.asset?.url
      if (hasImg) imgs.push(sImg)
    }

    if (s.kind === 'textImage') {
      const section = s as SectionOf<'textImage'>
      const sImg = toNestedImageField(section.image)
      const hasImg = !!sImg?.image?.asset?.url
      if (hasImg) imgs.push(sImg)
    }
  }

  if (!imgs.length) return undefined

  const scored = imgs
    .map((raw) => {
      const img = toNestedImageField(raw)
      const dims = img?.image?.asset?.metadata?.dimensions
      const aspect =
        typeof dims?.aspectRatio === 'number'
          ? dims.aspectRatio
          : dims && dims.width && dims.height
            ? dims.width / dims.height
            : 0

      const wide = aspect >= 1.6 ? 1 : 0
      const big = (dims?.width ?? 0) >= 1200 ? 1 : 0

      return {img, score: wide * 2 + big}
    })
    .sort((a, b) => b.score - a.score)

  return scored[0]?.img
}
