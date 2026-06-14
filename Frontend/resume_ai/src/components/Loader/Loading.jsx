import React from 'react';
import { Loader2, Zap } from 'lucide-react';

/**
 * Reusable premium Loading component.
 * Supports different styles for page loads, inline content cards, and action buttons.
 *
 * @param {Object} props
 * @param {'fullscreen' | 'card' | 'button'} props.variant - The visual variant.
 * @param {string} [props.title] - Bold primary title text.
 * @param {string} [props.subtitle] - Smaller explanatory subtext or tips.
 * @param {string} [props.className] - Additional classes for customization.
 */
const Loading = ({ variant = 'card', title, subtitle, className = '' }) => {
  if (variant === 'button') {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        <Loader2 className="h-4 w-4 animate-spin text-current" />
        {title && <span>{title}</span>}
      </span>
    );
  }

  if (variant === 'fullscreen') {
    return (
      <main className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 text-zinc-300 overflow-hidden ${className}`}>
        <div className="absolute w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col items-center animate-fade-scale text-center px-4">
          <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-b-purple-500 rounded-full animate-spin" style={{ animationDuration: '1.2s' }}></div>
            <div className="absolute inset-2 border-4 border-transparent border-l-indigo-400 border-r-indigo-400 rounded-full animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}></div>
            <Zap className="text-purple-400 w-6 h-6 animate-pulse" />
          </div>
          
          {title && (
            <h2 className="text-lg font-extrabold text-zinc-100 tracking-wide animate-pulse">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xs text-zinc-500 mt-2 max-w-xs leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center py-16 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl text-center shadow-2xl min-h-[380px] max-w-md mx-auto px-6 backdrop-blur-xl animate-fade-scale ${className}`}>
      <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
        <div className="absolute inset-0 border-3 border-transparent border-t-purple-500 border-b-purple-500 rounded-full animate-spin" style={{ animationDuration: '1.2s' }}></div>
        <div className="absolute inset-1.5 border-3 border-transparent border-l-indigo-400 border-r-indigo-400 rounded-full animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}></div>
        <Zap className="text-purple-500 w-5 h-5 animate-pulse" />
      </div>

      {title && (
        <h2 className="text-base font-bold text-zinc-200 mb-2 tracking-wide">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-xs text-zinc-400 h-12 leading-relaxed max-w-xs transition-all duration-300">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Loading;
