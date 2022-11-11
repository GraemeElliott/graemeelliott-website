import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './views/homepage/homepage.jsx';
import Blog from './views/blog/blog';
import BlogPostView from './views/blog/post-view/post-view';
import Header from './components/partials/header/header';
import Footer from './components/partials/footer/footer';
import BlogByCategory from './views/blog/blog-by-category/blog-by-category';
import ScrollToTop from './components/partials/scroll-to-top/scroll-to-top';
import GA4React, { useGA4React } from 'ga-4-react';

const ga4react = new GA4React('G-856S4BKHJ3');

function App() {
  const ga = useGA4React();
  return async () => {
    await ga4react.initialize();
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
    </BrowserRouter>;
  };
}

export default App;
