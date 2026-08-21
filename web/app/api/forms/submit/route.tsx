import {recaptchaVerifyUrl, recaptchaSecretKey, leadRelayUrl} from '@/lib/const/env'
import {NextRequest, NextResponse} from 'next/server'
import {toRecaptchaAction} from '@/lib/utils/forms/recaptcha-action'

export const runtime = 'nodejs'

function jsonError(message: string, status = 400, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ok: false, error: message, ...extra}, {status})
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body) {
      return jsonError('Bad JSON body', 400)
    }

    const {kind, values, recaptchaToken, recaptchaAction, marketingConsent, consentMeta} = body as {
      kind: string
      values: Record<string, unknown>
      recaptchaToken?: string
      recaptchaAction?: string
      marketingConsent?: boolean
      consentMeta?: {version: string | null; timestamp: string | null}
    }

    if (!recaptchaToken) {
      return jsonError('Missing reCAPTCHA token', 400)
    }

    if (!recaptchaSecretKey) {
      return jsonError('Missing RECAPTCHA_SECRET_KEY', 500)
    }

    const clientAction = toRecaptchaAction(recaptchaAction ?? kind ?? 'form_submit')

    const verifyRes = await fetch(recaptchaVerifyUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${encodeURIComponent(
        recaptchaSecretKey,
      )}&response=${encodeURIComponent(recaptchaToken)}`,
    })

    if (!verifyRes.ok) {
      return jsonError('Captcha verification request failed', 502, {
        providerStatus: verifyRes.status,
      })
    }

    const verifyData = (await verifyRes.json()) as {
      success: boolean
      score?: number
      action?: string
      'error-codes'?: string[]
    }

    if (!verifyData.success) {
      return jsonError('Captcha verification failed', 400, {
        details: verifyData['error-codes'] ?? [],
      })
    }

    const googleAction = toRecaptchaAction(verifyData.action ?? '')

    if (googleAction !== clientAction) {
      return jsonError('Captcha action mismatch', 400, {
        clientAction,
        googleAction: verifyData.action ?? null,
      })
    }

    const score = typeof verifyData.score === 'number' ? verifyData.score : 1
    if (score < 0.5) {
      return jsonError('Suspicious activity', 403, {score})
    }

    const name = (values['name'] ?? values['fullName'] ?? '') as string
    const company = (values['company'] ?? values['organization'] ?? '') as string
    const email = (values['email'] ?? '') as string
    const message = (values['message'] ?? values['notes'] ?? '') as string

    const payload = {
      type: kind || 'contact',
      name,
      company,
      email,
      message,
      hs_marketable_status: !!marketingConsent,
      marketing_consent: !!marketingConsent,
      consent_version: consentMeta?.version ?? null,
      consent_timestamp: consentMeta?.timestamp ?? null,
      extra_values: values,
    }

    if (!leadRelayUrl) {
      console.warn('[forms/submit] LEAD_RELAY_URL is not configured; lead not forwarded')
      return jsonError('Lead relay is not configured', 503)
    }

    const hubspotRes = await fetch(leadRelayUrl, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })

    if (!hubspotRes.ok) {
      const text = await hubspotRes.text().catch(() => '')
      return jsonError('(Hubspot) Remote API failed', 502, {
        remoteStatus: hubspotRes.status,
        details: text,
      })
    }

    return NextResponse.json({ok: true})
  } catch (err) {
    console.error('Form API fatal error:', err)
    return jsonError('Unexpected server error', 500)
  }
}
