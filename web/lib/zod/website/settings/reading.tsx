import z from 'zod'

const FilterByEnum = z.enum(['tags', 'categories', 'none'])

const ReadingPageSchema = z.object({
  _id: z.string(),
  slug: z.string(),
  title: z.string().trim().optional(),
})

const BlogSettingsSchema = z.object({
  showExcerpt: z.boolean().default(true),
  excerptLength: z.number().min(50).max(1000),
  perPage: z.number().min(3).max(30),
  filterBy: FilterByEnum.default('tags'),
  showCats: z.boolean().default(true),
  showTags: z.boolean().default(true),
  showAuthor: z.boolean().default(true),
  showDate: z.boolean().default(true),
})

export const ReadingSettingsSchema = z.object({
  homePage: ReadingPageSchema,
  blogPage: ReadingPageSchema,
  blogSettings: BlogSettingsSchema,
})

export type ReadingSettings = z.infer<typeof ReadingSettingsSchema>
export type BlogSettings = z.infer<typeof BlogSettingsSchema>

export type BlogDisplaySettings = Pick<
  BlogSettings,
  'showExcerpt' | 'showCats' | 'showTags' | 'showAuthor' | 'showDate'
>
