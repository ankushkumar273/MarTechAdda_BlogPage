import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCard({ article, author }) {
  if (!article) return null;
  
  return (
    <article className="bg-white border border-brand-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
      <div>
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Card Main Info */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-gray uppercase">
            <span className="text-brand-blue">{article.categoryLabel}</span>
            <span>{article.readTime}</span>
          </div>
          <h4 className="text-lg font-bold text-brand-dark line-clamp-2 hover:text-brand-blue transition-colors">
            <Link to={`/blog/${article.slug}`}>
              {article.title}
            </Link>
          </h4>
          <p className="text-sm text-brand-gray line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Author Footer */}
      {author && (
        <div className="px-5 py-4 border-t border-brand-light bg-gray-50/50 flex items-center justify-between">
          <Link to={`/author/${author.slug}`} className="flex items-center space-x-2 group">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-7 h-7 rounded-full object-cover border border-brand-border"
            />
            <span className="text-xs font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
              {author.name}
            </span>
          </Link>
          <span className="text-[10px] font-medium text-brand-gray uppercase">{article.publishDate}</span>
        </div>
      )}
    </article>
  );
}
