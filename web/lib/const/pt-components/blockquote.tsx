import {spansToPlainText} from '@/lib/utils/common/spans-to-plain-text'
import {PTChild} from '@/lib/types/pt-child'
import {PortableTextBlockComponent} from '@portabletext/react'
import {type PortableTextBlock} from '@portabletext/types'

export const Blockquote: PortableTextBlockComponent = ({children, value}) => {
  const text = spansToPlainText((value as PortableTextBlock).children as PTChild[])
  return <blockquote data-text={text}>{children}</blockquote>
}
