"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
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
  linkText: string;
  linkUrl: string;
}

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "POSTPIPE",
    category: "POSTPIPE",
    description:
      "High-throughput asynchronous media processing infrastructure featuring distributed transcoding queues, edge asset delivery, and multi-channel publishing pipelines.",
    tags: ["Next.js", "Edge Workers", "Media Pipelines", "Cloud Functions"],
    year: "2025",
    logo: "/PostPipe-Black.svg",
    logoAlt: "PostPipe Logo",
    stats: { label: "THROUGHPUT", value: "10K req/s" },
    linkText: "View System",
    linkUrl: "#",
  },
  {
    num: "02",
    title: "KONTEXT",
    category: "KONTEXT",
    description:
      "A deterministic project memory engine for agentic pair-programming workflows with contextual recall, token-efficient storage, and multi-model synchronization.",
    tags: ["TypeScript", "Model Context Protocol", "Memory Engine", "Systems Architecture"],
    year: "2026",
    logo: "/Kontext-light.svg",
    logoAlt: "Kontext Logo",
    stats: { label: "LATENCY", value: "<12ms" },
    linkText: "View Repository",
    linkUrl: "#",
  },
  {
    num: "03",
    title: "FLOW",
    category: "FLOW",
    description:
      "Real-time creative canvas engine built for 60FPS fluid physics simulations, kinetic typography, dynamic vector paths, and GPU-accelerated interface choreography.",
    tags: ["WebGL", "GLSL Shaders", "GSAP", "Creative Frontend"],
    year: "2025",
    logo: "/Flow-Logo.svg",
    logoAlt: "Flow Logo",
    stats: { label: "PERFORMANCE", value: "60 FPS" },
    linkText: "Launch Demo",
    linkUrl: "#",
  },
  {
    num: "04",
    title: "BUFFER",
    category: "BUFFER",
    description:
      "Fault-tolerant real-time event streaming pipeline designed for distributed telemetry collection, live metrics dashboards, and zero-loss message routing.",
    tags: ["Distributed Systems", "WebSockets", "Pub/Sub", "Kafka / Redis"],
    year: "2024",
    logo: "/Buffer-logo.svg",
    logoAlt: "Buffer Logo",
    stats: { label: "UPTIME", value: "99.99%" },
    linkText: "Read Spec",
    linkUrl: "#",
  },
];

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  const [activeProjectIndex, setActiveProjectIndex] = useState(1); // default to 02 KONTEXT per concept image
  const activeIndexRef = useRef(1);

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
    const maxR = Math.hypot(cardW / 2, cardH / 2) + 20;
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

      if (easedExp >= 0.98) {
        cardRef.current.style.clipPath = "none";
        (cardRef.current.style as any).webkitClipPath = "none";
        cardRef.current.style.transform = "scale(1)";
      } else {
        const currentR = Math.round(minR + easedExp * (maxR - minR));
        const clipVal = `circle(${currentR}px at 50% 50%)`;
        cardRef.current.style.clipPath = clipVal;
        (cardRef.current.style as any).webkitClipPath = clipVal;
        cardRef.current.style.transform = `scale(${0.96 + easedExp * 0.04})`;
      }
    }

    // 2. Content opacity smoothly dissolves in as the circular aperture expands
    if (contentRef.current) {
      const contentOpacity = Math.max(0, Math.min(1, (easedExp - 0.12) / 0.88));
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

    // 4. Update React state ONLY when active index actually changes
    let nextIdx = 0;
    if (p >= 0.16) {
      const sub = (p - 0.16) / 0.84;
      nextIdx = Math.min(3, Math.floor(sub * 4));
    }

    if (nextIdx !== activeIndexRef.current) {
      activeIndexRef.current = nextIdx;
      setActiveProjectIndex(nextIdx);
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
    const { top, total } = layoutCacheRef.current;
    const targetProgress = 0.16 + ((index + 0.5) / 4) * 0.84;
    const targetScroll = top + targetProgress * total;

    if ((window as any).__lenis) {
      (window as any).__lenis.scrollTo(targetScroll, { duration: 0.8 });
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
              className="w-full h-full flex flex-col justify-between pt-9 pb-8 px-6 sm:px-10 md:px-12 lg:px-14 overflow-hidden transition-opacity duration-200 relative z-10"
            >
              {/* ── TOP ROW: MONOSPACE TABS & PROGRESS FRACTION ───────────────── */}
              <div className="w-full flex items-center justify-between pb-3 sm:pb-4 pl-4 sm:pl-6">
                {/* Clean Unboxed Monospace Navigation Tabs */}
                <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
                  {PROJECTS.map((proj, idx) => {
                    const isActive = idx === activeProjectIndex;
                    return (
                      <button
                        key={proj.num}
                        onClick={() => scrollToProject(idx)}
                        className="group flex flex-col items-start cursor-pointer transition-all duration-200"
                      >
                        <span
                          className={`font-mono text-xs tracking-wider transition-colors ${
                            isActive
                              ? "text-[#0047FF] font-semibold"
                              : "text-black/45 hover:text-black"
                          }`}
                        >
                          [{proj.num}] {proj.title}
                        </span>
                        {/* Blue Underline on Active Tab */}
                        <div
                          className={`h-[2px] w-full mt-1.5 transition-all duration-200 ${
                            isActive ? "bg-[#0047FF] opacity-100" : "bg-transparent opacity-0"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Top-Right Fraction Counter (e.g., 02 / 04) */}
                <div className="font-mono text-xs sm:text-sm text-black/55 tracking-widest font-normal pr-2">
                  {activeProject.num} / 04
                </div>
              </div>

              {/* ── MAIN CONTENT: SPLIT BLUEPRINT SPECIFICATION ──────────────── */}
              <div className="w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10 py-2 sm:py-4 overflow-hidden">
                {/* ── LEFT SPECIFICATIONS COLUMN ─────────────────────────────── */}
                <div className="flex-1 flex flex-col justify-between h-full max-w-2xl pl-2 sm:pl-4">
                  <div>
                    {/* Eyebrow: PROJECT // KONTEXT */}
                    <div className="flex items-center gap-3 mb-2">
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
                        // {activeProject.title}
                      </span>
                    </div>

                    {/* Massive Bold Uppercase Title */}
                    <h3 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight text-black uppercase my-3 sm:my-4 transition-all duration-200">
                      {activeProject.title}
                    </h3>

                    {/* Description with Left Vertical Blue Border */}
                    <div className="border-l-2 border-[#0047FF] pl-4 my-4 sm:my-6">
                      <p className="font-mono text-[12px] sm:text-[13px] text-black/75 leading-relaxed max-w-lg">
                        {activeProject.description}
                      </p>
                    </div>

                    {/* Tags in Crisp Rectangular Outline Boxes — fits single row on desktop */}
                    <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] sm:text-[11px] text-black/75 px-2.5 sm:px-3 py-1.5 border border-black/20 bg-transparent rounded-none tracking-wide whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: Link CTA & Arrow Navigation (NO dividing border line) */}
                  <div className="pt-2 flex items-center justify-between mt-auto">
                    {/* Left: View Repository link */}
                    <a
                      href={activeProject.linkUrl}
                      onClick={() => sound.playClick(600)}
                      className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm text-black hover:text-[#0047FF] transition-colors tracking-wider font-medium group cursor-pointer"
                    >
                      <span className="text-[#0047FF] text-lg font-bold group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                      <span>{activeProject.linkText}</span>
                    </a>

                    {/* Right: Monospace Arrow Navigation ( ← | → ) */}
                    <div className="flex items-center gap-4 font-mono text-base text-black/60 select-none">
                      <button
                        onClick={() =>
                          scrollToProject((activeProjectIndex + 3) % PROJECTS.length)
                        }
                        className="hover:text-[#0047FF] transition-colors cursor-pointer px-1 text-lg font-light"
                        title="Previous project"
                      >
                        ←
                      </button>
                      <span className="text-black/25 font-light">|</span>
                      <button
                        onClick={() =>
                          scrollToProject((activeProjectIndex + 1) % PROJECTS.length)
                        }
                        className="hover:text-[#0047FF] transition-colors cursor-pointer px-1 text-lg font-light"
                        title="Next project"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT LOGO COLUMN ────────────────────────────────────────── */}
                <div className="flex-1 flex items-center justify-center relative w-full h-full pointer-events-none">
                  {/* Centered Original Vector Logo with subtle float shadow */}
                  <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 flex items-center justify-center select-none pointer-events-none z-10">
                    <Image
                      key={activeProject.num}
                      src={activeProject.logo}
                      alt={activeProject.logoAlt}
                      fill
                      priority
                      className="object-contain p-2 drop-shadow-[0_10px_28px_rgba(0,71,255,0.12)] transition-all duration-300"
                    />
                  </div>
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
