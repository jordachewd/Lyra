type ImageDimensions = {
  width: number
  height: number
  aspectRatio: number
}

type ImageAsset = {
  _id: string
  url?: string
  metadata: {dimensions: ImageDimensions} & Partial<{
    lqip: string
    hasAlpha: boolean
    isOpaque: boolean
  }>
}

type ImageWidth = 'normal' | 'medium' | 'small'
type ImageShape = 'squared' | 'rounded' | 'disc'

type FlatImageField = {asset?: ImageAsset} | null | undefined

export type NestedImageField =
  | {
      image?: {asset?: ImageAsset} | null
      alt?: string | null
      widthSize?: ImageWidth
      shape?: ImageShape
    }
  | null
  | undefined

export type AnyImageField = FlatImageField | NestedImageField
