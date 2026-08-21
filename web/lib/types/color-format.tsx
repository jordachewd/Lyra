type RgbaColor = {
  _type?: 'rgbaColor'
  r: number
  g: number
  b: number
  a?: number
}

type HslaColor = {
  _type?: 'hslaColor'
  h: number
  s: number
  l: number
  a?: number
}

export type SanityColor = {
  _type: 'color'
  hex?: string
  alpha?: number
  rgb?: RgbaColor
  hsl?: HslaColor
}

export type ColorFormat = 'rgba' | 'hex'
