import type {AnyImageField, NestedImageField} from './types'

type AssetLike = {asset: unknown}

function hasAsset(value: unknown): value is AssetLike {
  return typeof value === 'object' && value !== null && 'asset' in value
}

function isNestedLike(value: unknown): value is NestedImageField {
  return typeof value === 'object' && value !== null && ('image' in value || 'alt' in value)
}

export function toNestedImageField(input: AnyImageField): NestedImageField | undefined {
  if (!input) return undefined

  if (isNestedLike(input)) {
    return input
  }

  if (hasAsset(input)) {
    return {image: {asset: input.asset}} as NestedImageField
  }

  return undefined
}
