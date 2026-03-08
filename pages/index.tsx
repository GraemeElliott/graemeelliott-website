import useSWR from 'swr';
import Homepage from '../components/Homepage/Homepage';
import { client } from 'lib/sanity.client';
import { indexQuery, indexProjectQuery, settingsQuery } from 'lib/sanity.queries';

export default function Index() {
  const { data: posts = [], isLoading: postsLoading } = useSWR(indexQuery, (q) => client.fetch(q));
  const { data: projects = [], isLoading: projectsLoading } = useSWR(indexProjectQuery, (q) => client.fetch(q));
  const { data: settings = {} } = useSWR(settingsQuery, (q) => client.fetch(q));

  return (
    <Homepage
      loading={postsLoading || projectsLoading}
      posts={posts}
      projects={projects}
      settings={settings}
      token={''}
    />
  );
}
