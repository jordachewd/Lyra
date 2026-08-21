import {ImageShapes, ImageWidths} from '@/lib/zod/website/content/images'
import {z} from 'zod'

const ImageDimensionsSchema = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
  aspectRatio: z.number().positive(),
})

const ImageMetadataSchema = z.object({
  dimensions: ImageDimensionsSchema,
})

const ImageAssetSchema = z.object({
  _id: z.string(),
  url: z.string().url().optional(),
  metadata: ImageMetadataSchema,
})

export const ImageFieldSchema = z
  .object({
    image: z.object({asset: ImageAssetSchema.optional()}).nullable().optional(),
    alt: z.string().nullable().optional(),
    widthSize: z.enum(ImageWidths).default('normal'),
    shape: z.enum(ImageShapes).default('rounded'),
  })
  .nullable()
  .optional()

export type ImageField = z.infer<typeof ImageFieldSchema>
