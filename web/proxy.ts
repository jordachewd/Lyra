// proxy.ts
import {NextRequest, NextResponse} from 'next/server'
import {getBodyClasses} from './lib/utils/common/get-body-classes'

const isDev = process.env.NODE_ENV === 'development'

function createNonce(): string {
  // Random-enough nonce, spec doesn’t require base64
  return crypto.randomUUID().replace(/-/g, '')
}

function createCspHeader(nonce: string): string {
  const directives = [
    // --- Baseline ---
    "default-src 'self';",
    "base-uri 'self';",
    "object-src 'none';",
    "worker-src 'self' blob:;",

    // --- Scripts: GA4, GTM, Ads, HubSpot, reCAPTCHA ---
    [
      'script-src',
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",

      // GA / GTM
      'https://www.google.com',
      'https://www.googletagmanager.com',
      'https://tagmanager.google.com',
      'https://www.google-analytics.com',
      'https://analytics.google.com',
      'https://www.googleadservices.com',
      'https://googleads.g.doubleclick.net',
      'https://stats.g.doubleclick.net',

      // reCAPTCHA / Google base
      'https://www.recaptcha.net',
      'https://www.gstatic.com',

      // HubSpot stack
      'https://api.hsforms.com',
      'https://js.hsforms.net',
      'https://js.hscollectedforms.net',
      'https://js.hs-scripts.com',
      'https://js.hs-banner.com',
      'https://js.hs-analytics.net',
      'https://static.hsappstatic.net',
      'https://forms.hsforms.com',
      'https://forms.hscollectedforms.net',
      'https://*.hsforms.com',
      'https://*.hsforms.net',
      'https://*.hs-scripts.com',
      'https://*.hubspot.com',
      ';',
    ].join(' '),

    // --- Styles: HubSpot injects inline CSS, so this **must** allow unsafe-inline
    [
      'style-src',
      "'self'",
      "'unsafe-inline'",
      'https://static.hsappstatic.net',
      'https://*.hubspot.com',
      ';',
    ].join(' '),

    // --- Images: GA, Ads pixels, HubSpot assets, Sanity ---
    [
      'img-src',
      "'self'",
      'data:',
      'blob:',
      'https://cdn.sanity.io',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://pagead2.googlesyndication.com',
      'https://tpc.googlesyndication.com',
      'https://www.googleadservices.com',
      'https://stats.g.doubleclick.net',
      'https://googleads.g.doubleclick.net',
      'https://*.doubleclick.net',
      'https://www.gstatic.com',
      'https://static.hsappstatic.net',
      'https://track.hubspot.com',
      'https://*.hubspot.com',
      'https://*.hsforms.com',
      'https://*.hsforms.net',
      'https://www.google.com',
      'https://www.google.ro',
      ';',
    ].join(' '),

    // --- XHR / fetch: GA collect, Ads, HubSpot APIs, reCAPTCHA ---
    [
      'connect-src',
      "'self'",
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://region1.analytics.google.com',
      'https://www.googletagmanager.com',
      'https://tagmanager.google.com',
      'https://pagead2.googlesyndication.com',
      'https://tpc.googlesyndication.com',
      'https://googleads.g.doubleclick.net',
      'https://stats.g.doubleclick.net',
      'https://ad.doubleclick.net',
      'https://googleads.googleapis.com',
      'https://www.googleadservices.com',
      'https://forms.hsforms.com',
      'https://forms.hscollectedforms.net',
      'https://api.hsforms.com',
      'https://track.hubspot.com',
      'https://static.hsappstatic.net',
      'https://*.hubspot.com',
      'https://*.hsforms.com',
      'https://*.hsforms.net',
      'https://www.google.com',
      'https://www.recaptcha.net',
      'https://www.gstatic.com',
      ';',
    ].join(' '),

    // --- Iframes: HubSpot forms, reCAPTCHA, GTM / Ads frames ---
    [
      'frame-src',
      "'self'",
      'https://www.googletagmanager.com',
      'https://js.hsforms.net',
      'https://*.hsforms.com',
      'https://*.hsforms.net',
      'https://*.hubspot.com',
      'https://www.google.com',
      'https://www.recaptcha.net',
      'https://googleads.g.doubleclick.net',
      'https://www.googleadservices.com',
      'https://td.doubleclick.net',
      ';',
    ].join(' '),

    // --- Forms & fonts ---
    [
      'form-action',
      "'self'",
      'https://*.hubspot.com',
      'https://www.google.com',
      'https://www.recaptcha.net',
      ';',
    ].join(' '),

    "font-src 'self' data: https://static.hsappstatic.net;",
  ]

  return directives.join(' ')
}

export function proxy(request: NextRequest) {
  const bodyClasses = getBodyClasses(request.nextUrl.pathname)
  const requestHeaders = new Headers(request.headers)

  // In dev you *can* skip CSP entirely; I’d keep it enabled so dev matches prod
  let cspHeaderValue: string | null = null

  if (!isDev) {
    const nonce = createNonce()
    cspHeaderValue = createCspHeader(nonce)

    // Make nonce visible to server components via headers()
    requestHeaders.set('x-nonce', nonce)
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Page class cookie
  response.cookies.set('__page_class', bodyClasses, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
  })

  if (cspHeaderValue) {
    response.headers.set('Content-Security-Policy', cspHeaderValue)
  }

  return response
}

// Match real pages, skip API/static/image/fav + prefetches
export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        {type: 'header', key: 'next-router-prefetch'},
        {type: 'header', key: 'purpose', value: 'prefetch'},
      ],
    },
  ],
}
