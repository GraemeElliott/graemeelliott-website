import { PreviewSuspense } from '@sanity/preview-kit';
import BlogPostPage from 'components/BlogPost/BlogPostPage';
import { getAllPostsSlugs, getPost, getSettings } from 'lib/sanity.client';
import { Post, Settings } from 'lib/sanity.queries';
import { GetServerSideProps } from 'next';
import { lazy } from 'react';

const PreviewBlogPost = lazy(
  () => import('components/BlogPost/PreviewBlogPost')
);

interface PageProps {
  post: Post;
  settings?: Settings;
  preview: boolean;
  token: string | null;
}

interface Query {
  [key: string]: string;
}

interface PreviewData {
  token?: string;
}

export default function BlogSlugRoute(props: PageProps) {
  const { settings, post, preview, token } = props;

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <BlogPostPage loading preview post={post} settings={settings} />
        }
      >
        <PreviewBlogPost token={token} post={post} settings={settings} />
      </PreviewSuspense>
    );
  }

  return <BlogPostPage post={post} settings={settings} />;
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx;

  const token = previewData.token;

  const [settings, { post }] = await Promise.all([
    getSettings(),
    getPost(params.slug, token),
  ]);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  };
};
