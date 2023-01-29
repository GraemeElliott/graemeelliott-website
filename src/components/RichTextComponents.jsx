import Refractor from 'react-refractor';
import urlFor from '../lib/urlFor';

export const RichTextComponents = {
  types: {
    code: ({ value }) => {
      return (
        <Refractor
          // In this example, `props` is the value of a `code` field
          language={value.language}
          value={value.code}
        />
      );
    },
    image: ({ value }) => {
      return (
        <figure>
          <img
            src={urlFor().image(value).url()}
            alt={value.alt || ' '}
            loading="lazy"
          />
        </figure>
      );
    },
  },
  marks: {
    color: ({ value, children }) => {
      return <span style={{ color: value.hex }}>{children}</span>;
    },
  },
};
