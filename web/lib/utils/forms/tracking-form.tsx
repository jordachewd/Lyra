import {slugToString} from '../common/slug-to-string'

const hasGtag = () => typeof window !== 'undefined' && typeof window.gtag === 'function'

export function formTrackStart(formKind: string) {
  if (!hasGtag()) return
  const label = slugToString(formKind)

  ;(window as Window & typeof globalThis).gtag?.('event', 'form_start', {
    event_category: 'engagement',
    event_label: label,
    form_type: formKind,
  })
}

export function formTrackSubmission(formKind: string) {
  if (!hasGtag()) return
  const label = slugToString(formKind)

  ;(window as Window & typeof globalThis).gtag?.('event', 'form_submit', {
    event_category: 'engagement',
    event_label: label,
    form_type: formKind,
  })
}

export function formTrackError(formKind: string, errorType: string) {
  if (!hasGtag()) return
  const label = slugToString(formKind)

  ;(window as Window & typeof globalThis).gtag?.('event', 'form_error', {
    event_category: 'engagement',
    event_label: label,
    form_type: formKind,
    error_type: errorType,
  })
}
