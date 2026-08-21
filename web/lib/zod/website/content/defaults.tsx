/* Page Settings Defaults */
export const PageSettingsDefaults = {
  showTitle: true,
  showDesc: true,
  shrinkTitle: false,
  alignTitle: 'left',
  pdTopBottom: 'normal',
  pdDisplay: 'both',
  width: 'normal',
  textColor: undefined,
  gradientBg: 'page',
} as const

/* Post Settings Defaults */
export const PostSettingsDefaults = {
  showCats: false,
  showTags: true,
  showAuthor: true,
  showDate: true,
  alignTitle: 'left',
  pdTopBottom: 'normal',
  pdDisplay: 'both',
  textColor: undefined,
  gradientBg: 'post',
} as const

export const TitleDescSettingsDefaults = {
  showTitle: true,
  showDesc: false,
  shrinkTitle: false,
  titleTag: 'h2',
  textColor: undefined,
  accentColor: undefined,
} as const

export const LayoutSettingsDefaults = {
  pdTopBottom: 'medium',
  pdDisplay: 'both',
  template: 'normal',
  columns: 'normal',
  width: 'normal',
} as const

export const BackgroundSettingsDefaults = {
  type: 'none',
  color: undefined,
  image: null,
  ovlColor: undefined,
  ovlBlend: 'overlay',
  ovlOpacity: 50,
  gradient: 'banner',
} as const
