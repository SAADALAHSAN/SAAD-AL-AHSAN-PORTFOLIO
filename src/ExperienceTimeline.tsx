import React, { useRef, useLayoutEffect } from 'react';
import { Briefcase } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  period: string;
  title: string;
  company: string;
  details: string[];
  align: 'left' | 'right';
}

const experiences: Experience[] = [
  {
    period: "2020 — 2023",
    title: "Exchange Listing Manager",
    company: "MEXC, LBank, Coinstore",
    details: ["Facilitated end-to-end token listing on major CEXs", "Key listing partner for multiple crypto projects"],
    align: "right"
  },
  {
    period: "2021 — 2024",
    title: "Community Manager",
    company: "NRC, Tradespy, Airdrop Accel",
    details: ["Managed and scaled massive user communities", "Educated users on crypto trends and airdrops"],
    align: "left"
  },
  {
    period: "2021 — Present",
    title: "Co-Founder & Project Lead",
    company: "PRUF Protocol, Tradespy",
    details: ["Launched innovative Web3 projects and ecosystems", "Led strategic development and tokenomics"],
    align: "right"
  },
  {
    period: "2025 — Present",
    title: "Software Developer",
    company: "Independent Projects",
    details: ["Developing modern web applications", "Integrating AI and Web3 technologies", "Building responsive, animated UI components"],
    align: "left"
  },
  {
    period: "2021 — Present",
    title: "Forex & Crypto Trader",
    company: "Prop Firm Funded Trader",
    details: ["Managed trading portfolios", "Deep expertise in technical analysis", "Strict risk management principles"],
    align: "right"
  }
];

// The winding SVG path data - curves left and right like a road
const CURVE_PATH = "M 400,0 C 400,80 150,100 150,180 C 150,260 650,280 650,360 C 650,440 150,460 150,540 C 150,620 650,640 650,720 C 650,800 400,820 400,900";

// The X positions where dots sit on the curve at each stop
const NODE_POSITIONS = [
  { cx: 400, cy: 90 },   // Stop 1 — near the first bend (right side)
  { cx: 150, cy: 270 },  // Stop 2 — left bend
  { cx: 650, cy: 450 },  // Stop 3 — right bend
  { cx: 150, cy: 630 },  // Stop 4 — left bend
  { cx: 650, cy: 810 },  // Stop 5 — right bend
];

export default function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- SVG Path Draw Animation (scrub with scroll) ---
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      }

      // --- Individual Node Animations ---
      experiences.forEach((exp, index) => {
        const nodeEl = `.timeline-node-${index}`;
        const dotEl = `.timeline-dot-${index}`;
        const pulseEl = `.timeline-pulse-${index}`;
        const cardEl = `.timeline-card-${index}`;
        const lineEl = `.timeline-line-${index}`;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: nodeEl,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });

        // 1. Dot glows red
        tl.to(dotEl, {
          backgroundColor: "#fdba74",
          borderColor: "#fdba74",
          boxShadow: "0 0 20px 5px rgba(253, 186, 116, 0.9), 0 0 45px 15px rgba(253, 186, 116, 0.6)",
          scale: 1.3,
          duration: 0.4,
          ease: "power2.out",
        });

        // 2. Pulse ring expands
        tl.to(pulseEl, {
          scale: 2.5,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.3");

        // 3. Connector line extends
        tl.fromTo(lineEl, 
          { scaleX: 0 }, 
          { scaleX: 1, duration: 0.3, ease: "power2.out" },
          "-=0.6"
        );

        // 4. Card fades + scales in from its side
        const xFrom = exp.align === 'right' ? 40 : -40;
        tl.fromTo(cardEl,
          { opacity: 0, scale: 0.85, x: xFrom },
          { opacity: 1, scale: 1, x: 0, duration: 0.5, ease: "back.out(1.4)" },
          "-=0.3"
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden border-t border-white/10"
    >
      {/* Section Header */}
      <div className="absolute top-8 left-6 sm:left-12 z-50 flex items-center gap-4">
        <Briefcase className="w-5 h-5 text-white/50" />
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-white/80">
          Career Map
        </h2>
      </div>

      {/* Timeline Container */}
      <div className="relative w-full max-w-4xl mx-auto mt-24 mb-32 px-4 sm:px-8">
        
        {/* SVG Winding Path */}
        <svg
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 900"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          {/* Background faint path (always visible) */}
          <path
            d={CURVE_PATH}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="2"
            strokeDasharray="8 8"
            fill="none"
          />
          {/* Animated drawn path */}
          <path
            ref={pathRef}
            d={CURVE_PATH}
            stroke="rgba(253, 186, 116, 0.9)"
            strokeWidth="3"
            filter="drop-shadow(0 0 12px rgba(253, 186, 116, 0.7))"
            fill="none"
          />
        </svg>

        {/* Timeline Nodes */}
        <div className="relative" style={{ height: '900px' }}>
          {experiences.map((exp, index) => {
            const pos = NODE_POSITIONS[index];
            const isRight = exp.align === 'right';

            return (
              <div
                key={index}
                className={`timeline-node-${index} absolute flex items-center z-20
                  flex-col sm:flex-row
                  ${isRight ? 'sm:flex-row' : 'sm:flex-row-reverse'}
                `}
                style={{
                  left: `${(pos.cx / 800) * 100}%`,
                  top: `${pos.cy}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Dot Container */}
                <div className="relative flex items-center justify-center shrink-0">
                  {/* Pulse Ring */}
                  <div
                    className={`timeline-pulse-${index} absolute w-4 h-4 rounded-full border-2 border-[#fdba74] shadow-[0_0_25px_#fdba74] opacity-100`}
                  />
                  {/* The Dot */}
                  <div
                    className={`timeline-dot-${index} w-4 h-4 rounded-full bg-white/20 border-2 border-white/50 relative z-10`}
                  />
                </div>

                {/* Connector Line (hidden on mobile) */}
                <div
                  className={`timeline-line-${index} hidden sm:block w-8 h-[1px] bg-white/20 shrink-0 origin-${isRight ? 'left' : 'right'}`}
                />

                {/* Info Card */}
                <div
                  className={`timeline-card-${index} opacity-0 group w-56 sm:w-64 p-5 mt-4 sm:mt-0 rounded-xl bg-black/90 backdrop-blur-md border border-white/20 shadow-2xl
                    pointer-events-auto cursor-pointer
                    transition-all duration-300
                    hover:scale-105 hover:bg-black hover:z-50
                    hover:border-white/40
                    hover:shadow-[0_0_40px_rgba(253,186,116,0.2)]
                  `}
                >
                  <div className="text-[11px] text-[#fdba74] drop-shadow-[0_0_10px_rgba(253,186,116,0.9)] font-mono mb-1.5 font-bold tracking-widest uppercase">
                    {exp.period}
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 leading-tight">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-white/60 font-light">
                    {exp.company}
                  </p>

                  {/* Expandable Details on Hover */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                    <div className="overflow-hidden">
                      <ul className="mt-4 space-y-2 text-xs text-white/70 list-disc list-inside">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
