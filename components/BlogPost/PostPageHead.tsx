import { urlForImage } from 'lib/sanity.image';
import { Post, Settings } from 'lib/sanity.queries';

export interface PostPageHeadProps {
  settings: Settings;
  post: Post;
}

export default function PostPageHead({ settings, post }: PostPageHeadProps) {
  const title = settings.title;
  return (
    <>
      <title>{post.title ? `${post.title} | ${title}` : title}</title>
      {post.mainImage?.asset?._ref && (
        <meta
          property="og:image"
          content={urlForImage(post.mainImage)
            .width(1200)
            .height(627)
            .fit('crop')
            .url()}
        />
      )}
    </>
  );
}
