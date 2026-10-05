import React, { useState } from 'react';
import { X, ArrowRight, Sparkles, Clock } from 'lucide-react';

import formationBManuelle from '../assets/images/formation_b_manuelle.webp';
import formationBAuto from '../assets/images/formation_b_auto.webp';
import formationConduiteAccompagnee from '../assets/images/formation_conduite_accompagnee.webp';
import formationMotoA2 from '../assets/images/formation_moto_a2.webp';
import codeRouteImg from '../assets/images/code_route.webp';
import clioImg from '../assets/images/renault_clio.webp';

interface WorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  onSelectFormation?: (formationId: string) => void;
}

interface Formation {
  id: string;
  title: string;
  category: string;
  duration: string;
  desc: string;
  image: string;
  features: string[];
}

export const WorkModal: React.FC<WorkModalProps> = ({ 
  isOpen, 
  onClose,
  initialCategory = 'TOUS',
  onSelectFormation
}) => {
  const [activeFilter, setActiveFilter] = useState(initialCategory);

  React.useEffect(() => {
    if (isOpen) {
      setActiveFilter(initialCategory || 'TOUS');
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const formations: Formation[] = [
    {
      id: 'permis-b-meca',
      title: 'PERMIS B TRADITIONNEL',
      category: 'Auto',
      duration: '20h minimum',
      image: formationBManuelle,
      desc: 'Formation complète sur boîte manuelle avec suivi personnalisé par nos moniteurs diplômés.',
      features: ['Véhicules récents', 'Bilan de compétences', 'Préparation examen'],
    },
    {
      id: 'permis-b-auto',
      title: 'PERMIS BOÎTE AUTOMATIQUE',
      category: 'Auto',
      duration: '13h minimum',
      image: formationBAuto,
      desc: 'Apprentissage simplifié, rapide et sans stress. Idéal pour obtenir son permis en un temps record.',
      features: ['Accès rapide à l’examen', 'Passerelle boîte manuelle possible', 'Moins d’heures requises'],
    },
    {
      id: 'conduite-accompagnee',
      title: 'CONDUITE ACCOMPAGNÉE (AAC)',
      category: 'Jeunes',
      duration: 'Dès 15 ans',
      image: formationConduiteAccompagnee,
      desc: 'Plus d’expérience de la route avant l’examen et une surprime d’assurance réduite.',
      features: ['Plus d’expérience', 'Période probatoire réduite à 2 ans', 'Tarif assurance avantageux'],
    },
    {
      id: 'moto-a2',
      title: 'PERMIS MOTO A2',
      category: 'Moto',
      duration: 'Plateau & Circulation',
      image: formationMotoA2,
      desc: 'Apprentissage de la moto sur le plateau du Parc des Expositions de Villepinte (93), puis en circulation.',
      features: ['Plateau à Villepinte (93)', 'Motos récentes et adaptées', 'Équipements et sécurité'],
    },
    {
      id: 'permis-b-meca',
      title: 'STAGE PERMIS ACCÉLÉRÉ',
      category: 'Stage',
      duration: '2 à 4 semaines',
      image: clioImg,
      desc: 'Planning intensif optimisé pour les élèves pressés ou ayant des impératifs professionnels.',
      features: ['Créneaux prioritaires', 'Cours de code & conduite en continu', 'Passage d’examen rapide'],
    },
    {
      id: 'permis-b-meca',
      title: 'CODE DE LA ROUTE 24/7',
      category: 'Code',
      duration: 'Accès illimité',
      image: codeRouteImg,
      desc: 'Plateforme interactive avec plus de 2 500 questions conformes aux dernières réformes d’examen.',
      features: ['Suivi en temps réel', 'Examens blancs chronométrés', 'Disponible sur smartphone & PC'],
    },
  ];

  const categories = ['TOUS', 'Auto', 'Moto', 'Jeunes', 'Stage', 'Code'];

  const filtered = activeFilter === 'TOUS'
    ? formations
    : formations.filter((p) => p.category === activeFilter);

  return (
    <div
      id="work-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="work-modal-container"
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#09090b] border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,77,0,0.25)] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-zinc-800 bg-zinc-950/80">
          <div>
            <div className="flex items-center gap-2 text-[#ff4d00] text-xs font-bold uppercase tracking-[0.25em] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFRE DE FORMATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-condensed tracking-wide uppercase text-white">
              CHOISISSEZ VOTRE FORMULE DE CONDUITE
            </h2>
          </div>
          <button
            id="close-work-modal"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter categories */}
        <div className="px-6 sm:px-8 py-3 bg-zinc-900/60 border-b border-zinc-800 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === cat
                  ? 'bg-[#ff4d00] text-black shadow-[0_0_12px_rgba(255,77,0,0.35)]'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Formations Grid with Images */}
        <div className="p-6 sm:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((proj, idx) => (
            <div
              key={idx}
              className="group rounded-xl bg-zinc-900/40 border border-zinc-800/90 hover:border-[#ff4d00]/70 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="h-40 w-full overflow-hidden relative bg-zinc-950">
                <img loading="lazy" decoding="async"
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[#ff4d00] border border-[#ff4d00]/30">
                  {proj.category}
                </span>
                <span className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-zinc-300 flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3 text-[#ff4d00]" /> {proj.duration}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black font-condensed tracking-wide text-white group-hover:text-[#ff4d00] transition-colors mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                    {proj.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.features.map((t) => (
                      <span key={t} className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  {onSelectFormation && (
                    <button
                      onClick={() => {
                        onClose();
                        onSelectFormation(proj.id);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#ff4d00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#ff5e1a] transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-[0_0_12px_rgba(255,77,0,0.3)]"
                    >
                      <span>S'inscrire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
