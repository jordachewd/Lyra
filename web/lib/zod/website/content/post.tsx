import z from 'zod'
import {ImageWithMetaAltImageSchema} from '../../sections/layout/imageWithMeta'
import {PortableTextSchema} from '../../sections/layout/portable-text'
import {SeoMetaSchema} from '../../sections/layout/seo-meta'
import {PageSectionSchema} from '../layout/sections'
import {AuthorSchema} from './author'
import {CategorySchema} from './category'
import {TagSchema} from './tag'
import {PostSettingsSchema} from '../../sections/layout/post-settings'

export const PostDetailSchema = z.object({
  _id: z.string(),
  _type: z.literal('post'),
  title: z.string(),
  slug: z.string().min(1),
  publishedAt: z.string(),
  image: ImageWithMetaAltImageSchema.nullable().optional(),
  body: PortableTextSchema.optional(),
  excerpt: PortableTextSchema.optional(),
  categories: z.array(CategorySchema).default([]),
  tags: z.array(TagSchema).default([]),
  authors: z.array(AuthorSchema).default([]),
  sections: z.array(PageSectionSchema).default([]),
  settings: PostSettingsSchema,
  seoMeta: SeoMetaSchema.optional(),
})

export type PostDetail = z.infer<typeof PostDetailSchema>
