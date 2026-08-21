// Environment
const nodeEnv = process.env.NODE_ENV

// Environment flags
export const isDevelopment = nodeEnv === 'development'
export const isProduction = nodeEnv === 'production'

// Site
const publicUrl = process.env.NEXT_PUBLIC_SITE_URL
export const siteUrl = publicUrl ?? 'https://lyra.jwd-apps.com'

// Sanity (public). No fallback on purpose: the project id is deployment
// configuration, not source code. Missing value fails fast at client creation.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

const projData = process.env.NEXT_PUBLIC_SANITY_DATASET
export const dataset = projData ?? 'production'

const projApiVer = process.env.NEXT_PUBLIC_SANITY_API_VERSION
export const apiVersion = projApiVer ?? '2025-12-11'

// Sanity (private)
export const webhookSecret = process.env.SANITY_WEBHOOK_SECRET!
export const readToken = process.env.SANITY_READ_TOKEN!

// Google reCAPTCHA v3
export const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
export const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY!
export const recaptchaVerifyUrl = 'https://www.google.com/recaptcha/api/siteverify'

// Custom form lead relay. Unset disables custom-form submission cleanly.
export const leadRelayUrl = process.env.LEAD_RELAY_URL
