import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Cookie, Check, Sparkles } from 'lucide-react';
import { getMapsConsent, setMapsConsent } from '../lib/consent';

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
  const [mapsConsent, setMapsConsentState] = useState(false);
  const [savedCookies, setSavedCookies] = useState(false);

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
      setSavedCookies(false);
      setMapsConsentState(getMapsConsent());
    }
  }, [isOpen, initialTab]);

  const handleSaveCookies = () => {
    setMapsConsent(mapsConsent);
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
                      Le site internet <strong>conventionpermis.fr</strong> est édité par <strong>Convention Permis</strong>, SAS au capital de 20 000 €, auto-école agréée par la Préfecture de Police de Paris.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-2">
                      <li><strong>Forme juridique :</strong> SAS au capital de 20 000 €</li>
                      <li><strong>RCS :</strong> 988 877 668</li>
                      <li><strong>SIRET :</strong> 988 877 668 00018</li>
                      <li><strong>Siège social :</strong> 221 rue de la Convention, 75015 Paris</li>
                      <li><strong>Agence :</strong> 122 rue de l'Abbé Groult, 75015 Paris</li>
                      <li><strong>Numéro d'agrément préfectoral :</strong> E2037500010</li>
                      <li><strong>Téléphone :</strong> 06 99 77 45 76</li>
                      <li><strong>Email :</strong> contact@conventionpermis.fr</li>
                      <li><strong>Directrice de la publication :</strong> Wissem Beggar, présidente</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
                      2. Hébergement
                    </h3>
                    <p>
                      Le site est hébergé par <strong>GitHub, Inc.</strong> (service GitHub Pages), 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis. Site : github.com.
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
                      1. Responsable du traitement
                    </h3>
                    <p>
                      Les données personnelles sont traitées par <strong>Convention Permis</strong>, SAS au capital de 20 000 €, siège social 221 rue de la Convention, 75015 Paris, conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés. Contact : <a href="mailto:contact@conventionpermis.fr" className="text-[#ff4d00] hover:underline">contact@conventionpermis.fr</a>.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
                      2. Données collectées sur ce site
                    </h3>
                    <p>
                      Le formulaire de contact recueille uniquement : nom, prénom, adresse e-mail, téléphone, formation souhaitée, statut étudiant et votre message.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-2">
                      <li><strong>Finalité :</strong> répondre à votre demande et vous recontacter.</li>
                      <li><strong>Base légale :</strong> mesures précontractuelles prises à votre demande (article 6.1.b du RGPD).</li>
                      <li><strong>Durée de conservation :</strong> 3 ans maximum après le dernier contact.</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
                      3. Données collectées lors de l'inscription en agence
                    </h3>
                    <p>
                      Si vous vous inscrivez à une formation, l'agence recueille en plus les informations nécessaires à votre dossier : identité, date de naissance, adresse postale et données requises pour l'enregistrement auprès de l'ANTS et pour le livret d'apprentissage. Ces données ne sont pas collectées par le site.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-zinc-400 pl-2">
                      <li><strong>Finalité :</strong> gestion de votre formation et de votre dossier d'examen.</li>
                      <li><strong>Base légale :</strong> exécution du contrat de formation et respect des obligations légales.</li>
                      <li><strong>Durée de conservation :</strong> pendant la formation, puis pendant les durées imposées par la réglementation.</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
                      4. Destinataires et transferts hors de l'Union européenne
                    </h3>
                    <p>
                      Vos données sont destinées au seul personnel habilité de Convention Permis et, pour l'inscription, aux services de l'État compétents (ANTS). Elles ne sont jamais vendues.
                    </p>
                    <p>
                      Les messages du formulaire sont acheminés par e-mail par le service <strong>FormSubmit</strong>, et le site est hébergé par <strong>GitHub, Inc.</strong> (GitHub Pages). Ces prestataires sont établis aux États-Unis : les données transmises par le formulaire et les données techniques de connexion transitent donc hors de l'Union européenne.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#ff4d00]"></span>
                      5. Vos droits
                    </h3>
                    <p>
                      Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos données. Pour les exercer, écrivez à <a href="mailto:contact@conventionpermis.fr" className="text-[#ff4d00] hover:underline">contact@conventionpermis.fr</a> ou à Convention Permis, 221 rue de la Convention, 75015 Paris. Une réponse vous sera apportée dans un délai d'un mois.
                    </p>
                    <p>
                      Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#ff4d00] hover:underline">www.cnil.fr</a>).
                    </p>
                  </section>
                </div>
              )}

              {activeTab === 'cookies' && (
                <div className="space-y-6">
                  <p className="text-zinc-300">
                    Ce site n'utilise <strong>aucun cookie de mesure d'audience ni aucun cookie publicitaire</strong>. Seule la carte Google Maps de la page Contact, service tiers, peut déposer des cookies : elle ne s'affiche qu'avec votre accord.
                  </p>

                  <div className="space-y-4">
                    {/* Fonctionnement */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-bold">Fonctionnement du site</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/20 text-green-400 font-semibold uppercase">Requis</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Aucun cookie n'est déposé. Votre choix ci-dessous est simplement mémorisé dans le stockage local de votre navigateur.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked
                        disabled
                        className="mt-1 w-5 h-5 accent-[#ff4d00] rounded cursor-not-allowed opacity-70"
                      />
                    </div>

                    {/* Contenus tiers */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-white font-bold">Carte Google Maps (contenu tiers)</h4>
                        <p className="text-xs text-zinc-400 mt-1">
                          Affiche le plan d'accès à l'agence. Google peut alors déposer des cookies et recevoir votre adresse IP. Désactivé par défaut.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={mapsConsent}
                        onChange={(e) => setMapsConsentState(e.target.checked)}
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
