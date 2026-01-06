
import React from 'react';
import { motion } from "framer-motion";
import { SectionTitle, Reveal } from '../UI';

interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: "O planejamento tributário realizado pelo Dr. Romário foi um divisor de águas para nossa empresa. Reduzimos custos de forma legal e segura.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ricardo Oliveira",
    role: "CEO, TechLogistics",
  },
  {
    text: "Conseguimos a regularização do nosso imóvel comercial em tempo recorde. Atendimento técnico e muito transparente.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ana Beatriz Costa",
    role: "Proprietária de Imóveis",
  },
  {
    text: "A segurança jurídica que o escritório nos proporciona é fundamental para nossas operações imobiliárias complexas.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Marcos Vinícius",
    role: "Diretor de Incorporação",
  },
  {
    text: "Recuperamos créditos tributários que nem sabíamos que tínhamos direito. Um trabalho de fôlego e muita precisão.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sérgio Mendes",
    role: "Empresário",
  },
  {
    text: "Excelente atuação na defesa administrativa. Evitamos multas pesadas graças à estratégia agressiva e técnica da equipe.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Fernanda Lima",
    role: "Gerente Financeira",
  },
  {
    text: "Um advogado que fala a língua do empresário. Direto ao ponto, focado em resultados e proteção de patrimônio.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Cláudio Duarte",
    role: "Sócio de Indústria",
  },
  {
    text: "A consultoria imobiliária foi essencial para nossa última aquisição. Mitigação de riscos total.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Juliana Rocha",
    role: "Investidora",
  },
  {
    text: "Profissional extremamente capacitado. O processo de usucapião que parecia impossível foi resolvido com maestria.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Antônio Silva",
    role: "Aposentado",
  },
  {
    text: "Transparência radical em todas as etapas. Recomendo fortemente para qualquer questão tributária complexa.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Carla Silveira",
    role: "Advogada Parceira",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <motion.li 
                key={`${index}-${i}`}
                whileHover={{ 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                className="p-8 rounded-xl border border-gray-100 shadow-sm max-w-xs w-full bg-white transition-all duration-300 cursor-default select-none group" 
              >
                <blockquote className="m-0 p-0">
                  <p className="text-gray-600 leading-relaxed font-light m-0 mb-6 text-sm italic">
                    "{text}"
                  </p>
                  <footer className="flex items-center gap-3">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={`Foto de ${name}`}
                      className="h-10 w-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="flex flex-col">
                      <cite className="font-serif font-bold not-italic text-brand-black text-base leading-tight">
                        {name}
                      </cite>
                      <span className="text-xs font-semibold tracking-widest text-brand-gold uppercase mt-1">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
};

export const TestimonialsSection = () => {
  return (
    <section 
      aria-labelledby="testimonials-heading"
      className="bg-gray-50 py-24 relative overflow-hidden border-y border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 z-10">
        <SectionTitle subtitle="Depoimentos" title="O que dizem nossos clientes" />

        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[640px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
        </div>
      </div>
    </section>
  );
};
