import {z} from 'zod'

const RevalidateBodySchema = z.object({
  _id: z.string(),
  _type: z.string(),
  slug: z.string().optional(),
})

export type RevalidateBody = z.infer<typeof RevalidateBodySchema>
