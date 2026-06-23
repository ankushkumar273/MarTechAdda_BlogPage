import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Globe, Share2, Award, Mail } from 'lucide-react';
import { authors } from '../data/authors';
import { articles } from '../data/articles';
import BlogCard from '../components/article/BlogCard';

export default function AuthorProfile() {
  const { slug } = useParams();

  // Find author dynamically, fallback to Sarah Jenkins if not matched
  const author = useMemo(() => {
    return authors.find(auth => auth.slug === slug) || authors.find(auth => auth.slug === 'sarah-jenkins');
  }, [slug]);

  // Find all articles published by this author
  const publishedArticles = useMemo(() => {
    return articles.filter(art => art.authorId === author.id);
  }, [author]);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* 1. Profile Hero Section */}
      <section className="relative bg-white border-b border-brand-border">
        {/* Blurry Canvas Backdrop */}
        <div className="h-44 sm:h-56 bg-brand-dark overflow-hidden relative">
          <div 
            className="absolute inset-0 bg-cover bg-center filter blur-md opacity-25 scale-105"
            style={{ backgroundImage: `url(${author.avatar})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
        </div>

        {/* Profile Card Overlay Container */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4">
            
            {/* Avatar & Name Info */}
            <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover border-4 border-white shadow-md bg-white relative z-10"
              />
              <div className="pb-2 space-y-1">
                <h1 className="text-3xl font-extrabold text-brand-dark tracking-tight">
                  {author.name}
                </h1>
                <p className="text-sm font-bold text-brand-blue uppercase tracking-wider">
                  {author.role}
                </p>
              </div>
            </div>

            {/* Social Icons (Right side) */}
            <div className="flex items-center space-x-2.5 pb-2">
              {author.socials?.website && (
                <a
                  href={author.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-brand-border rounded bg-white hover:bg-gray-50 text-brand-gray hover:text-brand-blue hover:border-brand-blue transition-all"
                  aria-label="Website"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
              {author.socials?.linkedin && (
                <a
                  href={author.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-brand-border rounded bg-white hover:bg-gray-50 text-brand-gray hover:text-brand-blue hover:border-brand-blue transition-all"
                  aria-label="LinkedIn"
                >
                  <Share2 className="h-4 w-4" />
                </a>
              )}
              {author.socials?.email && (
                <a
                  href={author.socials.email}
                  className="p-2 border border-brand-border rounded bg-white hover:bg-gray-50 text-brand-gray hover:text-brand-blue hover:border-brand-blue transition-all"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 2. Biography & Core Expertise */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Biography Block (Left) */}
          <div className="lg:col-span-8 bg-white border border-brand-border rounded-lg p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider border-b border-brand-border pb-2">
              About {author.name.split(' ')[0]}
            </h3>
            <p className="text-sm sm:text-base text-brand-gray leading-relaxed whitespace-pre-line">
              {author.bio}
            </p>
          </div>

          {/* Core Expertise Block (Right) */}
          <div className="lg:col-span-4 bg-white border border-brand-border rounded-lg p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-brand-dark uppercase tracking-widest border-b border-brand-border pb-2">
              Core Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {author.expertise?.map((skill) => (
                <span
                  key={skill}
                  className="bg-brand-light/50 border border-brand-border text-brand-dark text-xs font-semibold px-3 py-1.5 rounded-md hover:border-brand-blue hover:text-brand-blue transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Published Articles Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-brand-border pb-3">
            <h3 className="text-lg font-bold text-brand-dark uppercase tracking-wider">
              Latest Publications
            </h3>
            <Link 
              to={`/search?q=${author.name}`}
              className="text-xs font-bold text-brand-blue uppercase hover:translate-x-1 transition-transform inline-flex items-center"
            >
              View All Articles
            </Link>
          </div>

          {publishedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedArticles.map((article) => (
                <BlogCard
                  key={article.id}
                  article={article}
                  author={author}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white border border-brand-border rounded-lg shadow-sm">
              <h4 className="text-base font-bold text-brand-dark">No publications found</h4>
              <p className="text-xs text-brand-gray mt-1">This author hasn't published any articles yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Custom Dotted Strategy Audit Consultation Card */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12">
        <div 
          className="relative bg-brand-dark rounded-xl p-8 sm:p-12 overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 border border-brand-gray/20"
          style={{
            backgroundImage: `radial-gradient(rgba(102, 117, 127, 0.15) 1px, transparent 1px)`,
            backgroundSize: '16px 16px'
          }}
        >
          {/* Content */}
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
              <Award className="h-4 w-4" /> Consulting Spots Open Q3
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Need a Strategy Audit?
            </h2>
            <p className="text-sm text-brand-light leading-relaxed">
              Work directly with {author.name.split(' ')[0]} to identify leaks in your marketing stack, audit database efficiency, and build a customized growth engine roadmap.
            </p>
          </div>

          {/* Action Button */}
          <div className="shrink-0">
            <a
              href={`mailto:consult@martechadda.com?subject=Strategy%20Audit%20with%20${author.name}`}
              className="inline-block bg-brand-blue hover:bg-[#409ae0] text-white font-bold text-sm px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
