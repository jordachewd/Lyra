import {defineType} from 'sanity'
import {menuHrefField} from '../../fields/menus/menuHrefField'
import {menuTitleField} from '../../fields/menus/menuTitleField'
import {menuLinkTypeField} from '../../fields/menus/menuLinkTypeField'
import {menuNewTabField} from '../../fields/menus/menuNewTabField'
import {menuPageRefField} from '../../fields/menus/menuPageRefField'
import {menuLinkType} from '../../../../utils/menu-link-type'
import {menuIconField} from '../../fields/menus/menuIconField'
import {cmmHideOnMobile} from '../../fields/common/cmmHideOnMobile'

export const aboveMenuItemType = defineType({
  name: 'aboveMenuItem',
  title: 'Feature Item',
  type: 'object',
  fields: [
    menuTitleField,
    menuLinkTypeField,
    menuPageRefField,
    menuHrefField,
    menuNewTabField,
    menuIconField,
    cmmHideOnMobile,
  ],
  preview: {
    select: {title: 'title', media: 'icon.image', linkType: 'linkType'},
    prepare({title, media, linkType}) {
      const navLinkType = menuLinkType(linkType)
      return {title, media, subtitle: 'Feature Item • ' + navLinkType}
    },
  },
})
