import sanityClient from '../client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export default function urlFor(source) {
  return builder.image(source);
}
