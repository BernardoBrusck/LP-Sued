
import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// --- Types ---
interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

interface SectionTitleProps {
  subtitle: string;
  title: string;
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

export const SectionTitle: React.FC<SectionTitleProps> = ({ subtitle, title, dark = false }) => {
  return (
    <div className="mb-16 md:mb-20 text-left">
      <Reveal width="100%">
        <div className="flex items-center gap-4 mb-6" aria-hidden="true">
          <div className={`h-[1px] w-12 ${dark ? 'bg-brand-gold' : 'bg-brand-gold'}`}></div>
          <span className={`font-sans font-bold tracking-[0.2em] text-xs uppercase ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            {subtitle}
          </span>
        </div>
      </Reveal>
      <Reveal width="100%" delay={0.1}>
        <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight ${dark ? 'text-white' : 'text-brand-black'}`}>
          {title}
          <span className="text-brand-gold">.</span>
        </h2>
      </Reveal>
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
      {children}
    </div>
  );
};
