import {z} from 'zod'

export const UnknownSectionSchema = z.object({
  _id: z.string(),
  _type: z.string(),
  kind: z.literal('unknown'),
})

export type UnknownSectionSchema = z.infer<typeof UnknownSectionSchema>
