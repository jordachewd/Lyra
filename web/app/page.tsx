import type {Section} from '@/lib/zod/website/layout/sections'
import type {PageJsonLdData} from '@/lib/types/seo'
import type {Metadata} from 'next'
import type {ComponentType} from 'react'
import type {RichTextPropValue} from '@/components/ui/RichText'
import PageGradientStyle from '@/components/layout/body/PageGradientStyle'
import TitleDesc from '@/components/layout/partials/TitleDesc'
import PageJsonLd from '@/components/seo/PageJsonLd'
import {isProduction} from '@/lib/const/env'
import {sectionRegistry, type SectionKind} from '@/lib/const/sections-kind'
import {getPageBySlug} from '@/lib/data/page'
import {getHomeSlug} from '@/lib/data/utils/get-home-slug'
import {lyraGetPageMetadata} from '@/lib/utils/seo/metadata/page-metadata'
import {notFound} from 'next/navigation'
import {PageSettingsType} from '@/lib/zod/sections/layout/page-settings'
import PageHeadWrapper from '@/components/layout/partials/PageHeadWrapper'
import {SanityColor} from '@/lib/types/color-format'
import {TitleDescSettingsSchema} from '@/lib/zod/sections/settings/section-titledesc'

export async function generateMetadata(): Promise<Metadata> {
  const homeslug = await getHomeSlug()
  const page = homeslug ? await getPageBySlug(homeslug) : null

  if (!page)
    return {
      title: 'Page Not Found',
      description: 'The requested page does not exist.',
    }

  return (await lyraGetPageMetadata({
    page,
    canonical: '/',
  })) as Promise<Metadata>
}

export default async function HomePage() {
  const slug = await getHomeSlug()
  if (!slug) notFound()

  const page = await getPageBySlug(slug)
  if (!page) notFound()

  let jsonld: PageJsonLdData | undefined
  if (isProduction) {
    jsonld = (await lyraGetPageMetadata({
      page,
      canonical: '/',
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
            <PageHeadWrapper id={page._id} settings={settings} className="lyraMain-pgHead">
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
