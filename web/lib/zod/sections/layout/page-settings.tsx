import z from 'zod'
import {
  AlignTitleEnum,
  PaddingShowEnum,
  PaddingSizeEnum,
  PageGradients,
  WidthEnum,
} from '../../zod-consts'
import {PageSettingsDefaults} from '../../website/content/defaults'

export const PageSettingsSchema = z
  .object({
    showTitle: z.boolean().default(true),
    showDesc: z.boolean().default(true),
    shrinkTitle: z.boolean().default(false),
    alignTitle: AlignTitleEnum.default('left'),
    pdTopBottom: PaddingSizeEnum.default('normal'),
    pdDisplay: PaddingShowEnum.default('both'),
    width: WidthEnum.default('normal'),
    textColor: z.unknown().optional(),
    gradientBg: z.enum(PageGradients).default('page'),
  })
  .default(PageSettingsDefaults)

export type PageSettingsType = z.infer<typeof PageSettingsSchema>
