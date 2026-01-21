import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { ServicesStack } from './Services';
import { About, Methodology, WhyUs } from './InfoSections';
import { FAQ, ContactAndFooter } from './Interactive';
import { NavBar } from './ui/tubelight-navbar';
import { HeroPremium } from './ui/HeroPremium';
import { TestimonialsSection } from './ui/testimonial-v2';
import { User, Briefcase, FileText, ArrowUp } from 'lucide-react';

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
        setIsVisible(latest > 800);
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

const Home = () => {
    const { scrollY } = useScroll();
    const [showBottomNav, setShowBottomNav] = useState(false);
    const [forceHideNav, setForceHideNav] = useState(false);

    // Fix: Cast motion div to any
    const MotionDiv = motion.div as any;

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (forceHideNav) {
            setShowBottomNav(false);
        } else {
            setShowBottomNav(latest > 50);
        }
    });

    // Re-run visibility check when forceHideNav changes
    useEffect(() => {
        if (forceHideNav) {
            setShowBottomNav(false);
        } else {
            setShowBottomNav(scrollY.get() > 50);
        }
    }, [forceHideNav, scrollY]);

    const navItems = [
        { name: 'Sobre', url: '#sobre', icon: User },
        { name: 'Serviços', url: '#servicos', icon: Briefcase },
        { name: 'Método', url: '#metodologia', icon: FileText }
    ];

    return (
        <div className="bg-[#FAFAFA] min-h-screen text-brand-black font-sans selection:bg-brand-gold selection:text-white" id="inicio">

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

            <HeroPremium />
            <main>
                <div id="sobre"><About /></div>
                <Divider text="Nossas Especialidades" />
                <div id="servicos">
                    <ServicesStack setForceHideNav={setForceHideNav} />
                </div>
                <div id="metodologia">
                    <Methodology />
                    <TestimonialsSection />
                    <WhyUs />
                    <div id="faq"><FAQ /></div>
                </div>
                <div id="contato"><ContactAndFooter /></div>
            </main>

            <BackToTop />
        </div>
    );
};

export default Home;
