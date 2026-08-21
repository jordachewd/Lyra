export const TEL_REGEX =
  /^(\+?[0-9]{1,4}[\s-.]*)?(\(?[0-9]{2,4}\)?[\s-.]*)?([0-9][0-9\s-.]{3,})(\s*(x|ext\.?)\s*\d+)?$/i

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const BASE_TEXT_REGEX = new RegExp(
  String.raw`^[\p{L}\p{M}\p{N}\p{Zs}.,!? :;\-\(\)"'\/@]+$`,
  'u',
)

export const SUSPICIOUS_PATTERNS = [
  /<\s*script/i,
  /<\s*\/\s*script/i,
  /<[^>]+>/,
  /<\/?[a-z][^>]*>/i,
  /javascript:/i,
  /onerror\s*=/i,
  /onload\s*=/i,
  /\bfunction\b/i,
  /\bimport\b/i,
  /\bexport\b/i,
  /\bconsole\./i,
  /\{.*\}/s,
]
