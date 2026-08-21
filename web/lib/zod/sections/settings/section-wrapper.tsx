import {z} from 'zod'
import {
  BackgroundSettingsDefaults,
  LayoutSettingsDefaults,
  TitleDescSettingsDefaults,
} from '../../website/content/defaults'
import {TitleDescSettingsSchema} from './section-titledesc'
import {LayoutSettingsSchema} from './section-layout'
import {BackgroundSettingsSchema} from './section-background'
import {TitleTagEnum} from '../../zod-consts'

export const SectionSettingsSchema = z.object({
  titleDesc: TitleDescSettingsSchema.default(TitleDescSettingsDefaults),
  layout: LayoutSettingsSchema.default(LayoutSettingsDefaults),
  background: BackgroundSettingsSchema.default(BackgroundSettingsDefaults),
})

export type SectionTitleTag = z.infer<typeof TitleTagEnum>
export type SectionSettings = z.infer<typeof SectionSettingsSchema>
