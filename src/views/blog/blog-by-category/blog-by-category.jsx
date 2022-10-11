import sanityClient from '../../../client';
import imageUrlBuilder from '@sanity/image-url';
import '../blog.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import Pagination from '../../../components/partials/pagination/pagination';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function BlogByCategory() {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  slug,
                  description
                }
            }`,
        { keyword: selectedCategory }
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, [selectedCategory]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="page-container">
      <div className="blog-header">
        <p className="blog-header-title">
          {selectedCategory.replace(/-/g, ' ')}
        </p>
      </div>
      <div className="blog-posts-grid-container">
        {currentPosts &&
          currentPosts.map((post, index) => (
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
      <div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={allPosts.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
