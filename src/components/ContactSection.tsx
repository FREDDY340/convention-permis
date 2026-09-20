import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  selectedFormation?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedFormation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    formation: selectedFormation || '',
    message: '',
    agreed: false
  });

  React.useEffect(() => {
    if (selectedFormation) {
      setFormData(prev => ({ ...prev, formation: selectedFormation }));
    }
  }, [selectedFormation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

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
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="contact-section" className="w-full py-16 px-4 md:px-8 bg-[#09090b] relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6"
        >
          
          {/* Left Block: Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7 bg-[#0f0f11] border border-white/5 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl"
          >
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-white mb-3">Prêt à passer votre permis ?</motion.h2>
            <motion.p variants={itemVariants} className="text-zinc-400 text-sm mb-8 leading-relaxed max-w-md">
              Remplissez le formulaire ci-dessous. Un conseiller pédagogique 
              Convention Permis vous recontactera sous 2 heures ouvrées.
            </motion.p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
                    Prénom <span className="text-[#ff4d00]">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-[#18181b] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#ff4d00] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
                    Nom <span className="text-[#ff4d00]">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-[#18181b] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#ff4d00] transition-colors"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
                    Email <span className="text-[#ff4d00]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#18181b] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#ff4d00] transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
                    Téléphone portable <span className="text-[#ff4d00]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#18181b] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#ff4d00] transition-colors"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
                    Formation souhaitée <span className="text-[#ff4d00]">*</span>
                  </label>
                  <select
                    name="formation"
                    required
                    value={formData.formation}
                    onChange={handleChange}
                    className="w-full bg-[#18181b] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#ff4d00] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-zinc-500">Sélectionnez une formation</option>
                    <option value="permis-b-meca">Permis B (Mécanique)</option>
                    <option value="permis-b-auto">Permis B (Automatique)</option>
                    <option value="conduite-accompagnee">Conduite accompagnée (AAC)</option>
                    <option value="moto-a2">Permis Moto A2</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-1">
                    Message <span className="text-zinc-500 text-xs font-normal">(facultatif)</span>
                  </label>
                  <input
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#18181b] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#ff4d00] transition-colors"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center mt-0.5">
                    <input
                      type="checkbox"
                      name="agreed"
                      required
                      checked={formData.agreed}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="w-4 h-4 border border-white/20 rounded bg-[#18181b] peer-checked:bg-[#ff4d00] peer-checked:border-[#ff4d00] transition-colors flex items-center justify-center group-hover:border-white/40">
                      <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 leading-snug">
                    J'accepte que mes données soient traitées par Convention Permis dans le cadre de ma demande de renseignements, de prise de rendez-vous ou d'inscription.{' '}
                    <a href="#" className="text-[#ff4d00] hover:underline underline-offset-2">Politique de confidentialité</a>
                  </span>
                </label>
              </motion.div>

              <motion.button
                variants={itemVariants}
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#ff4d00] hover:bg-[#ff5e1a] text-white font-bold py-3.5 px-6 rounded-lg transition-colors mt-6 shadow-[0_0_15px_rgba(255,77,0,0.3)] hover:shadow-[0_0_25px_rgba(255,77,0,0.5)]"
              >
                Je m'inscris maintenant
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>

          {/* Middle Block: Contact Info */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 bg-[#0f0f11] border border-white/5 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl flex flex-col"
          >
            <motion.h3 variants={itemVariants} className="text-xl font-bold text-white mb-8">Nous sommes là pour vous</motion.h3>
            
            <div className="space-y-6 flex-1">
              
              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#ff4d00] shrink-0 mt-0.5" />
                <span className="text-zinc-200 text-sm font-medium break-all">contact@convention-permis.fr</span>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#ff4d00] shrink-0 mt-0.5" />
                <span className="text-zinc-200 text-sm font-medium leading-snug">
                  122 rue de l'Abbé Groult<br />
                  75015 Paris
                </span>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-[#ff4d00] shrink-0 mt-0.5" />
                <span className="text-zinc-200 text-sm font-medium leading-snug">
                  Métro 12 : Convention<br />
                  Métro 8 : Félix Faure
                </span>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-4 pt-2">
                <Clock className="w-5 h-5 text-[#ff4d00] shrink-0 mt-0.5" />
                <div className="text-zinc-200 text-sm font-medium leading-relaxed">
                  <div className="flex gap-2">
                    <span className="w-20">Lundi :</span>
                    <span>12h00 – 20h00</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-20">Mar – Jeu :</span>
                    <span>10h00 – 20h00</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-20">Vendredi :</span>
                    <span>10h00 – 13h00, 14h00 – 20h00</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="w-20">Samedi :</span>
                    <span>10h00 – 18h00</span>
                  </div>
                  <div className="flex gap-2 text-zinc-500">
                    <span className="w-20">Dimanche :</span>
                    <span>fermé</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Block: Map representation */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-12 bg-[#0f0f11] border border-white/5 rounded-2xl overflow-hidden shadow-xl h-[300px] lg:h-[400px] relative group"
          >
            {/* Google Maps Iframe */}
            <iframe
              title="Carte Convention Permis"
              src="https://maps.google.com/maps?q=122%20rue%20de%20l'Abbé%20Groult,%2075015%20Paris&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 w-full h-full border-0"
              style={{ filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
            {/* Vignette overlay for map integration */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(15,15,17,0.8)]"></div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
