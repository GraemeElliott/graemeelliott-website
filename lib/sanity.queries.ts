import { groq } from 'next-sanity';

const postFields = groq`
  _id,
  title,
  titleColour,
  postCardType,
  publishedAt,
  description,
  mainImage,
  "slug": slug.current,
  "author": author->{name, title, image, bio, githubUrl, linkedInUrl },
  "categories": categories[]->{title, slug}
`;

const postFieldsWithBody = groq`
  _id,
  title,
  titleColour,
  postCardType,
  publishedAt,
  description,
  body,
  mainImage,
  "slug": slug.current,
  "author": author->{name, title, image, bio, githubUrl, linkedInUrl },
  "categories": categories[]->{title, slug}
`;

const projectFields = groq`
  _id,
  title,
  publishedAt,
  description,
  mainImage,
  image1,
  image2,
  image3,
  image4,
  build,
  body,
  url,
  "slug": slug.current,
  "author": author->{name, title, image, bio, githubUrl, linkedInUrl },
  "categories": categories[]->title
`;

export const settingsQuery = groq`*[_type == "settings"][0]`;

export const indexQuery = groq`
*[_type == "post"] | order(publishedAt desc, _updatedAt desc) {
  ${postFields}
}`;

export const blogByCategoryQuery = groq`
*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc, _updatedAt desc) {
  ${postFields}
}`;

export const indexProjectQuery = groq`
*[_type == "project"] | order(publishedAt desc, _updatedAt desc) {
  ${projectFields}
}`;

export const postQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFieldsWithBody}
  },
}`;

export const projectQuery = groq`
{
  "project": *[_type == "project" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${projectFields}
  },
}`;

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const projectSlugsQuery = groq`
*[_type == "project" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;

export const projectBySlugQuery = groq`
*[_type == "project" && slug.current == $slug][0] {
  ${projectFields}
}
`;

export interface Author {
  name?: string;
  title?: string;
  image?: any;
  bio?: any;
  slug?: string;
  githubUrl?: string;
  linkedInUrl?: string;
}

export interface Post {
  _id: string;
  title?: string;
  publishedAt?: string;
  categories?: Category[];
  mainImage?: any;
  titleColour?: string;
  postCardType?: string;
  nextPost?: Post;
  previousPost?: Post;
  description?: string;
  author?: Author;
  slug?: string;
  body?: any;
}

export interface Project {
  _id: string;
  title?: string;
  publishedAt?: string;
  categories?: any;
  mainImage?: any;
  image1?: any;
  image2?: any;
  image3?: any;
  image4?: any;
  description?: string;
  author?: Author;
  slug?: string;
  body?: any;
  build?: any;
  url?: string;
}

export interface Settings {
  title?: string;
  description?: any[];
  ogImage?: {
    title?: string;
  };
}

export interface Category {
  slug: {
    current: string;
  };
  desciption?: string;
  title?: string;
}

export interface Code {
  _type: 'code';
}

interface Slug {
  _type: 'slug';
  current: string;
}

export interface Reference {
  _ref: string;
  _type: 'reference';
}
