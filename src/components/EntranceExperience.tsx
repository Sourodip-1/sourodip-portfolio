"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { sound } from "@/lib/sound";

interface EntranceProps {
  onComplete: () => void;
  onSkip: () => void;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789§∆∑Ø/[]{}*#+=_~";

export default function EntranceExperience({ onComplete, onSkip }: EntranceProps) {
  const [phase, setPhase] = useState<"opening" | "scramble" | "zoom" | "done">("opening");
  const [scrambleText, setScrambleText] = useState("SOURODIP ROY");
  const [progress, setProgress] = useState(0);

  // Check reduced motion preference
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      onSkip();
      return;
    }

    // Keyboard listener for ESC to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        onSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSkip]);

  // Main Choreographed Animation Sequence
  useEffect(() => {
    // Progress counter ticker
    const timerProgress = setInterval(() => {
      setProgress((prev) => (prev < 99 ? prev + 3 : 99));
    }, 40);

    // Phase 2: Kinetic Typographic Scramble (at 1200ms)
    const timerPhase2 = setTimeout(() => {
      setPhase("scramble");
      sound.playClick(500);

      const targetWords = ["SOURODIP ROY", "BUILD WHAT", "MATTERS."];
      let wordIdx = 0;
      let iteration = 0;

      const scrambleInterval = setInterval(() => {
        const target = targetWords[wordIdx];
        const scrambled = target
          .split("")
          .map((char, index) => {
            if (char === " " || char === ".") return char;
            if (index < iteration) return target[index];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");

        setScrambleText(scrambled);
        iteration += 0.85;

        if (iteration >= target.length) {
          iteration = 0;
          wordIdx++;
          if (wordIdx >= targetWords.length) {
            clearInterval(scrambleInterval);
            setScrambleText("MATTERS.");
          }
        }
      }, 45);
    }, 1200);

    // Phase 3: The Masked Zoom Reveal (at 2800ms)
    const timerPhase3 = setTimeout(() => {
      setPhase("zoom");
      sound.playTransition();
    }, 2800);

    // Phase 4: Final Handoff to Hero (at 3900ms)
    const timerPhase4 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3900);

    return () => {
      clearInterval(timerProgress);
      clearTimeout(timerPhase2);
      clearTimeout(timerPhase3);
      clearTimeout(timerPhase4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: phase === "zoom" || phase === "done" ? 0 : 1,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
      className="fixed inset-0 z-50 overflow-hidden bg-white text-black select-none pointer-events-auto"
      style={{
        maskImage:
          phase === "zoom" || phase === "done"
            ? "radial-gradient(circle at 50% 50%, transparent 80%, black 120%)"
            : "radial-gradient(circle at 50% 50%, black 100%, black 100%)",
        WebkitMaskImage:
          phase === "zoom" || phase === "done"
            ? "radial-gradient(circle at 50% 50%, transparent 80%, black 120%)"
            : "radial-gradient(circle at 50% 50%, black 100%, black 100%)",
        transition: "mask-image 1.1s ease-in, -webkit-mask-image 1.1s ease-in",
      }}
    >
      {/* ========================================================================= */}
      {/* CORNER TELEMETRY & EDITORIAL LABELS */}
      {/* ========================================================================= */}
      <div className="absolute top-6 left-8 font-mono text-[10px] tracking-widest uppercase text-black/50 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0047FF] animate-ping" />
        <span>APERTURE // INITIATING SEQUENCE</span>
      </div>

      <div className="absolute top-6 right-8 font-mono text-[10px] tracking-widest uppercase text-black/50 hidden sm:flex items-center gap-4">
        <span>KOLKATA [22.57° N, 88.36° E]</span>
        <span className="text-black/20">|</span>
        <span>INDEX 2026</span>
      </div>

      <div className="absolute bottom-6 left-8 font-mono text-[10px] tracking-widest uppercase text-black/50 hidden md:block">
        <span>SYSTEMS ARCHITECT & CREATIVE DEVELOPER</span>
      </div>

      {/* Manual Skip Trigger */}
      <button
        onClick={onSkip}
        className="absolute bottom-6 right-8 px-4 py-1.5 rounded-full border border-black/15 bg-black/5 hover:bg-[#0047FF] hover:text-white hover:border-[#0047FF] font-mono text-[10px] uppercase tracking-wider transition-all duration-300 shadow-sm"
      >
        <span>SKIP INTRO [ESC] ↵</span>
      </button>

      {/* Subtle Hairline Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-30 grid-bg-light" />

      {/* Crosshair Technical Alignments */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 w-4 h-px bg-black/20" />
      <div className="absolute top-1/2 right-8 -translate-y-1/2 w-4 h-px bg-black/20" />
      <div className="absolute left-1/2 top-8 -translate-x-1/2 w-px h-4 bg-black/20" />
      <div className="absolute left-1/2 bottom-8 -translate-x-1/2 w-px h-4 bg-black/20" />

      {/* ========================================================================= */}
      {/* CENTER TRANSFORMATIONAL CANVAS */}
      {/* ========================================================================= */}
      <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
        {/* Kinetic Aperture Rings */}
        <motion.div
          animate={{
            scale: phase === "zoom" ? [1, 3, 10] : [1, 1.05, 1],
            rotate: phase === "scramble" ? [0, 90, 180] : 0,
            opacity: phase === "zoom" ? 0 : [0.15, 0.4, 0.15],
          }}
          transition={{
            scale: { duration: 1.1, ease: [0.85, 0, 0.15, 1] },
            rotate: { duration: 1.6, ease: "easeInOut" },
            opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute w-[320px] sm:w-[480px] md:w-[620px] aspect-square rounded-full border border-[#0047FF]/25 pointer-events-none"
        />

        {/* Secondary Dashed Concentric Guide */}
        <motion.div
          animate={{
            scale: phase === "zoom" ? [1, 4, 15] : 1,
            rotate: phase === "scramble" ? [0, -90, -180] : 0,
            opacity: phase === "zoom" ? 0 : 0.2,
          }}
          transition={{
            scale: { duration: 1.1, ease: [0.85, 0, 0.15, 1] },
            rotate: { duration: 1.8, ease: "easeInOut" },
          }}
          className="absolute w-[240px] sm:w-[380px] md:w-[500px] aspect-square rounded-full border border-dashed border-black/20 pointer-events-none"
        />

        {/* ========================================================================= */}
        {/* MAIN TYPOGRAPHIC SCRAMBLE & ZOOM APERTURE */}
        {/* ========================================================================= */}
        <motion.div
          animate={{
            scale: phase === "zoom" ? [1, 4, 20] : [0.95, 1],
            opacity: phase === "zoom" ? [1, 0.8, 0] : 1,
          }}
          transition={{
            scale: { duration: 1.1, ease: [0.85, 0, 0.15, 1] },
            opacity: { duration: 1.0, ease: "easeOut" },
          }}
          className="relative z-10 flex flex-col items-center justify-center text-center origin-center max-w-6xl w-full"
        >
          {/* Eyebrow Label */}
          <motion.div
            animate={{ opacity: phase === "zoom" ? 0 : 1, y: phase === "zoom" ? -20 : 0 }}
            className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#0047FF] mb-4"
          >
            <span>[ INITIATING SEQUENCE ]</span>
            <span className="w-10 h-px bg-[#0047FF]/40" />
            <span>0{progress}%</span>
          </motion.div>

          {/* Colossal Kinetic Typographic Headline */}
          <div className="relative py-2">
            <h1 className="font-display font-black text-[12vw] sm:text-[14vw] md:text-[15vw] leading-[0.88] tracking-tighter text-[#0047FF] uppercase select-none">
              {scrambleText}
            </h1>

            {/* Stroke Outline Duplicate for Visual Tension */}
            <h1 className="absolute inset-0 font-display font-black text-[12vw] sm:text-[14vw] md:text-[15vw] leading-[0.88] tracking-tighter text-transparent select-none text-stroke-cobalt translate-x-1 translate-y-1 opacity-35 -z-10">
              {scrambleText}
            </h1>
          </div>

          {/* Manifesto Sub-text */}
          <motion.div
            animate={{
              opacity: phase === "zoom" ? 0 : 1,
              y: phase === "zoom" ? 30 : 0,
            }}
            className="mt-6 flex flex-col items-center gap-2"
          >
            <span className="font-display font-bold text-lg sm:text-2xl tracking-tight text-black">
              BUILD WHAT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047FF] to-[#38BDF8]">
                MATTERS.
              </span>
            </span>
            <span className="font-mono text-[11px] sm:text-xs text-black/50 tracking-widest uppercase">
              ENTERING SPATIAL ARCHITECTURE
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5">
        <motion.div
          className="h-full bg-[#0047FF]"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
