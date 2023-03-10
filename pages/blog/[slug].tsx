import { groq } from 'next-sanity';
import { client } from 'lib/sanity.client';
import { useRouter } from 'next/router';
import { Post, Settings } from 'lib/sanity.queries';
import { useState, useEffect, useMemo } from 'react';
import { PreviewSuspense } from '@sanity/preview-kit';
import { lazy } from 'react';
import BlogCards from 'components/Blog/BlogCards';
import Pagination from 'components/Blog/Pagination/Pagination';
import { GetServerSideProps } from 'next';

import { getAllPostsByCategory, getSettings } from 'lib/sanity.client';

const PreviewBlogPage = lazy(
  () => import('../../components/Blog/PreviewBlogPage')
);

interface PageProps {
  posts: Post[];
  settings: Settings;
  preview: boolean;
  token: string | null;
}

interface Query {
  [key: string]: string;
}

interface PreviewData {
  token?: string;
}

export const revalidate = 30; //revalidate this page every 30 seconds

const query = groq`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    titleColour,
    slug,
    postCardType,
    author->,
    publishedAt,
    description,
    mainImage{
        asset -> {
            _id,
            url
        }
    },
    categories[]->,
    "category": categories[]->title,
  }`;

export default function BlogByCategoryPage(props: PageProps) {
  const { preview, posts, settings, token } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setPosts] = useState([]);
  let PageSize = 9;
  const router = useRouter();
  const path = router.asPath;
  const selectedCategory = path.split('/')[2];

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setPosts(data);
    }
    fetchData();
  }, []);

  if (!posts) {
    return <div>Loading...</div>;
  }

  const currentPosts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, posts]);

  if (!posts.length) {
    // added check for empty posts
    return <div>Loading...</div>;
  }

  if (preview) {
    return (
      <PreviewSuspense
        fallback={
          <BlogCards loading preview posts={posts} settings={settings} />
        }
      >
        <PreviewBlogPage token={token} />
      </PreviewSuspense>
    );
  }

  return (
    <>
      <div className="blog-page-container">
        <div className="blog-header">
          <h1 className="blog-header-title">
            {selectedCategory
              .replace(/\b\w/g, (c) => c.toUpperCase())
              .replace(/-/g, ' ')}{' '}
          </h1>
        </div>
        <BlogCards posts={currentPosts} settings={undefined} />
        <div className="pagination-container">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={posts.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {}, params = {} } = ctx;

  const token = previewData.token;

  const category = params.slug;

  const [settings, posts = []] = await Promise.all([
    getSettings(),
    getAllPostsByCategory(category),
  ]);

  if (!posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  };
};
