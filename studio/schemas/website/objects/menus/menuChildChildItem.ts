import {defineType} from 'sanity'
import {menuHrefField} from '../../fields/menus/menuHrefField'
import {menuTitleField} from '../../fields/menus/menuTitleField'
import {menuLinkTypeField} from '../../fields/menus/menuLinkTypeField'
import {menuNewTabField} from '../../fields/menus/menuNewTabField'
import {menuPageRefField} from '../../fields/menus/menuPageRefField'
import {menuLinkType} from '../../../../utils/menu-link-type'
import {menuIconField} from '../../fields/menus/menuIconField'
import {menuDescField} from '../../fields/menus/menuDescField'

export const menuChildChildType = defineType({
  name: 'menuChildChildItem',
  title: 'Child of Child Menu',
  type: 'object',
  fields: [
    menuTitleField,
    menuDescField,
    menuLinkTypeField,
    menuPageRefField,
    menuHrefField,
    menuNewTabField,
    menuIconField,
  ],
  preview: {
    select: {title: 'title', media: 'icon.image', linkType: 'linkType'},
    prepare({title, media, linkType}) {
      const navLinkType = menuLinkType(linkType)
      return {title, media, subtitle: 'Child of Child Menu • ' + navLinkType}
    },
  },
})
