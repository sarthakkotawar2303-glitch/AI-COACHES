import React from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col font-sans overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow pt-24 relative">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] opacity-20 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] animate-float-slow"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[128px] animate-float-slower delay-200"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="text-center animate-fade-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-8">
              <span className="flex w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
              AI-Powered Resume Coach
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
              Land Your Dream Job with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
                AI-Driven Insights
              </span>
            </h1>
            
            <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Transform your resume into a powerful professional story. Our AI analyzes, optimizes, and coaches you to stand out to top employers.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up delay-200">
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg hover:from-purple-500 hover:to-indigo-500 focus:ring-4 focus:ring-purple-500/30 transition-all hover:-translate-y-1 shadow-lg shadow-purple-500/25"
              >
                Start Building Free
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 rounded-xl bg-gray-900 border border-gray-700 text-white font-semibold text-lg hover:bg-gray-800 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-black/40 border-t border-gray-900 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-3xl font-bold text-white mb-4">Why Choose ResumeAI?</h2>
              <p className="text-gray-400">Everything you need to craft the perfect application.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors animate-fade-up delay-100 group">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Instant Optimization</h3>
                <p className="text-gray-400">Get real-time feedback and suggestions to improve your resume's impact and ATS score.</p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-indigo-500/50 transition-colors animate-fade-up delay-200 group">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Smart Tailoring</h3>
                <p className="text-gray-400">Automatically adjust your resume to match specific job descriptions seamlessly.</p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors animate-fade-up delay-300 group">
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Interview Coach</h3>
                <p className="text-gray-400">Practice with our AI coach to prepare for questions based on your experience.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
