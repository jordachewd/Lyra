import type {MetadataRoute} from 'next'
import {isProduction, siteUrl} from '@/lib/const/env'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lyra',
    short_name: 'Lyra',
    description: 'Lyra',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a2540',
    // `icons` is omitted while no brand icon files ship. Listing entries that
    // 404 makes the manifest invalid for installability; an absent list is
    // merely incomplete. Add them back alongside real files in `app/`.
    scope: '/',
    id: isProduction ? siteUrl : '/',
  }
}
