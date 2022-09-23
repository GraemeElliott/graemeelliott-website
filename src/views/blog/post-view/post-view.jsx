import sanityClient from '../../../client';
import './post-view.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

const serializers = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <SyntaxHighlighter
          className={`language-${props.node.language}`}
          style={vs2015}
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
        `*[slug.current == $slug] {
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
      "authorImage": author->image
      }`,
        { slug }
      )
      .then((data) => setPost(data[0]));
  }, [slug]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <h2>{post.title}</h2>
        <div>
          <img src={urlFor(post.authorImage).url()} alt="author img" />
          <h4>{post.name}</h4>
        </div>
      </div>
      <img src={urlFor(post.mainImage).url()} alt="" />
      <div>
        <BlockContent
          blocks={post.body}
          projectId={sanityClient.clientConfig.projectId}
          serializers={serializers}
          dataset={sanityClient.clientConfig.dataset}
        />
      </div>
    </div>
  );
}
