import type {PortableTextBlock} from '@portabletext/types'
import {collapseWhiteSpace} from '../consts/collapse-white-space'

type PtToPlainTextOptions = {
  blockSeparator?: string
}

export function ptToPlainText(
  value: unknown,
  {blockSeparator = ' '}: PtToPlainTextOptions = {},
): string {
  if (!value) return ''
  if (typeof value === 'string') return collapseWhiteSpace(value)

  const blocks = value as PortableTextBlock[]
  if (!Array.isArray(blocks)) return ''

  const texts = blocks
    .filter((b) => b && (b as any)._type === 'block' && Array.isArray((b as any).children))
    .map((b) =>
      (b as any).children
        .map((child: any) => (typeof child?.text === 'string' ? child.text : ''))
        .join(''),
    )

  return collapseWhiteSpace(texts.join(blockSeparator))
}
