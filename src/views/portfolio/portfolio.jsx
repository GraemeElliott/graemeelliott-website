import './portfolio.scss';
import { useEffect, useState, useMemo } from 'react';
import sanityClient from '../../client';
import imageUrlBuilder from '@sanity/image-url';
import Moment from 'moment';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "project"] | order(publishedAt asc) {
                _id,
                title,
                slug,
                "authorName": author->name,
                body,
                description,
                mainImage{
                    asset -> {
                        _id,
                        url
                    }
                },
                image1{
                  asset -> {
                      _id,
                      url
                  }
              },
              image2{
                asset -> {
                    _id,
                    url
                }
            },
            image3{
              asset -> {
                  _id,
                  url
              }
          },
                categories [] -> {
                  title,
                  slug
                },
                "category": categories[]->title,
            }`
      )
      .then((data) => setProjects(data))
      .then(
        (document.title = `Blog | Graeme Elliott - Product Manager / QA Engineer`)
      )
      .catch(console.error);
  }, []);

  if (!projects) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="portfolio-header">
        <p className="portfolio-header-title">Portfolio</p>
      </div>
      {/* {projects.map((project) => (
        <div>
          <div>{project.title}</div>
          <img
            className="post-author-block-img"
            src={urlFor(project.mainImage).url()}
            alt="author img"
          />
          <li className="post-meta-item">
            {Moment(project.publishedAt).format('DD MMMM YYYY')}
          </li>
        </div>
      ))} */}
    </div>
  );
}
