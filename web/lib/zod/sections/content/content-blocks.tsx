import z from 'zod'

import {PortableTextSchema} from '../layout/portable-text'
import {SectionSettingsSchema} from '../settings/section-wrapper'
import {ImageFieldSchema} from '../layout/imageNoMeta'

const BlockSettingsDefaults = {
  type: 'box',
  showIcon: true,
  iconTitle: 'stacked',
  perRow: 3,
  collapsible: false,
  gap: 'normal',
  textColor: undefined,
  accentColor: undefined,
  bgColor: undefined,
  iconBg: undefined,
} as const

const BlockSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  tagline: z.string().nullable().optional(),
  icon: ImageFieldSchema.nullable().optional(),
  description: PortableTextSchema.optional(),
})

const BlockSettingsSchema = z.object({
  type: z.enum(['box', 'card', 'text']).default('box'),
  showIcon: z.boolean().default(true),
  iconTitle: z.enum(['stacked', 'samerow']).default('stacked'),
  perRow: z.number().min(1).max(4).default(3),
  collapsible: z.boolean().default(false),
  gap: z.enum(['normal', 'medium', 'bigger']).default('normal'),
  textColor: z.unknown().optional(),
  accentColor: z.unknown().optional(),
  bgColor: z.unknown().optional(),
  iconBg: z.unknown().optional(),
})

export const ContentBlocksSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('contentBlocks'),
  aboveEyebrow: z.string().nullable().optional(),
  headline: z.string().min(1, {message: 'Section title is required'}),
  belowEyebrow: z.string().nullable().optional(),
  description: PortableTextSchema.optional().default([]),
  blocks: z.array(BlockSchema).max(12).default([]),
  blocksSettings: BlockSettingsSchema.default(BlockSettingsDefaults),
  settings: SectionSettingsSchema.optional(),
})

export type ContentBlock = z.infer<typeof BlockSchema>
export type ContentBlockSettings = z.infer<typeof BlockSettingsSchema>
export type ContentBlocksSectionSchema = z.infer<typeof ContentBlocksSectionSchema>
