import useSWR from 'swr';
import BlogPostPage from 'components/BlogPost/BlogPostPage';
import { client, getAllPostSlugs } from 'lib/sanity.client';
import { postBySlugQuery, type Post } from 'lib/sanity.queries';

export async function getStaticPaths() {
  const slugs = await getAllPostSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return { props: { slug: params.slug } };
}

export default function BlogPostRoute({ slug }: { slug: string }) {
  const { data: post } = useSWR(
    slug ? [postBySlugQuery, slug] : null,
    ([query, s]) => client.fetch<Post>(query, { slug: s })
  );

  if (!post) return <div>Loading...</div>;

  return <BlogPostPage post={post} settings={undefined} />;
}
