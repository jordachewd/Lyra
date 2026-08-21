import {z} from 'zod'
import {CtaButtonSchema} from '../layout/cta-button'
import {ImageFieldSchema} from '../layout/imageNoMeta'
import {PortableTextSchema} from '../layout/portable-text'
import {SectionSettingsSchema} from '../settings/section-wrapper'

const AboutCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: ImageFieldSchema,
  content: PortableTextSchema.optional(),
})

export const AboutSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('aboutInfo'),
  title: z.string().min(1, {message: 'Section title is required'}),
  description: PortableTextSchema.optional(),
  buttons: z.array(CtaButtonSchema).default([]),
  collapsibles: z.array(AboutCardSchema).default([]),
  settings: SectionSettingsSchema.optional(),
})

export type AboutCard = z.infer<typeof AboutCardSchema>
export type AboutSectionSchema = z.infer<typeof AboutSectionSchema>
