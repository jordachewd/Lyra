import groq from 'groq'
import {ABOUT_INFO_SECTION} from './sections/about-info.groq'
import {ACCREDITATION_SECTION} from './sections/accreditations.groq'
import {BLOG_SECTION} from './sections/blog-overview.groq'
import {COMPARISON_SECTION} from './sections/comparison.groq'
import {CTA_BANNER_SECTION} from './sections/cta-banner.groq'
import {FORM_SECTION} from './sections/form.groq'
import {HERO_SECTION} from './sections/hero.groq'
import {KEY_FEATURES_SECTION} from './sections/key-features.groq'
import {PRODUCTS_SECTION} from './sections/products.groq'
import {SOLUTIONS_SECTION} from './sections/solutions.groq'
import {STEPPER_SECTION} from './sections/stepper.groq'
import {TABLE_SECTION} from './sections/table.groq'
import {TEAM_SECTION} from './sections/team.groq'
import {TEXT_IMAGE_SECTION} from './sections/text-image.groq'
import {TEXT_ONLY_SECTION} from './sections/text-only.groq'
import {MAP_SECTION} from './sections/map.groq'
import {ACCORDION_SECTION} from './sections/accordion.groq'
import {CONTENT_BLOCKS_SECTION} from './sections/content-blocks.groq'

export const SECTIONS_PROJECTION = groq`coalesce(
  sections[]->{
    _id,
    _type,		 
    ${ABOUT_INFO_SECTION},
    ${ACCORDION_SECTION},
    ${ACCREDITATION_SECTION},
    ${BLOG_SECTION},
    ${COMPARISON_SECTION},
    ${CONTENT_BLOCKS_SECTION},
    ${CTA_BANNER_SECTION},    
    ${FORM_SECTION},  
    ${HERO_SECTION}, 
    ${KEY_FEATURES_SECTION},
    ${MAP_SECTION},
    ${PRODUCTS_SECTION},
    ${SOLUTIONS_SECTION},
		${STEPPER_SECTION},
    ${TABLE_SECTION},
    ${TEAM_SECTION},
    ${TEXT_IMAGE_SECTION},    
    ${TEXT_ONLY_SECTION}       
  }, [])`
