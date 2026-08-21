import {portalSchema} from './portal-index'
import {aboveMenuItemType} from './website/objects/menus/aboveMenuItem'
import {siteFooter} from './website/documents/appearance/footer'
import {siteHeader} from './website/documents/appearance/header'
import {menuType} from './website/documents/appearance/menu'
import {menuChildChildType} from './website/objects/menus/menuChildChildItem'
import {menuChildItemType} from './website/objects/menus/menuChildItem'
import {menuItemType} from './website/objects/menus/menuItem'
import {authorType} from './website/documents/blog/authorType'
import {categoryType} from './website/documents/blog/categoryType'
import {postType} from './website/documents/blog/postType'
import {tagType} from './website/documents/blog/tagType'
import {pageType} from './website/documents/page/pageType'
import {aboutInfoType} from './website/documents/sections/aboutInfo'
import {accordionType} from './website/documents/sections/accordion'
import {accreditationType} from './website/documents/sections/accreditation'
import {blogSection} from './website/documents/sections/blogSection'
import {comparisonType} from './website/documents/sections/comparison'
import {ctaBannerType} from './website/documents/sections/ctaBanner'
import {formType} from './website/documents/sections/form'
import {topHeroType} from './website/documents/sections/hero'
import {keyFeaturesType} from './website/documents/sections/keyFeatures'
import {mapType} from './website/documents/sections/map'
import {productsType} from './website/documents/sections/products'
import {solutionsType} from './website/documents/sections/solutions'
import {stepperType} from './website/documents/sections/stepper'
import {tableType} from './website/documents/sections/table'
import {teamOverviewType} from './website/documents/sections/teamOverview'
import {textBlocksType} from './website/documents/sections/textBlocks'
import {textCardsType} from './website/documents/sections/textCards'
import {textImageType} from './website/documents/sections/textImageType'
import {textOnlyType} from './website/documents/sections/textOnlyType'
import {generalSettings} from './website/documents/settings/general'
import {readingSettings} from './website/documents/settings/reading'
import {seoSettings} from './website/documents/settings/seo'
import {aboutInfoCard} from './website/objects/ui/aboutInfoCard'
import {accordionItem} from './website/objects/ui/accordionItem'
import {accordionSettings} from './website/objects/settings/sections/accordionSettings'
import {accreditationItem} from './website/objects/ui/accreditationItem'
import {googleTracking} from './website/objects/analytics/googleTracking'
import {hubspotTracking} from './website/objects/analytics/hubSpotTracking'
import {comparisonBox} from './website/objects/ui/comparisonBox'
import {comparisonItem} from './website/objects/ui/comparisonItem'
import {blockContentExcerpt} from './website/objects/editor/blockContentExcerpt'
import {blockContentMaxi} from './website/objects/editor/blockContentMaxi'
import {blockContentMedi} from './website/objects/editor/blockContentMedi'
import {blockContentMini} from './website/objects/editor/blockContentMini'
import {featureCard} from './website/objects/ui/featureCard'
import {featureItem} from './website/objects/ui/featureItem'
import {formCheckboxOption} from './website/objects/form/formCheckboxOption'
import {formHubSpot} from './website/objects/form/formHubSpot'
import {formInput} from './website/objects/form/formInput'
import {cardFooter} from './website/objects/ui/cardFooter'
import {productCard} from './website/objects/ui/productCard'
import {solutionCard} from './website/objects/ui/solutionCard'
import {solutionItem} from './website/objects/ui/solutionItem'
import {stepperItem} from './website/objects/ui/stepperItem'
import {teamMember} from './website/objects/ui/teamMember'
import {textBlock} from './website/objects/ui/textBlock'
import {textCard} from './website/objects/ui/textCard'
import {ctaButton} from './website/objects/ui/ctaButton'
import {ctaMessage} from './website/objects/ui/ctaMessage'
import {fileWithMeta} from './website/objects/ui/fileWithMeta'
import {imageIcon} from './website/objects/ui/imageIcon'
import {imageNoMeta} from './website/objects/ui/imageNoMeta'
import {imageWithMeta} from './website/objects/ui/imageWithMeta'
import {ctaBannerSettings} from './website/objects/settings/sections/ctaBannerSettings'
import {blockContentPlus} from './website/objects/editor/blockContentPlus'
import {trackingSettings} from './website/documents/settings/tracking'
import {seoMeta} from './website/objects/seo/seoMeta'
import {postSettings} from './website/objects/settings/postSettings'
import {blogSettings} from './website/objects/settings/blogSettings'
import {webinarPage} from './website/documents/webinars/webinarPage'
import {webinarCat} from './website/documents/webinars/webinarCat'
import {linkField} from './website/objects/ui/linkField'
import {webinarsSettings} from './website/objects/settings/webinarsSettings'
import {webinars} from './website/documents/settings/webinars'
import {cmmTtlDescSettings} from './website/objects/settings/common/cmmTtlDescSettings'
import {cmmLySettings} from './website/objects/settings/common/cmmLySettings'
import {cmmBgSettings} from './website/objects/settings/common/cmmBgSettings'
import {pageSettings} from './website/objects/settings/pageSettings'
import {contentBlocksSettings} from './website/objects/settings/sections/contentBlocksSettings'
import {contentBlocks} from './website/documents/sections/contentBlocks'
import {contentBlock} from './website/objects/ui/contentBlock'
import {blogOverviewSettings} from './website/objects/settings/sections/blogOverview'
import {accreditationSettings} from './website/objects/settings/sections/accreditationSettings'
import {webinarThankYou} from './website/objects/settings/webinarThankYou'

export const arratechSchema = [
  ...portalSchema,

  /* Pages */
  pageType,
  pageSettings,
  seoMeta,

  /* Blog */
  postType,
  authorType,
  categoryType,
  tagType,

  /* Webinars */
  webinars,
  webinarsSettings,
  webinarThankYou,
  webinarPage,
  webinarCat,

  /* Sections */
  aboutInfoType,
  accordionType,
  accreditationType,
  accordionSettings,
  blogSection,
  blogOverviewSettings,
  comparisonType,
  contentBlocks,
  contentBlocksSettings,
  ctaBannerType,
  ctaBannerSettings,
  formType,
  keyFeaturesType,
  mapType,
  productsType,
  solutionsType,
  stepperType,
  tableType,
  teamOverviewType,
  textImageType,
  textBlocksType,
  textCardsType,
  textOnlyType,
  topHeroType,

  /* Objects */
  postSettings,
  aboutInfoCard,
  accordionItem,
  accreditationItem,
  accreditationSettings,
  blockContentMaxi,
  blockContentMedi,
  blockContentMini,
  blockContentPlus,
  blockContentExcerpt,
  cardFooter,
  comparisonBox,
  comparisonItem,
  contentBlock,
  ctaButton,
  ctaMessage,
  fileWithMeta,
  featureCard,
  featureItem,
  formInput,
  formCheckboxOption,
  formHubSpot,
  stepperItem,
  imageIcon,
  imageNoMeta,
  imageWithMeta,
  productCard,
  solutionCard,
  solutionItem,
  teamMember,
  textBlock,
  textCard,
  linkField,
  cmmTtlDescSettings,
  cmmLySettings,
  cmmBgSettings,

  /* APPEARANCE */
  siteHeader,
  siteFooter,
  menuType,
  menuItemType,
  menuChildItemType,
  menuChildChildType,
  aboveMenuItemType,

  /* SETTINGS */
  generalSettings,
  readingSettings,
  blogSettings,

  seoSettings,
  trackingSettings,
  googleTracking,
  hubspotTracking,
]
