import groq from 'groq'
import {IMAGE_PROJECTION} from '../fields/image.groq'

export const CONTENT_BLOCKS_SECTION = groq`...select(_type=="contentBlocks" => {
	_id,
	"kind": "contentBlocks",
	"aboveEyebrow": coalesce(aboveEyebrow, null),		 
	"headline": headline,	
	"belowEyebrow": coalesce(belowEyebrow, null),	  
	"description": coalesce(description, []), 	
	"blocks": coalesce(blocks[]{
		"id": coalesce(_key, _id),
		title,		
		"tagline": coalesce(tagline, null),
		"description": coalesce(description, []),
		"icon": icon{ ${IMAGE_PROJECTION}, alt }	
	}, []),	

	"blocksSettings": {
		"type": coalesce(blocksSettings.type, "box"),
		"showIcon": coalesce(blocksSettings.showIcon, true),
		"iconTitle": coalesce(blocksSettings.iconTitle, "stacked"),
		"perRow": coalesce(blocksSettings.perRow, 3),
		"collapsible": coalesce(blocksSettings.collapsible, false),
		"gap": coalesce(blocksSettings.gap, "normal"),
		"textColor": coalesce(blocksSettings.textColor, undefined),
		"accentColor": coalesce(blocksSettings.accentColor, undefined),
		"bgColor": coalesce(blocksSettings.background, undefined),
		"iconBg": coalesce(blocksSettings.iconBg, undefined)
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
