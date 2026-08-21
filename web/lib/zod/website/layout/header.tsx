import {z} from 'zod'
import {ImageFieldSchema} from '../../sections/layout/imageNoMeta'
import {MenuSchema} from '../../sections/layout/menu'
import {CtaButtonSchema} from '../../sections/layout/cta-button'
import {HrefSchema} from '../../lib/scalars'

const HeaderMenuTypeSchema = z.enum(['dropdown', 'megamenu'])

const AboveHeaderMenuSchema = z.object({
  id: z.string(),
  title: z.string(),
  href: HrefSchema,
  newTab: z.boolean().optional(),
  icon: ImageFieldSchema.optional(),
  hideOnMobile: z.boolean().optional(),
})

export const HeaderSchema = z.object({
  logo: ImageFieldSchema.optional(),
  aboveMenu: z.array(AboveHeaderMenuSchema).max(3).default([]),
  menu: MenuSchema.optional(),
  menuType: HeaderMenuTypeSchema.default('dropdown'),
  buttons: z.array(CtaButtonSchema).max(2).default([]),
})

export type AboveHeaderMenu = z.infer<typeof AboveHeaderMenuSchema>
export type HeaderData = z.infer<typeof HeaderSchema>
export type HeaderMenuType = z.infer<typeof HeaderMenuTypeSchema>
