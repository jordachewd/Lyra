import {collapseWhiteSpace} from '../consts/collapse-white-space'
import {ptToPlainText} from './pt-to-plain-text'

type PreviewTitleFromPTOptions = {
  fallback?: string
  maxLength?: number
  ellipsis?: string
}

export function previewTitleFromPT(
  value: unknown,
  {fallback = 'Untitled', maxLength = 60, ellipsis = '…'}: PreviewTitleFromPTOptions = {},
): string {
  const base = collapseWhiteSpace(ptToPlainText(value) || '') || fallback
  if (!maxLength || base.length <= maxLength) return base

  const sliced = base.slice(0, maxLength)
  const neat = sliced.replace(/\s+\S*$/, '')
  return (neat || sliced).trimEnd() + ellipsis
}
