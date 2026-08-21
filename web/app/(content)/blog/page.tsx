import type {Metadata} from 'next'
import type {RichTextPropValue} from '@/components/ui/RichText'
import type {PageJsonLdData} from '@/lib/types/seo'
import type {Section} from '@/lib/zod/website/layout/sections'
import {sectionRegistry, type SectionKind} from '@/lib/const/sections-kind'
import BlogPostsList from '@/components/blog/BlogPostsList'
import {getBlogList} from '@/lib/data/blog-list'
import {getReadingSettings} from '@/lib/data/utils/get-reading-settings'
import {getPageBySlug} from '@/lib/data/page'
import {notFound} from 'next/navigation'
import {ComponentType} from 'react'
import {getBlogSlug} from '@/lib/data/utils/get-blog-slug'
import PageGradientStyle from '@/components/layout/body/PageGradientStyle'
import {arrGetPageMetadata} from '@/lib/utils/seo/metadata/page-metadata'
import BlogJsonLd from '@/components/seo/BlogJsonLd'
import {isProduction} from '@/lib/const/env'
import {getBlogTags} from '@/lib/data/blog-tags'
import {getBlogCategories} from '@/lib/data/blog-categories'
import {getTitleSuffix} from '@/lib/utils/common/titleSuffix'
import TitleDesc from '@/components/layout/partials/TitleDesc'
import {PageSettingsType} from '@/lib/zod/sections/layout/page-settings'
import PageHeadWrapper from '@/components/layout/partials/PageHeadWrapper'
import {SanityColor} from '@/lib/types/color-format'
import {TitleDescSettingsSchema} from '@/lib/zod/sections/settings/section-titledesc'

type BlogPageParams = {
  page?: string
  tag?: string
  category?: string
  author?: string
}
type BlogPageProps = {
  searchParams: Promise<BlogPageParams>
}

export async function generateMetadata({searchParams}: BlogPageProps): Promise<Metadata> {
  const params = await searchParams
  const blogslug = await getBlogSlug()
  const page = blogslug ? await getPageBySlug(blogslug) : null

  if (!page)
    return {
      title: 'Page Not Found',
      description: 'The requested page does not exist.',
    }

  const baseMetadata = await arrGetPageMetadata({page})

  const tagSlug = params.tag
  const categorySlug = params.category
  const authorSlug = params.author
  const hasParams = Boolean(tagSlug || categorySlug || authorSlug)

  if (hasParams) {
    const suffix = getTitleSuffix(tagSlug, categorySlug, authorSlug)

    return {
      ...baseMetadata,
      title: `${suffix} · Arratech AB`,
    }
  }

  return baseMetadata
}

export default async function BlogPage({searchParams}: BlogPageProps) {
  const params = await searchParams
  const parsedPage = parseInt(params.page ?? '1', 10)
  const currentPage = Number.isNaN(parsedPage) ? 1 : Math.max(1, parsedPage)

  const selectedTag = params.tag ?? null
  const selectedCategory = params.category ?? null
  const selectedAuthor = params.author ?? null
  const hasParams = Boolean(selectedTag || selectedCategory || selectedAuthor)

  const reading = await getReadingSettings()
  if (!reading) notFound()

  const slug = reading.blogPage.slug
  const page = await getPageBySlug(slug)
  if (!page) notFound()

  let jsonld: PageJsonLdData | undefined
  if (isProduction) {
    const baseJsonld = (await arrGetPageMetadata({
      page,
      data: 'jsonld',
    })) as PageJsonLdData

    if (hasParams) {
      const suffix = getTitleSuffix(selectedTag, selectedCategory, selectedAuthor)

      jsonld = {
        ...baseJsonld,
        title: `${suffix} · Arratech AB`,
      }
    } else {
      jsonld = baseJsonld
    }
  }

  const blogSettings = reading.blogSettings

  const posts = await getBlogList({
    page: currentPage,
    perPage: blogSettings.perPage,
    tagSlug: selectedTag,
    categorySlug: selectedCategory,
    authorSlug: selectedAuthor,
  })

  const tags = await getBlogTags()
  const categories = await getBlogCategories()
  const titleSuffix = getTitleSuffix(selectedTag, selectedCategory, selectedAuthor)

  const pageTitle = hasParams ? titleSuffix : page.title
  const pageDesc = page.description as RichTextPropValue

  const sections = page.sections || []
  const settings = page.settings as PageSettingsType
  const {showTitle, showDesc, shrinkTitle, alignTitle, gradientBg, textColor, width} = settings

  const titleDescSettings = {
    titleTag: 'h1',
    showDesc,
    shrinkTitle,
    textColor: textColor as SanityColor,
  } as TitleDescSettingsSchema

  return (
    <>
      <PageGradientStyle type={gradientBg} />

      <main className="arrMain" id="main-content">
        <div className="arrMain-wrapper" id={`page-${page._id}`}>
          {showTitle && (
            <PageHeadWrapper id={page._id} settings={settings}>
              <TitleDesc
                title={pageTitle}
                desc={pageDesc}
                alignment={alignTitle}
                settings={titleDescSettings}
              />
            </PageHeadWrapper>
          )}

          <BlogPostsList
            pageId={page._id}
            allPosts={posts}
            allTags={tags}
            allCategories={categories}
            currentPage={currentPage}
            selectedTag={selectedTag}
            selectedCategory={selectedCategory}
            selectedAuthor={selectedAuthor}
            settings={blogSettings}
            layout={width}
          />

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

      {isProduction && <BlogJsonLd data={jsonld} />}
    </>
  )
}
