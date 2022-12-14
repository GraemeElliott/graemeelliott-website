import sanityClient from '../../client';
import imageUrlBuilder from '@sanity/image-url';
import './blog.scss';
import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import Pagination from '../../components/partials/pagination/pagination';
import SearchBar from '../../components/partials/search-bar/search-bar';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

let PageSize = 9;

export default function Blog() {
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"] | order(publishedAt desc) {
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
                },
                "category": categories[]->title,
            }`
      )
      .then((data) => setAllPosts(data))
      .then(
        (document.title = `Blog | Graeme Elliott - Product Manager / QA Engineer`)
      )
      .catch(console.error);
  }, []);

  const currentPosts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return allPosts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, allPosts]);

  return (
    <div className="page-container">
      <div className="blog-header">
        <p className="blog-header-title">Blog</p>
      </div>
      {/* <div>
        <SearchBar placeholder="Search for a post..." data={allPosts} />
      </div> */}
      <div className="category-tags">
        <Link to={'/blog/web-development'} key={'web-development'}>
          Web Development
        </Link>
        <Link to={'/blog/product-management'} key={'product-management'}>
          Product Management
        </Link>
        <Link to={'/blog/data-analysis'} key={'data-analysis'}>
          Data Analysis
        </Link>
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
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={allPosts.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
