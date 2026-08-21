import groq from 'groq'
import {HREF_PROJECTION} from './fields/href.groq'
import {IMAGE_PROJECTION} from './fields/image.groq'

export const HEADER_QUERY = groq`*[_id=="siteHeader"][0]{   
	"logo": headerLogo{ ${IMAGE_PROJECTION}, alt },
	"aboveMenu": coalesce(aboveMenu[]{
		"id": coalesce(_key, _id),
		title,
		"href": ${HREF_PROJECTION},
		"icon": icon{ ${IMAGE_PROJECTION}, alt },
		"newTab": coalesce(newTab, false),
		"hideOnMobile": coalesce(hideOnMobile, false) 
	}, []),
	"menu": headerMenu->{
		_id,
		"slug": slug.current,
		"items": coalesce(children[]{
			"label": title,      
			"href": ${HREF_PROJECTION},
			"newTab": coalesce(newTab, false),     
			"children": coalesce(children[]{
				"label": title,
				"href": ${HREF_PROJECTION},        
				"description": description,
				"icon": icon{ ${IMAGE_PROJECTION}, alt },
				"newTab": coalesce(newTab, false),       
				"children": coalesce(children[]{
					"label": title,
					"href": ${HREF_PROJECTION},
					"description": description,
					"icon": icon{ ${IMAGE_PROJECTION}, alt },
					"newTab": coalesce(newTab, false)
				}, [])
			}, [])
		}, []),
	},
	"menuType": coalesce(menuType, "dropdown"),
	"buttons": coalesce(headerButtons[]{   
		"id": coalesce(_key, _id),
		"text": text,    
		"href": select( type=="internal" => "/" + pageRef->slug.current, type=="custom" => href, null ),
		"target": coalesce(target, false),
		"highlight": coalesce(highlight, false)
	}, [])
}`
