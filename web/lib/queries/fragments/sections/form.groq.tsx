import groq from 'groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'

export const FORM_SECTION = groq`...select(_type=="formType" => {
	_id,
	"kind": "form",
	title,
	"subtitle": coalesce(subtitle, ""),	
	"description": coalesce(description, []), 
	"features": coalesce(features[]{
		"id": coalesce(_key, _id), 
		title, 
		"description": coalesce(description, ""),
		"ttlSize": coalesce(ttlSize, "small"),
		"icon": icon{ ${IMAGE_PROJECTION}, alt, "widthSize": coalesce(widthSize, "normal") } 
	}, []),
	"featDisplay": coalesce(featDisplay, "vertical"),
	"form": coalesce(form, "customForm"),
    "formTitle": coalesce(formTitle, ""),
	"hubspot": select(
      form == "hubSpotForm" => hubspot{
        "region": coalesce(region, "na1"),
        portalId,
        formId
      },   
      null
    ),
	"fields": coalesce(fields[]{     
		"id": coalesce(_key, _id),
		title,
		"hubspotKey": coalesce(hubspotKey, null),
		"info": coalesce(info, null),
		"type": coalesce(type, "text"),
		"placeholder": coalesce(placeholder, null),       
		"options": coalesce(options[], []),
		"cbxOptions": coalesce(cbxOptions[]{
			"id": coalesce(_key, _id),
			"label": coalesce(label, []),
			"value": coalesce(value, ""),
			"required": coalesce(required, false),
			"checked": coalesce(checked, false)
		}, []),
		"optLayout": coalesce(optLayout, "vertical"),
		"required": coalesce(required, false),
		"size": coalesce(size, "full")
	}, []),
	"btnLabel": coalesce(btnLabel, "Send Message"),    
	"footer": coalesce(footer, []),
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
