import {z} from 'zod'
import {ImageFieldSchema} from '../layout/imageNoMeta'
import {PortableTextSchema} from '../layout/portable-text'
import {SectionSettingsSchema} from '../settings/section-wrapper'

const KeyFeatureCardSchema = z.object({
  id: z.string(),
  title: z.string().optional().default(''),
  icon: ImageFieldSchema,
  description: PortableTextSchema.optional().default([]),
})

export const KeyFeaturesSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('keyFeatures'),
  topHeadline: z.string().optional().default(''),
  description: PortableTextSchema.optional(),
  bottomHeadline: z.string().optional().nullable().default(''),
  cards: z.array(KeyFeatureCardSchema).default([]),
  settings: SectionSettingsSchema.optional(),
})

export type KeyFeaturesSectionSchema = z.infer<typeof KeyFeaturesSectionSchema>
