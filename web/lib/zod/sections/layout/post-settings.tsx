import {z} from 'zod'
import {AlignTitleEnum, PaddingSizeEnum, PaddingShowEnum, PageGradients} from '../../zod-consts'
import {PostSettingsDefaults} from '@/lib/zod/website/content/defaults'

export const PostSettingsSchema = z
  .object({
    showCats: z.boolean().default(false),
    showTags: z.boolean().default(true),
    showAuthor: z.boolean().default(true),
    showDate: z.boolean().default(true),
    alignTitle: AlignTitleEnum.default('center'),
    pdTopBottom: PaddingSizeEnum.default('normal'),
    pdDisplay: PaddingShowEnum.default('both'),
    textColor: z.unknown().optional(),
    gradientBg: z.enum(PageGradients).default('post'),
  })
  .default(PostSettingsDefaults)

export type PostSettings = z.infer<typeof PostSettingsSchema>
