import {z} from 'zod'
import {ImageWithMetaAltImageSchema} from '../../sections/layout/imageWithMeta'
import {PortableTextSchema} from '../../sections/layout/portable-text'
import {AuthorSchema} from './author'
import {CategorySchema} from './category'
import {TagSchema} from './tag'

const TaxonomyCountSchema = z.object({
  _id: z.string(),
  _type: z.enum(['category', 'tag']),
  slug: z.string().min(1),
  title: z.string(),
  description: PortableTextSchema.optional(),
  count: z.number(),
})

const PostCardSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string().min(1),
  publishedAt: z.string(),
  image: ImageWithMetaAltImageSchema.nullable().optional(),
  excerptText: PortableTextSchema.nullable().optional(),
  categories: z.array(CategorySchema).default([]),
  tags: z.array(TagSchema).default([]),
  authors: z.array(AuthorSchema).default([]),
})

export const PostListSchema = z.object({
  items: z.array(PostCardSchema),
  totalFiltered: z.number(),
  totalUnfiltered: z.number(),
})

export const BlogTagsSchema = z.array(TaxonomyCountSchema)
export const BlogCategoriesSchema = z.array(TaxonomyCountSchema)

export type PostList = z.infer<typeof PostListSchema>
export type PostCard = z.infer<typeof PostCardSchema>
export type BlogTags = z.infer<typeof BlogTagsSchema>
export type BlogCategories = z.infer<typeof BlogCategoriesSchema>
