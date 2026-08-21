import {z} from 'zod'
import {PortableTextSchema} from '../layout/portable-text'
import {SectionSettingsSchema} from '../settings/section-wrapper'

export const TableMatrixSchema = z.array(z.array(z.string())).default([])

export const TableSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('table'),
  aboveEyebrow: z.string().nullable().optional(),
  title: z.string().min(1, {message: 'Section title is required'}),
  belowEyebrow: z.string().nullable().optional(),
  description: PortableTextSchema.optional(),
  table: TableMatrixSchema,
  settings: SectionSettingsSchema.optional(),
})

export type TableMatrixSchema = z.infer<typeof TableMatrixSchema>
export type TableSectionSchema = z.infer<typeof TableSectionSchema>
