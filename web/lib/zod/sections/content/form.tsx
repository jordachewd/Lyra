import {z} from 'zod'
import {PortableTextSchema} from '../layout/portable-text'
import {FeatureItemSchema} from './products'
import {SectionSettingsSchema} from '../settings/section-wrapper'

const FormKindEnum = z.enum(['customForm', 'hubSpotForm'])

const HubspotSchema = z.object({
  region: z.string().default('na1'),
  portalId: z.string().min(2, 'Portal ID is required'),
  formId: z.string().min(6, 'Form ID is required'),
})

const FormInputTypeEnum = z.enum([
  'checkbox',
  'email',
  'radio',
  'tel',
  'text',
  'textarea',
  'select',
])

const FormCheckboxOptionSchema = z.object({
  label: PortableTextSchema.default([]),
  value: z.string().min(1),
  required: z.boolean().default(false),
  checked: z.boolean().default(false),
})

const FormInputSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  hubspotKey: z.string().nullable().optional(),
  info: z.string().nullable().optional(),
  type: FormInputTypeEnum.default('text'),
  placeholder: z.string().nullable().optional(),
  checked: z.boolean().default(false).optional(),
  required: z.boolean().default(false).optional(),
  optLayout: z.enum(['horizontal', 'vertical']).default('vertical'),
  options: z.array(z.string().min(1)).default([]),
  cbxOptions: z.array(FormCheckboxOptionSchema).default([]),
  size: z.enum(['full', 'half']).default('full'),
})

export const FormSectionSchema = z
  .object({
    _id: z.string(),
    kind: z.literal('form'),
    title: z.string().min(1, {message: 'Section title is required'}),
    subtitle: z.string().optional(),
    description: PortableTextSchema.default([]),
    features: z.array(FeatureItemSchema).optional().default([]),
    featDisplay: z.enum(['vertical', 'horizontal']).default('horizontal'),
    form: FormKindEnum.default('customForm'),
    hubspot: HubspotSchema.nullable().optional(),
    formTitle: z.string().nullable().optional(),
    fields: z.array(FormInputSchema).default([]),
    btnLabel: z.string().default('Send Message'),
    footer: PortableTextSchema.default([]),
    settings: SectionSettingsSchema.optional(),
  })
  .superRefine((val, ctx) => {
    if (val.form === 'hubSpotForm') {
      if (!val.hubspot) {
        ctx.addIssue({
          code: 'custom',
          path: ['hubspot'],
          message: "HubSpot settings are required when form is 'hubSpotForm'.",
        })
        return
      }

      const parsed = HubspotSchema.safeParse(val.hubspot)
      if (!parsed.success) {
        parsed.error.issues.forEach((issue) =>
          ctx.addIssue({
            code: 'custom',
            path: ['hubspot', ...(issue.path ?? [])],
            message: issue.message,
          }),
        )
      }
    }
  })

export type FormCheckbox = z.infer<typeof FormCheckboxOptionSchema>
export type FormInput = z.infer<typeof FormInputSchema>
export type FormSectionSchema = z.infer<typeof FormSectionSchema>
