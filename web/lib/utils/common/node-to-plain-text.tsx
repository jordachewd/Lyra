import {ReactNode, isValidElement} from 'react'

export function nodeToPlainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(nodeToPlainText).join('')
  if (isValidElement(node)) {
    const child = (node.props as {children?: ReactNode}).children
    return nodeToPlainText(child ?? null)
  }
  return ''
}
