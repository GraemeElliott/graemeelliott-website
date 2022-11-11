import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA from 'react-ga';
import Homepage from './views/homepage/homepage.jsx';
import Blog from './views/blog/blog';
import BlogPostView from './views/blog/post-view/post-view';
import Header from './components/partials/header/header';
import Footer from './components/partials/footer/footer';
import BlogByCategory from './views/blog/blog-by-category/blog-by-category';
import ScrollToTop from './components/partials/scroll-to-top/scroll-to-top';

const TRACKING_ID = 'G-856S4BKHJ3';

ReactGA.initialize(TRACKING_ID);

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <div className="site-container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:category" element={<BlogByCategory />} />
          <Route path="/blog/post/:slug" element={<BlogPostView />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
