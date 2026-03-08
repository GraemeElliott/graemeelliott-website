import useSWR from 'swr';
import PortfolioPage from 'components/Portfolio/PortfolioPage';
import { client } from 'lib/sanity.client';
import { indexProjectQuery, type Project } from 'lib/sanity.queries';

export default function Portfolio() {
  const { data: projects = [], isLoading } = useSWR(indexProjectQuery, (q) => client.fetch<Project[]>(q));

  return <PortfolioPage loading={isLoading} projects={projects} settings={undefined} />;
}
