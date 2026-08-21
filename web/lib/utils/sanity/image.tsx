import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {projectId, dataset} from '../../const/env'
import {ensureSanityConfig} from '../common/ensure-sanity-config'

const builder = createImageUrlBuilder({
  projectId: ensureSanityConfig(projectId, 'projectId'),
  dataset: ensureSanityConfig(dataset, 'dataset'),
})

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
