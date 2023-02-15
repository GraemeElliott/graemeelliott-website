import ThemeButton from './ThemeButton';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar({ theme, setTheme }) {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className={`navbar-container ${theme}`}>
      <div className="navbar-title"></div>
      <div className="navbar-links-container">
        <Link
          href="/"
          className={[`navbar-link`, currentRoute === '/' ? `active` : ``].join(
            ' '
          )}
        >
          Home
        </Link>
        <Link
          href="/portfolio"
          className={[
            `navbar-link`,
            currentRoute === '/portfolio' ? `active` : ``,
          ].join(' ')}
        >
          Portfolio
        </Link>
        <Link
          href="/blog"
          className={[
            `navbar-link`,
            currentRoute === '/blog' ? `active` : ``,
          ].join(' ')}
        >
          Blog
        </Link>
        <ThemeButton theme={theme} setTheme={setTheme} />
      </div>
    </div>
  );
}
