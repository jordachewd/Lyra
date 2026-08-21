import {codeInput} from '@sanity/code-input'
import {colorInput} from '@sanity/color-input'
import {table} from '@sanity/table'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {media} from 'sanity-plugin-media'
import {structureTool} from 'sanity/structure'
import {documentActions} from './actions/document.actions'
import {singletonTypes} from './consts/config/singleton-types'
import lyraDesk from './desk'
import {lyraSchema} from './schemas/lyra-index'

export default defineConfig({
  name: 'default',
  title: 'Lyra Studio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    structureTool({
      structure: lyraDesk,
    }),
    media(),
    visionTool(),
    codeInput(),
    colorInput(),
    table(),
  ],

  schema: {
    types: lyraSchema,
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: documentActions,
  },
})
