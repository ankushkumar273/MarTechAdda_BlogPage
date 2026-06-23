import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Share2, Bookmark, ChevronDown, ChevronUp, Database, Cpu, 
  Mail, Globe
} from 'lucide-react';
import { articles } from '../data/articles';
import { authors } from '../data/authors';

// Reusable components
import NewsletterSection from '../components/common/NewsletterSection';
import CTASection from '../components/common/CTASection';

export default function ArticleDetail() {
  const { slug } = useParams(); // URL path is /blog/:slug
  
  // Find current article dynamically
  const article = useMemo(() => {
    return articles.find(a => a.slug === slug) || articles[0];
  }, [slug]);

  // Find author details
  const author = useMemo(() => {
    return authors.find(auth => auth.id === article.authorId) || {};
  }, [article]);

  // FAQ Accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  // Bookmark status
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle share link copy
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Find related articles
  const relatedArticles = useMemo(() => {
    let matches = articles.filter(a => a.category === article.category && a.id !== article.id);
    if (matches.length < 3) {
      const extra = articles.filter(a => a.category !== article.category && a.id !== article.id);
      matches = [...matches, ...extra];
    }
    return matches.slice(0, 3);
  }, [article]);

  const tocItems = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'autonomy', label: '2. Automation to Autonomy' },
    { id: 'cmo-perspective', label: '3. The CMO Perspective' },
    { id: 'metrics', label: '4. Adoption Metrics' },
    { id: 'ethical', label: '5. Ethical Considerations' },
    { id: 'faq', label: '6. FAQ Section' }
  ];

  const [activeAnchor, setActiveAnchor] = useState('introduction');

  // Simple scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of tocItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveAnchor(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen pb-16">
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs font-semibold text-brand-gray uppercase tracking-wider mb-6">
          <Link to="/blog" className="hover:text-brand-blue transition-colors">Home</Link>
          <span className="mx-2 text-brand-border">/</span>
          <Link to={`/blog/category/${article.category}`} className="hover:text-brand-blue transition-colors">{article.categoryLabel}</Link>
          <span className="mx-2 text-brand-border">/</span>
          <span className="text-brand-dark normal-case font-normal truncate max-w-[200px] inline-block align-bottom">{article.title}</span>
        </nav>

        {/* Title & Author Header */}
        <header className="space-y-6 pb-8 border-b border-brand-border">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-dark leading-tight tracking-tight max-w-4xl">
            {article.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-11 h-11 rounded-full object-cover border border-brand-border"
              />
              <div>
                <h4 className="text-sm font-bold text-brand-dark">
                  <Link to={`/author/${author.slug}`} className="hover:text-brand-blue">{author.name}</Link>
                </h4>
                <p className="text-xs text-brand-gray font-medium">
                  {author.role} <span className="mx-1.5">•</span> {article.publishDate} <span className="mx-1.5">•</span> {article.readTime}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <button
                onClick={handleShare}
                className="p-2 border border-brand-border rounded hover:bg-gray-50 text-brand-gray hover:text-brand-blue hover:border-brand-blue transition relative"
                aria-label="Share Link"
              >
                <Share2 className="h-4 w-4" />
                {isCopied && (
                  <span className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-brand-dark text-white text-[10px] px-2 py-1 rounded shadow whitespace-nowrap">
                    Link Copied!
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 border rounded transition ${
                  isBookmarked 
                    ? 'bg-brand-blue/10 border-brand-blue text-brand-blue' 
                    : 'border-brand-border text-brand-gray hover:bg-gray-50 hover:text-brand-blue hover:border-brand-blue'
                }`}
                aria-label="Bookmark article"
              >
                <Bookmark className="h-4 w-4" fill={isBookmarked ? "#55ACEE" : "none"} />
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <section className="py-8">
          <figure className="space-y-3">
            <div className="rounded-xl overflow-hidden shadow-sm h-64 sm:h-[480px]">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
            {article.featuredImageCaption && (
              <figcaption className="text-center text-xs sm:text-sm text-brand-gray italic font-medium leading-relaxed">
                {article.featuredImageCaption}
              </figcaption>
            )}
          </figure>
        </section>

        {/* Desktop Split Grid (70% Content, 30% Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
          
          {/* Main Article Content */}
          <article className="lg:col-span-8 space-y-10">
            
            <div id="introduction" className="scroll-mt-24 space-y-6">
              <p className="text-base sm:text-lg text-brand-dark leading-relaxed font-normal">
                {article.excerpt}
              </p>
              <p className="text-base text-brand-gray leading-relaxed">
                Artificial Intelligence has moved beyond a mere buzzword in the marketing ecosystem. Today, we are witnessing the emergence of <strong className="text-brand-dark">autonomous marketing orchestration</strong>, where AI doesn’t just suggest actions but executes complex, multi-channel campaigns with minimal human intervention.
              </p>
            </div>

            <div id="autonomy" className="scroll-mt-24 pl-5 border-l-4 border-brand-blue py-2 space-y-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight leading-snug">
                The Paradigm Shift: From Automation to Autonomy
              </h3>
              <p className="text-base text-brand-gray leading-relaxed">
                The transition from traditional rule-based automation to generative autonomy marks the fourth industrial revolution in marketing technology. Instead of setting rigid if-then statements, marketers are now training models on objective-driven outcomes.
              </p>
            </div>

            {/* Workflow diagram visual card */}
            <div className="bg-brand-light/35 border border-brand-border rounded-xl p-6 sm:p-8 space-y-6">
              <h4 className="text-xs font-bold text-brand-gray uppercase tracking-widest text-center">
                The AI Marketing Workflow
              </h4>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                
                <div className="bg-white border border-brand-border rounded-lg p-5 flex flex-col items-center w-40 shadow-sm">
                  <Database className="h-6 w-6 text-brand-blue mb-2" />
                  <span className="text-sm font-bold text-brand-dark">Data Ingestion</span>
                </div>

                <div className="text-brand-gray font-bold text-xl rotate-90 sm:rotate-0">→</div>

                <div className="bg-white border border-brand-border rounded-lg p-5 flex flex-col items-center w-40 shadow-sm">
                  <Cpu className="h-6 w-6 text-brand-blue mb-2" />
                  <span className="text-sm font-bold text-brand-dark">Neural Analysis</span>
                </div>

                <div className="text-brand-gray font-bold text-xl rotate-90 sm:rotate-0">→</div>
              </div>
            </div>

            <div id="cmo-perspective" className="scroll-mt-24 space-y-4">
              <p className="text-base text-brand-gray leading-relaxed">
                According to our latest industry survey, 74% of CMOs intend to increase their investment in generative AI platforms over the next 18 months. This is driven by the need for hyper-personalization at scale—a feat impossible for human teams alone.
              </p>
            </div>

            {/* Adoption Metrics Graphic */}
            <div id="metrics" className="scroll-mt-24 space-y-6">
              <div className="bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
                
                <div className="flex items-end justify-between h-48 sm:h-64 px-4 border-b border-brand-border">
                  
                  <div className="flex flex-col items-center space-y-2 w-12 sm:w-16">
                    <span className="text-xs font-bold text-brand-dark">25%</span>
                    <div className="w-full bg-brand-light rounded-t" style={{ height: '50px' }}></div>
                    <span className="text-[10px] sm:text-xs font-bold text-brand-gray pt-1">2021</span>
                  </div>

                  <div className="flex flex-col items-center space-y-2 w-12 sm:w-16">
                    <span className="text-xs font-bold text-brand-dark">45%</span>
                    <div className="w-full bg-brand-light rounded-t" style={{ height: '90px' }}></div>
                    <span className="text-[10px] sm:text-xs font-bold text-brand-gray pt-1">2022</span>
                  </div>

                  <div className="flex flex-col items-center space-y-2 w-12 sm:w-16">
                    <span className="text-xs font-bold text-brand-dark">68%</span>
                    <div className="w-full bg-brand-light rounded-t" style={{ height: '136px' }}></div>
                    <span className="text-[10px] sm:text-xs font-bold text-brand-gray pt-1">2023</span>
                  </div>

                  <div className="flex flex-col items-center space-y-2 w-12 sm:w-16">
                    <span className="text-xs font-bold text-brand-dark">85%</span>
                    <div className="w-full bg-brand-blue rounded-t shadow-sm" style={{ height: '170px' }}></div>
                    <span className="text-[10px] sm:text-xs font-bold text-brand-dark pt-1">2024 (Proj)</span>
                  </div>

                </div>

                <h4 className="text-center text-xs sm:text-sm font-bold text-brand-dark uppercase tracking-wider">
                  AI Adoption Rate in Enterprise Marketing Ops (%)
                </h4>
              </div>
            </div>

            <div id="ethical" className="scroll-mt-24 space-y-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight leading-snug">
                Ethical Considerations and Data Privacy
              </h3>
              <p className="text-base text-brand-gray leading-relaxed">
                As we hand more control to algorithmic systems, the question of bias and data ethics becomes paramount. Transparency in AI decision-making (Explainable AI) is no longer a luxury—it's a regulatory necessity under frameworks like the GDPR and upcoming AI Acts.
              </p>
            </div>

            {/* FAQ Accordion */}
            <div id="faq" className="scroll-mt-24 pt-6 space-y-6">
              <h3 className="text-lg font-bold text-brand-dark uppercase tracking-wider border-b border-brand-border pb-3">
                Frequently Asked Questions
              </h3>

              <div className="border border-brand-border rounded-lg divide-y divide-brand-border bg-white shadow-sm overflow-hidden">
                {article.faqs?.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={idx} className="transition-all duration-200">
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
                      >
                        <span className="text-sm font-bold text-brand-dark">{faq.question}</span>
                        {isOpen ? <ChevronUp className="h-4 w-4 text-brand-blue shrink-0" /> : <ChevronDown className="h-4 w-4 text-brand-gray shrink-0" />}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 text-sm text-brand-gray leading-relaxed animate-fadeIn">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tags (route to tags page) */}
            <div className="pt-6 flex flex-wrap gap-2">
              {article.tags?.map((tag) => {
                const tagSlug = tag.toLowerCase().replace(/\s+/g, '-');
                return (
                  <Link
                    key={tag}
                    to={`/tags/${tagSlug}`}
                    className="bg-brand-light/50 border border-brand-border text-brand-dark hover:border-brand-blue hover:text-brand-blue text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all"
                  >
                    {tag}
                  </Link>
                );
              })}
            </div>

          </article>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-8">
            
            <div className="sticky top-20 space-y-8">
              
              {/* In This Article */}
              <div className="bg-white border border-brand-border rounded-lg p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-brand-dark uppercase tracking-widest border-b border-brand-border pb-2">
                  In This Article
                </h3>
                <ul className="space-y-3 text-sm">
                  {tocItems.map((item) => {
                    const active = activeAnchor === item.id;
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                            setActiveAnchor(item.id);
                          }}
                          className={`block transition-colors ${
                            active
                              ? 'text-brand-blue font-bold border-l-2 border-brand-blue pl-2'
                              : 'text-brand-gray hover:text-brand-blue pl-2'
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Author Biography Sidebar Box */}
              {author && (
                <div className="bg-brand-dark text-white rounded-lg p-6 shadow-md space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-12 h-12 rounded-full object-cover border border-brand-gray/30"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        <Link to={`/author/${author.slug}`} className="hover:text-brand-blue">{author.name}</Link>
                      </h4>
                      <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">
                        {author.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-brand-light/95 leading-relaxed">
                    {author.bio}
                  </p>
                  
                  {/* Social Handles */}
                  <div className="flex space-x-3 pt-2 text-brand-gray border-t border-brand-gray/20">
                    {author.socials?.email && (
                      <a href={author.socials.email} className="hover:text-brand-blue transition-colors">
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {author.socials?.linkedin && (
                      <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                        <Share2 className="h-4 w-4" />
                      </a>
                    )}
                    {author.socials?.website && (
                      <a href={author.socials.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors">
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Newsletter digest widget */}
              <NewsletterSection />

              {/* Related Insights */}
              <div className="bg-white border border-brand-border rounded-lg p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-brand-dark uppercase tracking-widest border-b border-brand-border pb-2">
                  Related Insights
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((rel) => (
                    <div key={rel.id} className="flex items-start space-x-3 group">
                      <Link to={`/blog/${rel.slug}`} className="shrink-0">
                        <img
                          src={rel.featuredImage}
                          alt={rel.title}
                          className="w-12 h-12 rounded object-cover border border-brand-border group-hover:opacity-90"
                        />
                      </Link>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-brand-blue uppercase tracking-wider">
                          {rel.categoryLabel}
                        </span>
                        <h4 className="text-xs font-bold text-brand-dark group-hover:text-brand-blue leading-snug">
                          <Link to={`/blog/${rel.slug}`}>
                            {rel.title}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </aside>

        </div>

      </div>

      {/* Dotted strategy consultation audit callout */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-16">
        <CTASection />
      </section>

    </div>
  );
}
