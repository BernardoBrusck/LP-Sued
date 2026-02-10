
import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

interface SectionTitleProps {
  subtitle: string;
  title: string | React.ReactNode;
  dark?: boolean;
}

interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

// --- Hooks ---
function useOnScreen(ref: React.RefObject<Element>, rootMargin: string = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { rootMargin }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);
  return isIntersecting;
}

// --- Components ---

/**
 * Reveal Component
 * Refined for a smoother fade-up animation.
 */
export const Reveal: React.FC<RevealProps> = ({ children, width = "fit-content", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref, "-30px");
  const shouldReducedMotion = useReducedMotion();

  const transformValue = shouldReducedMotion ? "translateY(0)" : "translateY(20px)";

  return (
    <div ref={ref} style={{ width, position: 'relative' }}>
      <div
        style={{
          transform: isVisible ? "translateY(0)" : transformValue,
          opacity: isVisible ? 1 : 0,
          transition: `all 0.8s cubic-bezier(0.2, 0.65, 0.3, 0.9) ${delay}s`
        }}
      >
        {children}
      </div>
    </div>
  );
};

import TextBlockAnimation from './ui/text-block-animation';

export const SectionTitle: React.FC<SectionTitleProps> = ({ subtitle, title, dark = false }) => {
  return (
    <div className="mb-16 md:mb-20 text-left flex flex-col items-start">
      <div className="relative mb-6">
        <TextBlockAnimation delay={0} blockColor={dark ? "#52525B" : "#B4975A"}>
          <div className="flex items-center gap-4" aria-hidden="true">
            <div className={`h-[1px] w-12 ${dark ? 'bg-brand-gold' : 'bg-brand-gold'}`}></div>
            <span className={`font-sans font-bold tracking-[0.2em] text-xs uppercase ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              {subtitle}
            </span>
          </div>
        </TextBlockAnimation>
      </div>

      <div className="relative block">
        <TextBlockAnimation blockColor="#B4975A" delay={0.2} className="block"> {/* Force block on animation wrapper too */}
          <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight ${dark ? 'text-white' : 'text-brand-black'}`}>
            {title}
            <span className="text-brand-gold">.</span>
          </h2>
        </TextBlockAnimation>
      </div>
    </div>
  );
};

export const Button: React.FC<ButtonProps> = ({
  children,
  primary = true,
  onClick,
  className = "",
  type = "button",
  disabled = false
}) => {
  // Fix: Cast motion.button to any to resolve property 'whileTap' and 'whileHover' type errors
  const MotionButton = motion.button as any;
  return (
    <MotionButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      className={`
        px-8 py-4 text-sm tracking-widest font-bold uppercase transition-all duration-300
        rounded shadow-sm
        focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${primary
          ? `bg-brand-gold text-white border border-brand-gold ${!disabled ? 'hover:bg-brand-goldHover hover:border-brand-goldHover hover:shadow-lg hover:shadow-brand-gold/20' : ''}`
          : `bg-transparent border border-white/30 text-white backdrop-blur-sm ${!disabled ? 'hover:bg-white hover:text-brand-black hover:border-white' : ''}`
        }
        ${className}
      `}
    >
      {children}
    </MotionButton>
  );
};

export const Card: React.FC<{ children: React.ReactNode; className?: string; dark?: boolean }> = ({ children, className = "", dark = false }) => {
  return (
    <div className={`
      p-8 transition-all duration-500 h-full
      ${dark
        ? 'bg-brand-gray border border-white/5 hover:border-brand-gold/50'
        : 'bg-white hover:shadow-xl hover:-translate-y-1 border border-transparent hover:border-gray-100'
      }
      ${className}
    `}>
    </div>
  );
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const MotionDiv = motion.div as any;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <MotionDiv
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#121212] border border-brand-gold/20 rounded-lg shadow-2xl z-10 hide-scrollbar"
          >
            <div className="sticky top-0 right-0 z-20 flex justify-end p-4 bg-gradient-to-b from-[#121212] to-transparent">
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="px-6 md:px-10 pb-10 pt-2">
              <h3 className="text-2xl md:text-3xl font-serif text-brand-gold mb-6">{title}</h3>
              <div className="prose prose-invert prose-brand-gold max-w-none text-gray-300 font-light leading-relaxed">
                {children}
              </div>
            </div>
          </MotionDiv>
        </div>
      )}
    </AnimatePresence>
  );
};
