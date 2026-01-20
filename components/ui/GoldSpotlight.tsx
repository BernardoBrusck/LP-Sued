import React, { useRef, useState, useEffect } from 'react';

export const GoldSpotlight = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const div = divRef.current;
        if (!div || !div.parentElement) return;
        const parent = div.parentElement;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = parent.getBoundingClientRect();
            setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        };

        const handleMouseEnter = () => setOpacity(1);
        const handleMouseLeave = () => setOpacity(0);

        parent.addEventListener('mousemove', handleMouseMove);
        parent.addEventListener('mouseenter', handleMouseEnter);
        parent.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            parent.removeEventListener('mousemove', handleMouseMove);
            parent.removeEventListener('mouseenter', handleMouseEnter);
            parent.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            ref={divRef}
            className="absolute inset-0 w-full h-full z-0 hidden lg:block overflow-hidden pointer-events-none"
            style={{
                background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(180, 151, 90, 0.15), transparent 40%)`,
                opacity: opacity,
                transition: 'opacity 0.5s ease',
            }}
        />
    );
};
