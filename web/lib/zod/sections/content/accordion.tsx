import {z} from 'zod'
import {PortableTextSchema} from '../layout/portable-text'
import {ImageFieldSchema} from '../layout/imageNoMeta'
import {SectionSettingsSchema} from '../settings/section-wrapper'

const AccordionDesignEnum = z.enum(['faq', 'glossary'])

const AccordionSettingsDefaults = {
  design: 'faq',
  ordered: false,
  firstExpanded: false,
  textColor: undefined,
  accentColor: undefined,
  bgColor: undefined,
} as const

const AccordionSettingsSchema = z.object({
  design: AccordionDesignEnum.default('faq'),
  ordered: z.boolean().default(false),
  firstExpanded: z.boolean().default(false),
  textColor: z.unknown().optional(),
  accentColor: z.unknown().optional(),
  bgColor: z.unknown().optional(),
})

const AccordionItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: PortableTextSchema.optional(),
})

export const AccordionSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('accordion'),
  eyebrow: z.string().nullable().optional(),
  title: z.string().min(1, {message: 'Section title is required'}),
  subtitle: z.string().optional(),
  description: PortableTextSchema.optional(),
  image: ImageFieldSchema.optional(),
  items: z.array(AccordionItemSchema).default([]),
  accSettings: AccordionSettingsSchema.default(AccordionSettingsDefaults),
  settings: SectionSettingsSchema.optional(),
})

export type AccordionDesign = z.infer<typeof AccordionDesignEnum>
export type AccordionItem = z.infer<typeof AccordionItemSchema>
export type AccordionSectionSchema = z.infer<typeof AccordionSectionSchema>
export type AccordionSettings = z.infer<typeof AccordionSettingsSchema>
