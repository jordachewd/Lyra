import {siteUrl} from '@/lib/const/env'
import z from 'zod'
import {asOptionalUrl, asOptionalEmail} from '../../lib/preprocess'
import {ImageFieldSchema} from '../../sections/layout/imageNoMeta'

export const GeneralSettingsSchema = z.object({
  siteName: z.string().min(1),
  siteTitle: z.string().trim().optional(),
  siteDescription: z.string().trim().optional(),
  siteImage: ImageFieldSchema.optional(),
  siteUrl: asOptionalUrl.default(siteUrl),
  siteEmail: asOptionalEmail,
})

export type GeneralSettings = z.infer<typeof GeneralSettingsSchema>
