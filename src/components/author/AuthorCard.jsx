import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Linkedin, Mail } from 'lucide-react';

export default function AuthorCard({ author }) {
  if (!author) return null;

  return (
    <div className="flex items-start space-x-3 bg-white p-4 border border-brand-border rounded-lg shadow-sm hover:shadow transition-shadow">
      <Link to={`/author/${author.slug}`} className="shrink-0">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-12 h-12 rounded-full object-cover border border-brand-border"
        />
      </Link>
      <div className="space-y-1.5 w-full">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm font-bold text-brand-dark hover:text-brand-blue">
              <Link to={`/author/${author.slug}`}>{author.name}</Link>
            </h4>
            <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wide">{author.role}</p>
          </div>
          
          {/* Action social links */}
          <div className="flex space-x-1.5 text-brand-gray">
            {author.socials?.linkedin && (
              <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-3.5 w-3.5" />
              </a>
            )}
            {author.socials?.website && (
              <a href={author.socials.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand-blue transition-colors" aria-label="Website">
                <Globe className="h-3.5 w-3.5" />
              </a>
            )}
            {author.socials?.email && (
              <a href={author.socials.email} className="hover:text-brand-blue transition-colors" aria-label="Email">
                <Mail className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
        <p className="text-xs text-brand-gray leading-relaxed line-clamp-2">
          {author.bio}
        </p>
      </div>
    </div>
  );
}
