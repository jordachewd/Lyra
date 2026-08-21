import groq from 'groq'
import {IMAGE_PROJECTION} from './image.groq'

export const IMAGE_WITH_META_PROJECTION = groq`image{ 
        ${IMAGE_PROJECTION}, 
        "alt": coalesce(alt, null), 
        "caption": coalesce(caption, null), 
        "captionSub": coalesce(captionSub, null), 
        "credit": coalesce(credit, null),
        "widthSize": coalesce(widthSize, "normal"),
        "shape": coalesce(shape, "rounded") 		
    }`
