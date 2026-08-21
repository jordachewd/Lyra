import groq from 'groq'

export const SEO_SETTINGS_QUERY = groq`
	*[_id=="seoSettings"][0]{		
		"category": coalesce(category, ""), 
		"classification": coalesce(classification, ""),
		"keywords": coalesce(keywords, ""),
		"language": coalesce(language, "en-US"), 
		"locale": coalesce(locale, "en_US"),	 
		"twitterHandle": coalesce(twitterHandle, ""), 
		"linkedinHandle": coalesce(linkedinHandle, ""),		
        "gSiteVerification": coalesce(gSiteVerification, ""),  
		"noindex": coalesce(noindex, false) 
	} 
`
