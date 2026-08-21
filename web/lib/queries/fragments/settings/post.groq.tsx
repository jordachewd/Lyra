import groq from 'groq'

export const POST_SETTINGS_QUERY = groq`{
	"showCats": coalesce(settings.showCats, false),
	"showTags": coalesce(settings.showTags, true),
	"showAuthor": coalesce(settings.showAuthor, true),
	"showDate": coalesce(settings.showDate, true),
	"alignTitle": coalesce(settings.alignTitle, "center"),
	"pdTopBottom": coalesce(settings.pdTopBottom, "normal"),
	"pdDisplay": coalesce(settings.pdDisplay, "both"),
	"textColor": coalesce(settings.textColor, undefined),
	"gradientBg": coalesce(settings.gradientBg, "post")
  }
`
