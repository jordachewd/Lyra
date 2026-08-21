import {z} from 'zod'

import {ImageFieldSchema} from '../layout/imageNoMeta'
import {PortableTextSchema} from '../layout/portable-text'
import {CardFooterCollectionSchema} from '../layout/card-footer'
import {SectionSettingsSchema} from '../settings/section-wrapper'

export const FeatureItemSchema = z.object({
  id: z.string(),
  eyebrow: z.string().nullable().optional(),
  title: z.string(),
  description: z.string().nullable().optional(),
  icon: ImageFieldSchema.optional(),
  ttlSize: z.enum(['small', 'medium', 'large']).default('small'),
  layout: z.enum(['text', 'card']).default('text'),
})

export const ProductCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: ImageFieldSchema,
  description: PortableTextSchema.optional(),
  features: z.array(FeatureItemSchema).optional().default([]),
  featDisplay: z.enum(['vertical', 'horizontal']).default('vertical'),
  addons: PortableTextSchema.optional(),
  footer: CardFooterCollectionSchema.default([]),
  textColor: z.unknown().optional(),
  background: z.unknown().optional(),
})

export const ProductsSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('products'),
  title: z.string().min(1, {message: 'Section title is required'}),
  description: PortableTextSchema.optional(),
  cards: z.array(ProductCardSchema).default([]),
  settings: SectionSettingsSchema.optional(),
})

export type FeatureItem = z.infer<typeof FeatureItemSchema>
export type ProductCardSchema = z.infer<typeof ProductCardSchema>
export type ProductsSectionSchema = z.infer<typeof ProductsSectionSchema>
