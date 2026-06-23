import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { articles } from '../data/articles';
import { authors } from '../data/authors';

// Reusable components
import SearchBar from '../components/common/SearchBar';
import CTASection from '../components/common/CTASection';
import NewsletterSection from '../components/common/NewsletterSection';
import BlogCard from '../components/article/BlogCard';
import FeaturedBlogCard from '../components/article/FeaturedBlogCard';
import CategoryCard from '../components/article/CategoryCard';
import AuthorCard from '../components/author/AuthorCard';

export default function BlogLanding() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // List of all categories
  const categories = useMemo(() => {
    return ['All', 'Marketing Tech', 'Analytics', 'Strategy', 'Retention', 'Data Science', 'Mobile', 'Privacy'];
  }, []);

  // Map category name to slug
  const categoryMap = {
    'Marketing Tech': 'marketing-tech',
    'Analytics': 'analytics',
    'Strategy': 'strategy',
    'Retention': 'retention',
    'Data Science': 'data-science',
    'Mobile': 'mobile',
    'Privacy': 'privacy'
  };

  // Handle Search Input submit (redirects to search results page)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Featured Article
  const featuredArticle = useMemo(() => {
    return articles.find(a => a.id === 'future-of-ai-marketing') || articles[0];
  }, []);

  // Get author helper
  const getAuthor = (authorId) => {
    return authors.find(auth => auth.id === authorId) || {};
  };

  // Filtered latest articles list
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Exclude featured article from the general listing
      if (article.id === featuredArticle.id) return false;

      // Filter by category
      const matchesCategory = selectedCategory === 'All' || 
        article.category === categoryMap[selectedCategory];

      // Filter by search text
      const matchesSearch = searchQuery.trim() === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, featuredArticle]);

  // Filter trending list
  const trendingArticles = useMemo(() => {
    return articles.filter(a => a.trending).sort((a, b) => a.trendRank.localeCompare(b.trendRank));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* 1. Hero & Search Section */}
      <section className="bg-gradient-to-br from-white via-white to-brand-light/30 border-b border-brand-border py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-brand-light/40 border border-brand-border px-3 py-1 rounded-full text-brand-dark text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
            <span>Data-driven insights for SaaS professionals</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-dark tracking-tight max-w-4xl mx-auto leading-tight">
            Elevate Your <span className="text-brand-blue">Marketing Edge</span>
          </h1>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto font-medium">
            Explore advanced marketing technology, deep analytics, and scaling strategies curated by senior practitioners.
          </p>

          {/* Search Bar Component */}
          <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto pt-4">
            <SearchBar 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </section>

      {/* 2. Category Filters Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none items-center space-x-2">
          <span className="text-xs font-bold text-brand-dark uppercase tracking-wider pr-2 hidden md:inline">Filters:</span>
          {categories.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              active={selectedCategory === category}
              onClick={() => {
                if (category === 'All') {
                  setSelectedCategory('All');
                } else {
                  // Direct category route navigation is cleaner
                  navigate(`/blog/category/${categoryMap[category]}`);
                }
              }}
            />
          ))}
        </div>
      </section>

      {/* 3. Featured Section */}
      {selectedCategory === 'All' && searchQuery.trim() === '' && featuredArticle && (
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-12">
          <FeaturedBlogCard 
            article={featuredArticle}
            author={getAuthor(featuredArticle.authorId)}
          />
        </section>
      )}

      {/* 4. Latest Articles & Sidebar Grid */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Grid List */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="text-lg font-bold text-brand-dark uppercase tracking-wider">
                {selectedCategory === 'All' && searchQuery.trim() === '' ? 'Latest Publications' : 'Search Results'}
              </h3>
              <span className="text-xs font-semibold text-brand-gray">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
              </span>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.map((article) => (
                  <BlogCard 
                    key={article.id}
                    article={article}
                    author={getAuthor(article.authorId)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-brand-border rounded-lg p-8">
                <div className="max-w-sm mx-auto space-y-4">
                  <Search className="h-10 w-10 text-brand-gray mx-auto" />
                  <h4 className="text-lg font-bold text-brand-dark">No Articles Found</h4>
                  <p className="text-sm text-brand-gray">
                    We couldn't find any content matching "{searchQuery}" under category "{selectedCategory}". Try widening your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="text-xs font-bold bg-brand-light text-brand-blue border border-brand-border px-4 py-2 rounded hover:bg-white"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Trending Widget */}
            <div className="bg-white border border-brand-border rounded-lg p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider border-b border-brand-border pb-2">
                Trending Insights
              </h3>
              <div className="space-y-4">
                {trendingArticles.map((article, idx) => (
                  <div key={article.id} className="flex items-start space-x-4">
                    <span className="text-2xl font-black text-brand-blue leading-none min-w-[28px]">
                      {article.trendRank || `0${idx + 1}`}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">
                        {article.categoryLabel}
                      </span>
                      <h4 className="text-sm font-bold text-brand-dark hover:text-brand-blue leading-snug">
                        <Link to={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Authors Widget */}
            <div className="bg-white border border-brand-border rounded-lg p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider border-b border-brand-border pb-2">
                Popular Writers
              </h3>
              <div className="space-y-4">
                {authors.map((author) => (
                  <AuthorCard 
                    key={author.id}
                    author={author}
                  />
                ))}
              </div>
            </div>

            {/* Newsletter Subscription Widget */}
            <NewsletterSection />

          </div>

        </div>
      </section>

      {/* 5. Strategy Consultation CTA Banner */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-16">
        <CTASection />
      </section>

    </div>
  );
}
