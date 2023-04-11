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
  return (
    <div className="project-cards-container">
      {projects &&
        projects.map((project) => (
          <Link href={`/portfolio/${project.slug}`} key={project.slug}>
            <div className="project-card" key={project.slug}>
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
          </Link>
        ))}
    </div>
  );
}
