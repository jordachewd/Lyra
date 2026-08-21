import groq from 'groq'
import {HREF_PROJECTION} from './fields/href.groq'
import {IMAGE_PROJECTION} from './fields/image.groq'

export const FOOTER_QUERY = groq`*[_id=="siteFooter"][0]{
	"logo": footerLogo{ ${IMAGE_PROJECTION}, alt },    
	"menu": footerMenu->{
		_id,
		"slug": slug.current,
		"items": coalesce(children[]{
			"label": title,      
			"href": ${HREF_PROJECTION},
			"newTab": coalesce(newTab, false),     
			"children": coalesce(children[]{
				"label": title,
				"href": ${HREF_PROJECTION},
				"newTab": coalesce(newTab, false),       
				"children": coalesce(children[]{
					"label": title,
					"href": ${HREF_PROJECTION},
					"newTab": coalesce(newTab, false)
				}, [])
			}, [])
		}, []),
	},
	"copyright": footerCopyright,
	"settings": {
		"textColor": coalesce(textColor, undefined),
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
}`
