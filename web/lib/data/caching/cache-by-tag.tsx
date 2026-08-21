import {unstable_cache} from 'next/cache'

type CacheByTagOptions = {
  keyParts: (string | number)[]
  tags: string[]
  revalidate?: number | false
}

export function cacheByTag<TArgs extends unknown[], TReturn>(
  fetcher: (...args: TArgs) => Promise<TReturn>,
  {keyParts, tags, revalidate = 1}: CacheByTagOptions,
) {
  const key = keyParts.map(String).join('::')
  const cached = unstable_cache((...args: TArgs) => fetcher(...args), [key], {
    tags,
    revalidate,
  })

  return (...args: TArgs) => cached(...args)
}
