import {ArbitraryTypedObject, PortableTextSpan} from '@portabletext/types'

type Child = PortableTextSpan | ArbitraryTypedObject

function isSpan(c: Child): c is PortableTextSpan {
  return (
    (c as PortableTextSpan)?._type === 'span' && typeof (c as PortableTextSpan).text === 'string'
  )
}

export function spansToPlainText(children: Child[] | undefined): string {
  if (!children) return ''
  return (
    children
      .map((c) => (isSpan(c) ? c.text : ''))
      .join('')
      .trim() ?? ''
  )
}
