import groq from 'groq'

export const BUTTONS_PROJECTION = groq`coalesce(buttons[]{ 
	"id": coalesce(_key, _id), 
	"highlight": coalesce(highlight, false), 
	"target": coalesce(target, false),
	"text": text, 
	"href": select( type=="internal" => "/" + pageRef->slug.current, type=="custom" => href, null ) 
}, [])`
