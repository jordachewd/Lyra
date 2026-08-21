import {type PortableTextComponents} from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import {ReactNode} from 'react'
import {type PTImageBlock} from '../zod/sections/layout/imageWithMeta'
import {Blockquote} from './pt-components/blockquote'
import {QMark} from './pt-components/qmark'
import {TableMatrixSchema} from '../zod/sections/content/table'
import LyraPortableTable from '@/components/sections/partials/LyraPortableTable'
import classNames from 'classnames'
import {getImgSize} from '../utils/common/get-image-size'

type PTLinkStyle = 'inline' | 'button'
type PTBtnAlign = 'left' | 'center' | 'right'
type PTBtnSize = 'normal' | 'half' | 'full'

type LinkProps = {
  children?: ReactNode
  value?: {
    href?: string
    blank?: boolean
    linkStyle?: PTLinkStyle
    highlighted?: boolean
    btnAlign?: PTBtnAlign
    btnSize?: PTBtnSize
  }
}

type ImageProps = {value: PTImageBlock}
type TableRow = {cells?: unknown}

export const PTComponents: PortableTextComponents = {
  types: {
    table: ({value}) => {
      const {rows = []} = value || {}

      const safeRows: ReadonlyArray<TableRow> = Array.isArray(rows)
        ? (rows as ReadonlyArray<TableRow>)
        : []

      const tableData: TableMatrixSchema = safeRows.map((row): string[] => {
        const cells = row.cells
        return Array.isArray(cells) ? cells.filter((c): c is string => typeof c === 'string') : []
      })

      return <LyraPortableTable data={tableData} />
    },

    image: ({value}: ImageProps) => {
      const img = value?.asset
      if (!img?.url || !img?.metadata?.dimensions) return null

      const {width, height} = img.metadata.dimensions
      const imgWidth = getImgSize(value?.widthSize || 'normal', width)
      const imgHeight = getImgSize(value?.widthSize || 'normal', height)

      const imgSrc = img.url.includes('?') ? `${img.url}&w=${imgWidth}` : `${img.url}?w=${imgWidth}`

      const imgAlt = value?.alt ?? 'Image'
      const imgLqip = img.metadata.lqip
      const imgLink = value?.link
      const imgLinkTarget = value?.target
      const imgAlign = value?.align

      return (
        <p>
          {imgLink ? (
            <Link
              href={imgLink}
              target={imgLinkTarget}
              rel={imgLinkTarget === '_blank' ? 'noopener noreferrer' : undefined}
            >
              <Image
                src={imgSrc}
                alt={imgAlt}
                width={imgWidth}
                height={imgHeight}
                placeholder={imgLqip ? 'blur' : 'empty'}
                blurDataURL={imgLqip}
                sizes="(max-width: 768px) 92vw, 960px"
                className={imgAlign}
              />
            </Link>
          ) : (
            <Image
              src={imgSrc}
              alt={imgAlt}
              width={imgWidth}
              height={imgHeight}
              placeholder={imgLqip ? 'blur' : 'empty'}
              blurDataURL={imgLqip}
              sizes="(max-width: 768px) 92vw, 960px"
              className={imgAlign}
            />
          )}
        </p>
      )
    },
  },

  block: {
    blockquote: Blockquote,
    pCenter: ({children}) => <p className="pt-align-center">{children}</p>,
    pRight: ({children}) => <p className="pt-align-right">{children}</p>,
    quotenormal: ({children}) => <q className="pt-quotenormal">{children}</q>,
  },

  marks: {
    q: QMark,
    link: ({children, value}: LinkProps) => {
      const isButton = value?.linkStyle === 'button'
      const btnAlign = value?.btnAlign || 'left'
      const btnSize = value?.btnSize || 'normal'
      const isHighlighted = isButton && value?.highlighted

      const href = value?.href ?? '#'
      const external = value?.blank && (/^https?:\/\//i.test(href) || /^http?:\/\//i.test(href))

      const btnWrapCss = classNames('pt-btn-wrapper', btnAlign)
      const btnCss = classNames('lyraButton', {
        highlighted: isHighlighted,
        halfwidth: btnSize === 'half',
        fullwidth: btnSize === 'full',
      })

      return isButton ? (
        <span className={btnWrapCss}>
          <Link
            href={href}
            target={external ? '_blank' : '_self'}
            rel={external ? 'noopener noreferrer' : undefined}
            className={btnCss}
          >
            {children}
          </Link>
        </span>
      ) : (
        <Link
          href={href}
          target={external ? '_blank' : '_self'}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
        </Link>
      )
    },
  },
}
