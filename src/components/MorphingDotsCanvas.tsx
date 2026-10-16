"use client";

import { useEffect, useRef, useState } from "react";
import { getLogoDots, TOTAL_DOTS } from "./dotLogosData";

interface MorphingDotsCanvasProps {
  activeIndex: number;
  className?: string;
  size?: number;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  color: string;
  targetX: number;
  targetY: number;
  targetR: number;
  targetColor: string;
  phase: number;
}

const LOGO_NAMES = ["POSTPIPE", "KONTEXT", "FLOW", "BUFFER"];
const LOGO_SUBS = [
  "HALFTONE TRIANGULAR MATRIX",
  "DEEP BLUE CONSTELLATION MESH",
  "DUAL S-CURVE FLUID RIBBONS",
  "TYPOGRAPHIC 3D BLOCK MATRIX",
];

export default function MorphingDotsCanvas({
  activeIndex,
  className = "",
  size = 320,
}: MorphingDotsCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const isVisibleRef = useRef<boolean>(false);
  const [currentLabel, setCurrentLabel] = useState(LOGO_NAMES[activeIndex] || "POSTPIPE");
  const [currentSub, setCurrentSub] = useState(LOGO_SUBS[activeIndex] || "");

  // Update label with subtle transition
  useEffect(() => {
    setCurrentLabel(LOGO_NAMES[activeIndex] || "POSTPIPE");
    setCurrentSub(LOGO_SUBS[activeIndex] || "");
  }, [activeIndex]);

  // Initialize or update targets on activeIndex change
  useEffect(() => {
    const targets = getLogoDots(activeIndex);

    if (particlesRef.current.length === 0) {
      // Initialize particles
      particlesRef.current = targets.map((t, i) => ({
        x: t.x,
        y: t.y,
        r: t.r,
        color: t.color,
        targetX: t.x,
        targetY: t.y,
        targetR: t.r,
        targetColor: t.color,
        phase: (i / TOTAL_DOTS) * Math.PI * 2,
      }));
    } else {
      // Update targets
      particlesRef.current.forEach((p, i) => {
        const t = targets[i] || targets[0];
        p.targetX = t.x;
        p.targetY = t.y;
        p.targetR = t.r;
        p.targetColor = t.color;
      });
    }
  }, [activeIndex]);

  // Main 60/120 FPS animation loop with viewport visibility pausing
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI canvas buffer setup once per size/dpr
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    let animId: number;
    let time = 0;

    const render = () => {
      // Only compute and draw if element is visible on screen
      if (isVisibleRef.current) {
        time += 0.025;
        const w = size;
        const h = size;

        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);

        // Center origin
        const cx = w / 2;
        const cy = h / 2;
        ctx.translate(cx, cy);

        const mx = mouseRef.current.x !== null ? mouseRef.current.x - cx : null;
        const my = mouseRef.current.y !== null ? mouseRef.current.y - cy : null;

        const particles = particlesRef.current;
        const lerpSpeed = 0.09;

        // Group circles by color to minimize state changes
        const colorBatches: Record<string, { x: number; y: number; r: number }[]> = {};

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];

          // Smoothly interpolate positions & radius towards target
          p.x += (p.targetX - p.x) * lerpSpeed;
          p.y += (p.targetY - p.y) * lerpSpeed;
          p.r += (p.targetR - p.r) * lerpSpeed;

          // Subtle organic breathing oscillation
          const breath = Math.sin(time + p.phase) * 0.35;
          let drawX = p.x + breath * 0.5;
          let drawY = p.y + breath;

          // Interactive mouse deflection
          if (mx !== null && my !== null) {
            const dx = drawX - mx;
            const dy = drawY - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 60;
            if (dist < maxDist && dist > 0.1) {
              const force = (1 - dist / maxDist) * 14;
              drawX += (dx / dist) * force;
              drawY += (dy / dist) * force;
            }
          }

          const col = p.targetColor;
          if (!colorBatches[col]) colorBatches[col] = [];
          colorBatches[col].push({ x: drawX, y: drawY, r: Math.max(0.8, p.r) });
        }

        // Draw batched by color
        for (const col in colorBatches) {
          ctx.fillStyle = col;
          ctx.beginPath();
          const items = colorBatches[col];
          for (let j = 0; j < items.length; j++) {
            const it = items[j];
            ctx.moveTo(it.x + it.r, it.y);
            ctx.arc(it.x, it.y, it.r, 0, Math.PI * 2);
          }
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    // Use IntersectionObserver to pause work when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    animId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [size]);

  // Mouse handlers for tactile deflection
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: null, y: null };
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Canvas container with subtle halo backdrop */}
      <div className="relative flex items-center justify-center p-2 rounded-2xl bg-[#0047FF]/[0.03] border border-[#0047FF]/10 shadow-[inner_0_0_24px_rgba(0,71,255,0.04)]">
        <canvas
          ref={canvasRef}
          style={{ width: `${size}px`, height: `${size}px` }}
          className="cursor-crosshair block"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>

      {/* Dynamic Logo Name & Halftone metadata */}
      <div className="mt-4 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#0047FF] tracking-[0.28em] uppercase font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF] animate-pulse" />
          <span>{currentLabel}</span>
        </div>
        <span className="mt-1 font-mono text-[9px] text-black/40 uppercase tracking-widest">
          {currentSub}
        </span>
      </div>
    </div>
  );
}
