import {z} from 'zod'
import {PortableTextSchema} from '../../sections/layout/portable-text'
import {PageSectionSchema, Section} from '../layout/sections'
import {SeoMetaSchema} from '../../sections/layout/seo-meta'
import {PageSettingsSchema} from '../../sections/layout/page-settings'

export const PageBySlugSchema = z.object({
  _id: z.string(),
  _type: z.literal('page'),
  slug: z.string(),
  title: z.string(),
  description: PortableTextSchema.optional().default([]),
  sections: z.array(PageSectionSchema).default([]),
  settings: PageSettingsSchema,
  seoMeta: SeoMetaSchema.optional(),
})

export type PageBySlug = z.infer<typeof PageBySlugSchema>
export type SectionOf<K extends Section['kind']> = Extract<Section, {kind: K}>
