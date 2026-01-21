
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Shield, Scale, Gavel } from 'lucide-react';

export const HeroPremium = () => {
    const root = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    // Animation Refs
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const iconsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out", duration: 1.2 }
            });

            // 1. Initial Styles (Hidden)
            // Note: We don't hide titleRef because we animate its children (.hero-word) individually
            gsap.set([subtitleRef.current, buttonsRef.current], { y: 40, opacity: 0 });
            gsap.set(imageContainerRef.current, { x: 50, opacity: 0 });
            gsap.set([badgeRef.current, iconsRef.current], { opacity: 0, scale: 0.9 });
            gsap.set(bgRef.current, { scale: 1.25, opacity: 0 });
            gsap.set(cursorRef.current, { scale: 0, xPercent: -50, yPercent: -50 }); // Center centering via GSAP
            gsap.set(".hero-word", { y: 20, opacity: 0 });

            // 2. Entrance Animation Sequence
            tl.to(bgRef.current, { scale: 1.1, opacity: 0.4, duration: 2, ease: "power2.inOut" })
                .to(imageContainerRef.current, { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" }, "-=1.5")
                .to(".hero-word", { y: 0, opacity: 1, stagger: 0.05, duration: 1 }, "-=1.2")
                .to(subtitleRef.current, { y: 0, opacity: 1 }, "-=0.8")
                .to(buttonsRef.current, { y: 0, opacity: 1 }, "-=0.6")
                .to([iconsRef.current, badgeRef.current], { opacity: 1, scale: 1, stagger: 0.1 }, "-=0.4")
                .to(cursorRef.current, { scale: 1 }, "-=0.2");

            // 3. Mouse Interaction (Optimized)
            // Use quickTo for high-performance cursor following
            const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power2.out" });
            const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power2.out" });

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;

                // Optimized Cursor
                xTo(clientX);
                yTo(clientY);

                // Parallax Calculations (Throttled by RAF by nature of GSAP internal ticker usually, but direct set is OK here)
                const xNorm = (clientX / innerWidth) * 2 - 1;
                const yNorm = (clientY / innerHeight) * 2 - 1;

                // Deep Parallax for Background
                gsap.to(bgRef.current, {
                    x: -xNorm * 12,
                    y: -yNorm * 12,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                // Image Container
                gsap.to(imageContainerRef.current, {
                    rotationY: xNorm * 0.5,
                    rotationX: -yNorm * 0.5,
                    x: xNorm * 2,
                    y: yNorm * 2,
                    duration: 1.2,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                // Text Content
                gsap.to([titleRef.current, subtitleRef.current, buttonsRef.current], {
                    x: -xNorm * 8,
                    y: -yNorm * 8,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: "auto"
                });

                // Badge
                gsap.to(badgeRef.current, {
                    x: xNorm * 10,
                    y: yNorm * 10,
                    duration: 1.8,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, root);

        return () => ctx.revert();
    }, []);

    // Helper to split text for animation
    const splitTextToWords = (text: string) => {
        return text.split(" ").map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.25em]">
                {word}
            </span>
        ));
    };

    // --- Components ---

    const AdvancedButton = ({ children, onClick, primary = true, className = "" }: { children: React.ReactNode, onClick: () => void, primary?: boolean, className?: string }) => {
        const btnRef = useRef<HTMLButtonElement>(null);

        const onEnter = () => {
            if (primary) {
                gsap.to(btnRef.current, { backgroundColor: "#FAFAFA", color: "#000", borderColor: "#FAFAFA", scale: 1.02, duration: 0.3 });
            } else {
                gsap.to(btnRef.current, { borderColor: "#B4975A", color: "#B4975A", backgroundColor: "rgba(180, 151, 90, 0.05)", scale: 1.02, duration: 0.3 });
            }
        };

        const onLeave = () => {
            if (primary) {
                gsap.to(btnRef.current, { backgroundColor: "#B4975A", color: "#000", borderColor: "#B4975A", scale: 1, duration: 0.3 });
            } else {
                gsap.to(btnRef.current, { borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", backgroundColor: "transparent", scale: 1, duration: 0.3 });
            }
        };

        return (
            <button
                ref={btnRef}
                onClick={onClick}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className={`
                    relative px-8 py-4 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.25em] transition-transform rounded-md flex items-center justify-center
                    ${primary
                        ? 'bg-brand-gold text-brand-black border border-brand-gold shadow-[0_0_20px_rgba(180,151,90,0.2)]'
                        : 'bg-transparent text-white/40 border border-white/10'
                    }
                    ${className}
                `}
            >
                {children}
            </button>
        );
    };

    return (
        <section
            ref={root}
            className="relative h-screen w-full overflow-hidden bg-[#050505] flex flex-col justify-center lg:cursor-none"
        >
            {/* --- 1. Custom Cursor --- */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-6 h-6 border border-brand-gold/50 rounded-full pointer-events-none z-[100] hidden lg:flex items-center justify-center will-change-transform"
            >
                <div className="w-1 h-1 bg-brand-gold rounded-full" />
            </div>

            {/* --- 2. Background --- */}
            <div
                ref={bgRef}
                className="absolute inset-0 z-0 bg-cover bg-center opacity-40 will-change-transform"
                style={{ backgroundImage: `url('/background-hero.webp')` }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 to-transparent" />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />

            {/* --- 3. Main Grid Layout --- */}
            <div className="container relative z-10 mx-auto px-6 h-full grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">

                {/* Left Column: Text Content (Allocated 5/12 columns - Shifted Right) */}
                <div className="lg:col-span-5 lg:col-start-2 flex flex-col justify-center items-center text-center lg:items-start lg:text-left order-1 lg:order-1 relative z-20 w-full">
                    <h1 ref={titleRef} className="font-serif text-4xl sm:text-5xl lg:text-7xl xl:text-8xl text-white mb-8 leading-[1.05] tracking-tight">
                        <div className="block italic text-white/90">
                            {splitTextToWords("Defesa de")}
                        </div>
                        <div className="block text-brand-gold mt-2">
                            {splitTextToWords("Alto Impacto.")}
                        </div>
                    </h1>

                    <p ref={subtitleRef} className="font-sans text-[10px] md:text-[12px] text-white/50 mb-12 tracking-[0.2em] leading-loose uppercase max-w-md lg:border-l border-brand-gold/30 lg:pl-6">
                        Soluções jurídicas <span className="text-white">sofisticadas</span> para desafios complexos.
                        <br className="hidden md:block" />
                        Rigor técnico e excelência absoluta.
                    </p>

                    <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-5">
                        <AdvancedButton onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}>
                            Agendar <ArrowRight size={14} className="ml-3" />
                        </AdvancedButton>
                        <AdvancedButton primary={false} onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}>
                            Saiba Mais
                        </AdvancedButton>
                    </div>
                </div>

                {/* Right Column: Image & Branding (Allocated 6/12 columns) - HIDDEN on Mobile/Tablet */}
                <div className="hidden lg:flex lg:col-span-6 h-full relative flex-col justify-end items-center lg:items-end order-2 lg:order-2 pointer-events-none perspective-[1000px]">

                    {/* Icons (Absolute Top Right of this column area) */}
                    <div ref={iconsRef} className="absolute top-24 right-0 lg:right-12 z-30 flex gap-8 text-brand-gold/30 pointer-events-auto">
                        <Shield size={20} className="hover:text-brand-gold transition-colors duration-300 cursor-pointer" />
                        <Scale size={20} className="hover:text-brand-gold transition-colors duration-300 cursor-pointer" />
                        <Gavel size={20} className="hover:text-brand-gold transition-colors duration-300 cursor-pointer" />
                    </div>

                    {/* Image Container */}
                    <div ref={imageContainerRef} className="relative w-full h-[50vh] lg:h-[90vh] flex items-end justify-center lg:justify-center">
                        {/* Glow Behind */}
                        <div className="absolute bottom-0 right-10 w-[60%] h-[60%] bg-brand-gold/5 blur-[100px] rounded-full" />

                        {/* Image */}
                        <img
                            src="/hero-portrait.webp"
                            alt="Romário Sued"
                            className="relative z-10 w-auto h-full object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] pointer-events-auto"
                        />
                    </div>

                    {/* Branding Badge (Absolute Bottom Right Corner) */}
                    <div ref={badgeRef} className="absolute bottom-8 right-0 lg:right-8 z-40">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 border border-white/5 bg-black/80 backdrop-blur-md rounded-md shadow-2xl pointer-events-auto">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
                            </span>
                            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium font-sans whitespace-nowrap">
                                Romário Sued | Advocacia de Alto Padrão
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
