import type { Project } from 'lib/sanity.queries';
import ProjectBody from './ProjectBody';

export default function ProjectDetailsHeader(
  props: Pick<
    Project,
    | 'title'
    | 'mainImage'
    | 'publishedAt'
    | 'author'
    | 'slug'
    | 'categories'
    | 'build'
  >
) {
  const { title, mainImage, publishedAt, author, slug, categories, build } =
    props;
  return (
    <>
      <div className="project-page-header">
        <p className="project-page-category">{categories}</p>
        <p className="project-page-title">{title}</p>
        <ProjectBody content={build} />
      </div>
    </>
  );
}
