import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams, Link, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { articles } from '../data/articles';
import { authors } from '../data/authors';
import BlogCard from '../components/article/BlogCard';

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams(); // Detects tag parameter from /tags/:slug
  const navigate = useNavigate();

  // If accessed via /tags/:slug, decode it, otherwise read ?q= search param
  const query = useMemo(() => {
    if (slug) {
      // e.g., 'marketing-tech' -> 'marketing tech'
      return slug.replace(/-/g, ' ');
    }
    return searchParams.get('q') || '';
  }, [slug, searchParams]);

  const [inputVal, setInputVal] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  
  const articlesPerPage = 3;

  // Sync state when search terms change
  useEffect(() => {
    setInputVal(query);
    setCurrentPage(1);
  }, [query]);

  // Handle new search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (slug) {
      // If we were on /tags/:slug, navigate to standard search route to clear tag URL binding
      navigate(`/search?q=${encodeURIComponent(inputVal)}`);
    } else {
      setSearchParams({ q: inputVal });
    }
    setCurrentPage(1);
  };

  const categories = ['All', 'Marketing Tech', 'Analytics', 'Strategy', 'Retention', 'Data Science', 'Mobile', 'Privacy'];

  const categoryMap = {
    'Marketing Tech': 'marketing-tech',
    'Analytics': 'analytics',
    'Strategy': 'strategy',
    'Retention': 'retention',
    'Data Science': 'data-science',
    'Mobile': 'mobile',
    'Privacy': 'privacy'
  };

  // Perform search query filtering
  const searchResults = useMemo(() => {
    return articles.filter(article => {
      // Match search text or tag
      const matchesSearch = query.trim() === '' ||
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
        article.tags.some(t => t.toLowerCase() === query.toLowerCase() || t.toLowerCase().includes(query.toLowerCase()));

      // Match selected category filter
      const matchesCategory = selectedCategory === 'All' ||
        article.category === categoryMap[selectedCategory];

      return matchesSearch && matchesCategory;
    });
  }, [query, selectedCategory]);

  // Pagination calculation
  const totalPages = Math.ceil(searchResults.length / articlesPerPage) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * articlesPerPage;
    return searchResults.slice(start, start + articlesPerPage);
  }, [searchResults, currentPage]);

  const getAuthor = (authorId) => {
    return authors.find(a => a.id === authorId) || {};
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* Header Navigation */}
      <section className="bg-white border-b border-brand-border py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-xs font-bold text-brand-gray uppercase hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="h-3 w-3 mr-1.5" /> Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
            {slug ? `Tag Insights: #${query}` : "Search Portal"}
          </h1>
        </div>
      </section>

      {/* Interactive Search Area */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl relative flex gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-brand-gray" />
              </div>
              <input
                type="text"
                placeholder="Search articles, tags, authors..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border border-brand-border rounded-lg bg-gray-50 placeholder-brand-gray text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition text-sm"
              />
            </div>
            <button
              type="submit"
              className="bg-brand-blue hover:bg-[#409ae0] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-lg shadow transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          {/* Results Summary */}
          <div className="border-t border-brand-light pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold text-brand-dark uppercase tracking-wider">
                {query.trim() ? (slug ? `Articles tagged with "${query}"` : `Search results for "${query}"`) : "All Publications"}
              </h2>
              <p className="text-xs text-brand-gray mt-1">
                Found {searchResults.length} matching {searchResults.length === 1 ? 'article' : 'articles'}.
              </p>
            </div>

            {/* Scope Filter */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] font-bold text-brand-gray uppercase mr-1">Scope:</span>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-gray-50 border border-brand-border rounded px-3 py-1.5 text-xs font-semibold text-brand-dark focus:outline-none focus:border-brand-blue"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Results */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {paginatedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedArticles.map((article) => (
              <BlogCard
                key={article.id}
                article={article}
                author={getAuthor(article.authorId)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-brand-border rounded-lg shadow-sm p-8">
            <div className="max-w-md mx-auto space-y-4">
              <Search className="h-10 w-10 text-brand-gray mx-auto" />
              <h3 className="text-lg font-bold text-brand-dark">No Results Found</h3>
              <p className="text-sm text-brand-gray">
                We couldn't find any publications matching "{query}" under "{selectedCategory}". Check your spelling or modify your filter options.
              </p>
              <button
                type="button"
                onClick={() => {
                  setInputVal('');
                  if (slug) {
                    navigate('/search');
                  } else {
                    setSearchParams({});
                  }
                  setSelectedCategory('All');
                }}
                className="text-xs font-bold bg-brand-light border border-brand-border text-brand-blue px-4 py-2 rounded hover:bg-white transition-colors"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 flex justify-center">
          <nav className="inline-flex rounded-md shadow-sm bg-white border border-brand-border overflow-hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-xs font-bold border-r border-brand-border ${
                currentPage === 1
                  ? 'text-brand-gray/40 bg-gray-50 cursor-not-allowed'
                  : 'text-brand-dark hover:bg-brand-light hover:text-brand-blue'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const active = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 text-xs font-bold border-r border-brand-border last:border-r-0 ${
                    active
                      ? 'bg-brand-blue text-white'
                      : 'text-brand-dark bg-white hover:bg-brand-light hover:text-brand-blue'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-xs font-bold ${
                currentPage === totalPages
                  ? 'text-brand-gray/40 bg-gray-50 cursor-not-allowed'
                  : 'text-brand-dark hover:bg-brand-light hover:text-brand-blue'
              }`}
            >
              Next
            </button>
          </nav>
        </section>
      )}

    </div>
  );
}
