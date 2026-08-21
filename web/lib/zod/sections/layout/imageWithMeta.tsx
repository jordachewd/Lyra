import {ImageWidths, ImageShapes} from '@/lib/zod/website/content/images'
import {z} from 'zod'

const ImageWithMetaDimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  aspectRatio: z.number(),
})

const ImageWithMetaMetadataSchema = z.object({
  dimensions: ImageWithMetaDimensionsSchema,
  lqip: z.string().optional(),
  hasAlpha: z.boolean().optional(),
  isOpaque: z.boolean().optional(),
})

const ImageWithMetaAssetSchema = z.object({
  _id: z.string(),
  url: z.url(),
  metadata: ImageWithMetaMetadataSchema,
})

const PTImageBlockSchema = z.object({
  _type: z.literal('image'),
  asset: ImageWithMetaAssetSchema,
  alt: z.string().nullable().optional(),
  link: z.string().url().optional(),
  align: z.enum(['left', 'center', 'right']).optional(),
  caption: z.string().optional(),
  credit: z.string().nullable().optional().default(null),
  target: z.enum(['_self', '_blank']).optional(),
  widthSize: z.enum(['normal', 'medium', 'small']).default('normal'),
})

export const ImageWithMetaAltImageSchema = z.object({
  image: z
    .object({
      asset: ImageWithMetaAssetSchema.optional(),
    })
    .nullable()
    .optional(),
  alt: z.string().nullable().optional(),
  caption: z.string().nullable().optional().default(null),
  captionSub: z.string().nullable().optional().default(null),
  credit: z.string().nullable().optional().default(null),
  widthSize: z.enum(ImageWidths).default('normal'),
  shape: z.enum(ImageShapes).default('rounded'),
})

export type PTImageBlock = z.infer<typeof PTImageBlockSchema>
