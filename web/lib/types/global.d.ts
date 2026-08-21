export {}

declare global {
  interface HsForms {
    create: (opts: {
      region: string
      portalId: string
      formId: string
      target: string
      onFormSubmitted?: () => void
    }) => void
  }
  interface Window {
    hbspt?: {forms: HsForms}
    dataLayer?: unknown[]
    gtag?: (
      command: 'event' | 'js' | 'config' | 'consent',
      targetId: string | Date,
      params?: Record<string, unknown>,
    ) => void

    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, options: {action: string}) => Promise<string>
    }

    __adsSendTo?: string
  }
}
