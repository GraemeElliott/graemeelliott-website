/**
 * This code is responsible for revalidating the cache when a post or author is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Trigger on: "Create", "Update", and "Delete"
 * 5. Filter: _type == "post" || _type == "author" || _type == "settings"
 * 6. Projection: Leave empty
 * 7. HTTP method: POST
 * 8. API version: v2021-03-25
 * 9. Include drafts: No
 * 10. HTTP Headers: Leave empty
 * 11. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random one if you haven't)
 * 12. Save the cofiguration
 * 13. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 14. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

import { apiVersion, dataset, projectId } from 'lib/sanity.api';
import { type SanityClient, createClient, groq } from 'next-sanity';
import { parseBody } from 'next-sanity/webhook';
import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';

export const config = { runtime: 'edge' };

export default async function revalidate(req: NextRequest): Promise<Response> {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );
    if (isValidSignature === false) {
      const message = 'Invalid signature';
      console.log(message);
      return new Response(message, { status: 401 });
    }

    if (typeof body?._id !== 'string' || !body._id) {
      const invalidId = 'Invalid _id';
      console.error(invalidId, { body });
      return new Response(invalidId, { status: 400 });
    }

    const staleRoutes = await queryStaleRoutes(body as any);
    staleRoutes.forEach((route) => revalidatePath(route));

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`;
    console.log(updatedRoutes);
    return new Response(updatedRoutes, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}

type StaleRoute = '/' | `/blog/post/${string}`;

async function queryStaleRoutes(
  body: { _type: string; _id: string; publishedAt?: string; slug?: unknown }
): Promise<StaleRoute[]> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  });

  // Handle possible deletions
  if (body._type === 'post') {
    const exists = await client.fetch(groq`*[_id == $id][0]`, { id: body._id });
    if (!exists) {
      let staleRoutes: StaleRoute[] = ['/'];
      if ((body.slug as any)?.current) {
        staleRoutes.push(`/blog/post/${(body.slug as any).current}`);
      }
      // Assume that the post document was deleted. Query the datetime used to sort "More stories" to determine if the post was in the list.
      // If there's less than 3 posts with a newer date, we need to revalidate everything
      return staleRoutes;
    }
  }

  switch (body._type) {
    case 'author':
      return await queryStaleAuthorRoutes(client, body._id);
    case 'post':
      return await queryStalePostRoutes(client, body._id);
    case 'settings':
      return await queryAllRoutes(client);
    default:
      throw new TypeError(`Unknown type: ${body._type}`);
  }
}

async function _queryAllRoutes(client: SanityClient): Promise<string[]> {
  return await client.fetch(groq`*[_type == "post"].slug.current`);
}

async function queryAllRoutes(client: SanityClient): Promise<StaleRoute[]> {
  const slugs = await _queryAllRoutes(client);

  return ['/', ...slugs.map((slug) => `/blog/post/${slug}` as StaleRoute)];
}

async function queryStaleAuthorRoutes(
  client: SanityClient,
  id: string
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "author" && _id == $id] {
    "slug": *[_type == "post" && references(^._id)].slug.current
  }["slug"][]`,
    { id }
  );

  return [];
}

async function queryStalePostRoutes(
  client: SanityClient,
  id: string
): Promise<StaleRoute[]> {
  let slugs = await client.fetch(
    groq`*[_type == "post" && _id == $id].slug.current`,
    { id }
  );

  return ['/', ...slugs.map((slug) => `/blog/post/${slug}`)];
}
