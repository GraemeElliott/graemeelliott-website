import sanityClient from '../../../client';
import './post-view.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

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
            categories
          },
          "nextPost": *[_type == "post" && ^.publishedAt < publishedAt]|order(publishedAt asc)[0]{
            title,
            slug
          },
          "previousPost": *[_type == "post" && ^.publishedAt > publishedAt]|order(publishedAt desc)[0]{
            title,
            slug
          }
      }`,
        { slug }
      )
      .then((data) => setPost(data[0]));
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="blog-post-container">
      <h1 className="post-title">{post.currentPost.title}</h1>
      <ul className="post-meta">
        <li className="post-meta-item">{post.currentPost.authorName}</li>
        <li className="post-meta-item">
          {Moment(post.currentPost.publishedAt).format('DD MMMM YYYY')}
        </li>
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
                <FontAwesomeIcon icon={faGithub} className="fa-lg" />
              </li>
              <li className="post-author-block-sm-item">
                <FontAwesomeIcon icon={faLinkedin} className="fa-lg" />
              </li>
              <li className="post-author-block-sm-item">
                <FontAwesomeIcon icon={faInstagram} className="fa-lg" />
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

      <div>
        {!post.nextPost ? (
          <div className="previous-post">{post.previousPost.title} </div>
        ) : (
          <div></div>
        )}
      </div>

      {!post.previousPost ? (
        <div className="next-post">{post.nextPost.title}</div>
      ) : (
        <div></div>
      )}

      {post.nextPost && post.previousPost ? (
        <div>
          <div className="previous-post">{post.previousPost.title} </div>
          <div className="next-post">{post.nextPost.title}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
