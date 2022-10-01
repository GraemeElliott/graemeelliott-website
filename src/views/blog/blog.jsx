import sanityClient from '../../client';
import imageUrlBuilder from '@sanity/image-url';
import './blog.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Blog() {
  const [allPosts, setAllPosts] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] {
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
            }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Blog Page</h2>
      <div className="blog-posts-grid-container">
        {allPosts &&
          allPosts.map((post, index) => (
            <div
              className={'blog-post-card blog-post-card-' + post.postCardType}
              key={post.slug.current}
            >
              <img
                class="background-image"
                alt=""
                src={urlFor(post.mainImage).url()}
              />
              <div className="blog-post-card-content">
                <div
                  className={
                    'blog-post-card-meta blog-post-card-title-' +
                    post.titleColour
                  }
                >
                  <span className="blog-post-card-author">
                    {post.authorName}
                  </span>
                  <span className="blog-post-card-date">
                    {Moment(post.publishedAt).format('DD MMMM YYYY')}
                  </span>
                </div>
                <h4
                  className={
                    'blog-post-card-title blog-post-card-title-' +
                    post.titleColour
                  }
                >
                  {post.title}
                </h4>
                {post.postCardType === 'card-type-text' ? (
                  <div className="blog-post-card-body">
                    <p className="blog-post-card-description">
                      {post.description}
                    </p>
                    <p className="blog-post-card-read">Read More</p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
