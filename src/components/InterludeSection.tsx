"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";
import { scrollToSection } from "./SmoothScroll";

// ── 01 / KĀLA CHAKRA (ANIMATED TIME WHEEL) ──────────────────────────────────
function KalaChakraMotif({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: isHovered ? 14 : 40, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0 select-none"
    >
      <svg viewBox="0 0 60 60" fill="none" className="w-full h-full text-[#0047FF]">
        <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="30" cy="30" r="20" stroke="currentColor" strokeWidth="1.2" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="30"
            y1="30"
            x2={30 + 19 * Math.cos((deg * Math.PI) / 180)}
            y2={30 + 19 * Math.sin((deg * Math.PI) / 180)}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        ))}
        <circle cx="30" cy="30" r="4.5" fill="currentColor" />
        <circle cx="30" cy="30" r="2" fill="#FFFFFF" />
      </svg>
    </motion.div>
  );
}

// ── 02 / RASA MANDALA (ANIMATED FLUID LOTUS) ─────────────────────────────────
function FluidMandalaMotif({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0 select-none">
      <motion.svg
        viewBox="0 0 60 60"
        fill="none"
        animate={{
          scale: isHovered ? [1, 1.1, 1] : 1,
          rotate: isHovered ? [0, 8, -8, 0] : [0, 3, -3, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full text-[#2563EB]"
      >
        <circle cx="30" cy="30" r="24" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeDasharray="2 3" />
        <path
          d="M30 10C22 18 18 22 10 30C18 38 22 42 30 50C38 42 42 38 50 30C42 22 38 18 30 10Z"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="rgba(37,99,235,0.06)"
        />
        <circle cx="30" cy="30" r="7" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="30" cy="30" r="2.5" fill="currentColor" />
      </motion.svg>
    </div>
  );
}

// ── 03 / SETU TORAN (ANIMATED ARCH & PAISLEY BRIDGE) ─────────────────────────
function SetuPaisleyMotif({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0 select-none">
      <motion.svg
        viewBox="0 0 60 60"
        fill="none"
        animate={{ y: isHovered ? [-3, 3, -3] : [-1.5, 1.5, -1.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full text-[#4B5563]"
      >
        <path
          d="M10 44C10 26 20 16 30 16C40 16 50 26 50 44"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M18 44C18 30 24 22 30 22C36 22 42 30 42 44"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <circle cx="30" cy="12" r="3" fill="currentColor" />
        <path d="M30 6V9" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="20" cy="40" r="2" fill="currentColor" />
        <circle cx="40" cy="40" r="2" fill="currentColor" />
      </motion.svg>
    </div>
  );
}

// ── 04 / SACRED PADMA BLOOM (ANIMATED LOTUS) ─────────────────────────────────
function PadmaBloomMotif({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-12 h-12 sm:w-14 sm:h-14 relative shrink-0 select-none">
      <motion.svg
        viewBox="0 0 60 60"
        fill="none"
        animate={{ scale: isHovered ? [1, 1.12, 1] : [1, 1.05, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-full h-full text-[#EA580C]"
      >
        <circle cx="30" cy="30" r="25" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 2" />
        <path
          d="M30 12C33 22 38 27 48 30C38 33 33 38 30 48C27 38 22 33 12 30C22 27 27 22 30 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="rgba(234,88,12,0.08)"
        />
        <path
          d="M17 17C24 23 27 25 30 30C27 35 24 37 17 43C23 36 25 33 30 30C25 27 23 24 17 17Z"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
        <path
          d="M43 17C36 23 33 25 30 30C33 35 36 37 43 43C37 36 35 33 30 30C35 27 37 24 43 17Z"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
        <circle cx="30" cy="30" r="4" fill="currentColor" />
        <circle cx="30" cy="30" r="1.5" fill="#FFFFFF" />
      </motion.svg>
    </div>
  );
}

// ── ANIMATED INDIAN ORNAMENTAL RULE DIVIDER ─────────────────────────────────
function IndianRuleDivider() {
  return (
    <div className="w-full py-10 sm:py-14 flex items-center justify-center gap-4 select-none opacity-50">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#0047FF]/25 to-[#0047FF]/45" />
      <div className="flex items-center gap-2 text-[#0047FF]">
        <span className="text-[11px] font-mono">॥</span>
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="text-sm text-[#0047FF]"
        >
          ❖
        </motion.span>
        <span className="text-[11px] font-mono">॥</span>
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#0047FF]/25 to-[#0047FF]/45" />
    </div>
  );
}

// ── LEFT SIDE INDIAN MANUSCRIPT MARGINALIA (हाशिया) ─────────────────────────
function LeftManuscriptMargin() {
  return (
    <div className="hidden lg:flex absolute left-4 xl:left-8 2xl:left-12 top-16 bottom-16 w-16 xl:w-20 flex-col items-center justify-between pointer-events-none select-none z-10 opacity-75">
      {/* Top Corner Finial */}
      <div className="flex flex-col items-center gap-2">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-[#0047FF]">
          <path d="M4 32V4H32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M9 27V9H27" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="9" cy="9" r="2" fill="currentColor" />
          <path d="M9 9C14 14 18 11 23 16C18 21 15 18 9 24" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#0047FF] font-semibold">
          हाशिया
        </span>
      </div>

      {/* Floating Animated Diya / Paisley Tendril Motif */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="my-auto flex flex-col items-center gap-4"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#0047FF]/35 to-transparent" />
        <span
          className="font-serif text-[11px] text-black/45 tracking-[0.32em] uppercase select-none font-medium"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          ॥ काल चक्र · रस सिद्धांत · सेतु सूत्र · वास्तु शिल्प ॥
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#0047FF]/35 to-transparent" />
      </motion.div>

      {/* Bottom Sacred Glyph */}
      <div className="flex flex-col items-center gap-1 font-mono text-[9px] text-black/40">
        <span className="text-[#0047FF] font-bold text-xs">॥ ॐ ॥</span>
        <span className="tracking-widest">FOLIO · ०४</span>
      </div>
    </div>
  );
}

// ── RIGHT SIDE INDIAN MANUSCRIPT MARGINALIA (शास्त्र) ───────────────────────
function RightManuscriptMargin() {
  return (
    <div className="hidden lg:flex absolute right-4 xl:right-8 2xl:right-12 top-16 bottom-16 w-16 xl:w-20 flex-col items-center justify-between pointer-events-none select-none z-10 opacity-75">
      {/* Top Corner Finial */}
      <div className="flex flex-col items-center gap-2">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-[#0047FF]">
          <path d="M32 32V4H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M27 27V9H9" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" />
          <circle cx="27" cy="9" r="2" fill="currentColor" />
          <path d="M27 9C22 14 18 11 13 16C18 21 21 18 27 24" stroke="currentColor" strokeWidth="1" />
        </svg>
        <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#0047FF] font-semibold">
          MARGIN
        </span>
      </div>

      {/* Floating Animated Vedic Shloka Motif */}
      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="my-auto flex flex-col items-center gap-4"
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#EA580C]/35 to-transparent" />
        <span
          className="font-serif text-[11px] text-[#EA580C]/70 tracking-[0.32em] uppercase select-none font-medium"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          ॥ कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ॥
        </span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-[#EA580C]/35 to-transparent" />
      </motion.div>

      {/* Bottom Sacred Glyph */}
      <div className="flex flex-col items-center gap-1 font-mono text-[9px] text-black/40">
        <span className="text-[#EA580C] font-bold text-xs">॥ श्री ॥</span>
        <span className="tracking-widest">VĀSTU · 2026</span>
      </div>
    </div>
  );
}

// ── SIDE REPEATING INDIAN JAALI BORDER COLUMNS ──────────────────────────────
function SideJaaliTrellis({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`hidden 2xl:block absolute top-12 bottom-12 ${
        side === "left" ? "left-24" : "right-24"
      } w-6 pointer-events-none select-none opacity-25`}
    >
      <div className="w-full h-full flex flex-col justify-around py-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center my-1 text-[#0047FF]">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L18 10L10 18L2 10Z" stroke="currentColor" strokeWidth="1" />
              <circle cx="10" cy="10" r="1.8" fill="currentColor" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InterludeSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleScrollTo = (targetId: string) => {
    sound.playClick(540);
    scrollToSection(targetId, -30);
  };

  const ACTS = [
    {
      numLatin: "01",
      numIndic: "०१",
      theme: "TIME",
      section: "HOME SECTION",
      targetId: "top",
      mantra: "Our time is running out.",
      description:
        "A clock ticking down milliseconds and a calendar matrix crossing off days in silence. The site opens with urgency: the window to build is finite, and ideas only matter once shipped to the world.",
      accent: "#0047FF",
      motif: <KalaChakraMotif isHovered={hoveredIndex === 0} />,
    },
    {
      numLatin: "02",
      numIndic: "०२",
      theme: "FERROFLUID",
      section: "SELECTED WORKS",
      targetId: "work",
      mantra: "Depicting futuristic things.",
      description:
        "Reactive magnetic fluid shifting under GPU shader mathematics. A visual metaphor for software that feels like dark matter — deep-tech developer tooling, persistent AI memory, and zero-boilerplate infrastructure.",
      accent: "#2563EB",
      motif: <FluidMandalaMotif isHovered={hoveredIndex === 1} />,
    },
    {
      numLatin: "03",
      numIndic: "०३",
      theme: "TRANSITIONAL",
      section: "ABOUT SECTION",
      targetId: "about",
      mantra: "A mix of modern and traditional.",
      description:
        "Torn paper seams, modular blueprint blocks, and Japanese woodblock typography. The aesthetic crossroads where high-velocity AI systems meet quiet, contemplative human craft.",
      accent: "#4B5563",
      motif: <SetuPaisleyMotif isHovered={hoveredIndex === 2} />,
    },
    {
      numLatin: "04",
      numIndic: "०४",
      theme: "INDIAN DESIGN",
      section: "EXPERIENCE SECTION",
      targetId: "experience",
      mantra: "Rooted in timeless tradition.",
      description:
        "Classical Indian architecture, Vāstu geometry, and Vedic philosophy. Engineering elevated into Sādhanā (dedicated practice), encased in sculptural 3D bloom geometries and sacred pentatonic bell chimes.",
      accent: "#EA580C",
      indicSnippet: "॥ कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ॥",
      motif: <PadmaBloomMotif isHovered={hoveredIndex === 3} />,
    },
  ];

  return (
    <section
      id="interlude-section"
      className="relative w-full bg-[#FAF9F5] text-black py-20 sm:py-28 px-6 sm:px-12 border-t border-black/[0.06] overflow-hidden"
    >
      {/* ── BACKGROUND: SACRED SLOW-ROTATING INDIAN MANDALA WATERMARK ──────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] pointer-events-none opacity-[0.035]">
        <motion.svg
          viewBox="0 0 400 400"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
          className="w-full h-full text-black"
        >
          <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
            <line
              key={deg}
              x1="200"
              y1="200"
              x2={200 + 190 * Math.cos((deg * Math.PI) / 180)}
              y2={200 + 190 * Math.sin((deg * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="0.8"
            />
          ))}
          <path
            d="M200 110C215 170 230 185 290 200C230 215 215 230 200 290C185 230 170 215 110 200C170 185 185 170 200 110Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </motion.svg>
      </div>

      {/* ── SIDES: AUTHENTIC INDIAN MANUSCRIPT MARGINS (हाशिया & शास्त्र) ──── */}
      <LeftManuscriptMargin />
      <RightManuscriptMargin />
      <SideJaaliTrellis side="left" />
      <SideJaaliTrellis side="right" />

      {/* ── CENTER: NARRATIVE CONTENT ────────────────────────────────────────── */}
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* ── SECTION HEADER (AUTHENTIC INDIAN EPIGRAPHY) ────────────────────── */}
        <div className="mb-16 sm:mb-20 text-center">
          <div className="inline-flex items-center gap-2.5 font-mono text-[10px] sm:text-[11px] text-[#0047FF] uppercase tracking-[0.3em] font-semibold mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF] animate-pulse" />
            <span>॥ अन्तराल दर्शन // INTERLUDE · 04 ॥</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-black uppercase mb-3">
            How This Site Is Themed
          </h2>

          <p className="font-mono text-xs sm:text-[13px] text-black/55 tracking-wide max-w-md mx-auto">
            A continuous scrolling story across four distinct philosophical chapters.
          </p>
        </div>

        {/* ── THE FOUR SCROLLING CHAPTERS (ANIMATED INDIAN MOTIFS) ──────────── */}
        <div className="space-y-4">
          {ACTS.map((act, idx) => (
            <React.Fragment key={act.numLatin}>
              <div
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  sound.playCardHover(idx);
                }}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group py-6 transition-all duration-300"
              >
                {/* Header Row: Animated Indian Motif + Numbering + Section Target */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/[0.09]">
                  <div className="flex items-center gap-3.5">
                    {/* Animated Motif */}
                    {act.motif}

                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-[#0047FF] font-semibold">
                        <span>॥ {act.numIndic}</span>
                        <span className="text-black/30">/</span>
                        <span className="text-black uppercase">{act.theme} ॥</span>
                      </div>
                      <div className="font-mono text-[10.5px] text-black/45 uppercase tracking-wider mt-0.5">
                        {act.section}
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-[11px] text-black/35 font-light">
                    ACT {act.numLatin}
                  </span>
                </div>

                {/* Mantra Pull-Quote */}
                <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-black font-normal leading-snug mb-3 group-hover:text-[#0047FF] transition-colors duration-200">
                  “{act.mantra}”
                </blockquote>

                {/* Concise Story Prose */}
                <p className="font-sans text-sm sm:text-base text-black/70 leading-relaxed max-w-2xl font-normal">
                  {act.description}
                </p>

                {/* Indic Snippet if present */}
                {act.indicSnippet && (
                  <div className="mt-3 font-serif text-sm text-[#EA580C] font-medium tracking-wide">
                    {act.indicSnippet}
                  </div>
                )}

                {/* Jump Link */}
                <div className="mt-4">
                  <button
                    onClick={() => handleScrollTo(act.targetId)}
                    className="inline-flex items-center gap-2 font-mono text-xs text-[#0047FF] hover:text-black transition-colors cursor-pointer group/link"
                  >
                    <span className="font-medium underline underline-offset-4 decoration-[#0047FF]/35 group-hover/link:decoration-black">
                      Explore in {act.section.toLowerCase()}
                    </span>
                    <span className="text-sm group-hover/link:translate-x-1 transition-transform">
                      ↑
                    </span>
                  </button>
                </div>
              </div>

              {/* Animated Indian Rule Divider between chapters */}
              {idx < ACTS.length - 1 && <IndianRuleDivider />}
            </React.Fragment>
          ))}
        </div>

        {/* ── CLOSING EPILOGUE ────────────────────────────────────────────────── */}
        <div className="mt-20 sm:mt-24 pt-10 border-t border-black/[0.08] text-center">
          <div className="font-serif italic text-base sm:text-lg text-black/80 mb-2">
            Urgency → Speculation → Synthesis → Heritage.
          </div>
          <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#0047FF] font-medium">
            ॥ चार अध्याय · एक दर्शन // FOUR CHAPTERS · ONE PHILOSOPHY ॥
          </div>
        </div>
      </div>
    </section>
  );
}
