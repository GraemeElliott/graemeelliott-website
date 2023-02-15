import type { Post, Settings } from 'lib/sanity.queries';
import BlogCards from './BlogCards';
import { useEffect, useState, useMemo } from 'react';
import { client } from 'lib/sanity.client';
import { groq } from 'next-sanity';
import Link from 'next/link';
import Head from 'next/head';

export interface BlogPageProps {
  preview?: boolean;
  loading?: boolean;
  posts: Post[];
  settings: Settings;
  token: string | null;
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

export default function BlogPage(props: BlogPageProps) {
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

  return (
    <>
      <Head>
        <title>Blog | Graeme Elliott - Product Manager / QA Engineer</title>
      </Head>
      <div className="blog-header">
        <h1 className="blog-header-title">Blog</h1>
      </div>
      <div className="category-tags">
        <Link href={'/blog/web-development'} key={'web-development'}>
          Web Development
        </Link>
        <Link href={'/blog/product-management'} key={'product-management'}>
          Product Management
        </Link>
        <Link href={'/blog/data-analysis'} key={'data-analysis'}>
          Data Analysis
        </Link>
      </div>
      <BlogCards posts={currentPosts} settings={undefined} />
    </>
  );
}
