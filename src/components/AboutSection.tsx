import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Maximize2 } from 'lucide-react';

import sophieImg from '../assets/images/team_sophie.jpg';
import thomasImg from '../assets/images/team_thomas.jpg';
import camilleImg from '../assets/images/team_camille.jpg';
import nicolasImg from '../assets/images/team_nicolas.jpg';
import videoPrez from '../assets/videos/video-prez.mp4';

interface AboutSectionProps {
  onNavigate: (sectionId: string) => void;
}

const teamMembers = [
  {
    id: 'sophie',
    name: 'SOPHIE',
    role: 'Directrice',
    image: sophieImg,
    bio: "Passionnée par la transmission et les relations humaines, Sophie veille au bon fonctionnement de l'école et à la qualité de votre parcours. Elle est votre interlocutrice privilégiée pour toutes vos questions."
  },
  {
    id: 'thomas',
    name: 'THOMAS',
    role: 'Moniteur moto',
    image: thomasImg,
    bio: "Expert de la conduite deux-roues, Thomas vous accompagne avec patience et pédagogie pour faire de vous un motard en toute sécurité. Son approche rassurante est idéale pour les débutants."
  },
  {
    id: 'camille',
    name: 'CAMILLE',
    role: 'Monitrice',
    image: camilleImg,
    bio: "Douce et à l'écoute, Camille sait mettre en confiance les élèves les plus stressés pour un apprentissage serein et progressif. Elle vous prépare à l'examen dans les meilleures conditions."
  },
  {
    id: 'nicolas',
    name: 'NICOLAS',
    role: 'Responsable pédagogique',
    image: nicolasImg,
    bio: "Garant de notre méthode d'enseignement, Nicolas s'assure que chaque formation répond à nos exigences de qualité et de réussite. Il élabore des programmes personnalisés et adaptés."
  }
];

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const [activeMember, setActiveMember] = useState(teamMembers[0]);
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

      {/* Team Section */}
      <div id="team-section" className="mb-8 scroll-mt-28">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-black uppercase text-white mb-2"
        >
          NOTRE ÉQUIPE
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 text-sm mb-8"
        >
          Découvrez les visages qui vous accompagnent vers la réussite.
        </motion.p>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {teamMembers.map((member, idx) => (
            <motion.button
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + (idx * 0.1) }}
              onClick={() => setActiveMember(member)}
              className={`relative overflow-hidden rounded-xl border transition-all duration-300 group flex flex-col text-left ${
                activeMember.id === member.id 
                  ? 'border-[#ff4d00] bg-zinc-900 shadow-[0_0_15px_rgba(255,77,0,0.15)]' 
                  : 'border-zinc-800 bg-black/40 hover:border-zinc-600 hover:bg-zinc-900/60'
              }`}
            >
              <div className="aspect-square w-full overflow-hidden bg-zinc-900">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    activeMember.id === member.id ? 'scale-105 opacity-100' : 'grayscale opacity-70 group-hover:grayscale-[50%] group-hover:opacity-90'
                  }`} 
                />
                {/* Gradient overlay for blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-4 sm:p-5 text-center relative z-10 -mt-8">
                <h3 className="font-bold text-white text-base sm:text-lg tracking-wide uppercase drop-shadow-md">
                  {member.name}
                </h3>
                <p className="text-zinc-400 text-xs mt-0.5">{member.role}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detailed Member View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMember.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 md:p-8"
          >
            <div className="w-full md:w-1/3 aspect-[4/5] sm:aspect-square overflow-hidden rounded-xl border border-zinc-800 shrink-0">
              <img 
                src={activeMember.image} 
                alt={activeMember.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="w-full md:w-2/3 flex flex-col items-start text-left pt-2 md:pt-4">
              <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-wider mb-2">
                {activeMember.name}
              </h3>
              <p className="text-white font-bold text-sm tracking-widest mb-6">
                {activeMember.role}
              </p>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                {activeMember.bio}
              </p>
              <button 
                onClick={() => onNavigate('contact')} 
                className="flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff5e1a] text-white px-6 py-3 rounded text-xs font-bold tracking-wider uppercase transition-colors shadow-lg shadow-[#ff4d00]/20"
              >
                NOUS CONTACTER <Plus className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
