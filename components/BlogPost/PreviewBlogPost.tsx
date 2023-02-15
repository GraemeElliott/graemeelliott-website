import PostPage, { PostPageProps } from 'components/BlogPost/BlogPostPage';
import { usePreview } from 'lib/sanity.preview';
import { type Post, postQuery } from 'lib/sanity.queries';

export default function PreviewPostPage({
  token,
  post,
  settings,
}: {
  token: null | string;
} & PostPageProps) {
  const { post: postPreview }: { post: Post } = usePreview(token, postQuery, {
    slug: post.slug,
  }) || { post: null, morePosts: [] };

  return <PostPage preview post={postPreview} settings={settings} />;
}
