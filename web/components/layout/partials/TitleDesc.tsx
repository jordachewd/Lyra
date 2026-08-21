import {SectionAlignTitle} from '@/lib/types/align-title'
import {type ElementType} from 'react'
import classNames from 'classnames'
import {SectionTitleTag} from '@/lib/zod/sections/settings/section-wrapper'
import RichText, {RichTextPropValue} from '../../ui/RichText'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {SanityColor} from '@/lib/types/color-format'
import {TitleDescSettingsSchema} from '@/lib/zod/sections/settings/section-titledesc'

type TitleDescProps = {
  title: string
  desc?: RichTextPropValue
  above?: string
  below?: string
  alignment?: SectionAlignTitle
  settings: TitleDescSettingsSchema
  className?: string
}

export default function TitleDesc({
  title,
  desc,
  above,
  below,
  alignment = 'left',
  settings,
  className,
}: TitleDescProps) {
  const {showDesc, shrinkTitle, titleTag, textColor, accentColor} =
    settings as TitleDescSettingsSchema

  const HTag: ElementType = titleTag as SectionTitleTag
  const wrapperCss = classNames('lyraTitleDesc', className, alignment, {
    shrink: shrinkTitle,
  })
  const hasDesc = showDesc && desc && desc.length > 0
  const cssVars = getCssVars(
    {
      textColor: textColor as SanityColor,
      accentColor: accentColor as SanityColor,
    },
    'TitleDesc',
  )

  return (
    <div className={wrapperCss} style={cssVars.vars}>
      {above && <h6 className="lyraTitleDesc-eyebrow above">{above}</h6>}
      <HTag className="lyraTitleDesc-title">{title}</HTag>
      {below && <h5 className="lyraTitleDesc-eyebrow below">{below}</h5>}
      {hasDesc && (
        <RichText
          className="lyraTitleDesc-desc"
          value={desc}
          textColor={textColor as SanityColor}
          accentColor={accentColor as SanityColor}
        />
      )}
    </div>
  )
}
