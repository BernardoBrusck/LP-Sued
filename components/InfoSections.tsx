
import React, { useRef } from 'react';
import { SectionTitle, Reveal } from './UI';
import { Check, Award, Shield, Zap, Scale, BookOpen, Search, FileText } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- About Section ---
export const About = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden group/about" aria-labelledby="about-title">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 hidden lg:block border-l border-gray-100" aria-hidden="true"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Image Column */}
          <div className="w-full lg:w-5/12 relative">
            <Reveal width="100%">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl shadow-gray-200">
                <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Retrato profissional de Romário Sued" 
                  className="w-full h-full object-cover transition-all duration-[1s] ease-out group-hover/about:scale-105 img-grayscale group-hover/about:filter-none"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                
                {/* Name tag on image */}
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <p className="text-xs uppercase tracking-widest mb-1 opacity-80">Sócio Fundador</p>
                  <p className="font-serif text-2xl">Romário Sued</p>
                </div>
              </div>
            </Reveal>
            
            {/* Decorative Element */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-brand-gold/5 rounded-full blur-3xl"></div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-7/12 pt-4">
            <Reveal delay={0.1}>
               <div className="flex items-center gap-3 mb-6" aria-hidden="true">
                 <div className="h-px w-8 bg-brand-gold"></div>
                 <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase">
                    Sobre o Escritório
                 </span>
               </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 id="about-title" className="font-serif text-4xl lg:text-5xl lg:leading-tight text-brand-black mb-8">
                Advocacia artesanal com <br/> <span className="text-brand-gold italic">precisão cirúrgica</span>.
              </h2>
            </Reveal>

            <div className="space-y-8 max-w-xl">
              <Reveal delay={0.3}>
                <p className="text-lg text-gray-800 font-medium leading-relaxed border-l-2 border-brand-gold pl-6 py-1">
                  "O mercado não aceita mais respostas padronizadas. Nossa atuação combina profundidade acadêmica com uma visão agressiva de negócios."
                </p>
              </Reveal>
              
              <Reveal delay={0.4}>
                <p className="text-gray-600 leading-relaxed font-light">
                  Com mais de uma década de atuação, fundei o escritório com uma premissa clara: eliminar o "juridiquês" e focar no resultado financeiro e segurança jurídica do cliente.
                  Especialista em teses tributárias de alto valor e regularização fundiária complexa, lidero uma equipe orientada por dados e eficiência.
                </p>
              </Reveal>
            </div>

            {/* Stats Grid */}
            <Reveal delay={0.5}>
              <dl className="mt-16 grid grid-cols-3 gap-8 border-t border-gray-100 pt-8">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Atuação</dt>
                  <dd className="font-serif text-4xl text-brand-black">10<span className="text-brand-gold text-2xl">+</span></dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Casos</dt>
                  <dd className="font-serif text-4xl text-brand-black">500<span className="text-brand-gold text-2xl">+</span></dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Recuperados</dt>
                  <dd className="font-serif text-4xl text-brand-black">50<span className="text-brand-gold text-2xl">mi</span></dd>
                </div>
              </dl>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Methodology Section ---
export const Methodology = () => {
  const steps = [
    { title: "Diagnóstico", desc: "Análise profunda da situação fática e documental para identificar riscos e oportunidades ocultas." },
    { title: "Estratégia", desc: "Definição do caminho jurídico mais seguro, econômico e eficiente, com cronograma claro de atuação." },
    { title: "Execução", desc: "Atuação combativa e técnica em todas as instâncias administrativas e judiciais." },
    { title: "Resultado", desc: "Transparência total na prestação de contas e foco na resolução definitiva do conflito." }
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  // Adjusted offsets: Start filling when the top of the container hits the center of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 md:py-32 bg-brand-light relative" aria-labelledby="methodology-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Sticky Text Side */}
          <div className="lg:sticky lg:top-32">
            <div id="methodology-title">
               <SectionTitle subtitle="O Processo" title="Nossa Metodologia" />
            </div>
            <Reveal>
              <p className="text-gray-600 text-lg max-w-md leading-relaxed mb-10">
                Não acreditamos em sorte. Acreditamos em método, preparação e execução técnica impecável. Cada caso é tratado como um projeto único com etapas bem definidas.
              </p>
            </Reveal>
            
            <Reveal delay={0.2} width="100%">
                <div className="p-8 md:p-10 bg-white border border-gray-100 rounded-xl shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-brand-gold/10 rounded-lg">
                            <FileText className="text-brand-gold" size={24} />
                        </div>
                        <h4 className="font-bold text-xl text-brand-black font-serif">Transparência Radical</h4>
                    </div>
                    <p className="text-gray-500 leading-relaxed">
                        Você acompanha cada movimento do processo através de relatórios mensais detalhados e acesso direto à equipe.
                    </p>
                </div>
            </Reveal>
          </div>

          {/* Timeline Container */}
          <div ref={containerRef} className="relative pt-4">
             
             {/* Background Track Line */}
             <div className="absolute left-[8px] top-8 bottom-8 w-[1px] bg-gray-200" aria-hidden="true"></div>

             {/* Dynamic Progress Bar (Gold) */}
             <motion.div 
                style={{ height }}
                className="absolute left-[8px] top-8 w-[1px] bg-brand-gold origin-top z-10"
                aria-hidden="true"
             />

            <div className="space-y-20 relative z-20">
              {steps.map((step, idx) => (
                <div key={idx} className="relative pl-10 group">
                    <Reveal width="100%" delay={idx * 0.1}>
                        <div className="flex flex-col gap-2">
                            {/* Text Content */}
                            <div className="pt-0">
                                <h3 className="text-3xl font-bold font-serif text-brand-black mb-3 group-hover:text-brand-gold transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Why Us Section ---
export const WhyUs = () => {
  const reasons = [
    { icon: <Zap aria-hidden="true" />, title: "Agilidade", desc: "Processos internos otimizados para respostas rápidas." },
    { icon: <Award aria-hidden="true" />, title: "Excelência", desc: "Profundidade técnica acadêmica aplicada à prática." },
    { icon: <Shield aria-hidden="true" />, title: "Segurança", desc: "Mitigação de riscos como prioridade absoluta." },
    { icon: <Check aria-hidden="true" />, title: "Ética", desc: "Transparência radical sobre riscos e possibilidades." },
  ];

  return (
    <section className="py-24 bg-white" aria-labelledby="why-us-title">
      <div className="max-w-7xl mx-auto px-6">
        <div id="why-us-title">
            <SectionTitle subtitle="Diferenciais" title="Por Que Nos Escolher" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
          {reasons.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1} width="100%">
              <motion.div 
                className="bg-white p-10 h-full hover:bg-gray-50 transition-colors duration-300 relative group overflow-hidden"
              >
                 <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                
                <motion.div 
                  className="mb-8 text-gray-400 group-hover:text-brand-gold transition-colors"
                >
                  {/* Fix: Cast icon to any to allow size and strokeWidth props */}
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 32, strokeWidth: 1.5 })}
                </motion.div>
                
                <h3 className="text-lg font-bold font-serif text-brand-black mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
