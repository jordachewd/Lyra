import type {MetadataRoute} from 'next'
import {siteUrl} from '@/lib/const/env'

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl || process.env.NEXT_PUBLIC_SITE_URL

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/preview/', '/draft/', '/404', '/500'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  }
}
