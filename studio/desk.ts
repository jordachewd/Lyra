import {StructureResolver} from 'sanity/structure'
import {websiteStructure} from './structure/website-structure'
import {CURATED_TYPES} from './consts/curated/curated-types'

const lyraDesk: StructureResolver = (S) =>
  S.list()
    .title('Lyra Desk')
    .items([
      ...websiteStructure(S),

      // Default fallback list — should render empty when CURATED_TYPES is complete
      ...S.documentTypeListItems().filter(
        (item) => !CURATED_TYPES.includes((item.getId() ?? '') as any),
      ),
    ])

export default lyraDesk
