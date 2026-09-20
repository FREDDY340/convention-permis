import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Cookie, Check, Sparkles } from 'lucide-react';

export type LegalTab = 'mentions' | 'privacy' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'mentions',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [analyticsCookies, setAnalyticsCookies] = useState(true);
  const [marketingCookies, setMarketingCookies] = useState(false);
  const [savedCookies, setSavedCookies] = useState(false);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
      setSavedCookies(false);
    }
  }, [isOpen, initialTab]);

  const handleSaveCookies = () => {
    setSavedCookies(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-[#0f0f11] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#09090b]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff4d00]/10 border border-[#ff4d00]/30 flex items-center justify-center text-[#ff4d00]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#ff4d00] font-semibold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Transparence & Sécurité</span>
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Informations Juridiques & RGPD
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 bg-white/[0.02] px-6 gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('mentions')}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'mentions'
                    ? 'border-[#ff4d00] text-[#ff4d00]'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4" />
                Mentions Légales
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'privacy'
                    ? 'border-[#ff4d00] text-[#ff4d00]'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                Confidentialité
              </button>
              <button
                onClick={() => setActiveTab('cookies')}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'cookies'
                    ? 'border-[#ff4d00] text-[#ff4d00]'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <Cookie className="w-4 h-4" />
                Gestion des Cookies
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8 overflow-y-auto text-sm text-zinc-300 space-y-6 leading-relaxed">
              {activeTab === 'mentions' && (
                <div className="space-y-6">
                  <section className="space-y-2">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
                      1. Éditeur du site
                    </h3>
                    <p>
                      Le site internet <strong>conventionpermis.fr</strong> est édité par la société <strong>Convention Permis SAS</strong>, auto-école agréée par la Préfecture de Police de Paris.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-2">
                      <li><strong>Siège social :</strong> 122 rue de l'Abbé Groult, 75015 Paris</li>
                      <li><strong>Numéro d'agrément préfectoral :</strong> E2037500010</li>
                      <li><strong>Téléphone :</strong> 06 99 77 45 76</li>
                      <li><strong>Email :</strong> contact@conventionpermis.fr</li>
                      <li><strong>Directeur de la publication :</strong> Direction Convention Permis</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
                      2. Hébergement
                    </h3>
                    <p>
                      Le site est hébergé sur des infrastructures sécurisées européennes répondant aux normes ISO 27001 et RGPD.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
                      3. Propriété intellectuelle
                    </h3>
                    <p>
                      L’ensemble des contenus (textes, images, visuels, logo, vidéos) sont la propriété exclusive de Convention Permis ou de leurs titulaires respectifs. Toute reproduction sans accord écrit préalable est strictement interdite.
                    </p>
                  </section>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <section className="space-y-2">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
                      1. Protection des données personnelles (RGPD)
                    </h3>
                    <p>
                      Convention Permis s'engage à protéger la vie privée de ses candidats et visiteurs conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
                      2. Données collectées
                    </h3>
                    <p>
                      Dans le cadre de votre formation au permis de conduire ou de vos demandes de contact, nous collectons :
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-2">
                      <li>Nom, prénom, date de naissance, adresse postale</li>
                      <li>Coordonnées (numéro de téléphone, adresse email)</li>
                      <li>Données nécessaires à l'enregistrement ANTS et livret d'apprentissage</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
                      3. Vos droits
                    </h3>
                    <p>
                      Vous disposez d’un droit d’accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ce droit, contactez-nous à : <a href="mailto:contact@conventionpermis.fr" className="text-[#ff4d00] hover:underline">contact@conventionpermis.fr</a>.
                    </p>
                  </section>
                </div>
              )}

              {activeTab === 'cookies' && (
                <div className="space-y-6">
                  <p className="text-zinc-300">
                    Nous utilisons des cookies pour assurer le bon fonctionnement du site, mesurer l'audience et vous offrir la meilleure expérience utilisateur possible.
                  </p>

                  <div className="space-y-4">
                    {/* Cookies essentiels */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-bold">Cookies essentiels</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/20 text-green-400 font-semibold uppercase">Requis</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Nécessaires au fonctionnement technique du site, à la navigation fluide et à la sécurité de vos sessions.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="mt-1 w-5 h-5 accent-[#ff4d00] rounded cursor-not-allowed opacity-70"
                      />
                    </div>

                    {/* Mesure d'audience */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-white font-bold">Mesure d'audience anonyme</h4>
                        <p className="text-xs text-zinc-400 mt-1">
                          Permet d'analyser anonymement le trafic afin d'optimiser l'expérience et la rapidité du site.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={analyticsCookies}
                        onChange={(e) => setAnalyticsCookies(e.target.checked)}
                        className="mt-1 w-5 h-5 accent-[#ff4d00] rounded cursor-pointer"
                      />
                    </div>

                    {/* Personnalisation & réseaux */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-white font-bold">Cookies marketing & multimédia</h4>
                        <p className="text-xs text-zinc-400 mt-1">
                          Utilisés pour l'intégration des vidéos showroom et des fonctionnalités interactives de nos réseaux sociaux.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={marketingCookies}
                        onChange={(e) => setMarketingCookies(e.target.checked)}
                        className="mt-1 w-5 h-5 accent-[#ff4d00] rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                    <p className="text-xs text-zinc-400">
                      Vos préférences sont enregistrées sur votre appareil pendant 12 mois.
                    </p>
                    <button
                      onClick={handleSaveCookies}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#ff4d00] hover:bg-[#ff5e1a] text-white font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#ff4d00]/20"
                    >
                      {savedCookies ? (
                        <>
                          <Check className="w-4 h-4" />
                          Préférences enregistrées !
                        </>
                      ) : (
                        'Enregistrer mes choix'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
