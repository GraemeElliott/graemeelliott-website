import sanityClient from '../../client';
import imageUrlBuilder from '@sanity/image-url';
import './blog.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
                slug,
                postPanelSize,
                "authorName": author->name,
                "authorImage": author->image,
                mainImage{
                    asset -> {
                        _id,
                        url
                    }
                }
            }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Blog Page</h2>
      <div>
        {allPosts &&
          allPosts.map((post, index) => (
            <div>
              <Link to={'/blog/' + post.slug.current} key={post.slug.current}>
                <span key={index}>
                  <img src={urlFor(post.mainImage).url()} alt="" />
                  <span>
                    <h2>{post.title}</h2>
                  </span>
                </span>
              </Link>
              <span>
                <h2>{post.authorName}</h2>
                <img src={urlFor(post.authorImage).url()} alt="author img" />
                <h2 className={post.postPanelSize}>{post.postPanelSize}</h2>
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
