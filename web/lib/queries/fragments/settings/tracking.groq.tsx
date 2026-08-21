import groq from 'groq'

export const TRACKING_SETTINGS_QUERY = groq`
	*[_id=="trackingSettings"][0]{	
		google{
			"enabled": coalesce(enabled, false),
			"gTagManagerId": coalesce(gTagManagerId, "")      
		},
		"hubspot": {
			"enabled": coalesce(hubspot.enabled, false),
			"portalId": coalesce(hubspot.portalId, "")
		}		 
	} 
`
