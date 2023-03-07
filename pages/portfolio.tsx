import PortfolioPage from 'components/Portfolio/PortfolioPage';
import { PreviewSuspense } from '@sanity/preview-kit';
import { getAllProjects, getSettings } from 'lib/sanity.client';
import { Project, Settings } from 'lib/sanity.queries';
import { GetStaticProps } from 'next';
import { lazy } from 'react';

export const revalidate = 30; //revalidate this page every 30 seconds

const PreviewPortfolioPage = lazy(
  () => import('../components/Portfolio/PreviewPortfolioPage')
);

interface PageProps {
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

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx;

  const [settings, projects = []] = await Promise.all([
    getSettings(),
    getAllProjects(),
  ]);

  return {
    props: {
      projects,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  };
};

export default function Portfolio(props: PageProps) {
  const { projects, settings, preview, token } = props;

  if (!projects) {
    return <div>Loading...</div>;
  }

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <PortfolioPage
            loading
            preview
            projects={projects}
            settings={settings}
          />
        }
      >
        <PreviewPortfolioPage token={token} />
      </PreviewSuspense>
    );
  }

  return <PortfolioPage projects={projects} settings={undefined} />;
}
