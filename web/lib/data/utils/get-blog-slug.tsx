import {cache} from 'react'
import {getGlobals} from '../globals'
import {GlobalsData} from '../../zod/website/layout/globals'

export const getBlogSlug = cache(async (): Promise<string | null> => {
  const {settings} = (await getGlobals()) as GlobalsData
  return settings?.reading?.blogPage?.slug || null
})
