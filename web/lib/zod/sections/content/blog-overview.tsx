import {z} from 'zod'
import {CtaButtonSchema} from '../layout/cta-button'
import {PortableTextSchema} from '../layout/portable-text'
import {SectionSettingsSchema} from '../settings/section-wrapper'

const BlogOverviewSettingsSchema = z.object({
  limit: z.number().int().max(12).default(3),
  showExcerpt: z.boolean().default(false),
  showCats: z.boolean().default(true),
  showTags: z.boolean().default(false),
  showAuthor: z.boolean().default(false),
  showDate: z.boolean().default(true),
})

export const BlogOverviewSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('blogSection'),
  title: z.string().min(1, {message: 'Section title is required'}),
  description: PortableTextSchema.optional(),
  button: CtaButtonSchema.nullable().optional(),
  blogSettings: BlogOverviewSettingsSchema.optional(),
  settings: SectionSettingsSchema.optional(),
})

export type BlogOverviewSettings = z.infer<typeof BlogOverviewSettingsSchema>
export type BlogOverviewSectionSchema = z.infer<typeof BlogOverviewSectionSchema>
