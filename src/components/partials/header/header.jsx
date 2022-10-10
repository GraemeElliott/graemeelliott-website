import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useScrollListener from '../../../hooks/useScrollListener';
import { useEffect, useState } from 'react';

export default function Header() {
  const [navClassList, setNavClassList] = useState([]);
  const scroll = useScrollListener();

  // update classList of nav on scroll
  useEffect(() => {
    const _classList = [];

    if (scroll.y < 150 && scroll.y - scroll.lastY < 0)
      _classList.push('navbar navbar--top');

    if (scroll.y > 10 && scroll.y - scroll.lastY > 0)
      _classList.push('navbar navbar--hidden');

    if (scroll.lastY > scroll.y && scroll.y > 0)
      _classList.push('navbar navbar--scroll-up');

    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);

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
        <Nav className="me-auto mx-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/portfolio">Portfolio</Nav.Link>
          <Nav.Link href="/blog">Blog</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
