import groq from 'groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'
import {BUTTON_KIND_PROJECTION} from '../fields/button-kind.groq'
import {HREF_PROJECTION} from '../fields/href.groq'

export const SOLUTIONS_SECTION = groq`...select(_type=="solutionsType" => {
	_id,
	"kind": "solutions",
	title,
	"description": coalesce(description, []),
	"content": coalesce(content, []),
	"cards": coalesce(cards[]{
		"id": coalesce(_key, _id),
		title,
		"content": coalesce(content, []),
		"image": image{ ${IMAGE_PROJECTION}, alt, "widthSize": coalesce(widthSize, "normal") },
		"items": coalesce(items[]{ 
			"id": coalesce(_key, _id), 
			title, 
			subtitle, 
			tag, 
			"features": coalesce(features, []) 
		}, []),
		"footer": coalesce(footer[]{
			_type=="ctaMessage" => {
				"_kind": "message",
				"info": info,
				"subtitle": subtitle,
				"icon": icon{ ${IMAGE_PROJECTION}, alt, "widthSize": coalesce(widthSize, "normal") },
				"href": ${HREF_PROJECTION},
				"newTab": coalesce(newTab, false), 
			},
			_type=="ctaButton" => {
				"_kind": "button",
				"id": coalesce(_key, _id),
				"highlight": coalesce(highlight, false),
				"target": coalesce(target, false),
				"text": text,
				"href": ${BUTTON_KIND_PROJECTION}
			}
		}, []),
		"textColor": coalesce(textColor, "#ffffff"),
		"background": coalesce(background, "#505f66"),
		"rounded": coalesce(rounded, true)
	}, []),
	"display": coalesce(display, "horizontal"),
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
