import PostBody from 'components/BlogPost/BlogPostBody';
import PostHeader from 'components/BlogPost/PostHeader';
import PostPageHead from 'components/BlogPost/PostPageHead';
import type { Post, Settings } from 'lib/sanity.queries';
import Head from 'next/head';
import { notFound } from 'next/navigation';
import AuthorAvatar from './AuthorAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

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
        <title>{post.title} | Graeme Elliott - Product Owner</title>
        <PostPageHead settings={settings} post={post} key={post.slug} />
      </Head>
      <div className="post-container">
        <Link href={'/blog/'}>
          <FontAwesomeIcon icon={faArrowLeft} className="fa-lg" />
          <span className="back-to-blog">BACK TO BLOG</span>
        </Link>
        <article>
          <PostHeader
            title={post.title}
            publishedAt={post.publishedAt}
            author={post.author}
            categories={categories}
          />
          <PostBody content={post.body} />
          {post.author && (
            <AuthorAvatar
              name={post.author.name}
              image={post.author.image}
              title={post.author.title}
              bio={post.author.bio}
              githubUrl={post.author.githubUrl}
              linkedInUrl={post.author.linkedInUrl}
            />
          )}
        </article>
      </div>
    </>
  );
}
