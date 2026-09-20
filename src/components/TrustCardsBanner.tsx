import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ShieldCheck, Compass, Star } from 'lucide-react';

export const TrustCardsBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.3 }}
      id="trust-banner-strip"
      className={`w-full pt-6 lg:pt-8 pb-2 z-20 relative bg-transparent ${className}`}
    >
      {/* Single Horizontal Row - Aligned on the exact same line with transparent background */}
      <div className="w-full flex flex-row items-center justify-between overflow-x-auto gap-4 sm:gap-6 lg:gap-8 pb-1 no-scrollbar">
        
        {/* 1. Google Review */}
        <div
          id="trust-item-google"
          className="flex items-center gap-3 shrink-0 pr-4 sm:pr-6 lg:pr-8 border-r border-white/15"
        >
          {/* Google Icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
            <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-white font-extrabold text-base sm:text-lg tracking-tight">4,9 / 5</span>
              <div className="flex items-center text-[#ffb400]">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
            <span className="text-zinc-300 text-xs sm:text-[13px] font-medium tracking-tight mt-1 whitespace-nowrap">
              sur Google <span className="text-zinc-400 text-xs">(61 avis)</span>
            </span>
          </div>
        </div>

        {/* 2. Taux de réussite */}
        <div
          id="trust-item-reussite"
          className="flex items-center gap-3 shrink-0 pr-4 sm:pr-6 lg:pr-8 border-r border-white/15"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 text-[#ff4d00]">
            <Trophy className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-zinc-400 text-[11px] sm:text-xs font-semibold leading-tight whitespace-nowrap">
              Taux de réussite
            </span>
            <span className="text-white font-black text-base sm:text-lg tracking-tight leading-tight whitespace-nowrap">
              98 %
            </span>
            <span className="text-zinc-400 text-[10px] sm:text-[11px] leading-tight whitespace-nowrap">
              au 1er passage
            </span>
          </div>
        </div>

        {/* 3. Agrément n° */}
        <div
          id="trust-item-agrement"
          className="flex items-center gap-3 shrink-0 pr-4 sm:pr-6 lg:pr-8 border-r border-white/15"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 text-[#ff4d00]">
            <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-zinc-400 text-[11px] sm:text-xs font-semibold leading-tight whitespace-nowrap">
              Agrément n°
            </span>
            <span className="text-white font-black text-sm sm:text-base tracking-wide font-mono leading-tight whitespace-nowrap">
              E2037500010
            </span>
            <span className="text-zinc-400 text-[10px] sm:text-[11px] leading-tight whitespace-nowrap">
              Établissement agréé
            </span>
          </div>
        </div>

        {/* 4. Qualiopi */}
        <div
          id="trust-item-qualiopi"
          className="flex items-center gap-3 shrink-0 pr-4 sm:pr-6 lg:pr-8 border-r border-white/15"
        >
          {/* Qualiopi SVG Emblem */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0">
            <div className="flex flex-col items-center justify-center">
              <span className="text-[12px] sm:text-[13px] font-black tracking-tight text-zinc-900 leading-none">
                Quali<span className="text-[#ff4d00]">opi</span>
              </span>
              <div className="flex items-center gap-0.5 mt-1">
                <span className="w-1.5 h-1.5 bg-[#4285F4] rotate-45" />
                <span className="w-1.5 h-1.5 bg-[#ff4d00] rotate-45" />
                <span className="w-1.5 h-1.5 bg-white rotate-45" />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-white font-extrabold text-sm sm:text-base tracking-tight leading-tight whitespace-nowrap">
              Certification Qualiopi
            </span>
            <span className="text-zinc-400 text-[11px] sm:text-xs font-medium leading-tight mt-0.5 whitespace-nowrap">
              processus certifié
            </span>
          </div>
        </div>

        {/* 5. Accompagnement personnalisé */}
        <div
          id="trust-item-accompagnement"
          className="flex items-center gap-3 shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 text-[#ff4d00]">
            <Compass className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.2]" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-white font-extrabold text-sm sm:text-base tracking-tight leading-tight whitespace-nowrap">
              Accompagnement personnalisé
            </span>
            <span className="text-zinc-400 text-[11px] sm:text-xs font-medium leading-tight mt-0.5 whitespace-nowrap">
              Un suivi humain à chaque étape
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
