import React from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { LegalTab } from './LegalModal';

interface FooterProps {
  onNavigate?: (sectionId: string) => void;
  onOpenShowroom?: () => void;
  onOpenWork?: () => void;
  onOpenLegal?: (tab: LegalTab) => void;
  onOpenFormationDetail?: (formationId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate = (_sectionId: string) => {},
  onOpenShowroom = () => {},
  onOpenWork = () => {},
  onOpenLegal = (_tab: LegalTab) => {},
  onOpenFormationDetail,
}) => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full bg-transparent text-zinc-400 border-t border-white/5 pt-16 pb-8 px-4 md:px-8"
    >
      <div className="w-full">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 flex flex-col space-y-6 text-white">
            <div className="-ml-3">
              <button 
                onClick={() => onNavigate('home')} 
                className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff4d00] rounded-lg"
                aria-label="Retour en haut de page"
              >
                <Logo />
              </button>
            </div>
            <div className="space-y-1.5 text-sm text-zinc-300">
              <p>L'auto-école nouvelle génération.</p>
              <p>Apprenez. Progressez. Prenez confiance.</p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.instagram.com/conventionpermis/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-9 h-9 rounded-md bg-[#111115] border border-white/5 flex items-center justify-center hover:bg-[#ff4d00]/10 hover:border-[#ff4d00]/50 hover:text-[#ff4d00] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=61592054589422" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="w-9 h-9 rounded-md bg-[#111115] border border-white/5 flex items-center justify-center hover:bg-[#ff4d00]/10 hover:border-[#ff4d00]/50 hover:text-[#ff4d00] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@convention.permis" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                className="w-9 h-9 rounded-md bg-[#111115] border border-white/5 flex items-center justify-center hover:bg-[#ff4d00]/10 hover:border-[#ff4d00]/50 hover:text-[#ff4d00] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.22-1.15 4.39-2.92 5.74-1.76 1.34-4.04 1.83-6.2 1.43-2.15-.4-4.08-1.74-5.23-3.55-1.14-1.81-1.39-4.14-.65-6.14.73-2.02 2.37-3.66 4.36-4.42 2-.77 4.29-.77 6.27.02v4.06c-1.28-.61-2.88-.63-4.08.06-1.2.7-1.92 2.06-1.8 3.42.12 1.35 1.05 2.59 2.27 3.12 1.22.53 2.7.35 3.78-.45 1.08-.81 1.67-2.13 1.67-3.49V.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white font-bold mb-1 tracking-wide">Navigation</h4>
            <button 
              onClick={() => onNavigate('home')} 
              className="text-left text-sm hover:text-white transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <button 
              onClick={() => onNavigate('about')} 
              className="text-left text-sm hover:text-white transition-colors cursor-pointer"
            >
              À propos de nous
            </button>
            <button 
              onClick={() => onNavigate('team')} 
              className="text-left text-sm hover:text-white transition-colors cursor-pointer"
            >
              L'équipe
            </button>
            <button 
              onClick={() => onOpenShowroom()} 
              className="text-left text-sm hover:text-white transition-colors cursor-pointer"
            >
              Le Showroom
            </button>
            <button 
              onClick={() => onNavigate('formations')} 
              className="text-left text-sm hover:text-white transition-colors cursor-pointer"
            >
              Nos formations
            </button>
            <button 
              onClick={() => onOpenWork()} 
              className="text-left text-sm hover:text-white transition-colors cursor-pointer"
            >
              Nos véhicules & formules
            </button>
          </div>

          {/* Column 3: Formations */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white font-bold mb-1 tracking-wide">Formations</h4>
            <button 
              onClick={() => onOpenFormationDetail ? onOpenFormationDetail('permis-b-meca') : onNavigate('formations')} 
              className="text-left text-sm hover:text-[#ff4d00] transition-colors cursor-pointer"
            >
              Permis B (manuelle)
            </button>
            <button 
              onClick={() => onOpenFormationDetail ? onOpenFormationDetail('permis-b-auto') : onNavigate('formations')} 
              className="text-left text-sm hover:text-[#ff4d00] transition-colors cursor-pointer"
            >
              Permis B (auto)
            </button>
            <button 
              onClick={() => onOpenFormationDetail ? onOpenFormationDetail('conduite-accompagnee') : onNavigate('formations')} 
              className="text-left text-sm hover:text-[#ff4d00] transition-colors cursor-pointer"
            >
              Conduite accompagnée
            </button>
            <button 
              onClick={() => onOpenFormationDetail ? onOpenFormationDetail('moto-a2') : onNavigate('formations')} 
              className="text-left text-sm hover:text-[#ff4d00] transition-colors cursor-pointer"
            >
              Permis Moto A2
            </button>
          </div>

          {/* Column 4: Informations */}
          <div className="flex flex-col space-y-3">
            <h4 className="text-white font-bold mb-1 tracking-wide">Informations</h4>
            <button 
              onClick={() => onOpenLegal('mentions')} 
              className="text-left text-sm hover:text-white transition-colors"
            >
              Mentions légales
            </button>
            <button 
              onClick={() => onOpenLegal('privacy')} 
              className="text-left text-sm hover:text-white transition-colors"
            >
              Politique de confidentialité
            </button>
            <button 
              onClick={() => onOpenLegal('cookies')} 
              className="text-left text-sm hover:text-white transition-colors"
            >
              Gestion des cookies
            </button>
          </div>

          {/* Column 5: Contact & CTA */}
          <div className="flex flex-col space-y-5 lg:col-span-1">
            <h4 className="text-white font-bold mb-0 tracking-wide">Contact</h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <a 
                  href="tel:0145301515" 
                  className="flex items-center gap-3 text-zinc-300 hover:text-white group transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#ff4d00] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="group-hover:underline">01 45 30 15 15</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@convention-permis.fr" 
                  className="flex items-center gap-3 text-zinc-300 hover:text-white group transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#ff4d00] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="group-hover:underline break-all">contact@convention-permis.fr</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://maps.google.com/?q=122+rue+de+l%27Abb%C3%A9+Groult+75015+Paris" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-start gap-3 text-zinc-300 hover:text-white group transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#ff4d00] group-hover:scale-110 transition-transform shrink-0 mt-0.5" />
                  <span className="group-hover:underline">122 rue de l'Abbé Groult<br />75015 Paris</span>
                </a>
              </li>
            </ul>
            
            <div className="pt-2">
              <a 
                href="https://wa.me/33699774576" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-green-500/20"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500">
            © 2026 Convention Permis. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-xs text-zinc-500">
            <button 
              onClick={() => onOpenLegal('mentions')} 
              className="hover:text-zinc-300 transition-colors"
            >
              Mentions Légales
            </button>
            <span>•</span>
            <button 
              onClick={() => onOpenLegal('privacy')} 
              className="hover:text-zinc-300 transition-colors"
            >
              Confidentialité
            </button>
            <span>•</span>
            <button 
              onClick={() => onOpenLegal('cookies')} 
              className="hover:text-zinc-300 transition-colors"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
