import {BlogTags} from '@/lib/zod/website/content/blog'

export function filterEmptyTags(tags: BlogTags) {
  return tags
    .filter((tag) => tag.count > 0)
    .map((tag) => ({
      _id: tag._id,
      title: tag.title,
      slug: tag.slug,
      url: `/blog/tag/${tag.slug}`,
      count: tag.count,
    }))
}
