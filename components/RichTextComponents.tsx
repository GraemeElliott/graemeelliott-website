import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '../lib/sanity.image';
import Refractor from 'react-refractor';

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="post-body-image">
          <Image
            className="auto-width"
            src={urlForImage(value).url()}
            alt="Blog Post Image"
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: '60%', height: 'auto' }}
          />
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <Refractor
          // In this example, `props` is the value of a `code` field
          language={value.language}
          value={value.code}
        />
      );
    },
  },
  list: {
    bullet: ({ children }: any) => {
      return <ul className="mt xl">{children}</ul>;
    },
    number: ({ children }: any) => {
      return <ol className="mt xl">{children}</ol>;
    },
  },
  block: {
    normal: ({ children }: any) => {
      return <p>{children}</p>;
    },
    h1: ({ children }: any) => {
      return <h1>{children}</h1>;
    },
    h2: ({ children }: any) => {
      return <h2>{children}</h2>;
    },
    h3: ({ children }: any) => {
      return <h3>{children}</h3>;
    },
    h4: ({ children }: any) => {
      return <h4>{children}</h4>;
    },
    blockquote: ({ children }: any) => {
      return <blockquote>{children}</blockquote>;
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/')
        ? 'nonreferrer noopener'
        : undefined;
      return (
        <Link href={value.href} rel={rel}>
          {children}
        </Link>
      );
    },
    color: ({ children, value }: any) => {
      return <span style={{ color: value.hex }}>{children}</span>;
    },
  },
};
