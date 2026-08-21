import type {MetadataRoute} from 'next'
import {getSanityClient} from '@/lib/utils/sanity/get-sanity-client'
import {siteUrl as defaultBase} from '@/lib/const/env'
import {PAGES_Q} from '@/lib/queries/fragments/pages.groq'
import {POSTS_Q} from '@/lib/queries/fragments/posts.groq'
import {getHomeSlug} from '@/lib/data/utils/get-home-slug'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (defaultBase || 'https://www.lyra.com').replace(/\/+$/, '')
  const homeslug = await getHomeSlug()
  const client = await getSanityClient()

  const defaults: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/contactus`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `https://dev.lyra.com/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/requestdemo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  try {
    const [pages, posts]: [{slug: string; lastmod?: string}[], {slug: string; lastmod?: string}[]] =
      await Promise.all([client.fetch(PAGES_Q), client.fetch(POSTS_Q)])

    const exclude = new Set([
      'privacypolicy',
      'tac',
      'mailme',
      'getstarted/acknowledgment',
      'requestdemo/acknowledgment',
      'contactus/acknowledgment',
    ])

    const pageUrls: MetadataRoute.Sitemap = pages
      .filter((p) => p?.slug && !exclude.has(p.slug))
      .map((p) => {
        const url = p.slug === homeslug ? `${base}/` : `${base}/${p.slug}`
        return {
          url,
          lastModified: p.lastmod ? new Date(p.lastmod) : undefined,
          changeFrequency: 'monthly' as const,
          priority: p.slug === homeslug ? 1 : 0.8,
        }
      })

    const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: p.lastmod ? new Date(p.lastmod) : undefined,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    const byUrl = new Map<string, MetadataRoute.Sitemap[0]>()
    for (const item of [...defaults, ...pageUrls, ...postUrls]) {
      byUrl.set(item.url, item)
    }
    return Array.from(byUrl.values())
  } catch (err) {
    console.warn('sitemap(): failed to fetch pages/posts from Sanity', err)
    return defaults
  }
}
