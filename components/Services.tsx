import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle, Reveal } from './UI';

gsap.registerPlugin(ScrollTrigger);

import {
  TrendingUp, Scale, RefreshCw, FileText, Building,
  Shield, Key, Search, ArrowUpRight, Briefcase,
  CircleDollarSign, Calculator, Handshake, Users,
  HeartPulse, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';



// ... (existing code)



// --- Responsive Service Card Component ---
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
  theme?: 'light' | 'dark';
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, desc, index, theme = 'light' }) => {
  const isDark = theme === 'dark';
  const MotionDiv = motion.div as any;
  const MotionH3 = motion.h3 as any;

  return (
    <Reveal delay={index * 0.1} width="100%">
      <MotionDiv
        className={`
          group relative w-full h-[320px] sm:h-[360px]
          overflow-hidden rounded-sm transition-all duration-500 cursor-pointer flex flex-col justify-between
          ${isDark
            ? 'bg-[#121212] border border-white/5 lg:hover:border-brand-gold/50'
            : 'bg-white border border-gray-200 lg:hover:border-brand-gold/50 lg:hover:shadow-[0_10px_40px_-15px_rgba(180,151,90,0.15)]'
          }
        `}
        initial="rest"
        whileHover={typeof window !== 'undefined' && window.innerWidth >= 1024 ? "hover" : "rest"}
        whileTap="rest"
        animate="rest"
      >
        {/* Hover Gradient Background */}
        <MotionDiv
          className={`absolute inset-0 opacity-0 transition-opacity duration-700 lg:group-hover:opacity-100 pointer-events-none
            ${isDark
              ? 'bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/10 via-[#121212] to-[#121212]'
              : 'bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-gold/5 via-white to-white'
            }
          `}
        />

        <div className="relative p-8 h-full flex flex-col z-10">

          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <MotionDiv
              variants={{
                rest: { scale: 1, x: 0, color: isDark ? '#ffffff' : '#0a0a0a', backgroundColor: 'transparent' },
                hover: { scale: 1, x: 5, color: '#B4975A', backgroundColor: 'transparent' }
              }}
              transition={{ duration: 0.4 }}
              className="p-0"
            >
              {React.cloneElement(icon as React.ReactElement, { strokeWidth: 1.5, size: 36 })}
            </MotionDiv>

            <MotionDiv
              variants={{
                rest: { opacity: 0.2, x: 0, y: 0, scale: 1 },
                hover: { opacity: 1, x: 2, y: -2, scale: 1.1, color: '#B4975A' }
              }}
              className={`text-brand-black ${isDark ? 'text-white' : 'text-brand-black'}`}
            >
              <ArrowUpRight size={20} strokeWidth={1.5} />
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

            <MotionH3
              className={`font-serif text-3xl mb-4 tracking-tight ${isDark ? 'text-white' : 'text-brand-black group-hover:text-brand-black'}`}
              variants={{
                rest: { y: 0 },
                hover: { y: -2 }
              }}
            >
              {title}
            </MotionH3>

            <p className={`text-sm leading-relaxed font-light ${isDark ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-600'}`}>
              {desc}
            </p>
          </div>
        </div>
      </MotionDiv>
    </Reveal>
  );
};

export const TaxServices = () => {
  const services = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Planejamento Fiscal",
      desc: "Estratégias lícitas para redução de carga tributária e otimização de fluxo de caixa."
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Recuperação de Créditos",
      desc: "Identificação e resgate de valores pagos indevidamente nos últimos 5 anos."
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Defesa Administrativa",
      desc: "Atuação técnica contra autos de infração e multas abusivas estaduais e federais."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Consultoria Tributária",
      desc: "Pareceres técnicos para operações complexas, M&A e reestruturações."
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-gray-50 relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Especialidade" title={<>Direito <br className="block md:hidden" />Tributário</>} />

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 hide-scrollbar scroll-smooth">
            {services.map((service, idx) => (
              <div key={idx} className="min-w-[85vw] sm:min-w-0 snap-center">
                <ServiceCard index={idx} {...service} theme="light" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const RealEstateServices = () => {
  const services = [
    {
      icon: <Building className="w-8 h-8" />,
      title: "Regularização Fundiária",
      desc: "Soluções para imóveis irregulares via usucapião e retificação de registro."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Contratos Complexos",
      desc: "Built to suit, permutas e operações estruturadas com total segurança jurídica."
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: "Incorporação Imobiliária",
      desc: "Assessoria completa para construtoras, do memorial de incorporação à entrega."
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Due Diligence",
      desc: "Auditoria profunda pré-aquisição para mitigação de riscos ocultos."
    }
  ];

  return (
    <section className="min-h-screen py-20 sm:py-32 relative text-white">
      {/* Fixed Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-[2px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Especialidade" title={<>Direito <br className="block md:hidden" />Imobiliário</>} dark={true} />

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 hide-scrollbar scroll-smooth">
            {services.map((service, idx) => (
              <div key={idx} className="min-w-[85vw] sm:min-w-0 snap-center">
                <ServiceCard index={idx} {...service} theme="dark" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const BusinessTaxServices = () => {
  const services = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Reestruturação Societária",
      desc: "Otimização da estrutura jurídica para redução de custos tributários e proteção de sócios."
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: "Compliance Fiscal",
      desc: "Auditoria preventiva para evitar passivos e garantir conformidade fiscal contínua."
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Operações de M&A",
      desc: "Due diligence fiscal profunda em processos de fusões e aquisições empresariais."
    },
    {
      icon: <CircleDollarSign className="w-8 h-8" />,
      title: "Incentivos Setoriais",
      desc: "Identificação de regimes especiais e benefícios para expansão industrial e comercial."
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-white relative border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle subtitle="Especialidade" title={<>Direito <br className="block md:hidden" />Empresarial</>} />

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 hide-scrollbar scroll-smooth">
            {services.map((service, idx) => (
              <div key={idx} className="min-w-[85vw] sm:min-w-0 snap-center">
                <ServiceCard index={idx} {...service} theme="light" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const SocialSecurityServices = () => {
  const services = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Planejamento Previdenciário",
      desc: "Análise técnica de tempo de cultura para garantir a melhor aposentadoria possível."
    },
    {
      icon: <HeartPulse className="w-8 h-8" />,
      title: "Revisão de Benefícios",
      desc: "Recálculo de valores para corrigir erros de concessão do INSS e recuperar perdas."
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Incapacidade & Acidentes",
      desc: "Defesa de direitos para concessão de auxílios e aposentadoria por invalidez."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Gestão de Passivo",
      desc: "Assessoria empresarial para redução de custos com afastamentos e NTEP/FAP."
    }
  ];

  return (
    <section className="min-h-screen py-20 sm:py-32 relative text-white">
      {/* Fixed Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-[#171717]/90 backdrop-blur-[2px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Especialidade" title={<>Direito <br className="block md:hidden" />Previdenciário</>} dark={true} />

        <div className="relative">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 hide-scrollbar scroll-smooth">
            {services.map((service, idx) => (
              <div key={idx} className="min-w-[85vw] sm:min-w-0 snap-center">
                <ServiceCard index={idx} {...service} theme="dark" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ServicesStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.service-card') as HTMLElement[];

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
      <div className="service-card z-10 min-h-screen flex flex-col justify-center bg-gray-50 origin-top">
        <TaxServices />
      </div>
      <div className="service-card z-20 min-h-screen flex flex-col justify-center bg-[#0a0a0a] origin-top">
        <RealEstateServices />
      </div>
      <div className="service-card z-30 min-h-screen flex flex-col justify-center bg-white origin-top">
        <BusinessTaxServices />
      </div>
      <div className="service-card z-40 min-h-screen flex flex-col justify-center bg-[#171717] origin-top">
        <SocialSecurityServices />
      </div>
    </div>
  );
};
