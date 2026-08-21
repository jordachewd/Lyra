import type {MetadataRoute} from 'next'
import {isStaging, siteUrl} from '@/lib/const/env'

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl || process.env.NEXT_PUBLIC_SITE_URL

  if (isStaging) {
    return {
      rules: [{userAgent: '*', disallow: '/'}],
      sitemap: `${base}/sitemap.xml`,
    }
  }

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
