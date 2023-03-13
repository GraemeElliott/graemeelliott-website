import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/main.scss';
import { useState, useEffect } from 'react';
import Container from 'components/Container';
import Navbar from 'components/Partials/Navbar';
import Footer from 'components/Partials/Footer';
import GoogleAnalytics from 'components/GoogleAnalytics';

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
    <>
      <div className={theme}>
        <Navbar theme={theme} setTheme={setTheme} />
        <Container>
          <GoogleAnalytics />
          <Component {...pageProps} theme={theme} />
        </Container>
        <Footer />
      </div>
    </>
  );
}
