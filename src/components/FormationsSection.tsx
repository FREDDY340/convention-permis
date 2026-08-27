import React from 'react';
import { motion } from 'motion/react';
import {
  Rocket,
  UserCheck,
  CalendarDays,
  CreditCard,
  Timer,
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

import formationBManuelle from '../assets/images/formation_b_manuelle.png';
import formationBAuto from '../assets/images/formation_b_auto.png';
import formationConduiteAccompagnee from '../assets/images/formation_conduite_accompagnee.png';
import formationMotoA2 from '../assets/images/formation_moto_a2.png';
import formationBManuelleStatic from '../assets/images/formation_b_manuelle.png';
import formationBAutoStatic from '../assets/images/formation_b_auto.png';
import formationMotoA2Static from '../assets/images/formation_moto_a2.png';
import formationConduiteAccompagneeStatic from '../assets/images/formation_conduite_accompagnee.png';
import { ClioScrollThumbnail } from './ClioScrollThumbnail';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut", 
      staggerChildren: 0.15 
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut" 
    } 
  }
};

interface FormationsSectionProps {
  onDiscover?: (category?: string) => void;
  onRegister?: (formationId?: string) => void;
  onOpenDetail?: (formationId: string) => void;
}

export const FormationsSection: React.FC<FormationsSectionProps> = ({
  onDiscover,
  onRegister,
  onOpenDetail,
}) => {
  const features = [
    {
      icon: <Rocket className="w-8 h-8 text-[#ff4d00]" />,
      title: 'Formations accélérées',
      desc: 'Une organisation pensée pour progresser dans des délais optimisés.',
    },
    {
      icon: <UserCheck className="w-8 h-8 text-[#ff4d00]" />,
      title: 'Moniteurs formés',
      desc: "Des formateurs diplômés d'Etat, pédagogues et engagés.",
    },
    {
      icon: <CalendarDays className="w-8 h-8 text-[#ff4d00]" />,
      title: 'Planning flexible',
      desc: 'Réservez et modifiez vos heures en ligne 24h/24.',
    },
    {
      icon: <CreditCard className="w-8 h-8 text-[#ff4d00]" />,
      title: 'Paiement facilité',
      desc: 'Régler votre formation en 3 ou 4 fois selon les conditions applicables.',
    },
    {
      icon: <Timer className="w-8 h-8 text-[#ff4d00]" />,
      title: "Dépôt d'examen rapide",
      desc: "Présentation à l'examen lorsque le niveau requis est atteint.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#ff4d00]" />,
      title: 'Suivi personnalisé',
      desc: 'Suivez votre progression compétence par compétence.',
    },
  ];

  const formations = [
    {
      id: 'permis-b-meca',
      category: 'Auto',
      image: formationBManuelle,
      title: 'Permis B\nBoîte manuelle',
      features: [
        'Évaluation initiale sur simulateur',
        'Code en ligne illimité',
        "Accompagnement à l'examen",
        'Véhicule : Renault Clio*',
      ],
      price: '990 €',
    },
    {
      id: 'permis-b-auto',
      category: 'Auto',
      image: formationBAuto,
      title: 'Permis B\nBoîte automatique',
      features: [
        'Apprentissage plus fluide',
        'Caméra de recul',
        'Cockpit digital',
        'Passerelle vers B manuelle**',
      ],
      price: '790 €',
    },
    {
      id: 'conduite-accompagnee',
      category: 'Jeunes',
      image: formationConduiteAccompagnee,
      title: 'Conduite\naccompagnée',
      features: [
        'Rendez-vous pédagogiques',
        'Livret de suivi élève & parents',
        'Assurance avantageuse***',
        'Période probatoire réduite****',
      ],
      price: '1 150 €',
    },
    {
      id: 'moto-a2',
      category: 'Moto',
      image: formationMotoA2,
      title: 'Permis\nMoto A2',
      features: [
        'Plateau fermé',
        'Motos récentes',
        'Piste privée sécurisée',
        'Accompagnement équipement',
      ],
      price: '890 €',
    },
  ];

  return (
    <section id="formations-section" className="w-full bg-[#09090b] text-white py-20 px-4 md:px-8">
      <div className="w-full space-y-24">
        
        {/* Features Grid */}
        <motion.div 
          id="about-section" 
          className="space-y-12 scroll-mt-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center tracking-tight text-white"
          >
            La Touche Convention...
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                variants={itemVariants}
                key={idx}
                className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
              >
                <div className="shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-[15px] font-bold text-zinc-100 mb-2 leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Formations Grid */}
        <motion.div 
          id="formations-grid" 
          className="space-y-12 scroll-mt-24"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center tracking-tight text-white"
          >
            Choisissez la formule qui <span className="text-white border-b-4 border-[#ff4d00] pb-1">vous correspond...</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {formations.map((formation, idx) => (
              <motion.div
                variants={itemVariants}
                key={idx}
                className="flex flex-col bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-colors"
              >
                <div className="h-48 sm:h-52 w-full overflow-hidden relative">
                  {formation.id === 'permis-b-meca' ? (
                    <ClioScrollThumbnail
                      folderName="clio_grise"
                      totalFrames={120}
                      fallbackImage={formationBManuelleStatic}
                      className="w-full h-full"
                    />
                  ) : formation.id === 'permis-b-auto' ? (
                    <ClioScrollThumbnail
                      folderName="clio_bleu"
                      totalFrames={120}
                      fallbackImage={formationBAutoStatic}
                      className="w-full h-full"
                    />
                  ) : formation.id === 'conduite-accompagnee' ? (
                    <ClioScrollThumbnail
                      folderName="conduite_accompagnee"
                      totalFrames={120}
                      fallbackImage={formationConduiteAccompagneeStatic}
                      className="w-full h-full"
                    />
                  ) : formation.id === 'moto-a2' ? (
                    <ClioScrollThumbnail
                      folderName="motoA2"
                      totalFrames={120}
                      fallbackImage={formationMotoA2Static}
                      className="w-full h-full"
                    />
                  ) : (
                    <>
                      <img
                        src={formation.image}
                        alt={formation.title.replace('\n', ' ')}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white whitespace-pre-line mb-6 leading-tight">
                    {formation.title}
                  </h3>
                  <ul className="space-y-3 mb-8 flex-1">
                    {formation.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#ff4d00] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-5">
                    <div>
                      <div className="flex items-baseline gap-1.5 text-white">
                        <span className="text-[#ff4d00] font-bold">Dès</span>
                        <span className="text-3xl font-black tracking-tight">{formation.price}</span>
                        <span className="text-xs text-zinc-400 font-medium">TTC*</span>
                      </div>
                      <p className="text-zinc-400 text-xs mt-1">Paiement en 3x ou 4x</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => onOpenDetail ? onOpenDetail(formation.id) : onDiscover?.(formation.category)}
                        className="py-2.5 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 hover:border-white/40 transition-colors cursor-pointer"
                      >
                        Découvrir
                      </button>
                      <button 
                        onClick={() => onRegister?.(formation.id)}
                        className="py-2.5 rounded-xl bg-[#ff4d00] text-black text-sm font-bold hover:bg-[#ff5e1a] transition-all cursor-pointer shadow-[0_0_15px_rgba(255,77,0,0.3)] hover:shadow-[0_0_20px_rgba(255,77,0,0.5)]"
                      >
                        Je m'inscris
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="flex justify-center pt-4 text-center"
          >
            <button 
              onClick={() => onDiscover?.('TOUS')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm font-semibold text-zinc-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors cursor-pointer"
            >
              Voir toutes nos formations
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="text-center pt-8"
          >
            <p className="text-[10px] sm:text-xs text-zinc-400">
              * Sous réserve de validation réglementaire. ** Selon conditions et assureurs. Tarifs et contenus indicatifs non contractuels.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
