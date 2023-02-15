import ProjectHeader from './ProjectHeader';
import ProjectBody from './ProjectBody';
import ProjectDetailsHeader from './ProjectDetailsHeader';
import ProjectPageHead from './ProjectPageHead';
import ProjectTitle from './ProjectTitle';
import type { Project, Settings } from 'lib/sanity.queries';
import Head from 'next/head';
import { notFound } from 'next/navigation';
import { urlForImage } from 'lib/sanity.image';
import Link from 'next/link';

export interface ProjectPageProps {
  preview?: boolean;
  loading?: boolean;
  project: Project;
  settings: Settings;
}

export default function ProjectPage(props: ProjectPageProps) {
  const { preview, loading, project, settings } = props;
  const { title } = settings || {};

  const slug = project?.slug;

  if (!slug && !preview) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>
          {project.title} | Graeme Elliott - Product Manager / QA Engineer
        </title>
        <ProjectPageHead settings={settings} project={project} />
      </Head>

      <ProjectHeader title={title} level={2} />
      {preview && !project ? (
        <ProjectTitle>Loading…</ProjectTitle>
      ) : (
        <>
          <ProjectDetailsHeader
            title={project.title}
            mainImage={project.mainImage}
            publishedAt={project.publishedAt}
            author={project.author}
            categories={project.categories}
            build={project.build}
          />

          <div className="project-details-section">
            <div className="project-main-image-container">
              <img
                className="project-main-image"
                alt=""
                src={urlForImage(project.mainImage).url()}
              />
            </div>

            <div className="project-body">
              <ProjectBody content={project.body} />
              <Link
                href={`${project.url}`}
                className="project-url"
                target="_blank"
              >
                {project.url}
              </Link>
            </div>
          </div>
          <div className="project-images-container">
            <img
              className="project-page-image"
              alt=""
              src={urlForImage(project.image1).url()}
            />
            <img
              className="project-page-image"
              alt=""
              src={urlForImage(project.image2).url()}
            />
            <img
              className="project-page-image"
              alt=""
              src={urlForImage(project.image3).url()}
            />
            <img
              className="project-page-image"
              alt=""
              src={urlForImage(project.image4).url()}
            />
          </div>
        </>
      )}
    </>
  );
}
