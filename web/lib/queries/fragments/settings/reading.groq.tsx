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
    },
    "webinars": select(
      defined(webinars.page) => {
        "page": webinars.page->{ _id, title, "slug": slug.current },
        "settings": {
          "showExcerpt": coalesce(webinars.settings.showExcerpt, true),
          "excerptLength": coalesce(webinars.settings.excerptLength, 360),
          "perPage": coalesce(webinars.settings.perPage, 9),
          "showFilter": coalesce(webinars.settings.showFilter, true),
          "showCats": coalesce(webinars.settings.showCats, true),
          "showDate": coalesce(webinars.settings.showDate, true)
        }
      }
    )
  }
`
