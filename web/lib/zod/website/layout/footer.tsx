import {z} from 'zod'
import {ImageFieldSchema} from '../../sections/layout/imageNoMeta'
import {MenuSchema} from '../../sections/layout/menu'
import {BackgroundSettingsSchema} from '../../sections/settings/section-background'
import {LayoutSettingsSchema} from '../../sections/settings/section-layout'
import {LayoutSettingsDefaults, BackgroundSettingsDefaults} from '../content/defaults'

const FooterSettingsSchema = z.object({
  textColor: z.unknown().optional(),
  layout: LayoutSettingsSchema.default(LayoutSettingsDefaults),
  background: BackgroundSettingsSchema.default(BackgroundSettingsDefaults),
})

export const FooterSchema = z.object({
  logo: ImageFieldSchema,
  menu: MenuSchema.optional(),
  copyright: z.string().nullable().optional(),
  settings: FooterSettingsSchema.optional(),
})

export type FooterSettings = z.infer<typeof FooterSettingsSchema>
export type FooterData = z.infer<typeof FooterSchema>
