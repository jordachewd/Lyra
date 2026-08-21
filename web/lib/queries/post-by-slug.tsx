import groq from 'groq'
import {SECTIONS_PROJECTION} from './fragments/sections.groq'
import {SEO_META_PROJECTION} from './fragments/seo-meta.groq'
import {IMAGE_WITH_META_PROJECTION} from './fragments/fields/imageWithMeta.groq'
import {POST_SETTINGS_QUERY} from './fragments/settings/post.groq'
import {IMAGE_PROJECTION} from './fragments/fields/image.groq'

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug && !defined(archivedAt)][0]{
  _id,
  _type,
  title,
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _createdAt),
   excerpt,
  "image": ${IMAGE_WITH_META_PROJECTION},

 body[]{
    ...,
    _type == "image" => {
      ...,
      "alt": coalesce(alt, ""),
      "caption": coalesce(caption, ""),
      "link": coalesce(link, ""),
      "align": coalesce(align, "center"),
      "target": select(blank == true => "_blank", "_self"),
      asset->{
        _id,
        url,
        metadata{
          dimensions{width, height, aspectRatio},
          lqip, hasAlpha, isOpaque
        }
      }
    }
  },

  "categories": coalesce(categories[]->{ _id, _type, title, "slug": slug.current, description  }, []), 
  "tags": coalesce(tag[]->{ _id, _type, title, "slug": slug.current, description }, []),
  "authors": coalesce(author[]->{ _id, _type, name, "slug": slug.current, role, image{ ${IMAGE_PROJECTION}, alt }, bio  }, []),
  "sections": ${SECTIONS_PROJECTION}, 
  "settings": ${POST_SETTINGS_QUERY},
  "seoMeta": ${SEO_META_PROJECTION}
}`
