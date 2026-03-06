import { ImageResponse } from '@vercel/og';
import { apiVersion, dataset, projectId } from 'lib/sanity.api';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from 'next-sanity';

import { height, OpenGraphImage, width } from 'components/OpenGraphImage';
import { Settings, settingsQuery } from 'lib/sanity.queries';

export default async function og(req: NextApiRequest, res: NextApiResponse) {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = req.headers.host;
  const font = fetch(`${protocol}://${host}/Inter-Bold.woff`).then(
    (r) => r.arrayBuffer()
  );

  let title = req.query.title as string | undefined;
  if (!title) {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    });
    const settings = (await client.fetch<Settings>(settingsQuery)) || {};
    title = settings?.ogImage?.title;
  }

  const imageResponse = new ImageResponse(<OpenGraphImage title={title} />, {
    width,
    height,
    fonts: [
      {
        name: 'Inter',
        data: await font,
        style: 'normal',
        weight: 700,
      },
    ],
  });

  const buffer = await imageResponse.arrayBuffer();
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.send(Buffer.from(buffer));
}
