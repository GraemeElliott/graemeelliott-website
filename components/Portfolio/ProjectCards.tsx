import type { Project, Settings } from 'lib/sanity.queries';
import Link from 'next/link';
import { urlForImage } from 'lib/sanity.image';

type Props = {
  projects: Project[];
  preview?: boolean;
  loading?: boolean;
  settings: Settings;
};

export default function ProjectCards({ projects }: Props) {
  const handleOnClick = (slug: string) => {
    // Your logic for handling the click event, e.g., navigate to '/portfolio/${slug}'
    window.location.href = `/portfolio/${slug}`;
  };

  return (
    <>
      <div className="project-cards-container">
        {projects &&
          projects.map((project) => (
            <div
              className="project-card"
              key={project.slug}
              onClick={() => handleOnClick(project.slug)}
            >
              <img
                className="project-card-image"
                alt=""
                src={urlForImage(project.mainImage).url()}
              />
              <span className="overlay">
                <div className="project-card-details">
                  <div className="project-card-title">{project.title}</div>
                  <div className="project-card-category">
                    {project.categories}
                  </div>
                </div>
              </span>
            </div>
          ))}
      </div>
    </>
  );
}
