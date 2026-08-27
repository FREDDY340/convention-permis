import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coffee, Monitor, User, Calendar, ArrowRight, Eye, Image as ImageIcon } from 'lucide-react';

import showroomInteriorImg from '../assets/images/showroom_interior.jpg';
import agencyInteriorImg from '../assets/images/agency_interior.png';

interface ShowroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateContact?: () => void;
}

export const ShowroomModal: React.FC<ShowroomModalProps> = ({ isOpen, onClose, onNavigateContact }) => {
  const [viewMode, setViewMode] = useState<'360' | 'photos'>('360');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-[#09090b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/70 hover:text-white hover:bg-black/90 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[#ff4d00] text-xs font-bold uppercase tracking-[0.25em] mb-1 block">
                    122 RUE DE L'ABBÉ GROULT, 75015 PARIS
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight tracking-tight uppercase font-condensed">
                    Découvrez Convention <span className="text-[#ff4d00]">de l'intérieur</span>
                  </h2>
                </div>

                {/* Switch 360 / Photos */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900 border border-white/10 self-start sm:self-auto">
                  <button
                    onClick={() => setViewMode('360')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      viewMode === '360'
                        ? 'bg-[#ff4d00] text-black shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" /> Visite 360°
                  </button>
                  <button
                    onClick={() => setViewMode('photos')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      viewMode === 'photos'
                        ? 'bg-[#ff4d00] text-black shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> Galerie Photos
                  </button>
                </div>
              </div>

              {/* Viewer Area */}
              {viewMode === '360' ? (
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shadow-inner">
                  <iframe
                    src="https://www.klapty.com/tour/PlF05v7VZn"
                    className="w-full h-full border-0"
                    allowFullScreen
                    title="Visite virtuelle du showroom"
                  ></iframe>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="group relative rounded-xl overflow-hidden border border-white/10 aspect-[16/10] bg-zinc-900">
                    <img
                      src={agencyInteriorImg}
                      alt="Espace accueil et simulateur"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-white uppercase tracking-wider">
                      Accueil & Salle de code
                    </span>
                  </div>
                  <div className="group relative rounded-xl overflow-hidden border border-white/10 aspect-[16/10] bg-zinc-900">
                    <img
                      src={showroomInteriorImg}
                      alt="Showroom Convention Permis"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 text-xs font-bold text-white uppercase tracking-wider">
                      Espace Showroom & Lounge
                    </span>
                  </div>
                </div>
              )}

              {/* Features List */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 border-y border-white/5">
                <div className="flex items-center gap-3">
                  <Coffee className="w-7 h-7 text-[#ff4d00] shrink-0" strokeWidth={1.75} />
                  <div className="text-xs text-zinc-300 font-medium leading-snug">Espace<br/>lounge & café</div>
                </div>
                <div className="flex items-center gap-3">
                  <Monitor className="w-7 h-7 text-[#ff4d00] shrink-0" strokeWidth={1.75} />
                  <div className="text-xs text-zinc-300 font-medium leading-snug">Salle de code<br/>équipée</div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="w-7 h-7 text-[#ff4d00] shrink-0" strokeWidth={1.75} />
                  <div className="text-xs text-zinc-300 font-medium leading-snug">Accueil dédié<br/>à votre dossier</div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-7 h-7 text-[#ff4d00] shrink-0" strokeWidth={1.75} />
                  <div className="text-xs text-zinc-300 font-medium leading-snug">Visite sur<br/>rendez-vous</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-1">
                <a 
                  href="https://www.klapty.com/tour/PlF05v7VZn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#ff4d00] hover:bg-[#ff5e1a] text-black font-extrabold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,77,0,0.3)] text-sm tracking-wider uppercase"
                >
                  Visiter en plein écran <ArrowRight className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => {
                    onClose();
                    if (onNavigateContact) onNavigateContact();
                  }}
                  className="flex-1 bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center text-sm uppercase tracking-wider"
                >
                  Prendre rendez-vous
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
