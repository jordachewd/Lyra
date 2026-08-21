import {type RichTextPropValue} from '@/components/ui/RichText'
import {SolutionItem} from '@/lib/zod/sections/content/solutions'
import classNames from 'classnames'
import {CSSProperties, memo} from 'react'
import CollapsibleAddons from './CollapsibleAddons'

type CardFeatureProps = {
  feature: SolutionItem
  textColor?: string | undefined
  layout?: 'horizontal' | 'vertical'
}

function SolutionsCardFeature({feature, textColor, layout}: CardFeatureProps) {
  const features = feature.features as RichTextPropValue
  const layoutCss = classNames({
    vertical: layout === 'vertical',
    horizontal: layout === 'horizontal',
  })

  const cssVars: CSSProperties = {
    ...(textColor ? {['--solutionFeat-txt' as string]: textColor} : null),
  }

  const cardClass = classNames('lyraSolutions-card-feature', layoutCss)

  return (
    <div className={cardClass} style={cssVars}>
      <div className="lyraSolutions-card-feature-badge">
        {feature.tag && <div className="lyraSolutions-card-feature-badge-text">{feature.tag}</div>}
      </div>

      <div className="lyraSolutions-card-feature-title">{feature.title}</div>

      {feature.subtitle && (
        <div className="lyraSolutions-card-feature-subtitle">{feature.subtitle}</div>
      )}

      {features && features.length > 0 && (
        <CollapsibleAddons
          content={features}
          label="Show all features"
          textColor={textColor}
          className="lyraSolutions-card-feature-addons"
        />
      )}
    </div>
  )
}

export default memo(SolutionsCardFeature)
