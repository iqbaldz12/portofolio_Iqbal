import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,12 2,6" />
  </svg>
);

export const Hero = () => {
  const [terminalLines, setTerminalLines] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalLines(prev => {
        if (prev < 9) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 250);
    return () => clearInterval(timer);
  }, []);

  const getTerminalLine = (index: number) => {
    switch (index) {
      case 0: return <><span className="text-theme-purple">$</span> <span className="text-theme-amber">cat profile.json</span></>;
      case 1: return <span className="text-theme-text3">{'{'}</span>;
      case 2: return <><span className="text-theme-muted">  "name":</span> <span className="text-theme-green">"Muhamad Iqbal Dzulkarnaen"</span></>;
      case 3: return <><span className="text-theme-muted">  "role":</span> <span className="text-theme-green">"Fullstack Web Developer"</span></>;
      case 4: return <><span className="text-theme-muted">  "location":</span> <span className="text-theme-green">"Bandung, Indonesia 🇮🇩"</span></>;
      case 5: return <><span className="text-theme-muted">  "stack":</span> <span className="text-theme-green">["Laravel","PHP","MySQL","Git","PostgreSQL"]</span></>;
      case 6: return <><span className="text-theme-muted">  "available":</span> <span className="text-theme-green">true ✅</span></>;
      case 7: return <span className="text-theme-text3">{'}'}</span>;
      case 8: return <><span className="text-theme-purple">$</span> <span className="term-cur"></span></>;
      default: return null;
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Backgrounds */}
      <div className="absolute inset-0 pointer-events-none bg-hero-grid bg-[length:56px_56px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_20%,transparent_80%)]" />
      <div className="absolute inset-0 pointer-events-none bg-hero-glow" />

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10 max-w-7xl">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col relative z-10 lg:pr-10"
        >
          <div className="inline-flex items-center gap-2 bg-theme-purple/10 border border-theme-border text-theme-purple font-mono text-xs px-3.5 py-1.5 rounded-full mb-7 w-fit tracking-wider">
            <span className="badge-dot" /> Open to opportunities
          </div>

          <h1 className="font-display text-[clamp(2.4rem,6.5vw,4.5rem)] font-bold tracking-tight leading-[1.08] mb-2.5">
            Muhamad Iqbal<br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Dzulkarnaen</span>
          </h1>

          <p className="font-display text-[clamp(1.1rem,2.8vw,1.5rem)] text-theme-muted mb-8 min-h-[2.4rem]">
            <TypeAnimation
              sequence={[
                'Laravel Developer', 2000,
                'Backend Engineer', 2000,
                'Fullstack Builder', 2000,
                'API Craftsman', 2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-theme-amber font-semibold"
              repeat={Infinity}
              cursor={false}
            />
            <span className="cursor-blink" />
          </p>

          {/* Terminal Signature */}
          <div className="bg-theme-bgSecondary border border-theme-border rounded-xl overflow-hidden mb-9 max-w-[560px] shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.07)]">
            <div className="bg-theme-cardHover px-4 py-2.5 flex items-center gap-1.5 border-b border-white/5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
              <span className="font-mono text-[0.68rem] text-theme-text3 mx-auto -translate-x-3">~/iqbal — zsh</span>
            </div>
            <div className="p-4 md:p-5 font-mono text-xs md:text-[0.78rem] leading-[1.95] flex flex-col gap-1.5">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                i < terminalLines && (
                  <div key={i} className="tl flex flex-wrap gap-1">
                    {getTerminalLine(i)}
                  </div>
                )
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3.5">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-sans text-[0.88rem] font-semibold bg-theme-purple text-white hover:bg-[#5A52E5] hover:-translate-y-0.5 hover:shadow-[0_8px_26px_rgba(108,99,255,0.38)] transition-all duration-200"
            >
              <GithubIcon />
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-lg font-sans text-[0.88rem] font-semibold bg-transparent text-theme-mutedLight border border-white/10 hover:border-theme-purple hover:text-theme-purple hover:-translate-y-0.5 transition-all duration-200"
            >
              <SendIcon />
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Right Content - Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center md:justify-end hidden md:flex"
        >
          <div className="relative w-[340px] h-[340px] md:w-[420px] md:h-[420px] mt-8 md:mt-0">
            {/* The Backdrop Box matching the theme (not pitch black) */}
            <div className="absolute inset-0 bg-theme-bgSecondary/60 backdrop-blur-sm border border-theme-purple/20 rounded-xl overflow-hidden flex items-center justify-center shadow-lg">
              {/* Optional inner subtle grid */}
              <div className="absolute inset-0 bg-hero-grid bg-[length:40px_40px] opacity-[0.15]" />
            </div>
            
            {/* Availability Badge inside the backdrop box (bottom left) */}
            <div className="absolute bottom-6 left-6 bg-theme-bg border border-theme-purple/30 px-4 py-3 shadow-xl z-20 rounded-lg backdrop-blur-md">
              <p className="text-[9px] text-theme-muted uppercase tracking-[0.2em] font-mono mb-2">AVAILABILITY</p>
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-theme-green shadow-[0_0_8px_rgba(40,202,65,0.5)] animate-pulse" />
                <span className="text-xs font-mono text-white">Open to Opportunities</span>
              </div>
            </div>

            {/* The Profile Image overlapping bottom-right */}
            <div className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-8 w-[240px] h-[320px] md:w-[280px] md:h-[380px] bg-theme-bg shadow-2xl z-10 rounded-xl overflow-hidden border border-theme-purple/20">
              <img
                src="./profil.jpeg"
                alt="Muhamad Iqbal Dzulkarnaen"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
