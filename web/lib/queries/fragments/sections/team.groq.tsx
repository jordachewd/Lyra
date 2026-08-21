import groq from 'groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'

export const TEAM_SECTION = groq`...select(_type=="teamOverviewType" => {
	_id,
	"kind": "teamOverview",
	title,
	subtitle,
    "description": coalesce(description, []),
	"members": coalesce(members[]{
		"id": coalesce(_key, _id),
		name,
		position,
		"image": image{ ${IMAGE_PROJECTION}, alt, "widthSize": coalesce(widthSize, "normal") },
		"bio": coalesce(bio, []),
		"textColor": coalesce(textColor, null),
		"background": coalesce(background, null)		
	}, []),
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
