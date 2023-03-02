import Image from 'next/image';
import type { Post, Project, Settings } from 'lib/sanity.queries';
import img from '../../assets/profile-image.jpg';
import AboutMe from './AboutMe';
import BlogCards from 'components/Blog/BlogCards';
import { useEffect, useState, useMemo } from 'react';
import { client } from 'lib/sanity.client';
import { groq } from 'next-sanity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import ProjectCards from 'components/Portfolio/ProjectCards';
import Head from 'next/head';
export interface IndexPageProps {
  preview?: boolean;
  loading?: boolean;
  posts: Post[];
  projects: Project[];
  settings: Settings;
  token: string | null;
}
const query = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  titleColour,
  slug,
  postCardType,
  author->,
  publishedAt,
  description,
  mainImage{
      asset -> {
          _id,
          url
      }
  },
  categories[]->,
  "category": categories[]->title,
}`;
export default function Homepage(props: IndexPageProps) {
  const { posts, projects, settings, preview, token } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setPosts] = useState([]);
  let PageSize = 6;
  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(query);
      setPosts(data);
    }
    fetchData();
  }, []);
  if (!posts) {
    return <div>Loading...</div>;
  }
  const currentPosts = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, posts]);
  if (!posts.length) {
    // added check for empty posts
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>Graeme Elliott - Product Manager / QA Engineer</title>
      </Head>
      <div className="homepage-container">
        <section className="homepage-hero homepage-section">
          <div className="hero-details">
            <h1 className="hero-name">Graeme Elliott</h1>
            <h2 className="hero-title">
              Product Manager / QA Engineer / Subject Matter Expert
            </h2>
            <div className="social-media-icons">
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.github.com/graemeelliott"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="fa-lg fa-github"
                  />
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/in/graeme-elliott/"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="fa-lg fa-linkedin"
                  />
                </a>
              </li>
            </div>
          </div>
          <div className="homepage-photo-container">
            <Image src={img} alt="Graeme Elliott" className="profile-image" />
          </div>
        </section>
        <section className="homepage-projects-container homepage-section">
          <h1 className="homepage-projects-header homepage-header">
            {' '}
            Projects{' '}
          </h1>
          <ProjectCards projects={projects} settings={settings} />
        </section>
        <AboutMe />
        <section className="latest-blog-posts-container homepage-section">
          <h1 className="latest-blog-posts-header homepage-header">
            {' '}
            Latest Blog Posts{' '}
          </h1>
          <BlogCards posts={currentPosts} settings={undefined} />
        </section>
      </div>
    </>
  );
}
