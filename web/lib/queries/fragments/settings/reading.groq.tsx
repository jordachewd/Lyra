import groq from 'groq'

export const READING_SETTINGS_QUERY = groq`
  *[_id=="readingSettings"][0]{
    "homePage": homePage->{ _id, title, "slug": slug.current },
    "blogPage": blogPage->{ _id, title, "slug": slug.current },
    "blogSettings": {
      "showExcerpt": coalesce(blogSettings.showExcerpt, true),
      "excerptLength": coalesce(blogSettings.excerptLength, 360),
      "filterBy": coalesce(blogSettings.filterBy, "tags"),
      "perPage": coalesce(blogSettings.perPage, 9),
      "showCats": coalesce(blogSettings.showCats, true),
      "showTags": coalesce(blogSettings.showTags, true),
      "showAuthor": coalesce(blogSettings.showAuthor, true),
      "showDate": coalesce(blogSettings.showDate, true)
    }
  }
`
