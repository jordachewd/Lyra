import {z} from 'zod'
import {CtaButtonSchema} from '../layout/cta-button'
import {ImageFieldSchema} from '../layout/imageNoMeta'
import {PortableTextSchema} from '../layout/portable-text'
import {SectionSettingsSchema} from '../settings/section-wrapper'
import {PaddingSizeEnum, SectionGradients} from '../../zod-consts'

const CtaSectionBaseSchema = z.object({
  innerPadding: PaddingSizeEnum.default('normal'),
  ctaGradient: SectionGradients.optional().default('banner'),
  ctaBgColor: z.unknown().optional(),
})

export const CtaBannerSchema = z.object({
  _id: z.string(),
  kind: z.literal('ctaBanner'),
  eyebrow: z.string().nullable().optional(),
  title: z.string().min(1, {message: 'Section title is required'}),
  tagline: z.string().nullable().optional(),
  subheadline: PortableTextSchema.optional().default([]),
  image: ImageFieldSchema.nullable().optional(),
  buttons: z.array(CtaButtonSchema).default([]),
  ctaSettings: CtaSectionBaseSchema.optional(),
  settings: SectionSettingsSchema.optional(),
})

export type CtaBannerSettings = z.infer<typeof CtaSectionBaseSchema>
export type CtaBannerSchema = z.infer<typeof CtaBannerSchema>
