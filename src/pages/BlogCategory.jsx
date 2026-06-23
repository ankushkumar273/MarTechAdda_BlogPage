import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { articles } from '../data/articles';
import { authors } from '../data/authors';
import BlogCard from '../components/article/BlogCard';

const CATEGORY_DETAILS = {
  'marketing-tech': {
    title: 'Marketing Tech',
    description: 'Advanced insights, trends, and analyses on modern marketing automation, orchestration platforms, and AI-powered operations.'
  },
  'analytics': {
    title: 'Analytics',
    description: 'Data-driven marketing models, customer data platform (CDP) setups, and attribution tracking structures.'
  },
  'strategy': {
    title: 'Strategy',
    description: 'High-level methodologies and scaling blueprints for mid-market and enterprise SaaS growth.'
  },
  'retention': {
    title: 'Retention',
    description: 'Advanced methodologies to decrease churn rate, optimize the customer lifecycle, and drive long-term LTV growth.'
  },
  'data-science': {
    title: 'Data Science',
    description: 'Database query tuning, segmentation math, and algorithmic structures for managing complex user profiles.'
  },
  'mobile': {
    title: 'Mobile',
    description: 'Consumer habits, push-notification analytics, and conversational messaging strategies for mobile app frameworks.'
  },
  'privacy': {
    title: 'Privacy',
    description: 'Zero-party data frameworks, consent compliance, and ethical preferences structures in a post-cookie web.'
  }
};

export default function BlogCategory() {
  const { slug } = useParams(); // URL path is /blog/category/:slug
  const category = slug;
  const info = CATEGORY_DETAILS[category] || { title: 'Insights', description: 'Explore our latest marketing technology publications.' };

  const [sortOption, setSortOption] = useState('latest');
  const [activeSubFilter, setActiveSubFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const articlesPerPage = 3;

  useEffect(() => {
    setCurrentPage(1);
    setActiveSubFilter('All');
  }, [category]);

  const categoryArticles = useMemo(() => {
    return articles.filter(a => a.category === category);
  }, [category]);

  const subFilters = useMemo(() => {
    const tags = new Set();
    categoryArticles.forEach(a => a.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags).slice(0, 4)];
  }, [categoryArticles]);

  const processedArticles = useMemo(() => {
    let result = [...categoryArticles];

    if (activeSubFilter !== 'All') {
      result = result.filter(a => a.tags.includes(activeSubFilter));
    }

    if (sortOption === 'latest') {
      result.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    } else if (sortOption === 'oldest') {
      result.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate));
    } else if (sortOption === 'read-time') {
      const getMin = (str) => parseInt(str.split(' ')[0]) || 0;
      result.sort((a, b) => getMin(a.readTime) - getMin(b.readTime));
    }

    return result;
  }, [categoryArticles, activeSubFilter, sortOption]);

  const totalPages = Math.ceil(processedArticles.length / articlesPerPage) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * articlesPerPage;
    return processedArticles.slice(start, start + articlesPerPage);
  }, [processedArticles, currentPage]);

  const getAuthor = (authorId) => {
    return authors.find(a => a.id === authorId) || {};
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* Category Banner */}
      <section className="bg-gradient-to-r from-brand-light/30 via-white to-white border-b border-brand-border py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-xs font-bold text-brand-gray uppercase hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="h-3 w-3 mr-1.5" /> Back to Insights
          </Link>
          <div className="border-l-4 border-brand-blue pl-4 py-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
              Category: {info.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-brand-gray max-w-3xl leading-relaxed">
              {info.description}
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Sort */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-brand-border rounded-lg p-4 shadow-sm">
          
          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto">
            <span className="text-xs font-bold text-brand-gray uppercase flex items-center gap-1.5 mr-1">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Tags:
            </span>
            {subFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveSubFilter(tag);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeSubFilter === tag
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'bg-brand-light/50 border border-brand-border text-brand-dark hover:bg-white hover:text-brand-blue'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-auto self-stretch md:self-auto flex justify-end">
            <button
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              className="inline-flex items-center justify-between gap-2 px-4 py-2 bg-white border border-brand-border rounded text-xs font-bold text-brand-dark hover:border-brand-gray transition-colors w-full md:w-44"
            >
              <span>Sort: {sortOption === 'latest' ? 'Latest' : sortOption === 'oldest' ? 'Oldest' : 'Shortest Read'}</span>
              <ChevronDown className={`h-4 w-4 text-brand-gray transition-transform duration-200 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isSortDropdownOpen && (
              <div className="absolute right-0 top-11 bg-white border border-brand-border rounded shadow-md py-1.5 z-10 w-full md:w-44 animate-fadeIn">
                <button
                  onClick={() => {
                    setSortOption('latest');
                    setIsSortDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-xs font-semibold hover:bg-brand-light hover:text-brand-blue ${sortOption === 'latest' ? 'text-brand-blue bg-brand-light/40' : 'text-brand-dark'}`}
                >
                  Latest
                </button>
                <button
                  onClick={() => {
                    setSortOption('oldest');
                    setIsSortDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-xs font-semibold hover:bg-brand-light hover:text-brand-blue ${sortOption === 'oldest' ? 'text-brand-blue bg-brand-light/40' : 'text-brand-dark'}`}
                >
                  Oldest
                </button>
                <button
                  onClick={() => {
                    setSortOption('read-time');
                    setIsSortDropdownOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-xs font-semibold hover:bg-brand-light hover:text-brand-blue ${sortOption === 'read-time' ? 'text-brand-blue bg-brand-light/40' : 'text-brand-dark'}`}
                >
                  Shortest Read
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Grid List */}
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
          <div className="text-center py-20 bg-white border border-brand-border rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-brand-dark">No Articles Found</h3>
            <p className="text-sm text-brand-gray mt-2">There are currently no articles matching your filter parameters.</p>
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
