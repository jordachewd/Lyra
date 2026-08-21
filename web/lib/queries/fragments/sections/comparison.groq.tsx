import groq from 'groq'
import {BUTTONS_PROJECTION} from '../fields/buttons.groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'

export const COMPARISON_SECTION = groq`...select(_type=="comparisonType" => {
	_id,
	"kind": "comparison",   	 
	title,	
	"description": coalesce(description, []),
    "buttons": ${BUTTONS_PROJECTION},
	"steps": coalesce(steps[]{ 
		"id": coalesce(_key, _id), 
		title, 
		"boxes": coalesce(boxes[]{ 
			"id": coalesce(_key, _id), 
			title, 
			"description": coalesce(description, []), 
			"textColor": coalesce(textColor, "#ffffff"), 
			"background": coalesce(background, "#4E8199")
		}, []),
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
