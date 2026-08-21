import groq from 'groq'
import {BUTTONS_PROJECTION} from '../fields/buttons.groq'
import {IMAGE_ICON_PROJECTION} from '../fields/imageIcon.groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'

export const CTA_BANNER_SECTION = groq`...select(_type=="ctaBannerType" => {
	_id,
	"kind": "ctaBanner",   
	"eyebrow": coalesce(eyebrow, null),   	 
	"title": headline,	    
	"tagline": coalesce(tagline, null),  	  
	"subheadline": coalesce(subheadline, []),       
	"image": ${IMAGE_ICON_PROJECTION},     
	"buttons": ${BUTTONS_PROJECTION}, 
	"ctaSettings": {
		"innerPadding": coalesce(ctaSettings.innerPadding, "normal"),
		"ctaGradient": coalesce(ctaSettings.ctaGradient, "banner"),
		"ctaBgColor": coalesce(ctaSettings.ctaBgColor, undefined)
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
