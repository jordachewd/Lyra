import z from 'zod'

const GoogleSchema = z.object({
  enabled: z.boolean().nullable().default(false),
  gTagManagerId: z.string().trim().optional(),
})

const HubspotSchema = z.object({
  enabled: z.boolean().nullable().default(false),
  portalId: z.string().optional(),
})

export const TrackingSettingsSchema = z.object({
  google: GoogleSchema.optional(),
  hubspot: HubspotSchema.optional(),
})

export type GoogleSchema = z.infer<typeof GoogleSchema>
export type HubspotSchema = z.infer<typeof HubspotSchema>
