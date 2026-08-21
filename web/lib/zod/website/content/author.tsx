import z from 'zod'
import {ImageFieldSchema} from '../../sections/layout/imageNoMeta'
import {PortableTextSchema} from '../../sections/layout/portable-text'

export const AuthorSchema = z.object({
  _id: z.string(),
  _type: z.literal('author'),
  name: z.string(),
  slug: z.string().min(1),
  role: z.string().optional(),
  image: ImageFieldSchema.nullable().optional(),
  bio: PortableTextSchema,
})

export type Author = z.infer<typeof AuthorSchema>
