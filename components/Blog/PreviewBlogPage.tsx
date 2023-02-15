import BlogCards from 'components/Blog/BlogCards';
import { usePreview } from 'lib/sanity.preview';
import {
  type Post,
  type Settings,
  indexQuery,
  settingsQuery,
} from 'lib/sanity.queries';

export default function PreviewBlogPage({ token }: { token: null | string }) {
  const posts: Post[] = usePreview(token, indexQuery) || [];
  const settings: Settings = usePreview(token, settingsQuery) || {};

  return (
    <div>
      <BlogCards preview posts={posts} settings={settings} />
    </div>
  );
}
