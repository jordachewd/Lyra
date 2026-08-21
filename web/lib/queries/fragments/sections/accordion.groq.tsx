import groq from 'groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'

export const ACCORDION_SECTION = groq`...select(_type == "accordionType" => {
		_id,
		"kind": "accordion",
		"eyebrow": coalesce(eyebrow, null),
		title,
		"subtitle": coalesce(subtitle, ""),
		"description": coalesce(description, []),
		"image": image{ ${IMAGE_PROJECTION}, alt, "widthSize": coalesce(widthSize, "normal"), "shape": coalesce(shape, "rounded") },	
		"items": coalesce(
			items[]{
				"id": coalesce(_key, _id),
				title,
				"description": coalesce(description, [])       
			},
			[]
		),
		"accSettings": {	
			"design": coalesce(settings.design, "faq"),
			"ordered": coalesce(settings.ordered, false),
			"firstExpanded": coalesce(settings.firstExpanded, false),
			"textColor": coalesce(settings.textColor, undefined),
			"accentColor": coalesce(settings.accentColor, undefined),
			"bgColor": coalesce(settings.background, undefined)
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
	}
)`
