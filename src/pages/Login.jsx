import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine starting mode based on URL route (supports /login and /signup mapping)
  const isSignupPath = location.pathname.startsWith('/signup');
  const [authMode, setAuthMode] = useState(isSignupPath ? 'signup' : 'login'); // 'login' | 'signup' | 'forgot'

  // Input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync mode if path changes
  useEffect(() => {
    setAuthMode(location.pathname.startsWith('/signup') ? 'signup' : 'login');
    setErrorMsg('');
    setSuccessMsg('');
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (authMode === 'login') {
        if (email.includes('@') && password.length >= 6) {
          setSuccessMsg('Successfully logged in! Redirecting...');
          setTimeout(() => navigate('/'), 1500);
        } else {
          setErrorMsg('Invalid email address or password (must be at least 6 characters).');
        }
      } else if (authMode === 'signup') {
        if (name.trim() && email.includes('@') && password.length >= 6 && agreeTerms) {
          setSuccessMsg('Account created successfully! Signing you in...');
          setTimeout(() => navigate('/'), 1500);
        } else if (!agreeTerms) {
          setErrorMsg('You must agree to the Terms of Service & Privacy Policy.');
        } else {
          setErrorMsg('Please fill out all fields correctly (password min. 6 characters).');
        }
      } else {
        // Forgot password
        if (email.includes('@')) {
          setSuccessMsg('Password reset instructions sent to your email.');
          setEmail('');
        } else {
          setErrorMsg('Please enter a valid email address.');
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      
      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-grow">
        
        {/* LEFT COLUMN: Visual Panel (Hidden on Mobile) */}
        <div className="hidden lg:flex relative bg-slate-900 overflow-hidden flex-col justify-between p-16 select-none">
          {/* Background image overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-55"
            style={{
              backgroundImage: `url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000")`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00385F] via-[#002b4d]/90 to-transparent"></div>

          {/* Logo Node Icon */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center space-x-2 text-white">
              <svg className="h-8 w-8 text-brand-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                <path d="M5.5 5.5l2.2 2.2M16.3 16.3l2.2 2.2M5.5 19.0l2.2-2.2M16.3 7.7l2.2-2.2" />
              </svg>
              <span className="text-2xl font-extrabold tracking-tight font-sans">
                Martech<span className="text-brand-blue">Adda</span>
              </span>
            </Link>
          </div>

          {/* Quote Block at Bottom */}
          <div className="relative z-10 space-y-4 max-w-lg text-white">
            <div className="space-y-1">
              <h2 className="text-4xl sm:text-5xl font-black font-sans tracking-tight">MartechAdda</h2>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Elevate Your Marketing Edge</h3>
            </div>
            <div className="border-l-2 border-brand-blue pl-4 py-0.5 mt-4">
              <p className="text-[10px] sm:text-xs font-bold text-brand-light uppercase tracking-widest leading-none">
                Data-Driven Insights for SaaS Professionals
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Form Panel */}
        <div className="flex items-center justify-center p-8 sm:p-12 lg:p-20 bg-white">
          <div className="w-full max-w-[420px] space-y-8">
            
            {/* Header copy */}
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
                {authMode === 'login' && "Welcome Back"}
                {authMode === 'signup' && "Create an Account"}
                {authMode === 'forgot' && "Reset Password"}
              </h2>
              <p className="text-sm text-brand-gray font-medium">
                {authMode === 'login' && "Log in to your account to access the latest martech reports and news."}
                {authMode === 'signup' && "Sign up today to get exclusive martech insights and reports."}
                {authMode === 'forgot' && "Enter your email address and we'll send you a link to reset your password."}
              </p>
            </div>

            {/* Error & Success States */}
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 rounded p-3.5 flex items-start space-x-2 text-xs text-red-600 font-semibold animate-fadeIn">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-500 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}
            {successMsg && (
              <div className="bg-green-50 border border-green-200 rounded p-3.5 flex items-start space-x-2 text-xs text-green-600 font-semibold animate-fadeIn">
                <Check className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form & Actions */}
            <div className="space-y-6">
              
              {/* Social Buttons (Hidden on forgot password) */}
              {authMode !== 'forgot' && (
                <div className="grid grid-cols-2 gap-3">
                  {/* Google */}
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessMsg('Signing in with Google...');
                      setTimeout(() => navigate('/'), 1200);
                    }}
                    className="flex items-center justify-center space-x-2 border border-brand-border hover:border-brand-gray/60 px-4 py-2.5 rounded text-xs font-bold text-brand-dark transition-colors"
                  >
                    {/* Google SVG Icon */}
                    <svg className="h-4 w-4" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.41 0-6.19-2.78-6.19-6.19s2.78-6.19 6.19-6.19c1.614 0 3.02.618 4.097 1.625l3.1-3.1C19.1 2.378 15.932 1 12.24 1 6.032 1 1 6.032 1 12.24s5.032 11.24 11.24 11.24c5.962 0 10.978-4.304 10.978-10.98 0-.498-.045-.97-.13-1.425H12.24Z" />
                    </svg>
                    <span>Google</span>
                  </button>

                  {/* LinkedIn */}
                  <button
                    type="button"
                    onClick={() => {
                      setSuccessMsg('Signing in with LinkedIn...');
                      setTimeout(() => navigate('/'), 1200);
                    }}
                    className="flex items-center justify-center space-x-2 border border-brand-border hover:border-brand-gray/60 px-4 py-2.5 rounded text-xs font-bold text-brand-dark transition-colors"
                  >
                    {/* LinkedIn SVG Icon */}
                    <svg className="h-4 w-4 fill-[#0077b5]" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </button>
                </div>
              )}

              {/* Divider */}
              {authMode !== 'forgot' && (
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-brand-border"></div>
                  <span className="flex-shrink mx-4 text-[10px] font-bold text-brand-gray uppercase tracking-widest bg-white">
                    Or continue with email
                  </span>
                  <div className="flex-grow border-t border-brand-border"></div>
                </div>
              )}

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name (Sign Up only) */}
                {authMode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full border border-brand-border rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-blue placeholder-brand-gray bg-white text-brand-dark"
                    />
                  </div>
                )}

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full border border-brand-border rounded px-3.5 py-2.5 text-sm focus:outline-none focus:border-brand-blue placeholder-brand-gray bg-white text-brand-dark"
                  />
                </div>

                {/* Password (Login & Sign Up only) */}
                {authMode !== 'forgot' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">Password</label>
                      {authMode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setAuthMode('forgot')}
                          className="text-xs font-bold text-brand-blue hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full border border-brand-border rounded pl-3.5 pr-10 py-2.5 text-sm focus:outline-none focus:border-brand-blue placeholder-brand-gray bg-white text-brand-dark"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-gray hover:text-brand-dark"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Checkbox Agreement */}
                {authMode === 'login' && (
                  <div className="flex items-center space-x-2 pt-1 select-none">
                    <input
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-brand-border text-brand-blue focus:ring-brand-blue accent-brand-blue"
                    />
                    <label htmlFor="remember-me" className="text-xs font-semibold text-brand-gray cursor-pointer">
                      Keep me signed in
                    </label>
                  </div>
                )}

                {/* Terms agreement (Sign Up only) */}
                {authMode === 'signup' && (
                  <div className="flex items-start space-x-2 pt-1 select-none">
                    <input
                      type="checkbox"
                      id="agree-terms"
                      required
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="h-4 w-4 mt-0.5 rounded border-brand-border text-brand-blue focus:ring-brand-blue accent-brand-blue"
                    />
                    <label htmlFor="agree-terms" className="text-xs font-semibold text-brand-gray cursor-pointer leading-tight">
                      I agree to the <a href="#" className="text-brand-blue hover:underline">Terms of Service</a> and <a href="#" className="text-brand-blue hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                )}

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#004b87] hover:bg-[#00385F] text-white font-bold py-3 px-4 rounded text-xs tracking-wider uppercase transition-colors shadow-sm hover:shadow"
                >
                  {loading ? (
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      {authMode === 'login' && "Sign In"}
                      {authMode === 'signup' && "Create Account"}
                      {authMode === 'forgot' && "Send Reset Link"}
                    </>
                  )}
                </button>

              </form>

              {/* Mode toggles */}
              <div className="pt-2 text-center text-xs font-semibold text-brand-gray">
                {authMode === 'login' && (
                  <p>
                    New to MartechAdda?{' '}
                    <button onClick={() => setAuthMode('signup')} className="text-brand-blue hover:underline font-bold">
                      Create an account
                    </button>
                  </p>
                )}
                {authMode === 'signup' && (
                  <p>
                    Already have an account?{' '}
                    <button onClick={() => setAuthMode('login')} className="text-brand-blue hover:underline font-bold">
                      Sign in
                    </button>
                  </p>
                )}
                {authMode === 'forgot' && (
                  <button onClick={() => setAuthMode('login')} className="text-brand-blue hover:underline font-bold">
                    Back to sign in
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* MINIMAL FOOTER */}
      <footer className="border-t border-brand-border bg-white py-4 px-6 text-xs text-brand-gray flex flex-col sm:flex-row justify-between items-center gap-2 select-none shrink-0 z-10">
        <div>
          © 2026 MartechAdda. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Contact</a>
        </div>
      </footer>

    </div>
  );
}
