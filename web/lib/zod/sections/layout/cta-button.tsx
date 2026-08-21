import {z} from 'zod'

export const CtaButtonSchema = z.object({
  id: z.string(),
  text: z.string(),
  href: z.string().nullable().optional(),
  target: z.boolean().default(false),
  highlight: z.boolean().default(false),
})

export type CtaButton = z.infer<typeof CtaButtonSchema>
