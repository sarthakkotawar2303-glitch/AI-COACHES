import React from 'react';

const BackgroundGrid = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-zinc-950 text-zinc-300 overflow-hidden font-sans">
      {/* Background radial purple/indigo glow orbs */}
      <div 
        className="absolute top-[-15%] left-[5%] w-[600px] h-[600px] rounded-full bg-purple-600/12 blur-[130px] pointer-events-none animate-float-slow"
      />
      <div 
        className="absolute bottom-[-15%] right-[5%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none animate-float-slower"
      />

      {/* Grid Pattern Overlay with Radial Spotlight Mask */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04] animate-pan-grid" 
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Page Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default BackgroundGrid;
