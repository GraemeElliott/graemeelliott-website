/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '../RichTextComponents';

export default function ProjectBody({ content }) {
  return (
    <div>
      <PortableText value={content} components={RichTextComponents} />
    </div>
  );
}
