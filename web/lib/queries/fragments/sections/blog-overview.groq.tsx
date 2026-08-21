import groq from 'groq'
import {BUTTON_FIRST_PROJECTION} from '../fields/button-first.groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'

export const BLOG_SECTION = groq`...select(_type=="blogSection" => {
	_id,
	"kind": "blogSection",
	title,
	"description": coalesce(description, []),
	"button": ${BUTTON_FIRST_PROJECTION},  	
	"blogSettings": {
		"limit": coalesce(blogOverviewSettings.limit, 3),      
		"showExcerpt": coalesce(blogOverviewSettings.showExcerpt, true),
		"showCats": coalesce(blogOverviewSettings.showCats, true),
		"showTags": coalesce(blogOverviewSettings.showTags, false),
		"showAuthor": coalesce(blogOverviewSettings.showAuthor, false),
		"showDate": coalesce(blogOverviewSettings.showDate, true),
	},	
	"settings": {
		"titleDesc": {
			"showTitle": coalesce(titleDesc.showTitle, true),
			"showDesc": coalesce(titleDesc.showDesc, false),	
			"shrinkTitle": coalesce(titleDesc.shrinkTitle, false),
			"titleTag": coalesce(titleDesc.titleTag, "h2"),
			"textColor": coalesce(titleDesc.textColor, undefined),
			"accentColor": coalesce(titleDesc.accentColor, undefined)
		},
		"layout": {
			"pdTopBottom": coalesce(layout.pdTopBottom, "medium"),
			"pdDisplay": coalesce(layout.pdDisplay, "both"),
			"template": coalesce(layout.template, "normal"),
			"columns": coalesce(layout.columns, "normal"),
			"width": coalesce(layout.width, "normal")
		},
		"background": {
			"type": coalesce(background.type, "none"),
			"bgColor": coalesce(background.color, undefined),
			"image": coalesce(background{ ${IMAGE_PROJECTION} }, null),
			"ovlColor": coalesce(background.ovlColor, undefined),
			"ovlBlend": coalesce(background.ovlBlend, "overlay"),
			"ovlOpacity": coalesce(background.ovlOpacity, 50),
			"gradient": coalesce(background.gradient, "banner")
		}
	}   
})`
