import z from 'zod'
import {PortableTextSchema} from '../../sections/layout/portable-text'

export const TagSchema = z.object({
  _id: z.string(),
  _type: z.literal('tag'),
  slug: z.string().min(1),
  title: z.string(),
  description: PortableTextSchema.optional(),
})

export type Tag = z.infer<typeof TagSchema>
