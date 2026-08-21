import {z} from 'zod'
import {CardFooterCollectionSchema} from '../layout/card-footer'
import {ImageFieldSchema} from '../layout/imageNoMeta'
import {PortableTextSchema} from '../layout/portable-text'
import {SectionSettingsSchema} from '../settings/section-wrapper'

const SolutionItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  tag: z.string().optional(),
  features: PortableTextSchema.default([]),
})

export const SolutionCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: PortableTextSchema.default([]),
  image: ImageFieldSchema,
  items: z.array(SolutionItemSchema).default([]),
  footer: CardFooterCollectionSchema.default([]),
  textColor: z.unknown().optional(),
  background: z.unknown().optional(),
  rounded: z.boolean().default(true),
})

export const SolutionsSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('solutions'),
  title: z.string().min(1, {message: 'Section title is required'}),
  description: PortableTextSchema.optional(),
  cards: z.array(SolutionCardSchema).default([]),
  display: z.enum(['horizontal', 'vertical']).default('horizontal'),
  settings: SectionSettingsSchema.optional(),
})

export type SolutionItem = z.infer<typeof SolutionItemSchema>
export type SolutionCardSchema = z.infer<typeof SolutionCardSchema>
export type SolutionsSectionSchema = z.infer<typeof SolutionsSectionSchema>
