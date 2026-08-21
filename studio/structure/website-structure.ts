import type {StructureBuilder, ListItemBuilder} from 'sanity/structure'
import {BarChartIcon} from '@sanity/icons/BarChart'
import {BoltIcon} from '@sanity/icons/Bolt'
import {BookIcon} from '@sanity/icons/Book'
import {CogIcon} from '@sanity/icons/Cog'
import {ComposeSparklesIcon} from '@sanity/icons/ComposeSparkles'
import {ControlsIcon} from '@sanity/icons/Controls'
import {DocumentVideoIcon} from '@sanity/icons/DocumentVideo'
import {DocumentsIcon} from '@sanity/icons/Documents'
import {RocketIcon} from '@sanity/icons/Rocket'
import {StackIcon} from '@sanity/icons/Stack'
import {SunIcon} from '@sanity/icons/Sun'
import {PublishIcon} from '@sanity/icons/Publish'
import {UnpublishIcon} from '@sanity/icons/Unpublish'
import {STUDIO_API_VERSION} from '../consts/config/studio-api-version'
import {websiteSectionTypes} from '../consts/website-section-types'

const isArchived = `_type == $type && defined(archivedAt)`
const isActive = `_type == $type && !defined(archivedAt)`

export const websiteStructure = (S: StructureBuilder): ListItemBuilder =>
  S.listItem()
    .title('Website (Marketing)')
    .icon(RocketIcon)
    .child(
      S.list()
        .title('Website Content')
        .items([
          S.listItem()
            .title('Pages')
            .icon(DocumentsIcon)
            .child(
              S.list()
                .title('Pages')
                .items([
                  S.listItem()
                    .title('Published')
                    .icon(PublishIcon)
                    .child(
                      S.documentList()
                        .title('Published Pages')
                        .schemaType('page')
                        .filter(isActive)
                        .params({type: 'page'})
                        .apiVersion(STUDIO_API_VERSION),
                    ),
                  S.listItem()
                    .title('Archived')
                    .icon(UnpublishIcon)
                    .child(
                      S.documentList()
                        .title('Archived Pages')
                        .filter(isArchived)
                        .params({type: 'page'})
                        .apiVersion(STUDIO_API_VERSION),
                    ),
                ]),
            ),

          S.documentTypeListItem('post')
            .title('Blog')
            .icon(ComposeSparklesIcon)
            .child(
              S.list()
                .title('Blog')
                .items([
                  S.listItem()
                    .title('Posts')
                    .icon(DocumentsIcon)
                    .child(
                      S.list()
                        .title('Posts')
                        .items([
                          S.listItem()
                            .title('Published')
                            .icon(PublishIcon)
                            .child(
                              S.documentList()
                                .title('Published Posts')
                                .schemaType('post')
                                .filter(isActive)
                                .params({type: 'post'})
                                .apiVersion(STUDIO_API_VERSION),
                            ),
                          S.listItem()
                            .title('Archived')
                            .icon(UnpublishIcon)
                            .child(
                              S.documentList()
                                .title('Archived Posts')
                                .filter(isArchived)
                                .params({type: 'post'})
                                .apiVersion(STUDIO_API_VERSION),
                            ),
                        ]),
                    ),

                  S.documentTypeListItem('category').title('Categories'),
                  S.documentTypeListItem('tag').title('Tags'),
                  S.documentTypeListItem('author').title('Authors'),
                ]),
            ),

          S.documentTypeListItem('webinarPage')
            .title('Webinars')
            .icon(DocumentVideoIcon)
            .child(
              S.list()
                .title('Webinars')
                .items([
                  S.listItem()
                    .title('Pages')
                    .icon(DocumentsIcon)
                    .child(
                      S.list()
                        .title('Pages')
                        .items([
                          S.listItem()
                            .title('Published')
                            .icon(PublishIcon)
                            .child(
                              S.documentList()
                                .title('Published Webinars')
                                .schemaType('webinarPage')
                                .filter(isActive)
                                .params({type: 'webinarPage'})
                                .apiVersion(STUDIO_API_VERSION),
                            ),
                          S.listItem()
                            .title('Archived')
                            .icon(UnpublishIcon)
                            .child(
                              S.documentList()
                                .title('Archived Webinars')
                                .filter(isArchived)
                                .params({type: 'webinarPage'})
                                .apiVersion(STUDIO_API_VERSION),
                            ),
                        ]),
                    ),
                  S.documentTypeListItem('webinarCat').title('Categories'),
                ]),
            ),

          S.listItem()
            .title('Sections (Common)')
            .icon(StackIcon)
            .child(
              S.list()
                .title('Sections')
                .items([
                  S.listItem()
                    .title('All (Used)')
                    .child(
                      S.documentList()
                        .title('Used Sections')
                        .filter('_type in $types && count(*[references(^._id)]) > 0')
                        .params({types: websiteSectionTypes})
                        .apiVersion(STUDIO_API_VERSION),
                    ),
                  S.listItem()
                    .title('Unused')
                    .child(
                      S.documentList()
                        .title('Unused Sections (Safe to Delete)')
                        .filter('_type in $types && count(*[references(^._id)]) == 0')
                        .params({types: websiteSectionTypes})
                        .apiVersion(STUDIO_API_VERSION),
                    ),
                  S.divider(),
                  S.documentTypeListItem('aboutInfoType').title('About Info'),
                  S.documentTypeListItem('accordionType').title('Accordion'),
                  S.documentTypeListItem('accreditationType').title('Accreditations'),
                  S.documentTypeListItem('blogSection').title('Blog Overview'),
                  S.documentTypeListItem('comparisonType').title('Comparison'),
                  S.documentTypeListItem('contentBlocks').title('Content Blocks'),
                  S.documentTypeListItem('ctaBannerType').title('CTA Banner'),
                  S.documentTypeListItem('formType').title('Form'),
                  S.documentTypeListItem('topHeroType').title('Hero'),
                  S.documentTypeListItem('keyFeaturesType').title('Features'),
                  S.documentTypeListItem('mapType').title('Map (Google)'),
                  S.documentTypeListItem('productsType').title('Products'),
                  S.documentTypeListItem('solutionsType').title('Solutions'),
                  S.documentTypeListItem('stepperType').title('Stepper'),
                  S.documentTypeListItem('tableType').title('Table'),
                  S.documentTypeListItem('teamOverviewType').title('Team'),
                  S.documentTypeListItem('textCardsType').title('Text Cards (DEPRECATED)'),
                  S.documentTypeListItem('textBlocksType').title('Text Blocks (DEPRECATED)'),
                  S.documentTypeListItem('textImageType').title('Text & Image'),
                  S.documentTypeListItem('textOnlyType').title('Text Only'),
                ]),
            ),
          S.divider(),
          S.listItem()
            .title('Appearance')
            .icon(SunIcon)
            .child(
              S.list()
                .title('Appearance')
                .items([
                  S.listItem().title('Header').id('siteHeader').child(
                    S.document().title('Header').schemaType('siteHeader').documentId('siteHeader'), // singleton
                  ),

                  S.listItem().title('Footer').id('siteFooter').child(
                    S.document().title('Footer').schemaType('siteFooter').documentId('siteFooter'), // singleton
                  ),

                  S.documentTypeListItem('menu').title('Menus'),
                ]),
            ),
          S.listItem()
            .title('Settings')
            .icon(ControlsIcon)
            .child(
              S.list()
                .title('Settings')
                .id('websiteSettings')
                .items([
                  S.listItem()
                    .title('General')
                    .icon(CogIcon)
                    .id('generalSettings')
                    .child(
                      S.document()
                        .title('General')
                        .schemaType('generalSettings')
                        .documentId('generalSettings'),
                    ), // singleton
                  S.listItem()
                    .title('Reading')
                    .icon(BookIcon)
                    .id('readingSettings')
                    .child(
                      S.document()
                        .title('Reading')
                        .schemaType('readingSettings')
                        .documentId('readingSettings'),
                    ), // singleton
                  S.listItem()
                    .title('SEO & Metadata')
                    .icon(BoltIcon)
                    .id('seoSettings')
                    .child(
                      S.document()
                        .title('SEO & Metadata')
                        .schemaType('seoSettings')
                        .documentId('seoSettings'),
                    ), // singleton

                  S.listItem()
                    .title('Tracking & Analytics')
                    .icon(BarChartIcon)
                    .id('trackingSettings')
                    .child(
                      S.document()
                        .title('Tracking & Analytics')
                        .schemaType('trackingSettings')
                        .documentId('trackingSettings'),
                    ), // singleton
                ]),
            ),
        ]),
    )
