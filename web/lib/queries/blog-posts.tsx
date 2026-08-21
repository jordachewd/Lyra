import groq from 'groq'
import {IMAGE_PROJECTION} from './fragments/fields/image.groq'

const ALL_POSTS = groq`*[
  _type == "post" &&
  !defined(archivedAt) &&
  (!$excludeDrafts || !(_id in path("drafts.**")))
]`

const FILTERED_POSTS = groq`*[
  _type == "post" &&
  !defined(archivedAt) &&
  (!$excludeDrafts || !(_id in path("drafts.**"))) &&
  (!defined($tagSlug) || $tagSlug in tag[]->slug.current) &&
  (!defined($categorySlug) || $categorySlug in categories[]->slug.current) &&
  (!defined($authorSlug) || $authorSlug in author[]->slug.current)
]`

export const BLOG_OVERVIEW_QUERY = groq`{
  "items": ${FILTERED_POSTS} | order(coalesce(publishedAt, _createdAt) desc)[$offset...$end]{
    _id,
    title,
    "slug": slug.current,

    image{ 
      "image": select(
        defined(image.asset) => {
          "asset": image.asset->{
            _id,
            url,
            metadata{
              dimensions{width, height, aspectRatio},
              lqip,
              hasAlpha,
              isOpaque
            }
          }
        },
        null
      ),
      "alt": coalesce(alt, "")
    },    
    
    "publishedAt": coalesce(publishedAt, _createdAt),
    "excerptText": coalesce(excerpt, null),
    "categories": coalesce(categories[]->{ "slug": slug.current, title, _id, _type, description }, []),
    "tags": coalesce(tag[]->{ "slug": slug.current, title, _id, _type, description }, []),
    "authors": coalesce(author[]->{ "slug": slug.current, name, _id, _type, role, bio, image{ ${IMAGE_PROJECTION}, alt } }, [])
  },
  "totalFiltered": count(${FILTERED_POSTS}),
  "totalUnfiltered": count(${ALL_POSTS})
}`
