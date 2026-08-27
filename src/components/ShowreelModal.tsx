import React from 'react';
import { X, Play, ShieldCheck, Sparkles } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="showreel-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="showreel-modal-container"
        className="relative w-full max-w-4xl bg-white border border-zinc-200/60 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,77,0,0.25)] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d00] animate-pulse" />
            <h3 className="font-condensed font-black tracking-widest text-lg text-zinc-900 uppercase">
              CONVENTION PERMIS — PRÉSENTATION DE L'ÉCOLE
            </h3>
          </div>
          <button
            id="close-showreel-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Interactive Player Canvas */}
        <div className="relative aspect-video bg-gradient-to-br from-zinc-950 via-[#18181e] to-black flex items-center justify-center overflow-hidden">
          {/* Subtle Grid and dynamic lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Background Video Element */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40 pointer-events-none"
          >
            <source
              src="https://res.cloudinary.com/ucmjjrcj/video/upload/v1786975611/kling_20260817_Image_to_Video_The_camera_5633_0.mov"
              type="video/mp4"
            />
          </video>

          {/* Central presentation graphic */}
          <div className="relative z-10 text-center px-6 max-w-lg flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[#ff4d00] flex items-center justify-center text-black mb-6 shadow-[0_0_35px_rgba(255,77,0,0.6)] cursor-pointer group hover:scale-110 transition-transform">
              <Play className="w-9 h-9 fill-current translate-x-0.5" />
            </div>

            <span className="text-xs uppercase tracking-[0.3em] text-[#ff4d00] font-bold mb-2">
              PÉDAGOGIE & RÉUSSITE
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold font-condensed tracking-wide text-zinc-900 uppercase mb-3">
              APPRENEZ. PROGRESSEZ. PRENEZ CONFIANCE.
            </h4>
            <p className="text-sm text-zinc-600 leading-relaxed font-light">
              Découvrez en images nos véhicules récents, notre simulateur de conduite et la pédagogie positive de nos enseignants pour réussir votre permis du premier coup.
            </p>

            <div className="mt-6 flex items-center gap-4 text-xs text-zinc-600 font-mono">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-white border border-zinc-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff4d00]" /> LABEL QUALITÉ
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-white border border-zinc-200">
                <Sparkles className="w-3.5 h-3.5 text-[#ff4d00]" /> 98% RÉUSSITE
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-zinc-950 flex items-center justify-between text-xs text-zinc-500">
          <span>Convention Permis — Auto-école agréée</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-[#ff4d00] text-black font-bold uppercase tracking-wider hover:bg-[#ff5e1a] transition-colors"
          >
            Fermer l'aperçu
          </button>
        </div>
      </div>
    </div>
  );
};

