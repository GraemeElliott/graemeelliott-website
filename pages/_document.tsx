import { Head, Html, Main, NextScript } from 'next/document';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default function Document() {
  const publicPath = publicRuntimeConfig.publicPath || '';
  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${publicPath}/favicon/apple-touch-icon.png`}
        />
        <link
          rel="preconnect"
          type="image/png"
          sizes="32x32"
          href={`${publicPath}/favicon/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${publicPath}/favicon/favicon-16x16.png`}
        />
      </Head>
      <Main />
      <NextScript />
    </Html>
  );
}
