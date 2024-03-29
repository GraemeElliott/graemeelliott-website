import { urlForImage } from 'lib/sanity.image';
import { Project, Settings } from 'lib/sanity.queries';

export interface PostPageHeadProps {
  settings: Settings;
  project: Project;
}

export default function ProjectPageHead({
  settings,
  project,
}: PostPageHeadProps) {
  const title = `${project.title} | Graeme Elliott - Product Owner`;
  return (
    <>
      <title>{title}</title>
      {project.mainImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(project.mainImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </>
  );
}
