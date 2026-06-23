import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

export default function NewsletterSection({
  title = "Weekly Digest",
  description = "Join 45,000+ marketing leaders receiving our top SaaS, analytics, and strategy insights every Monday."
}) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <div className="bg-brand-dark text-white rounded-lg p-6 shadow-md space-y-4">
      <div className="flex items-center space-x-3">
        <Mail className="h-6 w-6 text-brand-blue" />
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <p className="text-xs text-brand-light leading-relaxed">
        {description}
      </p>
      {isSubscribed ? (
        <div className="bg-[#409ae0]/20 border border-brand-blue/30 rounded p-3 flex items-center space-x-2 text-xs">
          <CheckCircle className="h-4 w-4 text-brand-blue shrink-0" />
          <span className="font-semibold text-white">Subscription confirmed! Welcome to MartechAdda.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="email"
            required
            placeholder="Work email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/10 text-white placeholder-brand-gray border border-brand-gray/30 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-brand-blue"
          />
          <button
            type="submit"
            className="w-full bg-brand-blue hover:bg-[#409ae0] text-white font-bold text-sm py-2.5 rounded transition-all flex items-center justify-center space-x-2"
          >
            <span>Subscribe Now</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      )}
    </div>
  );
}
