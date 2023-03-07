import { urlForImage } from '../../lib/sanity.image';
import type { Author } from '../../lib/sanity.queries';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '../RichTextComponents';

export default function AuthorAvatar(props: Author) {
  const { name, image, title, bio, slug, githubUrl, linkedInUrl } = props;
  return (
    <>
      <hr className="solid"></hr>
      <div className="post-author-block-container">
        <Image
          src={urlForImage(image).url()}
          className="post-author-block-img"
          width={100}
          height={110}
          alt=""
        />
        <div className="post-author-block-details">
          <div className="post-author-block-details-top">
            <p className="post-author-block-name">{name}</p>
            <ul className="post-author-block-sm">
              <li className="post-author-block-sm-item" key={githubUrl}>
                <a target="_blank" rel="noreferrer" href={githubUrl}>
                  <FontAwesomeIcon icon={faGithub} className="fa-lg" />
                </a>
              </li>
              <li className="post-author-block-sm-item" key={linkedInUrl}>
                <a target="_blank" rel="noreferrer" href={linkedInUrl}>
                  <FontAwesomeIcon icon={faLinkedin} className="fa-lg" />
                </a>
              </li>
            </ul>
          </div>
          <div className="post-author-block-title">{title}</div>
          <div className="post-author-block-bio">
            <PortableText value={bio} components={RichTextComponents} />
          </div>
        </div>
      </div>
      <hr className="solid"></hr>
    </>
  );
}
