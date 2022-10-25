import sanityClient from '../../../client';
import './post-view.scss';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const serializers = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <SyntaxHighlighter
          className={`language-${props.node.language} line-numbers`}
          style={vs2015}
          showLineNumbers={true}
        >
          {props.node.code}
        </SyntaxHighlighter>
      </pre>
    ),
  },
};

export default function BlogPostView() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'post' && slug.current == $slug] {
          "currentPost":{
            title,
            slug,
            mainImage{
              asset -> {
                _id,
                url
              }
            },
            body,
            "authorName": author->name,
            "authorImage": author->image,
            "authorTitle": author->title,
            "authorGithub": author->githubUrl,
            "authorLinkedIn": author->linkedInUrl,
            "authorInstagram": author->instagramUrl,
            "authorBio": author->bio,
            publishedAt,
            categories [] -> {
              title,
              slug
            }
          },
          "nextPost": *[_type == "post" && ^.publishedAt < publishedAt]|order(publishedAt asc)[0]{
            title,
            "slug": slug.current
          },
          "previousPost": *[_type == "post" && ^.publishedAt > publishedAt]|order(publishedAt desc)[0]{
            title,
            "slug": slug.current
          }
      }`,
        { slug }
      )
      .then((data) => setPost(data[0]));
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="blog-post-view-container">
      <div className="blog-post-container">
        <h1 className="post-title">{post.currentPost.title}</h1>
        <ul className="post-meta">
          <li className="post-meta-item">{post.currentPost.authorName}</li>
          <li className="post-meta-item">
            {Moment(post.currentPost.publishedAt).format('DD MMMM YYYY')}
          </li>
          {post.currentPost.categories.map((category) => (
            <Link
              className="post-meta-item post-meta-item-category"
              to={'/blog/' + category.slug.current}
              key={category.slug.current}
            >
              {category.title}{' '}
            </Link>
          ))}
        </ul>
        <div className="post-content">
          <BlockContent
            blocks={post.currentPost.body}
            projectId={sanityClient.clientConfig.projectId}
            serializers={serializers}
            dataset={sanityClient.clientConfig.dataset}
          />
        </div>
        <hr className="solid"></hr>
        <div className="post-author-block-container">
          <img
            className="post-author-block-img"
            src={urlFor(post.currentPost.authorImage).url()}
            alt="author img"
          />
          <div className="post-author-block-details">
            <div className="post-author-block-details-top">
              <p className="post-author-block-name">
                {post.currentPost.authorName}
              </p>
              <ul className="post-author-block-sm">
                <li className="post-author-block-sm-item">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.github.com/graemeelliott"
                  >
                    <FontAwesomeIcon icon={faGithub} className="fa-lg" />
                  </a>
                </li>
                <li className="post-author-block-sm-item">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/graeme-elliott/"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="fa-lg" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="post-author-block-title">
              {post.currentPost.authorTitle}
            </div>
            <div className="post-author-block-bio">
              <BlockContent
                blocks={post.currentPost.authorBio}
                projectId={sanityClient.clientConfig.projectId}
                dataset={sanityClient.clientConfig.dataset}
              />
            </div>
          </div>
        </div>
        <hr className="solid"></hr>

        <div className="prev-next-post-container">
          {post.previousPost ? (
            <Link
              to={'/blog/post/' + post.previousPost.slug}
              key={post.previousPost.slug}
              className="previous-post"
            >
              <span className="previous-post-title prev-next-post-text">
                <FontAwesomeIcon icon={faArrowLeft} className="fa-md" />{' '}
                {post.previousPost.title}
              </span>
            </Link>
          ) : (
            <></>
          )}
          {post.nextPost ? (
            <>
              <span className="previous-post"></span>
              <Link
                to={'/blog/post/' + post.nextPost.slug}
                key={post.nextPost.slug}
                className="next-post"
              >
                <span className="next-post-title prev-next-post-text">
                  {post.nextPost.title}{' '}
                  <FontAwesomeIcon icon={faArrowRight} className="fa-md" />
                </span>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
