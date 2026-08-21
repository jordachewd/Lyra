import groq from 'groq'
import {BUTTONS_PROJECTION} from '../fields/buttons.groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'

export const STEPPER_SECTION = groq`...select(_type=="stepperType" => {
	_id,
	"kind": "stepper",   	 
	title,	
	"eyebrow": coalesce(eyebrow, null),
	"description": coalesce(description, []),
	"steps": coalesce(steps[]{ 
		"id": coalesce(_key, _id), 
		label, 
		title, 
		"description": coalesce(description, []),  
		"textColor": coalesce(textColor, undefined), 
		"descColor": coalesce(descColor, undefined),
		"background": coalesce(background, undefined),
		"layout": coalesce(layout, "card")
	}, []),
	"buttons": ${BUTTONS_PROJECTION},
	"disclaimer": coalesce(disclaimer, null),
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
