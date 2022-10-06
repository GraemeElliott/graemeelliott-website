import sanityClient from '../../../client';
import imageUrlBuilder from '@sanity/image-url';
import '../blog.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function BlogByCategory() {
  const [allPosts, setAllPosts] = useState(null);

  let selectedCategory = window.location.pathname.split('/')[2];

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post" && $keyword in categories[]->slug.current] | order(publishedAt desc) {
                _id,
                title,
                titleColour,
                slug,
                postCardType,
                "authorName": author->name,
                publishedAt,
                body,
                description,
                mainImage{
                    asset -> {
                        _id,
                        url
                    }
                },
                categories [] -> {
                  title,
                  slug
                }
            }`,
        { keyword: selectedCategory }
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  });

  return (
    <div className="container blog-posts-grid-container">
      {allPosts &&
        allPosts.map((post, index) => (
          <div
            className={'blog-post-card blog-post-card-' + post.postCardType}
            key={post.slug.current}
          >
            <img
              className="background-image"
              alt=""
              src={urlFor(post.mainImage).url()}
            />
            <div className="blog-post-card-content">
              <div
                className={
                  'blog-post-card-meta blog-post-card-title-' + post.titleColour
                }
              >
                <span className="blog-post-card-author">{post.authorName}</span>
                <span className="blog-post-card-date">
                  {Moment(post.publishedAt).format('DD MMMM YYYY')}
                </span>
              </div>
              <Link
                to={'/blog/post/' + post.slug.current}
                key={post.slug.current}
              >
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
                  <p className="blog-post-card-description">
                    {post.description}
                  </p>
                  <Link
                    to={'/blog/post/' + post.slug.current}
                    key={post.slug.current}
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
