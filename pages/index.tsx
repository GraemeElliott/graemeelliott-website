import { PreviewSuspense } from '@sanity/preview-kit';
import Homepage from '../components/Homepage/Homepage';
import { getAllPosts, getAllProjects, getSettings } from 'lib/sanity.client';
import { Post, Project, Settings } from 'lib/sanity.queries';
import { GetServerSideProps } from 'next';
import { lazy } from 'react';

export const revalidate = 30; //revalidate this page every 30 seconds

const PreviewHomepage = lazy(
  () => import('components/Homepage/PreviewHomepage')
);

interface PageProps {
  posts: Post[];
  projects: Project[];
  settings: Settings;
  preview: boolean;
  token: string | null;
}

interface Query {
  [key: string]: string;
}

interface PreviewData {
  token?: string;
}

export default function Index(props: PageProps) {
  const { posts, projects, settings, preview, token } = props;

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <Homepage
            loading
            preview
            posts={posts}
            projects={projects}
            settings={settings}
            token={''}
          />
        }
      >
        <PreviewHomepage token={token} />
      </PreviewSuspense>
    );
  }

  return (
    <Homepage
      posts={posts}
      projects={projects}
      settings={settings}
      token={''}
    />
  );
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx;

  const [settings, posts = [], projects = []] = await Promise.all([
    getSettings(),
    getAllPosts(),
    getAllProjects(),
  ]);

  return {
    props: {
      posts,
      projects,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  };
};
