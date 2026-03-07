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

import crypto from 'crypto';
import { apiVersion, dataset, projectId } from 'lib/sanity.api';
import { type SanityClient, createClient, groq } from 'next-sanity';
import { revalidatePath } from 'next/cache';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = { api: { bodyParser: false } };

function getRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk.toString(); });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function isValidSanitySignature(
  rawBody: string,
  signature: string | undefined,
  secret: string
): boolean {
  if (!signature) return false;
  const tPart = signature.split(',').find((p) => p.startsWith('t='));
  const v1Part = signature.split(',').find((p) => p.startsWith('v1='));
  if (!tPart || !v1Part) return false;
  const timestamp = tPart.slice(2);
  const v1 = v1Part.slice(3);
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`, 'utf8')
    .digest('hex');
  try {
    const v1Buf = Buffer.from(v1, 'hex');
    const expectedBuf = Buffer.from(expectedSig, 'hex');
    if (v1Buf.length !== expectedBuf.length) return false;
    return crypto.timingSafeEqual(v1Buf, expectedBuf);
  } catch {
    return false;
  }
}

export default async function revalidate(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['sanity-webhook-signature'] as string | undefined;
    const secret = process.env.SANITY_REVALIDATE_SECRET || '';

    if (!isValidSanitySignature(rawBody, signature, secret)) {
      const message = 'Invalid signature';
      console.log(message);
      res.status(401).send(message);
      return;
    }

    const body = JSON.parse(rawBody) as { _type: string; _id: string; publishedAt?: string; slug?: unknown };
    if (typeof body?._id !== 'string' || !body._id) {
      const invalidId = 'Invalid _id';
      console.error(invalidId, { body });
      res.status(400).send(invalidId);
      return;
    }

    const staleRoutes = await queryStaleRoutes(body);
    staleRoutes.forEach((route) => revalidatePath(route));

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`;
    console.log(updatedRoutes);
    res.status(200).send(updatedRoutes);
  } catch (err: any) {
    console.error(err);
    res.status(500).send(err.message);
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
  await client.fetch(
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

  return ['/', ...slugs.map((slug: string) => `/blog/post/${slug}`)];
}
