import BlogPostHeader from 'components/BlogPost/BlogPostHeader';
import PostBody from 'components/BlogPost/BlogPostBody';
import PostHeader from 'components/BlogPost/PostHeader';
import PostPageHead from 'components/BlogPost/PostPageHead';
import type { Post, Settings } from 'lib/sanity.queries';
import Head from 'next/head';
import { notFound } from 'next/navigation';

export interface PostPageProps {
  preview?: boolean;
  loading?: boolean;
  post: Post;
  settings: Settings;
}

export default function PostPage(props: PostPageProps) {
  const { preview, loading, post, settings } = props;
  const { title } = settings || {};
  const categories = post.categories || [];

  const slug = post?.slug;

  if (!slug && !preview) {
    notFound();
  }

  return (
    <>
      <Head>
        <title>
          {post.title} | Graeme Elliott - Product Manager / QA Engineer
        </title>
        <PostPageHead settings={settings} post={post} key={post.slug} />
      </Head>
      <div className="post-container">
        <BlogPostHeader title={title} level={2} />
        <>
          <article>
            <PostHeader
              title={post.title}
              mainImage={post.mainImage}
              publishedAt={post.publishedAt}
              author={post.author}
              categories={categories}
            />
            <PostBody content={post.body} />
          </article>
        </>
      </div>
    </>
  );
}
