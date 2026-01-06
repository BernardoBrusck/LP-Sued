
import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "../../lib/utils"

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
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

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
          if (rect.top <= 250 && rect.bottom >= 250) { 
            current = section;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveTab(items[0].name);
      } else if (current) {
        const activeItem = items.find(item => item.url.includes(current));
        if (activeItem) {
          setActiveTab(activeItem.name);
        }
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

  return (
    <nav
      className={cn(
        "fixed bottom-0 sm:top-auto sm:bottom-8 left-1/2 -translate-x-1/2 z-50 mb-6 sm:mb-0",
        className,
      )}
      aria-label="Navegação Principal"
    >
      <ul className="flex items-center gap-3 bg-[#121212]/90 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
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
                    } else if (item.url === '#') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }}
                className={cn(
                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors flex items-center justify-center",
                    "text-gray-400 hover:text-brand-gold",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                    isActive && "bg-white/10 text-brand-gold",
                )}
                aria-current={isActive ? 'page' : undefined}
                >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                    <Icon size={18} strokeWidth={2.5} aria-hidden="true" />
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
                        <div className="absolute w-8 h-6 bg-brand-gold/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-brand-gold/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                    </MotionDiv>
                )}
                </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
