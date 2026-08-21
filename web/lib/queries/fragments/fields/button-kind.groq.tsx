import groq from 'groq'

export const BUTTON_KIND_PROJECTION = groq`select( type=="internal" => "/" + pageRef->slug.current, type=="custom" => href, null )`
