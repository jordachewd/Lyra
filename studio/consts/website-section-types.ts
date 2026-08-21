export const websiteSectionTypes = [
  'aboutInfoType',
  'accordionType',
  'accreditationType',
  'blogSection',
  'ctaBannerType',
  'comparisonType',
  'contentBlocks',
  'formType',
  'topHeroType',
  'keyFeaturesType',
  'mapType',
  'productsType',
  'solutionsType',
  'stepperType',
  'tableType',
  'teamOverviewType',
  'textImageType',
  'textOnlyType',
]

const getPageSectionTypes = () => websiteSectionTypes.map((type) => ({type}))
export const allSectionTypes = getPageSectionTypes()
