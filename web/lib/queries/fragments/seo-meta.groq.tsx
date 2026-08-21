import groq from 'groq'
import {IMAGE_PROJECTION} from './fields/image.groq'
export const SEO_META_PROJECTION = groq`{
	"mode": coalesce(seo.mode, "auto"),
	"title": coalesce(seo.title, ""),
	"description": coalesce(seo.description, ""),
	"image": seo.image{ ${IMAGE_PROJECTION}, alt },
	"keywords": coalesce(seo.keywords, ""),
	"noindex": coalesce(seo.noindex, false) 
}`
