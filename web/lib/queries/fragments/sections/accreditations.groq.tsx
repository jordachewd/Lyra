import groq from 'groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'
import {HREF_PROJECTION} from '../fields/href.groq'

export const ACCREDITATION_SECTION = groq`...select(_type=="accreditationType" => {
	_id,
	"kind": "accreditation",
	title,
    "description": coalesce(description, []),	
	"items": coalesce(items[]{
		title,
		tag,
		"id": coalesce(_key, _id), 
		"image": image{ ${IMAGE_PROJECTION}, alt, "widthSize": coalesce(widthSize, "normal") },	 	
		"link": link{ "href": ${HREF_PROJECTION}, "newTab": coalesce(newTab, false) }	
	}, []),
	"accrSettings": {
		"showTitles": coalesce(accrSettings.showTitles, false),
		"showTags": coalesce(accrSettings.showTags, true),
		"displayType": coalesce(accrSettings.displayType, "grid"),
		"showArrows": coalesce(accrSettings.showArrows, true),
		"showDots": coalesce(accrSettings.showDots, true),
		"autoplay": coalesce(accrSettings.autoplay, true),
		"autoplayInterval": coalesce(accrSettings.autoplayInterval, 7),
		"itemsPerView": coalesce(accrSettings.itemsPerView, 4)
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
