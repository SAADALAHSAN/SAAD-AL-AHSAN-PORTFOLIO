import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { ArrowRight, Terminal, Code, LineChart, GraduationCap, Mail, Send, Award, Download, Rss, ArrowUpRight } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import { animate, motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
const TechStack = lazy(() => import('./TechStack'));
import ExperienceTimeline from './ExperienceTimeline';
import heroVideo from './assets/hero-video.mp4';
import aboutVideo from './assets/about-bg.mp4';
import skillsVideo from './assets/skills-bg.mp4';
import footerVideo from './assets/footer-bg.mp4';
import profilePic from './assets/profile-placeholder.png';

import { WordsPullUp, WordsPullUpMultiStyle, ScrollAnimatedText, BasicFadeUp, CardGrid } from './Animations';

const postsData = [
  {
    platform: "X / Twitter",
    date: "Apr 2026",
    text: "Power. Money. Knowledge. Proximity. In that order. Most people never figure out the sequence.",
    link: "https://x.com/saad_al_ahsan"
  },
  {
    platform: "Telegram",
    date: "Mar 2026",
    text: "The world does not wait for you to be ready. Move now or watch someone else take the position you wanted.",
    link: "https://t.me/StevenO_o"
  },
  {
    platform: "X / Twitter",
    date: "Mar 2026",
    text: "No risk no story. A safe life is just a slow death with a comfortable bed.",
    link: "https://x.com/saad_al_ahsan"
  },
  {
    platform: "LinkedIn",
    date: "Feb 2026",
    text: "Built 3 Web3 projects from nothing. Lost some. Won some. Planning 100 more. The count is what matters.",
    link: "https://linkedin.com/in/saad-al-ahsan"
  },
  {
    platform: "Telegram",
    date: "Feb 2026",
    text: "Everyone in this world is flawed. Stop looking for perfect people. Find the ones who are least flawed and keep them close.",
    link: "https://t.me/StevenO_o"
  },
  {
    platform: "X / Twitter",
    date: "Jan 2026",
    text: "Networking is not optional if you want to win. Your network is literally your net worth. Build it early.",
    link: "https://x.com/saad_al_ahsan"
  },
  {
    platform: "X / Twitter",
    date: "May 2026",
    text: "\"Nothing in this world can take the place of persistence. Talent will not; nothing is more common than unsuccessful men with talent. Genius will not; unrewarded genius is almost a proverb. Education will not; the world is full of educated derelicts. Persistence and determination alone are omnipotent. The slogan 'Press On!' has solved and always will solve the problems of the human race.\" - Calvin Coolidge",
    link: "https://x.com/saad_al_ahsan"
  }
];

export default function App() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Cinematic loading delay to allow assets and animations to initialize
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Video autoplay failed, possibly due to browser restrictions:", err);
      });
    }
  }, []);

  const scrollToSection = (e: React.MouseEvent | React.FormEvent, targetId: string) => {
    if (e) e.preventDefault();
    const target = document.querySelector(targetId) as HTMLElement;
    if (!target) return;

    // Cinematic Smooth Scroll
    window.scrollTo({
      top: target.offsetTop,
      behavior: 'smooth'
    });

    // Clean, visible transition effect (Subtle zoom-out and dim)
    animate("#main-content-wrapper", 
      { 
        scale: [1, 0.95, 1],
        opacity: [1, 0.2, 1]
      },
      { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1] // Smooth Apple-like easing
      }
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Smooth Reveal Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('section:not(#experience)');
    sections.forEach((section) => {
      section.classList.add('reveal-hidden');
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isAppLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505]"
          >
            <div className="relative flex flex-col items-center">
              <div className="w-16 h-16 relative mb-8">
                <div className="absolute inset-0 border-2 border-white/10 border-t-[#fdba74] rounded-full animate-spin" style={{ animationDuration: '1s' }} />
                <div className="absolute inset-2 border-2 border-white/5 border-l-[#fdba74] rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
                <div className="absolute inset-4 bg-[#fdba74]/20 rounded-full animate-pulse shadow-[0_0_30px_rgba(253,186,116,0.3)]" />
              </div>
              
              <div className="text-white/80 font-mono text-sm tracking-[0.3em] uppercase flex items-center gap-2">
                Initializing <span className="animate-pulse text-[#fdba74]">...</span>
              </div>
              <div className="mt-4 text-white/30 font-mono text-[10px] tracking-widest uppercase">
                Loading System Assets
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="main-content-wrapper" className={`bg-black font-sans text-white selection:bg-white/30 overflow-x-hidden min-h-screen origin-center transition-all duration-1000 delay-500 ${isAppLoading ? 'h-screen overflow-hidden opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
      
      {/* HERO SECTION */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
        {/* Background Video Layer */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)] pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/10 to-black/90 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-black/20 mix-blend-overlay pointer-events-none" />

        {/* Navigation / Header */}
        <header className="absolute top-0 w-full z-30 px-6 py-6 sm:px-12 flex justify-between items-center">
          <div className="text-xl font-bold tracking-widest uppercase cursor-pointer relative z-10" data-cursor="icons">
            SAAD<span className="text-white/50">.</span>
          </div>
          
          {/* Centered Navigation */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-2 text-sm font-medium tracking-wide text-white/80 bg-white/[0.02] p-1.5 rounded-full border border-white/5">
            <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="px-5 py-2 rounded-full transition-all duration-300 hover:text-white hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 border border-transparent hover:border-white/20" data-cursor="icons">About</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, '#experience')} className="px-5 py-2 rounded-full transition-all duration-300 hover:text-white hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 border border-transparent hover:border-white/20" data-cursor="icons">Experience</a>
            <a href="#skills" onClick={(e) => scrollToSection(e, '#skills')} className="px-5 py-2 rounded-full transition-all duration-300 hover:text-white hover:bg-white/10 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 border border-transparent hover:border-white/20" data-cursor="icons">Skills</a>
          </nav>
          
          <div className="w-16 relative z-10"></div> {/* Placeholder to keep flex layout balanced if needed */}
        </header>

        {/* Main Content */}
        <main className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
            <Terminal className="h-3.5 w-3.5 text-white/70" />
            <span>Founder And Risk Taker</span>
          </div>



          <WordsPullUpMultiStyle 
            className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl drop-shadow-2xl justify-center"
            segments={[
              { text: "No Risk", className: "text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70" },
              { text: "No Story.", className: "text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/40" }
            ]}
          />

          <BasicFadeUp delay={0.5}>
            <p className="mb-12 max-w-2xl text-lg sm:text-xl text-white/60 font-light tracking-wide leading-relaxed drop-shadow-md">
              I have spent four years in Web3. I build real projects. I am a trader who takes calculated risks. No corporate nonsense. Just shipping products and chasing actual knowledge.
            </p>
          </BasicFadeUp>

          <BasicFadeUp delay={0.7} className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a 
                href="#about" 
                onClick={(e) => scrollToSection(e, '#about')} 
                data-cursor="icons" 
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
              >
                Explore Portfolio
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

            </div>

            <a href="https://github.com/SAADALAHSAN" target="_blank" rel="noreferrer" data-cursor="icons" className="group inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:text-white/80 mt-4 sm:mt-0">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:border-white/40">
                <Github className="h-5 w-5 text-white" />
              </div>
              View GitHub
            </a>
          </BasicFadeUp>
        </main>

        <div className={`absolute bottom-0 w-full z-30 px-6 py-8 sm:px-12 flex justify-between items-end pointer-events-none transition-all duration-700 ease-in-out ${hasScrolled ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
          <div className="text-xs font-mono text-white/40 tracking-widest pointer-events-auto cursor-pointer hover:text-white transition-colors duration-300" data-cursor="icons">
            EST. 2021 // DHAKA, BD
          </div>
          <div 
            className="flex flex-col items-center gap-2 pointer-events-auto cursor-pointer group" 
            data-cursor="icons" 
            onClick={(e) => scrollToSection(e, '#about')}
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 origin-bottom -rotate-90 mb-8 whitespace-nowrap group-hover:text-white transition-colors duration-300">
              Scroll to discover
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent group-hover:from-white transition-colors duration-300" />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative py-24 sm:py-32 overflow-hidden border-t border-white/10">
        {/* Background Video Layer */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        >
          <source src={aboutVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-black/20 to-black pointer-events-none" />
        
        <div className="relative px-6 sm:px-12 max-w-6xl mx-auto z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start">
            {/* LEFT SIDE: Profile & Deep Conversation */}
            <div className="lg:col-span-6 space-y-10">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-4">
                <BasicFadeUp delay={0.1} className="relative shrink-0">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-[#050505]">
                    <img src={profilePic} alt="Saad Al Ahsan" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100" />
                  </div>
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-[#fdba74] rounded-full border-[3px] border-black flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                </BasicFadeUp>
                
                <div className="flex-1">
                  <BasicFadeUp delay={0.2} className="text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase mb-1">Overview</BasicFadeUp>
                  <WordsPullUp 
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3"
                    text="Saad Al Ahsan"
                  />
                  <BasicFadeUp delay={0.3}>
                    <div className="h-[2px] w-12 bg-[#fdba74]/80 rounded-full" />
                  </BasicFadeUp>
                </div>
              </div>

              {/* Deep Conversation Text */}
              <div className="relative pl-6 sm:pl-8 space-y-6">
                <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#fdba74]/50 via-[#fdba74]/20 to-transparent" />
                
                <BasicFadeUp delay={0.4}>
                  <p className="text-white/70 font-light leading-relaxed text-sm sm:text-base">
                    I have spent the last four years fully immersed in the Web3 ecosystem. I did not take the traditional corporate route. Instead, I learned by doing, trading, analyzing tokenomics, and hunting airdrops. That hands-on experience taught me how the space actually works, far beyond just the code.
                  </p>
                </BasicFadeUp>
                <BasicFadeUp delay={0.5}>
                  <p className="text-white/60 font-light leading-relaxed text-sm sm:text-base">
                    I am a trader who takes calculated risks and a founder who builds real projects. I have co-founded three companies and successfully launched tools like <strong className="text-[#fdba74] font-medium">PRUF Protocol</strong>, <strong className="text-[#fdba74] font-medium">Tradespy</strong>, and <strong className="text-[#fdba74] font-medium">Trollix</strong>. I do not care about corporate nonsense; I just care about shipping products that matter and chasing actual knowledge.
                  </p>
                </BasicFadeUp>
                <BasicFadeUp delay={0.6}>
                  <p className="text-white/50 font-light leading-relaxed text-sm sm:text-base">
                    The world changes fast, and you have to move faster to win. I already have plans to build over a hundred more projects in the coming years. For me, taking massive risks is the only way to truly live.
                  </p>
                </BasicFadeUp>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <BasicFadeUp delay={0.7}>
                  <a 
                    href="/Saad-Al-Ahsan-CV.png" 
                    download="Saad-Al-Ahsan-CV.png"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="icons"
                    className="group inline-flex items-center gap-3 px-6 py-3 border border-white/20 bg-[#050505] text-[10px] sm:text-xs font-mono tracking-[0.2em] text-white uppercase transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:text-[#fdba74]"
                  >
                    Download CV
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45" />
                  </a>
                </BasicFadeUp>
              </div>
            </div>

            {/* RIGHT SIDE: The Existing Boxes */}
            <div className="lg:col-span-6 flex flex-col justify-center h-full space-y-6 lg:pl-8 lg:border-l lg:border-white/[0.05] mt-12 lg:mt-0">
              
              <BasicFadeUp delay={0.4} className="text-xs font-mono tracking-[0.2em] text-white/30 uppercase mb-2 hidden lg:block">System Metrics</BasicFadeUp>

              {/* BLOCK 1: STAT ROW */}
              <BasicFadeUp delay={0.5}>
                <div className="border border-white/10 rounded-2xl p-6 bg-[#050505]/80 flex items-center justify-between backdrop-blur-xl hover:border-white/20 transition-all duration-300 group">
                  <div className="flex-1 text-center border-r border-white/10">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-[#fdba74] transition-colors">4+</div>
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40">Years in Web3</div>
                  </div>
                  <div className="flex-1 text-center border-r border-white/10">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-[#fdba74] transition-colors">100+</div>
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40">Projects Planned</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-[#fdba74] transition-colors">3</div>
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40">Companies Built</div>
                  </div>
                </div>
              </BasicFadeUp>

              {/* BLOCK 2: CORE ETHOS */}
              <BasicFadeUp delay={0.6}>
                <div className="relative border border-white/10 rounded-2xl p-6 sm:p-8 bg-[#050505]/80 backdrop-blur-xl overflow-hidden group hover:border-[#fdba74]/40 transition-all duration-500">
                  {/* Ambient Glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#fdba74]/10 rounded-full blur-3xl group-hover:bg-[#fdba74]/20 transition-colors duration-700 pointer-events-none" />
                  
                  <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="h-[1px] w-8 bg-[#fdba74]/70" />
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#fdba74]/90">Core Ethos</span>
                  </div>
                  
                  <blockquote className="text-lg sm:text-xl font-medium text-white leading-snug mb-8 relative z-10">
                    "No risk, no story. Risk is the only way to actually live."
                  </blockquote>
                  
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
                    <div className="p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] hover:border-[#fdba74]/30 transition-all duration-300">
                      <div className="text-white/30 font-mono text-[9px] sm:text-[10px] mb-1 tracking-wider">01</div>
                      <div className="text-white/80 text-xs sm:text-sm font-bold tracking-wide group-hover:text-white transition-colors">Power</div>
                    </div>
                    <div className="p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] hover:border-[#fdba74]/30 transition-all duration-300">
                      <div className="text-white/30 font-mono text-[9px] sm:text-[10px] mb-1 tracking-wider">02</div>
                      <div className="text-white/80 text-xs sm:text-sm font-bold tracking-wide group-hover:text-white transition-colors">Money</div>
                    </div>
                    <div className="p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] hover:border-[#fdba74]/30 transition-all duration-300">
                      <div className="text-white/30 font-mono text-[9px] sm:text-[10px] mb-1 tracking-wider">03</div>
                      <div className="text-white/80 text-xs sm:text-sm font-bold tracking-wide group-hover:text-white transition-colors">Knowledge</div>
                    </div>
                    <div className="p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.05] hover:border-[#fdba74]/30 transition-all duration-300">
                      <div className="text-white/30 font-mono text-[9px] sm:text-[10px] mb-1 tracking-wider">04</div>
                      <div className="text-white/80 text-xs sm:text-sm font-bold tracking-wide group-hover:text-white transition-colors">Proximity</div>
                    </div>
                  </div>
                </div>
              </BasicFadeUp>

              {/* BLOCK 3: CURRENT FOCUS LINE */}
              <BasicFadeUp delay={0.7}>
                <div className="border border-white/10 rounded-xl px-4 py-3 sm:px-5 bg-[#050505]/80 flex items-center gap-3 backdrop-blur-xl">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#fdba74] shadow-[0_0_10px_rgba(253,186,116,0.6)] animate-pulse shrink-0" />
                  <div className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-wider shrink-0">Currently building</div>
                  <div className="text-white/10">|</div>
                  <div className="text-white/70 text-[10px] sm:text-xs font-mono truncate">Web apps, Web3 tools and trading systems</div>
                </div>
              </BasicFadeUp>

            </div>
          </div>
        </div>
      </section>


      {/* EXPERIENCE SECTION */}
      <ExperienceTimeline />

      {/* SKILLS SECTION */}
      <section id="skills" className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-hidden border-t border-white/10">
        <div className="relative px-6 sm:px-12 max-w-6xl mx-auto z-20">
          <div className="mb-16 flex items-center gap-4">
            <Code className="w-6 h-6 text-white/50" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Expertise & Skills</h2>
          </div>
          
          {/* INTERACTIVE TECH STACK 3D BALLS */}
          <div className="mb-16">
            <Suspense fallback={<LoadingScreen />}>
              <TechStack />
            </Suspense>
          </div>
          
          <CardGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="relative overflow-hidden p-8 pt-12 rounded-2xl border border-white/[0.08] bg-[#050505]/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#fdba74]/40 hover:shadow-[0_20px_40px_-15px_rgba(253,186,116,0.15)] group" data-cursor="icons">
              {/* Terminal Header */}
              <div className="absolute top-0 left-0 w-full px-5 py-3 bg-white/[0.02] border-b border-white/[0.05] flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#ff5f56] transition-colors duration-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#ffbd2e] transition-colors duration-300 delay-75" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#27c93f] transition-colors duration-300 delay-150" />
                </div>
                <span className="text-[10px] font-mono text-white/20 group-hover:text-[#fdba74]/50 transition-colors tracking-widest uppercase">sys.01</span>
              </div>
              
              <div className="relative z-10">
                <Terminal className="w-8 h-8 text-white/30 group-hover:text-[#fdba74] transition-all duration-500 mb-6 group-hover:scale-110 drop-shadow-md" />
                <h3 className="text-lg font-bold mb-4 tracking-wide text-white/90 group-hover:text-white transition-colors">Programming</h3>
                
                <div className="font-mono text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-[#fdba74]/60 font-bold mt-0.5">{">_"}</span>
                    <span className="text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">
                      Java, Python, Node.js, HTML, AI Infrastructure, Cloud Migration, Cybersecurity, Automated Bots.
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#fdba74]/0 via-[#fdba74]/5 to-[#fdba74]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

            {/* Card 2 */}
            <div className="relative overflow-hidden p-8 pt-12 rounded-2xl border border-white/[0.08] bg-[#050505]/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#fdba74]/40 hover:shadow-[0_20px_40px_-15px_rgba(253,186,116,0.15)] group" data-cursor="icons">
              <div className="absolute top-0 left-0 w-full px-5 py-3 bg-white/[0.02] border-b border-white/[0.05] flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#ff5f56] transition-colors duration-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#ffbd2e] transition-colors duration-300 delay-75" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#27c93f] transition-colors duration-300 delay-150" />
                </div>
                <span className="text-[10px] font-mono text-white/20 group-hover:text-[#fdba74]/50 transition-colors tracking-widest uppercase">sys.02</span>
              </div>
              
              <div className="relative z-10">
                <Code className="w-8 h-8 text-white/30 group-hover:text-[#fdba74] transition-all duration-500 mb-6 group-hover:scale-110 drop-shadow-md" />
                <h3 className="text-lg font-bold mb-4 tracking-wide text-white/90 group-hover:text-white transition-colors">Web3 & Blockchain</h3>
                
                <div className="font-mono text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-[#fdba74]/60 font-bold mt-0.5">{">_"}</span>
                    <span className="text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">
                      Project Analysis, Tokenomics, Exchange Listings, Airdrop Hunting, Token Marketing, Community Building.
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#fdba74]/0 via-[#fdba74]/5 to-[#fdba74]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

            {/* Card 3 */}
            <div className="relative overflow-hidden p-8 pt-12 rounded-2xl border border-white/[0.08] bg-[#050505]/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#fdba74]/40 hover:shadow-[0_20px_40px_-15px_rgba(253,186,116,0.15)] group" data-cursor="icons">
              <div className="absolute top-0 left-0 w-full px-5 py-3 bg-white/[0.02] border-b border-white/[0.05] flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#ff5f56] transition-colors duration-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#ffbd2e] transition-colors duration-300 delay-75" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#27c93f] transition-colors duration-300 delay-150" />
                </div>
                <span className="text-[10px] font-mono text-white/20 group-hover:text-[#fdba74]/50 transition-colors tracking-widest uppercase">sys.03</span>
              </div>
              
              <div className="relative z-10">
                <LineChart className="w-8 h-8 text-white/30 group-hover:text-[#fdba74] transition-all duration-500 mb-6 group-hover:scale-110 drop-shadow-md" />
                <h3 className="text-lg font-bold mb-4 tracking-wide text-white/90 group-hover:text-white transition-colors">Finance & Trading</h3>
                
                <div className="font-mono text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-[#fdba74]/60 font-bold mt-0.5">{">_"}</span>
                    <span className="text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">
                      Forex & Crypto Trading, Market Analysis, Risk Management, Portfolio Management.
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#fdba74]/0 via-[#fdba74]/5 to-[#fdba74]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>

            {/* Card 4 */}
            <div className="relative overflow-hidden p-8 pt-12 rounded-2xl border border-white/[0.08] bg-[#050505]/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#fdba74]/40 hover:shadow-[0_20px_40px_-15px_rgba(253,186,116,0.15)] group" data-cursor="icons">
              <div className="absolute top-0 left-0 w-full px-5 py-3 bg-white/[0.02] border-b border-white/[0.05] flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#ff5f56] transition-colors duration-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#ffbd2e] transition-colors duration-300 delay-75" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10 group-hover:bg-[#27c93f] transition-colors duration-300 delay-150" />
                </div>
                <span className="text-[10px] font-mono text-white/20 group-hover:text-[#fdba74]/50 transition-colors tracking-widest uppercase">sys.04</span>
              </div>
              
              <div className="relative z-10">
                <Award className="w-8 h-8 text-white/30 group-hover:text-[#fdba74] transition-all duration-500 mb-6 group-hover:scale-110 drop-shadow-md" />
                <h3 className="text-lg font-bold mb-4 tracking-wide text-white/90 group-hover:text-white transition-colors">Soft Skills</h3>
                
                <div className="font-mono text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-[#fdba74]/60 font-bold mt-0.5">{">_"}</span>
                    <span className="text-white/50 leading-relaxed group-hover:text-white/80 transition-colors">
                      Leadership, Cross-functional Team Collaboration, Conflict Resolution, Strategic Planning.
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#fdba74]/0 via-[#fdba74]/5 to-[#fdba74]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          </CardGrid>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden border-t border-white/10">
        {/* Background Video Layer */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute left-0 right-0 w-full h-[170%] object-cover z-0 opacity-30"
          style={{ bottom: '0', top: 'auto' }}
        >
          <source src={skillsVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-black/10 via-transparent via-transparent to-black pointer-events-none" />

        <div className="relative px-6 sm:px-12 max-w-6xl mx-auto z-20">
          <div className="mb-16 flex items-center gap-4">
          <GraduationCap className="w-6 h-6 text-white/50" />
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">Education & Certifications</h2>
        </div>
        
        <CardGrid className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div data-cursor="icons" className="p-6 border border-white/5 rounded-2xl bg-white/[0.01]">
            <h3 className="text-xl font-semibold mb-2">BSc in Computer Science and Engineering (CSE)</h3>
            <p className="text-white/50 font-medium mb-2">Southeast University, Dhaka, Bangladesh</p>
            <p className="text-white/40 font-mono text-sm">Expected 2029</p>
          </div>
          <div className="space-y-8">
            <div data-cursor="icons" className="p-6 border border-white/5 rounded-2xl bg-white/[0.01]">
              <h3 className="text-xl font-semibold mb-2">Certified Online Community Manager</h3>
              <p className="text-white/50 font-medium mb-1">Reference: Nayeem Rezvan (Owner, NRC & AA)</p>
            </div>
            <div data-cursor="icons" className="p-6 border border-white/5 rounded-2xl bg-white/[0.01]">
              <h3 className="text-xl font-semibold mb-2">Social Media Management Training</h3>
              <p className="text-white/50 font-medium mb-1">Advanced community engagement and growth strategies.</p>
            </div>
          </div>
        </CardGrid>
        </div>
      </section>

      {/* FROM THE FEED SECTION */}
      <section className="relative bg-[#050505] border-t border-white/10 pt-16 pb-32 overflow-hidden">
        {/* Glowing Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] pointer-events-none z-0 blur-3xl" style={{ background: 'radial-gradient(ellipse at center, rgba(245,19,19,0.08) 0%, transparent 70%)' }} />

        {/* CSS Keyframes for Marquee */}
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12 px-6 sm:px-12 relative z-10">
          <Rss className="w-5 h-5 text-white/50" />
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/80">From The Feed</h2>
        </div>

        {/* Marquee Wrapper */}
        <div className="w-full relative z-10 group">
          <div className="flex w-max group-hover:[animation-play-state:paused]" style={{ animation: 'marquee 40s linear infinite' }}>
            {/* Render cards twice for seamless loop */}
            {[...postsData, ...postsData].map((post, idx) => (
              <div key={idx} className="relative w-72 h-44 mx-3 flex-shrink-0 group/card">
                <a 
                  href={post.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="absolute top-0 left-0 w-full flex flex-col p-5 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md cursor-pointer transition-all duration-500 ease-out hover:border-white/30 hover:scale-[1.03] hover:shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(245,19,19,0.15)] z-10 hover:z-50 overflow-hidden min-h-[11rem] max-h-[11rem] hover:max-h-[500px]"
                >
                  {/* TOP ROW */}
                  <div className="flex items-center justify-between shrink-0">
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full border ${
                      post.platform === 'X / Twitter' ? 'border-white/20 text-white/60' :
                      post.platform === 'Telegram' ? 'border-blue-500/30 text-blue-400/70' :
                      'border-blue-400/30 text-blue-300/70'
                    }`}>
                      {post.platform}
                    </span>
                    <span className="text-[10px] text-white/30 font-mono">{post.date}</span>
                  </div>

                  {/* POST TEXT */}
                  <p className="text-sm text-white/70 leading-relaxed mt-3 mb-4 line-clamp-3 group-hover/card:line-clamp-none transition-all duration-300">
                    {post.text}
                  </p>

                  {/* BOTTOM ROW */}
                  <div className="mt-auto shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/20 ml-auto group-hover/card:text-white/60 transition-colors" />
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CINEMATIC TRANSITION ZONE */}
      <div className="h-16 sm:h-24 bg-black relative z-10" />

      {/* FOOTER / CONTACT */}
      <footer id="contact" className="relative pt-24 pb-16 sm:pt-32 overflow-hidden">
        {/* Background Video Layer */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        >
          <source src={footerVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none" />

        <div className="relative px-6 sm:px-12 max-w-4xl mx-auto z-20 text-center flex flex-col items-center">
          <WordsPullUp 
            className="text-4xl sm:text-6xl font-bold tracking-tight mb-6 justify-center"
            text="Networking Is Not Optional."
          />
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
            I am always open to builders traders and anyone with a real idea. Success requires networking. Reach out and let us build something that actually matters.
          </p>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-32">
            <a href="mailto:saadahsanmain@gmail.com" data-cursor="icons" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 text-sm font-medium backdrop-blur-md hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <Mail className="w-5 h-5 text-white/80" /> <span className="tracking-wide">Email Me</span>
            </a>
            <a href="https://t.me/StevenO_o" target="_blank" rel="noreferrer" data-cursor="icons" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 text-sm font-medium backdrop-blur-md hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <Send className="w-5 h-5 text-white/80" /> <span className="tracking-wide">Telegram</span>
            </a>
            <a href="https://linkedin.com/in/saad-al-ahsan" target="_blank" rel="noreferrer" data-cursor="icons" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 text-sm font-medium backdrop-blur-md hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <Linkedin className="w-5 h-5 text-white/80" /> <span className="tracking-wide">LinkedIn</span>
            </a>
            <a href="https://github.com/SAADALAHSAN" target="_blank" rel="noreferrer" data-cursor="icons" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all duration-300 text-sm font-medium backdrop-blur-md hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <Github className="w-5 h-5 text-white/80" /> <span className="tracking-wide">GitHub</span>
            </a>
          </div>

          {/* Bottom bar */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-white/30 border-t border-white/[0.06] pt-8">
            <p>© {new Date().getFullYear()} Saad Al Ahsan. All rights reserved.</p>
            <p className="mt-4 sm:mt-0">Based in Dhaka, Bangladesh</p>
          </div>
        </div>
      </footer>

    </div>
    </>
  );
}
