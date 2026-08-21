import {z} from 'zod'
import {FooterSchema} from './footer'
import {HeaderSchema} from './header'
import {WebsiteSettingsSchema} from '../settings/all-settings'

export const GlobalsSchema = z.object({
  header: HeaderSchema.nullable(),
  footer: FooterSchema.nullable(),
  settings: WebsiteSettingsSchema,
})

export type GlobalsData = z.infer<typeof GlobalsSchema>
