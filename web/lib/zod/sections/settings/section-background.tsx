import {z} from 'zod'
import {ImageFieldSchema} from '../layout/imageNoMeta'
import {BgBlendModeEnum, BgTypeEnum, SectionGradients} from '../../zod-consts'

export const BackgroundSettingsSchema = z.object({
  type: BgTypeEnum.default('none'),
  bgColor: z.unknown().optional(),
  image: ImageFieldSchema.nullable().optional(),
  ovlColor: z.unknown().optional(),
  ovlBlend: BgBlendModeEnum.default('overlay'),
  ovlOpacity: z.number().min(0).max(100).default(50),
  gradient: SectionGradients.optional().default('banner'),
})

export type BackgroundSettings = z.infer<typeof BackgroundSettingsSchema>
