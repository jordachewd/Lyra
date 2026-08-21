import {defineType, defineField} from 'sanity'

export const generalSettings = defineType({
  name: 'generalSettings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      type: 'string',
      title: 'Site Name',
      description: 'The name of the website, used in SEO and sharing',
      validation: (r) => r.required(),
    }),

    defineField({
      name: 'siteTitle',
      type: 'string',
      title: 'Site Title',
      description: 'The title of the website, used in the header and SEO',
    }),

    defineField({
      name: 'siteImage',
      type: 'imageIcon',
      title: 'Site Image',
      description: 'A default image for social sharing if no specific image is set',
    }),

    defineField({
      name: 'siteDescription',
      type: 'text',
      rows: 6,
      title: 'Site Description',
      description: 'A brief description of the website, used in SEO and sharing',
    }),

    defineField({
      name: 'siteUrl',
      type: 'url',
      title: 'Site URL',
      description: 'The main URL of the website, used for SEO and sharing',
      placeholder: 'https://www.lyra.com',
    }),

    defineField({
      name: 'siteEmail',
      type: 'email',
      title: 'Site Email',
      description: 'The contact email address for the website',
      placeholder: 'office@lyra.com',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'General Settings'}
    },
  },
})
