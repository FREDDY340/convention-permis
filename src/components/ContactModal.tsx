import React, { useState } from 'react';
import { X, Send, CheckCircle2, Mail, MessageSquare, User, Phone } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    formation: 'Permis B (Boîte manuelle)',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      id="contact-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="contact-modal-container"
        className="relative w-full max-w-lg bg-white border border-zinc-200/70 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(255,77,0,0.25)] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-contact-modal"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#ff4d00]/20 text-[#ff4d00] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold font-condensed tracking-wider uppercase text-zinc-900 mb-2">
              DEMANDE ENVOYÉE AVEC SUCCÈS
            </h3>
            <p className="text-zinc-600 text-sm max-w-xs">
              Merci ! Un conseiller de Convention Permis vous recontactera sous 24h pour planifier votre évaluation de départ.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-[#ff4d00] text-xs font-bold uppercase tracking-[0.25em] mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff4d00] animate-pulse" />
                <span>COMMENCEZ VOTRE FORMATION</span>
              </div>
              <h2 className="text-3xl font-black font-condensed tracking-wide uppercase text-zinc-900">
                RÉSERVER UNE ÉVALUATION
              </h2>
              <p className="text-zinc-500 text-xs mt-1">
                Faites le premier pas vers votre permis. Éligible financement CPF et 1€ par jour.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Nom & Prénom
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Camille Dubois"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white border border-zinc-200/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="camille@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white border border-zinc-200/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                    Téléphone
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="06 12 34 56 78"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-white border border-zinc-200/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Formule souhaitée
                </label>
                <select
                  value={formState.formation}
                  onChange={(e) => setFormState({ ...formState, formation: e.target.value })}
                  className="w-full bg-white border border-zinc-200/80 rounded-xl px-4 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-[#ff4d00] transition-colors"
                >
                  <option value="Permis B (Boîte manuelle)">Permis B (Boîte manuelle)</option>
                  <option value="Permis Boîte Automatique">Permis Boîte Automatique</option>
                  <option value="Conduite Accompagnée (AAC)">Conduite Accompagnée (AAC)</option>
                  <option value="Permis Moto A2">Permis Moto A2</option>
                  <option value="Stage Accéléré">Stage Permis Accéléré</option>
                  <option value="Code en Ligne">Code de la route en ligne</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                  Message / Disponibilités (Optionnel)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Vos disponibilités ou questions sur le financement..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white border border-zinc-200/80 rounded-xl pl-10 pr-4 py-2 text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00] transition-colors resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="submit-contact-form"
                className="w-full mt-2 py-3 px-6 rounded-xl bg-[#ff4d00] hover:bg-[#ff5e1a] text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,77,0,0.4)] transition-all cursor-pointer"
              >
                <span>Envoyer ma demande</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

