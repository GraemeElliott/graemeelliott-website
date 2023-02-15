import { urlForImage } from '../lib/sanity.image';
import type { Author } from '../lib/sanity.queries';
import Image from 'next/image';

export default function AuthorAvatar(props: Author) {
  const { name, image } = props;
  return (
    <div className="flex items-center">
      <div className="relative mr-4 h-12 w-12">
        <Image
          src={urlForImage(image).height(96).width(96).fit('crop').url()}
          className="rounded-full"
          height={96}
          width={96}
          // @TODO add alternative text to avatar image schema
          alt=""
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
