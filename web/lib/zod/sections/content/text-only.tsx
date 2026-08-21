import {z} from 'zod'
import {PortableTextSchema} from '../layout/portable-text'
import {SectionSettingsSchema} from '../settings/section-wrapper'

export const TextOnlySectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('text'),
  aboveTitle: z.string().nullable().optional().default(null),
  title: z.string().min(1, {message: 'Section title is required'}),
  belowTitle: z.string().nullable().optional().default(null),
  content: PortableTextSchema.optional(),
  settings: SectionSettingsSchema.optional(),
})

export type TextOnlySectionSchema = z.infer<typeof TextOnlySectionSchema>
