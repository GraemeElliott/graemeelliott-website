import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schema/schema';

export default defineConfig({
  basePath: '/studio',
  name: 'graemeelliott-website',
  title: 'Graeme Elliott Website',
  projectId: 'lg88tis5',
  dataset: 'production',
  plugins: [deskTool(), visionTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
});
