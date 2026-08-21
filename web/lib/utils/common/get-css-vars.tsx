import {CSSProperties} from 'react'
import {toCssColor} from '@/lib/utils/common/to-css-color'
import {ColorFormat, SanityColor} from '@/lib/types/color-format'

type ColorVars = {
  textColor?: SanityColor | null
  descColor?: SanityColor | null
  accentColor?: SanityColor | null
  bgColor?: SanityColor | null
  bgImage?: string | null
  bgOverlay?: SanityColor | null
  bgOvlBlend?: string | null
  bgOpacity?: number | null
  iconBg?: SanityColor | null
}

type ColorProps = {
  textColor?: string
  descColor?: string
  accentColor?: string
  bgColor?: string
  bgImage?: string
  bgOverlay?: string
  bgOvlBlend?: string
  bgOpacity?: number
  iconBg?: string
}

type GetCssVarsResult = {
  vars: CSSProperties
  colors: ColorProps
}

export function getCssVars(
  {
    textColor,
    descColor,
    accentColor,
    bgColor,
    bgImage,
    bgOverlay,
    bgOvlBlend,
    bgOpacity,
    iconBg,
  }: ColorVars,
  varName: string,
  format: ColorFormat = 'hex',
): GetCssVarsResult {
  const vars: Record<string, string> = {}
  const colors: Record<string, string> = {}

  const txt = toCssColor(textColor, format)
  if (txt) {
    vars[`--${varName}-txt`] = txt
    colors['textColor'] = txt
  }

  if (
    textColor?.rgb &&
    typeof textColor.rgb.r === 'number' &&
    typeof textColor.rgb.g === 'number' &&
    typeof textColor.rgb.b === 'number'
  ) {
    vars[`--${varName}-txtRgb`] = `${textColor.rgb.r}, ${textColor.rgb.g}, ${textColor.rgb.b}`
  }

  const desc = toCssColor(descColor, format)
  if (desc) {
    vars[`--${varName}-desc`] = desc
    colors['descColor'] = desc
  }

  if (
    descColor?.rgb &&
    typeof descColor.rgb.r === 'number' &&
    typeof descColor.rgb.g === 'number' &&
    typeof descColor.rgb.b === 'number'
  ) {
    vars[`--${varName}-descRgb`] = `${descColor.rgb.r}, ${descColor.rgb.g}, ${descColor.rgb.b}`
  }

  const accent = toCssColor(accentColor, format)
  if (accent) {
    vars[`--${varName}-accent`] = accent
    colors['accentColor'] = accent
  }

  if (
    accentColor?.rgb &&
    typeof accentColor.rgb.r === 'number' &&
    typeof accentColor.rgb.g === 'number' &&
    typeof accentColor.rgb.b === 'number'
  ) {
    vars[`--${varName}-accentRgb`] =
      `${accentColor.rgb.r}, ${accentColor.rgb.g}, ${accentColor.rgb.b}`
  }

  const bg = toCssColor(bgColor, format)
  if (bg) {
    vars[`--${varName}-bg`] = bg
    colors['bgColor'] = bg
  }

  if (
    bgColor?.rgb &&
    typeof bgColor.rgb.r === 'number' &&
    typeof bgColor.rgb.g === 'number' &&
    typeof bgColor.rgb.b === 'number'
  ) {
    vars[`--${varName}-bgRgb`] = `${bgColor.rgb.r}, ${bgColor.rgb.g}, ${bgColor.rgb.b}`
  }

  const icon = toCssColor(iconBg, format)
  if (icon) {
    vars[`--${varName}-icon-bg`] = icon
    colors['iconBg'] = icon
  }

  if (
    iconBg?.rgb &&
    typeof iconBg.rgb.r === 'number' &&
    typeof iconBg.rgb.g === 'number' &&
    typeof iconBg.rgb.b === 'number'
  ) {
    vars[`--${varName}-icon-bgRgb`] = `${iconBg.rgb.r}, ${iconBg.rgb.g}, ${iconBg.rgb.b}`
  }

  const imageUrl = bgImage?.trim()
  if (imageUrl) {
    vars[`--${varName}-bgImg`] = `url(${JSON.stringify(imageUrl)})`
    colors['bgImage'] = imageUrl
  }

  const overlay = toCssColor(bgOverlay, format)
  if (overlay) {
    vars[`--${varName}-bgOverlay`] = overlay
    colors['bgOverlay'] = overlay
  }

  if (
    bgOverlay?.rgb &&
    typeof bgOverlay.rgb.r === 'number' &&
    typeof bgOverlay.rgb.g === 'number' &&
    typeof bgOverlay.rgb.b === 'number'
  ) {
    vars[`--${varName}-bgOverlayRgb`] = `${bgOverlay.rgb.r}, ${bgOverlay.rgb.g}, ${bgOverlay.rgb.b}`
  }

  const blend = bgOvlBlend?.trim()
  if (blend) {
    vars[`--${varName}-bgOvlBlend`] = blend
    colors['bgOvlBlend'] = blend
  }

  const opacity = bgOpacity !== undefined && bgOpacity !== null ? bgOpacity : null
  if (opacity !== null) {
    const opacityValue = Math.max(0, Math.min(100, opacity)) / 100
    vars[`--${varName}-bgOpacity`] = opacityValue.toString()
  }

  return {vars: vars, colors: colors as ColorProps}
}
