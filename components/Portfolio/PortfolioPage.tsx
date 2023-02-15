import ProjectCards from './ProjectCards';
import type { Project, Settings } from 'lib/sanity.queries';
import Head from 'next/head';

type Props = {
  projects: Project[];
  preview?: boolean;
  loading?: boolean;
  settings?: Settings;
};

export default function PortfolioPage({ projects }: Props) {
  return (
    <>
      <Head>
        <title>
          Portfolio | Graeme Elliott - Product Manager / QA Engineer
        </title>
      </Head>
      <div className="portfolio-page-container">
        <div className="portfolio-page-header">
          <h1>Portfolio</h1>
        </div>
        <ProjectCards projects={projects} settings={undefined} />
      </div>
    </>
  );
}
