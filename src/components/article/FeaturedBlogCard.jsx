import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function FeaturedBlogCard({ article, author }) {
  if (!article) return null;

  return (
    <div className="bg-white border border-brand-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
      {/* Visual Image Block */}
      <div className="lg:col-span-7 relative h-64 sm:h-96 lg:h-full min-h-[300px]">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-brand-blue text-white text-xs font-extrabold uppercase px-3 py-1.5 rounded tracking-wider shadow">
          Featured Insight
        </div>
      </div>

      {/* Meta Text Block */}
      <div className="lg:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-xs font-semibold text-brand-gray uppercase">
            <span>{article.categoryLabel}</span>
            <span>•</span>
            <span>{article.publishDate}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark hover:text-brand-blue transition-colors leading-tight">
            <Link to={`/blog/${article.slug}`}>
              {article.title}
            </Link>
          </h2>
          <p className="text-sm sm:text-base text-brand-gray leading-relaxed font-normal">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info (Author & CTA) */}
        {author && (
          <div className="pt-6 border-t border-brand-light flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-10 h-10 rounded-full object-cover border border-brand-border"
              />
              <div>
                <h4 className="text-sm font-bold text-brand-dark">
                  <Link to={`/author/${author.slug}`} className="hover:text-brand-blue">{author.name}</Link>
                </h4>
                <p className="text-xs text-brand-gray">{author.role}</p>
              </div>
            </div>
            <Link
              to={`/blog/${article.slug}`}
              className="inline-flex items-center text-xs font-bold text-brand-blue uppercase hover:translate-x-1 transition-transform"
            >
              Read Article <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
