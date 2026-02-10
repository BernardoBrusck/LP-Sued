import React from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { cn } from "../../lib/utils"; // Adjusted path since we are in components/ui

// Ensure plugins are registered
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface TextBlockAnimationProps {
    children: React.ReactNode;
    animateOnScroll?: boolean;
    delay?: number;
    blockColor?: string;
    stagger?: number;
    duration?: number;
    className?: string; // Additional prop for wrapper styling
}

export default function TextBlockAnimation({
    children,
    animateOnScroll = true,
    delay = 0,
    blockColor = "#B4975A", // Changed default to brand-gold
    stagger = 0.1,
    duration = 0.4, // Default faster for snappier feel
    className
}: TextBlockAnimationProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        // Since we don't have SplitText, we'll treat the container's children as "lines" if they are block elements,
        // or just wrap the whole content if it's a simple text node.

        // However, robust "line splitting" without library is hard.
        // For SectionTitles which are usually <h1> or <h2>, we can just treat the *whole title* as one block,
        // OR if the title has <br/>, we can try to animate parts.

        // Strategy: 
        // 1. Create a wrapper around the content.
        // 2. Animate the block over the wrapper.

        // Better Strategy without SplitText:
        // Assume the children are just text. converting text to span-wrapped words/lines is tricky.
        // Let's implement a simple "Single Block Reveal" for the whole container content first.
        // This is safer and still looks great for titles.

        // If we want multi-line support, the user of this component should pass multiple TextBlockAnimation components,
        // or we can try to auto-wrap. For now, let's Stick to the "Single Block" effect per component usage.

        const wrapper = container; // The container IS the wrapper

        // Create the Revealer Block dynamically
        const block = document.createElement("div");

        // Determine color with matte effect
        let finalColor = blockColor;
        if (blockColor === "#B4975A") {
            finalColor = "rgba(180, 151, 90, 0.85)";
        } else if (blockColor === "#52525B") {
            finalColor = "rgba(82, 82, 91, 0.85)";
        }

        Object.assign(block.style, {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: finalColor,
            backdropFilter: "blur(8px)",
            webkitBackdropFilter: "blur(8px)",
            zIndex: "20",
            transform: "scaleX(0)",
            transformOrigin: "left center",
            pointerEvents: "none"
        });

        wrapper.appendChild(block);

        // Let's use GSAP to set opacity of children *except* the block
        const childrenToAnimate = Array.from(wrapper.children).filter(c => c !== block);
        gsap.set(childrenToAnimate, { opacity: 0 });

        const tl = gsap.timeline({
            defaults: { ease: "expo.out" }, // Smooth fast out
            scrollTrigger: animateOnScroll ? {
                trigger: container,
                start: "top 90%", // Trigger slightly earlier
                toggleActions: "play none none reverse",
            } : null,
            delay: delay
        });

        tl.to(block, {
            scaleX: 1,
            duration: duration,
            transformOrigin: "left center",
        })
            .set(childrenToAnimate, {
                opacity: 1,
            }, `<${duration / 2.5}`) // Reveal earlier
            .to(block, {
                scaleX: 0,
                duration: duration,
                transformOrigin: "right center"
            }, `<${duration * 0.4}`);

    }, {
        scope: containerRef,
        dependencies: [animateOnScroll, delay, blockColor, duration]
    });

    return (
        <div
            ref={containerRef}
            className={cn("relative inline-block overflow-hidden", className)} // inline-block default, can be overridden with 'block' in className
        >
            {children}
        </div>
    );
}
