import {nodeToPlainText} from '@/lib/utils/common/node-to-plain-text'
import {PortableTextMarkComponent} from '@portabletext/react'

export const QMark: PortableTextMarkComponent = ({children}) => {
  const text = nodeToPlainText(children).trim()
  return <q data-text={text}>{children}</q>
}
