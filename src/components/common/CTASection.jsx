import React from 'react';
import { Award } from 'lucide-react';

export default function CTASection({ 
  title = "Need a Strategy Audit?", 
  description = "Work directly with our senior strategists (including Sarah Jenkins) to audit data flows, fix leaky conversion funnels, and build a cohesive customer retention engine.", 
  buttonText = "Book a Consultation",
  buttonLink = "mailto:consult@martechadda.com?subject=Strategy%20Audit%20Consultation"
}) {
  return (
    <div 
      className="relative bg-brand-dark rounded-xl p-8 sm:p-12 overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between gap-8 border border-brand-gray/20"
      style={{
        backgroundImage: `radial-gradient(rgba(102, 117, 127, 0.15) 1px, transparent 1px)`,
        backgroundSize: '16px 16px'
      }}
    >
      {/* Content Column */}
      <div className="space-y-3 text-center md:text-left max-w-xl">
        <span className="text-xs font-bold text-brand-blue uppercase tracking-widest flex items-center justify-center md:justify-start gap-1">
          <Award className="h-4 w-4" /> Consulting Spots Open Q3
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {title}
        </h2>
        <p className="text-sm text-brand-light leading-relaxed">
          {description}
        </p>
      </div>

      {/* Button Column */}
      <div className="shrink-0">
        <a
          href={buttonLink}
          className="inline-block bg-brand-blue hover:bg-[#409ae0] text-white font-bold text-sm px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}
