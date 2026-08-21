import {defineField} from 'sanity'
import {LinkParent} from '../../types/linkParentType'

export const menuHrefField = defineField({
  name: 'href',
  title: 'URL or path',
  type: 'string',
  description:
    'Absolute URL (https://…), internal path (/contact), or email link (mailto:hello@example.com)',
  hidden: ({parent}: {parent?: LinkParent}) => parent?.linkType !== 'custom',
  validation: (Rule) =>
    Rule.custom((val, ctx) => {
      const linkType = (ctx.parent as LinkParent | undefined)?.linkType
      if (linkType !== 'custom') return true

      if (typeof val !== 'string' || !val.trim()) {
        return 'Provide a URL, path, or mailto link'
      }

      const isHttp = /^https?:\/\/\S+/i.test(val)
      const isPath = val.startsWith('/')

      const isMailto = /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+(\?.*)?$/i.test(val)

      return isHttp || isPath || isMailto
        ? true
        : 'Use https://… , a leading-slash path like /pricing, or mailto:hello@example.com'
    }),
})
