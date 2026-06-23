import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Share2, Award, Mail } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const isAuthorPage = location.pathname.startsWith('/author/');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-brand-gray/30">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-12 md:col-span-4 lg:col-span-5 space-y-4">
            <Link to="/blog" className="inline-block">
              <span className="text-2xl font-extrabold tracking-tight">
                Martech<span className="text-brand-blue">Adda</span>
              </span>
            </Link>
            <p className="text-brand-gray text-sm leading-relaxed max-w-sm">
              {isAuthorPage 
                ? "The leading authority for data-driven marketing professionals and SaaS executives."
                : "Leading the conversation on marketing technology, data-driven strategies, and the future of digital commerce since 2013."
              }
            </p>
            {/* Social icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-brand-dark hover:bg-brand-blue hover:text-white rounded-full text-brand-gray border border-brand-gray/20 transition-all duration-200" aria-label="Website">
                <Globe className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-brand-dark hover:bg-brand-blue hover:text-white rounded-full text-brand-gray border border-brand-gray/20 transition-all duration-200" aria-label="Share">
                <Share2 className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-brand-dark hover:bg-brand-blue hover:text-white rounded-full text-brand-gray border border-brand-gray/20 transition-all duration-200" aria-label="Awards">
                <Award className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Dynamic Columns based on Page Route */}
          {!isAuthorPage ? (
            /* ARTICLE PAGE / HUB FOOTER */
            <>
              {/* Column 2: Platform */}
              <div className="col-span-6 md:col-span-2 lg:col-span-2 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-light">Platform</h3>
                <ul className="space-y-2 text-sm text-brand-gray">
                  <li><Link to="/blog" className="hover:text-brand-blue transition-colors">About Us</Link></li>
                  <li><Link to="/blog" className="hover:text-brand-blue transition-colors">Our Mission</Link></li>
                  <li><Link to="/blog" className="hover:text-brand-blue transition-colors">Editorial Board</Link></li>
                  <li><Link to="/blog" className="hover:text-brand-blue transition-colors">Careers</Link></li>
                </ul>
              </div>

              {/* Column 3: Legal */}
              <div className="col-span-6 md:col-span-3 lg:col-span-2 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-light">Legal</h3>
                <ul className="space-y-2 text-sm text-brand-gray">
                  <li><a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-brand-blue transition-colors">Cookie Policy</a></li>
                </ul>
              </div>

              {/* Column 4: Contact */}
              <div className="col-span-12 md:col-span-3 lg:col-span-3 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-light">Contact</h3>
                <ul className="space-y-2 text-sm text-brand-gray">
                  <li><Link to="/newsletter" className="hover:text-brand-blue transition-colors">Partnerships</Link></li>
                  <li><Link to="/newsletter" className="hover:text-brand-blue transition-colors">Press Center</Link></li>
                  <li><Link to="/newsletter" className="hover:text-brand-blue transition-colors">Support</Link></li>
                </ul>
              </div>
            </>
          ) : (
            /* AUTHOR PROFILE FOOTER */
            <>
              {/* Column 2: Company */}
              <div className="col-span-6 md:col-span-2 lg:col-span-2 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-light">Company</h3>
                <ul className="space-y-2 text-sm text-brand-gray">
                  <li><Link to="/blog" className="hover:text-brand-blue transition-colors">About Us</Link></li>
                  <li><Link to="/blog" className="hover:text-brand-blue transition-colors">Our Mission</Link></li>
                  <li><Link to="/newsletter" className="hover:text-brand-blue transition-colors">Contact</Link></li>
                </ul>
              </div>

              {/* Column 3: Legal */}
              <div className="col-span-6 md:col-span-3 lg:col-span-2 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-light">Legal</h3>
                <ul className="space-y-2 text-sm text-brand-gray">
                  <li><a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a></li>
                </ul>
              </div>

              {/* Column 4: Newsletter Box */}
              <div className="col-span-12 md:col-span-3 lg:col-span-3 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-light">Newsletter</h3>
                {isSubscribed ? (
                  <div className="text-brand-blue text-sm font-semibold animate-pulse">
                    Thank you for subscribing!
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex max-w-sm rounded overflow-hidden">
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="bg-brand-gray/10 text-white placeholder-brand-gray border border-brand-gray/30 px-3 py-2 text-sm w-full focus:outline-none focus:border-brand-blue"
                    />
                    <button
                      type="submit"
                      className="bg-brand-blue hover:bg-[#409ae0] text-white px-4 py-2 text-sm font-bold transition-colors"
                    >
                      Join
                    </button>
                  </form>
                )}
              </div>
            </>
          )}

        </div>

        {/* Bottom copyright bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-brand-gray gap-4">
          <div className="flex items-center space-x-1">
            <span>© 2026 MartechAdda. All rights reserved.</span>
            {!isAuthorPage && (
              <span className="hidden md:inline">• Professional insights for the modern marketer.</span>
            )}
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a>
            {isAuthorPage && <Link to="/newsletter" className="hover:text-brand-blue transition-colors">Contact</Link>}
          </div>
        </div>
      </div>
    </footer>
  );
}
