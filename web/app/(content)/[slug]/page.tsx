import type {Section} from '@/lib/zod/website/layout/sections'
import type {PageJsonLdData} from '@/lib/types/seo'
import type {Metadata} from 'next'
import type {ComponentType} from 'react'
import {RichTextPropValue} from '@/components/ui/RichText'
import {isProduction} from '@/lib/const/env'
import {sectionRegistry, type SectionKind} from '@/lib/const/sections-kind'
import {getPageBySlug} from '@/lib/data/page'
import {lyraGetPageMetadata} from '@/lib/utils/seo/metadata/page-metadata'
import {notFound} from 'next/navigation'
import PageGradientStyle from '@/components/layout/body/PageGradientStyle'
import TitleDesc from '@/components/layout/partials/TitleDesc'
import PageJsonLd from '@/components/seo/PageJsonLd'
import {PageSettingsType} from '@/lib/zod/sections/layout/page-settings'
import PageHeadWrapper from '@/components/layout/partials/PageHeadWrapper'
import {TitleDescSettingsSchema} from '@/lib/zod/sections/settings/section-titledesc'
import {SanityColor} from '@/lib/types/color-format'

type PageProps = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params
  const page = await getPageBySlug(slug)

  if (!page)
    return {
      title: 'Page Not Found',
      description: 'The requested page does not exist.',
    }

  return await lyraGetPageMetadata({page})
}

export default async function Page({params}: PageProps) {
  const {slug} = await params
  const page = await getPageBySlug(slug)
  if (!page) notFound()

  let jsonld: PageJsonLdData | undefined
  if (isProduction) {
    jsonld = (await lyraGetPageMetadata({
      page,
      data: 'jsonld',
    })) as PageJsonLdData
  }

  const pageDesc = page.description as RichTextPropValue
  const sections = page.sections || []
  const settings = page.settings as PageSettingsType
  const {showTitle, showDesc, shrinkTitle, alignTitle, gradientBg, textColor} = settings

  const titleDescSettings = {
    titleTag: 'h1',
    showDesc,
    shrinkTitle,
    textColor: textColor as SanityColor,
  } as TitleDescSettingsSchema

  return (
    <>
      <PageGradientStyle type={gradientBg} />

      <main className="lyraMain" id="main-content">
        <div className="lyraMain-wrapper" id={`page-${page._id}`}>
          {showTitle && (
            <PageHeadWrapper id={page._id} settings={settings}>
              <TitleDesc
                title={page.title}
                desc={pageDesc}
                alignment={alignTitle}
                settings={titleDescSettings}
              />
            </PageHeadWrapper>
          )}

          {sections?.map((section, i) => {
            if (!('kind' in section)) return null

            const SectionComponent = sectionRegistry[
              section.kind as SectionKind
            ] as ComponentType<Section>

            if (!SectionComponent) return null

            return <SectionComponent key={`${section._id ?? i}-${section.kind}`} {...section} />
          })}
        </div>
      </main>

      {isProduction && <PageJsonLd data={jsonld} />}
    </>
  )
}
