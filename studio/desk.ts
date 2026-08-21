import {StructureResolver} from 'sanity/structure'
import {websiteStructure} from './structure/website-structure'
import {portalStructure} from './structure/portal-structure'
import {CURATED_TYPES} from './consts/curated/curated-types'

const arratechDesk: StructureResolver = (S) =>
  S.list()
    .title('Arratech Desk - PRODUCTION')
    .items([
      // Arratech Website (Marketing)
      websiteStructure(S),

      // Arratech Connect (Portal)
      portalStructure(S),

      // Default fallback list
      ...S.documentTypeListItems().filter(
        (item) => !CURATED_TYPES.includes((item.getId() ?? '') as any),
      ),
    ])

export default arratechDesk
