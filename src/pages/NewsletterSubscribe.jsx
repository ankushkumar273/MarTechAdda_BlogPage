import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Check, Sparkles, BookOpen, BarChart3, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim().includes('@')) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsSubmitted(true);
      }, 800);
    }
  };

  const benefits = [
    {
      icon: <BookOpen className="h-5 w-5 text-brand-blue" />,
      title: "Tactical Deep-Dives",
      description: "Receive step-by-step guides on SQL optimizations for marketing data clusters, CDP setups, and database auditing workflows."
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-brand-blue" />,
      title: "Adoption Reports & Stats",
      description: "Be the first to access raw metrics on AI adoption rates, push notification fatigue rates, and mobile retention benchmarks."
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-brand-blue" />,
      title: "Privacy & Data Compliance",
      description: "Stay ahead of regulatory shifts (GDPR/AI Act) with ethical zero-party data preference frameworks and consent-led trust blueprints."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* 1. Header Navigation */}
      <section className="bg-white border-b border-brand-border py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-xs font-bold text-brand-gray uppercase hover:text-brand-blue transition-colors"
          >
            <ArrowLeft className="h-3 w-3 mr-1.5" /> Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
            Newsletter Hub
          </h1>
        </div>
      </section>

      {/* 2. Subscription Container */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 max-w-4xl mx-auto">
          
          {/* Left Column: Form / Action Card (7 columns) */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
            
            {!isSubmitted ? (
              /* INPUT FORM STATE */
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-1 text-xs font-bold text-brand-blue uppercase tracking-widest bg-brand-light/40 px-2.5 py-1 rounded">
                    <Sparkles className="h-3.5 w-3.5" /> <span>Weekly Briefing</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight leading-tight">
                    Join the Weekly Digest
                  </h2>
                  <p className="text-sm text-brand-gray leading-relaxed font-medium">
                    The latest SaaS insights, marketing technology trends, and analytics models delivered directly to your inbox every Monday morning.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-dark uppercase tracking-wider">Work Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-brand-gray" />
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-4 py-3 border border-brand-border rounded-lg bg-gray-50 placeholder-brand-gray text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent transition text-sm font-semibold"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-blue hover:bg-[#409ae0] text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors shadow-sm hover:shadow flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <span>Subscribe Now</span>
                    )}
                  </button>
                </form>

                <p className="text-[10px] text-brand-gray/80 leading-relaxed">
                  By subscribing, you agree to receive weekly updates from MartechAdda. We prioritize your data privacy; unsubscribe at any time with a single click.
                </p>
              </div>
            ) : (
              /* SUCCESS STATE */
              <div className="space-y-6 text-center py-8 animate-fadeIn">
                <div className="inline-flex p-4 bg-green-50 border border-green-200 rounded-full text-green-500 mx-auto">
                  <Check className="h-8 w-8 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                    Welcome to the Digest!
                  </h2>
                  <p className="text-sm text-brand-gray leading-relaxed font-medium max-w-sm mx-auto">
                    We've sent a confirmation email to you. Get ready for your first briefing next Monday morning!
                  </p>
                </div>
                <div className="pt-4">
                  <Link
                    to="/"
                    className="inline-flex items-center text-xs font-bold bg-brand-light border border-brand-border text-brand-blue px-5 py-2.5 rounded-lg hover:bg-white transition-colors"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Benefits Sidebar (5 columns) */}
          <div className="lg:col-span-5 bg-brand-dark text-white p-8 sm:p-10 flex flex-col justify-center space-y-8 border-t lg:border-t-0 lg:border-l border-brand-gray/20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-light border-b border-brand-gray/30 pb-2">
              Subscriber Benefits
            </h3>
            
            <div className="space-y-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start space-x-3.5">
                  <div className="bg-white/10 p-2 rounded-lg shrink-0 border border-white/5">
                    {benefit.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{benefit.title}</h4>
                    <p className="text-xs text-brand-light/80 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
