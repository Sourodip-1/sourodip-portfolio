"use client";

import React from "react";

// ── LEFT FLANK: INDIAN JALI LATTICE & DEVANAGARI SACRED GEOMETRY ───────────────
export function IndianJaliFlank({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-end select-none pointer-events-none ${className}`}
      aria-label="Indian Jali and Sacred Geometry Panel"
    >
      {/* Top Indic Notation & Devanagari Typography */}
      <div className="flex flex-col items-end text-right mb-4">
        <div className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.28em] text-[#0047FF] font-semibold uppercase">
          <span>॥ सौरदीप ॥</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF] animate-pulse" />
        </div>
        <div className="font-display font-black text-2xl sm:text-3xl tracking-wide text-black uppercase my-1 flex items-center gap-2">
          <span className="bg-gradient-to-r from-black via-[#0038CC] to-[#0047FF] bg-clip-text text-transparent">
            सौरदीप
          </span>
          <span className="font-mono text-[10px] text-black/35 font-normal tracking-widest">
            [01]
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[8.5px] text-black/50 tracking-[0.22em] uppercase">
          <span>DEVANAGARI SCRIPT</span>
          <span>•</span>
          <span>VĀSTU FORM</span>
        </div>
      </div>

      {/* ── Precision Vector: Indian Geometric Jali & Stepwell Grid ── */}
      <div className="relative w-44 sm:w-52 lg:w-56 h-64 sm:h-72 p-2 rounded-xl border border-black/[0.08] bg-gradient-to-br from-[#FAFCFF] to-white/70 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,71,255,0.04)] overflow-hidden">
        {/* Fine background millimeter grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,71,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,71,255,0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <svg
          viewBox="0 0 200 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          {/* Top Ornamental Torana / Chevron Border */}
          <g stroke="#0047FF" strokeWidth="0.85" opacity="0.8">
            <path d="M 10 15 L 100 15 L 190 15" strokeDasharray="3 3" />
            <path d="M 20 22 L 35 7 L 50 22 L 65 7 L 80 22 L 95 7 L 110 22 L 125 7 L 140 22 L 155 7 L 170 22 L 185 7" />
            <line x1="100" y1="4" x2="100" y2="26" stroke="#0047FF" strokeWidth="1.2" />
            <circle cx="100" cy="4" r="2.5" fill="#0047FF" />
          </g>

          {/* Central 8-Pointed Star Jali (Ashtakon Mandala) */}
          <g transform="translate(100, 95)">
            {/* Concentric Construction Rings */}
            <circle cx="0" cy="0" r="48" stroke="rgba(0,0,0,0.12)" strokeWidth="0.75" strokeDasharray="2 2" />
            <circle cx="0" cy="0" r="38" stroke="rgba(0,71,255,0.25)" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="24" stroke="#0047FF" strokeWidth="0.85" opacity="0.6" />
            <circle cx="0" cy="0" r="8" fill="#0047FF" fillOpacity="0.12" stroke="#0047FF" strokeWidth="1.1" />
            <circle cx="0" cy="0" r="2.5" fill="#0047FF" />

            {/* Ashtakon: Square 1 */}
            <rect x="-27" y="-27" width="54" height="54" stroke="#0047FF" strokeWidth="1.1" fill="none" opacity="0.85" />
            {/* Ashtakon: Square 2 (Rotated 45°) */}
            <rect x="-27" y="-27" width="54" height="54" stroke="#0047FF" strokeWidth="1.1" fill="none" opacity="0.85" transform="rotate(45)" />

            {/* Interlocking Diamond Lattice Rays */}
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 45})`}>
                <line x1="0" y1="-8" x2="0" y2="-48" stroke="#0047FF" strokeWidth="0.7" opacity="0.5" />
                <path d="M 0 -38 L 8 -27 L 0 -16 L -8 -27 Z" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" fill="rgba(0,71,255,0.03)" />
                <circle cx="0" cy="-48" r="1.5" fill="#0047FF" />
              </g>
            ))}

            {/* 4 Corner Mini Star Rosettes */}
            {[-38, 38].map((cx) =>
              [-38, 38].map((cy) => (
                <g key={`${cx}-${cy}`} transform={`translate(${cx}, ${cy})`}>
                  <circle cx="0" cy="0" r="6" stroke="#0047FF" strokeWidth="0.6" opacity="0.5" />
                  <rect x="-4" y="-4" width="8" height="8" stroke="rgba(0,0,0,0.35)" strokeWidth="0.5" fill="none" />
                  <rect x="-4" y="-4" width="8" height="8" stroke="rgba(0,0,0,0.35)" strokeWidth="0.5" fill="none" transform="rotate(45)" />
                </g>
              ))
            )}
          </g>

          {/* ── Lower Section: Indian Stepwell (Baoli) Isometric Steps ── */}
          <g transform="translate(15, 175)" stroke="#0047FF" strokeWidth="0.85" opacity="0.75">
            {/* Stepwell Chevron Terraces */}
            <path d="M 0 50 L 25 25 L 50 50 L 75 25 L 100 50 L 125 25 L 150 50 L 170 30" fill="none" />
            <path d="M 10 58 L 35 33 L 60 58 L 85 33 L 110 58 L 135 33 L 160 58" fill="none" strokeWidth="0.65" opacity="0.6" />
            <path d="M 20 66 L 45 41 L 70 66 L 95 41 L 120 66 L 145 41" fill="none" strokeWidth="0.5" opacity="0.4" />

            {/* Stepped Pyramid Central Shrine Marker */}
            <line x1="85" y1="5" x2="85" y2="72" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" strokeDasharray="2 2" />
            <circle cx="85" cy="5" r="3" fill="#0047FF" />
            <path d="M 75 20 L 85 8 L 95 20 Z" fill="rgba(0,71,255,0.15)" stroke="#0047FF" strokeWidth="0.9" />
          </g>

          {/* Technical Alignment Crosshairs & Registration Markers */}
          <g stroke="rgba(0,71,255,0.4)" strokeWidth="0.75">
            <line x1="12" y1="12" x2="24" y2="12" />
            <line x1="12" y1="12" x2="12" y2="24" />
            <line x1="188" y1="12" x2="176" y2="12" />
            <line x1="188" y1="12" x2="188" y2="24" />
            <line x1="12" y1="248" x2="24" y2="248" />
            <line x1="12" y1="248" x2="12" y2="236" />
            <line x1="188" y1="248" x2="176" y2="248" />
            <line x1="188" y1="248" x2="188" y2="236" />
          </g>
        </svg>

        {/* Micro-label at bottom of panel */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[7.5px] text-black/45 uppercase tracking-wider z-20">
          <span>PLATE: JALI-08</span>
          <span className="text-[#0047FF] font-semibold">22.57° N</span>
        </div>
      </div>
    </div>
  );
}

// ── RIGHT FLANK: RAJASTHANI JHAROKHA ARCH & LOTUS MANDALA (PADMA) ─────────────
export function IndianJharokhaFlank({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-start select-none pointer-events-none ${className}`}
      aria-label="Indian Jharokha Arch and Lotus Mandala Panel"
    >
      {/* Top Indic Notation & Arch Title */}
      <div className="flex flex-col items-start text-left mb-4">
        <div className="flex items-center gap-2 font-mono text-[9.5px] tracking-[0.28em] text-[#0047FF] font-semibold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF] animate-pulse" />
          <span>॥ स्थापत्य कला ॥</span>
        </div>
        <div className="font-display font-black text-2xl sm:text-3xl tracking-wide text-black uppercase my-1 flex items-center gap-2">
          <span className="font-mono text-[10px] text-black/35 font-normal tracking-widest">
            [02]
          </span>
          <span className="bg-gradient-to-r from-[#0047FF] via-[#0038CC] to-black bg-clip-text text-transparent">
            झरोखा
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[8.5px] text-black/50 tracking-[0.22em] uppercase">
          <span>JHAROKHA ARCH</span>
          <span>•</span>
          <span>PADMA MANDALA</span>
        </div>
      </div>

      {/* ── Precision Vector: Indian Cusped Arch & Concentric Lotus ── */}
      <div className="relative w-44 sm:w-52 lg:w-56 h-64 sm:h-72 p-2 rounded-xl border border-black/[0.08] bg-gradient-to-bl from-[#FAFCFF] to-white/70 backdrop-blur-sm shadow-[0_8px_24px_rgba(0,71,255,0.04)] overflow-hidden">
        {/* Fine background millimeter grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,71,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,71,255,0.08) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <svg
          viewBox="0 0 200 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10"
        >
          {/* Classical 9-Foil Indian Cusped Arch (Mughal-Rajasthani Mehrab / Jharokha) */}
          <g stroke="#0047FF" strokeWidth="1.15" fill="none">
            {/* Outer Arch Molding */}
            <path
              d="M 25 240 L 25 125 C 25 105, 38 95, 45 85 C 52 75, 58 60, 72 52 C 86 44, 94 30, 100 16 C 106 30, 114 44, 128 52 C 142 60, 148 75, 155 85 C 162 95, 175 105, 175 125 L 175 240"
              stroke="#0047FF"
              strokeWidth="1.2"
              opacity="0.9"
            />
            {/* Inner Concentric Arch Foil */}
            <path
              d="M 33 240 L 33 128 C 33 110, 44 102, 51 92 C 58 82, 64 68, 76 61 C 88 54, 95 42, 100 30 C 105 42, 112 54, 124 61 C 136 68, 142 82, 149 92 C 156 102, 167 110, 167 128 L 167 240"
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="0.8"
              strokeDasharray="3 2"
            />
            {/* Sacred Keystone Finial (Kalasa & Amrit Kumbha) at Apex */}
            <circle cx="100" cy="14" r="3" fill="#0047FF" />
            <path d="M 97 10 L 100 2 L 103 10 Z" fill="#0047FF" stroke="#0047FF" strokeWidth="0.6" />
          </g>

          {/* Concentric 16-Petal Sacred Lotus Mandala (Padma Mandala) */}
          <g transform="translate(100, 145)">
            {/* Concentric Radii */}
            <circle cx="0" cy="0" r="46" stroke="rgba(0,0,0,0.12)" strokeWidth="0.75" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="36" stroke="#0047FF" strokeWidth="0.8" opacity="0.6" />
            <circle cx="0" cy="0" r="22" stroke="rgba(0,71,255,0.4)" strokeWidth="0.7" />
            <circle cx="0" cy="0" r="10" fill="#0047FF" fillOpacity="0.1" stroke="#0047FF" strokeWidth="1.1" />
            <circle cx="0" cy="0" r="3" fill="#0047FF" />

            {/* 16 Curved Lotus Petals */}
            {Array.from({ length: 16 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 22.5})`}>
                <path
                  d="M 0 0 C 6 -14, 10 -26, 0 -36 C -10 -26, -6 -14, 0 0 Z"
                  stroke="#0047FF"
                  strokeWidth="0.7"
                  fill="rgba(0,71,255,0.03)"
                  opacity="0.75"
                />
                <circle cx="0" cy="-36" r="1.2" fill="#0047FF" />
              </g>
            ))}

            {/* Micro Paisley / Buta Flame Accents in 4 Quadrants */}
            {[0, 90, 180, 270].map((deg) => (
              <g key={deg} transform={`rotate(${deg}) translate(0, -22)`}>
                <path
                  d="M 0 0 C 3 -4, 5 -8, 2 -12 C -1 -15, -4 -12, -2 -8 Z"
                  fill="rgba(0,71,255,0.2)"
                  stroke="#0047FF"
                  strokeWidth="0.5"
                />
              </g>
            ))}
          </g>

          {/* Arch Base Pillars with Stepped Capital Details */}
          <g stroke="#0047FF" strokeWidth="1" opacity="0.85">
            {/* Left Pillar Capital & Base */}
            <rect x="20" y="122" width="10" height="4" fill="#0047FF" fillOpacity="0.2" />
            <rect x="18" y="235" width="14" height="6" fill="#0047FF" fillOpacity="0.2" />
            {/* Right Pillar Capital & Base */}
            <rect x="170" y="122" width="10" height="4" fill="#0047FF" fillOpacity="0.2" />
            <rect x="168" y="235" width="14" height="6" fill="#0047FF" fillOpacity="0.2" />
          </g>

          {/* Technical Blueprint Measurement Hairlines */}
          <g stroke="rgba(0,71,255,0.4)" strokeWidth="0.75">
            <line x1="12" y1="12" x2="24" y2="12" />
            <line x1="12" y1="12" x2="12" y2="24" />
            <line x1="188" y1="12" x2="176" y2="12" />
            <line x1="188" y1="12" x2="188" y2="24" />
            <line x1="12" y1="248" x2="24" y2="248" />
            <line x1="12" y1="248" x2="12" y2="236" />
            <line x1="188" y1="248" x2="176" y2="248" />
            <line x1="188" y1="248" x2="188" y2="236" />
          </g>
        </svg>

        {/* Micro-label at bottom of panel */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[7.5px] text-black/45 uppercase tracking-wider z-20">
          <span>TORANA ARCH · 09</span>
          <span className="text-[#0047FF] font-semibold">PADMA VĀSTU</span>
        </div>
      </div>
    </div>
  );
}

// ── HORIZONTAL CONNECTING GUIDE-BAR (TRANSITION THRESHOLD) ────────────────────
export function IndianTransitionGuide({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-between gap-4 font-mono select-none ${className}`}>
      {/* Left indicator line */}
      <div className="flex-1 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full border border-[#0047FF] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#0047FF]" />
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#0047FF]/60 via-black/20 to-black/10" />
        <span className="text-[8.5px] text-black/40 uppercase tracking-widest hidden lg:inline">
          EAST-ASIAN CALLIGRAPHY
        </span>
      </div>

      {/* Center transition glyph */}
      <div className="flex items-center gap-2.5 px-3 py-1 rounded-full border border-black/10 bg-white/80 backdrop-blur-sm shadow-sm text-[9px] uppercase tracking-[0.24em] text-black/70 font-semibold">
        <span className="text-[#0047FF] font-bold">॥</span>
        <span>STYLE CONVERGENCE : 日本 ➔ भारत</span>
        <span className="text-[#0047FF] font-bold">॥</span>
      </div>

      {/* Right indicator line */}
      <div className="flex-1 flex items-center gap-2">
        <span className="text-[8.5px] text-black/40 uppercase tracking-widest hidden lg:inline">
          INDIC ARCHITECTURAL FORM
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-[#0047FF]/60 via-black/20 to-black/10" />
        <div className="w-2 h-2 rounded-full border border-[#0047FF] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#0047FF]" />
        </div>
      </div>
    </div>
  );
}
