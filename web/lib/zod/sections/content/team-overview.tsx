import {z} from 'zod'
import {ImageFieldSchema} from '../layout/imageNoMeta'
import {PortableTextSchema} from '../layout/portable-text'
import {SectionSettingsSchema} from '../settings/section-wrapper'

const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string().optional(),
  image: ImageFieldSchema,
  bio: PortableTextSchema.optional(),
  textColor: z.unknown().nullable().optional(),
  background: z.unknown().nullable().optional(),
})

export const TeamOverviewSectionSchema = z.object({
  _id: z.string(),
  kind: z.literal('teamOverview'),
  title: z.string().min(1, {message: 'Section title is required'}),
  subtitle: z.string().optional(),
  description: PortableTextSchema.optional(),
  members: z.array(TeamMemberSchema).default([]),
  settings: SectionSettingsSchema.optional(),
})

export type TeamMemberSchema = z.infer<typeof TeamMemberSchema>
export type TeamOverviewSectionSchema = z.infer<typeof TeamOverviewSectionSchema>
