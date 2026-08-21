import groq from 'groq'

import {IMAGE_WITH_META_PROJECTION} from '../fields/imageWithMeta.groq'
import {BUTTONS_PROJECTION} from '../fields/buttons.groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'

export const TEXT_IMAGE_SECTION = groq`...select(_type=="textImageType" => {
	_id,
	"kind": "textImage",
	title,
	"aboveTitle": coalesce(aboveTitle, null),	
	"belowTitle": coalesce(belowTitle, null),
	"description": coalesce(description, []),
	"chips": coalesce(chips, []),
	"image": ${IMAGE_WITH_META_PROJECTION},
	"buttons": ${BUTTONS_PROJECTION},	 	 
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
