import {z} from 'zod'
import {
  PaddingSizeEnum,
  PaddingShowEnum,
  TemplateEnum,
  WidthEnum,
  ColSizeEnum,
} from '../../zod-consts'

export const LayoutSettingsSchema = z.object({
  pdTopBottom: PaddingSizeEnum.default('medium'),
  pdDisplay: PaddingShowEnum.default('both'),
  template: TemplateEnum.default('normal'),
  columns: ColSizeEnum.default('normal'),
  width: WidthEnum.default('normal'),
})

export type LayoutSettings = z.infer<typeof LayoutSettingsSchema>
