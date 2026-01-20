
import React, { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { LucideIcon, MessageCircle } from "lucide-react"
import { cn } from "../../lib/utils"
import gsap from "gsap"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState("")
  const [isMobile, setIsMobile] = useState(false)
  const contactBtnRef = useRef<HTMLButtonElement>(null)

  // Fix: Cast motion components to any to resolve motion-specific prop type errors
  const MotionDiv = motion.div as any;

  // Sync active tab with scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map(item => item.url.replace('#', ''));
      let current = '';

      for (const section of sections) {
        if (!section) continue;
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            current = section;
          }
        }
      }

      const activeItem = items.find(item => item.url.includes(current));
      if (activeItem) {
        setActiveTab(activeItem.name);
      } else if (window.scrollY < 200) {
        setActiveTab("");
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // GSAP Animation for the contact button
  useEffect(() => {
    if (contactBtnRef.current) {
      const btn = contactBtnRef.current;

      const onMouseEnter = () => {
        gsap.to(btn, {
          scale: 1.05,
          backgroundColor: "#B4975A",
          color: "#0a0a0a",
          duration: 0.4,
          ease: "power2.out"
        });
        gsap.to(".contact-icon", {
          rotate: 15,
          duration: 0.3,
          repeat: 1,
          yoyo: true
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          scale: 1,
          backgroundColor: "rgba(180, 151, 90, 0.1)",
          color: "#B4975A",
          duration: 0.4,
          ease: "power2.inOut"
        });
      };

      btn.addEventListener("mouseenter", onMouseEnter);
      btn.addEventListener("mouseleave", onMouseLeave);

      return () => {
        btn.removeEventListener("mouseenter", onMouseEnter);
        btn.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveTab("");
  };

  const handleContactClick = () => {
    const element = document.getElementById('contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={cn(
        "fixed bottom-0 sm:top-auto sm:bottom-8 left-1/2 -translate-x-1/2 z-50 mb-6 sm:mb-0 w-full max-w-fit",
        className,
      )}
      aria-label="Navegação Principal"
    >
      <div className="flex items-center gap-4 bg-[#121212]/90 border border-white/10 backdrop-blur-lg py-2 px-3 rounded-full shadow-2xl">

        {/* Logo */}
        <a
          href="#"
          onClick={handleLogoClick}
          className="pl-4 pr-2 text-lg font-serif font-bold text-white transition-opacity hover:opacity-80 flex items-center gap-0.5"
        >
          R.SUED<span className="text-brand-gold text-2xl">.</span>
        </a>

        {/* Separator */}
        <div className="h-6 w-[1px] bg-white/10 mx-1 hidden sm:block" />

        {/* Nav Items */}
        <ul className="flex items-center gap-1">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <li key={item.name}>
                <a
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.name);
                    const element = document.querySelector(item.url);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={cn(
                    "relative cursor-pointer text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center justify-center",
                    "text-gray-400 hover:text-white",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                    isActive && "text-brand-gold bg-white/5",
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="hidden sm:inline">{item.name}</span>
                  <span className="sm:hidden">
                    <Icon size={16} strokeWidth={2} aria-hidden="true" />
                    <span className="sr-only">{item.name}</span>
                  </span>
                  {isActive && (
                    <MotionDiv
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-brand-gold/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-brand-gold rounded-t-full">
                        <div className="absolute w-12 h-6 bg-brand-gold/20 rounded-full blur-md -top-2 -left-2" />
                      </div>
                    </MotionDiv>
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Separator */}
        <div className="h-6 w-[1px] bg-white/10 mx-1 hidden sm:block" />

        {/* Contact Button */}
        <button
          ref={contactBtnRef}
          onClick={handleContactClick}
          className="ml-1 px-5 py-2 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider border border-brand-gold/20 flex items-center gap-2 group transition-all"
        >
          <span className="hidden sm:inline">Contato</span>
          <MessageCircle size={14} className="contact-icon" />
        </button>
      </div>
    </nav>
  )
}
