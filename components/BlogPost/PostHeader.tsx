import type { Post } from 'lib/sanity.queries';
import Moment from 'moment';
import Link from 'next/link';

export default function PostHeader(
  props: Pick<
    Post,
    'title' | 'mainImage' | 'publishedAt' | 'author' | 'slug' | 'categories'
  >
) {
  const { title, mainImage, publishedAt, author, slug, categories } = props;
  return (
    <>
      <h1 className="post-title">{title}</h1>
      <ul className="post-meta">
        <li className="post-meta-item">{author.name}</li>
        <li className="post-meta-item">
          {Moment(publishedAt).format('DD MMMM YYYY')}
        </li>
        {categories.map((category) => (
          <Link
            className="post-meta-item post-meta-item-category"
            href={'/blog/' + category.slug.current}
            key={slug}
          >
            {category.title}{' '}
          </Link>
        ))}
      </ul>
    </>
  );
}
