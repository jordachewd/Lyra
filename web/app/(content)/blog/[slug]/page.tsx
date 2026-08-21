import PageGradientStyle from '@/components/layout/body/PageGradientStyle'
import PostJsonLd from '@/components/seo/PostJsonLd'
import RichText, {type RichTextPropValue} from '@/components/ui/RichText'
import {isProduction} from '@/lib/const/env'
import {sectionRegistry, SectionKind} from '@/lib/const/sections-kind'
import {getPostBySlug} from '@/lib/data/post'
import {arrGetPostMetadata} from '@/lib/utils/seo/metadata/post-metadata'
import type {Section} from '@/lib/zod/website/layout/sections'
import type {PostJsonLdData} from '@/lib/types/seo'
import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import type {ComponentType} from 'react'
import type {PostSettings} from '@/lib/zod/sections/layout/post-settings'
import TitleDesc from '@/components/layout/partials/TitleDesc'
import classNames from 'classnames'
import {getCssVars} from '@/lib/utils/common/get-css-vars'
import {SanityColor} from '@/lib/types/color-format'
import PostFeatImage from '@/components/blog/PostFeatImage'
import {TitleDescSettingsSchema} from '@/lib/zod/sections/settings/section-titledesc'

type PostProps = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: PostProps): Promise<Metadata> {
  const {slug} = await params
  const post = await getPostBySlug(slug)

  if (!post)
    return {
      title: 'Post Not Found',
      description: 'The requested post does not exist.',
    }

  return await arrGetPostMetadata({post})
}

export default async function PostPage({params}: PostProps) {
  const {slug} = await params
  const post = await getPostBySlug(slug)
  if (!post) return notFound()

  let jsonld: PostJsonLdData | undefined
  if (isProduction) {
    jsonld = (await arrGetPostMetadata({
      post,
      data: 'jsonld',
    })) as PostJsonLdData
  }

  const pBody = (post.body && post.body.length > 0) as boolean
  const pSections: Section[] = post.sections || []
  const pSettings: PostSettings | null = post.settings
  const postId = `post-${post._id}`
  const {alignTitle, pdTopBottom, pdDisplay, textColor, gradientBg} = pSettings as PostSettings
  const pTitleClass = classNames('arrPost-header', 'ptb_' + pdTopBottom, 'pdd_' + pdDisplay)
  const pTitleCss = getCssVars(
    {
      textColor: textColor as SanityColor,
    },
    'postTitle',
  )

  const titleDescSettings = {
    titleTag: 'h1',
    textColor: textColor as SanityColor,
  } as TitleDescSettingsSchema

  return (
    <>
      <PageGradientStyle type={gradientBg} />

      <main className="arrMain" id="main-content">
        <div className="arrMain-wrapper" id={postId}>
          <section id={`${postId}-header`} className={pTitleClass} style={pTitleCss.vars}>
            <TitleDesc
              title={post.title}
              alignment={alignTitle}
              settings={titleDescSettings}
              className="arrPost-title"
            />
          </section>

          <PostFeatImage postId={postId} post={post} />

          {pBody && (
            <section id={`${postId}-body`} className="arrPost-body">
              <RichText value={post.body as RichTextPropValue} />
            </section>
          )}

          {pSections.length > 0 && (
            <>
              {pSections?.map((section: Section, i: number) => {
                if (!('kind' in section)) return null

                const SectionComponent = sectionRegistry[
                  section.kind as SectionKind
                ] as ComponentType<Section>

                if (!SectionComponent) return null

                return <SectionComponent key={`${section._id ?? i}-${section.kind}`} {...section} />
              })}
            </>
          )}
        </div>
      </main>

      {isProduction && <PostJsonLd data={jsonld} />}
    </>
  )
}
