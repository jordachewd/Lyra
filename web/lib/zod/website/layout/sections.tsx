import {z} from 'zod'
import {AboutSectionSchema} from '../../sections/content/about-info'
import {AccreditationSectionSchema} from '../../sections/content/accreditations'
import {BlogOverviewSectionSchema} from '../../sections/content/blog-overview'
import {CtaBannerSchema} from '../../sections/content/cta-banner'
import {HeroSectionSchema} from '../../sections/content/hero'
import {KeyFeaturesSectionSchema} from '../../sections/content/key-features'
import {ProductsSectionSchema} from '../../sections/content/products'
import {SolutionsSectionSchema} from '../../sections/content/solutions'
import {TeamOverviewSectionSchema} from '../../sections/content/team-overview'
import {TextImageSectionSchema} from '../../sections/content/text-image'
import {UnknownSectionSchema} from '../../sections/content/unknown'
import {StepperSectionSchema} from '../../sections/content/stepper'
import {FormSectionSchema} from '../../sections/content/form'
import {ComparisonSectionSchema} from '../../sections/content/comparison'
import {TableSectionSchema} from '../../sections/content/table'
import {TextOnlySectionSchema} from '../../sections/content/text-only'
import {MapSectionSchema} from '../../sections/content/map'
import {AccordionSectionSchema} from '../../sections/content/accordion'
import {ContentBlocksSectionSchema} from '../../sections/content/content-blocks'

export const PageSectionSchema = z.discriminatedUnion('kind', [
  HeroSectionSchema,
  AboutSectionSchema,
  AccordionSectionSchema,
  AccreditationSectionSchema,
  ComparisonSectionSchema,
  ContentBlocksSectionSchema,
  CtaBannerSchema,
  BlogOverviewSectionSchema,
  FormSectionSchema,
  KeyFeaturesSectionSchema,
  MapSectionSchema,
  ProductsSectionSchema,
  SolutionsSectionSchema,
  StepperSectionSchema,
  TableSectionSchema,
  TeamOverviewSectionSchema,
  TextImageSectionSchema,
  TextOnlySectionSchema,
  UnknownSectionSchema,
])

export type Section = z.infer<typeof PageSectionSchema>
