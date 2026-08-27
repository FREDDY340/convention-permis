import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', id: 'home' },
    { label: 'À propos de nous', id: 'about' },
    { label: "L'équipe", id: 'team' },
    { label: 'Le Showroom', id: 'showroom' },
    { label: 'Nos formations', id: 'formations' },
    { label: 'Nos véhicules', id: 'vehicules' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 text-white ${
      isScrolled || mobileMenuOpen
        ? 'bg-[#09090b]/95 backdrop-blur-xl border-b border-white/10 py-1 shadow-2xl'
        : 'bg-transparent py-0'
    }`}>
      <div className="w-full px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Nav Links */}
        <nav
          id="main-nav-links"
          className="hidden md:flex items-center gap-8 lg:gap-12"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`relative text-xs lg:text-[13px] tracking-[0.22em] font-semibold uppercase transition-colors py-2 group cursor-pointer ${
                  isActive ? 'text-white font-bold' : 'text-zinc-300 hover:text-[#ff4d00]'
                }`}
              >
                {item.label}
                {/* Active Orange Bar Underline */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff4d00] rounded-full" />
                )}
                {!isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#ff4d00] transition-all duration-300 group-hover:w-full rounded-full opacity-60" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Area */}
        <div className="hidden sm:flex items-center gap-4">
        </div>

        {/* Mobile menu trigger */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl text-zinc-200 bg-white/5 border border-white/10 hover:text-[#ff4d00] hover:bg-white/10 focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#ff4d00]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090b]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`text-left text-sm tracking-[0.18em] font-semibold py-3 px-4 rounded-xl transition-all ${
                    isActive
                      ? 'text-white bg-[#ff4d00] font-bold shadow-lg shadow-[#ff4d00]/20'
                      : 'text-zinc-200 hover:text-white hover:bg-white/10 active:bg-white/15'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
