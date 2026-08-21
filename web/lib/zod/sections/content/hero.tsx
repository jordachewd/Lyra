import {z} from 'zod'
import {CtaButtonSchema} from '../layout/cta-button'
import {ImageFieldSchema} from '../layout/imageNoMeta'
import {PortableTextSchema} from '../layout/portable-text'
import {FeatureItemSchema} from './products'
import {SectionSettingsSchema} from '../settings/section-wrapper'

export const HeroSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('hero'),
  aboveTitle: z.string().nullable().optional(),
  title: z.string().min(1, {message: 'Section title is required'}),
  belowTitle: z.string().nullable().optional(),
  subheadline: PortableTextSchema.optional().default([]),
  features: z.array(FeatureItemSchema).nullable().optional().default([]),
  featDisplay: z.enum(['vertical', 'horizontal']).default('horizontal'),
  image: ImageFieldSchema.nullable().optional(),
  eyebrowImage: ImageFieldSchema.nullable().optional(),
  buttons: z.array(CtaButtonSchema).default([]),
  settings: SectionSettingsSchema.optional(),
})

export type HeroSectionSchema = z.infer<typeof HeroSectionSchema>
