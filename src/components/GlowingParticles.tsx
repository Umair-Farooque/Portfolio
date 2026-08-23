import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  hue: number;
}

const PARTICLE_COUNT = 60;
const MOUSE_RADIUS = 180;
const REPEL_STRENGTH = 0.8;
const GLOW_MAX_RADIUS_MULT = 2.5;

const GlowingParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      setDimensions({ width, height });

      const ctx = canvas.getContext('2d')!;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Initialize particles after resize has run
    const initWidth = window.innerWidth;
    const initHeight = window.innerHeight;
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const hue = Math.random() < 0.5 ? 150 : 200; // emerald or cyan-ish
      const radius = 1.5 + Math.random() * 2.5;
      return {
        x: Math.random() * initWidth,
        y: Math.random() * initHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius,
        baseRadius: radius,
        opacity: 0.15 + Math.random() * 0.25,
        hue,
      };
    });

    const ctx = canvas.getContext('2d')!;

    const animate = () => {
      const { width, height } = dimensions;
      if (!width || !height) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        // Mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          // Repel from mouse
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx -= (dx / dist) * force * REPEL_STRENGTH;
          p.vy -= (dy / dist) * force * REPEL_STRENGTH;
          // Glow effect
          p.radius = p.baseRadius * (1 + force * GLOW_MAX_RADIUS_MULT);
          p.opacity = Math.min(0.9, p.opacity + force * 0.02);
        } else {
          // Return to base
          p.radius += (p.baseRadius - p.radius) * 0.02;
          p.opacity += (0.15 + Math.random() * 0.1 - p.opacity) * 0.02;
        }

        // Physics
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Boundary wrap
        if (p.x < -p.radius) p.x = width + p.radius;
        if (p.x > width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = height + p.radius;
        if (p.y > height + p.radius) p.y = -p.radius;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
        gradient.addColorStop(0, `hsla(${p.hue}, 85%, 60%, ${p.opacity})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, 70%, 50%, ${p.opacity * 0.4})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 60%, 40%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.radius * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${Math.min(1, p.opacity * 1.5)})`;
        ctx.fill();
      });

      // Subtle connections between nearby particles
      ctx.strokeStyle = 'hsla(150, 70%, 50%, 0.03)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-50 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default GlowingParticles;