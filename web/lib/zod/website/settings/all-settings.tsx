import {z} from 'zod'

import {GeneralSettingsSchema} from './general'
import {ReadingSettingsSchema} from './reading'
import {SeoSettingsSchema} from './seo'
import {TrackingSettingsSchema} from './tracking'

export const WebsiteSettingsSchema = z.object({
  general: GeneralSettingsSchema.nullable(),
  reading: ReadingSettingsSchema.nullable(),
  seo: SeoSettingsSchema.nullable().optional(),
  tracking: TrackingSettingsSchema.nullable().optional(),
})
