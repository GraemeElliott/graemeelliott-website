import ProjectPage, { ProjectPageProps } from './ProjectPage';
import { usePreview } from 'lib/sanity.preview';
import { type Project, projectQuery } from 'lib/sanity.queries';

export default function PreviewPostPage({
  token,
  project,
  settings,
}: {
  token: null | string;
} & ProjectPageProps) {
  const { project: projectPreview }: { project: Project } = usePreview(
    token,
    projectQuery,
    {
      slug: project.slug,
    }
  ) || { project: null };

  return <ProjectPage preview project={projectPreview} settings={settings} />;
}
