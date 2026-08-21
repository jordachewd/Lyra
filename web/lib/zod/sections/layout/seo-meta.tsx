import z from 'zod'
import {ImageFieldSchema} from './imageNoMeta'
import {SeoModeEnum} from '../../zod-consts'

export const SeoMetaSchema = z.object({
  mode: SeoModeEnum.default('auto'),
  title: z.string().optional(),
  description: z.string().optional(),
  image: ImageFieldSchema.optional(),
  keywords: z.string().optional(),
  noindex: z.boolean().default(false),
})

export type SeoModeSchema = z.infer<typeof SeoModeEnum>
export type SeoMetaSchema = z.infer<typeof SeoMetaSchema>
