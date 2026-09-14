"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; hx: number; hy: number };

// Particules reliées entre elles : le curseur les attire, un clic maintenu les rassemble.
export default function Particles({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let w = 0, h = 0, raf = 0;
    let particles: P[] = [];
    const mouse = { x: -9999, y: -9999, active: false, pressed: false };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      w = canvas.width = rect.width;
      h = canvas.height = rect.height;
      const count = Math.min(130, Math.floor((w * h) / 12000));
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * w, y = Math.random() * h;
        return { x, y, hx: x, hy: y, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.8 + 0.8 };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const radius = mouse.pressed ? 420 : 200;
      const strength = mouse.pressed ? 0.09 : 0.035;

      for (const p of particles) {
        if (mouse.active) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy) || 1;
          if (d < radius) {
            // attraction proportionnelle à la proximité, légère répulsion tout près pour garder un nuage
            const f = (1 - d / radius) * strength * (d < 28 ? -0.6 : 1);
            p.vx += (dx / d) * f * 4;
            p.vy += (dy / d) * f * 4;
          }
        } else {
          // retour progressif vers la position d'origine
          p.vx += (p.hx - p.x) * 0.002;
          p.vy += (p.hy - p.y) * 0.002;
        }
        // dérive naturelle + amortissement
        p.vx += (Math.random() - 0.5) * 0.04;
        p.vy += (Math.random() - 0.5) * 0.04;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > w) { p.x = w; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > h) { p.y = h; p.vy *= -1; }
      }

      // liaisons
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.strokeStyle = `rgba(227, 154, 116, ${(1 - d / 110) * 0.28})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // points
      for (const p of particles) {
        const near = mouse.active && Math.hypot(mouse.x - p.x, mouse.y - p.y) < radius;
        ctx.beginPath();
        ctx.arc(p.x, p.y, near ? p.r + 0.8 : p.r, 0, Math.PI * 2);
        ctx.fillStyle = near ? "rgba(240, 180, 143, 0.95)" : "rgba(227, 154, 116, 0.7)";
        ctx.fill();
      }
      // halo du curseur
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radius);
        g.addColorStop(0, `rgba(207, 112, 70, ${mouse.pressed ? 0.14 : 0.07})`);
        g.addColorStop(1, "rgba(207, 112, 70, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    const setPos = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.active = true;
    };
    const onMove = (e: MouseEvent) => setPos(e.clientX, e.clientY);
    const onLeave = () => { mouse.active = false; mouse.pressed = false; };
    const onDown = () => { mouse.pressed = true; };
    const onUp = () => { mouse.pressed = false; };
    const onTouchMove = (e: TouchEvent) => { const t = e.touches[0]; if (t) { setPos(t.clientX, t.clientY); mouse.pressed = true; } };
    const onTouchEnd = () => { mouse.active = false; mouse.pressed = false; };

    resize();
    draw();
    window.addEventListener("resize", resize);
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    parent.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    parent.addEventListener("touchmove", onTouchMove, { passive: true });
    parent.addEventListener("touchend", onTouchEnd);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      parent.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      parent.removeEventListener("touchmove", onTouchMove);
      parent.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden />;
}
