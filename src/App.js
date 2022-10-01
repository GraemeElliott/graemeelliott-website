import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Homepage from './views/homepage/homepage.jsx';
import Blog from './views/blog/blog';
import BlogPostView from './views/blog/post-view/post-view';
import Header from './components/partials/header/header';
import Footer from './components/partials/footer/footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="site-container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostView />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
