import React, { useEffect, useRef } from 'react';

export const GoldSmoke = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouseX = 0;
        let mouseY = 0;
        let isMoving = false;
        let moveTimeout: NodeJS.Timeout;

        const updateSize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = canvas.parentElement.offsetHeight;
            }
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            vx: number;
            vy: number;
            life: number;
            maxLife: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 5 + 2; // Initial size between 2 and 7
                this.vx = (Math.random() - 0.5) * 1; // Slight horizontal drift
                this.vy = Math.random() * -1 - 0.5; // Upward movement
                this.life = 0;
                this.maxLife = Math.random() * 50 + 50; // Life between 50 and 100 frames
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life++;
                this.size += 0.1; // Grow over time
                if (this.life < 20) {
                    // Fade in
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                const opacity = 1 - (this.life / this.maxLife);
                if (opacity <= 0) return;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(180, 151, 90, ${opacity * 0.4})`; // Brand gold with max 0.4 opacity
                ctx.fill();
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Add new particles if mouse is moving
            if (isMoving) {
                // Add a few particles per frame for density
                for (let i = 0; i < 2; i++) {
                    particles.push(new Particle(mouseX, mouseY));
                }
            }

            // Update and draw existing particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw(ctx);

                // Remove dead particles
                if (particles[i].life >= particles[i].maxLife) {
                    particles.splice(i, 1);
                    i--;
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isMoving = true;

            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(() => {
                isMoving = false;
            }, 100);
        };

        window.addEventListener('resize', updateSize);
        // Attach to the canvas parent's area via window/document if needed, but here canvas covers the parent
        // better to attach to canvas if possible, but canvas might have `pointer-events-none`.
        // If canvas has pointer-events-none, we must attach to parent.
        // Let's attach to the parent element for better hit testing
        if (canvas.parentElement) {
            canvas.parentElement.addEventListener('mousemove', handleMouseMove);
        }

        updateSize();
        animate();

        return () => {
            window.removeEventListener('resize', updateSize);
            if (canvas.parentElement) {
                canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
            }
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block mixture-blend-screen"
        />
    );
};
