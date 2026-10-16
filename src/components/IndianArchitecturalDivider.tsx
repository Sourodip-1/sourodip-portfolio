"use client";

import React from "react";
import Image from "next/image";

interface IndianArchitecturalDividerProps {
  className?: string;
  topColor?: string;
  bottomColor?: string;
  showCaption?: boolean;
}

export default function IndianArchitecturalDivider({
  className = "",
  topColor = "#FFFFFF",
  bottomColor = "#F7F8F9",
  showCaption = false,
}: IndianArchitecturalDividerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{ backgroundColor: topColor }}
      aria-label="Indian Architectural Section Divider"
    >
      {/* ── OPTIONAL TOP EDITORIAL CAPTION ───────────────────────────────── */}
      {showCaption && (
        <div className="w-full flex items-center justify-center pt-8 pb-3 select-none pointer-events-none">
          <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-black/55 uppercase font-medium">
            ORIGINAL INDIAN GEOMETRY / PRINT STUDY
          </div>
        </div>
      )}

      {/* ── MAIN ARTWORK CONTAINER (STATIC, NO PARALLAX) ────────────────── */}
      <div className="relative w-full flex items-center justify-center pt-2 sm:pt-4 overflow-hidden">
        <div className="relative w-full max-w-[1560px] aspect-[2172/724] mx-auto select-none pointer-events-none">
          {/* Authentic High-Resolution Indian Architectural Geometry Artwork */}
          <Image
            src="/divider.png"
            alt="Indian Architectural Section Divider Geometry"
            fill
            priority
            className="object-contain object-bottom filter drop-shadow-[0_16px_36px_rgba(0,71,255,0.08)]"
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 96vw, 1560px"
          />
        </div>

        {/* ── BOTTOM ATMOSPHERIC GRADIENT BLUR ───────────────────────────── */}
        {/*
          Smoothly blurs and diffuses the base of the architectural artwork,
          creating an ethereal, misty transition into the plinth bar below.
        */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 sm:h-36 md:h-44 pointer-events-none z-10"
          style={{
            background: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.25) 25%, rgba(255, 255, 255, 0.7) 60%, ${bottomColor} 100%)`,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 30%, black 75%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 30%, black 75%)",
          }}
        />
      </div>

      {/* ── BOTTOM PLINTH BAR (MATCHING THE REFERENCE DOWN TO THE PIXEL) ─── */}
      <div
        className="relative z-20 w-full border-t border-black/[0.08] border-b border-black/[0.05] py-4 px-6 sm:px-10 md:px-14 lg:px-20 select-none"
        style={{ backgroundColor: bottomColor }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          {/* Left: 03 // EXPERIENCE */}
          <div className="font-extrabold text-black uppercase tracking-wider text-xs sm:text-[13px]">
            03 // EXPERIENCE
          </div>

          {/* Center: SYSTEMS, DESIGN & CREATIVE DEVELOPMENT */}
          <div className="text-black/60 tracking-wider text-[11px] sm:text-xs uppercase font-normal text-center">
            SYSTEMS, DESIGN &amp; CREATIVE DEVELOPMENT
          </div>

          {/* Right: STATUS: ACTIVE */}
          <div className="text-[#0047FF] font-bold tracking-wider text-[11px] sm:text-xs uppercase">
            STATUS: ACTIVE
          </div>
        </div>
      </div>
    </div>
  );
}
