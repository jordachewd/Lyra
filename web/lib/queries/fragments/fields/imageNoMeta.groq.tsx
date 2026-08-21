import groq from 'groq'
import {IMAGE_PROJECTION} from './image.groq'

export const IMAGE_NO_META_FIELDS = groq`
        ${IMAGE_PROJECTION},
        "alt": coalesce(alt, null),
        "widthSize": coalesce(widthSize, "normal"),
        "shape": coalesce(shape, "rounded")
    `

export const IMAGE_NO_META_PROJECTION = groq`image{ ${IMAGE_NO_META_FIELDS} }`
