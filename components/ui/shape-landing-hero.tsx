
import React from "react";
import { motion } from "framer-motion";
import { Circle, ArrowDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../UI";

// Fix: Define Variants type locally as any to resolve import error
type Variants = any;

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    // Fix: Cast motion components to any to resolve motion-specific prop type errors
    const MotionDiv = motion.div as any;
    return (
        <MotionDiv
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            whileHover={{
                scale: 1.05,
                rotate: rotate + 2,
                filter: "brightness(1.2)",
                transition: { duration: 0.3 }
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute cursor-pointer hover:z-20", className)}
        >
            <MotionDiv
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </MotionDiv>
        </MotionDiv>
    );
}

export function HeroGeometric({
    badge = "Direito Tributário & Imobiliário",
    title1 = "Resultados",
    title2 = "Definitivos.",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
}) {
    // Fix: Cast motion components to any to resolve motion-specific prop type errors
    const MotionDiv = motion.div as any;
    const MotionSpan = motion.span as any;

    const fadeUpVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.05] via-transparent to-gray-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden pointer-events-auto">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-brand-gold/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-gray-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-brand-gold/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-white/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-brand-gold/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 pointer-events-none">
                <div className="max-w-4xl mx-auto text-center pointer-events-auto">
                    <MotionDiv
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
                    >
                        <Circle className="h-2 w-2 fill-brand-gold" />
                        <span className="text-sm text-white/70 tracking-widest uppercase font-semibold">
                            {badge}
                        </span>
                    </MotionDiv>

                    <MotionDiv
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium mb-6 md:mb-10 tracking-tight leading-[0.9]">
                            <span className="text-white block">
                                {title1}
                            </span>
                            <span
                                className={cn(
                                    "bg-clip-text text-transparent bg-gradient-to-r from-brand-gold via-white/90 to-gray-400 italic pr-4"
                                )}
                            >
                                {title2}
                            </span>
                        </h1>
                    </MotionDiv>

                    <MotionDiv
                        custom={2}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <p className="text-base sm:text-lg md:text-xl text-white/50 mb-10 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                            Advocacia estratégica para quem não aceita o básico. Proteção patrimonial e eficiência tributária com profundidade técnica.
                        </p>
                    </MotionDiv>

                    <MotionDiv
                        custom={3}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                         <Button onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
                            Agendar Consulta
                         </Button>
                         <Button primary={false} onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}>
                            Conhecer Escritório
                         </Button>
                    </MotionDiv>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80 pointer-events-none" />
            
            {/* Minimal Scroll Indicator */}
            <MotionDiv 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-12 right-8 md:right-12 flex flex-col items-center gap-4 hidden md:flex z-20"
            >
              <MotionSpan 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-[10px] uppercase tracking-[0.3em] text-gray-500 rotate-90 origin-right translate-x-3"
              >
                Scroll
              </MotionSpan>
              <MotionDiv
                animate={{ scale: [1, 1.1, 1], y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="text-brand-gold opacity-80" size={18} />
              </MotionDiv>
            </MotionDiv>
        </div>
    );
}
