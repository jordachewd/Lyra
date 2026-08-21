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

const WebinarsSettingsSchema = z.object({
  excerptLength: z.number().min(50).max(1000),
  perPage: z.number().min(3).max(30),
  showExcerpt: z.boolean().default(true),
  showFilter: z.boolean().default(true),
  showCats: z.boolean().default(true),
  showDate: z.boolean().default(true),
})

const WebinarsSchema = z.object({
  page: ReadingPageSchema,
  settings: WebinarsSettingsSchema,
})

export const ReadingSettingsSchema = z.object({
  homePage: ReadingPageSchema,
  blogPage: ReadingPageSchema,
  blogSettings: BlogSettingsSchema,
  webinars: WebinarsSchema,
})

export type ReadingSettings = z.infer<typeof ReadingSettingsSchema>
export type BlogSettings = z.infer<typeof BlogSettingsSchema>
export type WebinarsSettings = z.infer<typeof WebinarsSettingsSchema>

export type BlogDisplaySettings = Pick<
  BlogSettings,
  'showExcerpt' | 'showCats' | 'showTags' | 'showAuthor' | 'showDate'
>

export type WebinarsDisplaySettings = Pick<
  WebinarsSettings,
  'showExcerpt' | 'showCats' | 'showDate' | 'showFilter'
>
