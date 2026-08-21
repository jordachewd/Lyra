import z from 'zod'
import {PortableTextSchema} from '../../sections/layout/portable-text'

export const CategorySchema = z.object({
  _id: z.string(),
  _type: z.literal('category'),
  slug: z.string().min(1),
  title: z.string(),
  description: PortableTextSchema.optional(),
})

export type Category = z.infer<typeof CategorySchema>
