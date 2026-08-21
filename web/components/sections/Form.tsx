import {type RichTextPropValue} from '@/components/ui/RichText'
import {type SectionOf} from '@/lib/zod/website/content/page'
import RanderFormClient from '../ui/RenderFormClient'
import HubspotFormEmbed from '../ui/HubspotFormEmbed'
import {headers} from 'next/headers'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import SectionWrapper from '../layout/partials/SectionWrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import FeatureItems from './partials/FeatureItems'
import classNames from 'classnames'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type FormSectionProps = SectionOf<'form'>

export default async function FormSection({
  _id,
  title,
  subtitle,
  description,
  features,
  featDisplay,
  form,
  hubspot,
  formTitle,
  fields,
  btnLabel,
  footer,
  settings,
}: FormSectionProps) {
  const nonce = (await headers()).get('x-nonce') ?? undefined
  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']
  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'

  const hasFields = fields && fields.length > 0
  const hasFeatures = features && features.length > 0

  const featClass = classNames('arrFormSection-heading-features', align, featDisplay || 'vertical')

  return (
    <SectionWrapper
      id={`form-${_id}`}
      settings={settings as SectionSettings}
      className="arrFormSection"
    >
      {titleDesc.showTitle && (
        <div className="arrFormSection-heading">
          <TitleDesc
            title={title}
            below={subtitle}
            desc={description as RichTextPropValue}
            alignment={align}
            settings={titleDesc}
          />

          {hasFeatures && <FeatureItems features={features} className={featClass} />}
        </div>
      )}

      {form === 'customForm' && hasFields && (
        <RanderFormClient
          title={title}
          inputs={fields}
          formTitle={formTitle || undefined}
          btnTxt={btnLabel}
          disclaimer={footer as RichTextPropValue}
        />
      )}

      {form === 'hubSpotForm' && hubspot && (
        <HubspotFormEmbed
          nonce={nonce}
          region={hubspot.region}
          portalId={hubspot.portalId}
          formId={hubspot.formId}
          className="arrFormSection-hubspot"
        />
      )}
    </SectionWrapper>
  )
}
