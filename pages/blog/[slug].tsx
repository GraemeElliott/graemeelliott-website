import useSWR from 'swr';
import { useState, useMemo } from 'react';
import Head from 'next/head';
import BlogCards from 'components/Blog/BlogCards';
import Pagination from 'components/Blog/Pagination/Pagination';
import { client, getAllCategorySlugs } from 'lib/sanity.client';
import { blogByCategoryQuery, type Post } from 'lib/sanity.queries';

const PAGE_SIZE = 9;

export async function getStaticPaths() {
  const slugs = await getAllCategorySlugs();
  return {
    paths: slugs.filter(Boolean).map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return { props: { slug: params.slug } };
}

export default function BlogByCategoryPage({ slug }: { slug: string }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: posts = [], isLoading } = useSWR(
    slug ? [blogByCategoryQuery, slug] : null,
    ([query, s]) => client.fetch<Post[]>(query, { slug: s })
  );

  const selectedCategory = slug
    ?.replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/-/g, ' ');

  const currentPosts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    return posts.slice(firstPageIndex, firstPageIndex + PAGE_SIZE);
  }, [currentPage, posts]);

  if (!isLoading && !posts.length) {
    return (
      <div className="no-posts-text">
        <p>No published posts</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Blog | Graeme Elliott - Product Owner</title>
      </Head>
      <div className="blog-page-container">
        <div className="blog-header">
          <h1 className="blog-header-title">{selectedCategory}</h1>
        </div>
        <BlogCards posts={currentPosts} settings={undefined} />
        <div className="pagination-container">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={posts.length}
            pageSize={PAGE_SIZE}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}
