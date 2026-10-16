"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "@/lib/sound";
import TextLoop from "./TextLoop";
import { useLenis } from "./SmoothScroll";
import TornPaperDivider from "./TornPaperDivider";
import Ferrofluid from "./ui/Ferrofluid";

interface Project {
  num: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  logo: string;
  logoAlt: string;
  stats?: { label: string; value: string };
  liveUrl?: string;
  githubUrl?: string;
  inDevelopment?: boolean;
}

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "POSTPIPE",
    category: "DEVELOPER TOOLING",
    description:
      "Connect HTML forms directly to MongoDB or PostgreSQL without writing custom backend endpoints. PostPipe simplifies form-to-database workflows so developers can spend less time on boilerplate and more time building.",
    tags: ["Form-to-DB", "PostgreSQL", "MongoDB", "Zero-Boilerplate", "Next.js"],
    year: "2025",
    logo: "/PostPipe-Black.svg",
    logoAlt: "PostPipe Logo",
    stats: { label: "ARCHITECTURE", value: "Zero Backend" },
    liveUrl: "https://postpipe.in/",
    githubUrl: "https://github.com/PostPipe/Postpipe-2.0-fontend",
  },
  {
    num: "02",
    title: "KONTEXT",
    category: "AI INFRASTRUCTURE",
    description:
      "A persistent memory engine for AI agents. Kontext provides a dedicated context layer for storing and retrieving knowledge across interactions, helping agents retain useful information beyond a single conversation.",
    tags: ["Agent Memory", "Model Context Protocol", "Context Layer", "TypeScript"],
    year: "2026",
    logo: "/Kontext-light.svg",
    logoAlt: "Kontext Logo",
    stats: { label: "CONTEXT LAYER", value: "Cross-Session" },
    liveUrl: "https://kontext.postpipe.in",
    githubUrl: "https://github.com/PostPipe/kontext",
  },
  {
    num: "03",
    title: "FLOW GUARDIAN",
    category: "DEVELOPER EXPERIENCE",
    description:
      "A background codebase guardian watching full-stack development for issues before they escalate — catching API mismatches, database query errors, missing env variables, and WebSocket bugs early.",
    tags: ["Codebase Guardian", "Static Analysis", "Full-Stack Dev", "Developer Tooling"],
    year: "2025",
    logo: "/Flow-Logo.svg",
    logoAlt: "Flow Guardian Logo",
    stats: { label: "INSPECTION", value: "Real-time" },
    liveUrl: "https://flow.postpipe.in",
    githubUrl: "https://github.com/Sourodip-1/Api-Check",
  },
  {
    num: "04",
    title: "BUFFER",
    category: "SMART QUEUEING",
    description:
      "A smart queue management system that replaces physical waiting with scheduled, fair, and travel-aware service slots. Buffer balances first-come-first-served ordering with priority and travel feasibility, helping institutions manage queues more efficiently.",
    tags: ["Smart Queueing", "Slot Allocation", "Travel-Aware", "Scheduling Engine"],
    year: "2026",
    logo: "/Buffer-logo.svg",
    logoAlt: "Buffer Logo",
    stats: { label: "STATUS", value: "In Development" },
    inDevelopment: true,
  },
];

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const activeIndexRef = useRef(0);

  // Cached layout bounds to eliminate layout thrashing on scroll
  const layoutCacheRef = useRef<{ top: number; total: number; maxR: number }>({
    top: 0,
    total: 1,
    maxR: 700,
  });

  const measureLayout = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const docTop = rect.top + window.scrollY;
    const total = Math.max(1, el.offsetHeight - window.innerHeight);
    const cardW = cardRef.current?.offsetWidth || 1200;
    const cardH = cardRef.current?.offsetHeight || 640;
    const maxR = Math.hypot(cardW / 2, cardH / 2) + 120;
    layoutCacheRef.current = { top: docTop, total, maxR };
  }, []);

  // Direct-DOM styling for 120 FPS zero-cost scroll response
  const applyScrollProgress = useCallback((scrollY: number) => {
    const { top, total, maxR } = layoutCacheRef.current;
    const current = scrollY - top;
    const p = Math.max(0, Math.min(1, current / total));

    // Expansion: 0.00 -> 0.16
    const expP = Math.min(1, Math.max(0, p / 0.16));
    const easedExp = 1 - Math.pow(1 - expP, 3);

    // 1. Expanding circular clipping mask from a white dot into the full blueprint card
    if (cardRef.current) {
      const minR = 12; // 24px diameter white dot

      if (easedExp >= 0.999) {
        cardRef.current.style.clipPath = "none";
        (cardRef.current.style as any).webkitClipPath = "none";
      } else {
        const currentR = Math.round(minR + easedExp * (maxR - minR));
        const clipVal = `circle(${currentR}px at 50% 50%)`;
        cardRef.current.style.clipPath = clipVal;
        (cardRef.current.style as any).webkitClipPath = clipVal;
      }

      // Smooth entrance scale & exit cushion
      if (p < 0.16) {
        cardRef.current.style.transform = `scale(${0.96 + easedExp * 0.04})`;
        cardRef.current.style.opacity = "1";
      } else if (p >= 0.94) {
        // Smooth exit elevation cushion as user approaches the next section
        const exitProgress = (p - 0.94) / 0.06;
        const exitScale = 1 - exitProgress * 0.035;
        const exitY = -exitProgress * 24;
        const exitOpacity = 1 - exitProgress * 0.15;
        cardRef.current.style.transform = `translateY(${exitY}px) scale(${exitScale})`;
        cardRef.current.style.opacity = String(exitOpacity);
      } else {
        cardRef.current.style.transform = "scale(1)";
        cardRef.current.style.opacity = "1";
      }
    }

    // 2. Content opacity smoothly dissolves in as the circular aperture expands
    if (contentRef.current) {
      const contentOpacity = Math.max(0, Math.min(1, (easedExp - 0.1) / 0.9));
      contentRef.current.style.opacity = String(contentOpacity);
      contentRef.current.style.pointerEvents = contentOpacity > 0.6 ? "auto" : "none";
    }

    // 3. Bottom progress bar update
    const pct = Math.round(p * 100);
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${pct}%`;
    }
    if (progressTextRef.current) {
      progressTextRef.current.textContent = `${pct}% EXPLORED`;
    }

    // 4. Update React state with direction when active index actually changes
    let nextIdx = 0;
    if (p >= 0.16) {
      const sub = (p - 0.16) / 0.84;
      nextIdx = Math.min(3, Math.floor(sub * 4));
    }

    if (nextIdx !== activeIndexRef.current) {
      const dir = nextIdx > activeIndexRef.current ? 1 : -1;
      setDirection(dir);
      activeIndexRef.current = nextIdx;
      setActiveProjectIndex(nextIdx);
      sound.playDayTick(650 + nextIdx * 45);
    }
  }, []);

  // Hook into Lenis updates
  useLenis((lenis) => {
    applyScrollProgress(lenis.scroll);
  });

  // Native scroll & resize fallback
  useEffect(() => {
    measureLayout();
    const handleScroll = () => {
      applyScrollProgress(window.scrollY);
    };
    const handleResize = () => {
      measureLayout();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [measureLayout, applyScrollProgress]);

  // Navigate directly to a project
  const scrollToProject = (index: number) => {
    sound.playClick(560);
    const dir = index > activeIndexRef.current ? 1 : -1;
    setDirection(dir);
    const { top, total } = layoutCacheRef.current;
    const targetProgress = 0.16 + ((index + 0.5) / 4) * 0.84;
    const targetScroll = top + targetProgress * total;

    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetScroll, { duration: 0.9 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const activeProject = PROJECTS[activeProjectIndex];

  return (
    <section id="work" className="relative w-full flex flex-col select-none">
      {/* ── TOP ENTRANCE: WHITE SECTION HEADER ──────────────────────────────── */}
      <div className="w-full bg-white text-black pt-20 pb-2 px-6 sm:px-10 md:px-14 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#0047FF] uppercase tracking-[0.28em] font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0047FF] animate-pulse" />
              <span>01 / SELECTED WORK</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-black uppercase">
              Engineered for Impact.
            </h2>
          </div>

          <div className="max-w-md font-mono text-[11px] sm:text-[12px] text-black/60 leading-relaxed border-l-2 border-[#0047FF] pl-4">
            <p>
              Bridging robust systems architecture with precision creative frontend engineering.
              Every project is built to endure, perform, and delight.
            </p>
            <div className="flex items-center gap-6 mt-3 text-[9.5px] uppercase tracking-wider text-black/40">
              <span>STATUS: DEPLOYED</span>
              <span>•</span>
              <span>FILTER: 04 PROJECTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BIG SCREEN-COVERING MY WORKS ARTWORK (LOW OPACITY WATERMARK) ────── */}
      <div className="relative w-full bg-white flex items-center justify-center overflow-hidden pt-2 pb-0 z-0">
        <div className="relative w-[96vw] max-w-[1560px] h-[220px] sm:h-[340px] md:h-[460px] lg:h-[520px] opacity-[0.28] select-none pointer-events-none">
          <Image
            src="/My Works.png"
            alt="My Works"
            fill
            priority
            className="object-contain object-center drop-shadow-[0_12px_36px_rgba(0,71,255,0.08)]"
          />
        </div>
      </div>

      {/* ── THE MARQUEE OVERLAPPING UP ONTO MY WORKS ARTWORK ────────────────── */}
      <div className="relative w-full overflow-hidden bg-transparent -mt-20 sm:-mt-32 md:-mt-48 lg:-mt-64 -mb-[1px] z-10 pointer-events-none">
        <TextLoop
          text="SELECTED WORKS ✦ CREATIVE SYSTEMS ✦ BUILD WHAT MATTERS ✦ SYSTEMS ARCHITECTURE"
          shape="wave"
          speed={70}
          direction="forward"
          separator="✦"
          curviness={65}
          fontSize={46}
          fontWeight={900}
          letterSpacing={2.2}
          uppercase
          color="#ffffff"
          ribbon
          ribbonColor="#0047FF"
          ribbonWidth={92}
          pauseOnHover
          fillBelow
          className="w-full"
        />
      </div>

      {/* ── BRIGHT BLUE SCROLL CONTAINER (#0047FF) ───────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full bg-[#0047FF] min-h-[340vh]"
      >
        {/* Sticky Viewport pinned across the entire scroll sequence */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden">
          {/* Header Metadata Ribbon atop the blue screen */}
          <div className="absolute top-5 left-6 right-6 sm:left-10 sm:right-10 max-w-7xl mx-auto flex items-center justify-between font-mono text-[10.5px] sm:text-[11px] text-white uppercase tracking-widest pointer-events-none z-20">
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="font-semibold text-white/95">PROJECT SHOWCASE (2024 — 2026)</span>
              <div className="w-20 sm:w-32 md:w-48 h-px bg-white/50 hidden sm:block" />
            </div>
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 pointer-events-auto pr-20 sm:pr-24">
              <div className="hidden md:flex items-center gap-3 text-white/80 text-[10px]">
                <span>SCROLL TO EXPLORE ARCHIVE</span>
                <span>•</span>
                <button
                  onClick={() => {
                    sound.playClick(600);
                    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  [1] RETURN TO WORK TOP
                </button>
              </div>
            </div>
          </div>

          {/* 
            ── ARCHITECTURAL BLUEPRINT CARD CONTAINER WITH CIRCULAR CLIPPING MASK ──
            Starts as an ultra-clean white dot (circle(12px at 50% 50%)), then smoothly
            expands as a circular clipping mask revealing the blueprint card.
          */}
          <div
            className="relative w-full max-w-7xl flex items-center justify-center px-2 sm:px-0"
            style={{
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.14))",
            }}
          >
            <div
              ref={cardRef}
              style={{
                clipPath: "circle(12px at 50% 50%)",
                WebkitClipPath: "circle(12px at 50% 50%)",
                transform: "scale(0.96)",
                willChange: "clip-path, transform",
              }}
              className="relative w-full h-[640px] max-h-[82vh] bg-white text-black rounded-[28px] overflow-hidden border border-[#0047FF]/20 flex flex-col justify-between"
              onClick={() => {
                if (cardRef.current && cardRef.current.style.clipPath !== "none") {
                  scrollToProject(0);
                }
              }}
            >
              {/* Top-Left Blueprint Registration Crosshair & Technical Hairline Guides */}
              <div className="absolute top-6 left-6 -translate-x-1/2 -translate-y-1/2 text-[#0047FF] font-mono text-xl font-light select-none pointer-events-none leading-none z-30">
                +
              </div>
              <div className="absolute top-6 left-0 right-0 h-px bg-[#0047FF]/25 pointer-events-none z-20" />
              <div className="absolute top-0 bottom-0 left-6 w-px bg-[#0047FF]/25 pointer-events-none z-20" />
              <div className="absolute bottom-6 left-0 right-0 h-px bg-[#0047FF]/25 pointer-events-none z-20" />
              <div className="absolute bottom-6 left-6 -translate-x-1/2 translate-y-1/2 text-[#0047FF] font-mono text-base font-light select-none pointer-events-none leading-none z-30 opacity-60">
                +
              </div>

              {/* ── RIGHT HALF: INTERACTIVE FERROFLUID SIMULATION CANVAS (LIGHT THEME) ── */}
              <div className="absolute top-0 bottom-0 right-0 w-full lg:w-1/2 h-full overflow-hidden pointer-events-auto z-0 rounded-b-[28px] lg:rounded-r-[28px] lg:rounded-bl-none">
                <Ferrofluid
                  colors={["#3a71da", "#292af1", "#578ff2"]}
                  spikeHeight={0.85}
                  sharpness={2.5}
                  tilt={48}
                  magnets={1.3}
                  density={0.22}
                  scale={2.6}
                  speed={0.18}
                  turbulence={0.6}
                  mouseInteraction
                  mouseStrength={1.4}
                  mouseRadius={0.35}
                  clickPulse
                  triggerPulseKey={activeProjectIndex}
                  intro={false}
                  lightMode={true}
                  transparent={false}
                  color="#ffffff"
                  brightness={1.0}
                  opacity={1}
                  className="w-full h-full"
                />

                {/* Left Side Seamless White Blur & Fade (Desktop) */}
                <div
                  className="hidden lg:block absolute top-0 bottom-0 left-0 w-56 sm:w-72 lg:w-96 pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 25%, rgba(255,255,255,0.6) 55%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0) 100%)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    maskImage:
                      "linear-gradient(to right, black 0%, black 35%, rgba(0,0,0,0.5) 65%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to right, black 0%, black 35%, rgba(0,0,0,0.5) 65%, transparent 100%)",
                  }}
                />

                {/* Top Side Seamless White Blur & Fade (Mobile) */}
                <div
                  className="block lg:hidden absolute top-0 left-0 right-0 h-28 pointer-events-none z-10"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 30%, rgba(255,255,255,0.5) 65%, rgba(255,255,255,0) 100%)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    maskImage:
                      "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)",
                  }}
                />
              </div>

            {/* When expanded: The Technical Blueprint Layout */}
            <div
              ref={contentRef}
              style={{
                opacity: 0,
                pointerEvents: "none",
                willChange: "opacity",
              }}
              className="w-full h-full flex flex-col justify-between pt-6 sm:pt-7 pb-5 sm:pb-6 px-5 sm:px-8 md:px-10 lg:px-12 overflow-hidden transition-opacity duration-200 relative z-10"
            >
              {/* ── TOP ROW: MONOSPACE TABS & PROGRESS FRACTION ───────────────── */}
              <div className="w-full flex items-center justify-between pb-3 sm:pb-4 pl-4 sm:pl-6">
                {/* Clean Unboxed Monospace Navigation Tabs with Gliding Spring Underline */}
                <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar relative py-1">
                  {PROJECTS.map((proj, idx) => {
                    const isActive = idx === activeProjectIndex;
                    return (
                      <button
                        key={proj.num}
                        onClick={() => scrollToProject(idx)}
                        className="relative group flex flex-col items-start cursor-pointer pb-2 pt-1 transition-all"
                      >
                        <span
                          className={`font-mono text-xs tracking-wider transition-colors duration-200 ${
                            isActive
                              ? "text-[#0047FF] font-bold"
                              : "text-black/45 hover:text-black"
                          }`}
                        >
                          [{proj.num}] {proj.title}
                        </span>
                        {/* Smooth spring sliding active glider */}
                        {isActive && (
                          <motion.div
                            layoutId="activeWorkTabUnderline"
                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0047FF] rounded-full"
                            transition={{
                              type: "spring",
                              stiffness: 460,
                              damping: 34,
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Top-Right Rolling Fraction Counter (e.g., 01 / 04) */}
                <div className="font-mono text-xs sm:text-sm text-black/60 tracking-widest font-normal pr-2 flex items-center select-none">
                  <div className="relative h-5 overflow-hidden inline-flex items-center">
                    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                      <motion.span
                        key={activeProject.num}
                        custom={direction}
                        variants={{
                          enter: (d: number) => ({
                            y: d > 0 ? 16 : -16,
                            opacity: 0,
                            filter: "blur(2px)",
                          }),
                          center: {
                            y: 0,
                            opacity: 1,
                            filter: "blur(0px)",
                          },
                          exit: (d: number) => ({
                            y: d > 0 ? -16 : 16,
                            opacity: 0,
                            filter: "blur(2px)",
                          }),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="font-bold text-[#0047FF]"
                      >
                        {activeProject.num}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="text-black/40 ml-1.5 font-medium">/ 04</span>
                </div>
              </div>

              {/* ── MAIN CONTENT: SPLIT BLUEPRINT SPECIFICATION ──────────────── */}
              <div className="w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10 py-2 sm:py-4 overflow-hidden relative">
                {/* ── LEFT SPECIFICATIONS COLUMN WITH DIRECTIONAL MOTION ─────── */}
                <div className="flex-1 flex flex-col justify-between h-full max-w-2xl pl-2 sm:pl-4 relative w-full overflow-visible">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={activeProject.num}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({
                          y: d > 0 ? 22 : -22,
                          opacity: 0,
                          filter: "blur(6px)",
                        }),
                        center: {
                          y: 0,
                          opacity: 1,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                            staggerChildren: 0.045,
                            delayChildren: 0.02,
                          },
                        },
                        exit: (d: number) => ({
                          y: d > 0 ? -18 : 18,
                          opacity: 0,
                          filter: "blur(4px)",
                          transition: {
                            duration: 0.18,
                            ease: [0.4, 0, 1, 1],
                          },
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div>
                        {/* Eyebrow: PROJECT // TITLE */}
                        <motion.div
                          variants={{
                            enter: { opacity: 0, y: 10 },
                            center: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.28 }}
                          className="flex items-center gap-3 mb-1 sm:mb-1.5"
                        >
                          <div className="relative inline-block">
                            <span className="font-serif italic text-base sm:text-lg text-[#0047FF] tracking-wide font-normal">
                              PROJECT
                            </span>
                            {/* Sketched blueprint pen underline */}
                            <svg
                              className="absolute -bottom-1 left-0 w-full h-[6px] text-[#0047FF] overflow-visible pointer-events-none"
                              viewBox="0 0 56 6"
                              fill="none"
                            >
                              <path
                                d="M 1 4 C 14 1.5, 34 5, 55 2 M 2 5 C 18 3, 38 4, 53 4.5"
                                stroke="#0047FF"
                                strokeWidth="1.15"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                          <span className="font-mono text-xs text-[#0047FF] tracking-widest font-semibold uppercase">
                            // {activeProject.category}
                          </span>
                        </motion.div>

                        {/* Massive Bold Uppercase Title */}
                        <motion.h3
                          variants={{
                            enter: { opacity: 0, y: 16 },
                            center: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                          className={`font-display font-black tracking-tight text-black uppercase ${
                            activeProject.title.length > 10
                              ? "text-3xl sm:text-4xl lg:text-[42px] my-1.5 sm:my-2 leading-none"
                              : "text-4xl sm:text-5xl lg:text-6xl my-2 sm:my-3"
                          }`}
                        >
                          {activeProject.title}
                        </motion.h3>

                        {/* Description with Left Vertical Blue Border */}
                        <motion.div
                          variants={{
                            enter: { opacity: 0, y: 12 },
                            center: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          className="border-l-2 border-[#0047FF] pl-3.5 my-2 sm:my-2.5"
                        >
                          <p className="font-mono text-[11px] sm:text-[12px] text-black/75 leading-relaxed max-w-lg">
                            {activeProject.description}
                          </p>
                        </motion.div>

                        {/* Tags in Crisp Rectangular Outline Boxes with Stagger */}
                        <motion.div
                          variants={{
                            enter: { opacity: 0 },
                            center: {
                              opacity: 1,
                              transition: { staggerChildren: 0.03, delayChildren: 0.06 },
                            },
                          }}
                          className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3"
                        >
                          {activeProject.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              variants={{
                                enter: { opacity: 0, scale: 0.9, y: 6 },
                                center: { opacity: 1, scale: 1, y: 0 },
                              }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              className="font-mono text-[9px] sm:text-[10px] text-black/75 px-2.5 py-1 border border-black/20 bg-transparent rounded-none tracking-wide whitespace-nowrap"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>

                      {/* Bottom Row: Action Links / Status & Arrow Navigation */}
                      <motion.div
                        variants={{
                          enter: { opacity: 0, y: 8 },
                          center: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.28 }}
                        className="pt-1.5 flex flex-wrap items-center justify-between gap-3 mt-auto shrink-0 relative z-20"
                      >
                        {/* Left: Action Links or In Development Badge */}
                        <div className="flex flex-wrap items-center gap-3">
                          {activeProject.inDevelopment ? (
                            <div className="inline-flex items-center gap-2.5 font-mono text-xs text-[#b45309] bg-[#fffbeb] px-3.5 py-1.5 border border-[#f59e0b]/40 rounded-full shadow-sm">
                              <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                              <span className="font-semibold tracking-wider uppercase">✦ In Development</span>
                            </div>
                          ) : (
                            <>
                              {activeProject.liveUrl && (
                                <a
                                  href={activeProject.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => sound.playClick(600)}
                                  className="inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] text-white bg-[#0047FF] hover:bg-black px-4 py-2 transition-all tracking-wider font-semibold shadow-sm hover:shadow group cursor-pointer"
                                >
                                  <span>Live System</span>
                                  <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                                    ↗
                                  </span>
                                </a>
                              )}
                              {activeProject.githubUrl && (
                                <a
                                  href={activeProject.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => sound.playClick(520)}
                                  className="inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] text-black hover:text-[#0047FF] bg-black/[0.03] hover:bg-[#0047FF]/10 border border-black/25 hover:border-[#0047FF] px-3.5 py-2 transition-all tracking-wider font-medium group cursor-pointer"
                                >
                                  <span>GitHub</span>
                                  <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                                    ↗
                                  </span>
                                </a>
                              )}
                            </>
                          )}
                        </div>

                        {/* Right: Monospace Arrow Navigation */}
                        <div className="flex items-center gap-4 font-mono text-base text-black/60 select-none">
                          <button
                            onClick={() =>
                              scrollToProject((activeProjectIndex + 3) % PROJECTS.length)
                            }
                            className="hover:text-[#0047FF] transition-all cursor-pointer px-1 text-lg font-light hover:scale-110 active:scale-95"
                            title="Previous project"
                          >
                            ←
                          </button>
                          <span className="text-black/25 font-light">|</span>
                          <button
                            onClick={() =>
                              scrollToProject((activeProjectIndex + 1) % PROJECTS.length)
                            }
                            className="hover:text-[#0047FF] transition-all cursor-pointer px-1 text-lg font-light hover:scale-110 active:scale-95"
                            title="Next project"
                          >
                            →
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── RIGHT LOGO COLUMN WITH FLUID DIRECTIONAL SCALE & ROTATION ─ */}
                <div className="flex-1 flex items-center justify-center relative w-full h-full pointer-events-none">
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={activeProject.num}
                      custom={direction}
                      variants={{
                        enter: (d: number) => ({
                          scale: 0.85,
                          opacity: 0,
                          y: d > 0 ? 28 : -28,
                          rotate: d > 0 ? -5 : 5,
                          filter: "blur(8px)",
                        }),
                        center: {
                          scale: 1,
                          opacity: 1,
                          y: 0,
                          rotate: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 0.4,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                        exit: (d: number) => ({
                          scale: 0.88,
                          opacity: 0,
                          y: d > 0 ? -22 : 22,
                          rotate: d > 0 ? 4 : -4,
                          filter: "blur(6px)",
                          transition: {
                            duration: 0.18,
                            ease: [0.4, 0, 1, 1],
                          },
                        }),
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 flex items-center justify-center select-none pointer-events-none z-10"
                    >
                      <Image
                        src={activeProject.logo}
                        alt={activeProject.logoAlt}
                        fill
                        priority
                        className="object-contain p-2 drop-shadow-[0_10px_28px_rgba(0,71,255,0.12)]"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

          {/* Bottom Indicators Row atop the blue screen */}
          <div className="absolute bottom-5 left-6 right-6 sm:left-10 sm:right-10 max-w-7xl mx-auto flex items-center justify-between pointer-events-none z-20">
            {/* Bottom-left: 02 About */}
            <a
              href="#about"
              onClick={(e) => {
                sound.playClick(500);
                const aboutEl = document.getElementById("about");
                if (aboutEl) {
                  e.preventDefault();
                  if ((window as any).__lenis) {
                    (window as any).__lenis.scrollTo(aboutEl, { offset: 0, duration: 1.2 });
                  } else {
                    aboutEl.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="pointer-events-auto group flex items-center gap-2.5 font-mono text-[11px] sm:text-[12px] text-white/90 hover:text-white transition-all cursor-pointer tracking-widest uppercase select-none bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-md backdrop-blur-sm shadow-sm"
              title="Navigate to 02 About Section"
            >
              <span className="font-bold">02 ABOUT</span>
              <span className="text-white/60 group-hover:translate-y-0.5 transition-transform text-xs">
                ↓
              </span>
            </a>

            {/* Bottom-right: Exploration Progress */}
            <div className="flex items-center gap-3 font-mono text-[10px] text-white/80 tracking-widest uppercase ml-auto">
              <span ref={progressTextRef}>0% EXPLORED</span>
              <div className="w-20 sm:w-28 h-1 bg-white/20 rounded-full overflow-hidden">
                <div ref={progressBarRef} className="h-full bg-white transition-all duration-75" style={{ width: "0%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Torn paper divider edge at the bottom of the blue container */}
      <TornPaperDivider />
    </section>
  );
}
