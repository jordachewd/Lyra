import groq from 'groq'
import {FOOTER_QUERY} from './fragments/footer.groq'
import {HEADER_QUERY} from './fragments/header.groq'
import {GENERAL_SETTINGS_QUERY} from './fragments/settings/general.groq'
import {READING_SETTINGS_QUERY} from './fragments/settings/reading.groq'
import {SEO_SETTINGS_QUERY} from './fragments/settings/seo.groq'
import {TRACKING_SETTINGS_QUERY} from './fragments/settings/tracking.groq'

export const GLOBALS_QUERY = groq`{
  "header": ${HEADER_QUERY},
  "footer": ${FOOTER_QUERY},
  "settings": {
    "general": ${GENERAL_SETTINGS_QUERY},
    "reading": ${READING_SETTINGS_QUERY},
		"seo": ${SEO_SETTINGS_QUERY},
    "tracking": ${TRACKING_SETTINGS_QUERY}
  }
}`
