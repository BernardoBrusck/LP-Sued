import React, { useLayoutEffect, useRef, useState } from 'react';
import { SectionTitle, Reveal, Modal } from './UI';
import TextBlockAnimation from './ui/text-block-animation';

import {
  TrendingUp, Scale, RefreshCw, FileText, Building,
  Shield, Key, Search, ArrowUpRight, Briefcase,
  CircleDollarSign, Calculator, Handshake, Users,
  HeartPulse, Activity, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

// --- Types ---
interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
  details: React.ReactNode;
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
  onClick: () => void;
}

interface ServiceSectionProps {
  id?: string;
  title: React.ReactNode;
  subtitle: string;
  services: ServiceItem[];
  className?: string;
  bgImage?: string;
}

// --- Responsive Service Card Component ---
const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, desc, index, onClick }) => {
  const MotionDiv = motion.div as any;
  const MotionH3 = motion.h3 as any;

  return (
    <Reveal delay={index * 0.1} width="100%">
      <MotionDiv
        onClick={onClick}
        className={`
          group relative w-full h-[320px] sm:h-[360px]
          overflow-hidden rounded-md transition-all duration-500 cursor-pointer flex flex-col justify-between
          bg-white/[0.03] backdrop-blur-sm border border-white/10 lg:hover:border-brand-gold/50
          hover:shadow-2xl hover:shadow-brand-gold/10
        `}
        initial="rest"
        whileHover={typeof window !== 'undefined' && window.innerWidth >= 1024 ? "hover" : "rest"}
        whileTap="rest"
        animate="rest"
      >
        {/* Hover Gradient Background */}
        <MotionDiv
          className={`absolute inset-0 opacity-0 transition-opacity duration-700 lg:group-hover:opacity-100 pointer-events-none
            bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/20 via-[#121212] to-[#121212]
          `}
        />

        <div className="relative p-8 h-full flex flex-col z-10">
          {/* ... keeping content same ... */}
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <MotionDiv
              variants={{
                rest: { scale: 1, x: 0, color: '#ffffff', backgroundColor: 'transparent' },
                hover: { scale: 1, x: 5, color: '#B4975A', backgroundColor: 'transparent' }
              }}
              transition={{ duration: 0.4 }}
              className="p-0"
            >
              {React.cloneElement(icon as React.ReactElement, { strokeWidth: 1.5, size: 36 })}
            </MotionDiv>

            <MotionDiv
              variants={{
                rest: { opacity: 0.2, x: 0, y: 0, scale: 1, rotate: 0 },
                hover: { opacity: 1, x: 2, y: -2, scale: 1.1, color: '#B4975A', rotate: 45 }
              }}
              className="text-white"
            >
              <Plus size={24} strokeWidth={1.5} />
            </MotionDiv>
          </div>

          {/* Content */}
          <div className="mt-auto relative">
            {/* Dynamic Line above title */}
            <MotionDiv
              variants={{
                rest: { width: 0, opacity: 0 },
                hover: { width: 40, opacity: 1, backgroundColor: '#B4975A' }
              }}
              className="h-[2px] mb-4"
            />

            <div className="relative">
              <TextBlockAnimation delay={0.2 + (index * 0.1)} animateOnScroll={false}> {/* Should we animate on scroll? The card itself reveals. Maybe internal text should just appear? Or block reveal? */}
                {/* User asked for block reveal on EVERYTHING. */}
                {/* The problem: these cards are inside a horizontal scroll/stack. ScrollTrigger might be tricky. */}
                {/* Let's try animateOnScroll={true} but rely on the parent visibility? */}
                {/* Actually, for cards that appear on screen, the reveal is nice. */}
                <MotionH3
                  className="font-serif text-3xl mb-4 tracking-tight text-white"
                  variants={{
                    rest: { y: 0 },
                    hover: { y: -2 }
                  }}
                >
                  {title}
                </MotionH3>
              </TextBlockAnimation>
            </div>

            <div className="relative">
              <TextBlockAnimation delay={0.3 + (index * 0.1)} duration={0.3} animateOnScroll={false}>
                <p className="text-sm leading-relaxed font-light text-gray-400 group-hover:text-gray-300">
                  {desc}
                </p>
              </TextBlockAnimation>
            </div>
          </div>
        </div>
      </MotionDiv>
    </Reveal>
  );
};

// --- Reusable Service Section ---
const ServiceSection: React.FC<ServiceSectionProps> = ({ title, subtitle, services, className, bgImage }) => {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  return (
    <section className={`min-h-screen py-12 sm:py-20 relative text-white border-b border-gray-900 ${className}`}>
      {bgImage && (
        <>
          <div className={`absolute inset-0 bg-cover bg-center`} style={{ backgroundImage: `url('${bgImage}')` }}></div>
          <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-[2px]"></div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle={subtitle} title={title} dark={true} />

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 hide-scrollbar scroll-smooth">
            {services.map((service, idx) => (
              <div key={idx} className="min-w-[85vw] sm:min-w-0 snap-center">
                <ServiceCard
                  index={idx}
                  icon={service.icon}
                  title={service.title}
                  desc={service.desc}
                  onClick={() => setActiveService(service)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        title={activeService?.title || ''}
      >
        {activeService?.details}
      </Modal>
    </section>
  );
};

// --- Area Data & Wrappers ---

const loremIpsum = (
  <>
    <p>Aguardando descrição detalhada do serviço.</p>
    <p className="mt-4">Nossa atuação neste segmento foca em resultados expressivos e segurança jurídica total para nossos clientes, utilizando as mais modernas teses e jurisprudências.</p>
    <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-400">
      <li>Análise estratégica aprofundada</li>
      <li>Relatórios técnicos detalhados</li>
      <li>Acompanhamento processual full-time</li>
      <li>Atuação em todas as instâncias</li>
    </ul>
  </>
);
export const TaxServices = () => {
  // ... data ...
  const services: ServiceItem[] = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Planejamento Fiscal",
      desc: "Estratégias lícitas para redução de carga tributária e otimização de fluxo de caixa.",
      details: loremIpsum
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Recuperação de Créditos",
      desc: "Identificação e resgate de valores pagos indevidamente nos últimos 5 anos.",
      details: loremIpsum
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Defesa Administrativa",
      desc: "Atuação técnica contra autos de infração e multas abusivas estaduais e federais.",
      details: loremIpsum
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Consultoria Tributária",
      desc: "Pareceres técnicos para operações complexas, M&A e reestruturações.",
      details: loremIpsum
    }
  ];

  return <ServiceSection
    title={<>Direito <br className="block md:hidden" />Tributário</>}
    subtitle="Especialidade"
    services={services}
    className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/15 via-[#0a0a0a] to-black"
  />;
};

export const RealEstateServices = () => {
  // ... data ...
  const services: ServiceItem[] = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Regularização Fundiária",
      desc: "Soluções para imóveis irregulares via usucapião e retificação de registro.",
      details: loremIpsum
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Contratos Complexos",
      desc: "Built to suit, permutas e operações estruturadas com total segurança jurídica.",
      details: loremIpsum
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Incorporação Imobiliária",
      desc: "Assessoria completa para construtoras, do memorial de incorporação à entrega.",
      details: loremIpsum
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Due Diligence",
      desc: "Auditoria profunda pré-aquisição para mitigação de riscos ocultos.",
      details: loremIpsum
    }
  ];

  return <ServiceSection
    title={<>Direito <br className="block md:hidden" />Imobiliário</>}
    subtitle="Especialidade"
    services={services}
    className="bg-black/40 backdrop-blur-md"
    bgImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  />;
};

export const BusinessTaxServices = () => {
  // ... data ...
  const services: ServiceItem[] = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Reestruturação Societária",
      desc: "Otimização da estrutura jurídica para redução de custos tributários e proteção de sócios.",
      details: loremIpsum
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Compliance Fiscal",
      desc: "Auditoria preventiva para evitar passivos e garantir conformidade fiscal contínua.",
      details: loremIpsum
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Operações de M&A",
      desc: "Due diligence fiscal profunda em processos de fusões e aquisições empresariais.",
      details: loremIpsum
    },
    {
      icon: <CircleDollarSign className="w-8 h-8" />,
      title: "Incentivos Setoriais",
      desc: "Identificação de regimes especiais e benefícios para expansão industrial e comercial.",
      details: loremIpsum
    }
  ];

  return <ServiceSection
    title={<>Direito <br className="block md:hidden" />Empresarial</>}
    subtitle="Especialidade"
    services={services}
    className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-gold/15 via-[#0a0a0a] to-black"
  />;
};

export const SocialSecurityServices = () => {
  // ... data ...
  const services: ServiceItem[] = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Planejamento Previdenciário",
      desc: "Análise técnica de tempo de cultura para garantir a melhor aposentadoria possível.",
      details: loremIpsum
    },
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "Revisão de Benefícios",
      desc: "Recálculo de valores para corrigir erros de concessão do INSS e recuperar perdas.",
      details: loremIpsum
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Incapacidade & Acidentes",
      desc: "Defesa de direitos para concessão de auxílios e aposentadoria por invalidez.",
      details: loremIpsum
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Gestão de Passivo",
      desc: "Assessoria empresarial para redução de custos com afastamentos e NTEP/FAP.",
      details: loremIpsum
    }
  ];

  return <ServiceSection
    title={<>Direito <br className="block md:hidden" />Previdenciário</>}
    subtitle="Especialidade"
    services={services}
    className="bg-black/40 backdrop-blur-md"
    bgImage="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop"
  />;
};

// --- Services Stack Wrapper ---
// Keeping the GSAP ScrollTrigger logic from the original file
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ServicesStack = ({ setForceHideNav }: { setForceHideNav?: (hide: boolean) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar Control Trigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => setForceHideNav && setForceHideNav(true),
        onLeave: () => setForceHideNav && setForceHideNav(false),
        onEnterBack: () => setForceHideNav && setForceHideNav(true),
        onLeaveBack: () => setForceHideNav && setForceHideNav(false),
      });

      const cards = gsap.utils.toArray('.service-section-card') as HTMLElement[];

      cards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="service-section-card z-10 min-h-screen flex flex-col justify-center bg-[#0a0a0a] origin-top">
        <TaxServices />
      </div>
      <div className="service-section-card z-20 min-h-screen flex flex-col justify-center bg-[#121212] origin-top">
        <RealEstateServices />
      </div>
      <div className="service-section-card z-30 min-h-screen flex flex-col justify-center bg-[#0a0a0a] origin-top">
        <BusinessTaxServices />
      </div>
      <div className="service-section-card z-40 min-h-screen flex flex-col justify-center bg-[#121212] origin-top">
        <SocialSecurityServices />
      </div>
    </div>
  );
};
