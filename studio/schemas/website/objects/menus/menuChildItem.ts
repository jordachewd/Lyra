import {defineType, defineField} from 'sanity'
import {menuHrefField} from '../../fields/menus/menuHrefField'
import {menuTitleField} from '../../fields/menus/menuTitleField'
import {menuDescField} from '../../fields/menus/menuDescField'
import {menuLinkTypeField} from '../../fields/menus/menuLinkTypeField'
import {menuNewTabField} from '../../fields/menus/menuNewTabField'
import {menuPageRefField} from '../../fields/menus/menuPageRefField'
import {menuLinkType} from '../../../../utils/menu-link-type'
import {menuIconField} from '../../fields/menus/menuIconField'

export const menuChildItemType = defineType({
  name: 'menuChildItem',
  title: 'Child Menu',
  type: 'object',
  fields: [
    menuTitleField,
    menuDescField,
    menuLinkTypeField,
    menuPageRefField,
    menuHrefField,
    menuNewTabField,
    menuIconField,

    defineField({
      name: 'children',
      type: 'array',
      title: 'Children of Child Menu Items',
      description: 'Add, remove, and reorder children of child menu items',
      of: [{type: 'menuChildChildItem'}],
      options: {sortable: true},
      validation: (r) => r.max(8),
    }),
  ],
  preview: {
    select: {title: 'title', media: 'icon.image', linkType: 'linkType'},
    prepare({title, media, linkType}) {
      const navLinkType = menuLinkType(linkType)
      return {title, media, subtitle: 'Child Menu • ' + navLinkType}
    },
  },
})
