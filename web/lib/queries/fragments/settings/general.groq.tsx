import groq from 'groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'

export const GENERAL_SETTINGS_QUERY = groq`
  *[_id=="generalSettings"][0]{
    siteName,
    siteTitle,
    siteDescription,
    "siteImage": siteImage{ ${IMAGE_PROJECTION}, alt },
    "siteIcon":  siteIcon{  ${IMAGE_PROJECTION}, alt },
    "siteUrl": coalesce(siteUrl, ""),
    "siteEmail": coalesce(siteEmail, "")
  }
`
