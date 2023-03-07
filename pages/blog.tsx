import { groq } from 'next-sanity';
import { client } from 'lib/sanity.client';
import { useState, useEffect, useMemo } from 'react';
import BlogPage from 'components/Blog/BlogPage';
import Pagination from 'components/Blog/Pagination/Pagination';
import { PreviewSuspense } from '@sanity/preview-kit';
import { getAllPosts, getSettings } from 'lib/sanity.client';
import { Post, Settings } from 'lib/sanity.queries';
import { GetStaticProps } from 'next';
import { lazy } from 'react';

export const revalidate = 30; //revalidate this page every 30 seconds

const PreviewBlogPage = lazy(
  () => import('../components/Blog/PreviewBlogPage')
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

export const getStaticProps: GetStaticProps<
  PageProps,
  Query,
  PreviewData
> = async (ctx) => {
  const { preview = false, previewData = {} } = ctx;

  const [settings, posts = []] = await Promise.all([
    getSettings(),
    getAllPosts(),
  ]);

  return {
    props: {
      posts,
      settings,
      preview,
      token: previewData.token ?? null,
    },
  };
};

export default function Blog(props: PageProps) {
  const { posts, settings, preview, token } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setPosts] = useState([]);
  let PageSize = 9;

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
          <BlogPage preview posts={posts} settings={settings} token={''} />
        }
      >
        <PreviewBlogPage token={token} />
      </PreviewSuspense>
    );
  }

  return (
    <div className="blog-page-container">
      <BlogPage
        posts={currentPosts}
        settings={undefined}
        preview={false}
        token={''}
      />
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
  );
}
