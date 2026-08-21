import {z} from 'zod'
import {PortableTextSchema} from '../layout/portable-text'
import {CtaButtonSchema} from '../layout/cta-button'
import {ImageWithMetaAltImageSchema} from '../layout/imageWithMeta'
import {SectionSettingsSchema} from '../settings/section-wrapper'

export const TextImageSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('textImage'),
  aboveTitle: z.string().nullable().optional().default(null),
  title: z.string().min(1, {message: 'Section title is required'}),
  belowTitle: z.string().nullable().optional().default(null),
  description: PortableTextSchema.optional(),
  chips: z.array(z.string()).max(5).optional().default([]),
  image: ImageWithMetaAltImageSchema.nullable().optional(),
  buttons: z.array(CtaButtonSchema).default([]),
  settings: SectionSettingsSchema.optional(),
})

export type TextImageSectionSchema = z.infer<typeof TextImageSectionSchema>
