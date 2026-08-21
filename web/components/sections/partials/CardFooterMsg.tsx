import RenderImage from '@/components/ui/RenderImage'
import Link from 'next/link'
import {NestedImageField} from '@/lib/images/types'
import {CardFooterMessage} from '@/lib/zod/sections/layout/card-footer'

type CardFooterMessageProps = {
  message: CardFooterMessage
}

export default function CardFooterMsg({message}: CardFooterMessageProps) {
  const href = message?.href || null
  const icon = message?.icon?.image as NestedImageField | null | undefined
  const iconAlt = message?.icon?.alt || 'Message Icon'
  const hasIcon = !!message?.icon?.image

  const content = (
    <>
      {hasIcon && (
        <div className="arrCardFooter-icon">
          <RenderImage image={icon} alt={iconAlt} />
        </div>
      )}

      <div className="arrCardFooter-info">
        <span className="arrCardFooter-info-text">{message.info}</span>
        {message.subtitle && <span className="arrCardFooter-info-subtext">{message.subtitle}</span>}
      </div>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="arrCardFooter-msg arrCardFooter-link"
        target={message.target ? '_blank' : '_self'}
        rel={message.target ? 'noopener noreferrer' : undefined}
      >
        {content}
      </Link>
    )
  }

  return <div className="arrCardFooter-msg">{content}</div>
}
