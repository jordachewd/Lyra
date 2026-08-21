import z from 'zod'

/* Seo Meta */
export const SeoModeEnum = z.enum(['auto', 'override', 'ignore'])

/* Page / Section Settings */
export const AlignTitleEnum = z.enum(['left', 'center', 'right'])
export const TitleTagEnum = z.enum(['h1', 'h2', 'h3', 'h4'])
export const PaddingSizeEnum = z.enum(['normal', 'medium', 'half', 'small', 'none'])
export const PaddingShowEnum = z.enum(['both', 'top', 'bottom', 'none'])
export const TemplateEnum = z.enum(['normal', 'centered', 'reversed', 'revCentered'])
export const ColSizeEnum = z.enum(['normal', 'firstBig', 'lastBig'])
export const WidthEnum = z.enum(['normal', 'full'])

/* Page Gradients */
export const PageGradients = [
  'none',
  'home',
  'page',
  'pageblue',
  'post',
  'product',
  'solution',
  'guideblue',
  'guidegreen',
  'guidegray',
] as const

/* Section Gradients */
export const SectionGradients = z.enum([
  'none' /* to remove */,
  'custom' /* to remove ?? */,
  'banner',
  'flare',
  'lemontwist',
  'lunada',
  'mojito',
  'ohhappiness',
  'sulphur',
  'darkblue',
])

/* Background Settings */
export const BgTypeEnum = z.enum(['none', 'color', 'image', 'gradient'])
export const BgBlendModeEnum = z.enum([
  'overlay',
  'normal',
  'darken',
  'multiply',
  'color-burn',
  'lighten',
  'screen',
  'color-dodge',
  'soft-light',
  'hard-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
])
