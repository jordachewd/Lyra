import groq from 'groq'

export const POSTS_Q = groq`*[
  _type == "post" &&
  defined(slug.current) &&
  !(_id in path("drafts.**"))
]{
  "slug": slug.current,
  "lastmod": coalesce(publishedAt, _updatedAt, _createdAt)
} | order(lastmod desc)`
