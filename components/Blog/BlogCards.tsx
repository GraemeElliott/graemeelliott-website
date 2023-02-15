import { Post, Settings } from 'lib/sanity.queries';
import { urlForImage } from 'lib/sanity.image';
import Moment from 'moment';
import Link from 'next/link';

type Props = {
  posts: Post[];
  preview?: boolean;
  loading?: boolean;
  settings: Settings;
};

export default function BlogCards({ posts }: Props) {
  return (
    <div className="blog-posts-grid-container">
      {posts.map((post) => (
        <div
          className={
            `blog-post-card blog-post-card blog-post-card-` + post.postCardType
          }
          key={post.slug}
        >
          <img
            className="background-image"
            alt=""
            src={urlForImage(post.mainImage).url()}
          />
          <div className="blog-post-card-content">
            <div
              className={
                'blog-post-card-meta blog-post-card-title-' + post.titleColour
              }
            >
              <span className="blog-post-card-author">{post.author.name}</span>
              <span className="blog-post-card-date">
                {Moment(post.publishedAt).format('DD MMMM YYYY')}
              </span>
            </div>

            <Link href={`/blog/post/${post.slug}`} key={post.slug} className="">
              <h4
                className={
                  'blog-post-card-title blog-post-card-title-' +
                  post.titleColour
                }
              >
                {post.title}
              </h4>
            </Link>

            {post.postCardType === 'text' ? (
              <div className="blog-post-card-body">
                <p className="blog-post-card-description">{post.description}</p>
                <Link
                  href={`/blog/post/${post.slug}`}
                  key={post.slug}
                  className="blog-post-card-read-more"
                >
                  Read More
                </Link>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
