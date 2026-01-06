
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { TaxServices, RealEstateServices, BusinessTaxServices, SocialSecurityServices } from './components/Services';
import { About, Methodology, WhyUs } from './components/InfoSections';
import { FAQ, ContactAndFooter } from './components/Interactive';
import { NavBar } from './components/ui/tubelight-navbar';
import { HeroGeometric } from './components/ui/shape-landing-hero';
import { TestimonialsSection } from './components/ui/testimonial-v2';
import { Home, User, Briefcase, FileText, MessageCircle, ArrowUp } from 'lucide-react';

// --- Header Content (Reusable for Static & Sticky states) ---
const HeaderContent = () => (
  <>
    <a 
      href="#" 
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="text-xl md:text-2xl font-bold font-serif text-white tracking-tight flex items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded"
      aria-label="Romário Sued - Voltar ao início"
    >
      R.SUED<span className="text-brand-gold text-3xl leading-none" aria-hidden="true">.</span>
    </a>
    
    {/* Desktop CTA */}
    <button 
      onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
      className="hidden md:block px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest text-white border border-white/20 hover:bg-white hover:text-brand-black transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
    >
      Agendar Consulta
    </button>
  </>
);

// --- Static Top Header ---
const StaticHeader = () => {
  const { scrollY } = useScroll();
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  // Fix: Cast motion header to any to avoid type complexity
  const MotionHeader = motion.header as any;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroHeight = window.innerHeight - 100; 
    setIsScrolledPastHero(latest > heroHeight);
  });

  return (
    <>
      {/* 1. Initial Absolute Header */}
      <header className="absolute top-0 left-0 right-0 z-40 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full">
         <HeaderContent />
      </header>

      {/* 2. Sticky Fixed Header */}
      <AnimatePresence>
        {isScrolledPastHero && (
          <MotionHeader
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 shadow-2xl"
          >
             <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto w-full">
                <HeaderContent />
             </div>
          </MotionHeader>
        )}
      </AnimatePresence>
    </>
  );
};

const Divider = ({ text }: { text: string }) => (
  <div className="bg-[#0a0a0a] py-16 border-y border-white/5" role="separator">
    <div className="max-w-7xl mx-auto px-6">
      <h3 className="text-white/40 text-sm font-sans uppercase tracking-[0.3em] text-center">{text}</h3>
    </div>
  </div>
);

// --- Back To Top Button ---
const BackToTop = () => {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    // Fix: Cast motion button to any
    const MotionButton = motion.button as any;

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsVisible(latest > 500);
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <MotionButton
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 p-3 bg-brand-gold text-white rounded-full shadow-2xl hover:bg-white hover:text-brand-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-gold"
                    aria-label="Voltar ao topo da página"
                >
                    <ArrowUp size={20} aria-hidden="true" />
                </MotionButton>
            )}
        </AnimatePresence>
    );
};

const App = () => {
  const { scrollY } = useScroll();
  const [showBottomNav, setShowBottomNav] = useState(false);

  // Fix: Cast motion div to any
  const MotionDiv = motion.div as any;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowBottomNav(latest > 100);
  });

  const navItems = [
    { name: 'Início', url: '#', icon: Home },
    { name: 'Sobre', url: '#sobre', icon: User },
    { name: 'Serviços', url: '#servicos', icon: Briefcase },
    { name: 'Método', url: '#metodologia', icon: FileText },
    { name: 'Contato', url: '#contato', icon: MessageCircle }
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-brand-black font-sans selection:bg-brand-gold selection:text-white" id="inicio">
      <StaticHeader />
      
      {/* Bottom Tubelight Navbar */}
      <AnimatePresence>
        {showBottomNav && (
          <MotionDiv
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, type: 'spring', damping: 20 }}
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-8 pointer-events-none"
          >
            <div className="pointer-events-auto">
               <NavBar items={navItems} />
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
      
      <HeroGeometric 
        badge="Especialista em Direito Estratégico"
        title1="Defesa de"
        title2="Alto Impacto."
      />
      <main>
        <div id="sobre"><About /></div>
        <Divider text="Nossas Especialidades" />
        <div id="servicos">
            <TaxServices />
            <RealEstateServices />
            <BusinessTaxServices />
            <SocialSecurityServices />
        </div>
        <div id="metodologia"><Methodology /></div>
        <WhyUs />
        <TestimonialsSection />
        <div id="faq"><FAQ /></div>
        <div id="contato"><ContactAndFooter /></div>
      </main>

      <BackToTop />
    </div>
  );
};

export default App;
