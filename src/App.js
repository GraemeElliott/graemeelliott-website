import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './views/homepage/homepage.jsx';
import Blog from './views/blog/blog';
import BlogPostView from './views/blog/post-view/post-view';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPostView />} />
    </Routes>
  );
}

export default App;
