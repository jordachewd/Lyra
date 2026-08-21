import AboutInfo from '@/components/sections/AboutInfo'
import Accordion from '@/components/sections/Accordions'
import Accreditation from '@/components/sections/Accreditations'
import BlogOverview from '@/components/sections/BlogOverview'
import Comparison from '@/components/sections/Comparison'
import ContentBlocks from '@/components/sections/ContentBlocks'
import CtaBanner from '@/components/sections/CtaBanner'
import Form from '@/components/sections/Form'
import Hero from '@/components/sections/Hero'
import KeyFeatures from '@/components/sections/KeyFeatures'
import MapSection from '@/components/sections/Map'
import Products from '@/components/sections/Products'
import Solutions from '@/components/sections/Solutions'
import Stepper from '@/components/sections/Stepper'
import Table from '@/components/sections/Table'
import TeamSection from '@/components/sections/Team'
import TextImage from '@/components/sections/TextImage'
import TextOnly from '@/components/sections/TextOnly'

export const sectionRegistry = {
  aboutInfo: AboutInfo,
  accordion: Accordion,
  accreditation: Accreditation,
  blogSection: BlogOverview,
  comparison: Comparison,
  contentBlocks: ContentBlocks,
  ctaBanner: CtaBanner,
  form: Form,
  hero: Hero,
  keyFeatures: KeyFeatures,
  mapSection: MapSection,
  products: Products,
  solutions: Solutions,
  stepper: Stepper,
  table: Table,
  teamOverview: TeamSection,
  textImage: TextImage,
  text: TextOnly,
} as const

export type SectionKind = keyof typeof sectionRegistry
