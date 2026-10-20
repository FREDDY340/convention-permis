import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coffee, Monitor, User, Calendar, ArrowRight, Eye, Image as ImageIcon } from 'lucide-react';

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

              {/* Viewer Area : visite 360° et galerie en cours de réalisation (photos réelles à venir) */}
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden bg-zinc-900 border border-white/10 flex flex-col items-center justify-center text-center px-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,77,0,0.12),transparent_65%)] pointer-events-none" />
                {viewMode === '360'
                  ? <Eye className="relative w-10 h-10 text-[#ff4d00] mb-4" strokeWidth={1.5} />
                  : <ImageIcon className="relative w-10 h-10 text-[#ff4d00] mb-4" strokeWidth={1.5} />}
                <span className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff4d00]/40 bg-[#ff4d00]/10 text-[#ff4d00] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] animate-pulse" /> En cours
                </span>
                <p className="relative text-white font-bold text-lg md:text-xl uppercase tracking-wide">
                  {viewMode === '360' ? 'Visite 360° en cours de réalisation' : 'Galerie photos en cours de réalisation'}
                </p>
                <p className="relative text-zinc-400 text-sm mt-2 max-w-md">
                  Elle sera bientôt disponible. En attendant, venez découvrir l'agence sur rendez-vous.
                </p>
              </div>

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
                <button 
                  onClick={() => {
                    onClose();
                    if (onNavigateContact) onNavigateContact();
                  }}
                  className="flex-1 bg-[#ff4d00] hover:bg-[#ff5e1a] text-black font-extrabold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,77,0,0.3)] text-sm tracking-wider uppercase"
                >
                  Prendre rendez-vous <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
