import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Settings, Gauge, ArrowRight, Sparkles } from 'lucide-react';
import formationBManuelle from '../assets/images/formation_b_manuelle.png';
import formationBAuto from '../assets/images/formation_b_auto.png';
import formationMotoA2 from '../assets/images/formation_moto_a2.png';
import { VehicleScrollCinematic } from './VehicleScrollCinematic';

interface VehiclesPageProps {
  onNavigate?: (sectionId: string) => void;
}

export const VehiclesPage: React.FC<VehiclesPageProps> = ({ onNavigate }) => {
  const vehicles = [
    {
      id: 'manuelle',
      name: 'Renault Clio V',
      type: 'Boîte Manuelle',
      folderName: 'clio_grise',
      fallbackImage: formationBManuelle,
      formationTarget: 'permis-b-meca',
      desc: "Véhicule de référence pour l'apprentissage de la conduite. Sa maniabilité et son confort en font l'outil idéal pour maîtriser la boîte manuelle dans des conditions optimales.",
      features: [
        { icon: <Settings className="w-5 h-5" />, label: 'Boîte manuelle 6 rapports' },
        { icon: <ShieldCheck className="w-5 h-5" />, label: 'Double commande auto-école' },
        { icon: <Gauge className="w-5 h-5" />, label: 'Motorisation dynamique' }
      ]
    },
    {
      id: 'auto',
      name: 'Renault Clio E-Tech',
      type: 'Boîte Automatique',
      folderName: 'clio_bleu',
      fallbackImage: formationBAuto,
      formationTarget: 'permis-b-auto',
      desc: "Apprentissage simplifié et sans stress. Concentrez-vous sur l'environnement et la sécurité grâce à une transmission automatique fluide et agréable.",
      features: [
        { icon: <Settings className="w-5 h-5" />, label: 'Boîte automatique' },
        { icon: <ShieldCheck className="w-5 h-5" />, label: 'Aides à la conduite (ADAS)' },
        { icon: <Gauge className="w-5 h-5" />, label: 'Motorisation hybride' }
      ]
    },
    {
      id: 'moto',
      name: 'Yamaha MT-07',
      type: 'Permis Moto A2',
      folderName: 'motoA2',
      fallbackImage: formationMotoA2,
      formationTarget: 'moto-a2',
      desc: "La moto la plus plébiscitée pour le permis A2. Légère, agile et sécurisante, elle pardonne les erreurs de débutant tout en offrant de belles sensations.",
      features: [
        { icon: <Settings className="w-5 h-5" />, label: 'Bicylindre 689cc (bridé 47,5 ch)' },
        { icon: <ShieldCheck className="w-5 h-5" />, label: 'ABS de série & protections' },
        { icon: <Gauge className="w-5 h-5" />, label: 'Légèreté & Agilité optimales' }
      ]
    }
  ];

  return (
    <main className="flex-1 pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full animate-in fade-in duration-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff4d00]/10 border border-[#ff4d00]/30 text-xs font-bold text-[#ff4d00] uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Animation Scroll 3D & Vue 360°
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-condensed tracking-wide uppercase mb-6">
          Notre flotte de <span className="text-[#ff4d00]">véhicules</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Apprenez sur des véhicules modernes, récents et parfaitement entretenus. Faites défiler la page ou glissez votre doigt pour inspecter chaque modèle sous tous les angles à 360°.
        </p>
      </motion.div>

      <div className="space-y-32">
        {vehicles.map((v, i) => (
          <motion.div 
            key={v.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
          >
            {/* 360 Cinematic Scroll Vehicle */}
            <div className="w-full lg:w-7/12 relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4d00]/25 via-transparent to-transparent blur-3xl rounded-full opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none" />
              
              <VehicleScrollCinematic
                folderName={v.folderName}
                totalFrames={120}
                fallbackImage={v.fallbackImage}
                badgeText={`${v.name} • 360°`}
              />
            </div>
            
            {/* Vehicle Details */}
            <div className="w-full lg:w-5/12 space-y-7">
              <div>
                <span className="text-[#ff4d00] font-bold tracking-[0.2em] uppercase text-xs sm:text-sm border border-[#ff4d00]/30 bg-[#ff4d00]/10 px-3 py-1 rounded-full">
                  {v.type}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-condensed uppercase mt-5 tracking-wide text-white">
                  {v.name}
                </h2>
              </div>
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
                {v.desc}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {v.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3.5 bg-white/5 border border-white/10 rounded-xl p-3.5 hover:border-[#ff4d00]/50 hover:bg-[#ff4d00]/5 transition-colors">
                    <div className="text-[#ff4d00] bg-black/30 p-2 rounded-lg shrink-0">
                      {f.icon}
                    </div>
                    <span className="font-semibold text-xs sm:text-sm text-zinc-200">{f.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="px-6 py-3 rounded-xl bg-[#ff4d00] text-black font-bold text-sm hover:bg-[#ff5e1a] transition-all shadow-[0_0_20px_rgba(255,77,0,0.3)] hover:shadow-[0_0_25px_rgba(255,77,0,0.5)] flex items-center gap-2 cursor-pointer"
                >
                  Réserver sur ce véhicule
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate?.('formations')}
                  className="px-5 py-3 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-colors cursor-pointer"
                >
                  Voir les formations
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
};

