import { PreviewSuspense } from '@sanity/preview-kit';
import ProjectPage from 'components/Project/ProjectPage';
import { getAllProjectSlugs, getProject, getSettings } from 'lib/sanity.client';
import { Project, Settings } from 'lib/sanity.queries';
import { GetServerSideProps } from 'next';
import { lazy } from 'react';

export const revalidate = 30; //revalidate this page every 30 seconds

const PreviewProjectPage = lazy(
  () => import('components/Project/PreviewProjectPage')
);

interface PageProps {
  project: Project;
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
  const { settings, project, preview, token } = props;

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <ProjectPage loading preview project={project} settings={settings} />
        }
      >
        <PreviewProjectPage
          token={token}
          project={project}
          settings={settings}
        />
      </PreviewSuspense>
    );
  }

  return <ProjectPage project={project} settings={settings} />;
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx;

  const token = previewData.token;

  const [settings, { project }] = await Promise.all([
    getSettings(),
    getProject(params.slug, token),
  ]);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  };
};

export const getStaticPaths = async () => {
  const slugs = await getAllProjectSlugs();

  return {
    paths: slugs?.map(({ slug }) => `/portfolio/${slug}`) || [],
    fallback: false,
  };
};
