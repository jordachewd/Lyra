import groq from 'groq'

export const BLOG_ALL_CATEGORIES_QUERY = groq`
  *[_type == "category"] {
    _id,
    _type,
    title,
    description,
    "slug": slug.current,
    "count": count(*[_type == "post" && !defined(archivedAt) && (!$excludeDrafts || !(_id in path("drafts.**"))) && references(^._id)])
  } | order(title asc)
`
