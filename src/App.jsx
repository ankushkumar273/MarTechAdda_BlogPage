import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import BlogLanding from './pages/BlogLanding';
import BlogCategory from './pages/BlogCategory';
import SearchResults from './pages/SearchResults';
import ArticleDetail from './pages/ArticleDetail';
import AuthorProfile from './pages/AuthorProfile';
import NewsletterSubscribe from './pages/NewsletterSubscribe';
import Login from './pages/Login';
import ScrollToTop from './hooks/useScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main layout (Navbar and Footer included) */}
        <Route path="/" element={<MainLayout />}>
          {/* Root redirects to /blog */}
          <Route index element={<Navigate to="/blog" replace />} />
          <Route path="blog" element={<BlogLanding />} />
          <Route path="blog/category/:slug" element={<BlogCategory />} />
          <Route path="blog/:slug" element={<ArticleDetail />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="tags/:slug" element={<SearchResults />} />
          <Route path="author/:slug" element={<AuthorProfile />} />
          <Route path="newsletter" element={<NewsletterSubscribe />} />
        </Route>

        {/* Minimal layouts for authentication */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Login />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/blog" replace />} />
      </Routes>
    </Router>
  );
}
