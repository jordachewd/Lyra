import groq from 'groq'

export const PAGE_SETTINGS_QUERY = groq`{
  "showTitle": coalesce(settings.showTitle, true),
  "showDesc": coalesce(settings.showDesc, true),
  "shrinkTitle": coalesce(settings.shrinkTitle, false),
  "alignTitle": coalesce(settings.alignTitle, "left"),
  "pdTopBottom": coalesce(settings.pdTopBottom, "normal"),
  "pdDisplay": coalesce(settings.pdDisplay, "both"),
  "width": coalesce(settings.width, "normal"),
  "textColor": coalesce(settings.textColor, undefined),
  "gradientBg": coalesce(settings.gradientBg, "page")
}`
