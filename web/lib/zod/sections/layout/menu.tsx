import {z, type ZodType} from 'zod'
import {HrefSchema} from '../../lib/scalars'
import {asBool} from '../../lib/preprocess'
import {ImageFieldSchema} from './imageNoMeta'

export type MenuItem = {
  label: string
  href: z.infer<typeof HrefSchema>
  newTab: boolean
  children: MenuItem[]
  icon?: z.infer<typeof ImageFieldSchema> | null
  description?: string | null
}

const MenuItemSchema: ZodType<MenuItem> = z.lazy(() =>
  z.object({
    label: z.string(),
    href: HrefSchema,
    newTab: asBool(),
    children: z.array(MenuItemSchema).default([]),
    icon: ImageFieldSchema.nullable().optional(),
    description: z.string().nullable().optional(),
  }),
)

export const MenuSchema = z.object({
  _id: z.string(),
  slug: z.string().optional(),
  items: z.array(MenuItemSchema).default([]),
})
