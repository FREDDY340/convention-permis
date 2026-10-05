import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Award, 
  ShieldCheck, 
  CreditCard, 
  Sparkles, 
  Calendar, 
  BookOpen, 
  Bike, 
  Car, 
  Users, 
  ChevronRight,
  Zap,
  ArrowRight
} from 'lucide-react';

import formationBManuelle from '../assets/images/formation_b_manuelle.webp';
import formationBAuto from '../assets/images/formation_b_auto.webp';
import formationConduiteAccompagnee from '../assets/images/formation_conduite_accompagnee.webp';
import formationMotoA2 from '../assets/images/formation_moto_a2.webp';
import clioPic from '../assets/images/renault_clio.webp';
import mt07Pic from '../assets/images/yamaha_mt07.webp';
import { FORFAITS, formatEuros, ACCELERATED_PACK, STUDENT_PROOF_NOTE } from '../data/tarifs';

export type FormationId = 'permis-b-meca' | 'permis-b-auto' | 'conduite-accompagnee' | 'moto-a2';

interface FormationDetailModalProps {
  isOpen: boolean;
  formationId: FormationId | string | null;
  onClose: () => void;
  onSelectRegister: (formationId: string) => void;
}

export interface FormationData {
  id: FormationId;
  title: string;
  badge: string;
  subtitle: string;
  duration: string;
  minAge: string;
  vehicle: string;
  vehicleImage: string;
  heroImage: string;
  description: string;
  objectives: string[];
  programSteps: { step: string; title: string; desc: string }[];
  included: string[];
  fundingOptions: string[];
  prerequisites: string[];
}

export const FORMATIONS_DETAILS: Record<FormationId, FormationData> = {
  'permis-b-meca': {
    id: 'permis-b-meca',
    title: 'Permis B — Boîte Manuelle',
    badge: 'Formule Phare',
    subtitle: 'La maîtrise totale de la conduite traditionnelle',
    duration: '20h minimum réglementaires',
    minAge: '17 ans (examen dès 17 ans)',
    vehicle: 'Renault Clio 6 (boîte manuelle)',
    vehicleImage: clioPic,
    heroImage: formationBManuelle,
    description: "Le permis B sur boîte manuelle reste la référence universelle. Il vous autorise à conduire tous les véhicules légers (manuels et automatiques). Chez Convention Permis, vous bénéficiez d'une pédagogie structurée avec évaluation initiale et leçons sur Renault Clio 6 récente.",
    objectives: [
      'Maîtriser le maniement du véhicule (embrayage, passages de vitesse, démarrages en côte)',
      "Appréhender l'environnement routier et la circulation urbaine / autoroutière",
      'Pratiquer une conduite autonome, sûre et éco-responsable',
      "Réussir l'épreuve pratique du permis de conduire"
    ],
    programSteps: [
      { step: '01', title: 'Évaluation initiale', desc: 'Un premier rendez-vous de conduite pour estimer votre volume d\'heures personnalisé.' },
      { step: '02', title: 'Code de la Route 24/7', desc: 'Accès illimité à la plateforme en ligne et séries d\'entraînement en agence.' },
      { step: '03', title: 'Leçons de conduite', desc: 'Formation pratique individuelle avec moniteur diplômé d\'État sur Renault Clio 6.' },
      { step: '04', title: 'Examen blanc & Examen officiel', desc: 'Mise en situation réelle de l\'épreuve pratique puis accompagnement à l\'examen.' }
    ],
    included: [
      'Évaluation initiale personnalisée',
      'Accès au code en ligne illimité',
      'Livret d\'apprentissage numérique',
      '20h de conduite individuelle avec moniteur dédié',
      'Accompagnement et représentation à l\'examen pratique',
      'Gestion complète de votre dossier préfectoral (ANTS)'
    ],
    fundingOptions: ['Paiement en 3x ou 4x'],
    prerequisites: ['ASSR 2 ou ASR', 'Journée Défense et Citoyenneté (JDC) ou attestation de recensement', 'Pièce d\'identité en cours de validité']
  },
  'permis-b-auto': {
    id: 'permis-b-auto',
    title: 'Permis B — Boîte Automatique (BEA)',
    badge: 'Apprentissage Rapide',
    subtitle: 'Conduisez plus sereinement avec moins d\'heures obligatoires',
    duration: '13h minimum réglementaires',
    minAge: '17 ans (examen dès 17 ans)',
    vehicle: 'Renault 5 (boîte automatique)',
    vehicleImage: clioPic,
    heroImage: formationBAuto,
    description: "Le permis BEA (Boîte d'Embrayage Automatique) permet un apprentissage plus rapide et plus fluide en supprimant la gestion de l'embrayage. Idéal pour réduire le stress au volant. Une simple passerelle de 7h sans examen permet de le convertir en permis B manuel après 6 mois !",
    objectives: [
      'Se concentrer pleinement sur la trajectoire, le regard et la circulation',
      'Maîtriser les assistants de conduite modernes et la boîte automatique',
      'Obtenir son permis en seulement 13 heures de conduite obligatoire',
      'Possibilité de passerelle vers le permis manuel ultérieurement'
    ],
    programSteps: [
      { step: '01', title: 'Évaluation initiale', desc: 'Diagnostic personnalisé de vos capacités avec un moniteur.' },
      { step: '02', title: 'Code en ligne', desc: 'Préparation intensive et séries thématiques en accès illimité.' },
      { step: '03', title: 'Conduite automatique', desc: '13h de leçons focalisées sur l\'observation, l\'anticipation et la sécurité.' },
      { step: '04', title: 'Examen pratique', desc: 'Présentation rapide dès que le niveau requis est atteint.' }
    ],
    included: [
      'Évaluation initiale personnalisée',
      'Plateforme de Code en ligne illimitée',
      '13 heures de conduite en boîte automatique',
      'Dossier ANTS et démarches administratives incluses',
      'Accompagnement personnalisé le jour de l\'examen'
    ],
    fundingOptions: ['Paiement en 3x ou 4x'],
    prerequisites: ['Pièce d\'identité valide', 'Attestation JDC ou recensement']
  },
  'conduite-accompagnee': {
    id: 'conduite-accompagnee',
    title: 'Conduite Accompagnée (AAC)',
    badge: 'Dès 15 ans',
    subtitle: 'Une expérience de la route renforcée avant l\'examen',
    duration: '20h de formation + 3000 km accompagnés',
    minAge: 'Dès 15 ans',
    vehicle: 'Renault Clio 6 + véhicule des accompagnateurs',
    vehicleImage: clioPic,
    heroImage: formationConduiteAccompagnee,
    description: "La Conduite Accompagnée (AAC) permet aux jeunes de se former dès 15 ans. Après une formation initiale en auto-école, l'élève parcourt au moins 3 000 km avec ses accompagnateurs. Résultat : plus d'expérience de la route le jour de l'examen et une surprime d'assurance réduite.",
    objectives: [
      'Acquérir une solide expérience de la route avant l\'examen',
      'Réduire la période probatoire de 3 ans à 2 ans',
      'Bénéficier de tarifs préférentiels auprès des assurances jeunes conducteurs',
      'Maximiser ses chances de réussite au permis grâce à l\'expérience acquise'
    ],
    programSteps: [
      { step: '01', title: 'Formation Initiale (20h)', desc: 'Apprentissage du code et des bases solides de la conduite avec un moniteur.' },
      { step: '02', title: 'Rendez-vous Préalable (2h)', desc: 'Passage de relais convivial entre le moniteur, l\'élève et les accompagnateurs.' },
      { step: '03', title: 'Phase de Conduite (1 à 3 ans)', desc: 'Réalisation d\'au moins 3 000 km en compagnie des parents sur des trajets variés.' },
      { step: '04', title: 'Rendez-vous Pédagogiques', desc: '2 réunions de bilan à l\'auto-école pour ajuster la conduite et préparer l\'examen.' }
    ],
    included: [
      'Code de la route illimité en ligne et en salle',
      '20h de cours de conduite pratique',
      '1 RDV préalable (2h avec accompagnateurs)',
      '2 Rendez-vous pédagogiques théoriques & pratiques',
      'Livret de suivi élève et guide des accompagnateurs',
      'Accompagnement à l\'examen du permis de conduire'
    ],
    fundingOptions: ['Paiement en 3x ou 4x'],
    prerequisites: ['Âge minimum : 15 ans', 'Accord de l\'assurance du véhicule familial', 'ASSR 2']
  },
  'moto-a2': {
    id: 'moto-a2',
    title: 'Permis Moto A2',
    badge: 'Passion Deux-Roues',
    subtitle: 'Pilotez des motos jusqu\'à 35 kW (47.5 ch) en toute sécurité',
    duration: '20h (8h plateau + 12h circulation)',
    minAge: 'Dès 18 ans',
    vehicle: 'Yamaha MT-07 A2 (ABS)',
    vehicleImage: mt07Pic,
    heroImage: formationMotoA2,
    description: "Le permis A2 vous ouvre les portes du monde motard. La formation se déroule au Parc des Expositions de Villepinte (93), à côté du circuit Carole : elle alterne travail technique sur plateau et maîtrise du trafic en circulation routière. L'inscription et l'accueil se font à l'agence, 122 rue de l'Abbé Groult (Paris 15e).",
    objectives: [
      'Maîtriser l\'équilibre, l\'inclinaison, le freinage d\'urgence et les évitements',
      'Obtenir l\'Épreuve Hors Circulation (Plateau) à allure lente et normale',
      'Adopter un comportement sécuritaire et anticiper les risques en circulation',
      'Réussir l\'Examen Pratique Circulation'
    ],
    programSteps: [
      { step: '01', title: 'Code Moto (ETM)', desc: 'Préparation spécifique à l\'Épreuve Théorique Moto sur plateforme dédiée.' },
      { step: '02', title: 'Plateau à Villepinte (93)', desc: 'Exercices techniques hors circulation (vérifications, allure lente, freinage, évitement).' },
      { step: '03', title: 'Circulation Guidée', desc: 'Apprentissage des trajectoires de sécurité (virages, inter-files, autoroute).' },
      { step: '04', title: 'Passage des Examens', desc: 'Présentation aux 2 épreuves officielles (Plateau + Circulation).' }
    ],
    included: [
      'Accès plateforme ETM (Code Moto)',
      '8h d\'entraînement technique sur le plateau de Villepinte (93)',
      '12h de leçons de circulation sur Yamaha MT-07',
      'Prêt des équipements de piste si nécessaire',
      'Présentation aux 2 épreuves d\'examen (Plateau & Circulation)',
      'Gestion dossier ANTS'
    ],
    fundingOptions: ['Paiement en 3x ou 4x'],
    prerequisites: ['Équipement obligatoire : Casque homologué, gants CE, blouson renforcé, chaussures montantes', 'Âge minimum : 18 ans']
  }
};

export const FormationDetailModal: React.FC<FormationDetailModalProps> = ({
  isOpen,
  formationId,
  onClose,
  onSelectRegister,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'program' | 'included' | 'funding'>('overview');

  if (!isOpen || !formationId) return null;

  const formationKey = (formationId in FORMATIONS_DETAILS) 
    ? (formationId as FormationId) 
    : 'permis-b-meca';
    
  const data = FORMATIONS_DETAILS[formationKey];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#0d0d11] border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto text-zinc-200"
          >
            {/* Header / Hero Banner */}
            <div className="relative h-48 sm:h-64 w-full overflow-hidden shrink-0">
              <img loading="lazy" decoding="async"
                src={data.heroImage}
                alt={data.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-[#0d0d11]/70 to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 border border-white/15 text-zinc-300 hover:text-white hover:bg-black/80 transition-colors"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>

              {/* Title & Badge Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 z-10 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#ff4d00] text-black text-xs font-black tracking-wider uppercase shadow-md">
                    {data.badge}
                  </span>
                  <span className="text-xs text-zinc-300 bg-black/50 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                    {data.duration}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {data.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-1">
                  {data.subtitle}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="bg-[#13131a] border-y border-white/5 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 overflow-x-auto shrink-0 text-xs sm:text-sm">
              <div className="flex items-center gap-2 shrink-0">
                <Clock className="w-4 h-4 text-[#ff4d00]" />
                <span className="text-zinc-400">Durée :</span>
                <span className="font-semibold text-white">{data.duration}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Users className="w-4 h-4 text-[#ff4d00]" />
                <span className="text-zinc-400">Âge requis :</span>
                <span className="font-semibold text-white">{data.minAge}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Car className="w-4 h-4 text-[#ff4d00]" />
                <span className="text-zinc-400">Support :</span>
                <span className="font-semibold text-white">{data.id === 'moto-a2' ? 'Yamaha MT-07 · Villepinte (93)' : data.vehicle.split('(')[0]}</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 px-4 sm:px-8 bg-[#0d0d11] shrink-0 overflow-x-auto text-xs sm:text-sm font-semibold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'overview'
                    ? 'border-[#ff4d00] text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Présentation & Objectifs
              </button>
              <button
                onClick={() => setActiveTab('program')}
                className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'program'
                    ? 'border-[#ff4d00] text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Programme & Étapes
              </button>
              <button
                onClick={() => setActiveTab('included')}
                className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'included'
                    ? 'border-[#ff4d00] text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Ce qui est inclus
              </button>
              <button
                onClick={() => setActiveTab('funding')}
                className={`py-3 px-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === 'funding'
                    ? 'border-[#ff4d00] text-white'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Financement & Prérequis
              </button>
            </div>

            {/* Tab Body Content */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1 text-sm leading-relaxed space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#ff4d00]" />
                      À propos de la formation
                    </h3>
                    <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                      {data.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-3">Objectifs principaux</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {data.objectives.map((obj, i) => (
                        <div key={i} className="flex items-start gap-2.5 bg-[#14141c] p-3.5 rounded-xl border border-white/5">
                          <CheckCircle2 className="w-4 h-4 text-[#ff4d00] shrink-0 mt-0.5" />
                          <span className="text-zinc-300 text-xs sm:text-sm font-medium">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#ff4d00]/10 via-[#ff4d00]/5 to-transparent border border-[#ff4d00]/20 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ff4d00]/20 flex items-center justify-center shrink-0 text-[#ff4d00]">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Véhicule de formation</h4>
                      <p className="text-zinc-300 text-xs mt-0.5">{data.vehicle}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'program' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#ff4d00]" />
                    Le déroulement étape par étape
                  </h3>
                  <div className="space-y-4">
                    {data.programSteps.map((s, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-[#14141c] border border-white/5 hover:border-white/10 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-[#ff4d00]/20 text-[#ff4d00] font-black text-sm flex items-center justify-center shrink-0">
                          {s.step}
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base">{s.title}</h4>
                          <p className="text-zinc-400 text-xs sm:text-sm mt-1">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'included' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#ff4d00]" />
                    Ce qui est inclus dans le pack
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.included.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-[#14141c] border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-[#ff4d00] shrink-0" />
                        <span className="text-zinc-200 text-xs sm:text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'funding' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#ff4d00]" />
                      Financements & Paiements éligibles
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {data.fundingOptions.map((opt, i) => (
                        <div key={i} className="p-4 rounded-xl bg-[#14141c] border border-white/5 text-center">
                          <Zap className="w-5 h-5 text-[#ff4d00] mx-auto mb-2" />
                          <span className="text-xs sm:text-sm font-bold text-white block">{opt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#ff4d00]" />
                      Prérequis & Pièces nécessaires
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                      {data.prerequisites.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] mt-2 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer / Action CTA */}
            <div className="p-4 sm:p-6 bg-[#111117] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider block">Tarif de la formule</span>
                <ul className="mt-1 space-y-0.5">
                  {(FORFAITS[data.id] ?? []).map((forfait) => (
                    <li key={forfait.label} className="flex flex-wrap items-baseline gap-x-2 text-sm">
                      <span className="text-zinc-300">{forfait.label} :</span>
                      <span className="text-xl font-black text-white">{formatEuros(forfait.price)}</span>
                      <span className="text-xs text-zinc-400">TTC</span>
                      {forfait.studentPrice !== null && (
                        <span className="text-xs text-emerald-400 font-semibold">Étudiant {formatEuros(forfait.studentPrice)}</span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Paiement en 3x ou 4x.
                  {(data.id === 'permis-b-meca' || data.id === 'permis-b-auto') && ` Pack accéléré : + ${formatEuros(ACCELERATED_PACK)}.`}
                  {' '}Prix étudiant {STUDENT_PROOF_NOTE}.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-white/20 text-white text-xs sm:text-sm font-semibold hover:bg-white/10 transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onSelectRegister(data.id);
                  }}
                  className="w-1/2 sm:w-auto px-6 py-3 rounded-xl bg-[#ff4d00] text-black text-xs sm:text-sm font-extrabold hover:bg-[#ff5e1a] transition-all shadow-[0_0_20px_rgba(255,77,0,0.4)] flex items-center justify-center gap-2"
                >
                  S'inscrire à cette formule
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
