import ProjectBody from './ProjectBody';
import ProjectDetailsHeader from './ProjectDetailsHeader';
import ProjectPageHead from './ProjectPageHead';
import ProjectTitle from './ProjectTitle';
import SpinnerComponent from 'components/Partials/Spinner';
import { useState, useEffect } from 'react';
import type { Project, Settings } from 'lib/sanity.queries';
import Head from 'next/head';
import { notFound } from 'next/navigation';
import { urlForImage } from 'lib/sanity.image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <ProjectPageHead
        settings={settings}
        project={project}
        key={project.slug}
      />

      {preview && !project ? (
        <ProjectTitle>Loading…</ProjectTitle>
      ) : (
        <div className="project-container">
          <Link href={'/portfolio/'} className="back-button-project">
            <FontAwesomeIcon icon={faArrowLeft} className="fa-lg" />
            <span className="back-to-portfolio-text">BACK TO PORTFOLIO</span>
          </Link>

          <ProjectDetailsHeader
            title={project.title}
            mainImage={project.mainImage}
            publishedAt={project.publishedAt}
            author={project.author}
            categories={project.categories}
            build={project.build}
          />
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

          <div className="project-images-container">
            <img
              className="project-page-image"
              alt=""
              src={urlForImage(project.mainImage).url()}
            />
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
        </div>
      )}
    </>
  );
}
