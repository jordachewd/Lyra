import {RichTextPropValue} from '@/components/ui/RichText'
import {getBlogList} from '@/lib/data/blog-list'
import {SectionOf} from '@/lib/zod/website/content/page'
import BlogCardsList from './partials/BlogCardsList'
import Link from 'next/link'
import {BlogDisplaySettings} from '@/lib/zod/website/settings/reading'
import {BlogOverviewSettings} from '@/lib/zod/sections/content/blog-overview'
import SectionWrapper from '../layout/partials/SectionWrapper'
import {SectionSettings} from '@/lib/zod/sections/settings/section-wrapper'
import TitleDesc from '../layout/partials/TitleDesc'
import {LayoutSettings} from '@/lib/zod/sections/settings/section-layout'

type BlogListProps = SectionOf<'blogSection'>

export default async function BlogOverviewSection({
  _id,
  title,
  description,
  button,
  blogSettings,
  settings,
}: BlogListProps) {
  const {limit, showExcerpt, showCats, showTags, showAuthor, showDate} =
    blogSettings as BlogOverviewSettings

  const {titleDesc, layout} = settings as SectionSettings
  const tpl = layout.template as LayoutSettings['template']

  const isCentered = tpl === 'centered' || tpl === 'revCentered'
  const align = isCentered ? 'center' : tpl === 'reversed' ? 'right' : 'left'

  const listSettings: BlogDisplaySettings = {
    showExcerpt: Boolean(showExcerpt),
    showCats: Boolean(showCats),
    showTags: Boolean(showTags),
    showAuthor: Boolean(showAuthor),
    showDate: Boolean(showDate),
  }

  const safeLimit = limit >= 0 ? Math.floor(limit) : 3
  const blogList = await getBlogList({page: 1, perPage: safeLimit})
  const listItems = (blogList?.items || []).slice(0, safeLimit)
  const hasPosts = listItems.length > 0

  return (
    <SectionWrapper
      id={`blog-overview-${_id}`}
      settings={settings as SectionSettings}
      className="lyraBlogSection"
    >
      {titleDesc.showTitle && (
        <TitleDesc
          title={title}
          desc={description as RichTextPropValue}
          alignment={align}
          settings={titleDesc}
        />
      )}

      {hasPosts ? (
        <BlogCardsList posts={listItems} settings={listSettings} />
      ) : (
        <p className="lyraBlog-noPosts">No posts yet.</p>
      )}

      {button && (
        <div className="lyraBlogSection-bottom">
          <Link
            href={button.href ?? '/'}
            target={button.target ? '_blank' : '_self'}
            className={`lyraButton ${button.highlight ? 'highlighted' : ''}`}
          >
            {button.text}
          </Link>
        </div>
      )}
    </SectionWrapper>
  )
}
