import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="w-full h-[600px] flex flex-col items-center justify-center bg-[#0f0f13] rounded-2xl border border-white/10">
      <div className="relative w-16 h-16">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 border-4 border-white/10 border-t-white rounded-full animate-spin" />
        {/* Inner pulsing core */}
        <div className="absolute inset-4 bg-white/20 rounded-full animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
      </div>
      <p className="mt-6 text-xs font-bold tracking-[0.3em] uppercase text-white/40 animate-pulse">
        Initializing 3D Engine
      </p>
    </div>
  );
};

export default LoadingScreen;
