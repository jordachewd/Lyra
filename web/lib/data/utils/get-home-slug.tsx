import {cache} from 'react'
import {getGlobals} from '../globals'
import {GlobalsData} from '../../zod/website/layout/globals'

export const getHomeSlug = cache(async (): Promise<string | null> => {
  const {settings} = (await getGlobals()) as GlobalsData
  return settings?.reading?.homePage?.slug || null
})
