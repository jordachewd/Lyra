import groq from 'groq'
import {IMAGE_PROJECTION} from './image.groq'

export const IMAGE_ICON_PROJECTION = groq`image{ ${IMAGE_PROJECTION}, "alt": coalesce(alt, null) }`
