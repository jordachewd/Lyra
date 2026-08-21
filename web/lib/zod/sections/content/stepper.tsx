import {z} from 'zod'
import {CtaButtonSchema} from '../layout/cta-button'
import {PortableTextSchema} from '../layout/portable-text'
import {SectionSettingsSchema} from '../settings/section-wrapper'

const StepperItemSchema = z.object({
  id: z.string(),
  label: z.string().nullable().optional(),
  title: z.string(),
  description: PortableTextSchema.optional().default([]),
  layout: z.enum(['card', 'text']).default('card'),
  textColor: z.unknown().optional(),
  descColor: z.unknown().optional(),
  background: z.unknown().optional(),
})

export const StepperSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('stepper'),
  title: z.string().min(1, {message: 'Section title is required'}),
  eyebrow: z.string().nullable().optional(),
  description: PortableTextSchema.optional().default([]),
  steps: z.array(StepperItemSchema).max(10, {message: 'Maximum of 10 steps allowed'}).default([]),
  buttons: z.array(CtaButtonSchema).max(2, {message: 'Maximum of 2 buttons allowed'}).default([]),
  disclaimer: z.string().nullable().optional(),
  settings: SectionSettingsSchema.optional(),
})

export type StepItemSchema = z.infer<typeof StepperItemSchema>
export type StepperSectionSchema = z.infer<typeof StepperSectionSchema>
