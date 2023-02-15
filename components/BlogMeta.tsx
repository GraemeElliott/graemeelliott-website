/**
 * All the shared stuff that goes into <head> on `(blog)` routes, can be be imported by `head.tsx` files in the /app dir or wrapped in a <Head> component in the /pages dir.
 */

export default function BlogMeta() {
  return (
    <>
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000" />
    </>
  );
}
