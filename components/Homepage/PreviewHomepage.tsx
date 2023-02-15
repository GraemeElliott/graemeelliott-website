import HomePage from 'components/Homepage/Homepage';
import { usePreview } from 'lib/sanity.preview';
import {
  type Post,
  type Project,
  type Settings,
  indexQuery,
  projectQuery,
  settingsQuery,
} from 'lib/sanity.queries';

export default function PreviewHomepage({ token }: { token: null | string }) {
  const posts: Post[] = usePreview(token, indexQuery) || [];
  const projects: Project[] = usePreview(token, projectQuery) || [];
  const settings: Settings = usePreview(token, settingsQuery) || {};

  return (
    <HomePage
      preview
      posts={posts}
      settings={settings}
      token={''}
      projects={projects}
    />
  );
}
