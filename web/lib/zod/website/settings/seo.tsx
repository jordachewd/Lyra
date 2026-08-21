import z from 'zod'

export const SeoSettingsSchema = z.object({
  category: z.string().optional(),
  classification: z.string().optional(),
  keywords: z.string().optional(),
  twitterHandle: z.string().optional(),
  linkedinHandle: z.string().optional(),
  gSiteVerification: z.string().trim().optional(),
  noindex: z.boolean().default(false),
})

export type SeoSettings = z.infer<typeof SeoSettingsSchema>
