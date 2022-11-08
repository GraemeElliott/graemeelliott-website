import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useScrollListener from '../../../hooks/useScrollListener';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [navClassList, setNavClassList] = useState([]);
  const scroll = useScrollListener();

  // update classList of nav on scroll
  useEffect(() => {
    const _classList = [];

    if (scroll.y < 10 && scroll.y - scroll.lastY < 0)
      _classList.push('navbar navbar--top');

    if (scroll.y > 0 && scroll.y - scroll.lastY > 0)
      _classList.push('navbar navbar--hidden');

    if (scroll.y > 100) _classList.push('navbar navbar--scroll-up bg-black');

    if (location.pathname === '/') _classList.push('navbar-dark');

    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY, location.pathname]);

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg=""
      variant="light"
      sticky="top"
      className={navClassList.join(' ')}
    >
      <Container>
        <Nav className="me-auto mx-auto" activeKey={location.pathname}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/portfolio">Portfolio</Nav.Link>
          <Nav.Link href="/blog">Blog</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
