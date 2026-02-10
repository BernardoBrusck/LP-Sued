
import React, { useRef } from 'react';
import { SectionTitle, Reveal } from './UI';
import { Check, Award, Shield, Zap, Scale, BookOpen, Search, FileText } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GoldSpotlight } from './ui/GoldSpotlight';
import TextBlockAnimation from './ui/text-block-animation';

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
                <div className="absolute bottom-6 left-6 text-white z-10 flex flex-col items-start gap-1">
                  <TextBlockAnimation delay={0.5} className="block">
                    <p className="text-xs uppercase tracking-widest opacity-80">Sócio Fundador</p>
                  </TextBlockAnimation>
                  <TextBlockAnimation delay={0.6} className="block">
                    <p className="font-serif text-2xl">Romário Sued</p>
                  </TextBlockAnimation>
                </div>
              </div>
            </Reveal>

            {/* Decorative Element */}
            <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-brand-gold/5 rounded-full blur-3xl"></div>
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-7/12 pt-4">
            {/* SectionTitle handled internally */}
            <div className="mb-6">
              <TextBlockAnimation delay={0.1}>
                <div className="flex items-center gap-3" aria-hidden="true">
                  <div className="h-px w-8 bg-brand-gold"></div>
                  <span className="text-brand-gold font-bold tracking-[0.2em] text-xs uppercase">
                    Sobre o Escritório
                  </span>
                </div>
              </TextBlockAnimation>
            </div>

            <div className="mb-8">
              <TextBlockAnimation delay={0.2} className="block">
                <h2 id="about-title" className="font-serif text-4xl lg:text-5xl lg:leading-tight text-brand-black">
                  Advocacia artesanal com <br /> <span className="text-brand-gold italic">precisão cirúrgica</span>.
                </h2>
              </TextBlockAnimation>
            </div>

            <div className="space-y-8 max-w-xl">
              <div className="border-l-2 border-brand-gold pl-6 py-1">
                <TextBlockAnimation delay={0.3}>
                  <p className="text-lg text-gray-800 font-medium leading-relaxed">
                    "O mercado não aceita mais respostas padronizadas. Nossa atuação combina profundidade acadêmica com uma visão agressiva de negócios."
                  </p>
                </TextBlockAnimation>
              </div>

              <TextBlockAnimation delay={0.4}>
                <p className="text-gray-600 leading-relaxed font-light">
                  Com mais de uma década de atuação, fundei o escritório com uma premissa clara: eliminar o "juridiquês" e focar no resultado financeiro e segurança jurídica do cliente.
                  Especialista em teses tributárias de alto valor e regularização fundiária complexa, lidero uma equipe orientada por dados e eficiência.
                </p>
              </TextBlockAnimation>
            </div>

            {/* Stats Grid */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-8">
              <div>
                <TextBlockAnimation delay={0.5}>
                  <dt className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Anos de Experiência</dt>
                </TextBlockAnimation>
                <TextBlockAnimation delay={0.6}>
                  <dd className="font-serif text-4xl text-brand-black">15<span className="text-brand-gold text-2xl">+</span></dd>
                </TextBlockAnimation>
              </div>
              <div>
                <TextBlockAnimation delay={0.6}>
                  <dt className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Casos Recuperados</dt>
                </TextBlockAnimation>
                <TextBlockAnimation delay={0.7}>
                  <dd className="font-serif text-4xl text-brand-black">1.2k<span className="text-brand-gold text-2xl">+</span></dd>
                </TextBlockAnimation>
              </div>
              <div>
                <TextBlockAnimation delay={0.7}>
                  <dt className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">Valores Recuperados</dt>
                </TextBlockAnimation>
                <TextBlockAnimation delay={0.8}>
                  <dd className="font-serif text-4xl text-brand-black">85<span className="text-brand-gold text-2xl">mi</span></dd>
                </TextBlockAnimation>
              </div>
            </div>
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

            <TextBlockAnimation delay={0.2}>
              <p className="text-gray-600 text-lg max-w-md leading-relaxed mb-10">
                Não acreditamos em sorte. Acreditamos em método, preparação e execução técnica impecável. Cada caso é tratado como um projeto único com etapas bem definidas.
              </p>
            </TextBlockAnimation>

            <Reveal delay={0.2} width="100%">
              <div className="p-8 md:p-10 bg-white border border-gray-100 rounded-xl shadow-xl shadow-gray-200/50 hover:shadow-2xl transition-all duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-brand-gold/10 rounded-lg">
                    <FileText className="text-brand-gold" size={24} />
                  </div>
                  <TextBlockAnimation delay={0.3}>
                    <h4 className="font-bold text-xl text-brand-black font-serif">Transparência Radical</h4>
                  </TextBlockAnimation>
                </div>
                <TextBlockAnimation delay={0.4}>
                  <p className="text-gray-500 leading-relaxed">
                    Você acompanha cada movimento do processo através de relatórios mensais detalhados e acesso direto à equipe.
                  </p>
                </TextBlockAnimation>
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
                  {/* Reuse Reveal for sliding in the container, but Text Block for content? Or just TextBlock for content? */}
                  {/* Let's be consistent: TextBlock everywhere */}
                  <div className="flex flex-col gap-2">
                    {/* Text Content */}
                    <div className="pt-0">
                      <TextBlockAnimation delay={0.1} animateOnScroll={true}>
                        <h3 className="text-3xl font-bold font-serif text-brand-black mb-3 group-hover:text-brand-gold transition-colors">
                          {step.title}
                        </h3>
                      </TextBlockAnimation>

                      <TextBlockAnimation delay={0.2} animateOnScroll={true}>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                          {step.desc}
                        </p>
                      </TextBlockAnimation>
                    </div>
                  </div>
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
    { icon: <Zap aria-hidden="true" />, title: "Agilidade", desc: "Processos internos otimizados para respostas rápidas e resoluções eficientes." },
    { icon: <Award aria-hidden="true" />, title: "Excelência", desc: "Profundidade técnica acadêmica aplicada à prática jurídica de alto nível." },
    { icon: <Shield aria-hidden="true" />, title: "Segurança", desc: "Mitigação de riscos como prioridade absoluta em cada estratégia adotada." },
    { icon: <Check aria-hidden="true" />, title: "Ética", desc: "Transparência radical sobre riscos e possibilidades em cada etapa." },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#050505] relative overflow-hidden" aria-labelledby="why-us-title">
      {/* Spotlight Effect (Desktop Only) */}
      <GoldSpotlight />

      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl mx-auto pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[128px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div id="why-us-title" className="mb-16">
          <SectionTitle subtitle="Diferenciais" title="Por Que Nos Escolher" dark={true} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.1} width="100%">
              <motion.div
                className="
                    group h-full p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm
                    hover:bg-white/[0.05] hover:border-brand-gold/30 transition-all duration-500
                    flex flex-col items-start relative overflow-hidden
                "
              >
                {/* Top Glow on Hover */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/0 to-transparent group-hover:via-brand-gold/50 transition-all duration-700"></div>

                <motion.div
                  className="mb-6 p-4 rounded-xl bg-brand-gold/10 text-brand-gold group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-black transition-all duration-500"
                >
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 28, strokeWidth: 1.5 })}
                </motion.div>

                <TextBlockAnimation delay={0.2} blockColor="#B4975A" animateOnScroll={false}> {/* Inside card reveal might be redundant if card reveals, but user wants text block. animateOnScroll=false to let parent control or strict local trigger? Let's use false/low delay. */}
                  <h3 className="text-xl font-serif text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">{item.title}</h3>
                </TextBlockAnimation>

                <TextBlockAnimation delay={0.3} blockColor="#52525B" animateOnScroll={false}>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
                </TextBlockAnimation>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
