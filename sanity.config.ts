/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision';
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from './lib/sanity.api';
import { previewDocumentNode } from './plugins/previewPane/index';
import { productionUrl } from './plugins/productionUrl/index';
import { settingsPlugin, settingsStructure } from './plugins/settings';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import postType from './schemas/post';
import projectType from './schemas/project';
import settingsType from './schemas/settings/index';
import { schemaTypes } from './schemas/index';
import { codeInput } from '@sanity/code-input';
import { colorInput } from '@sanity/color-input';

const title = process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE;

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: schemaTypes,
  },
  plugins: [
    deskTool({
      structure: settingsStructure(settingsType),
      // `defaultDocumentNode` is responsible for adding a “Preview” tab to the document pane
      defaultDocumentNode: previewDocumentNode({ apiVersion, previewSecretId }),
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    settingsPlugin({ type: settingsType.name }),
    // Add the "Open preview" action
    productionUrl({
      apiVersion,
      previewSecretId,
      types: [postType.name, projectType.name, settingsType.name],
    }),
    // Add an image asset source for Unsplash
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    colorInput(),
  ],
});
