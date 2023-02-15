import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api';
import {
  type Post,
  type Project,
  type Settings,
  indexQuery,
  blogByCategoryQuery,
  indexProjectQuery,
  postQuery,
  postBySlugQuery,
  postSlugsQuery,
  projectQuery,
  projectSlugsQuery,
  projectBySlugQuery,
  settingsQuery,
} from 'lib/sanity.queries';
import { createClient } from 'next-sanity';

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export async function getSettings(): Promise<Settings> {
  if (client) {
    return (await client.fetch(settingsQuery)) || {};
  }
  return {};
}

export async function getAllPosts(): Promise<Post[]> {
  if (client) {
    return (await client.fetch(indexQuery)) || [];
  }
  return [];
}

export async function getAllPostsByCategory(category: string): Promise<Post[]> {
  if (client) {
    return (await client.fetch(blogByCategoryQuery, { slug: category })) || [];
  }
  return [];
}

export async function getAllProjects(): Promise<Post[]> {
  if (client) {
    return (await client.fetch(indexProjectQuery)) || [];
  }
  return [];
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  if (client) {
    const slugs = (await client.fetch<string[]>(postSlugsQuery)) || [];
    return slugs.map((slug) => ({ slug }));
  }
  return [];
}

export async function getAllProjectSlugs(): Promise<Pick<Project, 'slug'>[]> {
  if (client) {
    const slugs = (await client.fetch<string[]>(projectSlugsQuery)) || [];
    return slugs.map((slug) => ({ slug }));
  }
  return [];
}

export async function getPostBySlug(slug: string): Promise<Post> {
  if (client) {
    return (await client.fetch(postBySlugQuery, { slug })) || ({} as any);
  }
  return {} as any;
}

export async function getProjectBySlug(slug: string): Promise<Post> {
  if (client) {
    return (await client.fetch(projectBySlugQuery, { slug })) || ({} as any);
  }
  return {} as any;
}

export async function getPost(
  slug: string,
  token?: string | null
): Promise<{ post: Post }> {
  if (projectId) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
    });
    return await client.fetch(postQuery, { slug });
  }
  return { post: null };
}

export async function getProject(
  slug: string,
  token?: string | null
): Promise<{ project: Project }> {
  if (projectId) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      token: token || undefined,
    });
    return await client.fetch(projectQuery, { slug });
  }
  return { project: null };
}
