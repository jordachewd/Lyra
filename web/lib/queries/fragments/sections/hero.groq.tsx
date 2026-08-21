import groq from 'groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'
import {BUTTONS_PROJECTION} from '../fields/buttons.groq'
import {IMAGE_NO_META_FIELDS, IMAGE_NO_META_PROJECTION} from '../fields/imageNoMeta.groq'

export const HERO_SECTION = groq`...select(_type=="topHeroType" => {
	_id,
	"kind": "hero",
	"aboveTitle": coalesce(aboveHeadline, null),		 
	"title": headline,	
	"belowTitle": coalesce(belowHeadline, null),	  
	"subheadline": coalesce(subheadline, []), 
	"features": coalesce(features[]{ 
		"id": coalesce(_key, _id), 
		"eyebrow": coalesce(eyebrow, null),
		title, 
		"description": coalesce(description, ""), 
		"ttlSize": coalesce(ttlSize, "small"),
		"layout": coalesce(layout, "text"),
		"icon": icon{ ${IMAGE_PROJECTION}, alt } 
	}, []),
	"featDisplay": coalesce(featDisplay, "vertical"),
	"image": ${IMAGE_NO_META_PROJECTION},
	"eyebrowImage": eyebrowImage{ ${IMAGE_NO_META_FIELDS} },
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
