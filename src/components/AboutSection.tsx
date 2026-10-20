import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Maximize2 } from 'lucide-react';

import videoPrez from '../assets/videos/video-prez.mp4';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleToggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen();
      }
    }
  };

  return (
    <section id="about-section" className="py-24 px-4 md:px-8 max-w-7xl mx-auto w-full relative">
      {/* Top Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-24 relative">
        <div className="lg:col-span-6 max-w-xl">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-2 tracking-tight text-white"
          >
            À PROPOS <br />
            <span className="text-[#ff4d00]">DE NOUS</span>
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#ff4d00] font-bold tracking-wide uppercase mb-6"
          >
            L'AUTO-ÉCOLE NOUVELLE GÉNÉRATION.
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8"
          >
            Notre mission : vous accompagner avec écoute et bienveillance,
            en vous offrant un apprentissage sur mesure et une expérience
            agréable. Notre objectif : Faire de vous un(e) conducteur(trice)
            confiant(e), responsable et prêt(e) à prendre la route.
          </motion.p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full bg-[#ff4d00] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#ff5e1a] transition duration-300 shadow-[0_0_20px_rgba(255,77,0,0.4)]"
            >
              NOUS REJOINDRE
            </button>
          </div>
        </div>

        {/* Right Column: Presentation Video Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 relative group"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-[#ff4d00]/30 to-[#ff4d00]/10 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition duration-700 pointer-events-none" />
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl aspect-[16/10] sm:aspect-[16/9]">
            {/* HTML5 Video */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            >
              <source src={videoPrez} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Fullscreen Toggle Button */}
            <button
              onClick={handleToggleFullscreen}
              className="absolute bottom-4 right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-[#ff4d00] border border-white/20 text-white hover:text-black transition-all duration-300 shadow-xl backdrop-blur-md hover:scale-110 cursor-pointer group/btn"
              title="Plein écran"
              aria-label="Afficher la vidéo en plein écran"
            >
              <Maximize2 className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
