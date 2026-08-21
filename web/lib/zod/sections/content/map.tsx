import {z} from 'zod'
import {PortableTextSchema} from '../layout/portable-text'
import {SectionSettingsSchema} from '../settings/section-wrapper'

export const MapSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('mapSection'),
  title: z.string().min(1, {message: 'Section title is required'}),
  subtitle: z.string().optional(),
  description: PortableTextSchema.optional().default([]),
  embedUrl: z.string().optional().default(''),
  fullScreen: z.boolean().default(false),
  settings: SectionSettingsSchema.optional(),
})

export type MapSectionSchema = z.infer<typeof MapSectionSchema>
