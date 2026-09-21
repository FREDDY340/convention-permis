import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { TrustCardsBanner } from './TrustCardsBanner';
import { HeroVideoBackground } from './HeroVideoBackground';

interface HeroSectionProps {
  onOpenWork: () => void;
  onOpenShowreel: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenWork,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const certifications = [
    'Permis B',
    'Boîte manuelle',
    'Boîte automatique',
    'Conduite accompagnée',
    'Moto A2',
  ];

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-screen w-full flex flex-col justify-between bg-[#09090b] text-white px-4 md:px-8 pt-24 pb-8 lg:pt-32 lg:pb-12 select-none overflow-hidden"
    >
      {/* Cinematic Animated Video Background auto-playing in loop */}
      <HeroVideoBackground />

      {/* Main Grid Content */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10 flex-1 my-auto">
        {/* Left Column: Typography & Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
          }}
          className="lg:col-span-10 xl:col-span-9 flex flex-col justify-center space-y-6 md:space-y-8 my-auto"
        >
          {/* Top Intro Hook / Tag */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
            id="hero-greeting-badge"
            className="flex items-center flex-wrap gap-2 text-xs sm:text-sm tracking-[0.22em] font-bold uppercase text-zinc-300"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d00] shadow-[0_0_12px_#ff4d00] animate-pulse" />
            <span className="text-zinc-300">
              <span className="text-white font-extrabold">APPRENEZ.</span>{' '}
              <span className="text-[#ff4d00] font-extrabold">PROGRESSEZ.</span>{' '}
              <span className="text-white font-extrabold">PRENEZ CONFIANCE.</span>
            </span>
          </motion.div>

          {/* Monumental Headline: Prenez le volant de votre avenir */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
            id="hero-headline"
            className="space-y-0.5"
          >
            <h1 className="font-['Arial'] font-black tracking-[-0.02em] uppercase text-white leading-[0.92] text-4xl sm:text-5xl md:text-6xl lg:text-[5.2rem] xl:text-[6rem]">
              <span className="block">PRENEZ LE VOLANT</span>
              <span className="block">
                DE VOTRE{' '}
                <span className="text-[#ff4d00] drop-shadow-[0_0_35px_rgba(255,77,0,0.4)]">
                  AVENIR.
                </span>
              </span>
            </h1>
          </motion.div>

          {/* Subtitle / Bio Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
            id="hero-bio-paragraph"
            className="text-zinc-300 text-sm sm:text-base md:text-[17px] font-normal leading-relaxed max-w-2xl"
          >
            Une formation moderne et personnalisée, portée par une équipe qui vous connaît
            vraiment et vous accompagne à chaque étape.
          </motion.p>

          {/* Pills / Badges Formations */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
            id="hero-formations-pills"
            className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-0.5"
          >
            {certifications.map((item) => (
              <button
                key={item}
                onClick={onOpenWork}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-zinc-700/80 text-xs sm:text-[13px] tracking-wider uppercase font-semibold text-zinc-100 hover:border-[#ff4d00] hover:bg-[#ff4d00]/20 transition-colors shadow-[0_0_12px_rgba(0,0,0,0.5)] cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00]" />
                {item}
              </button>
            ))}
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
            }}
            id="hero-cta-group"
            className="flex flex-wrap items-center gap-5 sm:gap-7 pt-2"
          >
            {/* Primary CTA: VOIR LES FORMATIONS */}
            <button
              id="hero-btn-view-work"
              onClick={onOpenWork}
              className="group relative inline-flex items-center gap-4 pl-7 pr-3 py-3 rounded-full bg-[#ff4d00] hover:bg-[#ff5e1a] text-black font-black uppercase text-xs sm:text-sm tracking-[0.2em] transition-all duration-300 shadow-[0_0_25px_rgba(255,77,0,0.4)] hover:shadow-[0_0_35px_rgba(255,77,0,0.6)] cursor-pointer"
            >
              <span>NOS FORMATIONS</span>
              <span className="w-8 h-8 rounded-full bg-[#0d0d10] flex items-center justify-center text-white group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-4 h-4 text-[#ff4d00]" />
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Side Column: Vertical text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="hidden lg:flex lg:col-span-2 xl:col-span-3 h-full flex-col justify-between items-end text-right self-stretch py-2"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-4 h-4 rounded-full bg-[#ff4d00] shadow-[0_0_20px_#ff4d00,0_0_40px_rgba(255,77,0,0.6)] animate-pulse" />
            <div
              className="text-[11px] font-bold uppercase tracking-[0.35em] text-zinc-300 select-none"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
              }}
            >
              À VOUS LA ROUTE
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff4d00]/70" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Trust Cards Strip */}
      <TrustCardsBanner />
    </section>
  );
};
