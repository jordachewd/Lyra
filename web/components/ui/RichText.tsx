import {PortableText} from '@portabletext/react'
import type {PortableTextBlock} from '@portabletext/types'
import {ComponentProps} from 'react'
import {type PTImageBlock} from '@/lib/zod/sections/layout/imageWithMeta'
import {PTComponents} from '@/lib/const/pt-components'
import classNames from 'classnames'
import {SanityColor} from '@/lib/types/color-format'
import {getCssVars} from '@/lib/utils/common/get-css-vars'

type RichTextValue = Array<PortableTextBlock | PTImageBlock>
type RichTextProps = {
  value?: RichTextValue
  textOnly?: boolean
  className?: string
  textColor?: SanityColor
  accentColor?: SanityColor
}

export default function RichText({
  value,
  textOnly = false,
  className: cssClass,
  textColor,
  accentColor,
}: RichTextProps) {
  if (!value?.length) return null

  const classes = classNames('arrPortableText', cssClass)

  const richTextCss = getCssVars(
    {
      textColor: textColor as SanityColor,
      accentColor: accentColor as SanityColor,
    },
    'richText',
  )

  if (textOnly) {
    const textContent = value
      .map((block) => {
        if (block._type === 'block') {
          const textBlock = block as PortableTextBlock
          return textBlock.children.map((child) => child.text).join(' ')
        }
        return ''
      })
      .join(' ')

    return textContent
  }

  return (
    <div className={classes} style={richTextCss.vars}>
      <PortableText value={value} components={PTComponents} />
    </div>
  )
}

export type RichTextPropValue = ComponentProps<typeof RichText>['value']
