import {CONSENT_COOKIE_NAME, CONSENT_MAX_AGE_SECONDS} from '@/lib/const/consent'
import type {StoredConsent} from '@/lib/types/consent'
import {NextRequest, NextResponse} from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const body = (await req.json()) as StoredConsent | null

  if (!body?.state || typeof body.version !== 'number') {
    return NextResponse.json({error: 'Invalid consent payload'}, {status: 400})
  }

  const res = new NextResponse(null, {status: 204})
  res.cookies.set({
    name: CONSENT_COOKIE_NAME,
    value: JSON.stringify(body),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: CONSENT_MAX_AGE_SECONDS,
  })
  return res
}
