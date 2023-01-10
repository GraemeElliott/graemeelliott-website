import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { codeInput } from '@sanity/code-input';
import { visionTool } from '@sanity/vision';
import schemas from './schemas/schema';

export default defineConfig({
  name: 'graemeelliott-website',
  title: 'Graeme Elliott Website',
  projectId: 'lg88tis5',
  dataset: 'production',
  plugins: [deskTool(), visionTool(), codeInput()],
  tools: (prev) => {
    // 👇 Uses environment variables set by Vite in development mode
    if (import.meta.env.DEV) {
      return prev;
    }
    return prev.filter((tool) => tool.name !== 'vision');
  },
  schema: {
    types: schemas,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => templateItem.templateId != 'settings'
        );
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (schemaType === 'settings') {
        return prev.filter(
          ({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action)
        );
      }
      return prev;
    },
  },
});
