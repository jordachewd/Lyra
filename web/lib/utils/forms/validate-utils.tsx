import {SUSPICIOUS_PATTERNS, BASE_TEXT_REGEX, TEL_REGEX, EMAIL_REGEX} from './validate-regex'

export function normalizeTel(raw: string): string {
  const trimmed = raw.trim()
  return trimmed.replace(/(?!^\+)[^\d]/g, '')
}

export function isSafeTel(raw: string): boolean {
  const val = raw.trim()
  if (!val) return true
  if (isSuspicious(val)) return false
  return TEL_REGEX.test(val)
}

export function isSafeEmail(raw: string): boolean {
  const val = raw.trim()
  if (!val) return true
  if (isSuspicious(val)) return false
  return EMAIL_REGEX.test(val)
}

function isSuspicious(raw: string): boolean {
  const v = raw.trim()
  if (!v) return false
  return SUSPICIOUS_PATTERNS.some((rx) => rx.test(v))
}

export function isPlainSafeText(raw: string, opts?: {multiline?: boolean}): boolean {
  const val = raw.trim()
  if (!val) return true
  if (isSuspicious(val)) return false

  if (opts?.multiline) {
    return val.split(/\r?\n/).every((line) => BASE_TEXT_REGEX.test(line))
  }

  return BASE_TEXT_REGEX.test(val)
}
