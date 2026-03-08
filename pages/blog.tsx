import useSWR from 'swr';
import { useState, useMemo } from 'react';
import BlogPage from 'components/Blog/BlogPage';
import Pagination from 'components/Blog/Pagination/Pagination';
import { client } from 'lib/sanity.client';
import { indexQuery, type Post } from 'lib/sanity.queries';

const PAGE_SIZE = 9;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: posts = [], isLoading } = useSWR(indexQuery, (q) => client.fetch<Post[]>(q));

  const currentPosts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PAGE_SIZE;
    return posts.slice(firstPageIndex, firstPageIndex + PAGE_SIZE);
  }, [currentPage, posts]);

  return (
    <div className="blog-page-container">
      <BlogPage loading={isLoading} posts={currentPosts} settings={undefined} preview={false} token={''} />
      <div className="pagination-container">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={posts.length}
          pageSize={PAGE_SIZE}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
