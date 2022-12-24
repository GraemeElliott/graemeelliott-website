import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './views/homepage/homepage.jsx';
import Blog from './views/blog/blog';
import BlogPostView from './views/blog/post-view/post-view';
import Header from './components/partials/header/header';
import Footer from './components/partials/footer/footer';
import BlogByCategory from './views/blog/blog-by-category/blog-by-category';
import ScrollToTop from './components/partials/scroll-to-top/scroll-to-top';
import NotFound404 from './views/404-page/404-page';

function App() {
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
          <Route path="*" element={<NotFound404 />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
