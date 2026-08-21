import {CardFooterItem} from '@/lib/zod/sections/layout/card-footer'
import {CSSProperties} from 'react'
import CardFooterMsg from './CardFooterMsg'
import SectionButtons from './SectionButtons'

type CardFooterProps = {
  content: CardFooterItem[]
  section: string
  className?: string
  textColor?: string | undefined
}

export default function CardFooter({
  content,
  section,
  className: cssClass,
  textColor,
}: CardFooterProps) {
  const message = content.find((f) => f._kind === 'message') || null
  const button = content.find((f) => f._kind === 'button') || null
  const cssVars: CSSProperties = {
    ...(textColor ? {['--cardFooter-txt' as string]: textColor} : null),
  }

  return (
    <div className={`arrCardFooter ${cssClass}`} style={cssVars}>
      {message && <CardFooterMsg message={message} />}
      {button?.href && (
        <SectionButtons
          buttons={[button]}
          className="arrCardFooter-btn"
          location={`${section} section`}
        />
      )}
    </div>
  )
}
