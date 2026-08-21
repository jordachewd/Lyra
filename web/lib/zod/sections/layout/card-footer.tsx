import {z} from 'zod'
import {ImageFieldSchema} from './imageNoMeta'

const CardFooterMessageSchema = z.object({
  _kind: z.literal('message'),
  info: z.string(),
  subtitle: z.string().nullable().optional(),
  icon: ImageFieldSchema,
  href: z.string().nullable().optional(),
  target: z.boolean().default(false),
})

const CardFooterButtonSchema = z.object({
  id: z.string(),
  _kind: z.literal('button'),
  text: z.string(),
  href: z.string().nullable().optional(),
  target: z.boolean().default(false),
  highlight: z.boolean().default(false),
})

const CardFooterItemSchema = z.discriminatedUnion('_kind', [
  CardFooterMessageSchema,
  CardFooterButtonSchema,
])

export type CardFooterMessage = z.infer<typeof CardFooterMessageSchema>
export type CardFooterItem = z.infer<typeof CardFooterItemSchema>

export const CardFooterCollectionSchema = z
  .array(CardFooterItemSchema)
  .max(2)
  .refine(
    (items) => {
      const kinds = new Set(items.map((i) => i._kind))
      return kinds.size === items.length
    },
    {message: "Footer can include at most one 'message' and one 'button'."},
  )
