import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api';
import {
  postSlugsQuery,
  projectSlugsQuery,
  categorySlugsQuery,
} from 'lib/sanity.queries';
import { createClient } from 'next-sanity';

export const client = createClient({ projectId, dataset, apiVersion, useCdn });

export async function getAllPostSlugs(): Promise<string[]> {
  return (await client.fetch<string[]>(postSlugsQuery)) || [];
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return (await client.fetch<string[]>(projectSlugsQuery)) || [];
}

export async function getAllCategorySlugs(): Promise<string[]> {
  return (await client.fetch<string[]>(categorySlugsQuery)) || [];
}
