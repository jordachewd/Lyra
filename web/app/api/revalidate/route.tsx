import {type NextRequest, NextResponse} from 'next/server'
import {revalidateTag, revalidatePath} from 'next/cache'
import {revalidateBodyTags} from '@/lib/data/caching/revalidate-body-tags'
import type {RevalidateBody} from '@/lib/zod/lib/revalidate'
import {parseBody} from 'next-sanity/webhook'
import {webhookSecret} from '@/lib/const/env'
import {getSanityClient} from '@/lib/utils/sanity/get-sanity-client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    return NextResponse.json({ok: false, error: 'Server misconfigured'}, {status: 500})
  }

  try {
    const {body, isValidSignature} = await parseBody<RevalidateBody>(req, webhookSecret)

    if (!isValidSignature) {
      return NextResponse.json({ok: false, error: `Invalid signature`}, {status: 401})
    }

    if (!body?._type) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Bad Request',
        },
        {status: 400},
      )
    }

    const client = await getSanityClient()
    const draftId = body._id.startsWith('drafts.') ? body._id : `drafts.${body._id}`
    const pubId = body._id.replace(/^drafts\./, '')
    const ids = [pubId, draftId]

    const isSlugDocument = body._type === 'page' || body._type === 'post'
    const needsSlug = !body.slug && isSlugDocument
    const slugCurrent = `*[_id in $ids][0]{ "slug": slug.current }`

    const slugDoc = needsSlug ? ((await client.fetch(slugCurrent, {ids})) ?? {}) : {}

    const bodyTags: RevalidateBody = {
      ...body,
      slug: body.slug ?? (slugDoc as {slug?: string}).slug,
    }

    const {tags, paths} = await revalidateBodyTags(bodyTags)

    for (const tag of tags) revalidateTag(tag, 'max')
    for (const path of paths) revalidatePath(path)

    return NextResponse.json({ok: true, tags, paths})
  } catch (error: unknown) {
    console.error(error)
    const message = error instanceof Error ? error.message : 'Internal Server Error'
    return new Response(message, {status: 500})
  }
}
