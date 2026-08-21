import {z} from 'zod'
import {ImageFieldSchema} from '../layout/imageNoMeta'
import {PortableTextSchema} from '../layout/portable-text'
import {HrefSchema} from '../../lib/scalars'
import {SectionSettingsSchema} from '../settings/section-wrapper'

const AccreditationLinkSchema = z
  .object({
    href: HrefSchema,
    newTab: z.boolean().default(false),
  })
  .nullable()
  .optional()

const AccreditationItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  tag: z.string().optional().nullable(),
  image: ImageFieldSchema,
  link: AccreditationLinkSchema,
})

const AccreditationSettingsSchema = z.object({
  showTitles: z.boolean().default(false),
  showTags: z.boolean().default(true),
  displayType: z.enum(['grid', 'carousel']).default('grid'),
  showArrows: z.boolean().default(true),
  showDots: z.boolean().default(true),
  autoplay: z.boolean().default(true),
  autoplayInterval: z.number().default(7),
  itemsPerView: z.number().default(4),
})

export const AccreditationSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('accreditation'),
  title: z.string().min(1, {message: 'Section title is required'}),
  description: PortableTextSchema.optional().default([]),
  items: z.array(AccreditationItemSchema).default([]),
  accrSettings: AccreditationSettingsSchema.optional(),
  settings: SectionSettingsSchema.optional(),
})

export type AccreditationItem = z.infer<typeof AccreditationItemSchema>
export type AccreditationSettings = z.infer<typeof AccreditationSettingsSchema>
export type AccreditationSectionSchema = z.infer<typeof AccreditationSectionSchema>
