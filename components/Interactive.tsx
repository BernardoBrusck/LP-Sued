
import React, { useState } from 'react';
import { SectionTitle, Reveal, Button } from './UI';
import { Plus, Minus, ArrowRight, Mail, MapPin, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- FAQ Section ---
export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Vocês atendem em todo o Brasil?",
      a: "Sim. Nossa estrutura é 100% digitalizada, permitindo atuação em processos administrativos e judiciais em todo o território nacional com a mesma eficiência do atendimento presencial."
    },
    {
      q: "Como funciona a cobrança de honorários?",
      a: "Trabalhamos com transparência total. Os honorários são definidos após a análise do caso, podendo ser por êxito (ad exitum), pro labore ou horas técnicas, dependendo da complexidade."
    },
    {
      q: "Quanto tempo demora um processo de usucapião?",
      a: "A usucapião extrajudicial (em cartório) pode levar de 4 a 12 meses. A judicial é mais longa, variando conforme o tribunal, mas nossa atuação foca em acelerar todas as etapas processuais."
    },
    {
      q: "O que é necessário para iniciar um planejamento tributário?",
      a: "Inicialmente, precisamos dos balancetes contábeis dos últimos 5 anos e acesso às declarações fiscais. Nossa equipe realiza uma varredura completa para identificar oportunidades."
    }
  ];

  return (
    <section className="py-24 bg-brand-light" aria-labelledby="faq-title">
      <div className="max-w-3xl mx-auto px-6">
        <div id="faq-title">
          <SectionTitle subtitle="Dúvidas" title="Perguntas Frequentes" />
        </div>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-content-${idx}`;
            const headerId = `faq-header-${idx}`;

            return (
              <Reveal key={idx} width="100%" delay={idx * 0.05}>
                <div
                  className={`bg-white transition-all duration-300 border-l-4 ${isOpen ? 'border-brand-gold shadow-lg' : 'border-transparent'}`}
                >
                  <button
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus-visible:bg-gray-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-gold"
                  >
                    <span className={`font-bold text-lg ${isOpen ? 'text-brand-black' : 'text-gray-600'}`}>
                      {faq.q}
                    </span>
                    <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-gold' : 'text-gray-400'}`} aria-hidden="true">
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Footer & Contact Section ---
export const ContactAndFooter = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const MotionDiv = motion.div as any;
  const MotionForm = motion.form as any;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <footer className="bg-brand-black text-white relative overflow-hidden">
      {/* Imagem de Fundo Fixa para o Rodapé e Formulário */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop')] bg-fixed bg-cover bg-center opacity-20 pointer-events-none"></div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          <address className="not-italic">
            <SectionTitle subtitle="Contato" title="Vamos Conversar" dark />
            <Reveal>
              <p className="text-gray-400 text-lg mb-12 max-w-md font-light">
                Seu patrimônio merece defesa especializada. Preencha o formulário e entraremos em contato em até 24h.
              </p>
            </Reveal>

            <div className="space-y-8">
              <Reveal delay={0.1}>
                <a href="tel:+5511999999999" className="flex items-center gap-4 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-md p-2 -ml-2">
                  <div className="p-3 bg-brand-gray/50 backdrop-blur-sm border border-white/5 group-hover:bg-brand-gold transition-colors rounded">
                    <Phone size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Telefone</p>
                    <p className="text-lg font-bold">+55 11 99999-9999</p>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={0.2}>
                <a href="mailto:contato@romariosued.adv.br" className="flex items-center gap-4 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-md p-2 -ml-2">
                  <div className="p-3 bg-brand-gray/50 backdrop-blur-sm border border-white/5 group-hover:bg-brand-gold transition-colors rounded">
                    <Mail size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Email</p>
                    <p className="text-lg font-bold">contato@romariosued.adv.br</p>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-brand-gray/50 backdrop-blur-sm border border-white/5 rounded">
                    <MapPin size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Escritório</p>
                    <p className="text-lg font-bold">Av. Paulista, 1000 - SP</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </address>

          {/* Minimalist Form */}
          <div className="flex items-center">
            <Reveal width="100%" delay={0.4}>
              <div className="min-h-[400px] flex flex-col justify-center bg-white/5 p-8 sm:p-12 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
                <AnimatePresence mode="wait">
                  {formStatus === 'success' ? (
                    <MotionDiv
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Solicitação Recebida!</h3>
                      <p className="text-gray-400 mb-8 font-light">
                        Obrigado pelo contato. Nossa equipe analisará sua solicitação e retornará em breve.
                      </p>
                      <Button
                        onClick={() => setFormStatus('idle')}
                        primary={false}
                        className="w-full"
                      >
                        Enviar nova mensagem
                      </Button>
                    </MotionDiv>
                  ) : (
                    <MotionForm
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="group">
                          <label htmlFor="name" className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-brand-gold transition-colors">Nome</label>
                          <input required id="name" type="text" className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="Seu nome" />
                        </div>
                        <div className="group">
                          <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-brand-gold transition-colors">Telefone</label>
                          <input required id="phone" type="tel" className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="(00) 00000-0000" />
                        </div>
                      </div>
                      <div className="group">
                        <label htmlFor="email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-brand-gold transition-colors">Email</label>
                        <input required id="email" type="email" className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="seu@email.com" />
                      </div>
                      <div className="group">
                        <label htmlFor="message" className="block text-xs uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-brand-gold transition-colors">Mensagem</label>
                        <textarea required id="message" rows={4} className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-gold transition-colors" placeholder="Como podemos ajudar?"></textarea>
                      </div>

                      {formStatus === 'error' && (
                        <MotionDiv
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-2 text-red-400 text-sm"
                        >
                          <AlertCircle size={16} />
                          Houve um erro ao enviar. Por favor, tente novamente.
                        </MotionDiv>
                      )}

                      <Button type="submit" className="w-full mt-4 group flex items-center justify-center gap-2" disabled={formStatus === 'submitting'}>
                        {formStatus === 'submitting' ? (
                          <>Enviando <Loader2 className="w-4 h-4 animate-spin" /></>
                        ) : (
                          <>Enviar Solicitação <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" /></>
                        )}
                      </Button>
                    </MotionForm>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/5 bg-brand-black/90 py-8 relative z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Romário Sued. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://etechjr.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors focus:outline-none focus-visible:text-white focus-visible:underline text-xs md:text-sm opacity-60 hover:opacity-100">
              Desenvolvido por ETECH Jr.
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
