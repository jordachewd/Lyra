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
    icons: [
      {src: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
      {src: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'},
      {src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'},
    ],
    scope: '/',
    id: isProduction ? siteUrl : '/',
  }
}
