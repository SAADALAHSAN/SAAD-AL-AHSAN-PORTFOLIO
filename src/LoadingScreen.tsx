import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }
    });

    // 1. Initial State
    gsap.set(counterRef.current, { opacity: 0, scale: 0.8, y: 30 });

    // 2. Entrance
    tl.to(counterRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: "expo.out"
    });

    // 3. Counter Animation
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2.5,
      ease: "power4.inOut",
      onUpdate: () => {
        setCount(Math.floor(counterObj.value));
      }
    }, "-=0.6");

    // 4. Exit Sequence
    tl.to(counterRef.current, {
      opacity: 0,
      scale: 1.1,
      y: -20,
      duration: 0.7,
      ease: "power3.in"
    }, "+=0.3");

    // Cinematic Split Reveal
    tl.to(panelTopRef.current, {
      y: "-100%",
      duration: 1.2,
      ease: "expo.inOut"
    }, "-=0.2");

    tl.to(panelBottomRef.current, {
      y: "100%",
      duration: 1.2,
      ease: "expo.inOut"
    }, "<");

  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] overflow-hidden bg-black">
      {/* Background Split Panels */}
      <div 
        ref={panelTopRef} 
        className="absolute top-0 left-0 w-full h-1/2 bg-[#050505] border-b border-white/[0.03] z-10" 
      />
      <div 
        ref={panelBottomRef} 
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050505] border-t border-white/[0.03] z-10" 
      />
      
      {/* Content Layer */}
      <div className="relative z-20 w-full h-full flex items-center justify-center pointer-events-none">
        <div ref={counterRef} className="flex flex-col items-center">
          <div className="flex items-baseline">
            <span className="text-[20vw] sm:text-[15vw] font-black text-white leading-none tabular-nums tracking-tighter">
              {count}
            </span>
            <span className="text-[6vw] sm:text-[4vw] font-bold text-[#eab676] ml-2 select-none">%</span>
          </div>
          
          <div className="mt-8 flex flex-col items-center gap-4">
            {/* Minimal line indicator */}
            <div className="w-24 h-[2px] bg-white/5 relative overflow-hidden rounded-full">
              <div 
                className="absolute inset-0 bg-[#eab676] shadow-[0_0_10px_rgba(234,182,118,0.4)]" 
                style={{ width: `${count}%`, transition: 'width 0.1s ease-out' }}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#eab676] animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.6em] text-white/30 uppercase">
                {count < 100 ? "Syncing System" : "System Ready"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

