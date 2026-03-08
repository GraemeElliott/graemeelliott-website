import useSWR from 'swr';
import ProjectPage from 'components/Project/ProjectPage';
import { client, getAllProjectSlugs } from 'lib/sanity.client';
import { projectBySlugQuery, type Project } from 'lib/sanity.queries';

export async function getStaticPaths() {
  const slugs = await getAllProjectSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return { props: { slug: params.slug } };
}

export default function ProjectRoute({ slug }: { slug: string }) {
  const { data: project } = useSWR(
    slug ? [projectBySlugQuery, slug] : null,
    ([query, s]) => client.fetch<Project>(query, { slug: s })
  );

  if (!project) return <div>Loading...</div>;

  return <ProjectPage project={project} settings={undefined} />;
}
