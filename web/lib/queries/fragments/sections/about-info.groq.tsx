import groq from 'groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'
import {BUTTONS_PROJECTION} from '../fields/buttons.groq'

export const ABOUT_INFO_SECTION = groq`...select(_type=="aboutInfoType" => {
	_id,
	"kind": "aboutInfo",
	title,
	"description": coalesce(description, []),
	"buttons": ${BUTTONS_PROJECTION},
	"collapsibles": coalesce(collapsibles[]{
		"id": coalesce(_key, _id),
		title,
		"icon": icon{ ${IMAGE_PROJECTION}, alt },
		"content": coalesce(content, [])
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
