import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Terminal, Code, LineChart, GraduationCap, Mail, Send, Award } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import TechStack from './TechStack';
import ExperienceTimeline from './ExperienceTimeline';
import heroVideo from './assets/hero-video.mp4';
import aboutVideo from './assets/about-bg.mp4';
import skillsVideo from './assets/skills-bg.mp4';
import footerVideo from './assets/footer-bg.mp4';
import { WordsPullUp, WordsPullUpMultiStyle, ScrollAnimatedText, BasicFadeUp, CardGrid } from './Animations';

gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Video autoplay failed, possibly due to browser restrictions:", err);
      });
    }
  }, []);

  const scrollToSection = (e, targetId) => {
    if (e) e.preventDefault();
    const target = document.querySelector(targetId);
    if (!target) return;

    // Cinematic Warp Scroll
    gsap.to(window, {
      duration: 1.6,
      scrollTo: { y: target, autoKill: true },
      ease: "expo.inOut",
    });

    // Subtle scale and blur "warp" effect on the whole page content
    gsap.fromTo("#main-content-wrapper", 
      { scale: 1, filter: "blur(0px)" },
      { 
        scale: 0.97, 
        filter: "blur(4px)", 
        duration: 0.8, 
        yoyo: true, 
        repeat: 1, 
        ease: "power2.inOut" 
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
    <div id="main-content-wrapper" className="bg-black font-sans text-white selection:bg-white/30 overflow-x-hidden min-h-screen origin-center">
      
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
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8 text-sm font-medium tracking-wide text-white/80">
            <a href="#about" onClick={(e) => scrollToSection(e, '#about')} className="hover:text-white transition-colors" data-cursor="icons">About</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, '#experience')} className="hover:text-white transition-colors" data-cursor="icons">Experience</a>
            <a href="#skills" onClick={(e) => scrollToSection(e, '#skills')} className="hover:text-white transition-colors" data-cursor="icons">Skills</a>
          </nav>
          
          <div className="w-16 relative z-10"></div> {/* Placeholder to keep flex layout balanced if needed */}
        </header>

        {/* Main Content */}
        <main className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
            <Terminal className="h-3.5 w-3.5 text-white/70" />
            <span>Web3 Entrepreneur & Dev</span>
          </div>

          <WordsPullUpMultiStyle 
            className="mb-6 text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl drop-shadow-2xl justify-center"
            segments={[
              { text: "Decentralized", className: "text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70" },
              { text: "Ecosystems.", className: "text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/40" }
            ]}
          />

          <BasicFadeUp delay={0.5}>
            <p className="mb-12 max-w-2xl text-lg sm:text-xl text-white/60 font-light tracking-wide leading-relaxed drop-shadow-md">
              Multidimensional Web3 Entrepreneur and Computer Science Engineer with 4+ years of experience architecting blockchain solutions, integrating AI infrastructure, and managing large-scale crypto communities.
            </p>
          </BasicFadeUp>

          <BasicFadeUp delay={0.7} className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, '#about')} 
              data-cursor="icons" 
              className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              Explore Portfolio
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a href="https://github.com/SAADALAHSAN" target="_blank" rel="noreferrer" data-cursor="icons" className="group inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-wider text-white transition-all hover:text-white/80">
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Bridging Technical Depth with <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Strategic Vision.</span>
              </h2>
            </div>
            <div className="md:col-span-7 space-y-12 text-white/70 font-light text-lg">
              <ScrollAnimatedText 
                text="As an active and multidimensional Web3 Entrepreneur and Computer Science Engineering (CSE) student, I bring over 4 years of hands-on experience navigating the fast-paced blockchain, cryptocurrency, and trading industries."
              />
              <ScrollAnimatedText 
                text="My journey evolved from managing large-scale online communities to co-founding successful Web3 projects like PRUF Protocol and Tradespy. I possess a unique combination of technical skills (Java, Python, Node.js), deep understanding of AI infrastructure & cybersecurity, and vast knowledge in Forex and Crypto trading."
              />
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
            <TechStack />
          </div>
          
          <CardGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-300 group" data-cursor="icons">
              <Terminal className="w-8 h-8 text-white/60 mb-6" />
              <h3 className="text-lg font-semibold mb-4">Programming</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Java, Python, Node.js, HTML, AI Infrastructure, Cloud Migration, Cybersecurity, Automated Bots.
              </p>
            </div>
            <div className="p-8 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-300 group" data-cursor="icons">
              <Code className="w-8 h-8 text-white/60 mb-6" />
              <h3 className="text-lg font-semibold mb-4">Web3 & Blockchain</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Project Analysis, Tokenomics, Exchange Listings, Airdrop Hunting, Token Marketing, Community Building.
              </p>
            </div>
            <div className="p-8 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-300 group" data-cursor="icons">
              <LineChart className="w-8 h-8 text-white/60 mb-6" />
              <h3 className="text-lg font-semibold mb-4">Finance & Trading</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Forex & Crypto Trading, Market Analysis, Risk Management, Portfolio Management.
              </p>
            </div>
            <div className="p-8 border border-white/10 bg-black/40 backdrop-blur-md rounded-2xl hover:bg-white/[0.05] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all duration-300 group" data-cursor="icons">
              <Award className="w-8 h-8 text-white/60 mb-6" />
              <h3 className="text-lg font-semibold mb-4">Soft Skills</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                Leadership, Cross-functional Team Collaboration, Conflict Resolution, Strategic Planning.
              </p>
            </div>
          </CardGrid>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="relative pt-12 pb-72 sm:pt-16 sm:pb-96 overflow-hidden border-t border-white/10">
        {/* Background Video Layer */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
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

      {/* CINEMATIC TRANSITION ZONE */}
      <div className="h-48 sm:h-64 bg-black relative z-10" />

      {/* FOOTER / CONTACT */}
      <footer id="contact" className="relative pt-48 pb-16 sm:pt-64 overflow-hidden">
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

        <div className="relative px-6 sm:px-12 max-w-6xl mx-auto z-20 text-center">
          <WordsPullUp 
            className="text-4xl sm:text-6xl font-bold tracking-tight mb-8 justify-center"
            text="Ready to Collaborate?"
          />
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12">
            Whether it's a new Web3 protocol, an exchange listing partnership, or a high-impact development project—let's build the future together.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-24">
            <a href="mailto:saadahsanmain@gmail.com" data-cursor="icons" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium backdrop-blur-md">
              <Mail className="w-4 h-4" /> Email
            </a>
            <a href="https://t.me/StevenO_o" target="_blank" rel="noreferrer" data-cursor="icons" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium backdrop-blur-md">
              <Send className="w-4 h-4" /> Telegram
            </a>
            <a href="https://linkedin.com/in/saad-al-ahsan" target="_blank" rel="noreferrer" data-cursor="icons" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium backdrop-blur-md">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="https://github.com/SAADALAHSAN" target="_blank" rel="noreferrer" data-cursor="icons" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium backdrop-blur-md">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-white/30 border-t border-white/10 pt-8">
            <p>© {new Date().getFullYear()} Saad Al Ahsan. All rights reserved.</p>
            <p className="mt-4 sm:mt-0">Based in Dhaka, Bangladesh</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
