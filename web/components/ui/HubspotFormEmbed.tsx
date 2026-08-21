import classNames from 'classnames'
import Script from 'next/script'

type HubspotFormClientProps = {
  nonce: string | undefined
  region: 'na1' | 'eu1' | string
  portalId: string
  formId: string
  className?: string
}

export default function HubspotFormEmbed({
  nonce,
  region,
  portalId,
  formId,
  className,
}: HubspotFormClientProps) {
  const formClasses = classNames('arrHubspotForm', 'hs-form-frame', className)

  return (
    <>
      <Script
        id={`hs-script-embed-form-${formId}`}
        src={`https://js.hsforms.net/forms/embed/${portalId}.js`}
        nonce={nonce}
        defer
      />

      <div
        key={`${portalId}-${formId}-${region}`}
        className={formClasses}
        data-region={region}
        data-form-id={formId}
        data-portal-id={portalId}
      ></div>
    </>
  )
}
