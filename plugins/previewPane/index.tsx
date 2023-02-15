// This plugin is responsible for adding a “Preview” tab to the document pane
// You can add any React component to `S.view.component` and it will be rendered in the pane
// and have access to content in the form in real-time.
// It's part of the Studio's “Structure Builder API” and is documented here:
// https://www.sanity.io/docs/structure-builder-reference

import { DefaultDocumentNodeResolver } from 'sanity/desk';
import authorType from '../../schemas/author';
import postType from '../../schemas/post';
import projectType from '../../schemas/project';

import AuthorAvatarPreviewPane from './AuthorAvatarPreviewPane';
import PostPreviewPane from './PostPreviewPane';
import ProjectPreviewPane from './ProjectPreviewPane';

export const previewDocumentNode = ({
  apiVersion,
  previewSecretId,
}: {
  apiVersion: string;
  previewSecretId: `${string}.${string}`;
}): DefaultDocumentNodeResolver => {
  return (S, { schemaType }) => {
    switch (schemaType) {
      case authorType.name:
        return S.document().views([
          S.view.form(),
          S.view
            .component(({ document }) => (
              <AuthorAvatarPreviewPane
                name={document.displayed.name as any}
                image={document.displayed.image as any}
              />
            ))
            .title('Preview'),
        ]);

      case postType.name:
        return S.document().views([
          S.view.form(),
          S.view
            .component(({ document }) => (
              <PostPreviewPane
                slug={document.displayed.slug?.current}
                apiVersion={apiVersion}
                previewSecretId={previewSecretId}
              />
            ))
            .title('Preview'),
        ]);

      case projectType.name:
        return S.document().views([
          S.view.form(),
          S.view
            .component(({ document }) => (
              <ProjectPreviewPane
                slug={document.displayed.slug?.current}
                apiVersion={apiVersion}
                previewSecretId={previewSecretId}
              />
            ))
            .title('Preview'),
        ]);

      default:
        return null;
    }
  };
};
