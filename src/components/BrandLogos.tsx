import React from 'react';

export const BrandLogos: React.FC = () => {
  return (
    <div id="trusted-brands-strip" className="pt-1 flex flex-col gap-2.5">
      <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-semibold">
        FINANCEMENTS & CERTIFICATIONS OFFICIELLES
      </span>

      <div className="flex items-center flex-wrap gap-4 sm:gap-6 text-zinc-600">
        {/* CPF Financement Badge */}
        <div
          id="badge-cpf"
          className="px-2.5 py-1 rounded border border-zinc-600/80 flex items-center justify-center font-extrabold text-[11px] tracking-wider text-zinc-200 hover:border-[#ff4d00] hover:text-[#ff4d00] transition-colors cursor-default select-none bg-white/60"
          title="Mon Compte Formation (CPF)"
        >
          CPF
        </div>

        {/* Permis à 1€ par jour Badge */}
        <div
          id="badge-permis-1-euro"
          className="px-2.5 py-1 rounded border border-zinc-600/80 flex items-center justify-center font-extrabold text-[11px] tracking-wider text-zinc-200 hover:border-[#ff4d00] hover:text-[#ff4d00] transition-colors cursor-default select-none bg-white/60"
          title="Permis à 1€ par jour"
        >
          1€ / JOUR
        </div>

        {/* ANTS */}
        <div
          id="badge-ants"
          className="px-2.5 py-1 rounded border border-zinc-600/80 flex items-center justify-center font-black text-[11px] tracking-widest text-zinc-200 hover:border-[#ff4d00] hover:text-[#ff4d00] transition-colors cursor-default select-none bg-white/60"
          title="Agence Nationale des Titres Sécurisés (ANTS)"
        >
          ANTS
        </div>

        {/* Code en ligne */}
        <div
          id="badge-code-en-ligne"
          className="px-2.5 py-1 rounded border border-zinc-600/80 flex items-center justify-center font-bold text-[11px] tracking-wider text-zinc-200 hover:border-[#ff4d00] hover:text-[#ff4d00] transition-colors cursor-default select-none bg-white/60"
          title="Plateforme de Code en Ligne 24/7"
        >
          CODE 24/7
        </div>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/conventionpermis/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          id="brand-link-instagram"
          className="p-1 rounded transition-colors hover:text-[#ff4d00] focus:outline-none"
        >
          <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      </div>
    </div>
  );
};

