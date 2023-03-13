import { AppProps } from 'next/app';
import '../styles/main.scss';
import { useState, useEffect } from 'react';
import Container from 'components/Container';
import Navbar from 'components/Partials/Navbar';
import Footer from 'components/Partials/Footer';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    const systemPreferredTheme = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches
      ? 'dark'
      : 'light';
    const localStorageTheme = localStorage.getItem('theme');
    setTheme(localStorageTheme || systemPreferredTheme);
  }, []);

  return (
    <div className={theme}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Container>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_TRACKING_ID}`}
        />
        <Script strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA4_TRACKING_ID}');`}
        </Script>
        <Component {...pageProps} theme={theme} />
      </Container>
      <Footer />
    </div>
  );
}
