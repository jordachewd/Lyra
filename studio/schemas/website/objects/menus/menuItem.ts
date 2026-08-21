import {defineType, defineField} from 'sanity'
import {menuHrefField} from '../../fields/menus/menuHrefField'
import {menuTitleField} from '../../fields/menus/menuTitleField'
import {menuLinkTypeField} from '../../fields/menus/menuLinkTypeField'
import {menuNewTabField} from '../../fields/menus/menuNewTabField'
import {menuPageRefField} from '../../fields/menus/menuPageRefField'
import {menuLinkType} from '../../../../utils/menu-link-type'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    menuTitleField,
    menuLinkTypeField,
    menuPageRefField,
    menuHrefField,
    menuNewTabField,

    defineField({
      name: 'children',
      type: 'array',
      title: 'Child Menu Items',
      description: 'Add, remove, and reorder child menu items',
      of: [{type: 'menuChildItem'}],
      options: {sortable: true},
      validation: (r) => r.max(8),
    }),
  ],
  preview: {
    select: {title: 'title', linkType: 'linkType'},
    prepare({title, linkType}) {
      const navLinkType = menuLinkType(linkType)
      return {title, subtitle: 'Menu Item • ' + navLinkType}
    },
  },
})
