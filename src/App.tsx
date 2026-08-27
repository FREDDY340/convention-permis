import { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { FormationsSection } from './components/FormationsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ShowreelModal } from './components/ShowreelModal';
import { ContactModal } from './components/ContactModal';
import { WorkModal } from './components/WorkModal';
import { ShowroomModal } from './components/ShowroomModal';
import { LegalModal, LegalTab } from './components/LegalModal';
import { VehiclesPage } from './components/VehiclesPage';
import { FormationDetailModal } from './components/FormationDetailModal';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState('home');
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [workCategory, setWorkCategory] = useState('TOUS');
  const [selectedFormation, setSelectedFormation] = useState('');
  const [showroomOpen, setShowroomOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('mentions');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailFormationId, setDetailFormationId] = useState<string | null>(null);

  const handleOpenFormationDetail = (formationId: string) => {
    setDetailFormationId(formationId);
    setDetailModalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'work') {
      setWorkCategory('TOUS');
      setWorkOpen(true);
      return;
    } else if (sectionId === 'showroom') {
      setShowroomOpen(true);
      return;
    }

    if (sectionId === 'vehicules') {
      setActiveSection('vehicules');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveSection(sectionId);
    
    setTimeout(() => {
      if (sectionId === 'contact') {
        const el = document.getElementById('contact-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionId === 'about') {
        const el = document.getElementById('about-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionId === 'team') {
        const el = document.getElementById('team-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionId === 'formations') {
        const el = document.getElementById('formations-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDiscover = (category?: string) => {
    setWorkCategory(category || 'TOUS');
    setWorkOpen(true);
  };

  const handleRegister = (formationId?: string) => {
    if (formationId) {
      setSelectedFormation(formationId);
    }
    if (activeSection !== 'home') {
      setActiveSection('home');
    }
    setWorkOpen(false);
    setShowroomOpen(false);
    setTimeout(() => {
      const el = document.getElementById('contact-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans selection:bg-[#ff4d00] selection:text-white relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#ff4d00] origin-left z-[100]"
        style={{ scaleX }}
      />
      
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
        onOpenContact={() => setContactOpen(true)}
      />

      {/* Main Content Area */}
      {activeSection === 'vehicules' ? (
        <VehiclesPage onNavigate={handleNavigate} />
      ) : (
        <main className="flex-1 flex flex-col justify-center">
          <HeroSection
            onOpenWork={() => handleNavigate('formations')}
            onOpenShowreel={() => setShowreelOpen(true)}
          />
          <AboutSection onNavigate={handleNavigate} />
          <FormationsSection 
            onDiscover={handleDiscover}
            onRegister={handleRegister}
            onOpenDetail={handleOpenFormationDetail}
          />
          <TestimonialsSection />
          <ContactSection 
            selectedFormation={selectedFormation}
          />
        </main>
      )}

      <Footer 
        onNavigate={handleNavigate}
        onOpenShowroom={() => setShowroomOpen(true)}
        onOpenWork={() => handleNavigate('vehicules')}
        onOpenLegal={handleOpenLegal}
        onOpenFormationDetail={handleOpenFormationDetail}
      />

      {/* Interactive Modals */}
      <FormationDetailModal
        isOpen={detailModalOpen}
        formationId={detailFormationId}
        onClose={() => setDetailModalOpen(false)}
        onSelectRegister={handleRegister}
      />

      <ShowreelModal
        isOpen={showreelOpen}
        onClose={() => setShowreelOpen(false)}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />

      <WorkModal
        isOpen={workOpen}
        initialCategory={workCategory}
        onClose={() => setWorkOpen(false)}
        onSelectFormation={handleRegister}
      />

      <ShowroomModal
        isOpen={showroomOpen}
        onClose={() => setShowroomOpen(false)}
        onNavigateContact={() => handleRegister()}
      />

      <LegalModal
        isOpen={legalOpen}
        initialTab={legalTab}
        onClose={() => setLegalOpen(false)}
      />
    </div>
  );
}
