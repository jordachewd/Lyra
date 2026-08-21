import {PortableTextBlock} from '@portabletext/types'

function isPortableTextBlock(value: unknown): value is PortableTextBlock & {children?: unknown[]} {
  return (
    typeof value === 'object' && value !== null && (value as {_type?: string})._type === 'block'
  )
}

function isSpanLike(value: unknown): value is {text?: string} {
  return typeof value === 'object' && value !== null && 'text' in value
}

export function ptToPlainText(blocks?: PortableTextBlock[] | unknown, max = 160) {
  if (!Array.isArray(blocks)) return ''
  const text = blocks
    .map((block: unknown) => {
      if (!isPortableTextBlock(block)) return ''
      const children = Array.isArray(block.children) ? block.children : []
      return children
        .map((child: unknown) => (isSpanLike(child) ? (child.text ?? '') : ''))
        .join('')
    })
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.slice(0, max)
}
