import {defineType, defineField} from 'sanity'
import {cmmSectionName} from '../../fields/common/cmmSectionName'
import {cmmSectionTitle} from '../../fields/common/cmmSectionTitle'
import {cmmSectionSubtitle} from '../../fields/common/cmmSectionSubtitle'
import {cmmSectionDescription} from '../../fields/common/cmmSectionDesc'

export const mapType = defineType({
  name: 'mapType',
  type: 'document',
  title: 'Google Map Section',
  description: 'Section with Google Map and details',
  fields: [
    cmmSectionName,
    cmmSectionTitle,
    cmmSectionSubtitle,
    cmmSectionDescription,

    defineField({
      name: 'embedUrl',
      type: 'url',
      title: 'Google Map Embed URL',
      description: 'Embed URL for the Google Map iframe',
    }),

    defineField({
      name: 'fullScreen',
      type: 'boolean',
      title: 'Allow Full Screen',
      description: 'Enable or disable full screen mode for the map iframe',
      initialValue: false,
    }),

    defineField({
      name: 'titleDesc',
      type: 'cmmTtlDescSettings',
      title: 'Title & Description',
      description: 'Settings for the title and description display',
    }),

    defineField({
      name: 'layout',
      type: 'cmmLySettings',
      title: 'Layout',
      description: 'Settings for the layout display',
    }),

    defineField({
      name: 'background',
      type: 'cmmBgSettings',
      title: 'Background',
      description: 'Settings for the background display',
    }),
  ],
  preview: {
    select: {title: 'title', name: 'sectionName'},
    prepare({title, name}) {
      return {title, subtitle: `Map · ${name}`}
    },
  },
})
