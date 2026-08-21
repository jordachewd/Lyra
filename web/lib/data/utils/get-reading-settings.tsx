import {cache} from 'react'
import {getGlobals} from '../globals'
import {GlobalsData} from '../../zod/website/layout/globals'
import {ReadingSettings} from '@/lib/zod/website/settings/reading'

export const getReadingSettings = cache(async (): Promise<ReadingSettings | null> => {
  const {settings} = (await getGlobals()) as GlobalsData
  return settings?.reading || null
})
