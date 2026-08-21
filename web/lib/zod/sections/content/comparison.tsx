import {z} from 'zod'
import {PortableTextSchema} from '../layout/portable-text'
import {CtaButtonSchema} from '../layout/cta-button'
import {SectionSettingsSchema} from '../settings/section-wrapper'

export const ComparisonBoxSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: PortableTextSchema.optional().default([]),
  textColor: z.unknown().optional(),
  background: z.unknown().optional(),
})

export const ComparisonItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  boxes: z
    .array(ComparisonBoxSchema)
    .max(2, {message: 'Maximum of 2 items allowed'})
    .nullable()
    .optional()
    .default([]),
})

export const ComparisonSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('comparison'),
  title: z.string().min(1, {message: 'Section title is required'}),
  description: PortableTextSchema.optional().default([]),
  steps: z.array(ComparisonItemSchema).nullable().optional().default([]),
  buttons: z.array(CtaButtonSchema).default([]),
  settings: SectionSettingsSchema.optional(),
})

export type ComparisonBoxSchema = z.infer<typeof ComparisonBoxSchema>
export type ComparisonItemSchema = z.infer<typeof ComparisonItemSchema>
export type ComparisonSectionSchema = z.infer<typeof ComparisonSectionSchema>
