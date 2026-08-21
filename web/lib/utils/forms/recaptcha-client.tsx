let recaptchaLoaded = false

import {toRecaptchaAction} from './recaptcha-action'

export async function getRecaptchaToken(siteKey: string, action: string) {
  if (typeof window === 'undefined') return null

  const safeAction = toRecaptchaAction(action)

  try {
    if (!recaptchaLoaded) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement('script')
        s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
        s.async = true
        s.onload = () => {
          recaptchaLoaded = true
          resolve()
        }
        s.onerror = () => reject(new Error('reCAPTCHA failed to load'))
        document.head.appendChild(s)
      })
    }

    if (!window.grecaptcha) return null

    return await new Promise<string | null>((resolve) => {
      window.grecaptcha!.ready(() => {
        window
          .grecaptcha!.execute(siteKey, {action: safeAction})
          .then((token) => resolve(token))
          .catch(() => resolve(null))
      })
    })
  } catch (err) {
    console.error('reCAPTCHA error:', err)
    return null
  }
}
