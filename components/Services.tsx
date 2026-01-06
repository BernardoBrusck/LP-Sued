
import React from 'react';
import { SectionTitle, Reveal } from './UI';
import { 
  TrendingUp, Scale, RefreshCw, FileText, Building, 
  Shield, Key, Search, ArrowUpRight, Briefcase, 
  CircleDollarSign, Calculator, Handshake, Users, 
  HeartPulse, Activity 
} from 'lucide-react';
import { motion } from 'framer-motion';

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
          group relative w-full h-[300px] sm:h-[340px]
          overflow-hidden rounded-xl border transition-all duration-500 cursor-pointer flex flex-col justify-between
          ${isDark 
            ? 'bg-[#121212]/80 backdrop-blur-md border-white/10 hover:border-brand-gold/40' 
            : 'bg-white border-gray-100 hover:border-brand-gold/40 hover:shadow-xl hover:shadow-gray-200/50'
          }
        `}
        initial="rest"
        whileHover="hover"
        whileTap="hover"
        animate="rest"
      >
        {/* Hover Gradient Background */}
        <MotionDiv
          className={`absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100
            ${isDark 
              ? 'bg-gradient-to-b from-brand-gold/5 via-[#121212]/40 to-[#121212]/90' 
              : 'bg-gradient-to-br from-brand-gold/5 via-white to-white'
            }
          `}
        />

        <div className="relative p-8 h-full flex flex-col z-10">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <MotionDiv
              variants={{
                rest: { scale: 1, color: isDark ? '#ffffff' : '#0a0a0a' },
                hover: { scale: 0.9, color: '#B4975A' }
              }}
              className="p-3 bg-brand-light/5 rounded-lg backdrop-blur-sm"
            >
              {icon}
            </MotionDiv>
            
            <MotionDiv
              variants={{
                rest: { opacity: 0.3, x: 5, y: -5 },
                hover: { opacity: 1, x: 0, y: 0 }
              }}
              transition={{ duration: 0.3 }}
              className={`p-2 rounded-full border ${isDark ? 'border-white/20' : 'border-black/10'}`}
            >
              <ArrowUpRight className={isDark ? "text-white" : "text-brand-black"} size={16} />
            </MotionDiv>
          </div>

          {/* Content */}
          <div className="mt-auto">
            <MotionH3 
              className={`font-serif text-2xl font-medium leading-tight mb-3 ${isDark ? 'text-white' : 'text-brand-black'}`}
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              }}
            >
              {title}
            </MotionH3>
            
            <MotionDiv
                className="overflow-hidden"
                variants={{
                    rest: { opacity: 0.7, height: "auto" },
                    hover: { opacity: 1, height: "auto" }
                }}
            >
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                    {desc}
                </p>
                
                <MotionDiv 
                  className={`h-0.5 bg-brand-gold mt-4 w-0 group-hover:w-full transition-all duration-500 ease-out`}
                />
            </MotionDiv>
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
        <SectionTitle subtitle="Especialidade" title="Direito Tributário" />
        
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 hide-scrollbar">
          {services.map((service, idx) => (
            <div key={idx} className="min-w-[85vw] sm:min-w-0 snap-center">
               <ServiceCard index={idx} {...service} theme="light" />
            </div>
          ))}
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
    <section className="py-20 sm:py-32 relative text-white overflow-hidden">
      {/* Fixed Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-fixed bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-[2px]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Especialidade" title="Direito Imobiliário" dark={true} />
        
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 hide-scrollbar">
          {services.map((service, idx) => (
            <div key={idx} className="min-w-[85vw] sm:min-w-0 snap-center">
              <ServiceCard index={idx} {...service} theme="dark" />
            </div>
          ))}
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
        <SectionTitle subtitle="Especialidade" title="Direito Empresarial" />
        
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 hide-scrollbar">
          {services.map((service, idx) => (
            <div key={idx} className="min-w-[85vw] sm:min-w-0 snap-center">
               <ServiceCard index={idx} {...service} theme="light" />
            </div>
          ))}
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
    <section className="py-20 sm:py-32 relative text-white overflow-hidden">
      {/* Fixed Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop')] bg-fixed bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-[#171717]/90 backdrop-blur-[2px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle subtitle="Especialidade" title="Direito Previdenciário" dark={true} />
        
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 hide-scrollbar">
          {services.map((service, idx) => (
            <div key={idx} className="min-w-[85vw] sm:min-w-0 snap-center">
              <ServiceCard index={idx} {...service} theme="dark" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
