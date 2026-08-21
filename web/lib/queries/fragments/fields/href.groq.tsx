import groq from 'groq'

export const HREF_PROJECTION = groq`select(       
	linkType == "internal" && pageRef->_type == "page" => "/" + pageRef->slug.current,		  
	linkType == "internal" && pageRef->_type == "post" => "/blog/" + pageRef->slug.current,
	linkType == "custom"   => href,
	linkType == "file"     => file.asset->url,
	linkType == "none"     => null
)`
