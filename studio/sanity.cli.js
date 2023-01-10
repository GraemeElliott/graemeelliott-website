import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '<your-project-id>', // replace value with your own
    dataset: '<your-dataset-name>', // replace value with your own
  },
});
