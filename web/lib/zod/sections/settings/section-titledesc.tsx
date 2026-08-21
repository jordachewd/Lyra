import {z} from 'zod'
import {TitleTagEnum} from '../../zod-consts'

export const TitleDescSettingsSchema = z.object({
  showTitle: z.boolean().default(true),
  showDesc: z.boolean().default(true),
  shrinkTitle: z.boolean().default(false),
  titleTag: TitleTagEnum.default('h2'),
  textColor: z.unknown().optional(),
  accentColor: z.unknown().optional(),
})

export type TitleDescSettingsSchema = z.infer<typeof TitleDescSettingsSchema>
