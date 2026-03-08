import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './lib/sanity.api';
import { settingsPlugin, settingsStructure } from './plugins/settings';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
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
    types: schemaTypes,
  },
  plugins: [
    deskTool({
      structure: settingsStructure(settingsType),
    }),
    settingsPlugin({ type: settingsType.name }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    colorInput(),
  ],
});
