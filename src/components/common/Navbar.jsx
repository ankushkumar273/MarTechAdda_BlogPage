import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Latest Insights', path: '/blog' },
    { name: 'Marketing Tech', path: '/blog/category/marketing-tech' },
    { name: 'Data Analytics', path: '/blog/category/analytics' },
    { name: 'Privacy & Strategy', path: '/blog/category/strategy' },
    { name: 'Authors', path: '/author/sarah-jenkins' }
  ];

  // Helper to determine active states
  const isActive = (path) => {
    if (location.pathname === path) return true;
    
    const pathParts = path.split('/');
    const locationParts = location.pathname.split('/');
    if (pathParts[2] && locationParts[2] && pathParts[2] === locationParts[2] && pathParts[3] === locationParts[3]) {
      return true;
    }
    
    if (path.startsWith('/author') && location.pathname.startsWith('/author')) {
      return true;
    }
    
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-brand-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-brand-dark hover:text-brand-blue focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link to="/blog" className="flex items-center">
              <span className="text-xl sm:text-2xl font-extrabold font-sans text-brand-dark tracking-tight">
                Martech<span className="text-brand-blue">Adda</span>
              </span>
            </Link>
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden lg:flex space-x-8 h-full">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-semibold transition-colors duration-200 h-full ${
                    active
                      ? 'border-brand-blue text-brand-blue'
                      : 'border-transparent text-brand-dark hover:text-brand-blue hover:border-brand-border'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action */}
          <div className="flex items-center">
            <Link
              to="/login"
              className="bg-brand-blue hover:bg-[#409ae0] text-white text-xs sm:text-sm font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded transition-all duration-200 shadow-sm hover:shadow"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Links */}
      {isOpen && (
        <div className="lg:hidden border-t border-brand-border bg-white animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-semibold transition-colors duration-150 ${
                    active
                      ? 'bg-brand-light text-brand-blue'
                      : 'text-brand-dark hover:bg-gray-50 hover:text-brand-blue'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
