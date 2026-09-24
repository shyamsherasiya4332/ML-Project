import React from 'react';

export default function StockBackground() {
  return (
    <div className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none select-none opacity-40">
      {/* Animated Stock Line 1 */}
      <svg 
        className="absolute top-1/4 left-0 w-full h-[600px] text-blue-300/40" 
        preserveAspectRatio="none" 
        viewBox="0 0 1000 300"
      >
        <path
          className="stock-line-slow"
          d="M0,250 C100,220 200,280 300,180 C400,80 500,200 600,150 C700,100 800,180 900,80 L1000,50"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="stock-area-slow"
          d="M0,250 C100,220 200,280 300,180 C400,80 500,200 600,150 C700,100 800,180 900,80 L1000,50 L1000,300 L0,300 Z"
          fill="url(#gradient-blue)"
        />
      </svg>

      {/* Animated Stock Line 2 */}
      <svg 
        className="absolute top-1/3 left-0 w-full h-[500px] text-indigo-300/30" 
        preserveAspectRatio="none" 
        viewBox="0 0 1000 300"
      >
        <path
          className="stock-line-fast"
          d="M0,200 C150,150 250,250 400,100 C500,0 600,150 750,80 L1000,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Floating Candlesticks */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => {
          const height = Math.floor(Math.random() * 40) + 20;
          const left = Math.floor(Math.random() * 100);
          const top = Math.floor(Math.random() * 100);
          const delay = Math.random() * 5;
          const isGreen = Math.random() > 0.5;
          
          return (
            <div 
              key={i}
              className={`absolute rounded-sm animate-float-candlestick ${isGreen ? 'bg-green-400/20' : 'bg-red-400/20'}`}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                width: '6px',
                height: `${height}px`,
                animationDelay: `${delay}s`,
              }}
            >
              {/* Wick */}
              <div 
                className={`absolute left-1/2 -translate-x-1/2 ${isGreen ? 'bg-green-400/20' : 'bg-red-400/20'}`}
                style={{
                  top: '-10px',
                  height: `${height + 20}px`,
                  width: '2px',
                  zIndex: -1
                }}
              />
            </div>
          );
        })}
      </div>

      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient-blue" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
