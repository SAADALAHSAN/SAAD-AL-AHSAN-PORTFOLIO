import React, { useRef, useLayoutEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const experiences = [
  {
    period: "2020 — 2023",
    title: "Exchange Listing Manager",
    company: "MEXC, LBank, Coinstore",
    details: ["Facilitated end-to-end token listing on major CEXs", "Key listing partner for multiple crypto projects"],
    x: 50, y: 15, align: "right"
  },
  {
    period: "2021 — 2024",
    title: "Community Manager",
    company: "NRC, Tradespy, Airdrop Accel",
    details: ["Managed and scaled massive user communities", "Educated users on crypto trends and airdrops"],
    x: 50, y: 35, align: "left"
  },
  {
    period: "2021 — Present",
    title: "Co-Founder & Project Lead",
    company: "PRUF Protocol, Tradespy",
    details: ["Launched innovative Web3 projects and ecosystems", "Led strategic development and tokenomics"],
    x: 50, y: 55, align: "right"
  },
  {
    period: "2025 — Present",
    title: "Software Developer",
    company: "Independent Projects",
    details: ["Developing modern web applications", "Integrating AI and Web3 technologies", "Building responsive, animated UI components"],
    x: 50, y: 75, align: "left"
  },
  {
    period: "2021 — Present",
    title: "Forex & Crypto Trader",
    company: "Prop Firm Funded Trader",
    details: ["Managed trading portfolios", "Deep expertise in technical analysis", "Strict risk management principles"],
    x: 50, y: 95, align: "right"
  }
];

export default function ExperienceTimeline() {
  const containerRef = useRef();
  const timelineRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 30%", // Start the animation when section is 30% into viewport
          toggleActions: "play none none none" // Play once automatically
        }
      });
      timelineRef.current = tl;

      // Estimated times for each stop based on 12s duration and constant speed
      const popupTimes = [0.9, 3.5, 6.1, 8.7, 10.1];

      experiences.forEach((exp, index) => {
        // Initial state
        gsap.set(`.popup-${index}`, { 
          opacity: 0, 
          scale: 0.5, 
          transformOrigin: exp.align === 'right' ? 'left center' : 'right center' 
        });
        
        // Pop them up
        tl.to(`.popup-${index}`, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, popupTimes[index]);

        // Light up the dot
        tl.to(`.dot-${index}`, {
          backgroundColor: "#f51313",
          boxShadow: "0 0 20px 5px rgba(245, 19, 19, 0.8)",
          scale: 1.5,
          duration: 0.3
        }, popupTimes[index] - 0.2);
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden border-t border-white/10 flex flex-col items-center"
    >
      {/* Header */}
      <div className="absolute top-8 left-6 sm:left-12 z-50 flex items-center gap-4">
        <Briefcase className="w-5 h-5 text-white/50" />
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white/80">Career Map</h2>
      </div>


      {/* The Game Map Container */}
      <div className="relative w-full max-w-4xl h-[1000px] mt-24 mb-40 mx-auto z-10">
        
        {/* The Full Visible Path */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          <path 
            id="game-path"
            d="M 50,-10 L 50,130"
            fill="none" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="0.5" 
            strokeDasharray="1 1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* The Stops and Popups */}
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className="absolute z-20 flex items-center justify-center"
            style={{ 
              left: `${exp.x}%`, 
              top: `${exp.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* The Map Dot */}
            <div className={`dot-${index} w-3 h-3 sm:w-4 sm:h-4 bg-white/20 border-2 border-white/50 rounded-full transition-all`}></div>
            
            {/* The Popup Info Card */}
            <div 
              onClick={() => timelineRef.current?.restart()}
              className={`popup-${index} group absolute w-56 sm:w-72 p-5 rounded-xl bg-black/90 border border-white/20 backdrop-blur-md shadow-2xl pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-black hover:z-50 hover:border-white/40 hover:shadow-[0_0_30px_rgba(245,19,19,0.2)]
                ${exp.align === 'right' ? 'left-[calc(100%+20px)] -translate-y-1/2' : 
                  exp.align === 'left' ? 'right-[calc(100%+20px)] -translate-y-1/2' : 
                  exp.align === 'top' ? 'bottom-[calc(100%+20px)] -translate-x-1/2' :
                  'top-[calc(100%+20px)] -translate-x-1/2'}
              `}
            >
              <div className="text-[11px] text-[#f51313] font-mono mb-1 font-bold tracking-widest">{exp.period}</div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-1 leading-tight">{exp.title}</h3>
              <p className="text-sm text-white/60 font-light">{exp.company}</p>
              
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                 <div className="overflow-hidden">
                    <ul className="mt-4 space-y-2 text-xs text-white/70 list-disc list-inside">
                       {exp.details.map((detail, idx) => (
                           <li key={idx} className="leading-relaxed">{detail}</li>
                       ))}
                    </ul>
                 </div>
              </div>
            </div>
          </div>
        ))}


      </div>
    </section>
  );
}
