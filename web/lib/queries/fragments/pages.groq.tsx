import groq from 'groq'

export const PAGES_Q = groq`*[
  _type == "page" &&
  defined(slug.current) &&
  !(_id in path("drafts.**"))
]{
  "slug": slug.current,
  "lastmod": coalesce(_updatedAt, _createdAt)
}`
